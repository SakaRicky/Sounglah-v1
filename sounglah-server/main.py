from flask import Flask, send_from_directory
from flask_restful import Api, reqparse
from flask_cors import CORS
from transformers import AutoTokenizer
from transformers import AutoModelForSeq2SeqLM
import os
from memory_profiler import profile # Import the decorator


app = Flask(__name__, static_folder='frontend_build', static_url_path='')
api = Api(app)
CORS(
    app,
    origins=[
        "http://localhost:3000", # Your React frontend origin
        "http://127.0.0.1:3000"  # Alternative for localhost
    ],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Crucially includes POST and OPTIONS
    allow_headers=[
        "Content-Type",         # Essential if your POST sends application/json
        "Authorization",        # Add if you use Authorization headers
        "X-Requested-With"      # A common AJAX header, good to include
        # Add any other custom headers your frontend sends for /api/translate
    ],
    supports_credentials=True, # If your frontend expects to send/receive cookies or auth
    expose_headers=["Content-Length"] # Example, if frontend needs to read this
)


translate_put_args = reqparse.RequestParser()
translate_put_args.add_argument('srcLanguage', type=str, help="Source Language missing", required=True)
translate_put_args.add_argument('targetLanguage', type=str, help="Target Language missing", required=True)
translate_put_args.add_argument('text', type=str, help="Text to translate missing", required=True)

# --- Global variables for model and tokenizer ---
tokenizer_global = None
model_global = None

# --- Decorate the function responsible for loading the model ---
@profile # Add this decorator
def load_my_model():
    global tokenizer_global, model_global # So we can assign to the globals
    app.logger.info("Attempting to load model and tokenizer...")
    try:
        model_checkpoint = "Helsinki-NLP/opus-mt-en-mul" # Or your specific checkpoint
        model_path = "rickySaka/eng-med"

        tokenizer_global = AutoTokenizer.from_pretrained(model_checkpoint)
        model_global = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        app.logger.info("Model and tokenizer loaded successfully into globals.")
    except Exception as e:
        app.logger.error(f"Error loading model: {e}", exc_info=True)
        # Handle error appropriately, maybe exit or set a flag

# --- Call the loading function once at startup (outside any request context) ---
# This is crucial: load_my_model() will be profiled when the script starts.
load_my_model()


@app.route("/ping", methods=["GET"])
def get():
    return "The server can now translate."

@app.route("/api/translate", methods=["POST"])
def post():
    args = translate_put_args.parse_args()
    print(f"args: {args}") # Use f-string to embed the dictionary
    
    # Ensure text argument exists and is not None before passing to tokenizer
    text_to_translate = args.get("text")
    if text_to_translate is None:
        # Handle error: text is missing or None
        # You might want to return an error response to the client here
        print("Error: 'text' argument is missing or None")
        return {"error": "Text to translate is missing"}, 400 # Example error response

    translated_ids = model.generate(**tokenizer(text_to_translate, return_tensors="pt", padding=True, truncation=True)) # Added truncation
    
    with tokenizer.as_target_tokenizer():
        results = [tokenizer.decode(t_id, skip_special_tokens=True) for t_id in translated_ids]
    # The line 'results' by itself did nothing, can be removed.
    
    print(f"results: {results}") # Use f-string to embed the list

    return {"translate": {
        "srcLanguage": args["srcLanguage"],
        "targetLanguage": args["targetLanguage"],
        "fullTranslation": results
    }}

# --- Serve React App ---
# For any route not caught by an API endpoint, serve the React app's index.html.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # Construct the full path to the potential file in the frontend_build directory
    full_path_to_file = os.path.join(app.static_folder, path)

    if path != "" and os.path.exists(full_path_to_file) and os.path.isfile(full_path_to_file):
        # If the path exists as a static file in 'frontend_build' (e.g., /manifest.json, /static/js/main.js), serve it
        return send_from_directory(app.static_folder, path)
    else:
        # Otherwise, serve the 'index.html' for client-side routing (e.g., /about, /profile)
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, threaded=True, port=5000)