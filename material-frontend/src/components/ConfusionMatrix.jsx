import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function ConfusionMatrix () {

    const [ matrix, setMatrix ] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/performance').then(res => res.json()).then(data => setMatrix(data))
    }, [])

    if (!matrix) {
        return <p> Loading Data...</p>
    }

    const confusionMatrix = matrix.Confusion_matrix

    const non_defects = [confusionMatrix[0][0], confusionMatrix[1][0]]
    const defects = [confusionMatrix[0][1], confusionMatrix[1][1]]

    const dataChart = {
        labels : ['Actual No Defect', 'Actual Defect'],
        datasets : [
            {
                label : 'Predicted No Defect',
                data: non_defects,
                backgroundColor: "rgba(16, 185, 129, 0.8)"
            },
            {
                label : 'Predicted Defect',
                data: defects,
                backgroundColor: "rgba(244, 63, 94, 0.8)"
            }
        ]

    }

    return(
        <div className="dashboard-card">
            <h2 className="card-title">Confusion Matrix</h2>
            <div className="chart-box">
                <Bar data={dataChart}/>
            </div>
        </div>
    )
}

export default ConfusionMatrix