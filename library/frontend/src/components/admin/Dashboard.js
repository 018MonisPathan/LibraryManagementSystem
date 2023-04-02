import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { VerifyToken } = require('../AuthGuard');

const Dashboard = () => {

    const [totalActiveMembers, setTotalActiveMembers] = useState("");
    const [totalDeactiveMembers, setTotalDeactiveMembers] = useState("");
    const [totalActiveCategories, setTotalActiveCategories] = useState("");
    const [totalDeactiveCategories, setTotalDeactiveCategories] = useState("");
    const [totalActiveSubCategories, setTotalActiveSubCategories] = useState("");
    const [totalDeactiveSubCategories, setTotalDeactiveSubCategories] = useState("");
    const [totalAvailableBooks, setTotalAvailableBooks] = useState("");
    const [totalNotAvailableBooks, setTotalNotAvailableBooks] = useState("");

    useEffect(() => {
        VerifyToken();
        TotalActiveMembers();
        TotalDeactiveMembers();
        TotalActiveCategories();
        TotalDeactiveCategories();
        TotalActiveSubCategories();
        TotalDeactiveSubCategories();
        TotalAvailableBooks();
        TotalNotAvailableBooks();
    }, []);

    //Retrieve all active members count
    const TotalActiveMembers = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/countTotalActiveMembers", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalActiveMembers(result);
            } else {
                setTotalActiveMembers("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all Deactive members count
    const TotalDeactiveMembers = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/member/countTotalDeactiveMembers", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalDeactiveMembers(result);
            } else {
                setTotalDeactiveMembers("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all active categories count
    const TotalActiveCategories = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/category/countTotalActiveCategories", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalActiveCategories(result);
            } else {
                setTotalActiveCategories("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all active categories count
    const TotalDeactiveCategories = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/category/countTotalDeactiveCategories", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalDeactiveCategories(result);
            } else {
                setTotalDeactiveCategories("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all active subcategories count
    const TotalActiveSubCategories = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/subcategory/countTotalActiveSubcategories", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalActiveSubCategories(result);
            } else {
                setTotalActiveSubCategories("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all deactive subcategories count
    const TotalDeactiveSubCategories = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/subcategory/countTotalDeactiveSubcategories", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalDeactiveSubCategories(result);
            } else {
                setTotalDeactiveSubCategories("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all available books count
    const TotalAvailableBooks = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/AddBook/countTotalActiveBook", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalAvailableBooks(result);
            } else {
                setTotalAvailableBooks("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Retrieve all not available books count
    const TotalNotAvailableBooks = async () => {
        try {
            let token = sessionStorage.getItem("token").replace(/['"]+/g, '');
            let result = await fetch("http://localhost:5000/AddBook/countTotalDeactiveBook", {
                method: "GET",
                headers: {
                    "authorization": token
                }
            });

            result = await result.json();

            if (result > 0) {
                setTotalNotAvailableBooks(result);
            } else {
                setTotalNotAvailableBooks("0");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <div className='admin-dashboard'>

                <div className='row'>
                    <div className='col-md-4'>
                        <Link to={'/admin/ManageMember'} className='link-tag-css'>
                            <div className='box1'>
                                <div className='box-1-title'>
                                    Total Active Members
                                </div><br />
                                <div className='box-1-body'>
                                    <p>{totalActiveMembers}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4'>
                        <Link to={'/admin/ManageDeletedMember'} className='link-tag-css'>
                            <div className='box2'>
                                <div className='box-2-title'>
                                    Total Deactive Members
                                </div><br />
                                <div className='box-2-body'>
                                    <p>{totalDeactiveMembers}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4'>
                        <Link to={'/admin/ManageCategory'} className='link-tag-css'>
                            <div className='box3'>
                                <div className='box-3-title'>
                                    Total Active Categories
                                </div><br />
                                <div className='box-3-body'>
                                    <p>{totalActiveCategories}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div><br />

                <div className='row'>
                    <div className='col-md-4'>
                        <Link to={'/admin/ManageDeletedCategory'} className='link-tag-css'>
                            <div className='box4'>
                                <div className='box-4-title'>
                                    Total Deactive Category
                                </div><br />
                                <div className='box-4-body'>
                                    <p>{totalDeactiveCategories}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4'>
                        <Link to={'/admin/ManageSubCategory'} className='link-tag-css'>
                            <div className='box5'>
                                <div className='box-5-title'>
                                    Total Active SubCategory
                                </div><br />
                                <div className='box-5-body'>
                                    <p>{totalActiveSubCategories}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4'>
                        <Link to={'/admin/ManageDeletedSubCategory'} className='link-tag-css'>
                            <div className='box6'>
                                <div className='box-6-title'>
                                    Total Deactive SubCategory
                                </div><br />
                                <div className='box-6-body'>
                                    <p>{totalDeactiveSubCategories}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div><br />

                <div className='row'>
                    <div className='col-md-4'>
                        <Link to={'/admin/ManageBook'} className='link-tag-css'>
                            <div className='box7'>
                                <div className='box-7-title'>
                                    Total Available Books
                                </div><br />
                                <div className='box-7-body'>
                                    <p>{totalAvailableBooks}</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4'>
                        <Link to={'/admin/ManageDeletedBook'} className='link-tag-css'>
                            <div className='box8'>
                                <div className='box-8-title'>
                                    Total Not Available Books
                                </div><br />
                                <div className='box-8-body'>
                                    <p>{totalNotAvailableBooks}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard