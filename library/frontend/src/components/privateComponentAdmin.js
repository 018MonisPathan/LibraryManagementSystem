import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Private Route OR Private Component
const PrivateComponentAdmin = () => {
    const auth = sessionStorage.getItem('role');
    return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateComponentAdmin;