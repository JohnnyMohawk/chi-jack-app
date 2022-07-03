import React from 'react'
import './pages/Map.css'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { neighborhoodObject } from '../services/mapService';

export default function LocationSelect({setMyLocation, getHoodLatLng, setLat, setLng}) {
    return (
        <div className="search-bar">
            <Button variant="contained" className="sb-inputs" id="my-location" size="large" onClick={() => {setMyLocation(setLat, setLng)}}>My Location</Button>
            <FormControl sx={{ m: 0, minWidth: 238 }} size="small">
                <Select className="sb-inputs" id="hoodSelect" defaultValue="Near West Side" onChange={event => {
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
