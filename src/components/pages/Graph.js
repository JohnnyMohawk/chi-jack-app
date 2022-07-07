import React, {useState, useEffect} from "react"
import Lottie from 'react-lottie-player'
import dataAnimation from '../../assets/animations/dataAnimation.json'
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2'
import {formatDay, getDaysInMonth, yearRange, neighborhoodObject, fullMonths, months, 
    homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, 
    gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, attackOnCops, 
    carjackApiCall, filterApiCallGraph, createFormattedDate} from '../../services/mapService.js'
import '../pages/GunGraph.css'


import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LegendModal from '../LegendModal'
import LocationSelect from '../LocationSelect'
import SearchResultsGraph from '../SearchResultsGraph'
import SearchSpan from '../SearchSpan'
import ArrestToggle from '../ArrestToggle'
import CrimeToggle from '../CrimeToggle'
import GraphSelect from "../GraphSelect"

import { FaTimesCircle } from 'react-icons/fa'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function Graph() {

    const currentYear = new Date().getFullYear()
    const yearArr = yearRange(2001, currentYear)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const [searchYear, setSearchYear] = useState(currentYear)
    const [yearArray, setYearArray] = useState([])
    const [annualCjData, setAnnualCjData] = useState(null)
    const [monthlyCjData, setMonthlyCjData] = useState(null)
    const [graphType, setGraphType] = useState('bar')
    const [searchSpan, setSearchSpan] = useState("year")



    const [homicideStats, setHomicideStats] = useState([])
    const [sexAssaultStats, setSexAssaultStats] = useState([])
    const [robberyStats, setRobberyStats] = useState([])
    const [batteryStats, setBatteryStats] = useState([])
    const [assaultStats, setAssaultStats] = useState([])
    const [violationStats, setViolationStats] = useState([])
    const [shotsFiredStats, setShotsFiredStats] = useState([])
    const [gunPossessionStats, setGunPossessionStats] = useState([])
    const [ammoViolationStats, setAmmoViolationStats] = useState([])
    const [gunSaleStats, setGunSaleStats] = useState([])
    const [gunInSchoolStats, setGunInSchoolStats] = useState([])
    const [gunAttackOnCopsStats, setGunAttackOnCopsStats] = useState([])
    const [attackOnCopsStats, setAttackOnCopsStats] = useState([])
    const [carjackStats, setCarjackStats] = useState([])
    const [arrestMade, setArrestMade] = useState("All")
    const [pageTitle, setPageTitle] = useState("")


    const [showHomicide, setShowHomicide] = useState(false)
    const [showSexAssault, setShowSexAssault] = useState(false)
    const [showRobbery, setShowRobbery] = useState(false)
    const [showBattery, setShowBattery] = useState(false)
    const [showAssault, setShowAssault] = useState(false)
    const [showViolation, setShowViolation] = useState(false)
    const [showShotsFired, setShowShotsFired] = useState(false)
    const [showGunPossession, setShowGunPossession] = useState(false)
    const [showAmmoViolation, setShowAmmoViolation] = useState(false)
    const [showGunSale, setShowGunSale] = useState(false)
    const [showGunInSchool, setShowGunInSchool] = useState(false)
    const [showGunAttackOnCops, setShowGunAttackOnCops] = useState(false)
    const [showAttackOnCops, setShowAttackOnCops] = useState(false)
    const [showCarjack, setShowCarjack] = useState(false)


    const [allGunCrimeStats, setAllGunCrimeStats] = useState(
        [
            ...homicideStats, 
            ...sexAssaultStats, 
            ...robberyStats, 
            ...batteryStats, 
            ...assaultStats, 
            ...violationStats, 
            ...shotsFiredStats, 
            ...gunPossessionStats, 
            ...ammoViolationStats, 
            ...gunSaleStats, 
            ...gunInSchoolStats, 
            ...gunAttackOnCopsStats, 
            ...attackOnCopsStats, 
            ...carjackStats,
        ]
    )



    const serverSideApiCall = async() => {
        let homicides = await homicideApiCall()
        let sexualAssaults = await sexAssaultApiCall()
        let robberies = await robberyApiCall()
        let batteries = await batteryApiCall()
        let assaults = await assaultApiCall()
        let gunViolations = await gunViolationApiCall()
        let gunFireViolations = await gunFireViolation()
        let gunPossessionViolations = await gunNoFireViolation()
        let ammoViolations = await ammoViolation()
        let illegalGunSales = await illegalGunSale()
        let gunInSchools = await gunInSchool()
        let gunAttackOnCop = await gunAttackOnCops()
        let attackOnCop = await attackOnCops()
        let carjackings = await carjackApiCall()
        setHomicideStats(filterApiCallGraph(homicides, arrestMade))
        setSexAssaultStats(filterApiCallGraph(sexualAssaults, arrestMade))
        setRobberyStats(filterApiCallGraph(robberies, arrestMade))
        setBatteryStats(filterApiCallGraph(batteries, arrestMade))
        setAssaultStats(filterApiCallGraph(assaults, arrestMade))
        setViolationStats(filterApiCallGraph(gunViolations, arrestMade))
        setShotsFiredStats(filterApiCallGraph(gunFireViolations, arrestMade))
        setGunPossessionStats(filterApiCallGraph(gunPossessionViolations, arrestMade))
        setAmmoViolationStats(filterApiCallGraph(ammoViolations, arrestMade))
        setGunSaleStats(filterApiCallGraph(illegalGunSales, arrestMade))
        setGunInSchoolStats(filterApiCallGraph(gunInSchools, arrestMade))
        setGunAttackOnCopsStats(filterApiCallGraph(gunAttackOnCop, arrestMade))
        setAttackOnCopsStats(filterApiCallGraph(attackOnCop, arrestMade))
        setCarjackStats(filterApiCallGraph(carjackings, arrestMade))
        setAllGunCrimeStats(
            [
                ...(showHomicide ? homicideStats : []), 
                ...(showSexAssault ? sexAssaultStats : []), 
                ...(showRobbery ? robberyStats : []), 
                ...(showBattery ? batteryStats : []), 
                ...(showAssault ? assaultStats : []), 
                ...(showViolation ? violationStats : []), 
                ...(showShotsFired ? shotsFiredStats : []), 
                ...(showGunPossession ? gunPossessionStats : []), 
                ...(showAmmoViolation ? ammoViolationStats : []), 
                ...(showGunSale ? gunSaleStats : []), 
                ...(showGunInSchool ? gunInSchoolStats : []), 
                ...(showGunAttackOnCops ? gunAttackOnCopsStats : []), 
                ...(showAttackOnCops ? attackOnCopsStats : []), 
                ...(showCarjack ? carjackStats : [])
            ]
        )
    }

    const allGunCrimes = () => {
        let gunCrimeArr = [
            ...(showHomicide ? homicideStats : []), 
            ...(showSexAssault ? sexAssaultStats : []), 
            ...(showRobbery ? robberyStats : []), 
            ...(showBattery ? batteryStats : []), 
            ...(showAssault ? assaultStats : []), 
            ...(showViolation ? violationStats : []), 
            ...(showShotsFired ? shotsFiredStats : []), 
            ...(showGunPossession ? gunPossessionStats : []), 
            ...(showAmmoViolation ? ammoViolationStats : []), 
            ...(showGunSale ? gunSaleStats : []), 
            ...(showGunInSchool ? gunInSchoolStats : []), 
            ...(showGunAttackOnCops ? gunAttackOnCopsStats : []), 
            ...(showAttackOnCops ? attackOnCopsStats : []), 
            ...(showCarjack ? carjackStats : [])
        ]
        return gunCrimeArr
    }

    const filterApiCallMonthsOrYears = async() => {
        let annualDataObj = {}
        let monthDataObj = {}
        yearArr.forEach(year => {
            annualDataObj[year] = allGunCrimes().filter(crime => crime.date.includes(year)).length
        });
        months.forEach((month, i) => {
            monthDataObj[month] = allGunCrimes().filter(crime => crime.date.includes(`${searchYear}-${formatDay(i + 1)}`)).length
        });
        setAnnualCjData(annualDataObj)
        setMonthlyCjData(monthDataObj)
    }

    const handleArrestToggle = (event, newView) => {
        if(newView !== null) {
            setArrestMade(newView)
        }
    };

    const dynamicTitle = () => {
        if(!showHomicide && 
            !showAssault &&
            !showSexAssault &&
            !showRobbery &&
            !showBattery &&
            !showViolation &&
            !showShotsFired &&
            !showGunPossession &&
            !showAmmoViolation &&
            !showGunSale &&
            !showGunInSchool &&
            !showGunAttackOnCops &&
            !showAttackOnCops &&
            !showCarjack){
                return "Select"
        }else return "Results"
    };

    useEffect(() => {
        setYearArray(yearArr)
    }, [])

    useEffect(() => {
        serverSideApiCall()
    }, [arrestMade])

    useEffect(() => {
        setAllGunCrimeStats(
            [
                ...(showHomicide ? homicideStats : []), 
                ...(showSexAssault ? sexAssaultStats : []), 
                ...(showRobbery ? robberyStats : []), 
                ...(showBattery ? batteryStats : []), 
                ...(showAssault ? assaultStats : []), 
                ...(showViolation ? violationStats : []), 
                ...(showShotsFired ? shotsFiredStats : []), 
                ...(showGunPossession ? gunPossessionStats : []), 
                ...(showAmmoViolation ? ammoViolationStats : []), 
                ...(showGunSale ? gunSaleStats : []), 
                ...(showGunInSchool ? gunInSchoolStats : []), 
                ...(showGunAttackOnCops ? gunAttackOnCopsStats : []), 
                ...(showAttackOnCops ? attackOnCopsStats : []), 
                ...(showCarjack ? carjackStats : [])
            ]
        )
    }, [
            showHomicide, 
            showSexAssault, 
            showRobbery, 
            showBattery, 
            showAssault, 
            showViolation, 
            showShotsFired, 
            showGunPossession, 
            showAmmoViolation, 
            showGunSale, 
            showGunInSchool, 
            showGunAttackOnCops, 
            showAttackOnCops, 
            showCarjack,
            arrestMade,
        ]
    )

    useEffect(() => {
        filterApiCallMonthsOrYears()
    }, [graphType, searchSpan, searchYear, allGunCrimeStats, arrestMade])

    useEffect(() => {
        setPageTitle(dynamicTitle())
    }, [showHomicide, showAssault, showSexAssault, showBattery, showRobbery, showViolation, showShotsFired, showGunPossession, 
        showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack, arrestMade])


    console.log(allGunCrimes().length)

    return homicideStats.length ? (
        <>
            <div className="map-container">
                <div className="control-panel-wrap">
                    <SearchResultsGraph pageTitle={pageTitle} totalCrimeCount={allGunCrimes} searchSpan={searchSpan} searchYear={searchYear} 
                        fullMonths={fullMonths} />
                    <GraphSelect setGraphType={setGraphType} graphType={graphType} searchSpan={searchSpan} setSearchSpan={setSearchSpan} 
                        searchYear={searchYear} setSearchYear={setSearchYear} yearArray={yearArray} />
                    <ArrestToggle arrestMade={arrestMade} handleArrestToggle={handleArrestToggle} />
                    <CrimeToggle showHomicide={showHomicide} setShowHomicide={setShowHomicide} showAssault={showAssault} 
                        setShowAssault={setShowAssault} showSexAssault={showSexAssault} setShowSexAssault={setShowSexAssault} 
                        showRobbery={showRobbery} setShowRobbery={setShowRobbery} showBattery={showBattery} setShowBattery={setShowBattery} 
                        showViolation={showViolation} setShowViolation={setShowViolation} showShotsFired={showShotsFired} 
                        setShowShotsFired={setShowShotsFired} showGunPossession={showGunPossession} setShowGunPossession={setShowGunPossession} 
                        showAmmoViolation={showAmmoViolation} setShowAmmoViolation={setShowAmmoViolation} showGunSale={showGunSale} 
                        setShowGunSale={setShowGunSale} showGunInSchool={showGunInSchool} setShowGunInSchool={setShowGunInSchool} 
                        showGunAttackOnCops={showGunAttackOnCops} setShowGunAttackOnCops={setShowGunAttackOnCops} showAttackOnCops={showAttackOnCops} 
                        setShowAttackOnCops={setShowAttackOnCops} showCarjack={showCarjack} setShowCarjack={setShowCarjack} />
                </div> 
                <div className="map-text">
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
                                'rgba(0,40,70, 0.5)',
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
                            y: {
                                grid: {
                                    drawTicks: false,
                                    color: "rgb(65, 65, 65)"
                                }
                            },
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
                                'rgba(0,40,70, 0.5)',
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
                            y: {
                                grid: {
                                    drawTicks: false,
                                    color: "rgb(65, 65, 65)"
                                }
                            },
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
                                'rgba(0,40,70, 0.5)',
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
                                'rgba(0,40,70, 0.5)',
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
                            y: {
                                grid: {
                                    drawTicks: false,
                                    color: "rgb(65, 65, 65)"
                                }
                            },
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
                            y: {
                                grid: {
                                    drawTicks: false,
                                    color: "rgb(65, 65, 65)"
                                }
                            },
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
                                'rgba(0,40,70, 0.5)',
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
                                'rgba(0,40,70, 0.5)',
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
                                'rgba(0,40,70, 0.5)',
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
                                'rgba(0,40,70, 1)',
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
                            r: {
                                grid: {
                                    color: "rgb(65, 65, 65)"
                                }
                            }
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
                                'rgba(0,40,70, 0.5)',
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
                                'rgba(0,40,70, 1)',
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
                            r: {
                                grid: {
                                    color: "rgb(65, 65, 65)"
                                }
                            }
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
                                'red',
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
                            r: {
                                grid: {
                                    color: "rgb(65, 65, 65)"
                                }
                            }
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
                                'red',
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
                            r: {
                                grid: {
                                    color: "rgb(65, 65, 65)"
                                }
                            }
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