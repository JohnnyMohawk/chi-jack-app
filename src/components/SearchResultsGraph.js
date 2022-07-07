import React from 'react'
import './pages/GunGraph.css'

export default function SearchResults({pageTitle, totalCrimeCount, searchSpan, searchYear}) {

    const userPageResponse = () => {
        if(window.innerWidth >= 1000){
            window.location.reload()
        }else if(window.innerWidth <= 1000){
            window.location.reload()
        }
    }

    const TitleWords = () => {
        let Title;
        if(window.innerWidth > 960) Title = "Select below for gun crime stats:"
        else Title = "Set search below for gun crime stats:"
        return Title 
    }

    window.addEventListener('resize', userPageResponse);

    return (
        <div className="main-title-results">
            {pageTitle === "Select" ? <h2 className="search-select">{TitleWords()}&nbsp;</h2> : <h2 className="search-results">Your Results:&nbsp;</h2>}
            {pageTitle !== "Select" ? <div className="cj-number-header">
                <h2 className="carjack-numbers heart" id="cj-num-id">{totalCrimeCount().length}</h2>
                <div className="cj-number-wrapper">
                    <h2 className="search-params">{`Total Gun Crimes
                        ${searchSpan === "month" ? "in " + searchYear : ""}
                        ${searchSpan === "year" ? "Since " : ""}`}
                    </h2>
                </div>
            </div> : <></>}
        </div>
    )
}
