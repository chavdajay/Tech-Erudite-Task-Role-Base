# Role_Base_App

This project is a **MERN Stack Application** built using **MySQL, Express.js, React.js, and Node.js**. Follow the steps below to clone, set up, and run the project locally.


## Prerequisites

Ensure the following software is installed on your system:

1. **Node.js** (version 14 or higher) - [Download Node.js](https://nodejs.org)  
2. **npm** or **yarn** (comes with Node.js installation)  
3. **Git** - [Download Git](https://git-scm.com)  
4. **MySQL** MySQL (local storage via XAMPP) - Download XAMPP


## Clone the Repository

To clone the project, run the following command in your terminal:

git clone https://github.com/chavdajay/Tech-Erudite-Task-Role-Base.git


## Install Dependencies

After cloning, navigate to the respective directories and install the required dependencies for both the frontend and backend.


### Frontend

1. Navigate to the `frontend` directory:
 
   cd frontend
  
2. Install the dependencies:
   
   npm install


### Backend

1. Navigate to the `backend` directory:

   cd backend

2. Install the dependencies:
 
   npm install
  

## Add `.env` Files

Environment variables are required for the proper functioning of both the frontend and backend.

### Backend `.env`

Create a `.env` file inside the `backend` directory and add the following content:

DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD= 
DB_NAME=role_base 
PORT=5000
JWT_SECRET=secret123
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-mail
EMAIL_PASS=app-password



## Run the Project

### Start the Frontend

To start the frontend React application:

1. Open a terminal and navigate to the `frontend` directory:
  
   cd frontend

2. Run the application:
  
   npm start
   

### Start the Backend

To start the backend Node.js server:

1. Open another terminal and navigate to the `backend` directory:
  
   cd backend
  
2. Run the server:
 
   npm run dev
  

## Project Structure

.
├── backend       # Backend code (Node.js, Express, MySQL)
├── frontend      # Frontend code (React.js)
└── README.md     # Project documentation
