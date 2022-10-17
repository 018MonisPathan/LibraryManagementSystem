import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import StudentSidebar from "../layouts/studentsidebar";
// Private Route OR Private Component

const PrivateComponentStudent = () => {
    console.log("private");
    const auth = sessionStorage.getItem('role');
     return auth ? <><StudentSidebar/><Outlet/></> : <Navigate to="/login" />
   
}

export default PrivateComponentStudent;