# Use a slim Python image (e.g., 3.10 is a good balance for many ML libraries)
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app

# Ensure non-buffered stdout for real-time logs
ENV PYTHONUNBUFFERED 1

# --- NEW: Set environment variables to control the Hugging Face cache location ---
# This tells the 'transformers' library to save models inside our /app directory
ENV HF_HOME=/app/huggingface_cache
ENV HF_DATASETS_CACHE=/app/huggingface_cache
ENV TRANSFORMERS_CACHE=/app/huggingface_cache

# --- NEW: Pre-bake the model into the image ---
# This happens ONCE during the `fly deploy` build process.

# 1. Install only the libraries needed to download the model.
#    This leverages Docker's layer caching for efficiency.
RUN pip install --no-cache-dir transformers==4.24.0 torch sentencepiece --extra-index-url https://download.pytorch.org/whl/cpu

# 2. Run a Python script to download the model and tokenizer.
#    This will save them to the cache directory defined by HF_HOME.
RUN python -c "from transformers import AutoModelForSeq2SeqLM, AutoTokenizer; \
               model_path = 'rickySaka/eng-med'; \
               print(f'---> Downloading and caching model and tokenizer for {model_path}...'); \
               AutoTokenizer.from_pretrained(model_path); \
               AutoModelForSeq2SeqLM.from_pretrained(model_path); \
               print('---> Download complete.')"

# --- The rest of your Dockerfile remains the same ---

# Copy requirements file and install the REST of your Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port that Gunicorn will listen on
EXPOSE 8080

# Command to run your application using Gunicorn
# !! IMPORTANT !! Based on your `__init__.py` file, your app factory is `create_app()`.
# You should use `my_app:create_app()` if your module is named `my_app`.
# If your main file is `main.py` and it contains `app = create_app()`, then `main:app` is correct.
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--threads", "4", "--timeout", "120", "my_app:create_app()"]