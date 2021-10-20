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
                            src="images/sun-times-10-8.png"
                            text="Cook County carjackings on pace to be the worst in 2 decades: Camry is No. 1, most victims are men, Sunday’s the worst day"
                            label="Sun-Times 10/8/21"
                            path="/"
                        />
                        <CardItem 
                            src="images/nbc-10-4.png"
                            text="3 Carjackings Reported Within Hours of Each Other, 2 at Same Time Just Blocks Apart: CPD"
                            label="NBC 10/4/21"
                            path="/"
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem 
                            src="images/sun-times-10-4.png"
                            text="Three armed carjackings within hours on North and Northwest sides, one person critically wounded"
                            label="Sun-Times 10/4/21"
                            path="/"
                        />
                        <CardItem 
                            src="images/bump-run.png"
                            text="19 Carjackings, Including 5 Bump-And-Run Incidents, Reported In Chicago In Recent Days; Police Urge Caution"
                            label="CBS 8/24/21"
                            path="/"
                        />
                        <CardItem 
                            src="images/carjacking.png"
                            text="As Chicago carjackings soar, police arresting more kids"
                            label="WGN 7/8/21"
                            path="/"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards