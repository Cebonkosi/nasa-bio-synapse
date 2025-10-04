from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from app.routes import data
from app.services.knowledge_graph import kg_service
from app.routes import simulation

app.include_router(simulation.router)
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀Starting Bio-Synapse Engine")
    kg_service.init_schema()
    yield
    # Shutdown
    kg_service.close()
    print("🛑Shutting down Bio-Synapse Engine")

app = FastAPI(
    title="NASA Bio-Synapse Engine",
    description="Predictive Health & Habitat Advisor for Deep Space Missions",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "NASA Bio-Synapse Engine API", "status": "active"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "bio-synapse-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)