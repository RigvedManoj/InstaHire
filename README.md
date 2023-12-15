<h1 style="text-align: center;">Job-Board</h1>

## Overview
A job board is an online platform that serves as a virtual marketplace for job seekers and employers. These platforms are valuable for both individuals seeking employment opportunities and organizations looking to hire talent. They provide a centralized and user-friendly interface for job-related activities, helping job seekers find suitable positions and employers identify qualified candidates. As a result, job boards have become an essential component of the modern job market, facilitating efficient and convenient matchmaking between job seekers and employers while offering valuable resources and tools to support the entire process.

## Main Features
- **User Authentication**: The application authenticates a user by verifying their credentials (username and password) against the user database.
- **Job Listings**: The application provides a searchable database of job listings from various employers. Users can browse and search for job opportunities.
- **Profile Creation**: Job seekers can create profiles and upload their resumes which makes applying to jobs easier. This feature allows job seekers to showcase their skills and experience.
- **Application Management**: Job seekers can apply for jobs directly through the platform. Employers can manage applications and review resumes within the platform.
- **Employer Accounts**: Employers can create accounts to post job listings and manage their company profile to streamline their hiring process.

# Job Board
This Job Board platform is developed by team SKAR:
<ul>
    <li> Anju Santhosh Kumar (anjus1313, asanthoshkum@umass.edu)
    <li> Karthik Swaroop Suresh (KarthikSz, karthikswaro@umass.edu)
    <li> Rigved Manoj (RigvedManoj, rmanoj@umass.edu)
    <li> Sachin Thomas (sachint2001, sachinthomas@umass.edu)
</ul>

# Setting up the environment
Clone the repository using the command 
#### `git clone https://github.com/RigvedManoj/Job-Board.git`

## Setting up Frontend

- Install `npm` package in your system. 
- Navigate to the Frontend directory - Job_Board_Frontend.

- Install the necessary packages using the `npm install` command. 

- Start the frontend using the `npm start` command. 

- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- The page will reload when you make changes. You may also see any errors in the console.

## Setting up Backend

- Install the necessary packages using the `pip install -r requirements.txt`
- Navigate to the Backend directory - Job_Board_Backend.
- Create database and associated files using the `python manage.py makemigrations` and `python manage.py migrate` commands.
- Start the backend server using the `python manage.py runserver` command.
- To access the backend in administrative mode, create a super user prior to starting the server using the `python manage.py createsuperuser` command. Enter the prompted details to create an admin user.
- Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view it in your browser.

# Functions supported by the application

- Signup as an Applicant/Employer.
- Login as an Applicant/Employer.
- Create or edit your profile (will be visible to the other users).

### Employer

- Create a Job listing
- View applications received 
- View applicant information for each application
- Review profile and update application status 
- Logout after use.

### Applicant

- View all Job listings
- Apply to jobs
- View applications submitted with status
- Logout after use.






