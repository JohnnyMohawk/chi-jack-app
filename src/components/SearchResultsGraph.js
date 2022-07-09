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
        <div className="graph-title-results">
            {pageTitle === "Select" ? <h2 className="search-select">{TitleWords()}&nbsp;</h2> : <h2 className="search-results">Your Results:&nbsp;</h2>}
            {pageTitle !== "Select" ? <div className="cj-number-header">
                <h2 className="graph-numbers heart" id="graph-total">&nbsp;{totalCrimeCount().length.toLocaleString("en-US")}</h2>
                <div className="cj-number-wrapper">
                    <h2 className="search-params">&nbsp;{`Total Gun Crimes
                        ${searchSpan === "month" ? "in " + searchYear : ""}
                        ${searchSpan === "year" ? "Since 2000" : ""}`}
                    </h2>
                </div>
            </div> : <></>}
        </div>
    )
}
