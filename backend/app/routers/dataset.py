from fastapi import APIRouter
from app.services.dataset_service import get_sample_data

router = APIRouter(prefix="/dataset", tags=["dataset"])

@router.get("/sample")
def sample_dataset():
    return get_sample_data(10)