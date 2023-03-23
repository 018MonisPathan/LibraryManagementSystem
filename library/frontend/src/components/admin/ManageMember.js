import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const ManageMember = () => {

    const [member, setMember] = useState("");
    const [memberid, setMemberId] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [contactno, setContactno] = useState("");

    useEffect(() => {
        VerifyToken();
        getAllMember();
    }, [])

    //Get only Active Member

    const getAllMember = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/listActiveMembers/", {
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if (result.data) {
                setMember(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (err) {
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

        if (willDelete) {
            //return console.log(id);

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/member/softdeletemember/${id}`, {
                method: 'PATCH',
                headers: {
                    "authorization": token
                }
            });

            result = result.json();

            console.log(result);

            if (result) {
                swal({
                    title: "Delete Member",
                    text: "Member Deleted Successfully!",
                    icon: "success",
                });
                getAllMember();
            } else {
                swal({
                    title: "Delete Member",
                    text: "Member Deletion Fail!!",
                    icon: "warning",
                });
            }
        } else {
            swal("Member record is safe!");
        }
    }

    //Select member by id

    const SelectMemberById = async (id) => {

        //return console.log(id);

        const token = sessionStorage.getItem("token").replace(/['"]+/g, '');

        let result = await fetch(`http://localhost:5000/member/listMembersByid/${id}`, {
            method: 'get',
            headers: {
                "authorization": token
            }
        });

        result = await result.json();

        console.log(result);

        if (result) {
            setMemberId(result._id)
            setFirstname(result.firstname)
            setLastname(result.lastname)
            setEmail(result.email)
            setContactno(result.contactno)
        }
    }

    //Update member by id
    const UpdateMemberById = async () => {

        //return console.log("Update called");

        if (firstname != "" || lastname != "" || email != "" || contactno != "") {
            const token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch(`http://localhost:5000/member/updatemember/${memberid}`, {
                method: "PATCH",
                body: JSON.stringify({ firstname, lastname, email, contactno }),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": token
                }
            })

            result = await result.json();

            if (result) {
                swal({
                    title: 'Update Member',
                    text: 'Member Updated Successfully!',
                    timer: 2000
                });

                getAllMember();
            } else {
                swal({
                    title: 'Update Member',
                    text: 'Member Updation Failed!',
                    timer: 2000
                });
            }
        } else {
            swal({
                title: 'Update Member',
                text: 'Please Fill all the details!',
                timer: 2000
            });
        }

    }

    return (
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

            <div class="modal fade" id="updatememberdetailsmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Member details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='changePwd_modal_body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label for="fname"><b>Firstname:</b></label>
                                        <input type="text" className='txtlname' id='fname' placeholder="Enter Your Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    </div>

                                    <div className='col-md-6'>
                                    <label for="lname"><b>Lastname:</b></label>
                                        <input type="text" className='txtlname' id='lname' placeholder="Enter Your Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <br />
                                        <label for="email"><b>Email:</b></label>
                                        <input type="email" className='txtemail' id='email' placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className='col-md-6'>
                                        <br />
                                        <label for="contactno"><b>Contact No.:</b></label>
                                        <input type="number" className='txtcontactno' id='contactno' placeholder="Enter Your Contactno" value={contactno} onChange={(e) => setContactno(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={UpdateMemberById} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Member

                    <Link to="/admin/registerlibrarianstudent" className='btn btn-info' style={{ float: "right" }}><i className="fa fa-plus" style={{ color: "white" }} /></Link>
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
                                        <td style={{ width: "12%" }}>{item.firstname}</td>
                                        <td style={{ width: "12%" }}>{item.lastname}</td>
                                        <td style={{ width: "18%" }}>{item.address}</td>
                                        <td style={{ width: "11%" }}>{item.email}</td>
                                        <td style={{ width: "9%" }}>{item.contactno}</td>
                                        <td style={{ width: "12%" }}>{item.alternate_contact_name}</td>
                                        <td style={{ width: "11%" }}>{item.alternate_contact_contactno}</td>
                                        <td style={{ width: "11%" }}>{item.username}</td>
                                        <td style={{ width: "11%" }}>
                                            <center>
                                                <button onClick={() => deleteMember(item._id)} style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-trash" style={{ padding: 2, color: "red", fontSize: 16 }} />
                                                </button>

                                                {/* <Link to={"/admin/registerlibrarianstudent/" + item._id} ><i className="fa fa-edit" style={{ color: "green" }} /></Link> */}

                                                <button data-bs-toggle="modal" data-bs-target="#updatememberdetailsmodal" onClick={() => { SelectMemberById(item._id) }} style={{ width: "20px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-edit" style={{ color: "green" }} />
                                                </button>
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