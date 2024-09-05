using System;

namespace SimpleAuthApp.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string InterestType { get; set; }
        public DateTime ValidUntil { get; set; }
    }
}
