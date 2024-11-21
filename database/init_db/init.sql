CREATE DATABASE ExchangeRate;
USE ExchangeRate;

CREATE TABLE tbDollarToJPY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exchange_rate DECIMAL(9, 6),
    created_at DATETIME
)