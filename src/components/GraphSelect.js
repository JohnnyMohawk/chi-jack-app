import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from '../styles/GraphSelectComp.module.css'


export default function GraphSelect({setGraphType, graphType, searchSpan, setSearchSpan, searchYear, setSearchYear, yearArray}) {
    return (
        <div className={styles.graphSelectWrap}>
            <Select className={styles.sbInputs} defaultValue={graphType} onChange={event => {
                setGraphType(event.target.value)
            }}>
                <MenuItem value="bar">Bar Graph</MenuItem>
                <MenuItem value="doughnut">Doughnut Chart</MenuItem>
                <MenuItem value="line">Line Graph</MenuItem>
                <MenuItem value="pie">Pie Chart</MenuItem>
                <MenuItem value="polar">Polar Area Chart</MenuItem>
                <MenuItem value="radar">Radar Graph</MenuItem>
            </Select>
            <Select className={styles.sbInputs} defaultValue={searchSpan} onChange={event => {
                setSearchSpan(event.target.value)
            }}>
                <MenuItem value="year">All Years</MenuItem>
                <MenuItem value="month">Single Year</MenuItem>
            </Select>
            {searchSpan === "month" ?
                <Select className={styles.sbInputs} defaultValue={searchYear} onChange={event => {
                    setSearchYear(event.target.value)
                }}>
                    {yearArray.reverse().map(year => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
                :
                <></>
            }
        </div>
    )
}
