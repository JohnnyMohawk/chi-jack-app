import React, {useEffect} from "react";
import Lottie from 'react-lottie-player'
import cityView from '../../assets/animations/cityView.json'
import styles from '../../styles/SaveOurCity.module.css'


function SaveOurCity() {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
        <div className={styles.skylineContainer}>
            <h1 className={styles.sosTitle}>Love Your Neighbor</h1>
            <div className={styles.cityView}>
                <Lottie
                loop
                animationData={cityView}
                play
                style={{ width: 1440, height: 600 }}
                />
            </div>
        </div>
        </>
    )

}

export default SaveOurCity