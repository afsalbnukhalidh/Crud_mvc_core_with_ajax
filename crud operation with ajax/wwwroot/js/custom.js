$(document).ready(function () {
    loadData();
   
});

//get data to table

function loadData() {
    var data;

    $.ajax({
        url: '/Student/ListAllStudent',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (response) {
            data = response;

            $.each(data, function (i, item) {
                var rows = "<tr>"
                    + "<td>" + (i + 1) + "</td>"
                    + "<td>" + item.name + "</td>"
                    + "<td>" + item.fatherName + "</td>"
                    + "<td>" + item.phone + "</td>"
                    + "<td>" + item.place + "</td>"
                    + "<td>"
                    + "<button type='button' class='btn btn-primary edit-btn' data-id='" + item.id + "'>Edit</button>"
                    + "</td>"
                    + "<td>"
                    + "<button type='button' class='btn btn-danger delete-btn' data-id='" + item.id + "' data-name='" + item.name + "' data-fathername='" + item.fatherName + "' data-phone='" + item.phone + "' data-place='" + item.place + "'>Delete</button>"

                    + "</td>"
                    + "</tr>";
                $('#myTable tbody').append(rows);
            });

            //calling datas for editing
            $(document).on('click', '.edit-btn', function () {
                var id = $(this).data('id');
                var student = data.find(s => s.id == id);

                $('#editId').val(student.id);
                $('#editName').val(student.name);
                $('#editFatherName').val(student.fatherName);
                $('#editPhone').val(student.phone);
                $('#editPlace').val(student.place);
                $('#editStatus').val(student.status);

                $('#editModal').modal('show');
            });

            //calling datas for deleting
            $(document).on("click", ".delete-btn", function () {
                debugger
                var id = $(this).data("id");
                var name = $(this).data("name");
                var fathername = $(this).data("fathername");
                var phone = $(this).data("phone");
                var place = $(this).data("place");
                $("#delete-student-id").val(id);
                $("#delete-student-name").text(name);
                $("#delete-student-fathername").text(fathername);
                $("#delete-student-phone").text(phone);
                $("#delete-student-place").text(place);
                $("#delete-modal").modal("show");
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Error in loading data');
        }
    });
}

//Edit section
$('#saveChangesBtn').on('click', function () {
    var formData = $('#editForm').serialize();
    var id = $('#editId').val(); 
    formData += '&id=' + id; 

    $.ajax({
        url: '/student/Update',
        method: 'POST',
        data: formData,
        success: function (response) {
            
            location.reload();
        }
    });
});


//delete section
$("#delete-student-button").click(function () {
    var id = $("#delete-student-id").val();
    $.ajax({
        url: "/Student/Delete",
        type: "POST",
        data: { id: id },
        success: function () {
            $("#row_" + id).remove();
            $("#delete-modal").modal("hide");
            location.reload();
        },
        error: function () {
            alert("An error occurred while deleting the student record.");
        }
    });
});



$(document).ready(function () {
    var closeButton = $('.close[data-dismiss="modal"]');
    closeButton.on('click', function () {
        $(this).closest('.modal').modal('hide');
    });
});





//creating section

$('#myModal').click(function () {
    $('#addStudentModal').modal('show');
});
function saveAndCloseModal() {
   
    $('#createStudentForm')[0].reset();
    $('#addStudentModal').modal('hide');
}

$('.close').click(function () {
    saveAndCloseModal();
});



$('#createStudentForm').submit(function (e) {
    debugger
    e.preventDefault();
    $.ajax({
        url: '/Student/CreateStudent',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
            name: $('#name').val(),
            fatherName: $('#fatherName').val(),
            phone: $('#phone').val(),
            place: $('#place').val(),
            status :$('#status').val()
        }),
        success: function (data) {
            saveAndCloseModal();
            alert('Student created successfully!');
            location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Error in creating student');
        }
    });
});


  