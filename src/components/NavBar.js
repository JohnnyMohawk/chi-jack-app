import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import LoginModal from './LoginModal';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginForm from '../components/LoginForm/LoginForm';
import { FaTimesCircle } from 'react-icons/fa'
import styles from '../styles/LegendComp.module.css'

import { Link, withRouter } from 'react-router-dom';
import '../styles/NavBar.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Navbar({ user, handleLogout, handleSignupOrLogin }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
                <li className='nav-item'>
                    <Link
                        to='/my-page'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        {user.name}'s Page
                    </Link>
                </li>
                <li>
                    <Link
                        to='/'
                        className='nav-links-mobile'
                        onClick={() => { handleLogout(); closeMobileMenu();}}
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
                    <p
                        className='nav-links'
                        onClick={handleOpen}
                    >
                        Log In
                    </p>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <Typography className={styles.legendHeader}  variant="h6" component="h2" lineHeight={1}>
                            Gun Crimes Icon Legend
                        </Typography>
                        <Typography id="modal-modal-subtitle" component="h2" lineHeight={1}>
                            Lists all Illinois Uniform Crime Reporting (IUCR) codes for each map icon.
                        </Typography>
                        <LoginForm handleSignupOrLogin={handleSignupOrLogin} handleClose={handleClose} closeMobileMenu={closeMobileMenu} />
                        <div className={styles.closeButtonLegendWrap}>
                            <button className={styles.closeButtonLegend} onClick={handleClose}><FaTimesCircle /></button>
                        </div>
                        </Box>
                    </Modal>
                    {/* <Link
                        to='/log-in'
                        className='nav-links'
                        onClick={closeMobileMenu}
                    >
                        Log In
                    </Link> */}
                    {/* <LoginModal className='nav-item' handleSignupOrLogin={handleSignupOrLogin} closeMobileMenu={closeMobileMenu} /> */}
                </li>
                <li>
                    <Link
                        to='/sign-up'
                        className='nav-links-mobile'
                        onClick={closeMobileMenu}
                    >
                        Sign Up
                    </Link>
                </li>
            </ul>
            )}
            {button && 
                <div>
                    {user ? <Button buttonStyle='btn--outline' onClick={handleLogout} to="/">LOG OUT</Button> : <Button buttonStyle='btn--outline' to="sign-up">SIGN UP</Button>}
                </div>
            }
            </div>
        </nav>
        </>
    );
}

export default withRouter(Navbar);






// import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
// import { Link, withRouter } from 'react-router-dom';
// import '../styles/NavBar.css';

// function Navbar({ user, handleLogout }) {
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
//             {user ? (
//             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                 <li className='nav-user'>Welcome, {user.name}</li>
//                 <li className='nav-item'>
//                     <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
//                         Map
//                     </Link>
//                 </li>
//                 <li className='nav-item'>
//                     <Link
//                         to='/graph'
//                         className='nav-links'
//                         onClick={closeMobileMenu}
//                     >
//                         Graph
//                     </Link>
//                 </li>
//                 <li className='nav-item'>
//                     <Link
//                         to='/scanner'
//                         className='nav-links'
//                         onClick={closeMobileMenu}
//                     >
//                         Scanner
//                     </Link>
//                 </li>
//                 <li className='nav-item'>
//                     <Link
//                         to='/my-page'
//                         className='nav-links'
//                         onClick={closeMobileMenu}
//                     >
//                         {user.name}'s Page
//                     </Link>
//                 </li>
//                 <li>
//                     <Link
//                         to='/'
//                         className='nav-links-mobile'
//                         onClick={() => { handleLogout(); closeMobileMenu();}}
//                     >
//                         Log Out
//                     </Link>
//                 </li>
//             </ul>
//             ):(
//                 <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//                 <li className='nav-item'>
//                     <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
//                         Map
//                     </Link>
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
//                     <Link
//                         to='/scanner'
//                         className='nav-links'
//                         onClick={closeMobileMenu}
//                     >
//                         Scanner
//                     </Link>
//                 </li>
//                 <li className='nav-item'>
//                     <Link
//                         to='/log-in'
//                         className='nav-links'
//                         onClick={closeMobileMenu}
//                     >
//                         Log In
//                     </Link>
//                 </li>
//                 <li>
//                     <Link
//                         to='/sign-up'
//                         className='nav-links-mobile'
//                         onClick={closeMobileMenu}
//                     >
//                         Sign Up
//                     </Link>
//                 </li>
//             </ul>
//             )}
//             {button && 
//                 <div>
//                     {user ? <Button buttonStyle='btn--outline' onClick={handleLogout} to="/">LOG OUT</Button> : <Button buttonStyle='btn--outline' to="sign-up">SIGN UP</Button>}
//                 </div>
//             }
//             </div>
//         </nav>
//         </>
//     );
// }

// export default withRouter(Navbar);