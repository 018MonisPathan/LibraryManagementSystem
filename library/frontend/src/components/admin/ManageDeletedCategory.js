import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const { VerifyToken } = require('../AuthGuard');

const ManageDeletedCategory = () =>
{

    const[delcategory,setDelCategory]=useState("");
    
    useEffect(()=>{
        VerifyToken();
        getdeletedcategory();
    },[])

    const getdeletedcategory =async ()=>{
        try{
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            let result= await fetch("http://localhost:5000/category/SelectDeactiveCategories",{
                headers:{
                    "authorization": token
                }
            });
            result = await result.json();
            if(result)
            {
                setDelCategory(result.data);
            }else{
                console.log("Something went wrong");
            }
        }catch(err){
            console.log(err.message);
            console.log("Server Error");
        }
    }

    const softdeleteCategory=async(id)=>{ 
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to see this record here!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if(willDelete){

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/category/SoftDeleteCategory/${id}`,{
                method: 'PATCH',
                headers:{
                    "authorization": token
                }
            });

            result = result.json();

             console.log(result);

            if(result){
                swal({
                    title: "Delete Category",
                    text: "Category Deleted Successfully!",
                    icon: "success",
                });
                getdeletedcategory();
            }else{
                swal({
                    title: "Delete Category",
                    text: "Category Deletion Fail!!",
                    icon: "warning",
                });
            }
        }else{
            swal("Category record is safe!");
        }
    }
    return(
        <div className="managecategory container">

        <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Deleted Category</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Category</li>
                        <li className="breadcrumb-item">Manage Deleted Category</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Category
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Category Name</th>
                                <th>Category Description</th>
                                <center>
                                    <th>Option</th>
                                </center>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {
                                            delcategory.length > 0 ? delcategory.map((item, index) => (
                                                <tr key={item._id}>
                                                    <th scope="row" style={{width: "8%"}}>{index + 1}</th>
                                                    <td style={{width: "20%"}}>{item.category_name}</td>
                                                    <td style={{width: "50%"}}>{item.description}</td>
                                                    <td style={{width: "8%"}}>
                                                        <center>
                                                            <button onClick={()=>softdeleteCategory(item._id)} style={{width:"30px",borderRadius: "5px", backgroundColor: "white", border: "0px"}}>
                                                                <i className="fa fa-recycle" style={{ padding: 2, color: "green", fontSize: 16 }} />
                                                            </button>

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

export default ManageDeletedCategory;