import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const { VerifyToken } = require('../AuthGuard');

const ManageBook = () => {
    const [book, setBook] = useState("");
    const [bookid, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [edition, setEdition] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        VerifyToken();
        getAllBook();
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

        if (result) {
            setBookId(result.result._id);
            setTitle(result.result.title);
            setAuthor(result.result.author);
            setPublisher(result.result.publisher);
            setEdition(result.result.edition);
            setQuantity(result.result.quantity);
        }

        //return console.log(result);
    }

    //Update book details by book id.

    const UpdateBookById = async () => {
        //return title;

        //return console.log(bookid);
        if (title != "" || author != "" || publisher != "" || edition != "" || quantity != "") {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch(`http://localhost:5000/AddBook/UpdateBooks/${bookid}`, {
                method: "PATCH",
                body: JSON.stringify({title, author, publisher, edition, quantity}),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization":token
                }
            });

            if (result) {
                swal({
                    title: 'Update Book',
                    text: 'Book details Updated Successfully!',
                    timer: 2000
                });

                getAllBook();
            } else {
                swal({
                    title: 'Update Book',
                    text: 'Book details Updation failed!',
                    timer: 2000
                });
            }
        } else {
            swal({
                title: 'Update Book',
                text: 'Please fill all the details!',
                timer: 2000
            });
        }
    }

    return (
        <div className="managebook container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Book</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Book</li>
                        <li className="breadcrumb-item">Manage Book</li>
                    </ul>
                </div>
            </div>

            <div class="modal fade" id="updatebookdetailmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Book details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='changePwd_modal_body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label for='title' style={{ paddingLeft: "10px" }}><b>Title:</b></label>

                                        <input type="text" className="txtbooktitle" id='title' placeholder="Enter Book Title" title="Enter Book Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ border: "1px solid lightgray", width: "190px", height: "40px", borderRadius: "5px" }} />

                                    </div>

                                    <div className='col-md-6'>
                                        <label for='author' style={{ paddingLeft: "10px" }}><b>Author:</b></label>

                                        <input type="text" className="txtauthor" id='author' placeholder="Enter Author Name" title="Enter Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ border: "1px solid lightgray", width: "190px", height: "40px", borderRadius: "5px" }} />

                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>

                                        <br /><label for='author' style={{ paddingLeft: "10px" }}><b>Publisher:</b></label>

                                        <br /><input type="text" className="txtpublisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} id='publisher' placeholder="Enter Publisher" title="Enter Publisher" style={{ border: "1px solid lightgray", width: "190px", height: "40px", borderRadius: "5px" }} />

                                    </div>

                                    <div className='col-md-6'>

                                        <br /><label for='edition' style={{ paddingLeft: "10px" }}><b>Edition:</b></label>

                                        <br /><input type="text" className="txtedition" value={edition} onChange={(e) => setEdition(e.target.value)} id='edition' placeholder="Enter Edition" title="Enter Edition" style={{ border: "1px solid lightgray", width: "190px", height: "40px", borderRadius: "5px" }} />

                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>

                                        <br /><label for='quantity' style={{ paddingLeft: "10px" }}><b>Quantity:</b></label>

                                        <br /><input type="text" className="txtquantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} id='quantity' placeholder="Enter Quantity" title="Enter Quantity" style={{ border: "1px solid lightgray", width: "435px", height: "40px", borderRadius: "5px" }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={UpdateBookById} data-bs-dismiss="modal">Save changes</button>
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

                                                {/* <Link
                                                    to={
                                                        '/admin/AddBook/' +
                                                        item._id
                                                    }
                                                >
                                                    <i
                                                        className='fa fa-edit'
                                                        style={{
                                                            color: 'green'
                                                        }}
                                                    />
                                                </Link> */}

                                                <button data-bs-toggle="modal" data-bs-target="#updatebookdetailmodal" onClick={() => { SelectBookById(item._id) }} style={{ width: "20px", backgroundColor: "white", border: "0px" }}><i className="fa fa-edit" style={{ color: "green" }} /></button>
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

export default ManageBook;