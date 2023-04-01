import React, { useEffect, useState } from 'react'

const { VerifyToken } = require('../AuthGuard');

const Dashboard = () => {

    const [totalActiveMembers,setTotalActiveMembers] = useState("");

    useEffect(()=>{
        VerifyToken();
        TotalActiveMembers();
    },[]);

    //Retrive all active members count
    const TotalActiveMembers = async () => {
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/countTotalActiveMembers", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

//            return console.log(result);
            if(result > 0){
                setTotalActiveMembers(result);
            }else{
                setTotalActiveMembers("0");
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='container'>
        <div className='admin-dashboard'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='box1'>
                        <div className='box-1-title'>
                            Total Active Members
                        </div><br/>
                        <div className='box-1-body'>
                            <p>{totalActiveMembers}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard