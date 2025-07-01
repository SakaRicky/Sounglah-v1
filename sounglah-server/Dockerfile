# Use a slim Python image
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app

# Ensure non-buffered stdout for real-time logs
ENV PYTHONUNBUFFERED 1

# Set environment variables to control the Hugging Face cache location
ENV HF_HOME=/app/huggingface_cache
ENV HF_DATASETS_CACHE=/app/huggingface_cache
ENV TRANSFORMERS_CACHE=/app/huggingface_cache

# --- Pre-bake the model AND the tokenizer ---
# 1. Install dependencies needed for the download
RUN pip install --no-cache-dir transformers==4.24.0 torch sentencepiece --extra-index-url https://download.pytorch.org/whl/cpu

# 2. Run a Python script to download BOTH the required tokenizer and the required model
RUN python -c "from transformers import AutoModelForSeq2SeqLM, AutoTokenizer; \
               \
               tokenizer_path = 'Helsinki-NLP/opus-mt-en-mul'; \
               model_path = 'rickySaka/eng-med'; \
               \
               print(f'---> Downloading and caching tokenizer: {tokenizer_path}...'); \
               AutoTokenizer.from_pretrained(tokenizer_path); \
               print('---> Tokenizer download complete.'); \
               \
               print(f'---> Downloading and caching model: {model_path}...'); \
               AutoModelForSeq2SeqLM.from_pretrained(model_path); \
               print('---> Model download complete.')"

# --- The rest of your Dockerfile remains the same ---

# Copy requirements file and install the REST of your Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port that Gunicorn will listen on
EXPOSE 8080

# Command to run your application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--threads", "4", "--timeout", "120", "my_app:create_app()"]