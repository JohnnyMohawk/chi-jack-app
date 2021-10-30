import React, {useEffect} from 'react'
import '../pages/JackKnows.css'


function WhatToDo () {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <div className="how-container">
                <h1>What Can I Do?</h1>
                <div className="how-text">
                    <div>
                        <h3>In order to prevent a carjacking, here's what police say to do:</h3>
                        <ul>
                            <li>
                                Do not wait in your car in the driveway of your home
                            </li>
                            <li>
                                Park in well-lit, visible areas
                            </li>
                            <li>
                                Keep windows up and doors locked
                            </li>
                            <li>
                                Equip your vehicle with anti-theft or GPS for tracking
                            </li>
                            <li>
                                Allow yourself room in traffic to move around other cars and avoid getting "boxed in"
                            </li>
                            <li>
                                Keep your cell phone in your pocket, rather than in the car
                            </li>
                        </ul>
                    </div>
                    <div>
                    <h3>If you find yourself a victim of a carjacking, here's what police say to remember:</h3>
                        <ul>
                            <li>
                                Give up your car and leave the scene
                            </li>
                            <li>
                                Avoid verbal and physical altercations
                            </li>
                            <li>
                                Take note of the carjacker's description and their vehicle's description
                            </li>
                            <li>
                                If there's a child in the car, tell the carjacker "my child is in the car"
                            </li>
                            <li>
                                Call 9-1-1 immediately
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}


export default WhatToDo