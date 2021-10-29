import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as authService from '../../services/authService'
import "../SignupForm/SignupForm.css"

const SignupForm = (props) => {
    const history = useHistory()
    const [validForm, setValidForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: '',
    })

    const handleChange = evt => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        authService.signup(formData)
        .then(() => {
        props.handleSignupOrLogin()
        history.push('/')
        })
        .catch(err => {
        props.updateMessage(err.message)
        })
    }

    useEffect(() => {
        const { name, email, password, passwordConf } = formData
        const isFormInvalid = !(name && email && password === passwordConf)
            setValidForm(isFormInvalid)
        }, [formData])

    return (
        <div className="signup-form-container">
        <h1>Sign Up</h1>
        <div className="signup-form-text">
        <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="container"
        >
        <div className="inputContainer">
            <label htmlFor="name" className="label">
            Name
            </label>
            <input
            className="input-field"
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            />
        </div>
        <div className="inputContainer">
            <label htmlFor="email-input" className="label">Email</label>
            <input
            className="input-field"
            type="text"
            autoComplete="off"
            id="email"
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
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            />
        </div>
        <div className="inputContainer">
            <label htmlFor="confirm-input" className="label">
            Confirm Password
            </label>
            <input
            className="input-field"
            type="password"
            autoComplete="off"
            id="confirm-input"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            />
        </div>
        <div className="buttonContainerWrapper">
        <div className="buttonContainer">
            <button disabled={validForm} className="button">Sign Up</button>
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

export default SignupForm
