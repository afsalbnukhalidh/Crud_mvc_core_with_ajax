using System.ComponentModel.DataAnnotations;

namespace crud_operation_with_ajax.Models.Domain
{
	public class Student
	{
		[Key]
        public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string FatherName { get; set; }
		public string Phone { get; set; }
		public string Place { get; set; }
		public string Status { get; set; }
    }
}
