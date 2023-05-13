using Microsoft.EntityFrameworkCore;
using crud_operation_with_ajax.Data;
using Microsoft.AspNetCore.Mvc;
using crud_operation_with_ajax.Models.Domain;
using crud_operation_with_ajax.Models.viewmodel;

namespace crud_operation_with_ajax.Controllers
{
	[Produces("application/json")]
	public class StudentController : Controller
	{
		private readonly StudentDbContext studentDbContext;

		public StudentController(StudentDbContext studentDbContext)
        {
			this.studentDbContext = studentDbContext;
		}
		[HttpGet]
		public IActionResult Index()
		{
			return View();
		}
		[HttpGet]
		public async Task<JsonResult> ListAllStudent()
		{
			var productList = await studentDbContext.students.Where(c => c.Status == "A").ToListAsync();

			return Json(productList);
		}
		
		[HttpPost]
		public async Task<IActionResult> CreateStudent([FromBody] Student student)
		{
			if (ModelState.IsValid)
			{
				
				await studentDbContext.students.AddAsync(student);
				await studentDbContext.SaveChangesAsync();

				return Json(new { success = true, message = "Student created successfully!" });
			}

			return BadRequest(ModelState);
		}
		[HttpPost]
		public async Task<IActionResult> Update(StudentView model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var student = await studentDbContext.students.FindAsync(model.Id);

			if (student == null)
			{
				return NotFound();
			}

			student.Name = model.Name;
			student.FatherName = model.FatherName;
			student.Phone = model.Phone;
			student.Place = model.Place;
			student.Status = model.Status;

			try
			{
				await studentDbContext.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!StudentExists(model.Id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return Ok();
		}
		private bool StudentExists(int id)
		{
			return studentDbContext.students.Any(e => e.Id == id);
		}

		[HttpPost, ActionName("Delete")]
		public async Task<ActionResult> DeleteConfirmed(int id)
		{
			var student = await studentDbContext.students.FirstOrDefaultAsync(c => c.Id == id && c.Status == "A");

			if (student == null)
			{
				return NotFound();
			}
			student.Status = "D";

			studentDbContext.SaveChanges();
			return Json(new { success = true });
		}
	}
}
