import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './JobsList.css';

export  const JobsList = () => {
    const applicant = localStorage.getItem("username")
    const [jobsData, setJobsData] = useState([]);
    let application = {
        job_id: '',
        applicant_username: '',
        employer_username: '',
    };
    let applied = {};
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Applications');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Applications'){ navigate("/applicant-applications")}
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

    const checkApplied = async (jobId) => {
        const applicationsData = await axios.get('http://localhost:8000/applicant/applications/', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                'applicant_username': applicant
            }
        });

        if (applicationsData.data.length !== 0) {
            applicationsData.data.forEach((app) => {
                applied[app.job_id] = true;
            });
        }
        console.log("1 in applied:", 1 in applied)
        console.log("applied:",applied, applicationsData.data)
    };

    const handleApplyClick = async (jobId, jobCompany) => {
        console.log("company", jobCompany)
        const employerData = await axios.get('http://localhost:8000/applicantViewEmployer/', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                'company_name': jobCompany
            }
        });
        application = {
            job_id: jobId,
            applicant_username: applicant,
            employer_username: employerData.data[0].username,
        }
        try {
            // Rest of your code for sending the POST request
            const {data} = await axios.post(
                'http://localhost:8000/applicant/applications/',
                application,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
        }
        catch (error){
            console.log(error)
            alert("Could not apply")
        }
        checkApplied();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get('http://localhost:8000/jobs/', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("response:", resp.data[0].company)
                if(resp.data.length !== 0){
                    setJobsData(resp.data);
                }

            } catch (error) {
                console.log(error);
                if (error.response?.status === 403 || error.response?.status === 401) {
                    navigate('/');
                } else {
                    alert('Oops! Something went wrong. Please try again later.');
                }
            }
        };

        fetchData();
    }, [navigate]);

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

                <h1>Job Listings</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Job ID</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Application Deadline</th>
                        <th>Minimum Salary</th>
                        <th>Maximum Salary</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobsData.map((job, index) => (
                        <tr key={job.id}>
                            <td>{job.job_id}</td>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                            <td>{job.description}</td>
                            <td>{job.location}</td>
                            <td>{job.application_deadline}</td>
                            <td>{job.min_salary}</td>
                            <td>{job.max_salary}</td>
                            <td>
                                {job.job_id in applied ? (
                                    <button disabled onClick={() => handleApplyClick(job.job_id, job.company)}>
                                        Apply
                                    </button>
                                ) : (
                                    <button onClick={() => handleApplyClick(job.job_id, job.company)} disabled={job.job_id in applied}>
                                        Apply
                                    </button>
                                )}
                            </td>

                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>


    );
};
