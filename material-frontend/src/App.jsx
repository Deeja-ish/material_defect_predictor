import React from "react";
import PerformanceChart from "./components/PerformanceChart";
import ConfusionMatrix from "./components/ConfusionMatrix";
import FeatureImportance from "./components/FeatureImportance";
import ModelParameters from "./components/ModelParameters";
import PredictionForm from "./components/PredictionForm";
import MetricSummary from "./components/MetricSummary";

function App () {
    return(
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Material Defect Predictor Dashboard</h1>
                <p>Machine Learning Quality Control Analytics</p>
            </header>

            <MetricSummary/>

            <div className="grid-two">
                <FeatureImportance/>
                <PerformanceChart/>
            </div>

            <ConfusionMatrix/>
            
            <div className="grid-two">
                <ModelParameters/>
                <PredictionForm/>
            </div>
        </div>
    )
}

export default App