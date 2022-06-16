import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, fullMonths, months, homicideApiCall, sexAssaultApiCall, robberyApiCall, batteryApiCall, assaultApiCall, gunViolationApiCall, carjackApiCall, filterApiCallData} from '../../services/mapService.js'
import mapStyles from './mapStyles';
import '../pages/Map.css'
require('dotenv').config()

const containerStyle = {
    width: '100vw',
    height: '68vh'
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
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [carjackStats, setCarjackStats] = useState([])
    const [selectedCrime, setSelectedCrime] = useState(null)
    const [searchSpan, setSearchSpan] = useState("month")
    const [yearArray, setYearArray] = useState([])
    const [searchDay, setSearchDay] = useState(dayOfTheMonth)
    const [searchYear, setSearchYear] = useState(searchDate.split(' ')[3])
    const [searchMonth, setSearchMonth] = useState(months[currentMonth])
    const [monthNumber, setMonthNumber] = useState(months.indexOf(searchDate.split(' ')[1]) + 1)
    const [daysOfTheMonth, setDaysOfTheMonth] = useState(getDaysInMonth(currentMonth, currentYear))


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
        let carjackings = await carjackApiCall()
        setHomicideStats(filterApiCallData(homicides, formattedDate, searchSpan))
        setSexAssaultStats(filterApiCallData(sexualAssaults, formattedDate, searchSpan))
        setRobberyStats(filterApiCallData(robberies, formattedDate, searchSpan))
        setBatteryStats(filterApiCallData(batteries, formattedDate, searchSpan))
        setAssaultStats(filterApiCallData(assaults, formattedDate, searchSpan))
        setViolationStats(filterApiCallData(gunViolations, formattedDate, searchSpan))
        setCarjackStats(filterApiCallData(carjackings, formattedDate, searchSpan))
    }

    useEffect(() => {
        getHoodLatLng("Loop")
    }, [])

    useEffect(() => {
        mapCenterOnSelect()
    }, [selectedCrime])

    useEffect(() => {
        yearMonthArray()
        serverSideApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay])

    const mapRef = React.useRef();
        const onMapLoad = React.useCallback((map) => {
            mapRef.current = map;
        }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (

        <div className="map-container">
            <h1 className="map-title">Interactive Chicago Carjacking Map</h1>
            <div className="cj-number-wrapper">
                <h2 className="carjack-numbers heart" id="cj-num-id">{homicideStats.length + sexAssaultStats.length + robberyStats.length + batteryStats.length + assaultStats.length + violationStats.length + carjackStats.length}</h2>
                <h2 className="force-space">{"_"}</h2>
                <h2 className="search-params">{`Carjackings
                    ${searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""}
                    ${searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
                    ${searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""}
                    ${searchSpan === "year" ? "in " : ""}
                    ${searchYear}`}
                </h2>
            </div>
            <div className="search-bar-wrapper">
            <div className="search-bar">
            <button className="sb-inputs" onClick={() => {setMyLocation()}}>My Location</button>
            <select className="sb-inputs" defaultValue="Loop" onChange={event => {
                getHoodLatLng(event.target.value)
                }}>
                {Object.keys(neighborhoodObject).sort().map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>
                        {neighborhood}
                    </option>
                ))}
            </select>
            </div>
                <div className="search-bar">
                    <select className="sb-inputs" defaultValue={searchSpan} onChange={event => {
                    setSearchSpan(event.target.value)
                    }}>
                        <option value="most recent">One Day</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Annual</option>
                    </select>
                    {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
                    <>
                        <select className="sb-inputs" defaultValue={searchMonth} onChange={event => {
                        setSearchMonth(event.target.value)
                        let moNo = months.indexOf(event.target.value) + 1
                        formatDay(moNo)
                        setMonthNumber(moNo)
                        }}>
                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    </>
                    :
                    <></>
                    }
                    {searchSpan === "week" || searchSpan === "most recent" ? 
                    <>
                    <select className="sb-inputs" defaultValue={dayOfTheMonth} onChange={event => {
                    setSearchDay(event.target.value)
                    }}>
                        {daysOfTheMonth.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    </>
                    :
                    <></>
                    }
                    <select className="sb-inputs" value={searchYear} onChange={event => {
                    setSearchYear(event.target.value)
                    console.log(searchYear)
                    }}>
                        {yearArray.reverse().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
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
                        {homicideStats?.map((homicide) => (
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
                                    url: `/carjacking-red.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {sexAssaultStats?.map((sexAssault) => (
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
                                    url: `/carjack-icon-black-outline.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {robberyStats?.map((robbery) => (
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
                                    url: `/carjack-icon-black-outline.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {batteryStats?.map((battery) => (
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
                                    url: `/carjack-icon-black-outline.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {assaultStats?.map((assault) => (
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
                                    url: `/carjack-icon-black-outline.png`,
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(15, 15),
                                    scaledSize: new window.google.maps.Size(70, 70),
                                }}
                            />
                        ))}
                        {violationStats?.map((violation) => (
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

