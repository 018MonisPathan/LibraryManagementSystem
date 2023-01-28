
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const ChangePassword_AfterOTP = () => {

    const [new_password, setNewPassword] = useState("");
    const [retype_password, setRetypePassword] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    const handlelogin_OTP_changePassword = async () => {
        if (!new_password,!retype_password) {
            setError(true);
            return false;
        }
        try {

                if(new_password == retype_password){
                    let hashedOTP= sessionStorage.getItem("OTP").replace(/['"]+/g, '');
                    let id= sessionStorage.getItem("id").replace(/['"]+/g, '');
                   
    
                    //return console.log(id);
    
                    console.log("this is hashed otp "+hashedOTP);
                    var password=new_password
                    let result = await fetch(`http://localhost:5000/member/updatepassword/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify({password}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    result = await result.json();
                    //return console.log(result);
                    if(result)
                    {
                        navigate("/login");
                        return swal({
                            title: "Add new password",
                            text: "Password Changed!",
                            icon: "success",
                        });
                    }else{
                        return swal({
                            title: "Add new password",
                            text: "Fail!!",
                            icon: "warning",
                        });
                    }   
                }
                else{
                    swal({
                        title: "Change Password!",
                        text: "Password and confirm password must be same!!",
                        timer: 2000
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
                                <h3>Add New Password</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="password" placeholder="Enter New Password" className="txtusername" title="Enter New Password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} required />

                                        {error && !new_password && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <input type="password" placeholder="Retype Password" className="txtusername" title="Retype Password" value={retype_password} onChange={(e) => setRetypePassword(e.target.value)} required />

                                        {error && !retype_password && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div> 

                                       
                                <div className="mt-4">
                                
                                    <center>
                                        <button type="button" onClick={handlelogin_OTP_changePassword} className="btn btn-success">Add</button>
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

export default ChangePassword_AfterOTP;