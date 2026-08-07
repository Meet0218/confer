from abc import ABC, abstractmethod

class STTProvider(ABC):
    @abstractmethod
    def transcribe(self, audio_bytes: bytes) -> str:
        pass

class DeepgramProvider(STTProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def transcribe(self, audio_bytes: bytes) -> str:
        # TODO: call deepgram API
        return "[STUB] Deepgram transcription"

class FasterWhisperProvider(STTProvider):
    def transcribe(self, audio_bytes: bytes) -> str:
        # TODO: load faster-whisper model locally and transcribe
        return "[STUB] Whisper transcription"
