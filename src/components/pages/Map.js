import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import {formatDay, getDaysInMonth, createWeekArr, yearRange} from '../services/mapService.js'
import mapStyles from './mapStyles';
import '../../App.css'
import '../pages/Map.css'
require('dotenv').config()

const containerStyle = {
    width: '70vw',
    height: '65vh'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}

const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE_MAPS

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey,
    })

    const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
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
        makeApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay])

    useEffect(() => {
        (async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(parseFloat(position.coords.latitude))
                    setLng(parseFloat(position.coords.longitude))
                },
                () => null
            )
        })()
    }, [])

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
    
    return carjackings ? (

        <div className="map-container">
            <h1 className="map-title">Interactive Chicago Carjacking Map</h1>
            <h2>{carjackStats.length} {" "}
                Carjackings {" "}
                {searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""} {" "}
                {searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
                {searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""} {" "}
                {searchSpan === "year" ? "in " : ""} {" "}
                {searchYear}
            </h2>
            <div className="search-bar">
                <select name="status" id="status" className="statusDrop" defaultValue={searchSpan} onChange={event => {
                setSearchSpan(event.target.value)
                }}>
                    <option value="most recent">One Day</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                    <option value="year">Annual</option>
                </select>
                {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
                <>
                    <select defaultValue={searchMonth} onChange={event => {
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
                <select defaultValue={dayOfTheMonth} onChange={event => {
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
                <select defaultValue={searchYear} onChange={event => {
                setSearchYear(event.target.value)
                }}>
                    {yearArray.reverse().map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="map-text">
            
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: lat, lng: lng}}
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
                            <div>
                                <h2>{selectedCrime.description}</h2>
                                <h3>{selectedCrime.date}</h3>
                                <h3>{selectedCrime.block}</h3>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </div>
    ) : <></>
}

export default Map