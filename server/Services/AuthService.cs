#nullable enable
using System.Threading.Tasks;
using SimpleAuthApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System;

namespace SimpleAuthApp.Services
{
    public interface IAuthService
    {
        Task<ServiceResponse> LoginAsync(LoginRequest request);
        Task<ServiceResponse> RegisterAsync(RegisterRequest request);
        Task<ServiceResponse> ForgotPasswordAsync(ForgotPasswordRequest request);
        Task<ServiceResponse> ResetPasswordAsync(ResetPasswordRequest request);
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByEmailAsync(string email);
        Task<ServiceResponse> UpdateUserAsync(UpdateUserRequest request);
    }

    public class AuthService : IAuthService
    {
        private static List<User> _users = new List<User>
        {
            new User { Email = "admin@yahoo.com", Password = "admin", IsAdmin = true }, // Admin user
            new User { Email = "zhushule2024@yahoo.com", Password = "123123", IsAdmin = false, FirstName = "Shule", LastName = "Zhu", Gender = "Male", Birthday = new DateTime(1990, 1, 1) }, // Example user
            new User { Email = "test@example.com", Password = "password", IsAdmin = false }, // Example user
        };

        public Task<ServiceResponse> LoginAsync(LoginRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);
            Console.WriteLine($"Attempting to login user {request.Email} with password {request.Password}.");
            if (user != null)
            {
                Console.WriteLine($"User {user.Email} logged in successfully.");
                return Task.FromResult(new ServiceResponse { Success = true, Message = "Login successful", IsAdmin = user.IsAdmin });
            }
            Console.WriteLine($"Login failed for {request.Email}.");
            return Task.FromResult(new ServiceResponse { Success = false, Message = "Invalid email or password" });
        }
        public Task<ServiceResponse> RegisterAsync(RegisterRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
            {
                var newUser = new User
                {
                    Email = request.Email,
                    Password = request.Password,
                    IsAdmin = false,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Birthday = request.Birthday,
                    Gender = request.Gender
                };
                _users.Add(newUser);
                Console.WriteLine($"User {newUser.Email} registered successfully with additional details."); // Debug statement
                return Task.FromResult(new ServiceResponse { Success = true, Message = "Registration successful" });
            }
            Console.WriteLine($"Registration failed. Email {request.Email} already exists."); // Debug statement
            return Task.FromResult(new ServiceResponse { Success = false, Message = "Email already exists" });
        }
        public Task<ServiceResponse> ForgotPasswordAsync(ForgotPasswordRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Email == request.Email);
            if (user != null)
            {
                user.ResetToken = new Random().Next(100000, 999999).ToString(); // Generate six-digit code
                // Simulate async email sending
                if (!string.IsNullOrEmpty(user.Email))
                {
                    Task.Run(() => SendResetEmail(user.Email, user.ResetToken));
                }
                return Task.FromResult(new ServiceResponse { Success = true, Message = "Reset code sent" });
            }
            return Task.FromResult(new ServiceResponse { Success = false, Message = "Email not found" });
        }



        public Task<ServiceResponse> ResetPasswordAsync(ResetPasswordRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Email == request.Email && u.ResetToken == request.Token);
            if (user != null)
            {
                user.Password = request.Password;
                user.ResetToken = null;
                return Task.FromResult(new ServiceResponse { Success = true, Message = "Password reset successful" });
            }
            return Task.FromResult(new ServiceResponse { Success = false, Message = "Invalid token" });
        }
        public Task<List<User>> GetAllUsersAsync()
        {
            return Task.FromResult(_users.Where(u => !u.IsAdmin).ToList());
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = _users.FirstOrDefault(u => u.Email.Trim().ToLower() == email.Trim().ToLower());

            if (user == null)
            {
                Console.WriteLine("User not found.");
            }
            else
            {
                Console.WriteLine($"Found user: {user.Email}");
            }
            return await Task.FromResult(user);
        }




        public Task<ServiceResponse> UpdateUserAsync(UpdateUserRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Email == request.Email);
            if (user != null)
            {
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                Console.WriteLine($"User {user.Email} updated successfully.");
                return Task.FromResult(new ServiceResponse { Success = true, Message = "User updated successfully" });
            }
            return Task.FromResult(new ServiceResponse { Success = false, Message = "User not found" });
        }


        private async Task SendResetEmail(string? email, string token)
        {
            if (email == null)
                return;

            try
            {
                var fromAddress = new MailAddress("zhushule1996@yahoo.com", "YourApp");
                var toAddress = new MailAddress(email);
                const string fromPassword = "yabgvmooouvmwecr";
                const string subject = "Password Reset";

                string resetLink = $"http://localhost:3000/reset-password/{token}";

                string body = $@"
                <p>Hi User,</p>
                <p>You requested to update your password. Please use the following link to reset your password: <a href=""{resetLink}"">{resetLink}</a></p>
                <p>One-time code: {token}</p>";

                var smtp = new SmtpClient
                {
                    Host = "smtp.mail.yahoo.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword)
                };

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                {
                    await smtp.SendMailAsync(message);
                }

                Console.WriteLine($"Reset email sent to {email}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send reset email to {email}. Error: {ex.Message}");
            }
        }
    }
}
