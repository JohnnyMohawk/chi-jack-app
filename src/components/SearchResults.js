import React from 'react'
import './pages/Map.css'

export default function SearchResults({pageTitle, totalCrimeCount, searchSpan, searchYear, fullMonths, months, searchMonth, searchDay}) {
    return (
        <div className="main-title-results">
            {pageTitle === "Select" ? <h2 className="search-select">Select below for gun crime stats:&nbsp;</h2> : <h2 className="search-results">Your Results:&nbsp;</h2>}
            {pageTitle !== "Select" ? <div className="cj-number-wrapper">
                <h2 className="carjack-numbers heart" id="cj-num-id">{totalCrimeCount()}&nbsp;</h2>
                <h2 className="search-params">{`Gun Crimes
                    ${searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""}
                    ${searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
                    ${searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""}
                    ${searchSpan === "year" ? "in " : ""}
                    ${searchYear}`}
                </h2>
            </div> : <></>}
        </div>
    )
}
