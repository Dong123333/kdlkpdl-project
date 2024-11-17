FROM python:3.9.19-slim
COPY . ./api
RUN pip install requests fastapi uvicorn apscheduler
WORKDIR /api
CMD ["uvicorn", "crawl:app", "--host", "0.0.0.0", "--port", "8000"]