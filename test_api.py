import requests

flight_data = {
    "carrier": "DL",
    "origin": "ATL",
    "destination": "JFK",
    "flight_date": "2025-01-15",
    "departure_time": "30:99",
    "arrival_time": "20:30",
    "elapsed_time": 150,
    "distance": -760
}

response = requests.post(
    "http://127.0.0.1:5000/predict",
    json=flight_data
)

print(response.json())