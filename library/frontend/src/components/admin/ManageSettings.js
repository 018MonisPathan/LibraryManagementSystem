import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { VerifyToken } = require('../AuthGuard');

const ManageSettings=()=>{

    const [settings, setSettings] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllSettings();
    },[]);

    const getAllSettings=async()=>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/Settings/SelectSettings/",{
                method: "GET",
                headers:{
                    "authorization": token
                }
            })

            result = await result.json();

            //return console.log(result.data);

            if(result){
                setSettings(result.data);
            }else{
                console.log("something went wrong!");
            }

        }catch(err){
            console.log("server error!");
        }
    }

    return(
        <div className="managesettings container">
            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Settings</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Settings</li>
                        <li className="breadcrumb-item">ManageSettings</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Settings
                </div>

                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                                <th>SR No.</th>
                                <th>Panelty Amount</th>
                                <th>Student book issue limit</th>
                                <th>Faculty book issue limit</th>
                                <th>Renew Day limit</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                settings.length > 0 ? settings.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{width: "8%"}}>{index + 1}</th>
                                        <td style={{width: "30%"}}>{item.penalty_amount}</td>
                                        <td style={{width: "20%"}}>{item.student_booklimit}</td>
                                        <td style={{width: "20%"}}>{item.faculty_booklimit}</td>
                                        <td style={{width: "20%"}}>{item.renewdaylimit}</td>
                                        <td style={{width: "8%"}}>
                                            <center>
                                                {/* <button onClick={()=>deleteCategory(item._id)} style={{width:"30px",borderRadius: "5px", backgroundColor: "white", border: "0px"}}>
                                                    <i className="fa fa-trash" style={{ padding: 2, color: "red", fontSize: 16 }} />
                                                </button> */}

                                                <Link to={"/admin/AddSetting/" + item._id}><i className="fa fa-edit" style={{ color: "green" }} /></Link>
                                            </center>
                                        </td>
                                    </tr>
                                ))
                                    : <tr> <td colspan="3" style={{ textAlign: "center" }}><strong>No Records
                                        Founds!</strong></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageSettings;