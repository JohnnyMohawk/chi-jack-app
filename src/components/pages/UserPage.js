import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLoadScript } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, yearRange, neighborhoodObject, months, 
        homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, 
        gunFireViolation, gunNoFireViolation, ammoViolation, illegalGunSale, gunInSchool, gunAttackOnCops, attackOnCops, 
        carjackApiCall, filterApiCallData, createFormattedDate} from '../../services/mapService.js'
import mapStyles from './mapStyles';
import mapStyles1 from './mapStyles1';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LegendModal from '../LegendModal'
import SearchSpan from '../SearchSpan'
import ArrestToggle from '../ArrestToggle'
import CrimeToggle from '../CrimeToggle'
import MapComponent from '../MapComponent'
import { FaTimesCircle } from 'react-icons/fa'

import * as authService from '../../services/authService'

import '../pages/UserPage.css'
require('dotenv').config()

const containerStyle = {
    width: '33.3vw',
    height: '75vh'
}

const mobileContainerStyle = {
    width: '100vw',
    height: '70vh'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}

const options2 = {
    styles: mapStyles1,
    disableDefaultUI: true,
}

const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

const UserPage = (props) => {
    
    const [user, setUser] = useState(authService.getUser())

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
    const [selectedCrime2, setSelectedCrime2] = useState(null)
    const [selectedCrime3, setSelectedCrime3] = useState(null)
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
    }, [showHomicide, showAssault, showSexAssault, showBattery, showRobbery, showViolation, showShotsFired, showGunPossession, 
        showAmmoViolation, showGunSale, showGunInSchool, showGunAttackOnCops, showAttackOnCops, showCarjack, arrestMade])

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
    return (

        <div className="map-container">
            <h1 className="user-page-title">{user.name}'s Dashboard</h1>
            {homicideStats.length ? 
            <>
            {window.innerWidth >= 960 ? 
            <div className="user-map-text">
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.homeHood}</h3>
                    </div>

                    <div className="user-map-text">
                        <MapComponent containerStyle={containerStyle} lat={neighborhoodObject[user.homeHood][0]} lng={neighborhoodObject[user.homeHood][1]} options={options} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime} selectedCrime={selectedCrime} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
                </div>
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.workHood}</h3>
                    </div>
                    <div className="user-map-text">
                        <MapComponent containerStyle={containerStyle} lat={neighborhoodObject[user.workHood][0]} lng={neighborhoodObject[user.workHood][1]} options={options2} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime2} selectedCrime={selectedCrime2} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
                </div>
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.checkHood}</h3>
                    </div>
                    <div className="user-map-text">
                        <MapComponent containerStyle={containerStyle} lat={neighborhoodObject[user.checkHood][0]} lng={neighborhoodObject[user.checkHood][1]} options={options} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime3} selectedCrime={selectedCrime3} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
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
                            <div className='closeButtonMobileWrap'>
                                <button className='closeButtonMobile' onClick={handleClose}><FaTimesCircle /></button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            
            :
            <>
            <div className="user-map-text-mobile">
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.homeHood}</h3>
                        <div className="search-modal">
                        <Button variant="contained" onClick={handleOpen}>Set Search</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className="control-modal-wrap">
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
                                <div className='closeButtonMobileWrap'>
                                    <button className='closeButtonMobile' onClick={handleClose}><FaTimesCircle /></button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    </div>
                    <div className="user-map-text">
                        <MapComponent containerStyle={mobileContainerStyle} lat={neighborhoodObject[user.homeHood][0]} lng={neighborhoodObject[user.homeHood][1]} options={options} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime} selectedCrime={selectedCrime} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
                    {/* <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '100vw',
                            height: '70vh'
                        }}
                        center={{lat: neighborhoodObject[user.homeHood][0], lng: neighborhoodObject[user.homeHood][1]}}
                        zoom={14}
                        options={options}
                        onLoad={onMapLoad}
                    >
                        {carjackings?.map((jacking) => (
                            <Marker 
                                key={jacking.id} 
                                position={{ 
                                    lat: parseFloat(jacking.latitude), 
                                    lng: parseFloat(jacking.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(jacking)
                                }}
                                icon={{
                                    url: `/carjacking-red.png`,
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
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap> */}
                </div>
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.workHood}</h3>
                    </div>
                    <div className="user-map-text">
                        <MapComponent containerStyle={mobileContainerStyle} lat={neighborhoodObject[user.workHood][0]} lng={neighborhoodObject[user.workHood][1]} options={options2} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime2} selectedCrime={selectedCrime2} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
                    {/* <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '100vw',
                            height: '70vh'
                        }}
                        center={{lat: neighborhoodObject[user.workHood][0], lng: neighborhoodObject[user.workHood][1]}}
                        zoom={14}
                        options={{
                            styles: mapStyles1,
                            disableDefaultUI: true,
                        }}
                        onLoad={onMapLoad}
                    >
                        {carjackings?.map((jacking) => (
                            <Marker 
                                key={jacking.id} 
                                position={{ 
                                    lat: parseFloat(jacking.latitude), 
                                    lng: parseFloat(jacking.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(jacking)
                                }}
                                icon={{
                                    url: `/carjack-icon-black-outline.png`,
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
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap> */}
                </div>
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3 className="user-hoods-h3">{user.checkHood}</h3>
                    </div>
                    <div className="user-map-text">
                        <MapComponent containerStyle={mobileContainerStyle} lat={neighborhoodObject[user.checkHood][0]} lng={neighborhoodObject[user.checkHood][1]} options={options} onMapLoad={onMapLoad} 
                            setSelectedCrime={setSelectedCrime3} selectedCrime={selectedCrime3} showHomicide={showHomicide} 
                            homicideStats={homicideStats} showSexAssault={showSexAssault} sexAssaultStats={sexAssaultStats} 
                            showRobbery={showRobbery} robberyStats={robberyStats} showBattery={showBattery} batteryStats={batteryStats} 
                            showAssault={showAssault} assaultStats={assaultStats} showViolation={showViolation} violationStats={violationStats} 
                            showShotsFired={showShotsFired} shotsFiredStats={shotsFiredStats} showGunPossession={showGunPossession} 
                            gunPossessionStats={gunPossessionStats} showAmmoViolation={showAmmoViolation} ammoViolationStats={ammoViolationStats} 
                            showGunSale={showGunSale} gunSaleStats={gunSaleStats} showGunInSchool={showGunInSchool} gunInSchoolStats={gunInSchoolStats} 
                            showGunAttackOnCops={showGunAttackOnCops} gunAttackOnCopsStats={gunAttackOnCopsStats} showAttackOnCops={showAttackOnCops} 
                            attackOnCopsStats={attackOnCopsStats} showCarjack={showCarjack} carjackStats={carjackStats} />
                    </div>
                    {/* <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '100vw',
                            height: '70vh'
                        }}
                        center={{lat: neighborhoodObject[user.checkHood][0], lng: neighborhoodObject[user.checkHood][1]}}
                        zoom={14}
                        options={options}
                        onLoad={onMapLoad}
                    >
                        {carjackings?.map((jacking) => (
                            <Marker 
                                key={jacking.id} 
                                position={{ 
                                    lat: parseFloat(jacking.latitude), 
                                    lng: parseFloat(jacking.longitude) 
                                }}
                                onClick={() => {
                                    setSelectedCrime(jacking)
                                }}
                                icon={{
                                    url: `/carjacking-red.png`,
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
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap> */}
                </div>
            </div>
        </>
        }
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

export default UserPage






// import React, { useState, useEffect } from 'react'
// import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
// import Lottie from 'react-lottie-player'
// import carSafety from '../../assets/animations/carSafety.json'
// import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, months} from '../../services/mapService.js'
// import * as authService from '../../services/authService'
// import mapStyles from './mapStyles';
// import mapStyles1 from './mapStyles1';
// import '../pages/UserPage.css'
// require('dotenv').config()

// const containerStyle = {
//     width: '33.3vw',
//     height: '68vh'
// }

// const mobileContainerStyle = {
//     width: '100vw',
//     height: '70vh'
// }

// const options = {
//     styles: mapStyles,
//     disableDefaultUI: true,
// }

// const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

// const UserPage = (props) => {
    
//     const [user, setUser] = useState(authService.getUser())

//     const userPageResponse = () => {
//         if(window.innerWidth >= 960){
//             window.location.reload()
//         }else if(window.innerWidth <= 960){
//             window.location.reload()
//         }
//     }

//     window.addEventListener('resize', userPageResponse);

//     const { isLoaded, loadError } = useLoadScript({
//         id: 'google-map-script',
//         googleMapsApiKey: `${googleMapsApiKey}`,
//     })

//     const currentYear = new Date().getFullYear()
//     const today = new Date()
//     today.setDate(today.getDate() - 8)
//     let searchDate = today.toDateString()
//     let dayOfTheMonth = formatDay(today.getDate())
//     const currentMonth = months.indexOf(searchDate.split(' ')[1])
    
//     const [carjackStats, setCarjackStats] = useState([])
//     const [lat, setLat] = useState(null)
//     const [lng, setLng] = useState(null)
//     const [carjackings, setCarjackings] = useState([])
//     const [selectedCrime, setSelectedCrime] = useState(null)
//     const [searchSpan, setSearchSpan] = useState("month")
//     const [yearArray, setYearArray] = useState([])
//     const [searchDay, setSearchDay] = useState(dayOfTheMonth)
//     const [searchYear, setSearchYear] = useState(searchDate.split(' ')[3])
//     const [searchMonth, setSearchMonth] = useState(months[currentMonth])
//     const [monthNumber, setMonthNumber] = useState(months.indexOf(searchDate.split(' ')[1]) + 1)
//     const [daysOfTheMonth, setDaysOfTheMonth] = useState(getDaysInMonth(currentMonth, currentYear))

//     const createFormattedDate = () => {
//         let formattedDate
//         let formDateArr = []
//         let dateArr = searchDate.split(" ")
//         dateArr.shift()
//         formDateArr.push(searchYear + "-")
//         months.forEach((month, i) => {
//             if(searchMonth === month){
//                 let dateMonth = i + 1
//                 setMonthNumber(dateMonth)
//                 formDateArr.push(monthNumber + "-" + dateArr[1])
//             }
//         });
//         if(searchSpan === "month"){
//             if(monthNumber < 10){
//                 formattedDate = searchYear + "-0" + monthNumber
//             }else{
//                 formattedDate = searchYear + "-" + monthNumber
//             }
//         }else if(searchSpan === "week"){
//             if(monthNumber < 10){
//                 let completeDate = searchYear + "-0" + monthNumber + "-" + searchDay
//                 let arrayOfDays = createWeekArr(completeDate)
//                 formattedDate = arrayOfDays
//             }else{
//                 let completeDate = searchYear + "-" + monthNumber + "-" + searchDay
//                 let arrayOfDays = createWeekArr(completeDate)
//                 formattedDate = arrayOfDays
//             }
//         }else if(searchSpan === "year"){
//             formattedDate = searchYear
//         }else if(searchSpan === "most recent"){
//             if(monthNumber < 10){
//                 formattedDate = searchYear + "-0" + monthNumber + "-" + searchDay
//             }else{
//                 formattedDate = searchYear + "-" + monthNumber + "-" + searchDay
//             }
//         }
//         return formattedDate
//     }

//     const getHoodLatLng = (selection) => {
//         setLat(neighborhoodObject[selection][0])
//         setLng(neighborhoodObject[selection][1])
//     }

//     const makeApiCall = async() => {
//         let formattedDate = createFormattedDate()
//         let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0325&$limit=50000&$offset=0')
//         let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0326&$limit=50000&$offset=0')
//         let data1 = await res1.json()
//         let data2 = await res2.json()
//         let data = [...data1, ...data2]
//         let yearArr = yearRange(2001, currentYear)
//         setYearArray(yearArr)
//         let createDaysOfMonthArray = getDaysInMonth(months.indexOf(searchMonth), searchYear)
//         setDaysOfTheMonth(createDaysOfMonthArray)
//         if(searchSpan !== "week"){
//             setCarjackStats(data.filter(crime => crime.date.includes(formattedDate)))
//         }else if(searchSpan === "week") {
//             setCarjackStats(data.filter(crime => (crime.date.includes(formattedDate[0]) || crime.date.includes(formattedDate[1]) || crime.date.includes(formattedDate[2]) || crime.date.includes(formattedDate[3]) || crime.date.includes(formattedDate[4]) || crime.date.includes(formattedDate[5]) || crime.date.includes(formattedDate[6]))))
//         }
//     }

//     useEffect(() => {
//         getHoodLatLng("Loop")
//     }, [])

//     useEffect(() => {
//         makeApiCall()
//     }, [searchSpan, searchYear, searchMonth, searchDay])

//     useEffect(() => {
//         carjackStats &&
//             (async () => {
//                 setCarjackings(carjackStats)
//             })();
//     }, [carjackStats]);

//     const mapRef = React.useRef();
//         const onMapLoad = React.useCallback((map) => {
//             mapRef.current = map;
//         }, []);
//     if (loadError) return "Error";
//     if (!isLoaded) return "Loading...";
    
//     return (

//         <div className="map-container">
//             <h1 className="user-page-title">{user.name}'s Dashboard</h1>
//             <h4>Select What Data To Display</h4>
//             <div className="search-bar-wrapper">
//                 <div className="search-bar">
//                     <select className="sb-inputs" defaultValue="week" onChange={event => {
//                     setSearchSpan(event.target.value)
//                     }}>
//                         <option value="most recent">One Day</option>
//                         <option value="week">Weekly</option>
//                         <option value="month">Monthly</option>
//                         <option value="year">Annual</option>
//                     </select>
//                     {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
//                     <>
//                         <select className="sb-inputs" defaultValue={searchMonth} onChange={event => {
//                         setSearchMonth(event.target.value)
//                         let moNo = months.indexOf(event.target.value) + 1
//                         formatDay(moNo)
//                         setMonthNumber(moNo)
//                         }}>
//                         {months.map(month => (
//                             <option key={month} value={month}>
//                                 {month}
//                             </option>
//                         ))}
//                     </select>
//                     </>
//                     :
//                     <></>
//                     }
//                     {searchSpan === "week" || searchSpan === "most recent" ? 
//                     <>
//                     <select className="sb-inputs" defaultValue={dayOfTheMonth} onChange={event => {
//                     setSearchDay(event.target.value)
//                     }}>
//                         {daysOfTheMonth.map(day => (
//                             <option key={day} value={day}>
//                                 {day}
//                             </option>
//                         ))}
//                     </select>
//                     </>
//                     :
//                     <></>
//                     }
//                     <select className="sb-inputs" value={searchYear} onChange={event => {
//                     setSearchYear(event.target.value)
//                     }}>
//                         {yearArray.reverse().map(year => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div> 

//             {carjackings.length ? 
//             <>
//             {window.innerWidth >= 960 ? 
//             <div className="user-map-text">
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.homeHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '33.3vw',
//                             height: '68vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.homeHood][0], lng: neighborhoodObject[user.homeHood][1]}}
//                         zoom={14}
//                         options={options}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjacking-red.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.workHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '33.3vw',
//                             height: '68vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.workHood][0], lng: neighborhoodObject[user.workHood][1]}}
//                         zoom={14}
//                         options={{
//                             styles: mapStyles1,
//                             disableDefaultUI: true,
//                         }}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjack-icon-black-outline.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.checkHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '33.3vw',
//                             height: '68vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.checkHood][0], lng: neighborhoodObject[user.checkHood][1]}}
//                         zoom={14}
//                         options={options}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjacking-red.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//             </div>
            
//             :
//             <>
//             <div className="user-map-text-mobile">
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.homeHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '100vw',
//                             height: '70vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.homeHood][0], lng: neighborhoodObject[user.homeHood][1]}}
//                         zoom={14}
//                         options={options}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjacking-red.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.workHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '100vw',
//                             height: '70vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.workHood][0], lng: neighborhoodObject[user.workHood][1]}}
//                         zoom={14}
//                         options={{
//                             styles: mapStyles1,
//                             disableDefaultUI: true,
//                         }}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjack-icon-black-outline.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//                 <div className="hood-map">
//                     <div className="hood-name-title">
//                         <h3 className="user-hoods-h3">{user.checkHood}</h3>
//                     </div>
//                     <GoogleMap
//                         className="map-canvas"
//                         mapContainerStyle={{
//                             width: '100vw',
//                             height: '70vh'
//                         }}
//                         center={{lat: neighborhoodObject[user.checkHood][0], lng: neighborhoodObject[user.checkHood][1]}}
//                         zoom={14}
//                         options={options}
//                         onLoad={onMapLoad}
//                     >
//                         {carjackings?.map((jacking) => (
//                             <Marker 
//                                 key={jacking.id} 
//                                 position={{ 
//                                     lat: parseFloat(jacking.latitude), 
//                                     lng: parseFloat(jacking.longitude) 
//                                 }}
//                                 onClick={() => {
//                                     setSelectedCrime(jacking)
//                                 }}
//                                 icon={{
//                                     url: `/carjacking-red.png`,
//                                     origin: new window.google.maps.Point(0, 0),
//                                     anchor: new window.google.maps.Point(15, 15),
//                                     scaledSize: new window.google.maps.Size(70, 70),
//                                 }}
//                             />
//                         ))}
//                         {selectedCrime && (
//                             <InfoWindow
//                                 position={{ 
//                                     lat: parseFloat(selectedCrime.latitude), 
//                                     lng: parseFloat(selectedCrime.longitude) 
//                                 }}
//                                 onCloseClick={() => {
//                                     setSelectedCrime(null)
//                                 }}
//                             >
//                                 <div className="info-window">
//                                     <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
//                                     <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
//                                     <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
//                                 </div>
//                             </InfoWindow>
//                         )}
//                     </GoogleMap>
//                 </div>
//             </div>
//         </>
//         }
//         </>
//         :
//         <>
//             <div className="lottie-wrapper">
//                 <div className="lottie-container">
//                     <h1 className="loading-title">Loading... Please Wait</h1>
//                     <Lottie
//                         loop
//                         animationData={carSafety}
//                         play
//                         style={{ width: 700, height: 700 }}
//                     />
//                 </div>
//             </div>
//         </>
//         }
//         </div>
//     ) 
    
// }

// export default UserPage
