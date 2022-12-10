import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
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

            let result = await fetch("http://localhost:5000/AddBook/SelectActiveBooks",{
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
    const deleteBook=async(id)=>{
        try{
            //return alert(id);
            const willDelete = await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to see this record here!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

            if(willDelete){

                let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
                let result = await fetch(`http://localhost:5000/AddBook/ChangeFlagstatus/${id}`,{
                    method: 'PATCH',
                    headers:{
                        "authorization": token
                    }
                });

                result = await result.json();

                if(result){
                    swal({
                        title: "Delete Book",
                        text: "Book Deleted Successfully!",
                        icon: "success"
                    });
                    getAllBook();
                }else{
                    swal({
                        title: "Delete Book",
                        text: "Book Deletion fail!",
                        icon: "warning"
                    });
                }
            }else{
                swal("Book record is safe!");
            }

        }catch(err){
            return console.log("Error while deleting subcategory!");
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

                                                <Link
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
                                                </Link>
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