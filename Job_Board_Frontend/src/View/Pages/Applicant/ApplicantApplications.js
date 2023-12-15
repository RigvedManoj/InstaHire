/* This file contains the logic for viewing all applications created by the applicant.
List of application information is fetched from backend matching applicant id.
This file can navigate to applicant home and jobs list.*/

import React, {useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './ApplicantApplications.css';
import axios from "axios";

export const ApplicantApplications = () => {
    const applicant = localStorage.getItem("username")
    const [applicationsData, setApplicationsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Applications');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Jobs List'){ navigate("/applicant-jobs-list")}
        if (tab === 'Profile'){ navigate("/applicant-home")}
        if (tab === 'Logout'){ navigate("/logout")}
    };

    const getSymbolForTab = (tab) => {
        switch (tab) {
            case 'Profile':
                return '👤';
            case 'Jobs List':
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
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const resp = await axios.get(
                    'http://localhost:8000/applicant/applications/',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'applicant_username': applicant
                        }
                    }
                );

                if(resp.data.length !== 0){
                    setApplicationsData(resp.data);
                    console.log(resp)

                    const jobsPromises = resp.data.map(async (application) => {
                        const jobResp = await axios.get(
                            `http://localhost:8000/jobs/${application.job_id}`
                        );
                        return jobResp.data;
                    });

                    const jobsData = await Promise.all(jobsPromises);
                    setJobsData(jobsData);
                }
                console.log(applicationsData);


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

    return (
        <div>
            <div className="tab-list">
                {['Profile', 'Jobs List', 'Applications', 'Logout'].map((tab) => (
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
                <h1>Applications List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Application_ID</th>
                        <th>Job_ID</th>
                        <th>Job Title</th>
                        <th>Employer</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applicationsData.map((application,index) => (
                        <tr key={application.id}>
                            <td>{application.application_id}</td>
                            <td>{application.job_id}</td>
                            <td>{jobsData[index] && jobsData[index].title}</td>
                            <td>{application.employer_username}</td>
                            <td>{application.status}</td>

                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>
    );

};