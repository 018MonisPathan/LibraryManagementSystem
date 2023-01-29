
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const VerifyOTP = () => {

    const [OTP, setOTP] = useState("");
    //const [retype_password, setRetypePassword] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    const resendOTP = async () => {
        try {
            console.log("resend otp");

            var email=sessionStorage.getItem("email");
           // return console.log(email);
            let result = await fetch("http://localhost:5000/member/resendOTP", {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            sessionStorage.setItem("OTP", JSON.stringify(result.hashedOTP));
        } catch (error) {
            console.log(error.message);
        }
 
    }

    const handlelogin_OTP = async () => {
        if (!OTP) {
            setError(true);
            return false;
        }
        try {
                let hashedOTP= sessionStorage.getItem("OTP").replace(/['"]+/g, '');
                console.log("this is hashed otp "+hashedOTP);
                let result = await fetch("http://localhost:5000/member/verifyOTP", {
                    method: 'POST',
                    body: JSON.stringify({hashedOTP,OTP}),
                    headers: {
                        'Content-Type': 'application/json'
                        
                    }
                });
                result = await result.json();
                //return console.log(result);
                if(result === "ValidOTP")
                {
                   // console.log(result);
                   // console.log(result.hashedOTP);
                   // sessionStorage.setItem("OTP", JSON.stringify(result.hashedOTP));
                   // sessionStorage.setItem("user", JSON.stringify(result.result));
                    navigate("/ChangePasswordAfterOTP");

                    return swal({
                        title: "OTP verification!",
                        text: "Your OTP is verified",
                        timer: 2000
                      });
                }else{
                    return swal({
                        title: "OTP Verification",
                        text: "Invalid OTP!!",
                        icon: "warning",
                    });
                }   
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="login">

            <div className="row">
                <div className="col-md-4">

                </div>

                <div className="col-md-4 login-div">
                    <div className="login-form">
                        <div className="card">
                            <div className="card-header">
                                <h3>Verify OTP</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Enter OTP" className="txtusername" title="Enter OTP" value={OTP} onChange={(e) => setOTP(e.target.value)} required />

                                        {error && !OTP && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>        
                                <div className="mt-4">
                                    <Link to="/VerifyOTP"> <span onClick={resendOTP}>Resend OTP</span></Link>
                              
                                    <center>
                                        <button type="button" onClick={handlelogin_OTP} className="btn btn-success">Verify</button>
                                    </center>
                                </div>

                                {/* <div className="mt-3 mb-0">
                            <p>If you don't have an account? <Link to="/signup">SignUp Here....</Link></p>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">

                </div>
            </div>

        </div>
    );
}

export default VerifyOTP;