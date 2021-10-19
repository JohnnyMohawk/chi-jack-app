import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="/videos/chicago.mp4" autoPlay loop muted />
            <h1>Shy Jack</h1>
            <h2>City of Chicago Crime Data Visualizer</h2>
            <p>Explore the data for yourself!</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large">Map Data</Button>
                <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large">Graph Data</Button>
            </div>
        </div>
    )
}

export default HeroSection
