window.onload = function() {
  var deleteButtons = document.getElementsByClassName("deleteButton");

  deleteButtons[0].onclick = function() {
    // send fetch request
    var id = this.getAttribute("id");
    sendDeleteRequest(id);
  };
};

function sendDeleteRequest(id) {
  var myRequest = new Request("/students/profile/" + id, {
    method: "DELETE",
    redirect: "follow"
  });

  fetch(myRequest)
    .then(response => response.json())
    .then(deletedStudent => {
      var message = deletedStudent.name + " has been deleted";
      alert(message);
      window.location.href = "/students";
    })
    .catch(error => alert(error));
}
