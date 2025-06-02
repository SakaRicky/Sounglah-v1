import uuid
from my_app import create_app, db 
from my_app.models import Sentence, SentenceRecording 

def seed_database(app):
    """Seeds the database with initial data."""
    print("Starting database seeding...")

    sentences_data = [
        {
            'english': "Let’s go to the shop.",
            'french': "Allons au magazins",
            'medumba': "Bag bin nèn tàn"
        },
        {
            'english': "A little bit",
            'french': "Un tout petit peut",
            'medumba': "Metsili"
        },
        {
            'english': "The doctor said I should be careful with what I eat",
            'french': "Le medecins a dit de faire attention avec ce que je mange",
            'medumba': "Ngatshwén tshob mbe a bètte mbe me bàm nà num ju ze me num njù là"
        },
        {
            'english': "The sun is rising",
            'french': "Le soleil se leve",
            'medumba': "Nyàm Tshwèt ntume"
        },
    ]

    with app.app_context():
        if Sentence.query.count() > 0:
            print("Database already appears to be seeded. Skipping.")
            return

        print("Adding sentences...")
        for data in sentences_data:
            sentence_id = str(uuid.uuid4())
            new_sentence = Sentence(
                id=sentence_id,
                english_text=data['english'],
                french_text=data['french'],
                medumba_text=data['medumba']
            )
            db.session.add(new_sentence)

            medumba_recording = SentenceRecording(
                 sentence_id=sentence_id,
                 language='medumba',
                 recording_status='pending'
            )
            db.session.add(medumba_recording)


        try:
            db.session.commit()
            print(f"Database seeded successfully with {len(sentences_data)} sentences.")
        except Exception as e:
            db.session.rollback()
            print(f"Error during seeding: {e}")

    print("Seeding complete.")

if __name__ == '__main__':
    app = create_app()
    seed_database(app)