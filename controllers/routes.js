var express = require("express");
var router = express.Router();
var data = require("../models/students");

// display all students
router.get("/", (req, res) => {
  var students = data.getAll();
  // res.send(students);
  res.render("index", { students: students });
});

// get the add form
router.get("/add", (req, res) => {
  // res.send("Welcome to the add page");
  res.render("addStudent", { message: "Please fill in the form" });
});

// post the add form
router.post("/add", (req, res) => {
  //console.log(req.body);
  var studentObj = req.body;
  var message = "";
  data.addNewStudent(studentObj, err => {
    if (err) {
      message = err;
    } else {
      message = studentObj.name + " has successfully been added!";
    }
  });
  res.render("addStudent", { message: message });
});

// get a specific profile
router.get("/profile/:id", (req, res) => {
  var id = req.params.id;
  var student = data.getStudentById(id);
  res.render("profile", { student: student, message: "Edit the form" });
});

router.post("/profile/:id", (req, res) => {
  var id = req.params.id;
  data.updateStudent(id, req.body, err => {
    if (err) {
      res.render("profile", { message: err, student: data.getStudentById(id) });
    } else {
      res.redirect("/students");
    }
  });
});

router.delete("/profile/:id", (req, res) => {
  data.deleteStudent(req.params.id, message => {
    res.json(message);
  });
});

module.exports = router;
