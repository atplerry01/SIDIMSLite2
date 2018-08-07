import React from 'react'
import { NavLink } from "react-router-dom";
import Header from "../../Components/common/Header";

const About = () => (

  <div>
  

  <section className="topics">
  <div className="container">
    <div className="row">
      <div className="col-lg-8">

        <header>
          <h2>
            <span className="icon-pages"></span>Explore Topics</h2>
          <p>We did our best to cover all topics related to this product. Each section have number which represent number
            of topic in each category.</p>
        </header>

        <div className="row">
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">19</span>Introduction</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/single.html"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">7</span>Intallation & Activation</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/#"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">5</span>Import & Export</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/#"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">17</span>Settings & Configuration</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/#"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">19</span>Introduction</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/single.html"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/single.html"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="topics-list">
              <h3>
                <NavLink to="/#">
                  <span className="badge">7</span>Intallation & Activation</NavLink>
              </h3>
              <ul>
                <li>
                  <NavLink to="/#"> How to use this documentation? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> How to find topics? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> What is included and why? </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Basic knowledge requirments. </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="sidebar">
          <div className="widget widget-support-forum">
            <span className="icon icon-forum"></span>
            <h4>Looking for help? Join Community</h4>

            <p>Couldn’t find what your are looking for ? Why not join out support forums and let us help you.
            </p>


            <NavLink to="/#" className="btn btn-success">Support Forum</NavLink>
          </div>

          <div className="pt-50">
            <div className="widget fix widget_categories">
              <span className="icon icon-folder"></span>
              <h4>Popular Knowledgebase Topics</h4>
              <ul>
                <li>
                  <NavLink to="/#"> Installation & Activation </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Premium Members Features </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> API Usage & Guide lines </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Installation & Activation </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Premium Members Features </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> API Usage & Guide lines </NavLink>
                </li>
                <li>
                  <NavLink to="/#"> Getting Started & What is next. </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
  
)

export default About
