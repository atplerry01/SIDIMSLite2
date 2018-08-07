import React from 'react';
import { NavLink, Link } from "react-router-dom";

const LoginForm = ({ loading }) => {
    const loginCard = {
        margin: '40px 0 0 0'
      };
      
    return (
        <div className="row">
                <div className="col-lg-4">

                    <header>
                        <h2><span className="icon-pagesx"></span>Account Login</h2>
                    </header>

                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>


                            <span className="clearfix" />
                        </form>

                    </div>

                </div>


                <div className="col-lg-8">
                    <div className="sidebar">


                    </div>
                </div>
            </div>
    );

};

export default LoginForm
