import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, yearRange, neighborhoodObject, removeZeros, fullMonths, months, 
        homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, 
        gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, attackOnCops, 
        carjackApiCall, filterApiCallData, createFormattedDate} from '../../services/mapService.js'
import mapStyles from './mapStyles';
import '../pages/Map.css'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LegendModal from '../LegendModal'
import LocationSelect from '../LocationSelect'
import SearchResults from '../SearchResults'
import SearchSpan from '../SearchSpan'
import ArrestToggle from '../ArrestToggle'
import CrimeToggle from '../CrimeToggle'

require('dotenv').config()

const containerStyle = {
    width: 'calc(100vw - 450px)',
    height: '715px'
}

const mobileContainerStyle = {
    width: '100vw',
    height: '88vh'
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
    const [arrestMade, setArrestMade] = useState("All")
    
    const [open, setOpen] = useState(false);
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleArrestToggle = (event, newView) => {
        if(newView !== null) {
            setArrestMade(newView)
        }
    };

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
        let formattedDate = createFormattedDate(searchDate, searchYear,searchMonth, setMonthNumber, monthNumber, searchSpan, searchDay)
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

    const mapRef = useRef();
        const onMapLoad = useCallback((map) => {
            mapRef.current = map;
        }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    
    const userPageResponse = () => {
        if(window.innerWidth >= 1000){
            window.location.reload()
        }else if(window.innerWidth <= 1000){
            window.location.reload()
        }
    }

    window.addEventListener('resize', userPageResponse);
    
    return window.innerWidth > 960 ? (

        <div className="map-container">
            <div className="control-panel-wrap">
                <SearchResults pageTitle={pageTitle} totalCrimeCount={totalCrimeCount} searchSpan={searchSpan} searchYear={searchYear} 
                    fullMonths={fullMonths} months={months} searchMonth={searchMonth} searchDay={searchDay} />
                <LocationSelect setMyLocation={setMyLocation} getHoodLatLng={getHoodLatLng} />
                <SearchSpan searchSpan={searchSpan} setSearchSpan={setSearchSpan} setSearchMonth={setSearchMonth} searchMonth={searchMonth} 
                    months={months} formatDay={formatDay} setMonthNumber={setMonthNumber} setSearchDay={setSearchDay} dayOfTheMonth={dayOfTheMonth} 
                    daysOfTheMonth={daysOfTheMonth} searchYear={searchYear} setSearchYear={setSearchYear} yearArray={yearArray} />
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
                <LegendModal />
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
                        {showHomicide && homicideStats?.map((homicide) => (
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
                        {showSexAssault && sexAssaultStats?.map((sexAssault) => (
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
                        {showRobbery && robberyStats?.map((robbery) => (
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
                        {showBattery && batteryStats?.map((battery) => (
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
                        {showAssault && assaultStats?.map((assault) => (
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
                        {showViolation && violationStats?.map((violation) => (
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
                        {showShotsFired && shotsFiredStats?.map((shots) => (
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
                        {showGunPossession && gunPossessionStats?.map((gun) => (
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
                        {showAmmoViolation && ammoViolationStats?.map((ammo) => (
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
                        {showGunSale && gunSaleStats?.map((sale) => (
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
                        {showGunInSchool && gunInSchoolStats?.map((guns) => (
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
                        {showGunAttackOnCops && gunAttackOnCopsStats?.map((attacks) => (
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
                        {showAttackOnCops && attackOnCopsStats?.map((attacks) => (
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
                        {showCarjack && carjackStats?.map((carjacking) => (
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
                <div className="lottieWrapper">
                    <div className="lottieContainer">
                        <h1 className="loading-title">Loading... Please Wait</h1>
                        <Lottie
                            loop
                            animationData={carSafety}
                            play
                            style={{ width: 'calc(100vw - 550px)', height: 650 }}
                        />
                    </div>
                </div>
            </>
            }
        </div>
    ) : (
        <div className="map-container-mobile">
            <div className="map-mobile">
                <SearchResults pageTitle={pageTitle} totalCrimeCount={totalCrimeCount} searchSpan={searchSpan} searchYear={searchYear} 
                    fullMonths={fullMonths} months={months} searchMonth={searchMonth} searchDay={searchDay} />
                {violationStats.length ? 
                <>
                <GoogleMap
                    className="map-canvas"
                    mapContainerStyle={mobileContainerStyle}
                    center={{lat: lat, lng: lng}}
                    zoom={12}
                    options={options}
                    onLoad={onMapLoad}
                >
                    {showHomicide && homicideStats?.map((homicide) => (
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
                                scaledSize: new window.google.maps.Size(50, 50),
                            }}
                        />
                    ))}
                    {showSexAssault && sexAssaultStats?.map((sexAssault) => (
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
                    {showRobbery && robberyStats?.map((robbery) => (
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
                    {showBattery && batteryStats?.map((battery) => (
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
                    {showAssault && assaultStats?.map((assault) => (
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
                    {showViolation && violationStats?.map((violation) => (
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
                    {showShotsFired && shotsFiredStats?.map((shots) => (
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
                    {showGunPossession && gunPossessionStats?.map((gun) => (
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
                    {showAmmoViolation && ammoViolationStats?.map((ammo) => (
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
                    {showGunSale && gunSaleStats?.map((sale) => (
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
                    {showGunInSchool && gunInSchoolStats?.map((guns) => (
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
                    {showGunAttackOnCops && gunAttackOnCopsStats?.map((attacks) => (
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
                    {showAttackOnCops && attackOnCopsStats?.map((attacks) => (
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
                    {showCarjack && carjackStats?.map((carjacking) => (
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
                                <h4>{selectedCrime.primary_type}</h4>
                                <h5>{selectedCrime.description}</h5>
                                <h5>{selectedCrime.location_description}</h5>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
                </> : 
                <>
                    <div className="mobileLottieWrapper">
                    <div className="mobileLottieContainer">
                        <h1 className="loading-title-mobile">Loading... Please Wait</h1>
                        <Lottie
                            loop
                            animationData={carSafety}
                            play
                            style={{ width: 400, height: '75vh' }}
                        />
                    </div>
                </div>
                </>
                }
            </div>
            <div className="search-modal">
                <Button variant="contained" onClick={handleOpen}>Set Search</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="control-modal-wrap">
                        <LocationSelect setMyLocation={setMyLocation} getHoodLatLng={getHoodLatLng} />
                        <SearchSpan searchSpan={searchSpan} setSearchSpan={setSearchSpan} setSearchMonth={setSearchMonth} searchMonth={searchMonth} 
                            months={months} formatDay={formatDay} setMonthNumber={setMonthNumber} setSearchDay={setSearchDay} dayOfTheMonth={dayOfTheMonth} 
                            daysOfTheMonth={daysOfTheMonth} searchYear={searchYear} setSearchYear={setSearchYear} yearArray={yearArray} />
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
                        <LegendModal />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Map

