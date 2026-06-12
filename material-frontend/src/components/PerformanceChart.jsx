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
           { label: 'Precision', data: precision, backgroundColor: "rgba(75,192,192,0.6)" },
           { label: 'Recall', data: recall, backgroundColor: "rgba(153,102,255,0.6)" },
           { label: 'F1-Score', data: f1score, backgroundColor: "rgba(255,159,64,0.6)" }
        ]
    }

    return(
        <div className="dashboard-card">
            <h1 className="header">Performance Chart</h1>
            <div className="chart-box">
                <Bar data = {dataChart} />
            </div>
        </div>
    )
}

export default PerformanceChart