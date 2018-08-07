import React from 'react';
//import { NavLink } from "react-router-dom";

const IssueDetail = ({ loading }) => {

    return (
        <div>
            <div className="col-lg-8">
                <article className="post">
                    <h1>Getting Started With API </h1>

                    <ul className="meta">
                        <li>
                            <span>Created :</span> Feb, 04, 2016</li>
                        <li>
                            <span>Last Updated:</span> April, 15, 2016</li>
                    </ul>




                    <div className="alert alert-info" role="alert">
                        <span className="icon-info"></span>
                        <p>
                            This documentation is always evolving. If you've not been here for a while, perhaps check out the This documentation is always
                            evolving.
                        </p>
                    </div>

                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by
                        injected humour, or randomised words which don’t look even slightly believable.
                    </p>
                    <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle
                        of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                    </p>
                    <img className="aligncenter" src="assets/images/connection.png" alt="" />

                    <h2>Auth Services & Requirments</h2>
                    <p>
                        If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle
                        of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                    </p>
                    <blockquote>

                        echo "Hello World"; echo "\n";

                    </blockquote>
                    <h2>Final Step</h2>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by
                        injected humour, or randomised words which don’t look even slightly believable.
                    </p>
                </article>
                <div className="feedback">
                    <h3>Was this article helpful to you?</h3>
                    <a className="btn btn-default">Yes</a>
                    <a className="btn btn-default">No</a>
                    <form>
                        <input type="text" placeholder="How else could we improve it ?" />
                        <input type="submit" className="btn btn-success" value="Submit Feedback" />
                    </form>

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
                        <div className="widget widget_categories">
                            <span className="icon icon-folder"></span>
                            <h4>Knowledgebase Topics Categories</h4>
                            <ul>
                                <li>
                                    <a> Introduction </a>
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
};

export default IssueDetail
