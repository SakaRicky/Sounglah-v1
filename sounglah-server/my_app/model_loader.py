from transformers import AutoTokenizer
from transformers import AutoModelForSeq2SeqLM
import logging

logger = logging.getLogger(__name__)

def load_models():
    global tokenizer_global, model_global
    logger.info("Attempting to load model and tokenizer...")
    try:
        model_checkpoint = "Helsinki-NLP/opus-mt-en-mul"
        model_path = "rickySaka/eng-med"

        tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        logger.info("Model and tokenizer loaded successfully into globals.")
        return tokenizer, model
    except Exception as e:
        logger.error(f"Error loading model: {e}", exc_info=True)
        return None, None