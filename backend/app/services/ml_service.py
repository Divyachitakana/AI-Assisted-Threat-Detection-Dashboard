import joblib
import pandas as pd
from pathlib import Path

# -------------------------------------------------
# Paths
# -------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_PATH = BASE_DIR / "app" / "ml" / "random_forest_model.pkl"
ENCODER_PATH = BASE_DIR / "app" / "ml" / "label_encoders.pkl"

# -------------------------------------------------
# Load Model and Label Encoders
# -------------------------------------------------

model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODER_PATH)

# -------------------------------------------------
# Prediction Function
# -------------------------------------------------

def predict(sample: dict):

    # Convert input dictionary to DataFrame
    df = pd.DataFrame([sample])

    # Encode categorical columns
    for column, encoder in label_encoders.items():

        if column in df.columns:

            value = df[column].iloc[0]

            # Handle unseen values
            if value not in encoder.classes_:
                value = encoder.classes_[0]

            df[column] = encoder.transform([value])

    # Make prediction
    prediction = model.predict(df)[0]

    # Prediction probability
    probability = model.predict_proba(df)[0]

    confidence = round(float(max(probability)) * 100, 2)

    return {
        "prediction": "Attack" if prediction == 1 else "Normal",
        "confidence": confidence
    }