# Use a slim Python image (e.g., 3.10 is a good balance for many ML libraries)
FROM python:3.10-slim-buster

# Set the working directory in the container
WORKDIR /app

# Ensure non-buffered stdout for real-time logs
ENV PYTHONUNBUFFERED 1

# Install system dependencies (e.g., if your model requires specific system libs)
# For example, if you need git or specific compilers for some pip packages:
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     git \
#     build-essential \
#     && rm -rf /var/lib/apt/lists/*

# Copy requirements file and install Python dependencies
# This step is cached, so only runs if requirements.txt changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
# This includes app.py, models/, frontend_build/, etc.
COPY . .

# Expose the port that Gunicorn will listen on
# Fly.io defaults to port 8080 for web services, but you can configure it.
EXPOSE 8080

# Command to run your application using Gunicorn
# This is CRITICAL for memory management with your large AI model.
# --workers 1: Ensures only one copy of your model is loaded into memory.
# --threads 4: Allows some concurrency within that single worker. Adjust as needed.
# --timeout 120: Gives longer requests (like model inference) more time before timing out.
# app:app refers to 'app' variable within 'app.py' file. Adjust if your Flask app variable is named differently (e.g., 'main:my_app').
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "1", "--threads", "4", "--timeout", "120", "main:app"]