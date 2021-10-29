import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as authService from '../../services/authService'
import '../SignupForm/SignupForm.css'

const LoginForm = (props) => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = evt => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        authService.login(formData)
        .then(() => {
            props.handleSignupOrLogin()
            history.push('/')
        })
        .catch(err => {
            alert('Invalid Credentials')
        })
    }

    return (
        <div className="signup-form-container">
            <h1>Log In</h1>
            <div className="signup-form-text">
                <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="container"
                >
                    <div className="inputContainer">
                        <label htmlFor="email-input" className="label">
                            Email
                        </label>
                        <input
                            className="input-field"
                            type="text"
                            autoComplete="off"
                            id="email-input"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password-input" className="label">
                            Password
                        </label>
                        <input
                            className="input-field"
                            type="password"
                            autoComplete="off"
                            id="password-input"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="buttonContainerWrapper">
                        <div className="buttonContainer">
                            <button className="button">Log In</button>
                            <Link to="/">
                                <button className="button">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
