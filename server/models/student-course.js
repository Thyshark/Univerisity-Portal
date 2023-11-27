const mongoose = require("mongoose");

const studentCourseSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseCode: { type: String, required: true },
});

const StudentCourse = mongoose.model("StudentCourse", studentCourseSchema);

module.exports = StudentCourse;

