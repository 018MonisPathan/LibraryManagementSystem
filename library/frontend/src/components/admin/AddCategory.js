import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import validator from 'validator';
const { VerifyToken } = require('../AuthGuard');
const AddCategory = () => {
    const [category_name, setcategory_name] = useState('');
    const [description, setdescription] = useState('');
    const [error, setError] = useState(false);
    const [category_nameError, setcategory_nameError] = useState('');
    const [descriptionError, setdescriptionError] = useState('');

    useEffect(() => { 
        VerifyToken();
    }, []);
    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(category_name, description);

        if (!category_name || !description) {
            setError(true);
            return false;
        }

        let result = await fetch(
            'http://localhost:5000/category/CategoryInsert/',
            {
                method: 'post',
                body: JSON.stringify({
                    category_name,
                    description
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        result = await result;

        console.log(result);

        if (result) {
            swal({
                title: 'Add Category',
                text: 'Category Added Successfully!',
                icon: 'success'
            });
        }
    };

    //Validate category_name
    const validatecategory_name = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(category_name)) {
            setcategory_nameError('Please Enter Valid Category Name!');
            return;
        } else {
            setcategory_nameError('');
        }
    };

    const validatedescription = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(description)) {
            setdescriptionError('Please Enter Valid description!');
            return;
        } else {
            setdescriptionError('');
        }
    };

    return (
        <div className='registerLibrarianStudent'>
            <div className='row'>
                <div className='col-md-3'></div>

                <div className=' col-md-12' >
                    <div className='registerLibrarianStudent-form'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Add Category</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <input
                                            type='text'
                                            placeholder='Enter Category'
                                            className='txtfname'
                                            title='Enter Category'
                                            value={category_name}
                                            onChange={(e) => {
                                                setcategory_name(
                                                    e.target.value
                                                );
                                                validatecategory_name();
                                            }}
                                            id='txtfname'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {category_nameError}
                                        </span>

                                        {/* print empty field message */}
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
                                    <div className='col-md-5 textareaAddress'>
                                        <textarea
                                            type='textarea'
                                            cols={83}
                                            rows={4}
                                            placeholder='Enter description'
                                            className=''
                                            value={description}
                                            onChange={(e) => {
                                                setdescription(e.target.value);
                                                validatedescription();
                                            }}
                                            title='Enter description'
                                            required
                                        />

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        >
                                            {descriptionError}
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
                                            className='btn btn-primary'
                                            onClick={collectdata}
                                        >
                                            Add
                                        </button>
                                    </center>
                                </div>

                                {/* <div>
                            <p>If you have an account? <Link to="/login">Login Here....</Link></p>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-md-1'></div>
            </div>
        </div>
    );
};

export default AddCategory;
