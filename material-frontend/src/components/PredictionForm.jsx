import { useState } from "react";

function PredictionForm () {
    const [ formData, setFormData ] = useState ({ pH_level : "", mixing_time: "", cooling_rate : "", impurity_percentage : ""})

    const [result, setResult ] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method : 'POST',
                headers : {'Content-Type': "application/json"},
                body : JSON.stringify(formData)
            });
        
            const data = await response.json()
            setResult(data)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="prediction-panel">
            <h2 className="card-title">Make a Prediction</h2>
            <form className='prediction-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>pH Level</label>
                    <input type="number" name="pH_level" step="0.1" required onChange={handleChange} value={formData.pH_level} placeholder="e.g. 7.0"/>
                </div>

                <div className="form-group">
                    <label>Mixing Time (min)</label>
                    <input type="number" name="mixing_time" required onChange={handleChange} value={formData.mixing_time} placeholder="e.g. 35"/>
                </div>

                <div className="form-group">
                    <label>Cooling Rate (°C/min)</label>
                    <input type="number" name="cooling_rate" required onChange={handleChange} value={formData.cooling_rate} step="0.1" placeholder="e.g. 5.0"/>
                </div>

                <div className="form-group">
                    <label>Impurity Percentage (%)</label>
                    <input type="number" name="impurity_percentage" required onChange={handleChange} value={formData.impurity_percentage} step="0.01" placeholder="e.g. 0.15"/>
                </div>

                <button type="submit" className="submit-btn">Run Prediction</button>
            </form>

            { result && (
            <div className={`result-card ${result.Prediction === 1 ? 'defective' : 'non-defective'}`}>
                <h3>Prediction Result</h3>
                <div className="result-details">
                    <div className="result-item">
                        <span className="result-label">Prediction:</span>
                        <span className={`badge ${result.Prediction === 1 ? 'badge-defective' : 'badge-ok'}`}>
                            {result.Label}
                        </span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Probability:</span>
                        <span className="result-value">{(result.Probability * 100).toFixed(0)}%</span>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default PredictionForm