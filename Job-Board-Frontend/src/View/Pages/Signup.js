// Signup.js
import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async e => {
      try{  
          e.preventDefault();
          const user = {
                  username: formData.name,
                  password: formData.password,
                  email: formData.email
              };
          // Create the POST requuest
          debugger;

          const { data } = await axios.post(
              'http://localhost:8000/signup/',
              user,
              {
              headers: {
                  'Content-Type': 'application/json'
              }
              }
          );
          debugger;
      } catch( error ){
          alert('Oops! Something went wrong. Please check your input parameters and try again :)');
          return;
      }
       // Initialize the access & refresh token in localstorage.      
 }

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