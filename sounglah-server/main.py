from flask import Flask
from flask_restful import Api, reqparse
from flask_cors import CORS
from transformers import AutoTokenizer
from transformers import AutoModelForSeq2SeqLM

app = Flask(__name__)
api = Api(app)
CORS(app)

translate_put_args = reqparse.RequestParser()
translate_put_args.add_argument('srcLanguage', type=str, help="Source Language missing", required=True)
translate_put_args.add_argument('targetLanguage', type=str, help="Target Language missing", required=True)
translate_put_args.add_argument('text', type=str, help="Text to translate missing", required=True)

model_checkpoint = "Helsinki-NLP/opus-mt-en-mul"
tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
model = AutoModelForSeq2SeqLM.from_pretrained("rickySaka/eng-med")

@app.route("/translate", methods=["GET"])
def get():
    return "The server can now translate."

@app.route("/translate", methods=["POST"])
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
        "translatedText": results
    }}

# api.add_resource(Translate, '/translate')

if __name__ == "__main__":
    app.run(threaded=True)