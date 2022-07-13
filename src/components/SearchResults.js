import React from 'react'
import styles from '../styles/SearchResultsComp.module.css'

export default function SearchResults({pageTitle, totalCrimeCount, searchSpan, searchYear, fullMonths, months, searchMonth, searchDay}) {

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
        <div className={styles.mainTitleResults}>
            {pageTitle === "Select" ? <h2 className={styles.searchSelect}>{TitleWords()}&nbsp;</h2> : <h2 className={styles.searchResults}>Your Results:&nbsp;</h2>}
            {pageTitle !== "Select" ? <div className={styles.cjNumberWrapper}>
                <h2 className={styles.carjackNumbers} id={styles.cjNumId}>{totalCrimeCount().toLocaleString("en-US")}&nbsp;</h2>
                <h2 className={styles.searchParams}>{`Gun Crimes
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






// import React from 'react'
// import './pages/Map.css'
// import styles from '../styles/MapResultsComp.module.css'

// export default function SearchResults({pageTitle, totalCrimeCount, searchSpan, searchYear, fullMonths, months, searchMonth, searchDay}) {

//     const userPageResponse = () => {
//         if(window.innerWidth >= 1000){
//             window.location.reload()
//         }else if(window.innerWidth <= 1000){
//             window.location.reload()
//         }
//     }

//     const TitleWords = () => {
//         let Title;
//         if(window.innerWidth > 960) Title = "Select below for gun crime stats:"
//         else Title = "Set search below for gun crime stats:"
//         return Title 
//     }

//     window.addEventListener('resize', userPageResponse);

//     return (
//         <div className="main-title-results">
//             {pageTitle === "Select" ? <h2 className="search-select">{TitleWords()}&nbsp;</h2> : <h2 className="search-results">Your Results:&nbsp;</h2>}
//             {pageTitle !== "Select" ? <div className="cj-number-wrapper">
//                 <h2 className="carjack-numbers heart" id="cj-num-id">{totalCrimeCount().toLocaleString("en-US")}&nbsp;</h2>
//                 <h2 className="search-params">{`Gun Crimes
//                     ${searchSpan === "month" ? "in " + fullMonths[months.indexOf(searchMonth)] : ""}
//                     ${searchSpan === "week" ? "on the week ending "+ fullMonths[months.indexOf(searchMonth)] + " " + searchDay : ""}
//                     ${searchSpan === "most recent" ? "on " + fullMonths[months.indexOf(searchMonth)] + " " +  searchDay : ""}
//                     ${searchSpan === "year" ? "in " : ""}
//                     ${searchYear}`}
//                 </h2>
//             </div> : <></>}
//         </div>
//     )
// }
