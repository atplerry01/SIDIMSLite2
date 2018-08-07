import React from 'react'
import { NavLink } from "react-router-dom";
import Logo from '../../assets/images/logo.png'

const HomeHeader = () => (
    
    <header id="hero" className="hero overlay">
        <nav className="navbar">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="fa fa-bars"></span>
                    </button>
                    <NavLink to="/index.html" className="brand">
                        <img src={Logo} alt="Knowledge" />
                    </NavLink>
                </div>
                <div className="navbar-collapse collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/inventory">
                                Inventory
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/mis">
                                Client
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="register.html" className="btn btn-success nav-btn">Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="masthead text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <h1>SIDIMS Client</h1>
                        <p className="lead text-muted">SecureID Online Client Inventory Management System.</p>
                       
                        <NavLink to="#" className="btn btn-hero">
                            <span className="icon-git"></span> SIDIMS Repository
                            <span className="icon-right"></span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </header>
)

export default HomeHeader
