import React, {useEffect, useState} from "react";
import Lottie from 'react-lottie-player'
import SignupForm from "../SignupForm/SignupForm";
import underConstruction from '../../assets/animations/underConstruction.json'
import '../../App.css'
// import styles from './Signup.module.css'

function SignUp(props) {
    const [message, setMessage] = useState()

    const updateMessage = msg => {
        setMessage(msg)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <main>
        {message && <p>{message}</p> }
        <SignupForm 
            updateMessage={updateMessage}
            handleSignupOrLogin={props.handleSignupOrLogin}
        />
        </main>

        // <>
        // <div className="map-container">
        // <h1 className="map-title">Membership & Member Pages Coming Soon!</h1>
        // <div className="construction">
        //     <Lottie
        //     loop
        //     animationData={underConstruction}
        //     play
        //     style={{ width: 700, height: 600 }}
        //     />
        // </div>
        // </div>
        // </>
    )

}

export default SignUp