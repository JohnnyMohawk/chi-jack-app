import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-conatainer">
                    <Link to="/" className="navbar-logo">
                        Shy Jack <i className="fab fa-typo3" />
                    </Link>
                </div>
            </nav>
        </>
    )
}
