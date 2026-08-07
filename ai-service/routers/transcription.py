from fastapi import APIRouter, UploadFile, File, WebSocket
from typing import Dict

router = APIRouter(prefix="/transcribe", tags=["transcription"])

@router.post("")
async def transcribe_audio(file: UploadFile = File(...)) -> Dict[str, str]:
    # TODO: Implement actual transcription using STT provider
    # audio_bytes = await file.read()
    return {"text": "[STUB] Transcribed text from audio chunk."}

@router.websocket("/stream")
async def websocket_transcription_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_bytes()
            # TODO: Stream to Deepgram or similar
            await websocket.send_text("[STUB] Real-time transcription segment")
    except Exception as e:
        print(f"WebSocket closed: {e}")
