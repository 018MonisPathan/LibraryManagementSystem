import React, { useState, useEffect } from 'react';

//import { mockComponent } from 'react-dom/test-utils';
// import {Outlet} from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
//const { VerifyToken } = require('../AuthGuard');

const ManageIssueBook = () => {

    const [issuebook, setIssueBook] = useState("");
    const [settings, setSettings] = useState("");
    const [itemid, setItemid] = useState("");


    useEffect(() => {
        //VerifyToken();
        //getAllCategory();
        getAllIssueBookByStudent();
        getAllSettings()
        //alert("issue book");
    }, [])

    //Get all issue book
    const getAllIssueBookByStudent = async () => {
        try {
            console.log(new Date().toISOString().split("T")[0]);
            //return console.log("faculty");

            const membership_id = sessionStorage.getItem("memberid").replace(/['"]+/g, '');

            //return console.log(membership_id);

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/IssueBook/selectallIssueBookDetailsByMembershipId/${membership_id}`);

            result = await result.json();

            //return console.log(result.data[0].duedate);

            if (result) {
                console.log(result.data);
                setIssueBook(result.data);
            } else {
                console.log("Something went wrong!!");
            }
        } catch (err) {
            return console.log("Server Error");
        }
    }

    //Get All setting for assign panelty to customer

    const getAllSettings = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/Settings/SelectSettings/", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            })

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                console.log(result.data[0].penalty_amount);
                setSettings(result.data[0].penalty_amount);
            } else {
                console.log("something went wrong!");
            }

        } catch (err) {
            console.log("server error!");
        }
    }

    //Panelty functions.

    const call_paypal = async (id) => {
        //return console.log("paypal called ");
console.log("id is ",id)
        let result = await fetch('http://localhost:5000/PaypalController/sendItem', {
            method: "POST"

        });

        result = await result.json();
        if (result) {
            console.log("success");

            // console.log(result.forwardLink);
            //update the due date increase by 15 on success
            window.location = result.forwardLink

          
            var dateget = new Date();
            dateget.setDate(dateget.getDate() + 15);
            var Datetogive = dateget.toISOString().split('T')[0];

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            //var id = itemid 
            let resulta = await fetch(`http://localhost:5000/IssueBook/updateIssueBookDetails/${id}`,{
                method: "PATCH",
                body: JSON.stringify({ duedate:Datetogive}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("result of update",resulta);
            if (resulta){
                console.log("book duedate update Success");
            }else{
                console.log("book duedate update Failed");
            }

           
        } else {
            console.log("Fail");
        }
    }
    return (
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
                                <th>PDF</th>
                                <th>Due Date</th>
                                <th>Issue Date</th>
                                <th>Panelty Amount</th>
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
                                        <td style={{ width: "12%" }}>{item['book_id'][0].title}</td>
                                        <td style={{ width: "5%" }}><a href={"http://localhost:5000" + item['book_id'][0].pdf} target="_blank">PDF</a></td>
                                        <td style={{ width: "25%" }}>{item.duedate.split("T")[0]}</td>
                                        <td style={{ width: "25%" }}>{item.issuedate.split("T")[0]}</td>
                                        <td>
                                            {
                                                new Date().toISOString().split("T")[0] > item.duedate.split("T")[0] ? <>
                                                    <p>{settings}</p>
                                                </> : <>
                                                    <p>0</p>
                                                </>
                                            }
                                        </td>

                                        <td style={{ width: "8%" }}>
                                            <center>

                                                {/* <form action="/pay" method="post">
                                                                <input type="submit" value="Buy"/>
                                                            </form> */}
                                                            
                                                {
                                                    new Date().toISOString().split("T")[0] > item.duedate.split("T")[0] ? <>

                                <button onClick={()=>{call_paypal(item._id)}} 
                                                        style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                            <i className="fa fa-undo" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                        </button>
                                                    </> : <>
                                                        <button style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                            <i className="fa fa-undo" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                        </button>
                                                    </>
                                                }

                                                {/* <button onClick={call_paypal} style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-undo" style={{ marginRight: 10, color: "#3f6ad" }} />
                                                </button> */}


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