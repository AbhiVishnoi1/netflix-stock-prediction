from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Netflix ML Prediction API")

# CRITICAL: Allow your React app (usually on port 5173 or 3000) to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your ML assets
model = joblib.load('netflix_rf_model.pkl')
scaler = joblib.load('data_scaler.pkl')

# Define what fields the API expects
class PredictionInput(BaseModel):
    daily_return: float
    volume_change: float
    high_low_pct: float
    close_price: float

@app.post("/predict")
def get_prediction(data: PredictionInput):
    # 1. Gather features and pad if your scaler expects more dimensions
    features = [data.daily_return, data.volume_change, data.high_low_pct, data.close_price]
    num_expected = scaler.n_features_in_
    
    if len(features) < num_expected:
        features += [0.0] * (num_expected - len(features))
    
    # 2. Process data with your scaler
    input_array = np.array([features])
    scaled_input = scaler.transform(input_array)
    
    # 3. Predict
    prediction = int(model.predict(scaled_input)[0])
    probabilities = model.predict_proba(scaled_input)[0]
    confidence = float(probabilities[prediction] * 100)
    
    return {
        "prediction": "UP" if prediction == 1 else "DOWN",
        "confidence": round(confidence, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)