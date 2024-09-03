#nullable enable
using System;
namespace SimpleAuthApp.Models
{
    public class User
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? ResetToken { get; set; }
        public bool IsAdmin { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public string Gender { get; set; } = string.Empty;
    }
}
