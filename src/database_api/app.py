from fastapi import FastAPI, Header
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def connect_to_database():
    return mysql.connector.connect(
        host="database",
        user="root",
        port="3306",
        password="mttq123",
        database="ExchangeRate"
    )

def insert_data(currency_pair, table_name):
    conn = connect_to_database()
    if conn is None:
        print(f"Kết nối thất bại. Không thể chèn dữ liệu vào bảng {table_name}.")
        return {"error": "Kết nối cơ sở dữ liệu thất bại."}
    cursor = conn.cursor()
    response = requests.get(f"http://data_ingestion:8000/get-exchange-rate/{currency_pair}")
    if response.status_code == 200:
        data = response.json()
        items = data.get("exchange_rate_history", [])
        if items:
            latest_item = items[-1]
            cursor.execute(f"INSERT INTO {table_name} (rate, created_at) VALUES (%s, %s)", 
                                   (float(latest_item["Exchange Rate"]), latest_item["Timestamp"]))
        conn.commit()
    cursor.close()
    conn.close()
    return {"success": "Thêm thành công"}

def start_scheduler():
    scheduler = BackgroundScheduler()

    scheduler.add_job(insert_data, 'interval', minutes=1, args=['USDJPY', 'tbDollarToJPY'])
    scheduler.add_job(insert_data, 'interval', minutes=1, args=['USDGBP', 'tbDollarToGBP'])
    scheduler.add_job(insert_data, 'interval', minutes=1, args=['USDEUR', 'tbDollarToEUR'])

    scheduler.start()

@app.on_event("startup")
async def on_startup():
    start_scheduler()

@app.get("/api/rates/USDJPY")
async def get_usdjpy_rates(origin: str = Header("Origin")):
    try:
        conn = connect_to_database()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT rate, created_at FROM tbDollarToJPY")
        result = cursor.fetchall()
        response_headers = {
            "Access-Control-Allow-Origin": origin
        }
        return result, response_headers
    except Exception as e:
        print("Lỗi khi tìm kiếm dữ liệu trong MySQL:", e)
        return []
    finally:
        cursor.close()
        conn.close()

@app.get("/api/rates/USDGBP")
async def get_usdgbp_rates(origin: str = Header("Origin")):
    try:
        conn = connect_to_database()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT rate, created_at FROM tbDollarToGBP")
        result = cursor.fetchall()
        response_headers = {
            "Access-Control-Allow-Origin": origin
        }
        return result, response_headers
    except Exception as e:
        print("Lỗi khi tìm kiếm dữ liệu trong MySQL:", e)
        return []
    finally:
        cursor.close()
        conn.close()

@app.get("/api/rates/USDEUR")
async def get_usdeur_rates(origin: str = Header("Origin")):
    try:
        conn = connect_to_database()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT rate, created_at FROM tbDollarToEUR")
        result = cursor.fetchall()
        response_headers = {
            "Access-Control-Allow-Origin": origin
        }
        return result, response_headers
    except Exception as e:
        print("Lỗi khi tìm kiếm dữ liệu trong MySQL:", e)
        return []
    finally:
        cursor.close()
        conn.close()


