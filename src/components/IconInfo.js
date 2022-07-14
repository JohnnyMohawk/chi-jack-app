import React from 'react'
import styles from '../styles/LegendComp.module.css'

export default function IconInfo({icon, title, specs}) {
    return (
        <div className={styles.iconIUCRList}>
            <img src={icon} className={styles.crimeLogo} alt='crime logo' />
            <div className={styles.iconCopyWrap}>
                <h4 className={styles.crimeName}>{title}</h4>
                <h6 className={styles.crimeSpecs}>{specs}</h6>
            </div>
        </div>
    )
}
