import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const ManageMember = () => {

    const [member, setMember] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllMember();
    },[])

    //Get only Active Member

    const getAllMember = async () =>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/listActiveMembers/",{
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

    //delete member by id
    const deleteMember = async (id) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to see this record here!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if(willDelete){
            //return console.log(id);

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/member/softdeletemember/${id}`,{
                method: 'PATCH',
                headers:{
                    "authorization": token
                }
            });

            result = result.json();

             console.log(result);

            if(result){
                swal({
                    title: "Delete Member",
                    text: "Member Deleted Successfully!",
                    icon: "success",
                });
                getAllMember();
            }else{
                swal({
                    title: "Delete Member",
                    text: "Member Deletion Fail!!",
                    icon: "warning",
                });
            }
        }else{
            swal("Member record is safe!");
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
                                                    <td style={{width: "11%"}}>
                                                        <center>
                                                            <button onClick={()=>deleteMember(item._id)} style={{width:"30px", borderRadius: "5px", backgroundColor: "white", border: "0px"}}>
                                                                <i className="fa fa-trash" style={{ padding: 2, color: "red", fontSize: 16 }} />
                                                            </button>
                                                            
                                                            <Link to={"/admin/registerlibrarianstudent/" + item._id}><i className="fa fa-edit" style={{ color: "green" }} /></Link>
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