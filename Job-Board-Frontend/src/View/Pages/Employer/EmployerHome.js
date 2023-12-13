import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const EmployerHome = () => {
  const navigate = useNavigate();
  const employer = localStorage.getItem("username");

  console.log(employer, localStorage.getItem('access_token'), localStorage.getItem('refresh_token'))
  const [formData, setFormData] = useState({
    username: employer,
    company_name: '',
    email: '',
    phone_number: '',
    industry: '',
    company_description: '',
  });
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Create Job'){ navigate("/job-creation")}
    if (tab === 'Applications'){ navigate("/")}

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
        debugger;
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
          // Append each field individually
          Object.keys(formData).forEach((key) => {
            setFormData((prevFormData) => {
              return { ...prevFormData, [key]: resp.data[0][key] };
            });
          });
        }


      } catch (error) {
        console.log(error);
        if(error.response.status === 403 || error.response.status === 401){
         // navigate('/')
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
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Rest of your code for sending the POST request
      const { data } = await axios.post(
          'http://localhost:8000/employer/',
          formData,
          {
            headers: {'Content-Type': 'application/json'}
          }
      );
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
          <h1>Employer Profile</h1>
          <form onSubmit={handleSubmit}>
              {/* Form Group (first name) */}
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

