
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login_ForgetPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    const handlelogin_ForgetPassword = async () => {
        if (!email) {
            setError(true);
            return false;
        }
        try {
            
            let result = await fetch(`http://localhost:5000/member/listMemberByEmail/${email}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
           // return console.log(result);

            if(result === "Your status is deactive right now!!")
            {
                return swal({
                    title: "Forget Password",
                    text: "Your status is deactive right now!!",
                    icon: "warning",
                });
            }else if(result === "Invalid email"){
                return swal({
                    title: "Forget Password",
                    text: "Invalid Email",
                    icon: "warning",
                });
            }else{
                console.log(result);
                
                console.log("HASHED OTP IS HERE = "+result.hashedOTP);
                sessionStorage.setItem("OTP", JSON.stringify(result.hashedOTP));
                sessionStorage.setItem("id", JSON.stringify(result.id));
                sessionStorage.setItem("email", JSON.stringify(result.email));
                
                navigate("/VerifyOTP");

                return swal({
                    title: "Forget Password",
                    text: "Email Verified!",
                    icon: "success",
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
                                <h3>Verify Email</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Enter Email" className="txtusername" title="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                                        {error && !email && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>                   
                                <div className="mt-4">
                                    <center>
                                        <button type="button" onClick={handlelogin_ForgetPassword} className="btn btn-success">Verify</button>
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

export default Login_ForgetPassword;