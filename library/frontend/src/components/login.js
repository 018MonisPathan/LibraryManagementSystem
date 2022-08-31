import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login=()=>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handlelogin = async () => {
        if(!username || !password){
            setError(true);
            return false;
        }

        const data = {
            username,
            password
        }

        try{
            //console.log(data);
            let result = await fetch('http://localhost:5000/member/login',{
                method: 'post',
                body: JSON.stringify({username,password}),
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            console.log(result);

            if(result.auth){
                localStorage.setItem("user",JSON.stringify(result.result));
                localStorage.setItem("token",JSON.stringify(result.auth));
                swal({
                    title: "Login",
                    text: "Login Successfull!",
                    icon: "success",
                });
            }else{
                swal({
                    title: "Login",
                    text: "Invalid Username or Password!",
                    icon: "warning",
                });
            }
            
        }catch(error){
            console.log(error.message);
        }
    }

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
                                <input type="text" placeholder="Enter Username" className="txtusername" title="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>

                                {error && !username && <span className="invalid-input" style={{fontWeight:'bold',color:'red'}}>Please fill out this field!</span>}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <input type="password" placeholder="Enter Password" className="txtpwd" title="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

                                {error && !password && <span className="invalid-input" style={{fontWeight:'bold',color:'red'}}>Please fill out this field!</span>}
                            </div>
                        </div>

                        <div className="mt-4">
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

                <div className="col-md-3">

                </div>
            </div>

        </div>
    );
}

export default Login;