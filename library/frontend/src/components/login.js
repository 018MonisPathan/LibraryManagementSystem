import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    const handlelogin = async () => {
        if (!username || !password) {
            setError(true);
            return false;
        }

        const data = {
            username,
            password
        }

        try {
            //console.log(data);
            let result = await fetch('http://localhost:5000/member/login', {
                method: 'post',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            //return console.log(result);

            

            if(result === "Your status is deactive right now!!")
            {
                return swal({
                    title: "Login",
                    text: "Your status is deactive right now!!",
                    icon: "warning",
                });
            }else{
                if (result.auth) {
                    
                    if (result.role === "admin") {
                        sessionStorage.setItem("user", JSON.stringify(result.result));
                        sessionStorage.setItem("token", JSON.stringify(result.auth));
                        sessionStorage.setItem("role", JSON.stringify("admin"));
                        sessionStorage.setItem("firstname",JSON.stringify(result.result.firstname));
                        sessionStorage.setItem("memberid",JSON.stringify(result.result._id));
                        swal({
                            title: "Login",
                            text: "Admin Login Successfull!",
                            icon: "success",
                        });
    
                        navigate("/admin/dashboard");
                        
                    }
    
                    if (result.role === "student") {
    
                            sessionStorage.setItem("user", JSON.stringify(result.result));
                            sessionStorage.setItem("token", JSON.stringify(result.auth));
                            sessionStorage.setItem("role", JSON.stringify("student"));
                            sessionStorage.setItem("firstname",JSON.stringify(result.result.firstname));
                            sessionStorage.setItem("memberid",JSON.stringify(result.result._id));
                            swal({
                                title: "Login",
                                text: "Student Login Successfull!",
                                icon: "success",
                            });
        
                            navigate("/student/dashboard");
                        
                    }
    
                    if (result.role === "librarian") {
                        sessionStorage.setItem("user", JSON.stringify(result.result));
                        sessionStorage.setItem("token", JSON.stringify(result.auth));
                        sessionStorage.setItem("role", JSON.stringify("librarian"));
                        sessionStorage.setItem("firstname",JSON.stringify(result.result.firstname));
                        swal({
                            title: "Login",
                            text: "Librarian Login Successfull!",
                            icon: "success",
                        });
    
                        navigate("/librarian/dashboard");
                    }

                    if (result.role === "faculty") {
                        sessionStorage.setItem("user", JSON.stringify(result.result));
                        sessionStorage.setItem("token", JSON.stringify(result.auth));
                        sessionStorage.setItem("role", JSON.stringify("faculty"));
                        sessionStorage.setItem("firstname",JSON.stringify(result.result.firstname));
                        sessionStorage.setItem("memberid",JSON.stringify(result.result._id));
                        swal({
                            title: "Login",
                            text: "Faculty Login Successfull!",
                            icon: "success",
                        });
    
                        navigate("/faculty/dashboard");
                    }
                
                } else {
                    swal({
                        title: "Login",
                        text: "Invalid Username or Password!",
                        icon: "warning",
                    });
                }
            }
                
            // if(result.auth){
            //     localStorage.setItem("user",JSON.stringify(result.result));
            //     localStorage.setItem("token",JSON.stringify(result.auth));
            //     swal({
            //         title: "Login",
            //         text: "Login Successfull!",
            //         icon: "success",
            //     });
            // }else{
            //     swal({
            //         title: "Login",
            //         text: "Invalid Username or Password!",
            //         icon: "warning",
            //     });
            // }

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
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Enter Username" className="txtusername" title="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                                        {error && !username && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <input type="password" placeholder="Enter Password" className="txtpwd" title="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                                        {error && !password && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <Link to="/ForgetPassword_email">Forget Password</Link>
                                    <center>
                                        <button type="button" onClick={handlelogin} className="btn btn-success">Login</button>
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

export default Login;