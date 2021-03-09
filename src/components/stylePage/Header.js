import React from 'react'
import './Header.css'



//Downloaded library for icons here:https://fontawesome.com/how-to-use/on-the-web/using-with/react
//Then import them like this:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'



export default function PageStructure () {



    return (
        <div className="PasgeStructure">
            <header>
            <div className="container-in-header">
                <div className="navbar-container">
                    <div className="icon-container">
                    <FontAwesomeIcon icon={ faDragon } id="logo-icon"/>
                    </div>
                    <nav className="navbar-right-header">
                        <ul className="menu-items">
                            <li className="menu-item">Market Tracker</li>  
                            <li className="menu-item">Market News</li>
                            <li className="menu-item">Resources</li>
                            <li className="menu-item">Contact Us</li>
                        </ul>
                    </nav>
                </div>
            </div>
            </header>
        </div>
    )
}