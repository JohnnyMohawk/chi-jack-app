import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import './HeroSection.css'

function HeroSection() {

    const userPageResponse = () => {
        if(window.innerWidth >= 960){
            window.location.reload()
        }else if(window.innerWidth <= 960){
            window.location.reload()
        }
    }

    window.addEventListener('resize', userPageResponse);

    return window.innerWidth >= 500 ? (
        <div className="hero-container">
            <video src="/videos/chicago.mp4" autoPlay loop muted />
            <Link to='/map' className='hero-logo'>
                Shy Jack
                <i class="fas fa-car-crash"></i>
            </Link>
            <h2>City of Chicago Carjacking Data Visualizer</h2>
            <p className="slogan">Just Data <i class="fas fa-database"></i> No Spin</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
                <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
            </div>
        </div>
    ) : (
        <div className="hero-container">
            <img src="/images/skyline-still-mobile1.png" className="mobile-background" />
            <Link to='/map' className='hero-logo'>
                Shy Jack
                <i class="fas fa-car-crash"></i>
            </Link>
            <h2>City of Chicago Carjacking Data Visualizer</h2>
            <p className="slogan">Just Data <i class="fas fa-database"></i> No Spin</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
                <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
            </div>
        </div>
    )
}

export default HeroSection
