from pathlib import Path
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# ---------------------------------------------------
# Paths
# ---------------------------------------------------

from pathlib import Path

# Project root (AI-Assisted-Threat-Detection-Dashboard)
BASE_DIR = Path(__file__).resolve().parents[3]

DATASET_DIR = BASE_DIR / "datasets"

TRAIN_FILE = DATASET_DIR / "UNSW_NB15_training-set.parquet"

MODEL_DIR = BASE_DIR / "backend" / "app" / "ml"
MODEL_DIR.mkdir(exist_ok=True)

MODEL_FILE = MODEL_DIR / "random_forest_model.pkl"

ENCODER_FILE = MODEL_DIR / "label_encoders.pkl"
# ---------------------------------------------------
# Load Dataset
# ---------------------------------------------------

print("Loading dataset...")

df = pd.read_parquet(TRAIN_FILE)

print(f"Dataset Loaded: {df.shape}")

# ---------------------------------------------------
# Remove unwanted columns
# ---------------------------------------------------

drop_columns = [
    "attack_cat"
]

# Features and Target
X = df.drop(columns=["label", "attack_cat"])
y = df["label"]
# ---------------------------------------------------
# Encode categorical columns
# ---------------------------------------------------

# ---------------------------------------------------
# Encode categorical columns
# ---------------------------------------------------

label_encoders = {}

for column in X.columns:

    # Encode every non-numeric column
    if not pd.api.types.is_numeric_dtype(X[column]):

        encoder = LabelEncoder()

        X[column] = encoder.fit_transform(X[column].astype(str))

        label_encoders[column] = encoder

print("Categorical columns encoded.")

# Safety check
print("\nRemaining non-numeric columns:")

non_numeric = X.select_dtypes(exclude=["number"]).columns.tolist()

print(non_numeric)

# ---------------------------------------------------
# Train/Test Split
# ---------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Training samples :", len(X_train))
print("Testing samples  :", len(X_test))

# ---------------------------------------------------
# Train Random Forest
# ---------------------------------------------------

print("Training Random Forest...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Training completed.")

# ---------------------------------------------------
# Evaluate
# ---------------------------------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print()

print("=" * 60)

print(f"Accuracy : {accuracy:.4f}")

print("=" * 60)

print(classification_report(y_test, predictions))

# ---------------------------------------------------
# Save Model
# ---------------------------------------------------

joblib.dump(model, MODEL_FILE)

joblib.dump(label_encoders, ENCODER_FILE)

print()

print("Model Saved")

print(MODEL_FILE)

print()

print("Encoders Saved")

print(ENCODER_FILE)