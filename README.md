# SimpleAuth - Full-Stack Web Application

A full-stack web application built with React for the frontend and ASP.NET Core (C#) for the backend. This application provides user authentication, an admin dashboard, password reset functionality via email, user profile management, and personalized coupon recommendations based on user interests.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User Registration and Login
- Admin Dashboard for managing users
- Password reset functionality via email with a 6-digit code
- User roles: Admin and regular users
- Responsive UI design
- User Profile Management: Users can view and update their profile information, including first name, last name, date of birth, gender, and selected interests.
- Personalized Coupon Recommendations: Users receive coupons based on their selected interests (e.g., Music, Sports, Technology).
- Claim Coupons functionality

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
   cd SimpleAuth/client
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
   cd ../server
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

- **Register and Login** Register and login via /register and /login.
- **User Profile Management**: After logging in, users can view and update their profile details, including selecting interests (e.g., Music, Sports).
- **Personalized Coupons**: Users receive coupons based on their selected interests. Navigate to the home page to view available coupons and claim them.
- **Admin Dashboard**: Admin users can log in and access the admin dashboard to manage other users.
- **Forgot Password** functionality allows users to request a password reset via email with a 6-digit verification code.

## API Endpoints

### Authentication

- Authentication: POST /api/auth/login, POST /api/auth/register, POST /api/auth/forgot-password, POST /api/auth/reset-password

### Admin

- GET /api/auth/users, POST /api/auth/admin/send-reset-email, PUT /api/auth/update-user

### User Profile

- GET /api/auth/user-details, PUT /api/auth/update-user

### Coupons

- GET /api/coupon?interests=..., POST /api/coupon/claim

## License

Distributed under the MIT License. See `LICENSE` for more information.
