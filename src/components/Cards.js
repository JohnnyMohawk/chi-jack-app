import React from "react"
import CardItem from "./CardItem"
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Chicago Crime in the News</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS"
                            path="/"
                        />
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS"
                            path="/"
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS"
                            path="/"
                        />
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS"
                            path="/"
                        />
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS"
                            path="/"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards