import React, { useState } from 'react';
import swal from 'sweetalert';
import validator from 'validator';

const AddCategory = () => {
    const [CategoryName, setCategoryname] = useState('');
    const [Description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [CategoryNameError, setCategoryNameError] = useState('');
    const [DescriptionError, setDescriptionError] = useState('')
    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(
            CategoryName,
            Description,
            
        );

        if (
            !CategoryName ||
            !Description 
            
        ) {
            setError(true);
            return false;
        }

       
        let result = await fetch('http://localhost:5000/category/CategoryInsert/', {
            method: 'post',
            body: JSON.stringify({
                CategoryName,
                Description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        console.log(result);

        if (result) {
            swal({
                title: 'Add Category',
                text: 'Category Added Successfully!',
                icon: 'success'
            });
        }

        
    };

    //Validate CategoryName
    const validateCategoryName = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(CategoryName)) {
            setCategoryNameError('Please Enter Valid Category Name!');
            return;
        } else {
            setCategoryNameError('');
        }
    };

    const validateDescription = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(Description)) {
            setDescriptionError('Please Enter Valid Description!');
            return;
        } else {
            setDescriptionError('');
        }
    };

    
return(
<div>
<div className='row'>
                <div className='col-md-3'></div>

                <div className=' col-md-12' style={{paddingLeft:'129px'}}>
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
                                            value={CategoryName}
                                            onChange={(e) => {
                                                setCategoryname(e.target.value);
                                                validateCategoryName();
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
                                            {setCategoryNameError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !CategoryName && (
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
                                    <div className='col-md-5 textareaAddress' >
                                        <textarea
                                            type='textarea'
                                            cols={83}
                                            rows={4}
                                            placeholder='Enter Description'
                                            className=''
                                            value={Description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                                validateDescription();
                                            }}
                                            title='Enter Description'
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
                                            {DescriptionError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !Description && (
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
