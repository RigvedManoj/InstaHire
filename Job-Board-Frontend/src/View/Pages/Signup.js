// Signup.js
import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /*
        // Convert formData object to JSON
        const jsonData = JSON.stringify(formData);

        // Send JSON data to the backend using fetch
        fetch('http://backend-api-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                // Handle the response from the server as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors from the request
            });
         */
        // Here, you can perform form submission logic, such as sending data to an API
        console.log("FormData:", formData);
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
                        <input type="checkbox" id="checkbox1" name="option1"/>

                        <label htmlFor="checkbox2">Applicant</label>
                        <input type="checkbox" id="checkbox2" name="option2"/>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Signup;
