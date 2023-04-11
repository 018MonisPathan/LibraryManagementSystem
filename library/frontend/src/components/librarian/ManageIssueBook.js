import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

const { VerifyToken } = require('../AuthGuard');

const LibrarianManageIssueBook = () => {

    const [issuedbook, setIssuedBook] = useState("");
    const [settings, setSettings] = useState("");
    const [issuebookid,setIssueBookId] = useState("");

    useEffect(() => {
        getAllBook();
        getAllSettings();
    }, []);

    //get all issued book

    //Get all book
    const getAllBook = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/IssueBook/selectActiveIssueBookDetails", {
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setIssuedBook(result.data);
            } else {
                console.log("Something went wrong");
            }

        } catch (err) {
            console.log("server error");
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

    //Get Issue Book By id

    const getIssueBookById = async (id) => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let response = await fetch(`http://localhost:5000/IssueBook/selectallIssueBookDetailByIssueBookId/${id}`, {
                method: "GET",
                headers: {
                    "authorization":token
                }
            });

            let result = await response.json();

            if (result) {
                //console.log(result.data);
                setIssueBookId(result.data[0]._id)
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Return Book

    const ReturnBook = async () => {
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/ReturnBook/insertReturnBookDetails",{
                method: "POST",
                body: JSON.stringify(issuebookid,settings),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            //result = await result.json()
            
            // let response = await fetch(`http://localhost:5000/ReturnBook/activate_deactivateReturnBookDetails/${issuebookid}`,{
            //     method: "PATCH",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "authorization":token
            //     }
            // });

            // response = await response.json();

            // if(response){
            //     console.log("Status Deactive");
            // }else{
            //     console.log("Error");
            // }

            if(result){
                swal({
                    title: 'Return Book',
                    text: 'Book Return Successfully!',
                    timer: 2000
                });
            }else{
                swal({
                    title: 'Return Book',
                    text: 'Book Return Failed!',
                    timer: 2000
                });
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='manageissuebook container'>
            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Book</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Book</li>
                        <li className="breadcrumb-item">Manage Issued Book</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Issued Book
                </div>

                <div className='card-body'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Member Name</th>
                                <th>Book Issue date</th>
                                <th>Book Due Date</th>
                                <th>Panelty Amount</th>
                                <th>Return Option</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                issuedbook.length > 0 ? issuedbook.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{ width: "8%" }}>{index + 1}</th>
                                        <td>{item["book_id"][0].title}</td>
                                        <td>{item["book_id"][0].author}</td>
                                        <td>{item["membership_id"][0].firstname}</td>
                                        <td>{item.issuedate.split("T")[0]}</td>
                                        <td>{item.duedate.split("T")[0]}</td>
                                        <td>
                                            {
                                                new Date().toISOString().split("T")[0] > item.duedate.split("T")[0] ? <>
                                                    <p>{settings}</p>
                                                </> : <>
                                                    <p>0</p>
                                                </>
                                            }
                                        </td>

                                        <td>
                                            <button onClick={() => {getIssueBookById(item._id);ReturnBook()}} style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                <i className="fa fa-hand" style={{ padding: 2, color: "red" }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                    :
                                    <>
                                        <tr> <td colspan="3" style={{ textAlign: "center" }}><strong>No Records
                                            Founds!</strong></td></tr>
                                    </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default LibrarianManageIssueBook;