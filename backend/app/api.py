from fastapi import FastAPI, Response
from fastapi.staticfiles import StaticFiles
import json
import time
import random
from typing import Dict, Any

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

@api_app.post("/searchProducts")
async def searchProducts(s : Dict[Any, Any]):
    time.sleep(random.randint(5,9))
    with open('./database/products.json') as f:
        d = json.load(f)
        faceted = []
        searched = []
        for p in d:
            catIntersection = set(p["categories"]) & set(s["facets"])
            regIntersection = set(p["region"]) & set(s["facets"])
            if((len(catIntersection) > 0) and (len(regIntersection) > 0)):
                faceted.append(p)
        for p in faceted:
            if(len(s["searchTerm"]) > 0):
                if ((s["searchTerm"].lower() in p["name"].lower()) or (s["searchTerm"].lower() in p["description"].lower())):
                    searched.append(p)
            else:
                searched.append(p)
        return searched

@api_app.get("/listFacets")
async def listFacets():
    time.sleep(random.randint(5,7))
    facets = []
    with open('./database/products.json') as f:
        d = json.load(f)
        for p in d:
            for cat in p["categories"]:
                if cat not in facets:
                    facets.append(cat)
        return facets

@api_app.get("/checkout")
async def checkout():
    time.sleep(random.randint(9,17))
    return True