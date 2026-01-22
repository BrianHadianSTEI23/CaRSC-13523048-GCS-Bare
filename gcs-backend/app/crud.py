from sqlalchemy.orm import Session
from . import models, schemas

def get_all(db: Session):
    return db.query(models.Telemetry).all()

def create(db: Session, data: schemas.TelemetryCreate):
    entry = models.Telemetry(**data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def update(db: Session, entry_id: int, data: schemas.TelemetryCreate):
    entry = db.query(models.Telemetry).get(entry_id)
    for key, value in data.dict().items():
        setattr(entry, key, value)
    db.commit()
    return entry

def delete(db: Session, entry_id: int):
    entry = db.query(models.Telemetry).get(entry_id)
    db.delete(entry)
    db.commit()
