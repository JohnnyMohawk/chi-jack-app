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
                    <h3>Be On The Look Out For:</h3>
                    <p>
                        Chicago police warned residents to be aware of anywhere a driver slows down or stops as it could be a sign 
                        of an attempted carjacking. Other common areas of carjackings, according to officials, are in residential 
                        driveways, parking lots and garages, gas stations, ATMs and intersections with stop lights.
                    </p>
                    <p>
                        Some carjackers will bump into the rear end of another car so the driver pulls over and leaves the vehicle to 
                        asses the damages, which gives an opportunity for someone to easily steal the car, police said.
                    </p>
                    <p>
                        Officials also warned to not stop for stranded vehicles on the side of the road as it could be someone waiting to 
                        carjack another vehicle. Instead, police said to call 9-1-1 and note the location of the vehicle.
                    </p>
                </div>
            </div>
        </>
    )

}


export default WhatToDo