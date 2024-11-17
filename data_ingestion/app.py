import requests
import time
import json
from datetime import datetime

# Hardcoded Access Key
ACCESS_KEY = '3192a2e20284c0a1fca826ac5cd149c8'
URL = 'http://apilayer.net/api/live'

# Hàm nhập đối số và lấy tỷ giá
def fetch_exchange_rates(currencies):
    try:
        # Xây dựng URL với đối số từ người dùng
        currencies_str = ",".join(currencies)
        url = f'{URL}?access_key={ACCESS_KEY}&currencies={currencies_str}&format=1'

        # Gọi API để lấy dữ liệu tỷ giá
        response = requests.get(url)
        response.raise_for_status()  # Kiểm tra lỗi từ API
        data = response.json()

        # Kiểm tra dữ liệu và lấy tỷ giá
        if data['success']:
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            # Tạo danh sách các bản ghi mới
            new_records = []
            for currency in currencies:
                key = f'USD{currency}'
                exchange_rate = data['quotes'].get(key)
                if exchange_rate:
                    print(f'Tỷ giá USD sang {currency} lúc {timestamp}: {exchange_rate}')
                    new_records.append({
                        'Timestamp': timestamp,
                        'From Currency': 'USD',
                        'To Currency': currency,
                        'Exchange Rate': exchange_rate
                    })

            # Đọc dữ liệu hiện tại từ file JSON (nếu tồn tại)
            try:
                with open('usd_exchange_rates.json', mode='r') as file:
                    existing_data = json.load(file)
            except (FileNotFoundError, json.JSONDecodeError):
                existing_data = []

            # Thêm bản ghi mới vào dữ liệu hiện tại
            existing_data.extend(new_records)

            # Ghi dữ liệu cập nhật vào file JSON
            with open('usd_exchange_rates.json', mode='w') as file:
                json.dump(existing_data, file, indent=4)

        else:
            print("Không tìm thấy dữ liệu tỷ giá trong phản hồi từ API.")

    except requests.exceptions.RequestException as e:
        print('Lỗi khi gọi API:', e)

# Nhập đối số từ người dùng chỉ cho tiền tệ
def main():
    currencies_input = input("Nhập các mã tiền tệ (ví dụ: JPY, EUR, GBP): ")
    currencies = currencies_input.split(",")  # Chia các tiền tệ thành danh sách

    # Gọi hàm để lấy tỷ giá
    while True:
        fetch_exchange_rates(currencies)
        time.sleep(60)

if __name__ == '__main__':
    main()
