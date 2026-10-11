from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load trained model
model = joblib.load("final_gradient_boosting_model.pkl")


@app.route("/")
def home():
    return "Flight Delay Prediction Backend is running!"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            "carrier",
            "origin",
            "destination",
            "flight_date",
            "departure_time",
            "arrival_time",
            "elapsed_time",
            "distance"
        ]

        # Check missing fields
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing field: {field}"
                }), 400

        # Get values
        carrier = data["carrier"].strip().upper()
        origin = data["origin"].strip().upper()
        destination = data["destination"].strip().upper()
        flight_date = data["flight_date"]
        departure_time = data["departure_time"]
        arrival_time = data["arrival_time"]
        elapsed_time = float(data["elapsed_time"])
        distance = float(data["distance"])

        # Check empty text inputs
        if not carrier or not origin or not destination:
            return jsonify({
                "error": "Carrier, origin and destination cannot be empty."
            }), 400

        # Validate date
        try:
            date = pd.to_datetime(
                flight_date,
                format="%Y-%m-%d"
            )
        except ValueError:
            return jsonify({
                "error": "Invalid date. Use YYYY-MM-DD."
            }), 400

        # Validate times
        try:
            dep_parts = departure_time.split(":")
            arr_parts = arrival_time.split(":")

            dep_hour = int(dep_parts[0])
            dep_minute = int(dep_parts[1])

            arr_hour = int(arr_parts[0])
            arr_minute = int(arr_parts[1])

            if not (0 <= dep_hour <= 23 and 0 <= dep_minute <= 59):
                raise ValueError

            if not (0 <= arr_hour <= 23 and 0 <= arr_minute <= 59):
                raise ValueError

        except:
            return jsonify({
                "error": "Invalid time. Use HH:MM."
            }), 400

        # Basic validation
        if elapsed_time <= 0:
            return jsonify({
                "error": "Elapsed time must be greater than 0."
            }), 400

        if distance <= 0:
            return jsonify({
                "error": "Distance must be greater than 0."
            }), 400

        # Feature engineering

        day_of_week = date.dayofweek
        is_weekend = 1 if day_of_week >= 5 else 0

        flight = pd.DataFrame([{
            "OP_UNIQUE_CARRIER": carrier,
            "ORIGIN": origin,
            "DEST": destination,
            "DEP_HOUR": dep_hour,
            "ARR_HOUR": arr_hour,
            "DAY_OF_WEEK": day_of_week,
            "IS_WEEKEND": is_weekend,
            "CRS_ELAPSED_TIME": elapsed_time,
            "DISTANCE": distance
        }])

        prediction = model.predict(flight)[0]

        probability = model.predict_proba(
            flight
        )[0, 1]

        if prediction == 1:
            result = "Significant Delay"
        else:
            result = "No Significant Delay"

        return jsonify({
            "prediction": result,
            "delay_probability": round(
                probability * 100, 2
            )
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)