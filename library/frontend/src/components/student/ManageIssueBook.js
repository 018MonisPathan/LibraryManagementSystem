import React, { useState, useEffect } from 'react';

//import { mockComponent } from 'react-dom/test-utils';
// import {Outlet} from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
//const { VerifyToken } = require('../AuthGuard');

const ManageIssueBook=()=>{

    const [issuebook, setIssueBook] = useState("");

    useEffect(() => {
        //VerifyToken();
        //getAllCategory();
        getAllIssueBook();
        //alert("issue book");
    }, [])

    //Get all issue book
    const getAllIssueBook = async () => {
        try{
            //let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/IssueBook/selectIssueBookDetails");

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setIssueBook(result.data);
            } else {
                console.log("Something went wrong");
            }
        }catch(err){
            console.log("Server Error");
        }
    }

    //Panelty functions.
    

    return(
        <div className="manageissuebook container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Issue Book</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Student</li>
                        <li className="breadcrumb-item">ManageIssueBook</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Issue Book
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>SR No.</th>
                                <th>Book Title</th>
                                <th>Due Date</th>
                                <th>Issue Date</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {
                                            issuebook.length > 0 ? issuebook.map((item, index) => (
                                                <tr key={item._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td style={{width: "32%"}}>{item['book_id'][0].title}</td>
                                                    <td style={{width: "25%"}}>{item.duedate}</td>
                                                    <td style={{width: "25%"}}>{item.issuedate}</td>
                                                    
                                                    <td style={{width: "8%"}}>
                                                        <center>
                                                            <button style={{width:"50px"}}>
                                                                <i className="fa fa-undo" style={{ marginRight: 10, color: "#3f6ad" }} />
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
};

export default ManageIssueBook;