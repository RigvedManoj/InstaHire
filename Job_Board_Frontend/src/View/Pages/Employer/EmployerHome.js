/* This file contains the logic for viewing and editing the profile information of an employee.
Existing Profile information is fetched from backend and new Profile information is posted to backend.
This file can navigate to employer application and create job.*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const EmployerHome = () => {
  const navigate = useNavigate();
  const employer = localStorage.getItem("username");
  const [profileComplete, setProfileComplete] = useState(false);
  const [formData, setFormData] = useState({
    username: employer,
    company_name: '',
    email: '',
    phone_number: '',
    industry: '',
    company_description: '',
  });
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabClick = (tab) => {
    if (tab === 'Logout'){ navigate("/logout")}
    else {
      console.log(profileComplete)
      if (profileComplete) {
        setActiveTab(tab);
        if (tab === 'Create Job') {
          navigate("/job-creation")
        }
        if (tab === 'Applications') {
          navigate("/employer-applications")
        }
      } else {
        alert("Please fill the profile before moving to other tabs.");
      }
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

        if(resp.data.length !== 0){
          Object.keys(formData).forEach((key) => {
            setFormData((prevFormData) => {
              return { ...prevFormData, [key]: resp.data[0][key] };
            });
          });
          setProfileComplete(true)
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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
          'http://localhost:8000/employer/',
          formData,
          {
            headers: {'Content-Type': 'application/json'}
          }
      );
      setProfileComplete(true)
    }
    catch (error) {
      console.log(error);
      alert('Oops! Something went wrong. Please check your input parameters and try again :)');
      return;
    }

  };

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
          <h1>Employer Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-2">
                <label htmlFor="companyName">Company Name:</label>
                <input
                    className="form-control"
                    id="companyName"
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="col-2">
                <label htmlFor="industry">Industry:</label>
                <input
                    className="form-control"
                    id="industry"
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <label htmlFor="email">Email:</label>
                <input className="form-control" type="email" id="email" name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       required />
              </div>
              <div className="col-2">
                <label htmlFor="phone">Phone Number:</label>
                <input className="form-control" type="tel" id="phone" name="phone_number" pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                       value={formData.phone_number}
                       onChange={handleInputChange}
                       required />
              </div>
            </div>
            <div className="form-group">
              <label>
                Company Description:
                <br/>
                <textarea name="company_description" cols="30" rows="3" value={formData.company_description}
                          onChange={handleInputChange}></textarea>
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Save Profile</button>
            </div>

          </form>

        </div>
      </div>

  );
};

