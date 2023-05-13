using crud_operation_with_ajax.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace crud_operation_with_ajax.Data
{
	public class StudentDbContext : DbContext
	{
		public StudentDbContext(DbContextOptions options) : base(options)
		{
		}
		public DbSet<Student> students { get; set; }
	}
}
