import React, { useState, useEffect } from 'react';

const { VerifyToken } = require('../AuthGuard');

const ManageMember = () => {

    const [member, setMember] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllMember();
    },[])

    //Get All Member

    const getAllMember = async () =>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/listMembers/",{
                headers:{
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if(result.data)
            {
                setMember(result.data);
            }else{
                console.log("Something went wrong");
            }
        }catch(err){
            console.log("Server Error");
        }
    }

    return(
        <div className="managecategory container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Member</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Member</li>
                        <li className="breadcrumb-item">ManageMember</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Member
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Contactno</th>
                                <th>Alternate Contact name</th>
                                <th>Alternate Contact number</th>
                                <th>Username</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {
                                            member.length > 0 ? member.map((item, index) => (
                                                <tr key={item._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{width: "12%"}}>{item.firstname}</td>
                                                    <td style={{width: "12%"}}>{item.lastname}</td>
                                                    <td style={{width: "18%"}}>{item.address}</td>
                                                    <td style={{width: "11%"}}>{item.email}</td>
                                                    <td style={{width: "9%"}}>{item.contactno}</td>
                                                    <td style={{width: "12%"}}>{item.alternate_contact_name}</td>
                                                    <td style={{width: "11%"}}>{item.alternate_contact_contactno}</td>
                                                    <td style={{width: "11%"}}>{item.username}</td>
                                                    <td style={{width: "8%"}}>
                                                        <center>
                                                            <i className="fa fa-trash" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                            {/* <Link to={"/admin/application/edit/" + item.catgeory_name}><i className="fa fa-edit" /></Link> */}
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

export default ManageMember;