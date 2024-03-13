import React from 'react';
import Logo from "../assets/logo.png";
import {Link, useLocation } from 'react-router-dom';



const Navbar = () => { 


    const path = useLocation().pathname;
    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "5em"}} >
            <div style={{width: "20%"}}>
                <img width={"100%"} height={"auto"} src={Logo} className="logo" alt="Logo" /> 
            </div>
            <ul style={{display: "flex", justifyContent: "space-between", width: "25%"}}>

                <li style={{color: location.pathname === '/about' ? "#006eff" : undefined}}>
                    <Link to="/about">Om siden</Link>
                </li>
                <li style={{color: location.pathname === '/' ? "#006eff" : undefined}}>
                    <Link to="/">Uddannelser</Link>
                </li>
                <li style={{color: location.pathname === '/methods' ? "#006eff" : undefined}}>
                    <Link to="/methods">Metoder</Link>
                </li>
            </ul>
            <div style={{width: "20%", textAlign: "right"}}>
                <button>Læs mere</button>
                            </div>
        </div>
    )
}

export default Navbar;