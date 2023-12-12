import React, {useState} from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // Import your CSS file for styling

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        salutation: '',
        firstName: '',
        lastName: '',
        gender: null,
        email: '',
        birthDate: '',
        address: '',
        resume: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Handle checkbox separately
        if (type === 'file') {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async e => {
        /*e.preventDefault();
        const user = {
            username: formData.username,
            password: formData.password
        };
        // Create the POST requuest
        debugger;

        let data;
        try {
            const resp = await axios.post(
                'http://localhost:8000/token/',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            data = resp.data;
        } catch (error) {
            alert('Oops! Something went wrong. Please try again later.');
            return;
        }


        debugger;

        // Initialize the access & refresh token in localstorage.
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] =
            `Bearer ${data['access']}`;
        if (formData.isEmployer === true ) {
            navigate('/employer-home'); // Redirect to employer home
        } else  {
            navigate('/applicant-home'); // Redirect to applicant home
        }

         */
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Personal Details</legend>

                <div className="form-group">
                    <p>
                        Salutation
                        <br />
                        <select name="salutation"  onChange={handleInputChange} value={formData.salutation}>
                            <option>--None--</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                            <option>Dr.</option>
                            <option>Prof.</option>
                        </select>
                    </p>
                </div>

                <div className="form-group">
                    <label>
                        First name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Last name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
                    </label>
                </div>

                <div className="form-group">
                    Gender:
                    <label>
                        <input type="radio" name="gender" value="male" onChange={handleInputChange} /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" onChange={handleInputChange} /> Female
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Date of Birth:
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Address:
                        <br />
                        <textarea name="address" cols="30" rows="3" value={formData.address} onChange={handleInputChange}></textarea>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Resume:
                        <input type="file" name="resume" onChange={handleInputChange}/>
                    </label>
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>

            </fieldset>
        </form>
    );
};

export default JobApplicationForm;

