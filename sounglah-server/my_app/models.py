from my_app import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Sentence(db.Model):
    __tablename__ = 'sentences'

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    english_text = db.Column(db.Text)
    french_text = db.Column(db.Text)
    medumba_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

class SentenceRecording(db.Model):
    __tablename__ = 'sentence_recordings'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    sentence_id = db.Column(UUID(as_uuid=True), db.ForeignKey('sentences.id', ondelete='CASCADE'), nullable=False)
    
    language = db.Column(db.Text, nullable=False)  # e.g. 'medumba', 'english', 'french'
    
    recording_status = db.Column(db.Text, default='pending')  # 'pending', 'recorded', 'skipped', 'error'
    audio_url = db.Column(db.Text, nullable=True)
    recording_duration = db.Column(db.Float, nullable=True)
    
    quality_checked = db.Column(db.Boolean, default=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    sentence = db.relationship('Sentence', backref=db.backref('recordings', cascade='all, delete-orphan'))