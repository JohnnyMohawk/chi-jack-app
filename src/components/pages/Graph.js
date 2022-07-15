import React, {useState, useEffect} from "react"
import Lottie from 'react-lottie-player'
import dataAnimation from '../../assets/animations/dataAnimation.json'
import {formatDay, yearRange, fullMonths, homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, 
    gunViolationApiCall, gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, 
    attackOnCops, carjackApiCall, filterApiCallGraph} from '../../services/mapService.js'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SearchResultsGraph from '../SearchResultsGraph'
import ArrestToggle from '../ArrestToggle'
import CrimeToggle from '../CrimeToggle'
import GraphSelect from "../GraphSelect"
import BarGraph from "../BarGraph"
import DonutGraph from "../DonutGraph"
import LineGraph from "../LineGraph"
import PieGraph from "../PieGraph"
import PolarGraph from "../PolarGraph"
import RadarGraph from "../RadarGraph"
import { FaTimesCircle } from 'react-icons/fa'
import styles from '../../styles/GraphPage.module.css'


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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    }, [showHomicide, showSexAssault, showRobbery, showBattery, showAssault, showViolation, showShotsFired, showGunPossession, 
            showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack, arrestMade])

    useEffect(() => {
        filterApiCallMonthsOrYears()
    }, [graphType, searchSpan, searchYear, allGunCrimeStats, arrestMade])

    useEffect(() => {
        setPageTitle(dynamicTitle())
    }, [showHomicide, showAssault, showSexAssault, showBattery, showRobbery, showViolation, showShotsFired, showGunPossession, 
        showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack, arrestMade])

    const userPageResponse = () => {
        if(window.innerWidth >= 1000){
            window.location.reload()
        }else if(window.innerWidth <= 1000){
            window.location.reload()
        }
    }

    window.addEventListener('resize', userPageResponse);

    console.log(allGunCrimes().length)

    return window.innerWidth > 960 ? (
        <>
            <div className={styles.graphContainer}>
                <div className={styles.graphPanelWrap}>
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
                { homicideStats.length ?
                <div className={styles.graphSection}>
                    {graphType === "bar" &&  searchSpan === "year" ? 
                    <BarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "bar" &&  searchSpan === "month" ? 
                    <BarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "doughnut" &&  searchSpan === "year" ? 
                    <DonutGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "doughnut" &&  searchSpan === "month" ? 
                    <DonutGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "line" &&  searchSpan === "year" ? 
                    <LineGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "line" &&  searchSpan === "month" ? 
                    <LineGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "pie" &&  searchSpan === "year" ? 
                    <PieGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "pie" &&  searchSpan === "month" ? 
                    <PieGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "polar" &&  searchSpan === "year" ? 
                    <PolarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "polar" &&  searchSpan === "month" ? 
                    <PolarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "radar" &&  searchSpan === "year" ? 
                    <RadarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "radar" &&  searchSpan === "month" ? 
                    <RadarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                </div>
                : 
                <>
                    <div className={styles.lottieWrapper}>
                        <div className={styles.lottieContainer}>
                            <h1 className={styles.loadingTitle}>Loading... Please Wait</h1>
                            <Lottie
                                loop
                                animationData={dataAnimation}
                                play
                                style={{ width: 'calc(100vw - 550px)', height: 650 }}
                            />
                        </div>
                    </div>
                </>
                }
            </div>
        </>
    ):
    <div className={styles.graphContainerMobile}>
        <div className={styles.graphMobile}>
            <SearchResultsGraph pageTitle={pageTitle} totalCrimeCount={allGunCrimes} searchSpan={searchSpan} searchYear={searchYear} 
                fullMonths={fullMonths} />
            {violationStats.length ? 
            <>
                <div className={styles.graphSection}>
                    {graphType === "bar" &&  searchSpan === "year" ? 
                    <BarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "bar" &&  searchSpan === "month" ? 
                    <BarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "doughnut" &&  searchSpan === "year" ? 
                    <DonutGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "doughnut" &&  searchSpan === "month" ? 
                    <DonutGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "line" &&  searchSpan === "year" ? 
                    <LineGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "line" &&  searchSpan === "month" ? 
                    <LineGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "pie" &&  searchSpan === "year" ? 
                    <PieGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "pie" &&  searchSpan === "month" ? 
                    <PieGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "polar" &&  searchSpan === "year" ? 
                    <PolarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "polar" &&  searchSpan === "month" ? 
                    <PolarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                    {graphType === "radar" &&  searchSpan === "year" ? 
                    <RadarGraph Data={annualCjData} searchYear={0} /> : <></>}
                    {graphType === "radar" &&  searchSpan === "month" ? 
                    <RadarGraph Data={monthlyCjData} searchYear={searchYear} /> : <></>}
                </div>
            </> : 
            <>
                <div className={styles.mobileLottieWrapper}>
                    <div className={styles.mobileLottieContainer}>
                        <h1 className={styles.loadingTitleMobile}>Loading... Please Wait</h1>
                        <Lottie
                            loop
                            animationData={dataAnimation}
                            play
                            style={{ width: 400, height: '75vh' }}
                        />
                    </div>
                </div>
            </>
            }
        </div>
        <div className={styles.searchModal}>
            <Button variant="contained" onClick={handleOpen}>Set Search</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.controlModalWrapGraph}>
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
                    <div className={styles.closeButtonMobileWrapGraph}>
                        <button className={styles.closeButtonMobileGraph} onClick={handleClose}><FaTimesCircle /></button>
                    </div>
                </div>
            </Modal>
        </div>
    </div>

}

export default Graph