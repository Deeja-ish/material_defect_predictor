import { useState, useEffect } from "react";

function MetricSummary() {

    const [metrics, setMetrics] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/performance').then(res => res.json()).then(data => setMetrics(data))
    }, [])

    if(!metrics) {
        return <p>Loading Data...</p>
    }

    const report = metrics.Classification_report

    const accuracy = (report['accuracy'] * 100).toFixed(3);
    const precision = (report['1']['precision'] * 100).toFixed(3);
    const recall = (report['1']['recall'] * 100).toFixed(3);
    const f1Score = (report['1']['f1-score'] * 100).toFixed(3);

    return(
        <div className="metrics-container">
            <div className="metric-card">
                <h3>Accuracy</h3>
                <p>{accuracy}</p>
            </div>
            <div className="metric-card">
                <h3>Precision</h3>
                <p>{precision}</p>
            </div>
            <div className="metric-card">
                <h3>Recall</h3>
                <p>{recall}</p>
            </div>
            <div className="metric-card">
                <h3>F1 Score</h3>
                <p>{f1Score}</p>
            </div>
        </div>
    )


}

export default MetricSummary