import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)
    return (
        <>
            <nav className="navbar">
                <div className="navbar-conatainer">
                    <Link to="/" className="navbar-logo">
                        Shy Jack <i className="fab fa-typo3" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                                Map
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/data' className='nav-links' onClick={closeMobileMenu}>
                                Data
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/scanner' className='nav-links' onClick={closeMobileMenu}>
                                Scanner
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/forum' className='nav-links' onClick={closeMobileMenu}>
                                Forum
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
