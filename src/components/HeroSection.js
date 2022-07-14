import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
import AboutDataModal from './AboutDataModal'
// import './HeroSection.css'
import styles from '../styles/HeroComp.module.css'

function HeroSection() {

    const userPageResponse = () => {
        if(window.innerWidth >= 960){
            window.location.reload()
        }else if(window.innerWidth <= 960){
            window.location.reload()
        }
    }

    window.addEventListener('resize', userPageResponse);

    return window.innerWidth >= 500 ? (
        <div className={styles.heroContainer}>
            <video className={styles.video} src="/videos/chicago.mp4" autoPlay loop muted />
            <Link to='/map' className={styles.heroLogo}>
                Shy Jack
                <i class="fas fa-car-crash"></i>
            </Link>
            <h2>City of Chicago Gun Crime Data Visualizer</h2>
            <p className={styles.slogan}>Just Data <i class="fas fa-database"></i> No Spin</p>
            <div className={styles.heroBtns}>
                <AboutDataModal />
                <Button className={styles.btns} buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
                <Button className={styles.btns} buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
            </div>
        </div>
    ) : (
        <div className={styles.heroContainer}>
            <img src="/images/skyline-still-mobile-final.jpg" className={styles.mobileBackground} alt='chicago skyline' />
            <Link to='/map' className={styles.heroLogo}>
                Shy Jack
                <i class="fas fa-car-crash"></i>
            </Link>
            <h2>City of Chicago Gun Crime Data Visualizer</h2>
            <p className={styles.slogan}>Just Data <i class="fas fa-database"></i> No Spin</p>
            <div className={styles.heroBtns}>
                <AboutDataModal />
                <Button className={styles.btns} buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
                <Button className={styles.btns} buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
            </div>
        </div>
    )
}

export default HeroSection







// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Button } from './Button'
// import AboutDataModal from './AboutDataModal'
// import './HeroSection.css'

// function HeroSection() {

//     const userPageResponse = () => {
//         if(window.innerWidth >= 960){
//             window.location.reload()
//         }else if(window.innerWidth <= 960){
//             window.location.reload()
//         }
//     }

//     window.addEventListener('resize', userPageResponse);

//     return window.innerWidth >= 500 ? (
//         <div className="hero-container">
//             <video className='video' src="/videos/chicago.mp4" autoPlay loop muted />
//             <Link to='/map' className='hero-logo'>
//                 Shy Jack
//                 <i class="fas fa-car-crash"></i>
//             </Link>
//             <h2>City of Chicago Gun Crime Data Visualizer</h2>
//             <p className="slogan">Just Data <i class="fas fa-database"></i> No Spin</p>
//             <div className="hero-btns">
//                 <AboutDataModal />
//                 <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
//                 <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
//             </div>
//         </div>
//     ) : (
//         <div className="hero-container">
//             <img src="/images/skyline-still-mobile-final.jpg" className="mobile-background" alt='chicago skyline' />
//             <Link to='/map' className='hero-logo'>
//                 Shy Jack
//                 <i class="fas fa-car-crash"></i>
//             </Link>
//             <h2>City of Chicago Gun Crime Data Visualizer</h2>
//             <p className="slogan">Just Data <i class="fas fa-database"></i> No Spin</p>
//             <div className="hero-btns">
//                 <AboutDataModal />
//                 <Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large" to="/map">Map Data</Button>
//                 <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large" to="/graph">Graph Data</Button>
//             </div>
//         </div>
//     )
// }

// export default HeroSection
