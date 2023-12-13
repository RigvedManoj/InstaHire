import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from "axios";

export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        isEmployer: false
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
  
      // Handle checkbox separately
      if (type === 'checkbox') {
          setFormData({ ...formData, [name]: checked });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };

    const handleSubmit = async e => {
      e.preventDefault();
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
     localStorage.setItem('username',formData.username);
     localStorage.setItem('access_token', data.access);
     localStorage.setItem('refresh_token', data.refresh);
     axios.defaults.headers.common['Authorization'] = 
                                     `Bearer ${data['access']}`;
     if (formData.isEmployer === true ) {
          navigate('/employer-home'); // Redirect to employer home
     } else  {
          navigate('/applicant-home'); // Redirect to applicant home
     }
}
    return (
        <div>
        <h1 className="center">Job Board</h1>
        <div className="container">
            <div className="login-form">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
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
                    <div className="checkbox-group">
                        <label htmlFor="checkbox1">Employer</label>
                        <input type="checkbox" id="checkbox1" name="isEmployer" checked = {formData.isEmployer} onChange = {handleInputChange} />
                    </div>
                    <div className="button">
                        <button type="submit">Log In</button>
                    </div>
                    <div style={{paddingTop: 10 }}>
                        <Link className="link-class" to="/signup">New User? Sign Up Here</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;