import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const ManageDeletedSubCategory = () => {

    const [subcategory, setSubCategory] = useState("");

    useEffect(() => {
        VerifyToken();
        //getAllCategory();
        getAllSubCategory();
    }, [])

    //Get All SubCategory
    
    const getAllSubCategory = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/subcategory/SubSelectDeactive",{
                headers:{
                    "authorization": token
                }
            });
            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setSubCategory(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (err) {
            console.log("Server Error");
        }
    }

    //delete subcategory by id

    const SoftdeleteSubCategory=async(id)=>{
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
                let result = await fetch(`http://localhost:5000/subcategory/SoftDeleteSubCategory/${id}`,{
                method: 'PATCH',
                headers:{
                    "authorization": token
                }
                    
                });

                result = await result.json();

                if(result){
                    swal({
                        title: "Delete SubCategory",
                        text: "SubCategory Deleted Successfully!",
                        icon: "success"
                    });
                    getAllSubCategory();
                }else{
                    swal({
                        title: "Delete Member",
                        text: "SubCatgory Deletion fail!",
                        icon: "warning"
                    });
                }
            }else{
                swal("Subcategory record is safe!");
            }

        }catch(err){
            return console.log("Error while deleting subcategory!");
        }
    }
    return (
        <div className="managesubcategory container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div className="breadcrumb-title bottom-left">
                    <h2>Manage Deleted SubCategory</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">SubCategory</li>
                        <li className="breadcrumb-item">Manage Deleted SubCategory</li>
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Deleted SubCategory
                </div>

                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SR No.</th>
                                <th>Category Name</th>
                                <th>Category Description</th>
                                <th>SubCategory Name</th>
                                <th>SubCategory Description</th>
                                
                                    <th>Option</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                subcategory.length > 0 ? subcategory.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{ width: "6%" }}>{index + 1}</th>
                                        <td style={{ width: "12%" }}>{item['categoryid'][0].category_name}</td>
                                        <td style={{ width: "32%" }}>{item['categoryid'][0].description}</td>
                                        <td style={{ width: "16%" }}>{item.subcategory_name}</td>
                                        <td style={{ width: "50%" }}>{item.subcategory_description}</td>
                                        <td style={{ width: "8%" }}>
                                            <center>

                                            <button onClick={()=>SoftdeleteSubCategory(item._id)} style={{width:"30px",borderRadius: "5px", backgroundColor: "white", border: "0px"}}>
                                                                <i className="fa fa-recycle" style={{ padding: 2, color: "green", fontSize: 16 }} />
                                                            </button>
    
                                            </center>
                                        </td>
                                    </tr>
                                ))
                                    : <tr><td colSpan="3" style={{ textAlign: "center" }}><strong>No Records
                                        Founds!</strong></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageDeletedSubCategory;