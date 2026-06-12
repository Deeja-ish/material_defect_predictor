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
            <h2>Make A prediction</h2>
            <form className='prediction-form' onSubmit={handleSubmit} style={{ margin: "20px auto",  width: "60%"}}>
                <label>pH_Level: </label>
                <input type="number" name="pH_level" step="0.1" required onChange={handleChange} value={formData.pH_level}/>

                <label>Mixing time (minutes): </label>
                <input type="number" name="mixing_time" required onChange={handleChange} value={formData.mixing_time} />

                <label> Cooling rate </label>
                <input type="number" name="cooling_rate" required onChange={handleChange} value={formData.cooling_rate} step="0.1"/>

                <label> Impurity Percentage</label>
                <input type="number" name="impurity_percentage" required onChange={handleChange} value={formData.impurity_percentage} step= "0.01" />

                <button type="submit"> Submit </button>
            </form>

            { result && (
            <div className="result-card">
                <h3>Prediction Result</h3>
                <p><strong>Status: </strong> {' '} {result.Prediction}</p>
                <p><strong>Label: </strong> {' '} {result.Label}</p>
                <p><strong>Confidence: </strong>{' '} {(result.Probability * 100).toFixed(2)}%</p>
            </div>
            )}
        </div>
    )
}

export default PredictionForm