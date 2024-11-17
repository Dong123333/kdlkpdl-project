from fastapi import FastAPI
import requests
import time

app = FastAPI()

BASE_URL = ''


def fetch_forex_rate(from_currency='USD', to_currency='JPY'):
    try:
        url = f'{BASE_URL}?function=CURRENCY_EXCHANGE_RATE&from_currency={from_currency}&to_currency={to_currency}&apikey={API_KEY}'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        exchange_rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate']
        return exchange_rate

    except requests.exceptions.RequestException as e:
        print('Lỗi khi gọi API:', e)

@app.get("/crawl-data")
async def crawl_data():
    data = fetch_forex_rate('USD','JPY')
    if data:
        return data
    else:
        return "Lỗi"