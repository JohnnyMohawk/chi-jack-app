import React, {useState, useEffect} from "react"
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2'
import {formatDay, getDaysInMonth, createWeekArr, yearRange} from '../services/mapService.js'
import '../../App.css'
import '../pages/Graph.css'

function Graph() {

    const currentYear = new Date().getFullYear()

    // const [yearArray, setYearArray] = useState([])
    const [annualCjData, setAnnualCjData] = useState({})
    const [graphType, setGraphType] = useState('bar')

    const makeApiCall = async() => {
        let annualDataObj = {}
        let res = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?description=AGGRAVATED%20VEHICULAR%20HIJACKING&$limit=50000&$offset=0')
        let data = await res.json()
        let yearArr = yearRange(2001, currentYear)
        // setYearArray(yearArr)
        // console.log(data.filter(crime => crime.date.includes(2020)).length)
        yearArr.forEach(year => {
            annualDataObj[year] = data.filter(crime => crime.date.includes(year)).length
        });
        // console.log(annualDataObj)
        setAnnualCjData(annualDataObj)
    }

    useEffect(() => {
        makeApiCall()
        // console.log(graphType)
    }, [graphType])

    return (
        <>
            <div className="graph-container">
                <h1>Chicago Carjacking Data Visualizer</h1>
                <div className="graph-choice-bar">
                    <select defaultValue={graphType} onChange={event => {
                    setGraphType(event.target.value)
                    }}>
                        <option value="bar">Bar Graph</option>
                        <option value="doughnut">Doughnut Chart</option>
                        <option value="line">Line Graph</option>
                        <option value="pie">Pie Chart</option>
                        <option value="polar">Polar Area Chart</option>
                        <option value="radar">Radar Graph</option>
                    </select>
                </div>
                <div className="graph-text">
                    {graphType === "bar" ? <Bar
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.2)',
                                'rgba(0,255,0, 0.2)',
                                'rgba(0,0,255, 0.2)',
                                'rgba(0,255,255, 0.2)',
                                'rgba(255,0,255, 0.2)',
                                'rgba(192,192,192, 0.2)',
                                'rgba(128,128,128, 0.2)',
                                'rgba(128,0,0, 0.2)',
                                'rgba(128,128,0, 0.2)',
                                'rgba(0,40,0, 0.2)',
                                'rgba(128,0,128, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(0,0,128, 0.2)',
                                'rgba(255,127,80, 0.2)',
                                'rgba(255,140,0, 0.2)',
                                'rgba(184,134,11, 0.2)',
                                'rgba(34,139,34, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(255,105,180, 0.2)',
                                'rgba(245,222,179, 0.2)',
                                'rgba(139,69,19, 0.2)',
                                'rgba(188,143,143, 0.2)',
                                'rgba(112,128,144, 0.2)',
                                'rgba(240,255,240, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,0,0, 1)',
                                'rgba(0,255,0, 1)',
                                'rgba(0,0,255, 1)',
                                'rgba(0,255,255, 1)',
                                'rgba(255,0,255, 1)',
                                'rgba(192,192,192, 1)',
                                'rgba(128,128,128, 1)',
                                'rgba(128,0,0, 1)',
                                'rgba(128,128,0, 1)',
                                'rgba(0,40,0, 1)',
                                'rgba(128,0,128, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(0,0,128, 1)',
                                'rgba(255,127,80, 1)',
                                'rgba(255,140,0, 1)',
                                'rgba(184,134,11, 1)',
                                'rgba(34,139,34, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(255,105,180, 1)',
                                'rgba(245,222,179, 1)',
                                'rgba(139,69,19, 1)',
                                'rgba(188,143,143, 1)',
                                'rgba(112,128,144, 1)',
                                'rgba(240,255,240, 1)',
                            ],
                            borderWidth: 2,
                            },
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
                    /> :
                    <></>}
                    {graphType === "doughnut" ? <Doughnut
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.2)',
                                'rgba(0,255,0, 0.2)',
                                'rgba(0,0,255, 0.2)',
                                'rgba(0,255,255, 0.2)',
                                'rgba(255,0,255, 0.2)',
                                'rgba(192,192,192, 0.2)',
                                'rgba(128,128,128, 0.2)',
                                'rgba(128,0,0, 0.2)',
                                'rgba(128,128,0, 0.2)',
                                'rgba(0,40,0, 0.2)',
                                'rgba(128,0,128, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(0,0,128, 0.2)',
                                'rgba(255,127,80, 0.2)',
                                'rgba(255,140,0, 0.2)',
                                'rgba(184,134,11, 0.2)',
                                'rgba(34,139,34, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(255,105,180, 0.2)',
                                'rgba(245,222,179, 0.2)',
                                'rgba(139,69,19, 0.2)',
                                'rgba(188,143,143, 0.2)',
                                'rgba(112,128,144, 0.2)',
                                'rgba(240,255,240, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,0,0, 1)',
                                'rgba(0,255,0, 1)',
                                'rgba(0,0,255, 1)',
                                'rgba(0,255,255, 1)',
                                'rgba(255,0,255, 1)',
                                'rgba(192,192,192, 1)',
                                'rgba(128,128,128, 1)',
                                'rgba(128,0,0, 1)',
                                'rgba(128,128,0, 1)',
                                'rgba(0,40,0, 1)',
                                'rgba(128,0,128, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(0,0,128, 1)',
                                'rgba(255,127,80, 1)',
                                'rgba(255,140,0, 1)',
                                'rgba(184,134,11, 1)',
                                'rgba(34,139,34, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(255,105,180, 1)',
                                'rgba(245,222,179, 1)',
                                'rgba(139,69,19, 1)',
                                'rgba(188,143,143, 1)',
                                'rgba(112,128,144, 1)',
                                'rgba(240,255,240, 1)',
                            ],
                            borderWidth: 2,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            // yAxes: [
                            // {
                            //     ticks: {
                            //     beginAtZero: true,
                            //     },
                            // },
                            // ],
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "line" ? <Line
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            borderColor: [
                                'rgba(255,0,0, 1)',
                            ],
                            borderWidth: 4,
                            },
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
                    /> :
                    <></>}
                    {graphType === "pie" ? <Pie
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.2)',
                                'rgba(0,255,0, 0.2)',
                                'rgba(0,0,255, 0.2)',
                                'rgba(0,255,255, 0.2)',
                                'rgba(255,0,255, 0.2)',
                                'rgba(192,192,192, 0.2)',
                                'rgba(128,128,128, 0.2)',
                                'rgba(128,0,0, 0.2)',
                                'rgba(128,128,0, 0.2)',
                                'rgba(0,40,0, 0.2)',
                                'rgba(128,0,128, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(0,0,128, 0.2)',
                                'rgba(255,127,80, 0.2)',
                                'rgba(255,140,0, 0.2)',
                                'rgba(184,134,11, 0.2)',
                                'rgba(34,139,34, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(255,105,180, 0.2)',
                                'rgba(245,222,179, 0.2)',
                                'rgba(139,69,19, 0.2)',
                                'rgba(188,143,143, 0.2)',
                                'rgba(112,128,144, 0.2)',
                                'rgba(240,255,240, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,0,0, 1)',
                                'rgba(0,255,0, 1)',
                                'rgba(0,0,255, 1)',
                                'rgba(0,255,255, 1)',
                                'rgba(255,0,255, 1)',
                                'rgba(192,192,192, 1)',
                                'rgba(128,128,128, 1)',
                                'rgba(128,0,0, 1)',
                                'rgba(128,128,0, 1)',
                                'rgba(0,40,0, 1)',
                                'rgba(128,0,128, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(0,0,128, 1)',
                                'rgba(255,127,80, 1)',
                                'rgba(255,140,0, 1)',
                                'rgba(184,134,11, 1)',
                                'rgba(34,139,34, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(255,105,180, 1)',
                                'rgba(245,222,179, 1)',
                                'rgba(139,69,19, 1)',
                                'rgba(188,143,143, 1)',
                                'rgba(112,128,144, 1)',
                                'rgba(240,255,240, 1)',
                            ],
                            borderWidth: 2,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            // yAxes: [
                            // {
                            //     ticks: {
                            //     beginAtZero: true,
                            //     },
                            // },
                            // ],
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "polar" ? <PolarArea
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.2)',
                                'rgba(0,255,0, 0.2)',
                                'rgba(0,0,255, 0.2)',
                                'rgba(0,255,255, 0.2)',
                                'rgba(255,0,255, 0.2)',
                                'rgba(192,192,192, 0.2)',
                                'rgba(128,128,128, 0.2)',
                                'rgba(128,0,0, 0.2)',
                                'rgba(128,128,0, 0.2)',
                                'rgba(0,40,0, 0.2)',
                                'rgba(128,0,128, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(0,0,128, 0.2)',
                                'rgba(255,127,80, 0.2)',
                                'rgba(255,140,0, 0.2)',
                                'rgba(184,134,11, 0.2)',
                                'rgba(34,139,34, 0.2)',
                                'rgba(0,128,128, 0.2)',
                                'rgba(255,105,180, 0.2)',
                                'rgba(245,222,179, 0.2)',
                                'rgba(139,69,19, 0.2)',
                                'rgba(188,143,143, 0.2)',
                                'rgba(112,128,144, 0.2)',
                                'rgba(240,255,240, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255,0,0, 1)',
                                'rgba(0,255,0, 1)',
                                'rgba(0,0,255, 1)',
                                'rgba(0,255,255, 1)',
                                'rgba(255,0,255, 1)',
                                'rgba(192,192,192, 1)',
                                'rgba(128,128,128, 1)',
                                'rgba(128,0,0, 1)',
                                'rgba(128,128,0, 1)',
                                'rgba(0,40,0, 1)',
                                'rgba(128,0,128, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(0,0,128, 1)',
                                'rgba(255,127,80, 1)',
                                'rgba(255,140,0, 1)',
                                'rgba(184,134,11, 1)',
                                'rgba(34,139,34, 1)',
                                'rgba(0,128,128, 1)',
                                'rgba(255,105,180, 1)',
                                'rgba(245,222,179, 1)',
                                'rgba(139,69,19, 1)',
                                'rgba(188,143,143, 1)',
                                'rgba(112,128,144, 1)',
                                'rgba(240,255,240, 1)',
                            ],
                            borderWidth: 2,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            // yAxes: [
                            // {
                            //     ticks: {
                            //     beginAtZero: true,
                            //     },
                            // },
                            // ],
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "radar" ? <Radar
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 4,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            // yAxes: [
                            // {
                            //     ticks: {
                            //     beginAtZero: true,
                            //     },
                            // },
                            // ],
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                </div>
            </div>
        </>
    )

}

export default Graph