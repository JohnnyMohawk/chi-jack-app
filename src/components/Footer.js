import React, {useState, useEffect} from 'react'
import * as emailService from '../services/emailService'
import { Link, useHistory } from 'react-router-dom'
import { Button } from './Button'
import MailchimpFormContainer from "./MailchimpSubscribe";
import styles from '../styles/FooterComp.module.css'


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
        <div className={styles.footerContainer}>
            <section className={styles.footerSubscription}>
                <p className={styles.footerSubscriptionHeading}>
                Join Shy Jack's newsletter to receive important updates on issues involving Chicago gun crimes, policing and policy.
                </p>
                <p className={styles.footerSubscriptionText}>
                    You can unsubscribe at any time.
                </p>
                <div className={styles.inputAreas}>
                    {/* <form
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            className={styles.footerInput}
                            autoComplete="off"
                            id="email"
                            value={formData.email}
                            onChange={handleChange} />
                        <Button to="/sign-up" onClick={handleSubmit} buttonStyle='btn--outline' buttonSize="btn--medium">Subscribe</Button>
                    </form> */}
                    <MailchimpFormContainer />
                </div>
            </section>
            <div className={styles.footerLinks}>
                <div className={styles.footerLinkWrapper}>
                    <div className={styles.footerLinkItems}>
                        <h2>About Jack</h2>
                        <Link to="/who-is-jack" className={styles.ftLinkClass}>Who is Shy Jack?</Link>
                        <Link to="/how-it-works" className={styles.ftLinkClass}>How Jack Knows?</Link>
                    </div>
                </div>
                <div className={styles.footerLinkWrapper}>
                    <div className={styles.footerLinkItems} id={styles.right}>
                        <h2>Get Involved</h2>
                        <Link to="/what-to-do">What Can I Do?</Link>
                        <Link to="/save-our-city">Save Our City</Link>
                    </div>
                </div>
            </div>
        <section className={styles.socialMedia}>
            <div className={styles.socialMediaWrap}>
                <div className={styles.footerLogo}>
                    <Link to="/" className={styles.socialLogo}>
                        Shy Jack<i class="fas fa-car-crash"></i>
                    </Link>
                </div>
                <small className={styles.websiteRights}>John Nelson-Alden © {new Date().getFullYear()}</small>
                <div className={styles.socialIcons}>
                    <a className={styles.socialIconLink} href="https://www.youtube.com/channel/UCICVa9m2nDCVNuIIUzW9nmg" target="_blank" rel="noreferrer">
                        <i className="fab fa-youtube" />
                    </a>
                    <a className={styles.socialIconLink} href="https://twitter.com/_JohnnyMohawk" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter" />
                    </a>
                    <a className={styles.socialIconLink} href="https://www.linkedin.com/in/john-nelson-alden/" target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin" />
                    </a>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Footer
