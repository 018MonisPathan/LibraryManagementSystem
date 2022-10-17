import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

const { VerifyToken } = require('../AuthGuard');

const ManageDeletedMember = () => {

    const [deletedmember,setDeletedMember] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllDeletedMember();
    },[])

    //Get All deleted member
    const getAllDeletedMember = async () =>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/listMembersdeleted/",{
                headers:{
                    "authorization": token
                }
            });
            
            result = await result.json();
            //return console.log(result.data);

            if(result.data){
                setDeletedMember(result.data);
            }else{
                console.log("Something went wrong!!");
            }

        }catch(err){
            console.log("Server Error");
        }
    }

    const undeleteMember = async (id) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Once Recovered, you will not be able to see this file here!!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if(willDelete){
            //return console.log(id);

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/member/memberchangeflag/${id}`,{
                method: 'PATCH',
                headers:{
                    "authorization": token
                }
            });

            result = result.json();

             console.log(result);

            if(result){
                swal({
                    title: "Recover Member",
                    text: "Recovery Successfull!",
                    icon: "success",
                });
                getAllDeletedMember();
            }else{
                swal({
                    title: "Delete Member",
                    text: "Deleted Fail!!",
                    icon: "warning",
                });
            }
        }else{
            swal("Member record is safe!");
        }
    }

    return (
        <div className="managedeletedmember container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Deleted Member</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Member</li>
                        <li className="breadcrumb-item">ManageDeletedMember</li>
                    </ul>
                </div>
            </div>

            <div className='card'>
                <div className="card-header">
                    Manage Deleted Member
                </div>

                <div className='card-body'>
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
                                deletedmember.length > 0 ? deletedmember.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row">{index+1}</th>
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
                                                            <button onClick={()=>undeleteMember(item._id)} style={{width:"50px"}}>
                                                                <i className="fa fa-trash" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                            </button>
                                                            
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

export default ManageDeletedMember;