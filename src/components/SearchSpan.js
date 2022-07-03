import React from 'react'
import './pages/Map.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export default function SearchSpan({searchSpan, setSearchSpan, setSearchMonth, searchMonth, months, formatDay, setMonthNumber, setSearchDay, dayOfTheMonth, daysOfTheMonth, searchYear, setSearchYear, yearArray}) {
    return (
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
    )
}
