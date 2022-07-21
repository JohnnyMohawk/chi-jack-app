import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '../styles/ArrestToggleComp.module.css'

export default function ArrestToggle({arrestMade, handleArrestToggle}) {
    return (
        <div className={styles.crimeToggleBar}>
            <ToggleButtonGroup
                className={styles.arrestView}
                value={arrestMade}
                exclusive
                onChange={handleArrestToggle}
                aria-label="arrest-view-toggle"
            >
                <ToggleButton value="All" aria-label="all crimes" color="warning" className={styles.arrestAll}>
                    All
                </ToggleButton>
                <ToggleButton value="Yes" aria-label="crimes with arrest" color="warning" className={styles.arrestToggle}>
                    Arrest Made
                </ToggleButton>
                <ToggleButton value="No" aria-label="crimes with no arrest" color="warning" className={styles.arrestToggle}>
                    No Arrest Made
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}
