from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
import json
import time

api_app = FastAPI(title="api-app")
app = FastAPI(title="spa-app")
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="static", html=True), name="static")


@api_app.get("/hello")
async def hello():
    return {"message": "Hello World"}
 
@api_app.get("/listProducts")
async def listProducts():
    time.sleep(5)
    with open('./database/products.json') as f:
        d = json.load(f)
        return d
 