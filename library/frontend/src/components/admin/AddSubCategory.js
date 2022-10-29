import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AddSubCategory = () => {
    
    const [categoryid,setCategoryid] = useState("");
    const [subcategory_name, setSubCategoryname] = useState('');
    const [subcategory_description, setSubCategoryDescription] = useState('');
    const [error, setError] = useState(false);
    const [SubCategoryNameError, setSubCategoryNameError] = useState('');
    const [SubCategoryDescriptionError, setSubCategoryDescriptionError] = useState('')
    const [category, setCategory] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    //const [categoryid, setCategoryId] = useState("");

    useEffect(() => {
        getcategoryname();

        if(params.id){
            getAllSubCategoryForUpdate();
        }

    }, [])

    //Fill data in textbox for update.

    const getAllSubCategoryForUpdate=async()=>{
        //return alert(params.id);

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch(`http://localhost:5000/subcategory/SubCategoryById/${params.id}`,{
            headers:{
                "authorization": token
            }
        });

        result = await result.json();

        setCategoryid(result.data.categoryid)
        setSubCategoryname(result.data.subcategory_name);
        setSubCategoryDescription(result.data.subcategory_description);
        
    }

    const collectdata = async () => {

        if (
            !categoryid ||
            !subcategory_name ||
            !subcategory_description
            
        ) {
            setError(true);
            return false;
        }

        // return console.log(JSON.stringify({
        //     categoryid,
        //     subcategory_name,
        //     subcategory_description
        // }));
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

        //Check parameter id exist, if exist than update the record instead of add.

        if(params.id)
        {
            let result = await fetch(`http://localhost:5000/subcategory/SubUpdateCategory/${params.id}`,{
                method: "PATCH",
                body:JSON.stringify({categoryid,subcategory_name,subcategory_description}),
                headers:{
                    'Content-Type':'application/json',
                    "authorization": token
                }
            });

            result = await result.json();

            if(result){
                swal({
                    title: 'Update SubCategory',
                    text: 'SubCategory Updated successfully!',
                    icon: 'success'
                });
                navigate("/admin/ManageSubCategory");
                //return console.log("Subcategory updated");
            }else{
                swal({
                    title: 'Update SubCategory',
                    text: 'Something went wrong!',
                    icon: 'warning'
                });
                //return console.log("Error while updating subacategory");
            }
        }else{

            let result = await fetch("http://localhost:5000/subcategory/SubCategoryInsert/",{
                method: "post",
                body: JSON.stringify({
                    categoryid,
                    subcategory_name,
                    subcategory_description
                }),
                headers:{
                    'Content-Type':'application/json',
                    "authorization": token
                }
            });
    
            result = await result.json();
    
            console.log(result);
    
            if (result === 'SubCategory Already exists!') {
                swal({
                    title: 'Add SubCategory',
                    text: 'SubCategory Already exists!',
                    icon: 'warning'
                });
            } else {
                swal({
                    title: 'Add SubCategory',
                    text: 'SubCategory Added Successfully!',
                    icon: 'success'
                });
            }
        }
    }

    //Validate CategoryName
    const validateSubCategoryName = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(subcategory_name)) {
            setSubCategoryNameError('Please Enter Valid SubCategory Name!');
            return;
        } else {
            setSubCategoryNameError('');
        }
    };

    const validateSubCategoryDescription = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(subcategory_description)) {
            setSubCategoryDescriptionError('Please Enter Valid SubCategoryDescription!');
            return;
        } else {
            setSubCategoryDescriptionError('');
        }
    };

    //Get Categoryname
    const getcategoryname = async () => {
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch("http://localhost:5000/category/SelectActiveCategory",{
            headers:{
                "authorization": token
            }
        });

        result = await result.json();

        //console.info(result.data);
        setCategory(result.data);
    }

    return (
        <div className="addSubCategory">

            <div className="row">

                <div className="col-md-12">
                    <div className="addsubcategory-form">
                        <div className="card">
                            <div className="card-header">
                                <h3>Add SubCategory</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className='col-md-12'>
                                        <select className='ddlcategory' onChange={(e)=>setCategoryid(e.target.value)}>
                                            <option value={0}>----Select Category----</option>

                                            {
                                                category.length > 0 ? category.map((item, index) => (
                                                    <option key={item._id} value={item._id}>{item.category_name}</option>
                                                ))
                                                    : <option value={0}>No Records Founds!</option>
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Enter SubCategory" className="txtsubcategoryname" title="Enter SubCategory" value={subcategory_name} onChange={(e) => { setSubCategoryname(e.target.value); validateSubCategoryName(); }} id='txtsubcategoryname' required /><br />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}>
                                            {SubCategoryNameError}
                                        </span>

                                        {error && !subcategory_name && <span className="invalid-input" style={{ fontWeight: 'bold', color: 'red' }}>Please fill out this field!</span>}
                                    </div>
                                </div>


                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <textarea
                                            type='textarea'
                                            cols={50}
                                            rows={4}
                                            placeholder='Enter SubCategory Description'
                                            className='txtsubcategorydescription'
                                            value={subcategory_description}
                                            onChange={(e) => {
                                                setSubCategoryDescription(e.target.value);
                                                validateSubCategoryDescription();
                                            }}
                                            title='Enter SubCategory Description'
                                            required
                                        /><br />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {SubCategoryDescriptionError}
                                        </span>


                                        {/* print empty field message */}
                                        {error && !subcategory_description && (
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                Please fill out this field!
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <center>
                                        <button type="button" onClick={collectdata} className="btn btn-success">Add</button>
                                    </center>
                                </div>

                                {/* <div className="mt-3 mb-0">
                <p>If you don't have an account? <Link to="/signup">SignUp Here....</Link></p>
            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default AddSubCategory;