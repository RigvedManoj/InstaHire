/* This file contains the logic for viewing all applicants who have applied to the jobs created by an employer.
List of applicant information is fetched from backend matching employer id.
Each applicant information can be viewed by clicking on the specific grid.
This file can navigate to employer home, create job and view applicant.*/

import React, {useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

export const EmployerApplications = () => {
    const employer = localStorage.getItem("username")
    const [applicationsData, setApplicationsData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Applications');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Profile'){ navigate("/employer-home")}
        if (tab === 'Create Job'){ navigate("/job-creation")}
        if (tab === 'Logout'){ navigate("/logout")}
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
    const handleRowClick = (application) => {
        if(application.status === 'Received'){
            localStorage.setItem('applicant_username', application.applicant_username);
            localStorage.setItem('employer_username', application.employer_username);
            localStorage.setItem('application_id', application.application_id);
            localStorage.setItem('job_id', application.job_id);
            navigate("/view_applicant")
        }
    };
    useEffect(() => {
        // Function to fetch data from the backend
        const fetchData = async () => {
            try {
                const resp = await axios.get(
                    'http://localhost:8000/employer/applications/',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'employer_username': employer
                        }
                    }
                );
;
                if(resp.data.length !== 0){
                    setApplicationsData(resp.data);

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
                <h1>Applications List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Application_ID</th>
                        <th>Job_ID</th>
                        <th>Job Title</th>
                        <th>Applicant</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applicationsData.map((application,index) => (
                        <tr key={application.id} onClick={() => handleRowClick(application)}>
                            <td>{application.application_id}</td>
                            <td>{application.job_id}</td>
                            <td>{jobsData[index] && jobsData[index].title}</td>
                            <td>{application.applicant_username}</td>
                            <td>{application.status}</td>

                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>
    );

};
