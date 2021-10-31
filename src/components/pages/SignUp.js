import React, {useEffect, useState} from "react";
import SignupForm from "../SignupForm/SignupForm";

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
    )
}

export default SignUp