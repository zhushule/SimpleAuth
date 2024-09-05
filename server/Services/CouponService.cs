using System;
using System.Collections.Generic;
using System.Linq;
using SimpleAuthApp.Models;

namespace SimpleAuthApp.Services
{
    public class CouponService
    {
        private readonly List<Coupon> _coupons = new List<Coupon>
        {
            // Music Coupons
            new Coupon { Id = 1, Title = "50% off Concert Tickets", Description = "Get 50% off on select concerts", InterestType = "Music", ValidUntil = DateTime.Now.AddMonths(1) },
            new Coupon { Id = 2, Title = "Buy 1 Get 1 Free Music Streaming", Description = "Buy one month of premium and get another month free", InterestType = "Music", ValidUntil = DateTime.Now.AddMonths(2) },
            new Coupon { Id = 3, Title = "20% off Music Equipment", Description = "Get 20% off on selected music instruments", InterestType = "Music", ValidUntil = DateTime.Now.AddMonths(3) },

            // Sports Coupons
            new Coupon { Id = 4, Title = "30% off NBA Tickets", Description = "Enjoy 30% off NBA games", InterestType = "Sports", ValidUntil = DateTime.Now.AddMonths(1) },
            new Coupon { Id = 5, Title = "Free Entry to Local Soccer Matches", Description = "Get free entry to selected local soccer matches", InterestType = "Sports", ValidUntil = DateTime.Now.AddMonths(1) },
            new Coupon { Id = 6, Title = "15% off NFL Merchandise", Description = "Save 15% on all NFL merchandise", InterestType = "Sports", ValidUntil = DateTime.Now.AddMonths(2) },

            // Travel Coupons
            new Coupon { Id = 7, Title = "20% off Travel Packages", Description = "Explore new places with 20% off", InterestType = "Travel", ValidUntil = DateTime.Now.AddMonths(2) },
            new Coupon { Id = 8, Title = "30% off Car Rentals", Description = "Get 30% off on car rentals worldwide", InterestType = "Travel", ValidUntil = DateTime.Now.AddMonths(3) },
            new Coupon { Id = 9, Title = "50% off Hotel Stays", Description = "Stay longer for less with 50% off selected hotels", InterestType = "Travel", ValidUntil = DateTime.Now.AddMonths(1) },

            // Technology Coupons
            new Coupon { Id = 10, Title = "25% off Technology Expo Tickets", Description = "Experience the latest in tech at a discount", InterestType = "Technology", ValidUntil = DateTime.Now.AddMonths(3) },
            new Coupon { Id = 11, Title = "10% off on Gadgets", Description = "Save on the latest gadgets and accessories", InterestType = "Technology", ValidUntil = DateTime.Now.AddMonths(4) },
            new Coupon { Id = 12, Title = "Buy 2 Get 1 Free Software Licenses", Description = "Buy two licenses and get one free", InterestType = "Technology", ValidUntil = DateTime.Now.AddMonths(1) },

            // Art Coupons
            new Coupon { Id = 13, Title = "Buy 1 Get 1 Free Art Gallery Pass", Description = "Bring a friend to enjoy the gallery", InterestType = "Art", ValidUntil = DateTime.Now.AddMonths(1) },
            new Coupon { Id = 14, Title = "50% off Painting Classes", Description = "Discover your inner artist with 50% off classes", InterestType = "Art", ValidUntil = DateTime.Now.AddMonths(2) },
            new Coupon { Id = 15, Title = "20% off Art Supplies", Description = "Get 20% off on all art supplies", InterestType = "Art", ValidUntil = DateTime.Now.AddMonths(1) }
        };

        public List<Coupon> GetCouponsByInterests(List<string> interests)
        {
            if (interests == null || !interests.Any())
                return new List<Coupon>();
            return _coupons.Where(c => interests.Contains(c.InterestType, StringComparer.OrdinalIgnoreCase)).ToList();
        }

    }
}
