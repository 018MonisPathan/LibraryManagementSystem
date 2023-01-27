import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const { VerifyToken } = require("./AuthGuard");

const Profile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContactno] = useState('');

  const [password, setPassword] = useState('');
  const [Oldpassword, setOldPassword] = useState('');
  const [cnfpwd, setConfirmPassword] = useState('');

  useEffect(() => {
    VerifyToken();
    getUserForUpdateProfile();
  })

  //Get All data of user based on their id

  const getUserForUpdateProfile = async () => {
    try {
      let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

      const memberid = sessionStorage.getItem("memberid").replace(/['"]+/g, '');
      let result = await fetch(`http://localhost:5000/member/listMembersByid/${memberid}`, {
        headers: {
          "authorization": token
        }
      });

      result = await result.json();
      //return console.log(result);

      if (result) {
        setFirstname(result.firstname);
        setLastname(result.lastname);
        setAddress(result.address);
        setEmail(result.email);
        setContactno(result.contactno);
      }

    } catch (err) {
      console.log("server error");
    }
  }

  //Update password

  const UpdatePassword = async () => {


    if (Oldpassword != "" || password != "" || cnfpwd != "") {

      let token = sessionStorage.getItem('token').replace(/['"]+/g, '');

      let memberid = sessionStorage.getItem("memberid").replace(/['"]+/g, '');

      //return console.log(Oldpassword);

      let result = await fetch(`http://localhost:5000/member/changePassword/${memberid}`, {
        method: "POST",
        body: JSON.stringify({ Oldpassword, password }),
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      })

      result = await result.json();

      if (result === "Please Enter correct old password!!") {
        //return console.log(result);

        swal({
          title: "Change Password!",
          text: "Please Enter correct old password!!",
          timer: 2000
        });

        return;
      } else if (result === "Old and new password can not be same!!") {
        swal({
          title: "Change Password!",
          text: "Old and new password can not be same!!",
          timer: 2000
        });
      } else if (password != cnfpwd) {
        swal({
          title: "Change Password!",
          text: "Password and confirm password must be same!!",
          timer: 2000
        });
      } else {
        console.log("Password Updated Successfully!!");

        swal({
          title: "Change Password!",
          text: "Password Updated Successfully!!",
          timer: 2000
        });

        setOldPassword("");
        setPassword("")
        setConfirmPassword("");
      }
    } else {
      swal({
        title: "Change Password!",
        text: "Please Fill all the details",
        timer: 2000
      });
    }



    // if (result) {
    //   console.log("Password Updated Successfully!!");

    //   console.log(result.json());
    //   swal({
    //     title: "Password Change!",
    //     text: "Password Updated Successfully!!",
    //     timer: 2000
    //   });

    //   setOldPassword("");
    //   setPassword("")
    //   setConfirmPassword("");
    // } else {
    //   console.log("Password change error!!");
    // }
  }

  return (
    <div className='UpdateProfile container'>

      <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
        <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

        <div class="breadcrumb-title bottom-left">
          <h2>User Profile</h2>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-3'></div>

        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h3>
                Profile detail's
                <span style={{ float: "right" }}>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chagepwdmodal">
                    Change Password
                  </button>
                </span>
              </h3>
            </div>

            <div class="modal fade" id="chagepwdmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Change Password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className='changePwd_modal_body'>
                      <div className='row'>
                        <div className='col-md-12'>
                          <center>
                            <input type="text" className='txtoldpwd' placeholder='Enter Your Old Password' title='Enter Your Old Password' value={Oldpassword} onChange={(e) => setOldPassword(e.target.value)} require />
                          </center>
                        </div>

                        <div className='col-md-12'>
                          <center>
                            <br /><input type="text" className='txtnewpwd' placeholder='Enter Your New Password' value={password} onChange={(e) => setPassword(e.target.value)} require />
                          </center>
                        </div>

                        <div className='col-md-12'>
                          <center>
                            <br /><input type="text" className='txtcnfpwd' placeholder='Enter Your Confirm Password' value={cnfpwd} onChange={(e) => setConfirmPassword(e.target.value)} require />
                          </center>
                        </div>
                      </div>


                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onClick={UpdatePassword} data-bs-dismiss="modal">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-body'>
              <div className='UpdateProfile-form'>

                <div className='row'>
                  <div className='col-md-6'>
                    <input type='text' placeholder='Enter Firstname' className='txtpfname' title='Enter Firstname' value={firstname} disabled />

                  </div>

                  <div className='col-md-6'>
                    <input type='text' placeholder='Enter Lastname' className='txtplname' title='Enter Lastname' value={lastname} disabled />
                  </div>
                </div>

                <div className='row mt-4'>
                  <div className='col-md-12'>
                    <textarea type='textarea' cols={74} rows={4} placeholder='Enter Address' className='txtpaddress' title='Enter Address' value={address} disabled />
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <input type='email' placeholder='Enter Email' className='txtpemail' title='Enter Email' value={email} disabled />
                  </div>

                  <div className='col-md-6'>
                    <input type='number' placeholder='Enter Contactno' className='txtpcontactno' title='Enter Contactno' value={contactno} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-3'></div>
      </div>
    </div>
  )
}

export default Profile;