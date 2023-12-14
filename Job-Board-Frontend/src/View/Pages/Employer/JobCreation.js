import React, {useEffect, useState} from 'react';
import '../styles.css';
import {useNavigate} from "react-router-dom";
import axios from "axios"; // Import your CSS file for styling

export const JobCreation = () => {
    const navigate = useNavigate();
    const employer = localStorage.getItem("username")
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        application_deadline: '',
        min_salary: '',
        max_salary: '',
    });
    const [activeTab, setActiveTab] = useState('Create Job');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Profile'){ navigate("/employer-home")}
        if (tab === 'Applications'){ navigate("/employer-applications")}

    };
    const getSymbolForTab = (tab) => {
        switch (tab) {
            case 'Profile':
                return '👤';
            case 'Create Job':
                return '💼';
            case 'Applications':
                return '📄';
            default:
                return '';
        }
    };

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const resp = await axios.get(
                    'http://localhost:8000/employer/',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'username': employer
                        }
                    }
                );
                setFormData({...formData, ['company']: resp.data[0].company_name});
            } catch (error) {
                console.log(error);
                if(error.response.status === 403 || error.response.status === 401){
                    navigate('/')
                }
                else{
                    alert('Oops! Something went wrong. Please try again later.');
                }
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

    };

    const handleSubmit = async e => {
        console.log(formData)
        e.preventDefault();
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

        navigate('/employer-home');
    }

    return (
        <div>
            <div className="tab-list">
                {['Profile', 'Create Job', 'Applications'].map((tab) => (
                    <div
                        key={tab}
                        className={`tab-item ${tab === activeTab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        <span className="tab-symbol">{getSymbolForTab(tab)}</span>
                        {tab}
                    </div>
                ))}
            </div>
            <div className="profile-container">
                <h1>Create New Job</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="form-group">
                            <label>
                                Job Title:
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Company:
                                <input type="text" name="company" value={formData.company} disabled required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Job Description:
                                <br/>
                                <textarea name="description" cols="30" rows="3" value={formData.description}
                                          onChange={handleInputChange} required></textarea>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Job Location:
                                <br/>
                                <textarea name="location" cols="30" rows="3" value={formData.location}
                                          onChange={handleInputChange} required></textarea>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Application Deadline:
                                <input type="date" name="application_deadline" value={formData.application_deadline}
                                       onChange={handleInputChange} required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Min Salary:
                                <input type="number" name="min_salary" min="0" value={formData.min_salary}
                                       onChange={handleInputChange} required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Max Salary:
                                <input type="number" name="max_salary" min={formData.min_salary} value={formData.max_salary}
                                       onChange={handleInputChange} required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

