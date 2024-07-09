from flask import Flask, jsonify,request, url_for, redirect, render_template
import pickle
import numpy as np
import pandas as pd
winvision = pd.read_csv(r"winvision.csv")
drivers = pd.read_csv(r"drivers.csv")
circuits = pd.read_csv(r"archive/circuits.csv")

app = Flask(__name__)

model=pickle.load(open('winvision_model.pkl','rb'))
def prediction(driver_name, grid, circuit_loc):
    driver = drivers.loc[drivers['Name']==driver_name, 'driverId'].iloc[0]
    circuit = circuits.loc[circuits['location']==circuit_loc, ['circuitId']].iloc[0]

    input_data = winvision[winvision['driverId'] == driver].sort_values(by='date', ascending=False).iloc[0]
    circuit_data = circuits[circuits['location']==circuit_loc].iloc[0]

    features = {
        'driverId': input_data['driverId'],
        'constructorId': input_data['constructorId'],
        'grid': grid,
        'laps': input_data['laps'],
        'circuitId': circuit_data['circuitId'],
        'Constructor Experience': input_data['Constructor Experience'],
        'Driver Experience': input_data['Driver Experience'],
        'age': input_data['age'],
        'driver_wins': input_data['driver_wins'],
        'constructor_wins': input_data['constructor_wins'],
        'prev_position': input_data['prev_position'],
        'Driver Constructor Experience': input_data['Driver Constructor Experience'],
        'DNF Score': input_data['DNF Score']
        
    }
    features = pd.DataFrame([features])
    predi = model.predict(features)
    prob= model.predict_proba(features)
    return predi,prob
@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/predict',methods=['POST','GET'])
def predict():
    
    winvision = pd.read_csv(r"winvision.csv")
    drivers = pd.read_csv(r"drivers.csv")
    drivers['Name'] = drivers['forename'] + ' ' + drivers['surname']
    circuits = pd.read_csv(r"archive/circuits.csv")
    # selected_drivers = request.form.get('selected-drivers')
    # circuit_loc = request.form.get('circuit')
    grids = list(range(1, 21))
    # drivers_list = selected_drivers.split(',')
    predictions = []
    data = request.get_json(force=True)
    
    # Extract the inputs
    drivers_list = data['drivers_list']
    circuit_loc = data['circuit_loc']

    for driver_name, grid in zip(drivers_list, grids):
        predi, prob = prediction(driver_name, grid, circuit_loc)
        if predi in [1, 2, 3]:
            predictions.append(f"Driver Name: {driver_name}, Grid: {grid}, Prediction: {predi}, Probability: {np.max(prob) * 100}%")
            print(predictions)
        
    response_text = "\n".join(predictions)
    
    # Send back the prediction as a JSON response
    return response_text
    #return render_template("index.html",pred="predicted Race results {}".format(predictions))

if __name__ == '__main__':
    app.run(debug=True)