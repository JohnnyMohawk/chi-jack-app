import React, {useState, useEffect} from "react"
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2'
import {formatDay, getDaysInMonth, createWeekArr, yearRange} from '../services/mapService.js'
import '../../App.css'
import '../pages/Graph.css'

function Graph() {

    const currentYear = new Date().getFullYear()

    const [yearArray, setYearArray] = useState([])
    const [annualCjData, setAnnualCjData] = useState({})

    const makeApiCall = async() => {
        let annualDataObj = {}
        let res = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?description=AGGRAVATED%20VEHICULAR%20HIJACKING&$limit=50000&$offset=0')
        let data = await res.json()
        let yearArr = yearRange(2001, currentYear)
        setYearArray(yearArr)
        // console.log(data.filter(crime => crime.date.includes(2020)).length)
        yearArr.forEach(year => {
            annualDataObj[year] = data.filter(crime => crime.date.includes(year)).length
        });
        // console.log(annualDataObj)
        setAnnualCjData(annualDataObj)
    }

    useEffect(() => {
        makeApiCall()
        console.log("BUTTS", Object.values(annualCjData))
    }, [])

    return (
        <>
            <div className="graph-container">
                <h1>Chicago Carjacking Data Visualizer</h1>
                <div className="graph-choice-bar">
                <select>
                    <option value="bar">Bar Graph</option>
                    <option value="doughnut">Doughnut Chart</option>
                    <option value="line">Line Graph</option>
                    <option value="pie">Pie Chart</option>
                    <option value="polar">Polar Area Chart</option>
                    <option value="radar">Radar Graph</option>
                </select>
                    <div className="graph-text">
                        <Bar
                            data={{
                            labels: Object.keys(annualCjData),
                            datasets: [
                                {
                                label: '# of votes',
                                data: Object.values(annualCjData),
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