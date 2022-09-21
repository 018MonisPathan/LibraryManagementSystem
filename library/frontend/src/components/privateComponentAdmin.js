import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from '../layouts/sidebar';
// Private Route OR Private Component

const PrivateComponentAdmin = () => {
    const auth = sessionStorage.getItem('role');
     return auth ? <><Sidebar/><Outlet/></> : <Navigate to="/login" />

   
}

export default PrivateComponentAdmin;