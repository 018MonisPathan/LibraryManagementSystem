import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const { VerifyToken } = require("../components/AuthGuard");

const Sidebar = () => {

  //const auth = sessionStorage.getItem("role");

  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    setFirstname(sessionStorage.getItem("firstname"));

  })

  return (


    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light  sidebar-div" style={{ width: 260, minHeight: '100vh' }}>

      <a href="#" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
        <svg className="bi me-4" width={30} height={27}><svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />

        </svg>

        </svg><span className="fs-5 fw-semibold"><Link to='/admin/profile'>{firstname.replace(/['"]+/g, '')}</Link></span></a>

      <ul className="list-unstyled ps-0">
        <li className="mb-1">
        <button className="btn btn-toggle align-items-center rounded" aria-expanded="false">
            <Link to='/admin/dashboard' style={{color:'rgba(0, 0, 0, .65)',textDecoration: 'none'}}>Dashboard</Link>
          </button><br/>
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#member-collapse" aria-expanded="false">
            Member
          </button>
          <div className="collapse" id="member-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to='/admin/ManageMember' className="link-dark rounded">Manage Member</Link></li>
              <li><Link to='/admin/registerlibrarianstudent' className="link-dark rounded">Add Member</Link></li>
              <li><Link to="/admin/ManageDeletedMember" className="link-dark rounded">View Deleted Members</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">

          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#category-collapse" aria-expanded="false">
            Category
          </button>
          <div className="collapse" id="category-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to='/admin/ManageCategory' className="link-dark rounded">Manage Category</Link></li>
              <li><Link to='/admin/AddCategory' className="link-dark rounded">Add Category</Link></li>

              <li><Link to='/admin/ManageDeletedCategory' className="link-dark rounded"> View Deleted Category</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#subcategory-collapse" aria-expanded="false">
            SubCategory
          </button>
          <div className="collapse" id="subcategory-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to='/admin/ManageSubCategory' className="link-dark rounded">Manage SubCategory</Link></li>
              <li><Link to='/admin/AddSubCategory' className="link-dark rounded">Add SubCategory</Link></li>
              <li><Link to='/admin/ManageDeletedSubCategory' className="link-dark rounded">Manage Deleted SubCategory</Link></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#book-collapse" aria-expanded="false">
            Book
          </button>
          <div className="collapse" id="book-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to='/admin/ManageBook' className="link-dark rounded">Manage Book</Link></li>
              <li><Link to='/admin/AddBook' className="link-dark rounded">Add Book</Link></li>
              <li><Link to="admin/ManageDeletedBook" className="link-dark rounded">View Deleted Books</Link></li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3" />
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#setting-collapse" aria-expanded="false">
            Settings
          </button>
          <div className="collapse" id="setting-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><Link to="/admin/ManageSettings" className="link-dark rounded">Manage Settings</Link></li>
              {/* <li><Link to='/admin/AddSetting' className="link-dark rounded">Add Settings</Link></li> */}
            </ul>
          </div>
        </li>
      </ul>
    </div>


  );
};
export default Sidebar;
