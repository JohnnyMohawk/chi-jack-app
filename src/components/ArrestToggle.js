import React from 'react'
import './pages/Map.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ArrestToggle({arrestMade, handleArrestToggle}) {
    return (
        <div className="crime-toggle-bar">
            <ToggleButtonGroup
                className='arrest-view'
                value={arrestMade}
                exclusive
                onChange={handleArrestToggle}
                aria-label="arrest-view-toggle"
            >
                <ToggleButton value="All" aria-label="all crimes" color="warning" className='arrest-all'>
                    All
                </ToggleButton>
                <ToggleButton value="Yes" aria-label="crimes with arrest" color="warning" className='arrest-toggle'>
                    Arrest Made
                </ToggleButton>
                <ToggleButton value="No" aria-label="crimes with no arrest" color="warning" className='arrest-toggle'>
                    No Arrest Made
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
