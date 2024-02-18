$(document).ready(function (){

  const USERS_URL = 'http://localhost:3000/users'

  $('body').on('click', '.delete-btn', function () {
    const delId = $(this).data('id');
    deleteUser(delId);
  })

  $('body').on('click', '.update-btn', function () {
    const updId = $(this).data('id');
    updateUser(updId);
  })

  $.get(USERS_URL).then((data) =>
    data.map((user) => {
      $('tbody').append(
        $(`
        <tr>
          <td>${user.id}</td>
          <td>${user.userName}</td>
          <td>${user.fullName}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-primary btn-sm" type="button" data-toggle="collapse" data-target="#editMode-${user.id}" aria-expanded="false" aria-controls="editMode-${user.id}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" id="deleteUser" data-id="${user.id}">Delete</button>
          </td>
        </tr>
        <tr class="collapse" id="editMode-${user.id}">
        <form>
          <td></td>
          <td><input type="text" id="updateUserName-${user.id}" value="${user.userName}" /></td>
          <td><input type="text" id="updateFullName-${user.id}" value="${user.fullName}" /></td>
          <td><input type="email" id="updateEmail-${user.id}" value="${user.email}" /></td>
          <td>
            <button class="btn btn-primary btn-sm update-btn" id="udpdateUser" data-id="${user.id}">Update</button>
          </td>
        </form>
        </tr>
        `)
      )
    })
  )

  $('#submitUser').click(function () {
    $.ajax({
      url: USERS_URL,
      type: 'POST',
      dataType: 'json',
      data:JSON.stringify({
        userName: $('#newUserName').val(),
        fullName: $('#newFullName').val(),
        email: $('#newEmail').val()
      })
    })
  })

  function deleteUser(id) {
    $.ajax(`${USERS_URL}/${id}`, {
      type: 'DELETE',
    })
  }

  function updateUser(id) {
    $.ajax(`${USERS_URL}/${id}`, {
      method: 'PUT',
      dataType: 'json',
      data:JSON.stringify({
        userName: $(`#updateUserName-${id}`).val(),
        fullName: $(`#updateFullName-${id}`).val(),
        email: $(`#updateEmail-${id}`).val()
      })
    })
  }


})