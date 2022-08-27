import React from "react";
import { Link } from 'react-router-dom';

const Login=()=>{
    return(
        <div className="login">

            <div className="row">
                <div className="col-md-4">

                </div>

                <div className="col-md-5">
                <div className="login-form">
                <div className="card">
                    <div className="card-header">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Enter Username" className="txtusername" title="Enter Username" required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <input type="password" placeholder="Enter Password" className="txtpwd" title="Enter Password" required/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <center>
                                <button type="button" className="btn btn-success">Login</button>
                            </center>
                        </div>

                        <div className="mt-3 mb-0">
                            <p>If you don't have an account? <Link to="/signup">SignUp Here....</Link></p>
                        </div>
                    </div>
                </div>
            </div>
                </div>

                <div className="col-md-3">

                </div>
            </div>

        </div>
    );
}

export default Login;