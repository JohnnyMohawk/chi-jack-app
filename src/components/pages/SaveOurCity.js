import React, {useEffect} from "react";
import Lottie from 'react-lottie-player'
import underConstruction from '../../assets/animations/underConstruction.json'
import cityView from '../../assets/animations/cityView.json'
import '../../App.css'

function SaveOurCity() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <div className="skyline-container">
            <h1 className="sos-title">Love Your Neighbor</h1>
            <div className="city-view">
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