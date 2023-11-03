import React, {useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/jobApplication");
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
                        <input type="checkbox" id="checkbox1" name="option1"/>

                        <label htmlFor="checkbox2">Applicant</label>
                        <input type="checkbox" id="checkbox2" name="option2"/>
                    </div>
                    <div>
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