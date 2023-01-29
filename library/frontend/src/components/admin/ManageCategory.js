import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const { VerifyToken } = require('../AuthGuard');

const ManageCategory = () => {

    const [category, setCategory] = useState("");
    const[categoryid,setCategoryId] = useState("");
    const [category_name, setCategoryname] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        VerifyToken();
        getAllCategory();
    }, [])

    //Get All Category

    const getAllCategory = async () => {
        try {

            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

            //return console.log(token.replace(/['"]+/g, ''));

            let result = await fetch("http://localhost:5000/category/SelectActiveCategory", {
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            //return console.log(result.data);

            if (result) {
                setCategory(result.data);
            } else {
                console.log("Something went wrong");
            }
        } catch (err) {
            console.log("Server Error");
        }
    }

    //delete category by id

    const softdeleteCategory = async (id) => {

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
            let result = await fetch(`http://localhost:5000/category/SoftDeleteCategory/${id}`, {
                method: 'PATCH',
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result == "Category already exists in subcategory") {
                //return console.log("Category already exists in subcategory");
                swal({
                    title: "Delete Category",
                    text: "This category is already exists in subcategory!",
                    icon: "warning"
                });
            } else {
                getAllCategory();
                //return console.log("Category deletd");
                swal({
                    title: "Delete Category",
                    text: "Category deleted successfully!",
                    icon: "success"
                });
            }
        } else {
            swal("Category record is safe!");
        }
    }

    //Select category by id.

    const SelectCategoryById = async (id) => {
        //return console.log(id);

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

        let result = await fetch(`http://localhost:5000/category/CategoryById/${id}`,{
            headers:{
                "authorization":token
            }
        })

        result = await result.json();

        //return console.log(result);

        if(result){
            setCategoryId(result.data._id);
            setCategoryname(result.data.category_name);
            setDescription(result.data.description);
        }
    }

    //Update category by id

    const UpdateCategoryById = async () => {
        if(category_name != "" || description != ""){
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch(`http://localhost:5000/category/UpdateCategory/${categoryid}`,{
                method: "PATCH",
                body: JSON.stringify({category_name,description}),
                headers:{
                    'Content-Type': 'application/json',
                    "authorization":token
                }
            });

            if(result){
                swal({
                    title: 'Update Category',
                    text: 'Category Updated Successfully!',
                    timer: 2000
                });

                getAllCategory();
            }else{
                swal({
                    title: 'Update Category',
                    text: 'Category Updation Failed!',
                    timer: 2000
                });
            }
        }else{
            swal({
                title: 'Update Category',
                text: 'Please Fill all the details!',
                timer: 2000
            });
        }
    }

    return (
        <div className="managecategory container">

            <div className="breadcrumb-div breadcrumb-wrap bg-spring mb-4">
                <img className="breadcrumbimg" src={process.env.PUBLIC_URL + "/image/breadcrumb_img1.jpg"} alt="breadcrumb image" height={130} width={1210} />

                <div class="breadcrumb-title bottom-left">
                    <h2>Manage Category</h2>
                    <ul class="breadcrumb">
                        <li className="breadcrumb-item">Category</li>
                        <li className="breadcrumb-item">Manage Category</li>
                    </ul>
                </div>
            </div>

            <div class="modal fade" id="updatecategorydetailmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Category details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='changePwd_modal_body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <center>
                                            <input type="text" className="txtcategoryname" placeholder="Enter Category Name" value={category_name} onChange={(e)=>setCategoryname(e.target.value)} title="Enter Category Name" style={{border: "1px solid lightgray", width: "380px", height: "40px", borderRadius: "5px"}}/>
                                        </center>
                                    </div>

                                    <div className='col-md-12'>
                                        <center>
                                            <br/><textarea type="textarea" className="txtcategorydesc" rows={5} cols={50} placeholder="Enter Description" title="Enter Description" value={description} onChange={(e)=>setDescription(e.target.value)} style={{border: "1px solid lightgray", borderRadius: "5px"}}></textarea>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={UpdateCategoryById} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    Manage Category
                    <Link to="/admin/AddCategory" className='btn btn-info' style={{float: "right"}}><i className="fa fa-plus" style={{ color: "white" }} /></Link>
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
                                category.length > 0 ? category.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row" style={{ width: "8%" }}>{index + 1}</th>
                                        <td style={{ width: "20%" }}>{item.category_name}</td>
                                        <td style={{ width: "50%" }}>{item.description}</td>
                                        <td style={{ width: "8%" }}>
                                            <center>
                                                <button onClick={() => softdeleteCategory(item._id)} style={{ width: "30px", borderRadius: "5px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-trash" style={{ padding: 2, color: "red", fontSize: 16 }} />
                                                </button>

                                                {/* <Link to={"/admin/AddCategory/" + item._id}><i className="fa fa-edit" style={{ color: "green" }} /></Link> */}

                                                <button data-bs-toggle="modal" data-bs-target="#updatecategorydetailmodal"
                                                    onClick={() => { SelectCategoryById(item._id) }} style={{ width: "20px", backgroundColor: "white", border: "0px" }}>
                                                    <i className="fa fa-edit" style={{ color: "green" }} />
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

export default ManageCategory;