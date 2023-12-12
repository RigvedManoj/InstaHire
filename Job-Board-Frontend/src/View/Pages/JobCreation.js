import React, {useState} from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // Import your CSS file for styling

const JobCreation = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        application_deadline: '',
        min_salary: '',
        max_salary: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async e => {
        console.log(formData)
        e.preventDefault();
        const job = {
            title: formData.title,
            company: formData.company,
            description: formData.description,
            location: formData.location,
            deadline: formData.deadline,
            min_salary: formData.min_salary,
            max_salary: formData.max_salary,
        };
        debugger;
        let data;
        try {
            const resp = await axios.post(
                'http://localhost:8000/jobCreate/',
                formData,
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
        navigate('/login');
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Personal Details</legend>
                <div className="form-group">
                    <label>
                        Job Title:
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Company:
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange}/>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Job Description:
                        <br />
                        <textarea name="description" cols="30" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                    </label>
                </div>

                <div className="form-group">
                <label>
                    Job Location:
                    <br />
                    <textarea name="location" cols="30" rows="3" value={formData.location} onChange={handleInputChange}></textarea>
                </label>
                 </div>

                <div className="form-group">
                    <label>
                        Application Deadline:
                        <input type="date" name="application_deadline" value={formData.application_deadline} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Min Salary:
                        <input type="number" name="min_salary" value={formData.min_salary} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Max Salary:
                        <input type="number" name="max_salary" value={formData.max_salary} onChange={handleInputChange} />
                    </label>
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>

            </fieldset>
        </form>
    );
};

export default JobCreation;

