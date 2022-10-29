import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const { VerifyToken } = require('../AuthGuard');

const AddSettings=()=> {

    const [penalty_amount, setPaneltyAmount] = useState("");
    const [student_booklimit, setStudentBookLimit] = useState("");
    const [faculty_booklimit, setFacultyBookLimit] = useState("");
    const [renewdaylimit, setRenewDayLimit] = useState("");
    const [error, setError] = useState(false);

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        VerifyToken();

        if(params.id){
            //alert(params.id);
            getAllSettingsForUpdate();
        }

    },[]);

    //Fill data to text box for update.

    const getAllSettingsForUpdate=async()=>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/Settings/SelectSettingsByid/${params.id}`,{
                method: "GET",
                headers:{
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            setPaneltyAmount(result.data.penalty_amount);
            setStudentBookLimit(result.data.student_booklimit);
            setFacultyBookLimit(result.data.faculty_booklimit);
            setRenewDayLimit(result.data.renewdaylimit);

        }catch(err){
            console.log("Server error in update");
        }
    }

    const collectdata=async()=>{

        //return console.log(penalty_amount,student_booklimit,faculty_booklimit,renewdaylimit);

        if(!penalty_amount || !student_booklimit || !faculty_booklimit || !renewdaylimit){
            setError(true);
            return false;
        }

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        if(params.id){
            let result = await fetch(`http://localhost:5000/Settings/UpdateSettings/${params.id}`,{
                method: "PATCH",
                body: JSON.stringify({penalty_amount,student_booklimit,faculty_booklimit,renewdaylimit}),
                headers:{
                    'Content-Type': 'application/json',
                    "authorization": token
                }
            })

            result = await result.json();

            if(result){
                //return console.log("Record updated");

                swal({
                    title: 'Update Settings',
                    text: 'Settings Updated successfully!',
                    icon: 'success'
                });

                navigate("/admin/ManageSettings");
            }else{
                //return console.log("Error while updating");

                swal({
                    title: 'Update Settings',
                    text: 'Error while updating Settings!',
                    icon: 'warning'
                });
            }
        }else{

            let result = await fetch("http://localhost:5000/Settings/InsertSettings",{
                method: "POST",
                body: JSON.stringify({penalty_amount,student_booklimit,faculty_booklimit,renewdaylimit}),
                headers:{
                    'Content-Type': 'application/json',
                    "authorization": token
                }
            });
    
            result = await result.json();
    
            if(result){
                swal({
                    title: 'Add Settings',
                    text: 'Setting set successfully!',
                    icon: 'success'
                });
            }else{
                swal({
                    title: 'Add Settings',
                    text: 'Error while set settings!',
                    icon: 'warning'
                });
            }
        }

    }

    return (
      <div className="addsettings mt-5" style={{width: "100%", overflowX: "hidden"}}>
        <div className='row'>

            <div className='col-md-2'>

            </div>

            <div className='col-md-8'>
                <div className='addsettigs-form'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3>Add Settings</h3>
                        </div>

                        <div className='card-body'>
                            <div className='row mt-3'>

                                <div className='col-md-6'>
                                    <input type="number" className="txtsettingspaneltyamount" title='Enter panelty amount' value={penalty_amount} onChange={(e)=>setPaneltyAmount(e.target.value)} placeholder='Enter panelty amount' required/>

                                    {error && !penalty_amount && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                </div>

                                <div className='col-md-6'>
                                    <input type="number" className="txtstudentbooklimit" placeholder='Enter student book limit' value={student_booklimit} onChange={(e)=>setStudentBookLimit(e.target.value)} required/>

                                    {error && !student_booklimit && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                </div>
                            </div>

                            <div className='row mt-3'>

                                <div className='col-md-6'>
                                    <input type="number" className="txtfacultybooklimit" placeholder='Enter faculty book limit' value={faculty_booklimit} onChange={(e)=>setFacultyBookLimit(e.target.value)} required/>

                                    {error && !faculty_booklimit && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                </div>

                                <div className='col-md-6'>
                                    <input type="number" className="txtrenewdaylimit" placeholder='Enter renew day limit' value={renewdaylimit} onChange={(e)=>setRenewDayLimit(e.target.value)} required/>

                                    {error && !renewdaylimit && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                </div>
                            </div>

                            <div className='col-md-12 mt-4'>
                                <center>
                                    <button type='button' className='btn btn-primary' onClick={collectdata}>Save</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-2'>

            </div>
        </div>
      </div>
    )
}

export default AddSettings;