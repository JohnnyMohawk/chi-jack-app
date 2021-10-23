import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import '../App.css'
import './Footer.css'


function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                Join Shy Jack's newsletter to receive important updates on issues involving Chicago crime and policing.
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input type="email" name="email" placeholder="Your Email" className="footer-input" />
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Jack</h2>
                        <Link to="/sign-up" className="ft-link-class">Why Shy Jack</Link>
                        <Link to="/sign-up" className="ft-link-class">How Shy Jack Knows</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Get Involved</h2>
                        <Link to="/sign-up">What Can I Do?</Link>
                        <Link to="/sign-up">Save Our City</Link>
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
// function Footer() {
//     return (
//         <div className="footer-container">
//             <section className="footer-subscription">
//                 <p className="footer-subscription-heading">
//                     Join Shy Jack's newsletter to receive important updates on issues involving Chicago crime and policing.
//                 </p>
//                 <p className="footer-subscription-text">
//                     You can unsubscribe at any time.
//                 </p>
//                 <div className="input-areas">
//                     <form>
//                         <input type="email" name="email" placeHolder="Your Email" className="footer-input" />
//                         <Button buttonStyle="btn--outline">Subscribe</Button>
//                     </form>
//                 </div>
//             </section>
//             <div className="footer-links">
//                 <div className="footer-link-wrapper">
//                     <div className="footer-link-items">
//                         <h2>About Shy Jack</h2>
//                         <Link to="/sign-up">Why Shy Jack</Link>
//                         <Link to="/sign-up">How Shy Jack Knows</Link>
//                         <Link to="/sign-up">What Can I Do?</Link>
//                         <Link to="/sign-up">Save Our City</Link>
//                         <Link to="/sign-up">About the Developer</Link>
//                     </div>
//                     <div className="footer-link-items">
//                         <h2>About Shy Jack</h2>
//                         <Link to="/sign-up">Why Shy Jack</Link>
//                         <Link to="/sign-up">How Shy Jack Knows</Link>
//                         <Link to="/sign-up">What Can I Do?</Link>
//                         <Link to="/sign-up">Save Our City</Link>
//                         <Link to="/sign-up">About the Developer</Link>
//                     </div>
//                 </div>
//                 <div className="footer-link-wrapper">
//                     <div className="footer-link-items">
//                         <h2>About Shy Jack</h2>
//                         <Link to="/sign-up">Why Shy Jack</Link>
//                         <Link to="/sign-up">How Shy Jack Knows</Link>
//                         <Link to="/sign-up">What Can I Do?</Link>
//                         <Link to="/sign-up">Save Our City</Link>
//                         <Link to="/sign-up">About the Developer</Link>
//                     </div>
//                     <div className="footer-link-items">
//                         <h2>About Shy Jack</h2>
//                         <Link to="/sign-up">Why Shy Jack</Link>
//                         <Link to="/sign-up">How Shy Jack Knows</Link>
//                         <Link to="/sign-up">What Can I Do?</Link>
//                         <Link to="/sign-up">Save Our City</Link>
//                         <Link to="/sign-up">About the Developer</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Footer