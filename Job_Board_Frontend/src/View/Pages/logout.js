// Logout.js clears all local storage and routes to login page.

import {useEffect, useState} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";
export const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/')
    }, []);
    return (
       <div></div>
     )
}
