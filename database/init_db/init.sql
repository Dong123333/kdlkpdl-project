CREATE DATABASE ExchangeRate
USE ExchangeRate
CREATE TABLE tbDollarToJPY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamps DATETIME,
    values DECIMAL(9, 6)
)