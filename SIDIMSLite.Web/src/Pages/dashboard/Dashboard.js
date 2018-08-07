import React,  { Component } from 'react';
//import { connect } from "react-redux";

class Dashboard extends Component {



    componentDidMount() {
        
    }

    render() {
       
        return (
            <div className="row">
                <div className="col-lg-8">

                    <header>
                        <h2>
                            <span className="icon-pages"></span>Explore Topics</h2>
                        <p>We did our best to cover all topics related to this product. Each section have number which represent
                            number of topic in each category.</p>
                    </header>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">19</span>Guarantee Trust Bank</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a href="/tracker/21"> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">7</span>Fidelity Bank</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">5</span>Access Bank Plc</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">17</span>Settings & Configuration</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">19</span>Introduction</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a href="single.html"> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a href="single.html"> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="topics-list">
                                <h3>
                                    <a>
                                        <span className="badge">7</span>Intallation & Activation</a>
                                </h3>
                                <ul>
                                    <li>
                                        <a> How to use this documentation? </a>
                                    </li>
                                    <li>
                                        <a> How to find topics? </a>
                                    </li>
                                    <li>
                                        <a> What is included and why? </a>
                                    </li>
                                    <li>
                                        <a> Basic knowledge requirments. </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
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


                            <a className="btn btn-success">Support Forum</a>
                        </div>

                        <div className="pt-50">
                            <div className="widget fix widget_categories">
                                <span className="icon icon-folder"></span>
                                <h4>Popular Knowledgebase Topics</h4>
                                <ul>
                                    <li>
                                        <a> Installation & Activation </a>
                                    </li>
                                    <li>
                                        <a> Premium Members Features </a>
                                    </li>
                                    <li>
                                        <a> API Usage & Guide lines </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
                                    </li>
                                    <li>
                                        <a> Installation & Activation </a>
                                    </li>
                                    <li>
                                        <a> Premium Members Features </a>
                                    </li>
                                    <li>
                                        <a> API Usage & Guide lines </a>
                                    </li>
                                    <li>
                                        <a> Getting Started & What is next. </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard; 