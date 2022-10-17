import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import FacultySidebar from "../layouts/facultysidebar";
// Private Route OR Private Component

const PrivateComponentFaculty = () => {
    //console.log("private");
    const auth = sessionStorage.getItem('role');
     return auth ? <><FacultySidebar/><Outlet/></> : <Navigate to="/login" />

   
}

export default PrivateComponentFaculty;