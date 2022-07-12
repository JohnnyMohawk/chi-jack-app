import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from '../styles/SearchSpanComp.module.css'


export default function SearchSpan({searchSpan, setSearchSpan, setSearchMonth, searchMonth, months, formatDay, setMonthNumber, setSearchDay, dayOfTheMonth, daysOfTheMonth, searchYear, setSearchYear, yearArray}) {
    return (
        <div className={styles.searchBar}>
            <Select className={styles.sbInputs} id='timeSpan' defaultValue={searchSpan} onChange={event => {
            setSearchSpan(event.target.value)
            }}>
                <MenuItem value="most recent">One Day</MenuItem>
                <MenuItem value="week">Weekly</MenuItem>
                <MenuItem value="month">Monthly</MenuItem>
                <MenuItem value="year">Annual</MenuItem>
            </Select>
            {searchSpan === "week" || searchSpan === "most recent" || searchSpan === "month" ? 
            <>
                <Select className={styles.sbInputs} id='monthSelect' defaultValue={searchMonth} onChange={event => {
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
                <Select className={styles.sbInputs} id='daySelect' defaultValue={dayOfTheMonth} onChange={event => {
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
            <Select className={styles.sbInputs} id='yearSelect' value={searchYear} onChange={event => {
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
