from pydantic import BaseModel, Field
from datetime import datetime

class TelemetryBase(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    altitude: float = Field(..., ge=0)
    speed: float = Field(..., ge=0)
    battery: float = Field(..., ge=0, le=100)

class TelemetryCreate(TelemetryBase):
    pass

class TelemetryResponse(TelemetryBase):
    id: int
    time: datetime

    class Config:
        orm_mode = True
