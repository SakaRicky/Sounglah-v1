from flask import Flask, send_from_directory
from flask_restful import Api, reqparse
from flask_cors import CORS
from transformers import AutoTokenizer
from transformers import AutoModelForSeq2SeqLM
import os

app = Flask(__name__, static_folder='frontend_build', static_url_path='')
api = Api(app)
CORS()


translate_put_args = reqparse.RequestParser()
translate_put_args.add_argument('srcLanguage', type=str, help="Source Language missing", required=True)
translate_put_args.add_argument('targetLanguage', type=str, help="Target Language missing", required=True)
translate_put_args.add_argument('text', type=str, help="Text to translate missing", required=True)

# --- Global variables for model and tokenizer ---
tokenizer_global = None
model_global = None

def load_my_model():
    global tokenizer_global, model_global # So we can assign to the globals
    app.logger.info("Attempting to load model and tokenizer...")
    try:
        model_checkpoint = "Helsinki-NLP/opus-mt-en-mul"
        model_path = "rickySaka/eng-med"

        tokenizer_global = AutoTokenizer.from_pretrained(model_checkpoint)
        model_global = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        app.logger.info("Model and tokenizer loaded successfully into globals.")
    except Exception as e:
        app.logger.error(f"Error loading model: {e}", exc_info=True)

load_my_model()


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

    translated_ids = model_global.generate(**tokenizer_global(text_to_translate, return_tensors="pt", padding=True, truncation=True)) # Added truncation
    
    with tokenizer_global.as_target_tokenizer():
        results = [tokenizer_global.decode(t_id, skip_special_tokens=True) for t_id in translated_ids]
    
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

if __name__ == "__main__":
    app.run(debug=True, threaded=True, port=5000)