/* This file contains the logic to view an applicant information.
The information is view only and cannot be edited. The status of the application can be changed to accepted or rejected.
This file can navigate to employer home, employer application and create job.*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewApplicant.css';
import {useNavigate} from "react-router-dom";

export const ViewApplicant = () => {
    const navigate = useNavigate();
    const applicant = localStorage.getItem("applicant_username")
    const [formData, setFormData] = useState({
        username: applicant,
        first_name: '',
        last_name: '',
        gender: 'male',
        dob: '',
        email: '',
        phone_number: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        country: '',
        resume: null,
    });
    const [resumeLink, setResumeLink] = useState('');
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabClick = (tab) => {
        if (tab === 'Profile'){ navigate("/employer-home")}
        if (tab === 'Create Job'){ navigate("/job-creation")}
        if (tab === 'Applications'){ navigate("/employer-applications")}
        if (tab === 'Logout'){ navigate("/logout")}
    };

    const handleStatus = async(value) => {
            const application = {
                applicant_username: localStorage.getItem("applicant_username"),
                employer_username: localStorage.getItem("employer_username"),
                job_id: localStorage.getItem("job_id"),
                application_id: localStorage.getItem("application_id"),
                status: value,
            }
            console.log(application)
        try{
            // Rest of your code for sending the POST request
            const { data } = await axios.post(
                'http://localhost:8000/employer/applications/',
                application,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            navigate('/employer-applications')
        }
        catch (error) {
            console.log(error);
            alert('Oops! Something went wrong. Please check your input parameters and try again :)');
            return;
        }

    };

    const getSymbolForTab = (tab) => {
        switch (tab) {
            case 'Profile':
                return '👤';
            case 'Create Job':
                return '💼';
            case 'Applications':
                return '📄';
            case 'Logout':
                return '🚪';
            default:
                return '';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(
                    'http://localhost:8000/employerViewApplicant/',
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        params: {
                            'username': applicant
                        }
                    }
                );

                if(resp.data.length !== 0){
                    Object.keys(formData).forEach((key) => {
                        if(key !== 'resume'){
                            formData[key] = resp.data[0][key];
                        }
                    });
                    setResumeLink("http://localhost:8000/" + resp.data[0].resume);
                }

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

        fetchData();
    }, []);

    return (
        <div>
            <div className="tab-list">
                {['Profile', 'Create Job', 'Applications', 'Logout'].map((tab) => (
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
                <h1>User Profile</h1>
                <form>
                    <div className="row">
                        {/* Form Group (first name) */}
                        <div className="col-2">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                className="form-control"
                                id="firstName"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                disabled
                                required
                            />
                        </div>
                        {/* Form Group (last name) */}
                        <div className="col-2">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                className="form-control"
                                id="lastName"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                disabled
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="lastName">Gender:</label>
                            <input
                                className="form-control"
                                id="gender"
                                type="text"
                                name="gender"
                                value={formData.gender}
                                disabled
                                required
                            />
                        </div>
                        <div className="col-2">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                className="form-control"
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                disabled
                                required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="email">Email:</label>
                            <input className="form-control" type="email" id="email" name="email"
                                   value={formData.email}
                                   disabled
                                   required />
                        </div>

                        <div className="col-2">
                            <label htmlFor="phone">Phone Number:</label>
                            <input className="form-control" type="tel" id="phone" name="phone_number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                   value={formData.phone_number}
                                   disabled
                                   required />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="address_line1">Address Line 1:</label>
                            <input className="form-control" type="text" id="address_line1" name="address_line1"
                                   value={formData.address_line1}
                                   disabled
                                   required></input>
                        </div>
                        <div className="col-2">
                            <label htmlFor="address_line2">Address Line 2:</label>
                            <input className="form-control" type="text" id="address_line2" name="address_line2"
                                   value={formData.address_line2}
                                   disabled
                            ></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="city">City:</label>
                            <input className="form-control" type="text" id="city" name="city"
                                   value={formData.city}
                                   disabled
                                   required></input>
                        </div>
                        <div className="col-3">
                            <label htmlFor="state">State:</label>
                            <input className="form-control" type="text" id="state" name="state"
                                   value={formData.state}
                                   disabled
                                   required
                            ></input>
                        </div>
                        <div className="col-3">
                            <label htmlFor="country">Country:</label>
                            <input className="form-control" type="text" id="country" name="country"
                                   value={formData.country}
                                   disabled
                                   required
                            ></input>
                        </div>
                    </div>
                    {resumeLink?(
                        <div>
                            <div>
                                <a href={resumeLink} className="fancy-link" target="_blank" rel="noopener noreferrer">
                                    View last Uploaded Resume
                                </a>
                            </div>
                        </div>

                    ):<div/>}
                    <div className="button-container">
                        <div className="button-like-div" onClick={() => handleStatus('Accepted')} >Accept</div>
                        <div className="button-like-div" onClick={() => handleStatus('Rejected')}>Reject</div>
                    </div>
                </form>

            </div>
        </div>

    );
};

