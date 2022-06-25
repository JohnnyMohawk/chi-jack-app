import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, fullMonths, months, 
        homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, 
        gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, attackOnCops, 
        carjackApiCall, filterApiCallData} from '../../services/mapService.js'
import mapStyles from './mapStyles';
import '../pages/Map.css'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
require('dotenv').config()

const containerStyle = {
    width: 'calc(100vw - 450px)',
    height: '90vh'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}

const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS


const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: `${googleMapsApiKey}`,
    })

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

    const [arrestMade, setArrestMade] = useState("All")



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
        if(showHomicide === true) {count += homicideStats.length}
        if(showAssault === true) {count += assaultStats.length}
        if(showSexAssault === true) {count +=  sexAssaultStats.length}
        if(showRobbery === true) {count +=  robberyStats.length}
        if(showBattery === true) {count +=  batteryStats.length}
        if(showViolation === true) {count +=  violationStats.length}
        if(showShotsFired === true) {count +=  shotsFiredStats.length}
        if(showGunPossession === true) {count +=  gunPossessionStats.length}
        if(showAmmoViolation === true) {count +=  ammoViolationStats.length}
        if(showGunSale === true) {count +=  gunSaleStats.length}
        if(showGunInSchool === true) {count +=  gunInSchoolStats.length}
        if(showGunAttackOnCops === true) {count +=  gunAttackOnCopsStats.length}
        if(showAttackOnCops === true) {count +=  attackOnCopsStats.length}
        if(showCarjack === true) {count +=  carjackStats.length}
        
        return count
    }

    useEffect(() => {
        getHoodLatLng("Near West Side")
    }, [])

    useEffect(() => {
        mapCenterOnSelect()
    }, [selectedCrime])

    useEffect(() => {
        yearMonthArray()
        serverSideApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay])

    useEffect(() => {
        let crimes = totalCrimeCount()
        setTotalCrimes(crimes)
    }, [showHomicide, showAssault, showSexAssault, showBattery, showRobbery, showViolation, showShotsFired, showGunPossession, showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack])

    const mapRef = React.useRef();
        const onMapLoad = React.useCallback((map) => {
            mapRef.current = map;
        }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (

        <div className="map-container">
            <div className="control-panel-wrap">
                <h2 className="search-results">Your Results:&nbsp;</h2>
                <div className="cj-number-wrapper">
                    <h2 className="carjack-numbers heart" id="cj-num-id">{totalCrimes}&nbsp;</h2>
                    <h2 className="search-params">{`Gun Crimes
                        ${searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""}
                        ${searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
                        ${searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""}
                        ${searchSpan === "year" ? "in " : ""}
                        ${searchYear}`}
                    </h2>
                </div>
                <div className="search-bar-wrap">
                    <div className="search-bar">
                        <Button variant="contained" className="sb-inputs" id="my-location" size="large" onClick={() => {setMyLocation()}}>My Location</Button>
                        <FormControl sx={{ m: 0, minWidth: 238 }} size="small">
                            <Select className="sb-inputs" id="demo-select-small" defaultValue="Loop" onChange={event => {
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
                        <Select className="sb-inputs" defaultValue={searchSpan} onChange={event => {
                        setSearchSpan(event.target.value)
                        }}>
                            <MenuItem value="most recent">One Day</MenuItem>
                            <MenuItem value="week">Weekly</MenuItem>
                            <MenuItem value="month">Monthly</MenuItem>
                            <MenuItem value="year">Annual</MenuItem>
                        </Select>
                        {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
                        <>
                            <Select className="sb-inputs" defaultValue={searchMonth} onChange={event => {
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
                            <Select className="sb-inputs" defaultValue={dayOfTheMonth} onChange={event => {
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
                        <Select className="sb-inputs" value={searchYear} onChange={event => {
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
            </div> 
            {violationStats.length ? 
            <>
                <div className="map-text">
                    <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={containerStyle}
                        center={{lat: lat, lng: lng}}
                        zoom={13}
                        options={options}
                        onLoad={onMapLoad}
                    >
                        {showHomicide === true && homicideStats?.map((homicide) => (
                            <Marker 
                                key={homicide.id} 
                                position={{ 
                                    lat: parseFloat(homicide.latitude), 
                                    lng: parseFloat(homicide.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(homicide)
                                }}
                                icon={{
                                    url: `/homicide.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showSexAssault === true && sexAssaultStats?.map((sexAssault) => (
                            <Marker 
                                key={sexAssault.id} 
                                position={{ 
                                    lat: parseFloat(sexAssault.latitude), 
                                    lng: parseFloat(sexAssault.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(sexAssault)
                                }}
                                icon={{
                                    url: `/gun-assault.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showRobbery === true && robberyStats?.map((robbery) => (
                            <Marker 
                                key={robbery.id} 
                                position={{ 
                                    lat: parseFloat(robbery.latitude), 
                                    lng: parseFloat(robbery.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(robbery)
                                }}
                                icon={{
                                    url: `/gun-robbery.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showBattery === true && batteryStats?.map((battery) => (
                            <Marker 
                                key={battery.id} 
                                position={{ 
                                    lat: parseFloat(battery.latitude), 
                                    lng: parseFloat(battery.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(battery)
                                }}
                                icon={{
                                    url: `/gun-battery.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showAssault === true && assaultStats?.map((assault) => (
                            <Marker 
                                key={assault.id} 
                                position={{ 
                                    lat: parseFloat(assault.latitude), 
                                    lng: parseFloat(assault.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(assault)
                                }}
                                icon={{
                                    url: `/gun-assault.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showViolation === true && violationStats?.map((violation) => (
                            <Marker 
                                key={violation.id} 
                                position={{ 
                                    lat: parseFloat(violation.latitude), 
                                    lng: parseFloat(violation.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(violation)
                                }}
                                icon={{
                                    url: `/gun-law-violation.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showShotsFired === true && shotsFiredStats?.map((shots) => (
                            <Marker 
                                key={shots.id} 
                                position={{ 
                                    lat: parseFloat(shots.latitude), 
                                    lng: parseFloat(shots.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(shots)
                                }}
                                icon={{
                                    url: `/gun-firing.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showGunPossession === true && gunPossessionStats?.map((gun) => (
                            <Marker 
                                key={gun.id} 
                                position={{ 
                                    lat: parseFloat(gun.latitude), 
                                    lng: parseFloat(gun.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(gun)
                                }}
                                icon={{
                                    url: `/gun-no-fire.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showAmmoViolation === true && ammoViolationStats?.map((ammo) => (
                            <Marker 
                                key={ammo.id} 
                                position={{ 
                                    lat: parseFloat(ammo.latitude), 
                                    lng: parseFloat(ammo.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(ammo)
                                }}
                                icon={{
                                    url: `/ammo-violation.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showGunSale === true && gunSaleStats?.map((sale) => (
                            <Marker 
                                key={sale.id} 
                                position={{ 
                                    lat: parseFloat(sale.latitude), 
                                    lng: parseFloat(sale.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(sale)
                                }}
                                icon={{
                                    url: `/gun-sale.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showGunInSchool === true && gunInSchoolStats?.map((guns) => (
                            <Marker 
                                key={guns.id} 
                                position={{ 
                                    lat: parseFloat(guns.latitude), 
                                    lng: parseFloat(guns.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(guns)
                                }}
                                icon={{
                                    url: `/gun-in-school.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showGunAttackOnCops === true && gunAttackOnCopsStats?.map((attacks) => (
                            <Marker 
                                key={attacks.id} 
                                position={{ 
                                    lat: parseFloat(attacks.latitude), 
                                    lng: parseFloat(attacks.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(attacks)
                                }}
                                icon={{
                                    url: `/shots-on-police.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showAttackOnCops === true && attackOnCopsStats?.map((attacks) => (
                            <Marker 
                                key={attacks.id} 
                                position={{ 
                                    lat: parseFloat(attacks.latitude), 
                                    lng: parseFloat(attacks.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(attacks)
                                }}
                                icon={{
                                    url: `/attack-on-police.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {showCarjack === true && carjackStats?.map((carjacking) => (
                            <Marker 
                                key={carjacking.id} 
                                position={{ 
                                    lat: parseFloat(carjacking.latitude), 
                                    lng: parseFloat(carjacking.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(carjacking)
                                }}
                                icon={{
                                    url: `/carjacking.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {selectedCrime && (
                            <InfoWindow
                                position={{ 
                                    lat: parseFloat(selectedCrime.latitude), 
                                    lng: parseFloat(selectedCrime.longitude) 
                                }}
                                onCloseClick={() => {
                                    setSelectedCrime(null)
                                }}
                            >
                                <div className="info-window">
                                    <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
                                    <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
                                    <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
                                    <h3>{selectedCrime.primary_type}</h3>
                                    <h3>{selectedCrime.description}</h3>
                                    <h3>{selectedCrime.location_description}</h3>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            </>
            :
            <>
                <div className="lottie-wrapper">
                    <div className="lottie-container">
                        <h1 className="loading-title">Loading... Please Wait</h1>
                        <Lottie
                            loop
                            animationData={carSafety}
                            play
                            style={{ width: 700, height: 700 }}
                        />
                    </div>
                </div>
            </>
            }
        </div>
    ) 
}

export default Map

