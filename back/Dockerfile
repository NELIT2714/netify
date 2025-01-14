FROM python:3.13-slim-bullseye
COPY . /app
WORKDIR /app
RUN python -m pip install -r requirements.txt

ARG PORT
EXPOSE ${PORT}

CMD ["python3", "run_api.py"]