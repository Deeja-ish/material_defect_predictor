# Material Defect Predictor

An end-to-end Machine Learning quality control system designed to predict material defects during manufacturing processes. This project utilizes a Logistic Regression model to assess whether a material is defective or non-defective based on chemical and physical parameters, backed by a Flask REST API and a premium React-based dashboard.

---

## 📊 Project Overview

In manufacturing and quality control, detecting defects early can save significant time and resources. This project provides a full-stack solution to:
- **Predict Defects**: Determine the likelihood of a material being defective using four key manufacturing parameters: pH level, mixing time, cooling rate, and impurity percentage.
- **Analyze Performance**: Visualize model performance in real time (Confusion Matrix, Precision-Recall Curve, and Feature Importance).
- **Log Predictions**: Keep a live database by appending new predictions directly into the dataset for continuous feedback and future retraining.

---

## 📁 Project Structure

```text
material_defects_predictor/
│
├── app.py                             # Flask REST API backend
├── material_data_model.pkl            # Serialized Logistic Regression model
├── material_defects_data.csv          # Dataset (historical + live logs)
├── model_performance.json             # Classification report and performance metrics
├── material_defects.ipynb             # Jupyter Notebook for EDA, training, and evaluation
│
├── material-frontend/                 # React frontend application (Vite)
│   ├── src/
│   │   ├── components/                # Dashboard UI components
│   │   │   ├── MetricSummary.jsx      # Summary cards for Accuracy, Recall, Precision
│   │   │   ├── FeatureImportance.jsx  # Visualization of model coefficients
│   │   │   ├── ConfusionMatrix.jsx    # Display of True/False Positives/Negatives
│   │   │   ├── ModelParameters.jsx    # Model weights, bias, and parameters
│   │   │   └── PredictionForm.jsx     # Form to input parameters and make predictions
│   │   ├── App.jsx                    # Main application layout
│   │   └── index.css                  # Custom styling (glassmorphism/dark mode)
│   └── package.json                   # Frontend configuration and dependencies
│
└── *.png                              # Static visualizations generated during training
```

---

## 🧪 Model Details & Dataset

The predictive model is a **Logistic Regression** classifier trained on simulated data (`material_defects_data.csv`).

### Input Features
1. **pH Level** (`pH_level`): Chemical property ranging from $6.5$ to $7.5$.
2. **Mixing Time** (`mixing_time`): Time in minutes ranging from $20$ to $60$.
3. **Cooling Rate** (`cooling_rate`): Cooling rate in °C/min ranging from $4.0$ to $6.0$.
4. **Impurity Percentage** (`impurity_percentage`): Measured impurities from $0.0\%$ to $1.0\%$.

### Model Performance Metrics
- **Accuracy**: $67.6\%$
- **Defective (Class 1) Precision**: $68.6\%$
- **Defective (Class 1) Recall**: $84.9\%$
- **Defective (Class 1) F1-Score**: $0.76$

---

## ⚡ Getting Started

Follow these instructions to set up the project locally on your machine.

### Backend Setup (Flask API)

1. **Navigate to the root directory**:
   ```bash
   cd material_defects_predictor
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   # On Windows (PowerShell)
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install the required packages**:
   ```bash
   pip install flask pandas joblib flask-cors scikit-learn matplotlib
   ```

4. **Start the Flask server**:
   ```bash
   python app.py
   ```
   The backend API will run on `http://127.0.0.1:5000`.

### Frontend Setup (React App)

1. **Navigate to the frontend folder**:
   ```bash
   cd material-frontend
   ```

2. **Install node packages**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the URL displayed in the terminal) in your browser to view the dashboard.

---

## 🔌 API Documentation

### 1. Get Model Performance
Returns saved evaluation metrics, feature coefficients, and intercept.
- **Endpoint**: `/performance`
- **Method**: `GET`
- **Response Example**:
  ```json
  {
    "Confusion_matrix": [[35, 49], [19, 107]],
    "Classification_report": { ... },
    "coefficient": {
      "pH_level": -0.8423,
      "mixing_time": -0.0051,
      "cooling_rate": -1.0254,
      "impurity_percentage": -1.9845
    },
    "intercept": 15.654
  }
  ```

### 2. Predict Defect Status
Receives material properties, runs prediction, appends properties to the training CSV file, and returns prediction details.
- **Endpoint**: `/predict`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "pH_level": 7.1,
    "mixing_time": 30,
    "cooling_rate": 4.5,
    "impurity_percentage": 0.25
  }
  ```
- **Response Example**:
  ```json
  {
    "Prediction": 0,
    "Label": "Non Defective",
    "Probability": 0.28
  }
  ```

---

## 🎨 Visualizations

The directory contains several diagnostic plots for debugging and inspection:
- **`Materials_defects_display.png`**: The confusion matrix plot.
- **`Bar Logistic Regression Coefficients.png`**: Visual bar representation of feature importance values.
- **`precision_recall_curve.png`**: Metric curve displaying model sensitivity/specificity trade-off.
