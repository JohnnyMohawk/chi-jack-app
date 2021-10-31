import React, {useState, useEffect} from 'react'
import * as emailService from '../services/emailService'
import { Link, useHistory } from 'react-router-dom'
import { Button } from './Button'
import './Footer.css'


function Footer(props) {

    const history = useHistory()
    const [validForm, setValidForm] = useState(false)
    const [formData, setFormData] = useState({
        email: ''
    })

    const handleChange = evt => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        emailService.createEmail(formData)
        setFormData({...formData, email: '' })
        alert("Thank you very much for joining the Shy Jack Mailing List!")
    }

    useEffect(() => {
        const { email } = formData
        const isFormInvalid = !(email)
            setValidForm(isFormInvalid)
        }, [formData])

    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                Join Shy Jack's newsletter to receive important updates on issues involving Chicago carjackings, policing and policy.
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        // className="container"
                    >
                        {/* <input type="email" name="email" placeholder="Your Email" className="footer-input" /> */}
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            className="footer-input"
                            autoComplete="off"
                            id="email"
                            value={formData.email}
                            onChange={handleChange} />
                        <Button to="/sign-up" onClick={handleSubmit} buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Jack</h2>
                        <Link to="/who-is-jack" className="ft-link-class">Who is Shy Jack?</Link>
                        <Link to="/how-it-works" className="ft-link-class">How Jack Knows?</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Get Involved</h2>
                        <Link to="/what-to-do">What Can I Do?</Link>
                        <Link to="/save-our-city">Save Our City</Link>
                    </div>
                </div>
            </div>
        <section className="social-media">
            <div className="social-media-wrap">
                <div className="footer-logo">
                    <Link to="/" className="social-logo">
                        Shy Jack<i class="fas fa-car-crash"></i>
                    </Link>
                </div>
                <small className="website-rights">John Nelson-Alden © 2021</small>
                <div className="social-icons">
                    <Link
                        className="social-icon-link instagram"
                        to="/"
                        target="_blank"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram" />
                    </Link>
                    <Link
                        className="social-icon-link youtube"
                        to="/"
                        target="_blank"
                        aria-label="Youtube"
                    >
                        <i className="fab fa-youtube" />
                    </Link>
                    <Link
                        className="social-icon-link twitter"
                        to="/"
                        target="_blank"
                        aria-label="Twitter"
                    >
                        <i className="fab fa-twitter" />
                    </Link>
                    <Link
                        className="social-icon-link linkedin"
                        to="/"
                        target="_blank"
                        aria-label="Linkedin"
                    >
                        <i className="fab fa-linkedin" />
                    </Link>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Footer
