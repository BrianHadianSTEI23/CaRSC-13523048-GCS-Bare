from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from . import crud, schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

# 🔴 THIS IS REQUIRED
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/telemetry", response_model=list[schemas.TelemetryResponse])
def read_all(db: Session = Depends(get_db)):
    return crud.get_all(db)

@app.post("/telemetry", response_model=schemas.TelemetryResponse)
def create(data: schemas.TelemetryCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)

@app.put("/telemetry/{entry_id}")
def update(entry_id: int, data: schemas.TelemetryCreate, db: Session = Depends(get_db)):
    return crud.update(db, entry_id, data)

@app.delete("/telemetry/{entry_id}")
def delete(entry_id: int, db: Session = Depends(get_db)):
    crud.delete(db, entry_id)
    return {"ok": True}
