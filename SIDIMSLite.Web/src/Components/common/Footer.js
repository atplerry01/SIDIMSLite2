import React from 'react'
import { NavLink } from "react-router-dom";
import Logo from '../../assets/images/logo.png'

const Footer = () => (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3">
            <NavLink to="/#" className="brand">
              <img src={Logo} alt="Knowledge" />
              <span className="circle"></span>
            </NavLink>
          </div>
          <div className="col-lg-7 col-md-5 col-sm-9">
            <ul className="footer-links">
              <li>
                <NavLink to="/#">Features</NavLink>
              </li>
              <li>
                <NavLink to="/#">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/#">Community</NavLink>
              </li>
              <li>
                <NavLink to="/login.html">Login</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="copyright">
              <p>© 2016 knowledge Copyrights</p>
            </div>
          </div>
        </div>
      </div>
  </footer>
)

export default Footer
