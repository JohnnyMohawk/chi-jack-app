// import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
// import { Link } from 'react-router-dom';
// import './NavBar.css';

// function Navbar() {
//     const [click, setClick] = useState(false);
//     const [button, setButton] = useState(true);

//     const handleClick = () => setClick(!click);
//     const closeMobileMenu = () => setClick(false);

//     const showButton = () => {
//         if (window.innerWidth <= 960) {
//         setButton(false);
//         } else {
//         setButton(true);
//         }
//     };

//     useEffect(() => {
//         showButton();
//     }, []);

//     window.addEventListener('resize', showButton);

//     return (
//         <>
//         <nav className='navbar'>
//             <div className='navbar-container'>
//             <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//                 Shy Jack
//                 <i class="fas fa-car-crash"></i>
//             </Link>
//             <div className='menu-icon' onClick={handleClick}>
//                 <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//             </div>
//             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                 <li className='nav-item'>
//                 <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
//                     Map
//                 </Link>
//                 </li>
//                 <li className='nav-item'>
//                 <Link
//                     to='/graph'
//                     className='nav-links'
//                     onClick={closeMobileMenu}
//                 >
//                     Graph
//                 </Link>
//                 </li>
//                 <li className='nav-item'>
//                 <Link
//                     to='/scanner'
//                     className='nav-links'
//                     onClick={closeMobileMenu}
//                 >
//                     Scanner
//                 </Link>
//                 </li>

//                 <li>
//                 <Link
//                     to='/sign-up'
//                     className='nav-links-mobile'
//                     onClick={closeMobileMenu}
//                 >
//                     Sign Up
//                 </Link>
//                 </li>
//             </ul>
//             {button && 
//                 <div>
//                     {user ? <Button buttonStyle='btn--outline' to="sign-up">SIGN UP</Button> : <Button buttonStyle='btn--outline' to="sign-up">SIGN UP</Button>}
//                 </div>
//             }
//             </div>
//         </nav>
//         </>
//     );
// }

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar({ user, handleLogout }) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
        setButton(false);
        } else {
        setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Shy Jack
                <i class="fas fa-car-crash"></i>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            {user ? (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-user'>Welcome, {user.name}</li>
                <li className='nav-item'>
                <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                    Map
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/graph'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Graph
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/scanner'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Scanner
                </Link>
                </li>
                {/* <li className='nav-item'>
                <Link
                    to='/log-in'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Log In
                </Link>
                </li> */}
                <li>
                <Link
                    to='/sign-up'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                >
                    Log Out
                </Link>
                </li>
            </ul>
            ):(
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                    Map
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/graph'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Graph
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/scanner'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Scanner
                </Link>
                </li>
                <li className='nav-item'>
                <Link
                    to='/log-in'
                    className='nav-links'
                    onClick={closeMobileMenu}
                >
                    Log In
                </Link>
                </li>
                {/* <li>
                <Link
                    to='/sign-up'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                >
                    Sign Up
                </Link>
                </li> */}
            </ul>
            )}
            {button && 
                <div>
                {user ? <Button buttonStyle='btn--outline' onClick={handleLogout}>LOG OUT</Button> : <Button buttonStyle='btn--outline' to="sign-up">SIGN UP</Button>}
                </div>
                }
            </div>
        </nav>
        </>
    );
}

export default Navbar;