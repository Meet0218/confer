from abc import ABC, abstractmethod
from typing import Dict, Any

class LLMProvider(ABC):
    @abstractmethod
    def summarize(self, transcript: str) -> Dict[str, Any]:
        pass

class OpenAIProvider(LLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def summarize(self, transcript: str) -> Dict[str, Any]:
        # TODO: call OpenAI API with structured outputs
        return {
            "keyPoints": ["[STUB] OpenAI Keypoint 1"],
            "actionItems": ["[STUB] OpenAI Action 1"]
        }

class AnthropicProvider(LLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def summarize(self, transcript: str) -> Dict[str, Any]:
        # TODO: call Anthropic API with tools/structured outputs
        return {
            "keyPoints": ["[STUB] Anthropic Keypoint 1"],
            "actionItems": ["[STUB] Anthropic Action 1"]
        }
