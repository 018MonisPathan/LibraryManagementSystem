import React, { useState, useEffect } from 'react';

const { VerifyToken } = require('../AuthGuard');

const LibrarianManageIssueBook = () => {

    const [issuedbook, setIssuedBook] = useState("");

    useEffect(() => {
        getAllBook();
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
                                        <td>{item.issuedate}</td>
                                        <td>{item.duedate}</td>
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