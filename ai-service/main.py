from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import transcription, summary

load_dotenv()

app = FastAPI(title="Confer AI Service")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In prod, restrict this to your internal network or specific URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transcription.router)
app.include_router(summary.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
