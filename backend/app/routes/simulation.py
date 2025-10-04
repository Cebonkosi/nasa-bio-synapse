from fastapi import APIRouter, HTTPException
from app.services.simulation_engine import mission_simulator
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/simulation", tags=["simulation"])

class MissionParameters(BaseModel):
    duration_days: int = 365
    destination: str = "mars"
    crew_age: int = 35
    artificial_gravity: bool = False
    radiation_shielding: str = "standard"
    exercise_regimen: str = "standard"

@router.post("/mission")
async def simulate_mission(params: MissionParameters):
    """Run mission simulation with given parameters"""
    try:
        mission_params = params.dict()
        results = mission_simulator.simulate_mission(mission_params)
        
        return {
            "success": True,
            "simulation_id": f"sim_{hash(str(mission_params))}",
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation failed: {str(e)}")

@router.get("/destinations")
async def get_destinations():
    """Get available mission destinations"""
    return {
        "destinations": [
            {"id": "moon", "name": "Lunar Base", "transit_days": 3},
            {"id": "mars", "name": "Mars Colony", "transit_days": 210},
            {"id": "deep_space", "name": "Deep Space Mission", "transit_days": 365}
        ]
    }