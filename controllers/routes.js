var express = require("express");
var router = express.Router();
var data = require("../models/students");
var Student = require("../models/studentSchema");

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("danger", "Please log in");
    res.redirect("/auth");
  }
});
// display all students
router.get("/", (req, res) => {
  //var students = data.getAll(); // from students.js
  // Student.find((err, students) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("index", { students: students });
  //   }
  // });
  Student.find()
    .then(students => res.render("index", { students: students }))
    .catch(error => console.log(error));
  // res.send(students);
});

// get the add form
router.get("/add", (req, res) => {
  // res.send("Welcome to the add page");
  res.render("addStudent", { message: "Please fill in the form" });
});

// post the add form
router.post("/add", (req, res) => {
  //console.log(req.body);
  var studentObj = new Student(req.body);
  var message = "";
  // data.addNewStudent(studentObj, err => {
  //   if (err) {
  //     message = err;
  //   } else {
  //     message = studentObj.name + " has successfully been added!";
  //   }
  // });
  studentObj.save(err => {
    if (err) {
      message = err;
    } else {
      message = studentObj.name + " has successfully been added!";
    }
    res.render("addStudent", { message: message });
  });
});

// get a specific profile
router.get("/profile/:id", (req, res) => {
  var id = req.params.id;
  //var student = data.getStudentById(id);
  Student.findById(id)
    .then(student =>
      res.render("profile", { student: student, message: "Edit the form" })
    )
    .catch(error => console.log(error));
});

router.post("/profile/:id", (req, res) => {
  var id = req.params.id;
  // data.updateStudent(id, req.body, err => {
  //   if (err) {
  //     res.render("profile", { message: err, student: data.getStudentById(id) });
  //   } else {
  //     res.redirect("/students");
  //   }
  // });
  // var currentStudent;
  // Student.findById(id).then(student => (currentStudent = student));
  Student.findByIdAndUpdate(id, req.body, (err, updatedStudent) => {
    if (err) {
      res.render("profile", { message: err, student: updatedStudent });
    } else {
      console.log(updatedStudent);
      res.redirect("/students");
    }
  });
});

router.delete("/profile/:id", (req, res) => {
  // data.deleteStudent(req.params.id, message => {
  //   res.json(message);
  // });
  Student.findByIdAndRemove(req.params.id)
    .then(deletedStudent => {
      res.json(deletedStudent);
    })
    .catch(error => res.json(error));
});

module.exports = router;
