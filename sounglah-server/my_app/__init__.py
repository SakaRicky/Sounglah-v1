from flask import Flask, send_from_directory
from flask_restful import reqparse
from flask_cors import CORS
from . import model_loader
import logging
import os

# Configure logging for the app if not already done
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

translate_put_args = reqparse.RequestParser()
translate_put_args.add_argument('srcLanguage', type=str, help="Source Language missing", required=True)
translate_put_args.add_argument('targetLanguage', type=str, help="Target Language missing", required=True)
translate_put_args.add_argument('text', type=str, help="Text to translate missing", required=True)

# --- Global variables for model and tokenizer (if loaded once per app instance) ---
tokenizer_instance = None
model_instance = None
models_loaded_successfully  = False

def _initialize_models():
    global tokenizer_instance, model_instance, models_loaded_successfully
    if not models_loaded_successfully: # load only once
        tokenizer_instance, model_instance = model_loader.load_models()
        if tokenizer_instance and model_instance:
            models_loaded_successfully = True
            logger.info("Models initialized and loaded successfully.")
        else:
            logger.critical("CRITICAL: Model or Tokenizer failed to load. App may not function correctly.")

_initialize_models()

def create_app(config_object=None):
    """Application factory function"""
    app = Flask(__name__,
                instance_relative_config=True,
                static_folder="../frontend_build",
                static_url_path='')
    
    app.logger.info("Flask app instance created.")

    # --- Configuration ---
    # Example: Load default config or from a passed object
    # if config_object:
    #     app.config.from_object(config_object)
    # else:
    #     app.config.from_object(config.Develepmont) # Assuming a default config
    CORS(app, origins="*")
    
    if models_loaded_successfully:
        app.extensions["ml_tokenizer"] = tokenizer_instance
        app.extensions["ml_model"] = model_instance
        app.logger.info("Models are available")
    else:
        app.logger.warning("Models were not loaded successfully; translation endpoint will fail.")

    @app.route("/ping", methods=["GET"])
    def get():
        return "The server can now translate."

    @app.route("/api/translate", methods=["POST"])
    def post():
        args = translate_put_args.parse_args()
        print(f"args: {args}")
    
        text_to_translate = args.get("text")
        if text_to_translate is None:
            print("Error: 'text' argument is missing or None")
            return {"error": "Text to translate is missing"}, 400 # Example error response

        translated_ids = model_instance.generate(**tokenizer_instance(text_to_translate, return_tensors="pt", padding=True, truncation=True)) # Added truncation
    
        with tokenizer_instance.as_target_tokenizer():
            results = [tokenizer_instance.decode(t_id, skip_special_tokens=True) for t_id in translated_ids]
    
        print(f"results: {results}")

        return {"translate": {
            "srcLanguage": args["srcLanguage"],
            "targetLanguage": args["targetLanguage"],
            "fullTranslation": results
        }}

    # --- Serve React App ---
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react_app(path):
        full_path_to_file = os.path.join(app.static_folder, path)

        if path != "" and os.path.exists(full_path_to_file) and os.path.isfile(full_path_to_file):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    
    return app