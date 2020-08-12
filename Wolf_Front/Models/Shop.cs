using System;

namespace Wolf_Front.Models
{
    public partial class Shop
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Pic { get; set; }
    }
}
