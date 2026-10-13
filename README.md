# LibertyWing — Airline Delay Prediction System

<p align="center">
  <img
    src="docs/images/LibertyWing.png"
    alt="LibertyWing — Airline Delay Prediction System"
    width="100%"
  />
</p>

A machine learning-powered web application for predicting significant airline departure delays using a Gradient Boosting model, a Flask REST API, and a React frontend.

## Overview

LibertyWing is a collaborative university mini project developed for IT3051 — Fundamentals of Data Mining in 2026.

The application predicts whether a flight is likely to experience a significant departure delay of 15 minutes or more. Users can enter flight details through an interactive web interface and receive a prediction with an estimated delay probability.

The project demonstrates data preprocessing, feature engineering, classification, model evaluation, and full-stack application integration.

## Key Features

- Flight departure delay prediction
- Estimated delay probability
- Interactive React interface
- Flask REST API for machine learning inference
- Flight input validation
- Automated feature engineering
- Model evaluation and comparison
- Flight comparison and exploratory data analysis interfaces

## Machine Learning Workflow

1. Historical flight data preparation
2. Data cleaning and preprocessing
3. Feature engineering
4. Classification model training and comparison
5. Model evaluation and optimization
6. Final model selection
7. Integration of the trained model into Flask
8. Connection to the React frontend

## Features Used for Prediction

The model pipeline expects nine features:

- Airline carrier
- Origin airport
- Destination airport
- Departure hour
- Arrival hour
- Day of week
- Weekend indicator
- Scheduled flight duration
- Flight distance

The backend derives time-based features from the submitted flight date and times before generating the prediction.

## Final Machine Learning Model

**Model:** Class-Weighted Gradient Boosting Classifier

The trained model is saved in `final_gradient_boosting_model.pkl` and loaded by the Flask backend.

### Reported Evaluation Results

| Metric | Score |
|---|---:|
| Accuracy | 55.42% |
| Precision | 14.67% |
| Recall | 60.05% |
| F1-score | 23.59% |
| ROC-AUC | 59.64% |
| PR-AUC | 15.31% |

These results are reported in the original project documentation. The relatively low precision indicates that many predicted delays may be false positives. Predictions should therefore be treated as estimates, not guaranteed flight outcomes.

## Technology Stack

**Machine Learning and Data Science**
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

**Backend**
- Flask
- REST API

**Frontend**
- React
- JavaScript
- Vite
- CSS

## System Architecture

```text
User
 |
 v
React Frontend
 |
 | POST /predict
 v
Flask REST API
 |
 v
Input Validation
 |
 v
Feature Engineering
 |
 v
Trained Gradient Boosting Pipeline
 |
 v
Prediction and Delay Probability
 |
 v
React Results Interface
```

## Getting Started

### Prerequisites

- Python and pip
- Node.js and npm

### 1. Set Up the Backend

Open a terminal in the project root directory.

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
python -m pip install -r requirements.txt
```

Start the Flask backend:

```powershell
python app.py
```

The backend normally runs at `http://127.0.0.1:5000`.

Keep this terminal open.

### 2. Set Up the Frontend

Open a second terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

The Vite development proxy forwards `/predict` requests to the Flask backend.

Keep both servers running while using the application.

## API Reference

### Predict Flight Delay

**Endpoint:** `POST /predict`

**Content-Type:** `application/json`

Example request:

```json
{
  "carrier": "DL",
  "origin": "ATL",
  "destination": "JFK",
  "flight_date": "2025-01-15",
  "departure_time": "18:30",
  "arrival_time": "20:30",
  "elapsed_time": 120,
  "distance": 760
}
```

Example response structure:

```json
{
  "prediction": "No Significant Delay",
  "delay_probability": 35.25
}
```

The response values are illustrative only. Actual results depend on the trained model and supplied flight details.

## Project Structure

```text
LibertyWing-Airline-Delay-Prediction-System/
├── app.py
├── final_gradient_boosting_model.pkl
├── requirements.txt
├── test_api.py
├── README.md
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── App.css
        ├── components/
        ├── pages/
        ├── data/
        └── assets/
```

## Limitations

- Predictions are estimates and cannot guarantee actual flight outcomes.
- Model performance depends on the training data and the information supplied.
- The reported precision indicates a substantial false-positive limitation.
- The application is configured for local development, not production deployment.

## Academic Context

Developed collaboratively as part of IT3051 — Fundamentals of Data Mining, 2026.

The repository documents the project implementation. Contributions should be attributed accurately to the team members involved.

## License

A license should be added after confirming permission to redistribute the team's source code and associated assets.
