import React, {useEffect} from 'react'
import styles from '../../styles/InfoPage.module.css'


function WhatToDo () {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <div className={styles.infoPageContainer}>
                <h1 className={styles.infoPageTitle}>What Can I Do?</h1>
                <div className={styles.infoPageText}>
                    <h3 className={styles.infoPageSubtitle}>In order to prevent a carjacking, here's what police say to do:</h3>
                    <ul className={styles.infoPageList}>
                        <li className={styles.infoPageListItem}>
                            Do not wait in your car in the driveway of your home
                        </li>
                        <li className={styles.infoPageListItem}>
                            Park in well-lit, visible areas
                        </li>
                        <li className={styles.infoPageListItem}>
                            Keep windows up and doors locked
                        </li>
                        <li className={styles.infoPageListItem}>
                            Equip your vehicle with anti-theft or GPS for tracking
                        </li>
                        <li className={styles.infoPageListItem}>
                            Allow yourself room in traffic to move around other cars and avoid getting "boxed in"
                        </li>
                        <li className={styles.infoPageListItem}>
                            Keep your cell phone in your pocket, rather than in the car
                        </li>
                    </ul>
                    <h3 className={styles.infoPageSubtitle}>If you find yourself a victim of a carjacking, here's what police say to remember:</h3>
                    <ul className={styles.infoPageList}>
                        <li className={styles.infoPageListItem}>
                            Give up your car and leave the scene
                        </li>
                        <li className={styles.infoPageListItem}>
                            Avoid verbal and physical altercations
                        </li>
                        <li className={styles.infoPageListItem}>
                            Take note of the carjacker's description and their vehicle's description
                        </li>
                        <li className={styles.infoPageListItem}>
                            If there's a child in the car, tell the carjacker "my child is in the car"
                        </li>
                        <li className={styles.infoPageListItem}>
                            Call 9-1-1 immediately
                        </li>
                    </ul>
                    <h3 className={styles.infoPageSubtitle}>Be On The Look Out For:</h3>
                    <p className={styles.infoPageCopy}>
                        Chicago police warned residents to be aware of anywhere a driver slows down or stops as it could be a sign 
                        of an attempted carjacking. Other common areas of carjackings, according to officials, are in residential 
                        driveways, parking lots and garages, gas stations, ATMs and intersections with stop lights.
                    </p>
                    <p className={styles.infoPageCopy}>
                        Some carjackers will bump into the rear end of another car so the driver pulls over and leaves the vehicle to 
                        asses the damages, which gives an opportunity for someone to easily steal the car, police said.
                    </p>
                    <p className={styles.infoPageCopy}>
                        Officials also warned to not stop for stranded vehicles on the side of the road as it could be someone waiting to 
                        carjack another vehicle. Instead, police said to call 9-1-1 and note the location of the vehicle.
                    </p>
                </div>
            </div>
        </>
    )

}


export default WhatToDo