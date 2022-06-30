import React, { useState, useEffect } from 'react'
import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, fullMonths, months, 
        homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, 
        gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, attackOnCops, 
        carjackApiCall, filterApiCallData} from '../services/mapService'
import './pages/Map.css'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LegendModal from '../components/LegendModal';





    


export default function ControlPanel() {
    
    const currentYear = new Date().getFullYear()
    const today = new Date()
    today.setDate(today.getDate() - 8)
    let searchDate = today.toDateString()
    let dayOfTheMonth = formatDay(today.getDate())
    const currentMonth = months.indexOf(searchDate.split(' ')[1])
    

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
    const [totalCrimes, setTotalCrimes] = useState(0)
    const [pageTitle, setPageTitle] = useState(0)

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [selectedCrime, setSelectedCrime] = useState(null)
    const [searchSpan, setSearchSpan] = useState("month")
    const [yearArray, setYearArray] = useState([])
    const [searchDay, setSearchDay] = useState(dayOfTheMonth)
    const [searchYear, setSearchYear] = useState(searchDate.split(' ')[3])
    const [searchMonth, setSearchMonth] = useState(months[currentMonth])
    const [monthNumber, setMonthNumber] = useState(months.indexOf(searchDate.split(' ')[1]) + 1)
    const [daysOfTheMonth, setDaysOfTheMonth] = useState(getDaysInMonth(currentMonth, currentYear))

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [arrestMade, setArrestMade] = useState("All")

    const handleArrestToggle = (event, newView) => {
        if(newView !== null) {
            setArrestMade(newView)
        }
    };

    const createFormattedDate = () => {
        let formattedDate
        let formDateArr = []
        let dateArr = searchDate.split(" ")
        dateArr.shift()
        formDateArr.push(searchYear + "-")
        months.forEach((month, i) => {
            if(searchMonth === month){
                let dateMonth = i + 1
                setMonthNumber(dateMonth)
                formDateArr.push(monthNumber + "-" + dateArr[1])
            }
        });
        if(searchSpan === "month"){
            if(monthNumber < 10){
                formattedDate = searchYear + "-0" + monthNumber
            }else{
                formattedDate = searchYear + "-" + monthNumber
            }
        }else if(searchSpan === "week"){
            if(monthNumber < 10){
                let completeDate = searchYear + "-0" + monthNumber + "-" + searchDay
                let arrayOfDays = createWeekArr(completeDate)
                formattedDate = arrayOfDays
            }else{
                let completeDate = searchYear + "-" + monthNumber + "-" + searchDay
                let arrayOfDays = createWeekArr(completeDate)
                formattedDate = arrayOfDays
            }
        }else if(searchSpan === "year"){
            formattedDate = searchYear
        }else if(searchSpan === "most recent"){
            if(monthNumber < 10){
                formattedDate = searchYear + "-0" + monthNumber + "-" + searchDay
            }else{
                formattedDate = searchYear + "-" + monthNumber + "-" + searchDay
            }
        }
        return formattedDate
    }

    const setMyLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(parseFloat(position.coords.latitude))
                setLng(parseFloat(position.coords.longitude))
            },
            () => null
        )
    }

    const getHoodLatLng = (selection) => {
        setLat(neighborhoodObject[selection][0])
        setLng(neighborhoodObject[selection][1])
    }

    const mapCenterOnSelect = () => {
        if(selectedCrime !== null){
            setLat(selectedCrime.location.latitude)
            setLng(selectedCrime.location.longitude)
        }
    }

    const yearMonthArray = () => {
        setYearArray(yearRange(2001, new Date().getFullYear()))
        setDaysOfTheMonth(getDaysInMonth(months.indexOf(searchMonth), searchYear))
    }

    const serverSideApiCall = async() => {
        let formattedDate = createFormattedDate()
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
        setHomicideStats(filterApiCallData(homicides, formattedDate, searchSpan, arrestMade))
        setSexAssaultStats(filterApiCallData(sexualAssaults, formattedDate, searchSpan, arrestMade))
        setRobberyStats(filterApiCallData(robberies, formattedDate, searchSpan, arrestMade))
        setBatteryStats(filterApiCallData(batteries, formattedDate, searchSpan, arrestMade))
        setAssaultStats(filterApiCallData(assaults, formattedDate, searchSpan, arrestMade))
        setViolationStats(filterApiCallData(gunViolations, formattedDate, searchSpan, arrestMade))
        setShotsFiredStats(filterApiCallData(gunFireViolations, formattedDate, searchSpan, arrestMade))
        setGunPossessionStats(filterApiCallData(gunPossessionViolations, formattedDate, searchSpan, arrestMade))
        setAmmoViolationStats(filterApiCallData(ammoViolations, formattedDate, searchSpan, arrestMade))
        setGunSaleStats(filterApiCallData(illegalGunSales, formattedDate, searchSpan, arrestMade))
        setGunInSchoolStats(filterApiCallData(gunInSchools, formattedDate, searchSpan, arrestMade))
        setGunAttackOnCopsStats(filterApiCallData(gunAttackOnCop, formattedDate, searchSpan, arrestMade))
        setAttackOnCopsStats(filterApiCallData(attackOnCop, formattedDate, searchSpan, arrestMade))
        setCarjackStats(filterApiCallData(carjackings, formattedDate, searchSpan, arrestMade))
    }

    const totalCrimeCount = () => {
        let count = 0
        if(showHomicide) {count += homicideStats.length}
        if(showAssault) {count += assaultStats.length}
        if(showSexAssault) {count +=  sexAssaultStats.length}
        if(showRobbery) {count +=  robberyStats.length}
        if(showBattery) {count +=  batteryStats.length}
        if(showViolation) {count +=  violationStats.length}
        if(showShotsFired) {count +=  shotsFiredStats.length}
        if(showGunPossession) {count +=  gunPossessionStats.length}
        if(showAmmoViolation) {count +=  ammoViolationStats.length}
        if(showGunSale) {count +=  gunSaleStats.length}
        if(showGunInSchool) {count +=  gunInSchoolStats.length}
        if(showGunAttackOnCops) {count +=  gunAttackOnCopsStats.length}
        if(showAttackOnCops) {count +=  attackOnCopsStats.length}
        if(showCarjack) {count +=  carjackStats.length}
        
        return count
    }

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
    }

    useEffect(() => {
        if(window.innerWidth > 960){
            getHoodLatLng("Near West Side")
        }else getHoodLatLng("Lower West Side")
    }, [])

    useEffect(() => {
        mapCenterOnSelect()
    }, [selectedCrime])

    useEffect(() => {
        yearMonthArray()
        serverSideApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay, arrestMade])

    useEffect(() => {
        setPageTitle(dynamicTitle())
        setTotalCrimes(totalCrimeCount())
    }, [showHomicide, showAssault, showSexAssault, showBattery, showRobbery, showViolation, showShotsFired, showGunPossession, showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack, arrestMade])

    
    return (
        <div className="control-panel-wrap">
        <div className="main-title-results">
        {pageTitle === "Select" ? <h2 className="search-select">Select below for gun crime stats:&nbsp;</h2> : <h2 className="search-results">Your Results:&nbsp;</h2>}
        {pageTitle !== "Select" ? <div className="cj-number-wrapper">
                <h2 className="carjack-numbers heart" id="cj-num-id">{totalCrimeCount()}&nbsp;</h2>
                <h2 className="search-params">{`Gun Crimes
                    ${searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""}
                    ${searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
                    ${searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""}
                    ${searchSpan === "year" ? "in " : ""}
                    ${searchYear}`}
                </h2>
            </div> : <></>}
        </div>
        <div className="search-bar-wrap">
            <div className="search-bar">
                <Button variant="contained" className="sb-inputs" id="my-location" size="large" onClick={() => {setMyLocation()}}>My Location</Button>
                <FormControl sx={{ m: 0, minWidth: 238 }} size="small">
                    <Select className="sb-inputs" id="hoodSelect" defaultValue="Near West Side" onChange={event => {
                        getHoodLatLng(event.target.value)
                        }}>
                        {Object.keys(neighborhoodObject).sort().map(neighborhood => (
                            <MenuItem key={neighborhood} value={neighborhood}>
                                {neighborhood}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="search-bar">
                <Select className="sb-inputs" id='timeSpan' defaultValue={searchSpan} onChange={event => {
                setSearchSpan(event.target.value)
                }}>
                    <MenuItem value="most recent">One Day</MenuItem>
                    <MenuItem value="week">Weekly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="year">Annual</MenuItem>
                </Select>
                {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
                <>
                    <Select className="sb-inputs" id='monthSelect' defaultValue={searchMonth} onChange={event => {
                    setSearchMonth(event.target.value)
                    let moNo = months.indexOf(event.target.value) + 1
                    formatDay(moNo)
                    setMonthNumber(moNo)
                    }}>
                    {months.map(month => (
                        <MenuItem key={month} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
                </>
                :
                <></>
                }
                {searchSpan === "week" || searchSpan === "most recent" ? 
                <>
                    <Select className="sb-inputs" id='daySelect' defaultValue={dayOfTheMonth} onChange={event => {
                        setSearchDay(event.target.value)
                        }}>
                            {daysOfTheMonth.map(day => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                    </Select>
                </>
                :
                <></>
                }
                <Select className="sb-inputs" id='yearSelect' value={searchYear} onChange={event => {
                    setSearchYear(event.target.value)
                    }}>
                        {yearArray.reverse().map(year => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                </Select>
            </div>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButtonGroup
                className='arrest-view'
                value={arrestMade}
                exclusive
                onChange={handleArrestToggle}
                aria-label="arrest-view-toggle"
            >
                <ToggleButton value="All" aria-label="all crimes" color="warning" className='arrest-all'>
                    All
                </ToggleButton>
                <ToggleButton value="Yes" aria-label="crimes with arrest" color="warning" className='arrest-toggle'>
                    Arrest Made
                </ToggleButton>
                <ToggleButton value="No" aria-label="crimes with no arrest" color="warning" className='arrest-toggle'>
                    No Arrest Made
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showHomicide}
                onChange={() => {
                    setShowHomicide(!showHomicide);
                }}>
                Homicides
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showAssault}
                onChange={() => {
                    setShowAssault(!showAssault);
                }}>
                Assaults
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showSexAssault}
                onChange={() => {
                    setShowSexAssault(!showSexAssault);
                }}>
                Sex. Assaults
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showRobbery}
                onChange={() => {
                    setShowRobbery(!showRobbery);
                }}>
                Robberies
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showBattery}
                onChange={() => {
                    setShowBattery(!showBattery);
                }}>
                Batteries
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showViolation}
                onChange={() => {
                    setShowViolation(!showViolation);
                }}>
                Gun Violations
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showShotsFired}
                onChange={() => {
                    setShowShotsFired(!showShotsFired);
                }}>
                Shots Fired
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showGunPossession}
                onChange={() => {
                    setShowGunPossession(!showGunPossession);
                }}>
                Gun Possession
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showAmmoViolation}
                onChange={() => {
                    setShowAmmoViolation(!showAmmoViolation);
                }}>
                Ammo Violation
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showGunSale}
                onChange={() => {
                    setShowGunSale(!showGunSale);
                }}>
                Illegal Gun Sales
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showGunInSchool}
                onChange={() => {
                    setShowGunInSchool(!showGunInSchool);
                }}>
                Gun in School
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showGunAttackOnCops}
                onChange={() => {
                    setShowGunAttackOnCops(!showGunAttackOnCops);
                }}>
                Shots on Cops
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showAttackOnCops}
                onChange={() => {
                    setShowAttackOnCops(!showAttackOnCops);
                }}>
                Attack on Cops
            </ToggleButton>
            <ToggleButton
                className='crime-view'
                color="warning"
                value="check"
                selected={showCarjack}
                onChange={() => {
                    setShowCarjack(!showCarjack);
                }}>
                Carjackings
            </ToggleButton>
        </div>
        <div className="crime-toggle-bar">
            <LegendModal />
        </div>
    </div> 
    )
}
