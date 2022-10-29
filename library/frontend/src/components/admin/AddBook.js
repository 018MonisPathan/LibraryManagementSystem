import React, { useState, useEffect } from 'react';
import { mockComponent } from 'react-dom/test-utils';
// import {Outlet} from 'react-router-dom';
import swal from 'sweetalert';
import validator from 'validator';
const { VerifyToken } = require('../AuthGuard');

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [subcategoryid, setSubCategoryID] = useState('');
    const [ISBN_no, setISBNno] = useState('');
    const [edition, setEdition] = useState('');
    const [published_on, setPublishedon] = useState('');
    const [quantity, setQuantitity] = useState('');
    const [pdf, setPdf] = useState("");

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

   // const [categoryid,setCategoryid] = useState("");
    
    const [subcategorystatus,setSubcategorystatus] = useState(true);

    useEffect(() => {
        VerifyToken();
        getcategoryname();
    }, []);

    const collectdata = async () => {
        //setTotalissuedbooks(total_issued_books,"0");

        console.log(
            title,
            subcategoryid,
            ISBN_no,
            edition,
            author,
            publisher,
            published_on,
            quantity,
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
            !subcategoryid ||
            !ISBN_no ||
            !edition ||
            !author ||
            !publisher ||
            !published_on ||
            !quantity ||
            !pdf
        ) {
            setError(true);
            return false;
        }

        // const formdata = new FormData();

        // formdata.append('title',title);
        // formdata.append('author',author);
        // formdata.append('publisher',publisher);
        // formdata.append('subcategoryid',subcategoryid);
        // formdata.append('ISBN_no',ISBN_no);
        // formdata.append('edition',edition);
        // formdata.append('published_on',published_on);
        // formdata.append('quantity',quantity);
        // formdata.append('pdf',pdf);

        // console.warn(formdata);

        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch('http://localhost:5000/AddBook/BookInsert', {
            method: 'post',
             body: JSON.stringify({
                title,
                subcategoryid,
                ISBN_no,
                edition,
                author,
                publisher,
                published_on,
                quantity,
                pdf
                //formdata
            }),
            headers: {
                'Content-Type': 'application/json',
                "authorization":token
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
        var pattern = new RegExp(/^[0-9]{13}$/);
        if (!pattern.test(ISBN_no)) {
            setISBNnoError('Please Enter Valid ISBNno (13 digits)!');
            return;
        } else {
            setISBNnoError('');
        }
    };
    const validateEdition = (e) => {
        var pattern = new RegExp(/^[a-zA-Z0-9 ]*$/);
        if (!pattern.test(edition)) {
            setEditionError('Please Enter Valid ISBNno!');
            return;
        } else {
            setEditionError('');
        }
    };

    const validatePublishedon = (e) => {
        var pattern = new RegExp(/[A-Za-z ]+/);
        if (!pattern.test(published_on)) {
            setPublishedonError('Please Enter Valid Publisedon!');
            return;
        } else {
            setPublishedonError('');
        }
    };

    const validateQuantity = (e) => {
        var pattern = new RegExp(/^[0-9]+$/);
        if (!pattern.test(quantity)) {
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

    //Get Categoryname
    const getcategoryname = async () => {
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch("http://localhost:5000/category/SelectAllCategory",{
            headers:{
                "authorization":token
            }
        });

        result = await result.json();

        //console.info(result.data);
        setCategory(result.data);
    };

     //Get Categoryname
     const getsubcategorynameby_cateagoryid = async (categoryid) => {
        let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
        let result = await fetch(`http://localhost:5000/subcategory/selectSubcategoryByCategoryID/${categoryid}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "authorization":token
            }
        });
        
        result = await result.json();

        //console.info(result.data);
        setSubCategory(result.data);
    }
    const onchangeHandel = (e) => {
        
        //setCategoryid(e.target.value);
        setSubcategorystatus(false);
        getsubcategorynameby_cateagoryid(e.target.value);
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
                                <form>

                                    <div className='row mt-3'>
                                        <div className='col-md-4'>
                                            <input
                                                type='text'
                                                placeholder='Enter Title'
                                                className='txtemail'
                                                title='Enter Title'
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                    validateTitle();
                                                }}
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
                                                onChange={(e) => {
                                                    setAuthor(e.target.value);
                                                    validateAuthor();
                                                }}
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
                                                onChange={(e) => {
                                                    setPublisher(e.target.value);
                                                    validatePublisher();
                                                }}
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
                                        <div className='col-md-auto'>
                                            {/* dateid.max=new
                                            Date().toISOString().split("T")[0]; */}
                                            <select
                                                className='dropdownCategory'
                                                onChange={(e) => {
                                                    onchangeHandel(e);
                                                }}
                                            >
                                                <option value={0}>
                                                    Select Category
                                                </option>

                                                {category.length > 0 ? (
                                                    category.map((item, index) => (
                                                        <option
                                                            key={item._id}
                                                            value={item._id}
                                                        >
                                                            {item.category_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value={0}>
                                                        No Records Founds!
                                                    </option>
                                                )}
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

                                        <div className='col-md-auto'>
                                            <select
                                                className='dropdownSubCategory'
                                                value={subcategoryid}
                                                disabled={subcategorystatus}
                                                onChange={(e) => {
                                                    setSubCategoryID(e.target.value);
                                                }}
                                            >
                                                <option value={0}>
                                                    Select SubCategory
                                                </option>

                                                {subcategory.length > 0 ? (
                                                    subcategory.map((item, index) => (
                                                        <option
                                                            key={item._id}
                                                            value={item._id}
                                                        >
                                                            {item.subcategory_name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value={0}>
                                                        No Records Founds!
                                                    </option>
                                                )}
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
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-4'>
                                            <input
                                                type='number'
                                                placeholder='Enter ISBN no'
                                                className='txtemail'
                                                value={ISBN_no}
                                                onChange={(e) => {
                                                    setISBNno(e.target.value);
                                                    validateISBNno();
                                                }}
                                                title='Enter ISBN no'
                                                required
                                                min={0}
                                                
                                            
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
                                            {error && !ISBN_no && (
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
                                                placeholder='Enter Edition'
                                                className='txtemail'
                                                title='Enter Edition'
                                                value={edition}
                                                onChange={(e) => {
                                                    setEdition(e.target.value);
                                                    validateEdition();
                                                }}
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
                                                value={published_on}
                                                onChange={(e) =>
                                                    setPublishedon(e.target.value)
                                                }
                                                required
                                                max={testdisable()}
                                            />
                                            {error && !published_on && (
                                                <span
                                                    className='invalid-input'
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: 'red'
                                                    }}
                                                >
                                                    Published On Date!
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-4'>
                                            {/* dateid.max=new
                                            Date().toISOString().split("T")[0]; */}

                                            <input
                                                type='number'
                                                placeholder='Enter Quantity'
                                                className='txtemail'
                                                title='Enter Quantity'
                                                value={quantity}
                                                onChange={(e) => {
                                                    setQuantitity(e.target.value);
                                                    validateQuantity();
                                                }}
                                                required
                                                min={0}
                                            />
                                            <span
                                                className='invalid-input'
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'red'
                                                }}
                                            >
                                                {quantitityError}
                                            </span>
                                            {error && !quantity && (
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
                                                type='file'
                                                className='txtusername'
                                                title='Select PDF'
                                                //value={pdf}
                                                onChange={(e) => {

                                                    setPdf(e.target.files[0]);
                                                    // validatePDF();
                                                    //console.warn(pdf);
                                                }}
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
                                </form>

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
