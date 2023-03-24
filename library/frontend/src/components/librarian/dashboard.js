import React, { useState, useEffect } from 'react';
//import { mockComponent } from 'react-dom/test-utils';
// import {Outlet} from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
const { VerifyToken } = require('../AuthGuard');

const LibrarianDashboard = () => {

    const [book, setBook] = useState("");
    const [ISBN_no, setBookISBNNo] = useState("");
    const [member, setMember] = useState("");
    const [membership_id,setMemberId] = useState("");

    useEffect(() => {
        //alert("Librarian");
        getAllBook();
        VerifyToken();
        //getMemberDetails();
    })

    //Get all book
    const getAllBook = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/AddBook/SelectActiveBooks", {
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setBook(result.data);
            } else {
                console.log("Something went wrong");
            }

        } catch (err) {
            console.log("server error");
        }
    }

    //Delete book

    const deleteBook = async (id) => {
        try {
            //return alert(id);
            const willDelete = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to see this record here!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

            if (willDelete) {

                let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
                let result = await fetch(`http://localhost:5000/AddBook/ChangeFlagstatus/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "authorization": token
                    }
                });

                result = await result.json();

                if (result) {
                    swal({
                        title: "Delete Book",
                        text: "Book Deleted Successfully!",
                        icon: "success"
                    });
                    getAllBook();
                } else {
                    swal({
                        title: "Delete Book",
                        text: "Book Deletion fail!",
                        icon: "warning"
                    });
                }
            } else {
                swal("Book record is safe!");
            }

        } catch (err) {
            return console.log("Error while deleting subcategory!");
        }
    }

    //Get member details for book issue.

    const getMemberDetails = async () => {
        try {
            const token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/listActiveMembers/", {
                headers: {
                    "authorization": token
                }
            });

            result = await result.json()

            console.log(result.data);

            setMember(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    //Select book by id.

    const SelectBookById = async (id) => {
        //return console.log(id);

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

        let result = await fetch(`http://localhost:5000/AddBook/SelectBookById/${id}`, {
            headers: {
                "authorization": token
            }
        })

        result = await result.json();

        //return console.log(result);

        if (result) {
            setBookISBNNo(result.result.ISBN_no);
        }

        //return console.log(result);
    }

    //Issue book

    const IssueBook = async () => {
        console.log(membership_id);
        try{

            if(ISBN_no != "" || membership_id != ""){

                const token = sessionStorage.getItem("token").replace(/['"]+/g, '');
                let result = await fetch(`http://localhost:5000/IssueBook/insertIssueBookDetails`,{
                    method: "POST",
                    body: JSON.stringify({ISBN_no,membership_id}),
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization":token
                    }
                });
    
                if(result){
                    swal({
                        title: 'Issue Book',
                        text: 'Book issued Successfully!',
                        timer: 2000
                    });
    
                    getAllBook()
                }else{
                    swal({
                        title: 'Issue Book',
                        text: 'Book issue Failed!',
                        timer: 2000
                    });
                }
            }else{
                swal({
                    title: 'Issue Book',
                    text: 'Please fill all the fields!',
                    timer: 2000
                });
            }

        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='managebook container'>
            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Book</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Book</li>
                        <li className="breadcrumb-item">Available Book</li>
                    </ul>
                </div>
            </div>

            <div class="modal fade" id="issuebookdetailmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Issue Book</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='changePwd_modal_body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label for='membername' style={{ paddingLeft: "38px" }}><b>Member Name:</b></label>
                                        <center>
                                            <select className='ddlmember' onChange={(e) => setMemberId(e.target.value)}>
                                                <option value={0}>----Select Member----</option>

                                                {
                                                    member.length > 0 ? member.map((item, index) => (
                                                        <option key={item._id} value={item._id}>{item.firstname}</option>
                                                    ))
                                                        : <option value={0}>No Records Founds!</option>
                                                }
                                            </select>
                                        </center>
                                    </div>

                                    <div className='col-md-12'>
                                        <br />
                                        <label for='' style={{ paddingLeft: "38px" }}><b>ISBN No:</b></label><br />

                                        <center>
                                            <input type="number" placeholder="Enter ISBN No." className="txtisbnono" title="Enter ISBN No." value={ISBN_no} onChange={(e) => setBookISBNNo(e.target.value)} id='txtisbnono' required />
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={IssueBook} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Book
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>Subcategory</th>
                                <th>ISBN_no</th>
                                <th>Edition</th>
                                <th>Publish-on</th>
                                <th>Quan-tity</th>
                                <th>PDF</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                book.length > 0 ? book.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{ width: "8%" }}>{index + 1}</th>
                                        <td style={{ width: "11%" }}>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>{item.publisher}</td>
                                        <td style={{ width: "11%" }}>{item['subcategoryid'][0].subcategory_name}</td>
                                        <td style={{ width: "11%" }}>{item.ISBN_no}</td>
                                        <td>{item.edition}</td>
                                        <td style={{ width: "5%" }}>{item.published_on}</td>
                                        <td style={{ width: "3%" }}>{item.quantity}</td>
                                        <td style={{ width: "5%" }}><a href={"http://localhost:5000" + item.pdf} target="_blank">PDF</a></td>
                                        <td style={{ width: '8%' }}>
                                            <center>
                                                <button
                                                    onClick={() =>
                                                        deleteBook(
                                                            item._id
                                                        )
                                                    }
                                                    style={{
                                                        width: '30px',
                                                        borderRadius: '5px',
                                                        backgroundColor:
                                                            'white',
                                                        border: '0px'
                                                    }}
                                                >
                                                    <i
                                                        className='fa fa-trash'
                                                        style={{
                                                            padding: 2,
                                                            color: 'red'
                                                        }}
                                                    />
                                                </button>

                                                <button data-bs-toggle="modal" data-bs-target="#issuebookdetailmodal" onClick={() => { SelectBookById(item._id); getMemberDetails() }} style={{ width: "20px", backgroundColor: "white", border: "0px" }}><i className="fa fa-hand-pointer-o" style={{ color: "green" }} /></button>
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
    );
};

export default LibrarianDashboard;