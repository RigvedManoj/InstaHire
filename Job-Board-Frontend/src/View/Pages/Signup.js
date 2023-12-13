// Signup.js
import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isEmployer: false,  // Initial state for the checkboxes
        isApplicant: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // If the input is a checkbox, update the state based on whether it's checked or not
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = {
                username: formData.name,
                password: formData.password,
                email: formData.email,

            };

            // Rest of your code for sending the POST request
            debugger;
            const url = formData.isApplicant
                ? 'http://localhost:8000/signup/applicant'
                : formData.isEmployer
                    ? 'http://localhost:8000/signup/employer'
                    : 'http://localhost:8000/signup';

            const { data } = await axios.post(
                url,
                user,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            debugger;
        } catch (error) {
            alert('Oops! Something went wrong. Please check your input parameters and try again :)');
            return;
        }
    };

    return (
        <div>
            <h1 className="center">Job Board</h1>
            <div className="container">
                <div className="signup-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="checkbox-group">
                            <label htmlFor="checkbox1">Employer</label>
                            <input
                                type="checkbox"
                                id="checkbox1"
                                name="isEmployer"
                                checked={formData.isEmployer}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="checkbox2">Applicant</label>
                            <input
                                type="checkbox"
                                id="checkbox2"
                                name="isApplicant"
                                checked={formData.isApplicant}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;