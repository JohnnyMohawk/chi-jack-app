import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import {formatDay, getDaysInMonth, createWeekArr, yearRange, neighborhoodObject, removeZeros, fullMonths, months} from '../../services/mapService.js'
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
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    // const [carjackings, setCarjackings] = useState([])
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
        console.log(neighborhoodObject[selection][0])
        setLat(neighborhoodObject[selection][0])
        setLng(neighborhoodObject[selection][1])
    }

    const homicideApiCall = async() => {
        let formattedDate = createFormattedDate()
        let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0110&$limit=50000&$offset=0')
        let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0130&$limit=50000&$offset=0')
        let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0141&$limit=50000&$offset=0')
        let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0142&$limit=50000&$offset=0')
        let data1 = await res1.json()
        let data2 = await res2.json()
        let data3 = await res3.json()
        let data4 = await res4.json()
        let data = [...data1, ...data2, ...data3, ...data4]
        let yearArr = yearRange(2001, currentYear)
        setYearArray(yearArr)
        let createDaysOfMonthArray = getDaysInMonth(months.indexOf(searchMonth), searchYear)
        setDaysOfTheMonth(createDaysOfMonthArray)
        if(searchSpan !== "week"){
            setHomicideStats(data.filter(crime => crime.date.includes(formattedDate)))
        }else if(searchSpan === "week") {
            setHomicideStats(data.filter(crime => (crime.date.includes(formattedDate[0]) || crime.date.includes(formattedDate[1]) || crime.date.includes(formattedDate[2]) || crime.date.includes(formattedDate[3]) || crime.date.includes(formattedDate[4]) || crime.date.includes(formattedDate[5]) || crime.date.includes(formattedDate[6]))))
        }
    }

    const sexAssaultApiCall = async() => {
        let formattedDate = createFormattedDate()
        let res1 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0261&$limit=50000&$offset=0')
        let res2 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0262&$limit=50000&$offset=0')
        let res3 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0271&$limit=50000&$offset=0')
        let res4 = await fetch('https://data.cityofchicago.org/resource/ijzp-q8t2.json?iucr=0272&$limit=50000&$offset=0')
        let data1 = await res1.json()
        let data2 = await res2.json()
        let data3 = await res3.json()
        let data4 = await res4.json()
        let data = [...data1, ...data2, ...data3, ...data4]
        let yearArr = yearRange(2001, currentYear)
        setYearArray(yearArr)
        let createDaysOfMonthArray = getDaysInMonth(months.indexOf(searchMonth), searchYear)
        setDaysOfTheMonth(createDaysOfMonthArray)
        if(searchSpan !== "week"){
            setSexAssaultStats(data.filter(crime => crime.date.includes(formattedDate)))
        }else if(searchSpan === "week") {
            setSexAssaultStats(data.filter(crime => (crime.date.includes(formattedDate[0]) || crime.date.includes(formattedDate[1]) || crime.date.includes(formattedDate[2]) || crime.date.includes(formattedDate[3]) || crime.date.includes(formattedDate[4]) || crime.date.includes(formattedDate[5]) || crime.date.includes(formattedDate[6]))))
        }
    }

    useEffect(() => {
        getHoodLatLng("Loop")
    }, [])

    useEffect(() => {
        homicideApiCall()
        sexAssaultApiCall()
    }, [searchSpan, searchYear, searchMonth, searchDay])

    useEffect(() => {
        homicideStats &&
            (async () => {
                // setCarjackings(homicideStats)
                console.log(homicideStats)
            })();
    }, [homicideStats]);

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
                <h2 className="carjack-numbers heart" id="cj-num-id">{homicideStats.length + sexAssaultStats.length}</h2>
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
            {homicideStats.length ? 
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

