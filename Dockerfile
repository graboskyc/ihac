FROM python:3.13-bookworm

WORKDIR /usr/src/app

COPY backend/requirements.txt ./
RUN rm -rf ./venv activate.sh sample.env
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend .
EXPOSE 8000
CMD [ "python", "./main.py" ]