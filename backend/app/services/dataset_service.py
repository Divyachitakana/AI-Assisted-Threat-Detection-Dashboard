from pathlib import Path
import pandas as pd

# Project root (AI-Assisted-Threat-Detection-Dashboard)
BASE_DIR = Path(__file__).resolve().parents[3]

DATASET_DIR = BASE_DIR / "datasets"

TRAIN_FILE = DATASET_DIR / "UNSW_NB15_training-set.parquet"
TEST_FILE = DATASET_DIR / "UNSW_NB15_testing-set.parquet"


def load_training_data():
    return pd.read_parquet(TRAIN_FILE)
from pathlib import Path
import pandas as pd

# Project root (AI-Assisted-Threat-Detection-Dashboard)
BASE_DIR = Path(__file__).resolve().parents[3]

DATASET_DIR = BASE_DIR / "datasets"

TRAIN_FILE = DATASET_DIR / "UNSW_NB15_training-set.parquet"
TEST_FILE = DATASET_DIR / "UNSW_NB15_testing-set.parquet"


def load_training_data():
    return pd.read_parquet(TRAIN_FILE)


def load_testing_data():
    return pd.read_parquet(TEST_FILE)


def get_sample_data(rows: int = 10):
    df = load_training_data()
    return df.head(rows).to_dict(orient="records")

def load_testing_data():
    return pd.read_parquet(TEST_FILE)


def get_sample_data(rows: int = 10):
    df = load_training_data()
    return df.head(rows).to_dict(orient="records")