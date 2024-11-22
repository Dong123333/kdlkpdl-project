from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
import requests
from datetime import datetime
from zoneinfo import ZoneInfo

app = FastAPI()

ACCESS_KEY = '6667dbb87fc9908118c18b017a8b06e6'
URL = 'http://apilayer.net/api/live'

exchange_rate_history = {}

def fetch_exchange_rates(from_currency: str, to_currencies: list):
    try:
        currencies = ','.join(to_currencies)
        url = f'{URL}?access_key={ACCESS_KEY}&currencies={currencies}&source={from_currency}&format=1'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if data.get('success'):
            timestamp = datetime.utcfromtimestamp(data['timestamp']).replace(tzinfo=ZoneInfo("UTC")).astimezone(ZoneInfo("Asia/Ho_Chi_Minh")).strftime('%d-%m-%Y %H:%M:%S')
            
            for to_currency in to_currencies:
                pair = f"{from_currency}{to_currency}"
                exchange_rate = data['quotes'].get(pair)
                if exchange_rate:
                    if pair not in exchange_rate_history:
                        exchange_rate_history[pair] = []
                    exchange_rate_history[pair].append({
                        'Timestamp': timestamp,
                        'From Currency': from_currency,
                        'To Currency': to_currency,
                        'Exchange Rate': exchange_rate
                    })
                    print(f"Cập nhật thành công: {pair} - {exchange_rate}")
        else:
            print("API không trả về dữ liệu hợp lệ")
    except requests.exceptions.RequestException as e:
        print(f"Lỗi khi gọi API: {str(e)}")

scheduler = BackgroundScheduler()

def start_periodic_task():
    if not scheduler.get_jobs():
        to_currencies = ['JPY', 'GBP', 'EUR']
        scheduler.add_job(fetch_exchange_rates, 'interval', minutes=1, args=['USD', to_currencies])

@app.get('/get-exchange-rate/{currency_pair}')
def get_exchange_rate(currency_pair: str):
    start_periodic_task()
    if not scheduler.running:
        scheduler.start()
    pair_data = exchange_rate_history.get(currency_pair.upper())
    if not pair_data:
        return {"error": "Không tìm thấy dữ liệu cho cặp tiền này"}
    return {"exchange_rate_history": pair_data}
