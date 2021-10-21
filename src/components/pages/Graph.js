import React from "react"
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2'
import '../../App.css'
import '../pages/Graph.css'

function Graph() {
    return (
        <>
            <div className="graph-container">
                <h1>Chicago Carjacking Data Visualizer</h1>
                <div className="graph-choice-bar">
                <select>
                    <option value="most recent">Bar Graph</option>
                    <option value="week">Doughnut Chart</option>
                    <option value="month">Line Graph</option>
                    <option value="year">Pie Chart</option>
                    <option value="year">Polar Area Chart</option>
                    <option value="year">Radar Graph</option>
                </select>
                    <div className="graph-text">
                        <Bar
                            data={{
                            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [
                                {
                                label: '# of votes',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                                },
                                // {
                                //   label: 'Quantity',
                                //   data: [47, 52, 67, 58, 9, 50],
                                //   backgroundColor: 'orange',
                                //   borderColor: 'red',
                                // },
                            ],
                            }}
                            height={400}
                            width={600}
                            options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [
                                {
                                    ticks: {
                                    beginAtZero: true,
                                    },
                                },
                                ],
                            },
                            legend: {
                                labels: {
                                fontSize: 25,
                                },
                            },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph