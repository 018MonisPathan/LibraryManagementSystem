import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
const { VerifyToken } = require('../AuthGuard');

const StudentDashboard = () => {

    const [book, setBook] = useState("");

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

            //return console.log(result.data.quantity);

            if (result) {
                setBook(result.data);
            } else {
                console.log("Something went wrong");
            }

        } catch (err) {
            console.log("server error");
        }
    }

    return (
        <div className="studentdashboard container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Student Dashboard</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item">Available Books</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Books
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

                                        {
                                            item.quantity > 0 ? <>
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
                                                        
                                                    </center>
                                                </td>

                                            </> : <>

                                            </>
                                        }

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

export default StudentDashboard;