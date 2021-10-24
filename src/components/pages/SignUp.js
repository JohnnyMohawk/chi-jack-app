import React, {useEffect} from "react";
import Lottie from 'react-lottie-player'
import underConstruction from '../../assets/animations/underConstruction.json'
import '../../App.css'

function SignUp() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <div className="map-container">
            <h1 className="map-title">Membership & Member Pages Coming Soon!</h1>
        <div className="construction">
            <Lottie
            loop
            animationData={underConstruction}
            play
            style={{ width: 700, height: 600 }}
            />
        </div>
        </div>
        </>
    )

}

export default SignUp