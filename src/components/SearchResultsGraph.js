import React from 'react'
import styles from '../styles/SearchResultsComp.module.css'

export default function SearchResults({pageTitle, totalCrimeCount, searchSpan, searchYear}) {

    const userPageResponse = () => {
        if(window.innerWidth >= 960){
            window.location.reload()
        }else if(window.innerWidth <= 960){
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
        <div className={styles.graphTitleResults}>
            {pageTitle === "Select" ? <h2 className={styles.searchSelect}>{TitleWords()}&nbsp;</h2> : <h2 className={styles.searchResults}>Your Results:&nbsp;</h2>}
            {pageTitle !== "Select" ? <div className={styles.cjNumberHeader}>
                <h2 className={styles.gunCrimeNumbers} id={styles.gcNumId}>&nbsp;{totalCrimeCount().length.toLocaleString("en-US")}</h2>
                <div className={styles.cjNumberWrapper}>
                    <h2 className={styles.searchParams2}>&nbsp;{`Total Gun Crimes
                        ${searchSpan === "month" ? "in " + searchYear : ""}
                        ${searchSpan === "year" ? "Since 2000" : ""}`}
                    </h2>
                </div>
            </div> : <></>}
        </div>
    )
}