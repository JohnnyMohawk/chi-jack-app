import React, {useState, useEffect} from "react"
import Lottie from 'react-lottie-player'
import dataAnimation from '../../assets/animations/dataAnimation.json'
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2'
import {formatDay, yearRange} from '../../services/mapService.js'
import '../../App.css'
import '../pages/Graph.css'

function Graph() {

    const currentYear = new Date().getFullYear()
    const yearArr = yearRange(2001, currentYear)
    const [searchYear, setSearchYear] = useState(currentYear)
    const [yearArray, setYearArray] = useState([])
    const [annualCjData, setAnnualCjData] = useState(null)
    const [monthlyCjData, setMonthlyCjData] = useState(null)
    const [graphType, setGraphType] = useState('bar')
    const [searchSpan, setSearchSpan] = useState("year")
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const makeApiCall = async() => {
        let annualDataObj = {}
        let monthDataObj = {}
        let res = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?description=AGGRAVATED%20VEHICULAR%20HIJACKING&$limit=50000&$offset=0')
        let data = await res.json()
        yearArr.forEach(year => {
            annualDataObj[year] = data.filter(crime => crime.date.includes(year)).length
        });
        months.forEach((month, i) => {
            monthDataObj[month] = data.filter(crime => crime.date.includes(`${searchYear}-${formatDay(i + 1)}`)).length
        });
        setAnnualCjData(annualDataObj)
        setMonthlyCjData(monthDataObj)
    }

    useEffect(() => {
        setYearArray(yearArr)
    }, [])

    useEffect(() => {
        makeApiCall()
    }, [graphType, searchSpan, searchYear])

    return annualCjData ? (
        <>
            <div className="graph-container">
                <h1>Chicago Carjacking Data Visualizer</h1>
                <div className="search-bar">
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
                    <select defaultValue={searchSpan} onChange={event => {
                    setSearchSpan(event.target.value)
                    }}>
                        <option value="year">All Years</option>
                        <option value="month">Single Year</option>
                    </select>
                    {searchSpan === "month" ?
                    <select defaultValue={searchYear} onChange={event => {
                    setSearchYear(event.target.value)
                    }}>
                        {yearArray.reverse().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    :
                    <></>
                    }
                </div>
                <div className="graph-text">
                    {graphType === "bar" &&  searchSpan === "year" ? <Bar
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
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
                    {graphType === "bar" &&  searchSpan === "month" ? <Bar
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
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
                    {graphType === "doughnut" &&  searchSpan === "year" ? <Doughnut
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "doughnut" &&  searchSpan === "month" ? <Doughnut
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "line" &&  searchSpan === "year" ? <Line
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
                    {graphType === "line" &&  searchSpan === "month" ? <Line
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
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
                    {graphType === "pie" &&  searchSpan === "year" ? <Pie
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "pie" &&  searchSpan === "month" ? <Pie
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
                            ],
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "polar" &&  searchSpan === "year" ? <PolarArea
                        data={{
                        labels: Object.keys(annualCjData),
                        datasets: [
                            {
                            label: 'Annual Carjackings in Chicago',
                            data: Object.values(annualCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
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
                                'rgba(95,50,130, 1)',
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
                            borderWidth: 1,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "polar" &&  searchSpan === "month" ? <PolarArea
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
                            backgroundColor: [
                                'rgba(255,0,0, 0.5)',
                                'rgba(0,255,0, 0.5)',
                                'rgba(0,0,255, 0.5)',
                                'rgba(0,255,255, 0.5)',
                                'rgba(255,0,255, 0.5)',
                                'rgba(192,192,192, 0.5)',
                                'rgba(128,128,128, 0.5)',
                                'rgba(128,0,0, 0.5)',
                                'rgba(128,128,0, 0.5)',
                                'rgba(0,40,0, 0.5)',
                                'rgba(128,0,128, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(0,0,128, 0.5)',
                                'rgba(255,127,80, 0.5)',
                                'rgba(95,50,130, 0.5)',
                                'rgba(184,134,11, 0.5)',
                                'rgba(34,139,34, 0.5)',
                                'rgba(0,128,128, 0.5)',
                                'rgba(255,105,180, 0.5)',
                                'rgba(245,222,179, 0.5)',
                                'rgba(139,69,19, 0.5)',
                                'rgba(188,143,143, 0.5)',
                                'rgba(112,128,144, 0.5)',
                                'rgba(240,255,240, 0.5)',
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
                                'rgba(95,50,130, 1)',
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
                            borderWidth: 1,
                            },
                        ],
                        }}
                        height={400}
                        width={600}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "radar" &&  searchSpan === "month" ? <Radar
                        data={{
                        labels: Object.keys(monthlyCjData),
                        datasets: [
                            {
                            label: `Carjackings in Chicago by Month: ${searchYear}`,
                            data: Object.values(monthlyCjData),
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
                        },
                        legend: {
                            labels: {
                            fontSize: 25,
                            },
                        },
                        }}
                    /> :
                    <></>}
                    {graphType === "radar" &&  searchSpan === "year" ? <Radar
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
    ):
    <>
        <div className="map-container">
        <h1 className="">Loading... Please Wait</h1>
            <Lottie
                loop
                animationData={dataAnimation}
                play
                style={{ width: 700, height: 700 }}
            />
        </div>
    </>

}

export default Graph