import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const ManageBook = () =>{
    const[book,setBook] = useState("");

    useEffect(()=>{
        VerifyToken();
        getAllBook();
    })

    //Get all book
    const getAllBook = async () =>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result = await fetch("http://localhost:5000/AddBook/SelectAllBooks",{
                headers:{
                    "authorization":token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if(result)
            {
                setBook(result.data);
            }else{
                console.log("Something went wrong");
            }

        }catch(err)
        {
            console.log("server error");
        }
    }

    return(
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
                                                    <th scope="row" style={{width: "8%"}}>{index + 1}</th>
                                                    <td style={{width: "11%"}}>{item.title}</td>
                                                    <td>{item.author}</td>
                                                    <td>{item.publisher}</td>
                                                    <td style={{width: "11%"}}>{item['subcategoryid'][0].subcategory_name}</td>
                                                    <td style={{width: "11%"}}>{item.ISBN_no}</td>
                                                    <td>{item.edition}</td>
                                                    <td style={{width: "5%"}}>{item.published_on}</td>
                                                    <td style={{width: "3%"}}>{item.quantity}</td>
                                                    <td style={{width: "5%"}}><a href={"http://localhost:5000"+item.pdf} target="_blank">PDF</a></td>
                                                    <td style={{width: "8%"}}>
                                                        <center>
                                                            <i className="fa fa-trash" style={{ marginRight: 10, color: "#3f6ad" }} />
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
}

export default ManageBook;