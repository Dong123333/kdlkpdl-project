FROM python:3.9.20-slim
COPY . ./api
RUN pip install fastapi uvicorn tensorflow pandas scikit-learn requests
WORKDIR /api
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8001"]