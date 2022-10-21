import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import validator from 'validator';
import { useParams,useNavigate } from 'react-router-dom';
const { VerifyToken } = require('../AuthGuard');

const AddCategory = () => {
    const [category_name, setCategoryname] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [CategoryNameError, setCategoryNameError] = useState('');
    const [DescriptionError, setDescriptionError] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        VerifyToken();

        if(params.id){
            getAllCategoryForUpdate();
        }

    }, []);

    //Fill data to textbox for update

    const getAllCategoryForUpdate=async()=>{
        
        //return alert(params.id);

        const token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch(`http://localhost:5000/category/CategoryById/${params.id}`,{
            headers:{
                "authorization":token
            }
        })

        result = await result.json();

        setCategoryname(result.data.category_name);
        setDescription(result.data.description);
    }

    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(category_name, description);

        if (!category_name || !description) {
            setError(true);
            return false;
        }
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');

        //Check parameter id exist, if exist than update the record instead of add.
        if(params.id){
            let result = await fetch(`http://localhost:5000/category/UpdateCategory/${params.id}`,{
                method: "PATCH",
                body: JSON.stringify({category_name,description}),
                headers:{
                    'Content-Type': 'application/json',
                    "authorization":token
                }
            })

            if(result)
            {
                swal({
                    title: 'Update Category',
                    text: 'Category Updated successfully!',
                    icon: 'success'
                });
                navigate("/admin/ManageCategory");
            }else{
                swal({
                    title: 'Update Category',
                    text: 'Something went wrong!',
                    icon: 'warning'
                });
            }
        }else{

            let result = await fetch(
                'http://localhost:5000/category/CategoryInsert',
                {
                    method: 'post',
                    body: JSON.stringify({
                        category_name,
                        description
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization":token
    
                    }
                }
            );
    
            result = await result.json();
    
            //return console.log(result);
    
            if (result === 'Category Already exists!') {
                swal({
                    title: 'Add Category',
                    text: 'Category Already exists!',
                    icon: 'warning'
                });
            } else {
                swal({
                    title: 'Add Category',
                    text: 'Category Added Successfully!',
                    icon: 'success'
                });
            }
        }

    };

    //Validate category_name
    const validateCategoryName = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(category_name)) {
            setCategoryNameError('Please Enter Valid Category Name!');
            return;
        } else {
            setCategoryNameError('');
        }
    };

    const validatedescription = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(description)) {
            setDescriptionError('Please Enter Valid Description!');
            return;
        } else {
            setDescriptionError('');
        }
    };

    return (
        <div className='addCategory'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='addcategory-form'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Add Category</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <input
                                            type='text'
                                            placeholder='Enter Category'
                                            className='txtcategoryname'
                                            title='Enter Category'
                                            value={category_name}
                                            onChange={(e) => {
                                                setCategoryname(e.target.value);
                                                validateCategoryName();
                                            }}
                                            id='txtcategoryname'
                                            required
                                        />
                                        <br />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {CategoryNameError}
                                        </span>

                                        {error && !category_name && (
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

                                <div className='row mt-3'>
                                    <div className='col-md-12'>
                                        <textarea
                                            type='textarea'
                                            cols={50}
                                            rows={4}
                                            placeholder='Enter Category Description'
                                            className='txtcategorydescription'
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                                validatedescription();
                                            }}
                                            title='Enter description'
                                            required
                                        />
                                        <br />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {DescriptionError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !description && (
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

                                <div className='mt-4'>
                                    <center>
                                        <button
                                            type='button'
                                            onClick={collectdata}
                                            className='btn btn-success'
                                        >
                                            Add
                                        </button>
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

export default AddCategory;
