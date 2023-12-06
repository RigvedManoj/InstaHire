import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const EmployerHome = () => {
  const [employerData, setEmployerData] = useState([]);
  debugger;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/home/employer/');
        setEmployerData(response.data);
      } catch (error) {
        console.error('Error fetching employer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Employer Home Page</h1>
      <p>This is the page for employers.</p>
      <h2>Employer Data:</h2>
      <ul>
        {employerData.map((employer) => (
          <li key={employer.id}>{employer.name}</li>
        ))}
      </ul>
      {/* Add employer-specific content here */}
    </div>
  );
};

export default EmployerHome;