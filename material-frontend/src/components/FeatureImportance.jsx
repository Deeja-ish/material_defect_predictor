import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function FeatureImportance () {
    const [coeff, setCoeff ] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/performance').then(res => res.json()).then(data =>setCoeff(data.coefficient))
    }, [])

    if (!coeff) {
        return <p>Loading Data...</p>
    }

    const labels = Object.keys(coeff)
    const values = Object.values(coeff)

    const chartData = {
        labels,
        datasets : [
            {
                label : "Feature Importance",
                data : values,
                backgroundColor : values.map(v => v > 0 ? "rgba(75,192,192,0.6)" : "rgba(255,99,132,0.6)")
            }
        ]
    }

    return(
        <div className="dashboard-card">
            <h1 className="title">Feature Importance</h1>
            <div className="chart-box">
                <Bar data={chartData}/>
            </div>
        </div>
    )
}

export default FeatureImportance