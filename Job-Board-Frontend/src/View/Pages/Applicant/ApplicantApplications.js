import React, {useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from 'react-router-dom';
// import './ApplicantHome.css';
import axios from "axios";
import { Table, Button } from 'rsuite';

export const ApplicantApplications = () => {
    const applicant = localStorage.getItem("username")
    // const [applicationsData, setApplicationsData] = useState({
    //     applicant_username: applicant,
    //     application_id: '',
    //     job_id: '',
    //     employer_username: '',
    //     status: ''
    // });
    const { Column, HeaderCell, Cell } = Table;
    const [applicationsData, setApplicationsData] = useState([]);

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Applications');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Profile'){ navigate("/applicant-home")}
        if (tab === 'Jobs List'){ navigate("/")}
    };

    const getSymbolForTab = (tab) => {
        switch (tab) {
            case 'Profile':
                return '👤';
            case 'Jobs List':
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
                debugger;
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

                // console.log("hi")
                // console.log(resp.data);
                if(resp.data.length !== 0){
                    // Append each field individually
                    // Object.keys(applicationsData).forEach((key) => {
                    //     setApplicationsData((prevapplicationsData) => {
                    //         // console.log(prevapplicationsData);
                    //         return { ...prevapplicationsData, [key]: resp.data[0][key] };
                    //     });
                    // });
                    setApplicationsData(resp.data);
                }
                // console.log(resp.data);
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
                {['Profile', 'Jobs List', 'Applications'].map((tab) => (
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

                <h1>Welcome to the Applicant Applications Page</h1>

                <h1>Applications List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Application_ID</th>
                        <th>Job_ID</th>
                        <th>Employer</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applicationsData.map(application => (
                        <tr key={application.id}>
                            <td>{application.application_id}</td>
                            <td>{application.job_id}</td>
                            <td>{application.employer_username}</td>
                            <td>{application.status}</td>

                        </tr>))}
                    </tbody>
                </table>

            </div>
        </div>
    );

};

export default ApplicantApplications;