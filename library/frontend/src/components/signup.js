import React from "react";
import { Link } from 'react-router-dom';

const SignUp=()=>{
    return(
        <div className="signup">

            <div className="row">
                <div className="col-md-3">

                </div>

                <div className="col-md-8">
                <div className="signup-form">
                <div className="card">
                    <div className="card-header">
                        <h3>Registration</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Firstname" className="txtfname" title="Enter Firstname" required/>
                            </div>

                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Lastname" className="txtlname" title="Enter Lastname" required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <textarea type="textarea" cols={101} rows={4} placeholder="Enter Address" className="txtaddress" title="Enter Address" required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <input type="email" placeholder="Enter Email" className="txtemail" title="Enter Email" required/>
                            </div>

                            <div className="col-md-4">
                                <input type="number" placeholder="Enter Contactno" className="txtcontactno" title="Enter Contactno" required/>
                            </div>

                            <div className="col-md-4">
                                <input type="date" className="txtdob" required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Alternate Name" className="txtalternatename" title="Enter Alternate Name"/>
                            </div>

                            <div className="col-md-6">
                                <input type="number" placeholder="Enter Alternate Contactno" className="txtalternatecontactno" title="Enter Alternate Contactno"/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Username" className="txtusername" title="Enter Username" required/>
                            </div>

                            <div className="col-md-6">
                                <input type="password" placeholder="Enter Password" className="txtpwd" title="Enter Password" required/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <center>
                                <button type="button" className="btn btn-primary">Sign Up</button>
                            </center>
                        </div>

                        <div>
                            <p>If you have an account? <Link to="/login">Login Here....</Link></p>
                        </div>
                    </div>
                </div>
            </div>
                </div>

                <div className="col-md-1">

                </div>
            </div>

        </div>
    );
}

export default SignUp;