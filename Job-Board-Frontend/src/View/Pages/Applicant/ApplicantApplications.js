import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../Login.css';
import axios from "axios";

export const ApplicantApplications = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        isEmployer: false
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {

    };

    const handleSubmit = async e => {

    }
    return (
        <div>
            <h1>Welcome to the Applicant Applications Page</h1>

        </div>

    );
};

export default ApplicantApplications;