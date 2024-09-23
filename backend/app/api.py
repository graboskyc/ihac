from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
import json
import time
import random

api_app = FastAPI(title="api-app")
app = FastAPI(title="spa-app")
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="static", html=True), name="static")


@api_app.get("/hello")
async def hello():
    return {"message": "Hello World"}
 
@api_app.get("/listProducts")
async def listProducts():
    time.sleep(random.randint(2,5))
    with open('./database/products.json') as f:
        d = json.load(f)
        return d
 
@api_app.get("/searchProducts/{searchString}")
async def searchProducts(searchString:str):
    time.sleep(random.randint(5,7))
    with open('./database/products.json') as f:
        d = json.load(f)
        searched = []
        for p in d:
            if ((searchString.lower() in p["name"].lower()) or (searchString.lower() in p["description"].lower())):
                searched.append(p)
        return searched
