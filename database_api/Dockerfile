FROM python:3.9.19-slim
COPY . ./api
RUN pip install requests fastapi uvicorn mysql-connector-python
WORKDIR ./api
CMD ["uvicorn", "db_api:app", "--host", "0.0.0.0", "--port", "9000"]