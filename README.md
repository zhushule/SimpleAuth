# SimpleAuth - Full-Stack Web Application

A full-stack web application built with React for the frontend and ASP.NET Core (C#) for the backend. This application provides user authentication, an admin dashboard, password reset functionality via email, user profile management, and personalized coupon recommendations based on user interests.

## Table of Contents

- [Features](#features)
- [Application Structure Overview](#Application-structure-overview)
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
- User Profile Management: Users can view and update their profile information, including first name, last name, date of birth, gender, and selected interests.
- Personalized Coupon Recommendations: Users receive coupons based on their selected interests (e.g., Music, Sports, Technology).
- Claim Coupons: Users can claim available coupons and have them saved to their profile.

## Application Structure Overview

### 1. **Frontend (React)**

- **Framework**: React, which allows for creating reusable UI components and a dynamic user experience.
- **Component Architecture**:
  - **Login**: Manages user authentication and login functionality.
  - **Register**: Handles user registration with fields for first name, last name, email, password, date of birth, gender, and interests.
  - **HomePage**: Displays user-specific information, including their profile details and personalized coupons based on selected interests. Also provides a "Claim" button to claim coupons.
  - **Admin Dashboard**: Allows admin users to manage other users, including viewing user details and resetting passwords.
  - **Forgot Password**: Provides a way for users to request a password reset email.
  - **Reset Password**: Allows users to reset their password using a token sent to their email.
  - **UserProfile** (if applicable): Allows users to update their profile information, such as name, gender, birthday, and interests.
- **State Management**:

  - **React Hooks**: `useState`, `useEffect` for handling input values, fetching data, managing stateful logic, and handling side effects.
  - **Local Storage**: Used to store user session data and claimed coupons.

- **Routing**:

  - **React Router**: Handles navigation between different pages, such as `/login`, `/register`, `/home`, `/admin`, and `/forgot-password`.

- **API Integration**:
  - **Axios**: Used for making HTTP requests to the backend API endpoints, organized in a service layer (`api.js`).

### 2. **Backend (C# with ASP.NET Core)**

- **Framework**: ASP.NET Core, a cross-platform framework for building modern, cloud-based, Internet-connected applications.

- **Controller-Based Architecture**:

  - **AuthController**: Handles HTTP requests related to user authentication, registration, password reset, and user management.
  - **CouponController**: Manages coupon-related operations such as fetching coupons based on user interests and (planned) claiming coupons.

- **Service Layer**:

  - **AuthService**: Encapsulates logic for user authentication, registration, password reset, and user management.
  - **CouponService**: Encapsulates logic for managing coupons, including filtering coupons by interests and (planned) handling coupon claims.

- **Data Model**:

  - **User.cs**: Represents user data, including fields for email, password, first name, last name, date of birth, gender, and interests.
  - **Request.cs**: Represents HTTP request models for various operations like registration and password reset.
  - **Coupon.cs**: Represents coupon data, including fields for the coupon's title, description, interest type, and validity.

- **In-Memory Data Storage**:

  - **Temporary Storage**: Currently uses in-memory lists within `AuthService` and `CouponService` for storing user and coupon data, allowing easy testing and development without a database.
  - _(Future Enhancement)_: Plan to migrate to a database (e.g., SQL Server, MySQL) for persistent storage.

- **Email Integration**:
  - **SmtpClient**: Used for sending emails for password reset functionality.

### 3. **Communication Between Frontend and Backend**

- **RESTful APIs**: The frontend and backend communicate via RESTful APIs. The frontend makes HTTP requests to backend API endpoints (e.g., `/api/auth/login`, `/api/coupon?interests=Music,Sports`), and the backend responds with JSON data.

- **Example API Endpoints**:
  - **Authentication**: `/api/auth/login`, `/api/auth/register`, `/api/auth/forgot-password`
  - **User Management**: `/api/auth/user-details`, `/api/auth/update-user`
  - **Coupons**: `/api/coupon?interests=Music,Sports`

### 4. **Summary**

Your application is a full-stack web application with a React-based frontend and a C# ASP.NET Core backend. The application features user authentication, profile management, personalized coupon recommendations, and an admin dashboard for user management. The architecture follows a modular approach with a clear separation of concerns between the frontend and backend components, making it easy to develop, manage, and scale.

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

- **Register** a new user by navigating to the `/register` route.
- **Login** with the registered credentials.
- **User Profile Management**: After logging in, users can view and update their profile details, including selecting interests (e.g., Music, Sports).
- **Personalized Coupons**: Users receive coupons based on their selected interests. Navigate to the home page to view available coupons and claim them.
- **Admin Dashboard**: Admin users can log in and access the admin dashboard to manage other users.
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

### User Profile

- `GET /api/auth/user-details`: Retrieve details of a specific user.
- `PUT /api/auth/update-user`: Update a user's profile information.

### Coupons

- `GET /api/coupon?interests=Music,Sports`: Get coupons based on user interests.
- _(Future)_ `POST /api/coupon/claim`: Claim a coupon for a user (planned feature).

## Screenshots

_(Add some screenshots of the app features, such as registration, login, profile management, and coupon claiming.)_

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add Some Feature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
