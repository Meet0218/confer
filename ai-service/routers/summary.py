from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/summarize", tags=["summary"])

class SummaryRequest(BaseModel):
    transcript: str
    callId: str

class SummaryResponse(BaseModel):
    keyPoints: List[str]
    actionItems: List[str]

@router.post("", response_model=SummaryResponse)
async def summarize_call(req: SummaryRequest):
    # TODO: Implement actual LLM call using LLM provider
    return SummaryResponse(
        keyPoints=[
            "Discussed the new architecture.",
            f"Reviewed goals for call {req.callId}"
        ],
        actionItems=[
            "Investigate database migrations.",
            "Schedule follow-up meeting."
        ]
    )
