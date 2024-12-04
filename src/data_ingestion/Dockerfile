FROM python:3.9.20-slim
COPY . ./api
RUN pip install requests fastapi uvicorn apscheduler
WORKDIR /api
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]