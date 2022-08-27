import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const SignUp=()=>{

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [address,setAddress] = useState("");
    const [email,setEmail] = useState("");
    const [contactno,setContactno] = useState("");
    const [dob,setDob] = useState("");
    const [alternatecontactcontactname,setAlternatecontactcontactname] = useState("");
    const [alternatecontactcontactno,setAlternatecontactcontactno] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("");
    const [totalissuedbooks,setTotalissuedbooks] = useState("");

    const collectdata = async () => {

        setRole(role,"admin");
        setTotalissuedbooks(totalissuedbooks,"0");

        //console.log(firstname,lastname,address, email,contactno,dob,alternatecontactcontactname,alternatecontactcontactno,username, password,role,totalissuedbooks);

        // useEffect(()=>{
        //     const auth = localStorage.getItem('user');
        //     if(auth){
        //         navigate('/');
        //     }
        // });

        let result = await fetch('http://localhost:5000/member/register',{
            method:'post',
            body: JSON.stringify({firstname,lastname,address, email,contactno,dob,alternatecontactcontactname,alternatecontactcontactno,username, password,role,totalissuedbooks}),
            headers:{
                'Content-Type':'application/json'
            },
        });

        result = await result.json()

        console.log(result);

        if(result){
            swal({
                title: "Registration",
                text: "Registration Successfully!",
                icon: "success",
            });
        }

         localStorage.setItem("user",JSON.stringify(result.result));    //Used to store data in local storage.(It will remain until you remove menually.)
        // localStorage.setItem("token",JSON.stringify(result.auth));
    }

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
                                <input type="text" placeholder="Enter Firstname" className="txtfname" title="Enter Firstname"  value={firstname} onChange={(e)=>setFirstname(e.target.value)} required/>
                            </div>

                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Lastname" className="txtlname" title="Enter Lastname"  value={lastname} onChange={(e)=>setLastname(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <textarea type="textarea" cols={101} rows={4} placeholder="Enter Address" className="txtaddress"  value={address} onChange={(e)=>setAddress(e.target.value)} title="Enter Address" required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-4">
                                <input type="email" placeholder="Enter Email" className="txtemail" title="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            </div>

                            <div className="col-md-4">
                                <input type="number" placeholder="Enter Contactno" className="txtcontactno" title="Enter Contactno" value={contactno} onChange={(e)=>setContactno(e.target.value)} required/>
                            </div>

                            <div className="col-md-4">
                                <input type="date" className="txtdob" value={dob} onChange={(e)=>setDob(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Alternate Contact Name" className="txtalternatename" value={alternatecontactcontactno} onChange={(e)=>setAlternatecontactcontactno(e.target.value)} title="Enter Alternate Contact Name"/>
                            </div>

                            <div className="col-md-6">
                                <input type="number" placeholder="Enter Alternate Contactno" className="txtalternatecontactno" value={alternatecontactcontactname} onChange={(e)=>setAlternatecontactcontactname(e.target.value)} title="Enter Alternate Contactno"/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <input type="text" placeholder="Enter Username" className="txtusername" title="Enter Username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                            </div>

                            <div className="col-md-6">
                                <input type="password" placeholder="Enter Password" className="txtpwd" title="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <select className="ddlrole" value={role} onChange={(e)=>setRole(e.target.value)}>
                                    <option value={"librarian"}>librarian</option>
                                    <option value={"student"}>student</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <center>
                                <button type="button" className="btn btn-primary" onClick={collectdata}>Sign Up</button>
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