import requests
from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.h5"
SCALER_PATH = "scaler.pkl"

class PredictionResponse(BaseModel):
    current_rate: float
    predicted_rate_next_hour: float

def load_model():
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        return model, scaler
    except:
        return None, None

def get_rate_data():
    url = "http://database_api:9000/api/rates/USDJPY"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data[0]  
    else:
        return []

def prepare_model(data):
    df = pd.DataFrame(data)
    df['created_at'] = pd.to_datetime(df['created_at'])
    df['change_1m'] = df['rate'].diff(1)  
    df['change_5m'] = df['rate'].diff(5)  
    df['ma_10m'] = df['rate'].rolling(window=10).mean()  
    df = df.dropna() 

    X = df[['change_1m', 'change_5m', 'ma_10m']].values
    y = df['rate'].shift(-1).dropna().values  
    
    print(f"X shape: {X.shape}, y shape: {y.shape}")

    if len(X) > len(y):
        X = X[:-1]  
    elif len(y) > len(X):
        y = y[:-1]  

    print(f"Adjusted X shape: {X.shape}, Adjusted y shape: {y.shape}")

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    model = Sequential()
    model.add(Dense(64, input_dim=X.shape[1], activation='relu'))
    model.add(Dropout(0.2))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(1))

    model.compile(optimizer=Adam(), loss='mean_squared_error')

    model.fit(X, y, epochs=100, batch_size=32, validation_split=0.2)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

    return model, scaler


@app.get("/api/predict", response_model=PredictionResponse)
async def predict(origin: str = Header("Origin")):
    model, scaler = load_model()
    if not model or not scaler:
        rate_data = get_rate_data()

        if not rate_data:
            return {"error": "Không thể lấy dữ liệu tỷ giá từ API"}

        model, scaler = prepare_model(rate_data)

    rate_data = get_rate_data()
    df = pd.DataFrame(rate_data)
    df['created_at'] = pd.to_datetime(df['created_at'])

    df['change_1m'] = df['rate'].diff(1)
    df['change_5m'] = df['rate'].diff(5)
    df['ma_10m'] = df['rate'].rolling(window=10).mean()
    df = df.dropna()

    X = df[['change_1m', 'change_5m', 'ma_10m']].values
    X = scaler.transform(X) 

    prediction = model.predict(X)
    predicted_rate = float(prediction[-1][0])  
    current_rate = df['rate'].iloc[-1] 

    return {
        "current_rate": current_rate,
        "predicted_rate_next_hour": predicted_rate
    }