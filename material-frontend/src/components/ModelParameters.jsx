import { useState, useEffect } from "react";

function ModelParameters () {
    const [ params, setParams ] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5000/performance').then(res => res.json()).then(data => setParams({ intercept : data.intercept, coefficient : data.coefficient }))
    }, [])

    if(!params) {
        return <p>Loading Data...</p>
    }

    return(
        <div className="dashboard-card">
            <h2 className="card-title">Model Parameters</h2>

            <div className="table-wrapper">
                <table className="model-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Coefficient</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(params.coefficient).map(([feature, coef]) => (
                            <tr key={feature}>
                                <td>{feature}</td>
                                <td>{coef.toFixed(4)}</td>
                            </tr>
                        ))}

                        <tr className="intercept-row">
                            <td>Intercept</td>
                            <td>{params.intercept.toFixed(4)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModelParameters