import os
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

@router.get("/signed-url")
async def get_signed_url(agent_id: str):
    api_key = os.getenv("ELEVENLABS_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail="ELEVENLABS_API_KEY not configured")

    url = f"https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id={agent_id}"
    
    headers = {
        "xi-api-key": api_key
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return {"signed_url": data["signed_url"]}
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to get signed URL: {str(e)}")
