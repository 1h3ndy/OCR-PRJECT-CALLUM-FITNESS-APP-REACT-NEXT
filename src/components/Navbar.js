
import React from 'react';

import './Navbar.css';
import Link from "next/link";  //https://nextjs.org/docs/pages/api-reference/components/link

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">OCR-FITNESS</div>
            <img src="/fitnesslogo.png" alt="App-Logo" className="navbar-logo"/>
            <ul className="navbar-links">
                <li>
                    <Link href="/login" className="nav-link">Login</Link>
                </li>
                <li>
                    <Link href="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
