from fastapi import APIRouter
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.ml_service import predict

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)


@router.get("/test")
def test_prediction():

    sample = {
        "dur": 0.12,
        "proto": "tcp",
        "service": "http",
        "state": "FIN",
        "spkts": 10,
        "dpkts": 8,
        "sbytes": 1200,
        "dbytes": 950,
        "rate": 20.5,
        "sload": 1200.5,
        "dload": 1100.4,
        "sloss": 0,
        "dloss": 0,
        "sinpkt": 10.1,
        "dinpkt": 9.8,
        "sjit": 0.2,
        "djit": 0.3,
        "swin": 255,
        "stcpb": 12345,
        "dtcpb": 23456,
        "dwin": 255,
        "tcprtt": 0.02,
        "synack": 0.01,
        "ackdat": 0.01,
        "smean": 120,
        "dmean": 110,
        "trans_depth": 0,
        "response_body_len": 500,
        "ct_src_dport_ltm": 2,
        "ct_dst_sport_ltm": 3,
        "is_ftp_login": 0,
        "ct_ftp_cmd": 0,
        "ct_flw_http_mthd": 1,
        "is_sm_ips_ports": 0
    }

    return predict(sample)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict_endpoint(request: PredictionRequest):

    return predict(request.model_dump())