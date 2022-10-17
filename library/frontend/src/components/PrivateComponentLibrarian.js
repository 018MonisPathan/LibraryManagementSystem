import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import LibrarianSidebar from "../layouts/librariansidebar";
// Private Route OR Private Component

const PrivateComponentLibrarian = () => {
    //console.log("private");
    const auth = sessionStorage.getItem('role');
     return auth ? <><LibrarianSidebar/><Outlet/></> : <Navigate to="/login" />

   
}

export default PrivateComponentLibrarian;