from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str = Field(..., min_length=7, max_length=30)
    email: EmailStr | None = None
    service: str = Field(..., min_length=2, max_length=80)
    message: str = Field(..., min_length=10, max_length=1000)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: EmailStr | None = None
    service: str
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "SERFIX Service Limited API is ready"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(input: InquiryCreate):
    cleaned = input.model_dump()
    inquiry = Inquiry(**cleaned)
    doc = inquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()

    try:
        await db.serfix_inquiries.insert_one(doc)
    except Exception as exc:
        logger.exception("Failed to save SERFIX inquiry")
        raise HTTPException(status_code=500, detail="Unable to save inquiry") from exc

    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    inquiries = await db.serfix_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for inquiry in inquiries:
        if isinstance(inquiry.get("created_at"), str):
            inquiry["created_at"] = datetime.fromisoformat(inquiry["created_at"])

    return inquiries

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()