import React, { useState, useEffect } from 'react';
import { mockComponent } from 'react-dom/test-utils';
//import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
const { VerifyToken } = require('../AuthGuard');

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcCategory] = useState('');
    const [isbnno, setISBNno] = useState('');
    const [edition, setEdition] = useState('');
    const [publishedon, setPublishedon] = useState('');
    const [quantitity, setQuantitity] = useState('');
    const [pdf, setPDF] = useState('');

    const [error, setError] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [publisherError, setPublisherError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [subcategoryError, setSubCategoryError] = useState('');
    const [isbnnoError, setISBNnoError] = useState('');
    const [editionError, setEditionError] = useState('');
    const [publishedonError, setPublishedonError] = useState('');
    const [quantitityError, setQuantitityError] = useState('');
    const [pdfError, setPDFError] = useState('');

    useEffect(() => {
        VerifyToken();
    }, []);

    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(
            title,
            author,
            publisher,
            category,
            subcategory,
            isbnno,
            edition,
            publishedon,
            quantitity,
            pdf
        );

        // useEffect(()=>{
        //     const auth = localStorage.getItem('user');
        //     if(auth){
        //         navigate('/');
        //     }
        // });

        if (
            !title ||
            !author ||
            !publisher ||
            !category ||
            !subcategory ||
            !isbnno ||
            !edition ||
            !publishedon ||
            !quantitity ||
            !pdf
        ) {
            setError(true);
            return false;
        }

        let result = await fetch('http://localhost:5000/member/register', {
            method: 'post',
            body: JSON.stringify({
                title,
                author,
                publisher,
                category,
                subcategory,
                isbnno,
                edition,
                publishedon,
                quantitity,
                pdf
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        console.log(result);

        if (result) {
            swal({
                title: 'Add Book',
                text: 'Book Added Successfully!',
                icon: 'success'
            });
        }

        //Used to store data in local storage.(It will remain until you remove menually.)
        // localStorage.setItem("token",JSON.stringify(result.auth));
    };

    const testdisable = () => {
        return new Date().toISOString().split('T')[0];
    };

    //Validate Title
    const validateTitle = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(title)) {
            setTitleError('Please Enter Valid title!');
            return;
        } else {
            setTitleError('');
        }
    };

    const validateAuthor = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(author)) {
            setAuthorError('Please Enter Valid Author!');
            return;
        } else {
            setAuthorError('');
        }
    };

    const validatePublisher = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(publisher)) {
            setPublisherError('Please Enter Valid publisher!');
            return;
        } else {
            setPublisherError('');
        }
    };

    const validateISBNno = (e) => {
        var pattern = new RegExp(/[0-9]+/);
        if (!pattern.test(publisher)) {
            setISBNnoError('Please Enter Valid ISBNno!');
            return;
        } else {
            setISBNnoError('');
        }
    };
    const validateEdition = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(edition)) {
            setEditionError('Please Enter Valid ISBNno!');
            return;
        } else {
            setEditionError('');
        }
    };

    const validatePublishedon = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(publishedon)) {
            setPublishedonError('Please Enter Valid Publisedon!');
            return;
        } else {
            setPublishedonError('');
        }
    };

    const validateQuantity = (e) => {
        var pattern = new RegExp(/[0-9]+/);
        if (!pattern.test(quantitity)) {
            setQuantitityError('Please Enter Valid Publisedon!');
            return;
        } else {
            setQuantitityError('');
        }
    };

    const validatePDF = (e) => {
        var pattern = new RegExp(/.+\.pdf$/);
        if (!pattern.test(pdfError)) {
            setPDFError('Please Enter Valid Format!');
            return;
        } else {
            setPDFError('');
        }
    };

    return (
        <div className='registerLibrarianStudent'>
            <div className='row'>
                <div className='col-md-3'></div>

                <div className=' col-md-12'>
                    <div className='registerLibrarianStudent-form'>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Add Book</h3>
                            </div>
                            <div className='card-body'>
                                <div className='row mt-3'>
                                    <div className='col-md-4'>
                                        <input
                                            type='text'
                                            placeholder='Enter Title'
                                            className='txtemail'
                                            title='Enter Title'
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
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
                                            {titleError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !title && (
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

                                    <div className='col-md-4'>
                                        <input
                                            type='text'
                                            placeholder='Enter Author'
                                            className='txtemail'
                                            title='Enter Author'
                                            value={author}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
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
                                            {authorError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !author && (
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
                                    <div className='col-md-4'>
                                        <input
                                            type='text'
                                            placeholder='Enter Publisher'
                                            className='txtemail'
                                            title='Enter Publisher'
                                            value={publisher}
                                            onChange={(e) =>
                                                setPublisher(e.target.value)
                                            }
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
                                            {publisherError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !publisher && (
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
                                <div className='col-md-4'>
                                        {/* dateid.max=new
                                        Date().toISOString().split("T")[0]; */}

                                        <select
                                            className='ddlrole'
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                        >
                                            <option value={'librarian'}>
                                                Category
                                            </option>
                                            <option value={'student'}>
                                                student
                                            </option>
                                        </select>

                                        {error && !category && (
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

                                    <div className='col-md-6'>
                                        <select
                                            className='ddlrole'
                                            value={subcategory}
                                            onChange={(e) =>
                                                setSubcCategory(e.target.value)
                                            }
                                        >
                                            <option value={'librarian'}>
                                                Subcategory
                                            </option>
                                            <option value={'student'}>
                                                student
                                            </option>
                                        </select>

                                        {/* print invalid input message */}
                                        <span
                                            className='invalid-input'
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}
                                        ></span>

                                        {/* print empty field message */}
                                        {error && !subcategory && (
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

                                    <div className='col-md-6'>
                                        <input
                                            type='number'
                                            placeholder='Enter ISBN no'
                                            className='txtemail'
                                            value={isbnno}
                                            onChange={(e) => {
                                                setISBNno(e.target.value);
                                                validateISBNno();
                                            }}
                                            title='Enter ISBN no'
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
                                            {isbnnoError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !isbnno && (
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
                                    <div className='col-md-4'>
                                        <input
                                            type='text'
                                            placeholder='Enter Edition'
                                            className='txtemail'
                                            title='Enter Edition'
                                            value={edition}
                                            onChange={(e) =>
                                                setEdition(e.target.value)
                                            }
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
                                            {editionError}
                                        </span>

                                        {/* print empty field message */}
                                        {error && !edition && (
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

                                    <div className='col-md-4'>
                                        <input
                                            id='dateid'
                                            type='date'
                                            className='txtdob'
                                            value={publishedon}
                                            onChange={(e) =>
                                                setPublishedon(e.target.value)
                                            }
                                            required
                                            max={testdisable()}
                                        />
                                        {error && !publishedon && (
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

                                    <div className='col-md-4'>
                                        {/* dateid.max=new
                                        Date().toISOString().split("T")[0]; */}

                                        <input
                                            type='number'
                                            placeholder='Enter Quantity'
                                            className='txtemail'
                                            title='Enter Quantity'
                                            value={quantitity}
                                            onChange={(e) =>
                                                setEdition(e.target.value)
                                            }
                                            required
                                        />
                                        {error && !quantitity && (
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
                                    <div className='col-md-6'>
                                        <input
                                            type='file'
                                            className='txtusername'
                                            title='Enter PDF'
                                            value={pdf}
                                            onChange={(e) =>
                                                setPDF(e.target.value)
                                            }
                                            required
                                        />

                                        {error && !pdf && (
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

export default AddBook;
