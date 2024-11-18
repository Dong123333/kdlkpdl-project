from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
import requests
from datetime import datetime
from zoneinfo import ZoneInfo

app = FastAPI()

ACCESS_KEY = '83af42ba871605f4dcb424999e89f30d'
URL = 'http://apilayer.net/api/live'

exchange_rate_history = []

def fetch_exchange_rates(from_currency: str, to_currency: str):
    try:
        url = f'{URL}?access_key={ACCESS_KEY}&currencies={to_currency}&source={from_currency}&format=1'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if data.get('success'):
            exchange_rate = data['quotes'].get('USDJPY')
            timestamp = datetime.utcfromtimestamp(data['timestamp']).replace(tzinfo=ZoneInfo("UTC")).astimezone(ZoneInfo("Asia/Ho_Chi_Minh")).strftime('%d-%m-%Y %H:%M:%S')
            record = {
                'Timestamp': timestamp,
                'From Currency': from_currency,
                'To Currency': to_currency,
                'Exchange Rate': exchange_rate
            }
            exchange_rate_history.append(record)
            
        else:
            return {"error": "API không trả về dữ liệu hợp lệ"}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    
scheduler = BackgroundScheduler()

def start_periodic_task():
    fetch_exchange_rates('USD', 'JPY')
    scheduler.add_job(fetch_exchange_rates, 'interval', minutes=1, args=['USD', 'JPY'])

@app.get('/get-exchange-rate')
def get_exchange_rate():
    if not scheduler.running:
        start_periodic_task()
        scheduler.start()
    return {"exchange_rate_history": exchange_rate_history}
