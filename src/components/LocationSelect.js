import React from 'react'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { neighborhoodObject } from '../services/mapService';
import styles from '../styles/LocationSelectComp.module.css'


export default function LocationSelect({setMyLocation, getHoodLatLng, setLat, setLng}) {
    return (
        <div className={styles.searchBar}>
            <Button variant="contained" className={styles.myLocation} size="large" onClick={() => {setMyLocation(setLat, setLng)}}>My Location</Button>
            <FormControl sx={{ m: 0, minWidth: 238 }} size="small">
                <Select className={styles.sbInputs} defaultValue="Near West Side" onChange={event => {
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
    )
}
