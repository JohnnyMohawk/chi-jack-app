import React from "react";
import Lottie from 'react-lottie-player'
import carSafety from '../../assets/animations/carSafety.json'
import '../../App.css'

function SignUp() {
    return (
        <Lottie
            loop
            animationData={carSafety}
            play
            style={{ width: 700, height: 700 }}
        />
    )

}

export default SignUp