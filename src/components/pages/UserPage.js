import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, fullMonths, months} from '../../services/mapService.js'
import * as authService from '../../services/authService'
import mapStyles from './mapStyles';
import mapStyles1 from './mapStyles1';
import '../pages/UserPage.css'
import userEvent from '@testing-library/user-event';
require('dotenv').config()

const containerStyle = {
    width: '33.3vw',
    height: '68vh'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}

const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

const UserPage = (props) => {
    
    const [user, setUser] = useState(authService.getUser())

    const userPageResponse = () => {
        if(window.innerWidth >= 960){
            window.location.reload()
        }else if(window.innerWidth <= 960){
            window.location.reload()
        }
    }

    window.addEventListener('resize', userPageResponse);

    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
    })

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const today = new Date()
    today.setDate(today.getDate() - 8)
    let searchDate = today.toDateString()
    let dayOfTheMonth = formatDay(today.getDate())

    const [carjackStats, setCarjackStats] = useState([])
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [carjackings, setCarjackings] = useState([])
    const [selectedCrime, setSelectedCrime] = useState(null)
    const [searchSpan, setSearchSpan] = useState("month")
    const [yearArray, setYearArray] = useState([])
    const [searchDay, setSearchDay] = useState(dayOfTheMonth)
    const [searchYear, setSearchYear] = useState(currentYear)
    const [searchMonth, setSearchMonth] = useState(months[currentMonth])
    const [monthNumber, setMonthNumber] = useState(currentMonth + 1)
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

    const getHoodLatLng = (selection) => {
        setLat(neighborhoodObject[selection][0])
        setLng(neighborhoodObject[selection][1])
    }

    // console.log(neighborhoodObject[user.homeHood][0])

    const makeApiCall = async() => {
        let formattedDate = createFormattedDate()
        let res = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?description=AGGRAVATED%20VEHICULAR%20HIJACKING&$limit=50000&$offset=0')
        let data = await res.json()
        let yearArr = yearRange(2001, currentYear)
        setYearArray(yearArr)
        let createDaysOfMonthArray = getDaysInMonth(months.indexOf(searchMonth), searchYear)
        setDaysOfTheMonth(createDaysOfMonthArray)
        if(searchSpan !== "week"){
            setCarjackStats(data.filter(crime => crime.date.includes(formattedDate)))
        }else if(searchSpan === "week") {
            setCarjackStats(data.filter(crime => (crime.date.includes(formattedDate[0]) || crime.date.includes(formattedDate[1]) || crime.date.includes(formattedDate[2]) || crime.date.includes(formattedDate[3]) || crime.date.includes(formattedDate[4]) || crime.date.includes(formattedDate[5]) || crime.date.includes(formattedDate[6]))))
        }
    }

    useEffect(() => {
        getHoodLatLng("Loop")
    }, [])

    useEffect(() => {
        makeApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay])

    useEffect(() => {
        carjackStats &&
            (async () => {
                setCarjackings(carjackStats)
            })();
    }, [carjackStats]);

    const mapRef = React.useRef();
        const onMapLoad = React.useCallback((map) => {
            mapRef.current = map;
        }, []);
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    
    return carjackings.length ? (

        <div className="map-container">
            <h1 className="user-page-title">{user.name}'s Dashboard</h1>
            <h4>Select What Data To Display</h4>
            <div className="search-bar-wrapper">
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
                    <select className="sb-inputs" defaultValue={searchYear} onChange={event => {
                    setSearchYear(event.target.value)
                    }}>
                        {yearArray.reverse().map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div> 
            {window.innerWidth >= 960 ? 
            <div className="user-map-text">
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3>{user.homeHood}</h3>
                    </div>
                    <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '33.3vw',
                            height: '68vh'
                        }}
                        center={{lat: neighborhoodObject[user.homeHood][0], lng: neighborhoodObject[user.homeHood][1]}}
                        zoom={13}
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
                    </GoogleMap>
                </div>
                <div className="hood-map">
                    <div className="hood-name-title-mid">
                        <h3>{user.workHood}</h3>
                    </div>
                    <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '33.3vw',
                            height: '68vh'
                        }}
                        center={{lat: neighborhoodObject[user.workHood][0], lng: neighborhoodObject[user.workHood][1]}}
                        zoom={13}
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
                    </GoogleMap>
                </div>
                <div className="hood-map">
                    <div className="hood-name-title">
                        <h3>{user.checkHood}</h3>
                    </div>
                    <GoogleMap
                        className="map-canvas"
                        mapContainerStyle={{
                            width: '33.3vw',
                            height: '68vh'
                        }}
                        center={{lat: neighborhoodObject[user.checkHood][0], lng: neighborhoodObject[user.checkHood][1]}}
                        zoom={13}
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
                    </GoogleMap>
                </div>
            </div>
            
        :
        <>
        <div className="user-map-text-mobile">
            <div className="hood-map">
                <div className="hood-name-title">
                    <h3>{user.homeHood}</h3>
                </div>
                <GoogleMap
                    className="map-canvas"
                    mapContainerStyle={{
                        width: '100vw',
                        height: '68vh'
                    }}
                    center={{lat: neighborhoodObject[user.homeHood][0], lng: neighborhoodObject[user.homeHood][1]}}
                    zoom={13}
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
                </GoogleMap>
                </div>
                <div className="hood-map">
                <div className="hood-name-title">
                    <h3>{user.workHood}</h3>
                </div>
                <GoogleMap
                    className="map-canvas"
                    mapContainerStyle={{
                        width: '100vw',
                        height: '68vh'
                    }}
                    center={{lat: neighborhoodObject[user.workHood][0], lng: neighborhoodObject[user.workHood][1]}}
                    zoom={13}
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
                </GoogleMap>
                </div>
                <div className="hood-map">
                <div className="hood-name-title">
                    <h3>{user.checkHood}</h3>
                </div>
                <GoogleMap
                    className="map-canvas"
                    mapContainerStyle={{
                        width: '100vw',
                        height: '68vh'
                    }}
                    center={{lat: neighborhoodObject[user.checkHood][0], lng: neighborhoodObject[user.checkHood][1]}}
                    zoom={13}
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
                </GoogleMap>
                </div>
            </div>
        </>
        }
        </div>
    ) : 
    <>
        <div className="map-container">
        <h1 className="map-title">Loading... Please Wait</h1>
            <Lottie
                loop
                animationData={carSafety}
                play
                style={{ width: 700, height: 700 }}
            />
        </div>
    </>
}

export default UserPage