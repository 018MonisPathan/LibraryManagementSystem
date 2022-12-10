import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const { VerifyToken } = require("./AuthGuard");

const Profile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactno, setContactno] = useState('');

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
              <h3>Profile detail's</h3>
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