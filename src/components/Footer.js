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
                    >
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            className="footer-input"
                            autoComplete="off"
                            id="email"
                            value={formData.email}
                            onChange={handleChange} />
                        <Button to="/sign-up" onClick={handleSubmit} buttonStyle='btn--outline' buttonSize="btn--medium">Subscribe</Button>
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
                    <div className="footer-link-items right">
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
                    <a className="social-icon-link instagram" href="https://www.instagram.com/ShyJack312/" target="_blank" rel="noopennernoreferrer">
                        <i className="fab fa-instagram" />
                    </a>
                    <a className="social-icon-link youtube" href="https://www.youtube.com/channel/UCICVa9m2nDCVNuIIUzW9nmg" target="_blank" rel="noopennernoreferrer">
                        <i className="fab fa-youtube" />
                    </a>
                    <a className="social-icon-link twitter" href="https://twitter.com/ShyJack312" target="_blank" rel="noopennernoreferrer">
                        <i className="fab fa-twitter" />
                    </a>
                    <a className="social-icon-link linkedin" href="https://www.linkedin.com/in/john-nelson-alden/" target="_blank" rel="noopennernoreferrer">
                        <i className="fab fa-linkedin" />
                    </a>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Footer
