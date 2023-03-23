import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const ManageSubCategory = () => {

    const [subcategoryid,setSubCategoryId] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [category, setCategory] = useState("");
    const [categoryid, setCategoryid] = useState("");
    const [categoryname,setCategoryName] = useState("");
    const [subcategory_name, setSubCategoryname] = useState('');
    const [subcategory_description, setSubCategoryDescription] = useState('');

    useEffect(() => {
        getcategoryname();
        VerifyToken();
        //getAllCategory();
        getAllSubCategory();
    }, [])

    //Get All SubCategory

    const getAllSubCategory = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/subcategory/SubSelectActiveCategory", {
                headers: {
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

    const deleteSubCategory = async (id) => {
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
                let result = await fetch(`http://localhost:5000/subcategory/SoftDeleteSubCategory/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "authorization": token
                    }
                });

                result = await result.json();

                if (result) {
                    swal({
                        title: "Delete SubCategory",
                        text: "SubCategory Deleted Successfully!",
                        icon: "success"
                    });
                    getAllSubCategory();
                } else {
                    swal({
                        title: "Delete Member",
                        text: "SubCatgory Deletion fail!",
                        icon: "warning"
                    });
                }
            } else {
                swal("Subcategory record is safe!");
            }

        } catch (err) {
            return console.log("Error while deleting subcategory!");
        }
    }

    //Get category details

    const getcategoryname = async () => {
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch("http://localhost:5000/category/SelectActiveCategory", {
            headers: {
                "authorization": token
            }
        });

        result = await result.json();

        //console.info(result.data);
        setCategory(result.data);
    }

    //Get AllSubCategory details

    const getAllSubCategoryById = async (id) => {
        //return alert(params.id);

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch(`http://localhost:5000/subcategory/SubCategoryById/${id}`, {
            headers: {
                "authorization": token
            }
        });

        result = await result.json();
        console.log(result);

        console.log(result.data._id);

        setSubCategoryId(result.data._id);
        setCategoryName(result.data['categoryid'][0].category_name);
        setCategoryid(result.data.categoryid[0]._id)
        setSubCategoryname(result.data.subcategory_name);
        setSubCategoryDescription(result.data.subcategory_description);
    }

    //Update subcategory details

    const UpdateSubCategoryById = async() => {

        // return console.log(categoryid,subcategory_name,subcategory_description,subcategoryid);

        if(categoryid != "" || subcategory_name != "" || subcategory_description != ""){
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/subcategory/SubUpdateCategory/${subcategoryid}`,{
                method: "PATCH",
                body: JSON.stringify({categoryid,subcategory_name,subcategory_description}),
                headers: {
                    'Content-Type': 'application/json',
                    "authorization":token
                }
            });

            //return console.log(result.json());

            if(result){
                swal({
                    title: 'Update SubCategory',
                    text: 'SubCategory Updated Successfully!',
                    timer: 2000
                });

                getAllSubCategory()
            }else{
                swal({
                    title: 'Update SubCategory',
                    text: 'SubCategory Updation Failed!',
                    timer: 2000
                });
            }
        }else{
            swal({
                title: 'Update SubCategory',
                text: 'Please Fill all the details!',
                timer: 2000
            });
        }
    }

    return (
        <div className="managesubcategory container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div className="breadcrumb-title bottom-left">
                    <h2>Manage SubCategory</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">SubCategory</li>
                        <li className="breadcrumb-item">ManageSubCategory</li>
                    </ul>
                </div>
            </div>

            <div class="modal fade" id="updatesubcategorydetailmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update SubCategory details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='changePwd_modal_body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <label for='catname' style={{ paddingLeft: "38px" }}><b>Category Name:</b></label>
                                        <center>
                                            <select className='ddlsubcategory' onChange={(e) => setCategoryid(e.target.value)}>
                                                <option value={0}>----Select Category----</option>
                                                <option value={categoryid} selected>{categoryname}</option>

                                                {
                                                    category.length > 0 ? category.map((item, index) => (
                                                        <option key={item._id} value={item._id}>{item.category_name}</option>
                                                    ))
                                                        : <option value={0}>No Records Founds!</option>
                                                }
                                            </select>
                                        </center>
                                    </div>

                                    <div className='col-md-12'>
                                        <br />
                                        <label for='subcatname' style={{ paddingLeft: "38px" }}><b>SubCategory Name:</b></label>
                                        <center>
                                            <input type="text" placeholder="Enter SubCategory" className="txtsubcategoryname" title="Enter SubCategory" value={subcategory_name} onChange={(e) => setSubCategoryname(e.target.value)} id='txtsubcategoryname' required />
                                        </center>
                                    </div>

                                    <div className='col-md-12'>
                                        <br />
                                        <label for='subcatdescription' style={{ paddingLeft: "38px" }}><b>SubCategory Description:</b></label>
                                        <center>
                                            <input type="text" placeholder="Enter SubCategory description" className="txtsubcategorydesc" title="Enter SubCategory description" value={subcategory_description} onChange={(e) => setSubCategoryDescription(e.target.value)} id='txtsubcategorydesc' required />
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={UpdateSubCategoryById}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage SubCategory
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

                                                <button onClick={() => deleteSubCategory(item._id)} style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-trash" style={{ padding: 2, color: "red" }} />
                                                </button>

                                                {/* <Link to={"/admin/AddSubCategory/" + item._id}><i className="fa fa-edit" style={{ color: "green" }} /></Link> */}

                                                <button data-bs-toggle="modal" data-bs-target="#updatesubcategorydetailmodal"
                                                    onClick={() => { getAllSubCategoryById(item._id) }} style={{ width: "20px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-edit" style={{ color: "green" }} />
                                                </button>
                                            </center>
                                        </td>
                                    </tr>
                                ))
                                    : <tr> <td colSpan="3" style={{ textAlign: "center" }}><strong>No Records
                                        Founds!</strong></td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageSubCategory;