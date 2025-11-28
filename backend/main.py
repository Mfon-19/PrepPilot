from fastapi import FastAPI
from dotenv import load_dotenv
from routers import elevenlabs

load_dotenv()

app = FastAPI()

app.include_router(elevenlabs.router, prefix="/api/elevenlabs", tags=["elevenlabs"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Behavioral Interview Practice API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
