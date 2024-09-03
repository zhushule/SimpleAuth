# SimpleAuth - Full-Stack Web Application

A full-stack web application built with React for the frontend and ASP.NET Core (C#) for the backend. This application provides user authentication, an admin dashboard, and a password reset functionality via email.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration and Login
- Admin Dashboard for managing users
- Password reset functionality via email with a 6-digit code
- User roles: Admin and regular users
- Responsive UI design

## Technologies Used

- **Frontend**: React, JavaScript, Axios, CSS
- **Backend**: ASP.NET Core (C#), .NET 6.0, SmtpClient for email functionality
- **Other Tools**: Visual Studio, Visual Studio Code, Git, GitHub

## Installation

To get a local copy up and running, follow these simple steps.

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/zhushule/SimpleAuth.git
    cd SimpleAuth/frontend
    ```

2. Install NPM packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```
   
   The app should now be running on `http://localhost:3000`.

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Install required NuGet packages and restore dependencies:
    ```bash
    dotnet restore
    ```

3. Update the `appsettings.json` file with your email configuration for sending emails (e.g., SMTP settings for Yahoo).

4. Run the ASP.NET Core backend server:
    ```bash
    dotnet run
    ```
   
   The server should now be running on `http://localhost:5161`.

## Usage

- **Register** a new user by navigating to the `/register` route.
- **Login** with the registered credentials.
- **Admin users** can log in and access the admin dashboard to manage other users.
- **Forgot Password** functionality allows users to request a password reset via email with a 6-digit verification code.

## API Endpoints

### Authentication

- `POST /api/auth/login`: Login with email and password.
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/forgot-password`: Request a password reset.
- `POST /api/auth/reset-password`: Reset the password using a token sent via email.

### Admin

- `GET /api/auth/users`: Get a list of all users (admin only).
- `POST /api/auth/admin/send-reset-email`: Admin sends a password reset email to a user.

## License

Distributed under the MIT License. See `LICENSE` for more information.
