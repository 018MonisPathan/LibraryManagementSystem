import React,{useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {

  const adminauth = sessionStorage.getItem("role");

  let navigate = useNavigate();

  const logout = () =>{
    sessionStorage.clear();
    navigate("/login");
  }

  console.log("Helllo",adminauth);

  return (
    <div>
        
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Library Management System
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">

      <Link to='/home' className="nav-link">Home</Link>
        {
          adminauth ?
            <>
              <Link to='/login' className="nav-link" onClick={logout}>Logout</Link>

              
            </>
          :
            <>
              <Link to='/login' className="nav-link">Login</Link>
            </>
        }
      </div>
    </div>
  </div>
</nav>

    </div>
  );
};

export default Navbar;