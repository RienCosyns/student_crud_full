var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String
  },
  country: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;
