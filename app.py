from flask import Flask, jsonify, request
import pandas as pd
import joblib
import json
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# load the model
model = joblib.load("material_data_model.pkl")

# load the dataset 
material_data = pd.read_csv("material_defects_data.csv")

# show the performance of my model
@app.route('/performance', methods=['GET'])
def performance():
    with open('model_performance.json', 'r') as f:
        performance_data = json.load(f)

    coeffs = dict(zip(material_data.columns[:-1], model.coef_[0]))
    intercept = float(model.intercept_[0])

    performance_data['coefficient'] = coeffs
    performance_data['intercept'] = intercept

    return jsonify(performance_data)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    sample = pd.DataFrame([{
        'pH_level': float(data['pH_level']),
        'mixing_time' : float(data['mixing_time']),
        'cooling_rate' : float(data['cooling_rate']),
        'impurity_percentage' : float(data['impurity_percentage'])
    }])

    prediction = model.predict(sample)[0]
    probability = model.predict_proba(sample)[0][1]

    label = 'Defective' if prediction == 1 else 'Non Defective'

    new_row = pd.DataFrame([{

        'pH_level' : float(data['pH_level']),
        'mixing_time' : data['mixing_time'],
        'cooling_rate' : float(data['cooling_rate']),
        'impurity_percentage' : float(data['impurity_percentage']),
        'defect' : int(prediction)
    }])

    print(new_row)

    new_row.to_csv("material_defects_data.csv", mode='a', header=False, index=False)

    print('New data added sucessfuly')

    return jsonify({ 'Prediction': int(prediction), 'Label': label, 'Probability': round(float(probability), 2)})

if __name__ == '__main__':
    app.run(debug=True)
