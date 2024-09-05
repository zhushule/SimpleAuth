using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SimpleAuthApp.Models;
using SimpleAuthApp.Services;

namespace SimpleAuthApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponController : ControllerBase
    {
        private readonly CouponService _couponService;

        public CouponController()
        {
            _couponService = new CouponService();
        }

        [HttpGet]
        public IActionResult GetCouponsByInterests([FromQuery] string interests)
        {
            var interestList = interests.Split(',').Select(i => i.Trim()).ToList();

            Console.WriteLine("Interests provided: " + string.Join(", ", interestList));

            var filteredCoupons = _couponService.GetCouponsByInterests(interestList);

            if (!filteredCoupons.Any())
                return NotFound("No coupons available for the provided interests.");

            // Format the response to show DateTime as "yyyy-MM-dd"
            var response = filteredCoupons.Select(c => new
            {
                c.Id,
                c.Title,
                c.Description,
                c.InterestType,
                ValidUntil = c.ValidUntil.ToString("yyyy-MM-dd")  // Format DateTime here
            });

            return Ok(response);
        }
    }
}
