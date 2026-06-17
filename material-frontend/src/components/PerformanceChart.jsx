import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function PerformanceChart () {
    const [report, setReport] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/performance').then(res => res.json()).then(data => setReport(data))
    }, [])

    if (!report){
        return <p>Loading Data....</p>
    }

    const labels = ['No Defect(0)', 'Defect(1)']
    const precision = ['0', '1'].map(key => report.Classification_report[key].precision)
    const recall = ['0', '1'].map(key => report.Classification_report[key].recall)
    const f1score = ['0', '1'].map(key => report.Classification_report[key]['f1-score'])

    const dataChart = {
        labels, 
        datasets : [
           { label: 'Precision', data: precision, backgroundColor: "rgba(59, 130, 246, 0.8)" },
           { label: 'Recall', data: recall, backgroundColor: "rgba(139, 92, 246, 0.8)" },
           { label: 'F1-Score', data: f1score, backgroundColor: "rgba(244, 63, 94, 0.8)" }
        ]
    }

    return(
        <div className="dashboard-card">
            <h2 className="card-title">Performance Chart</h2>
            <div className="chart-box">
                <Bar data = {dataChart} />
            </div>
        </div>
    )
}

export default PerformanceChart