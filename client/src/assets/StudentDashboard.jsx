import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:7000/course");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      // Replace 'studentId123' with the actual student ID (you may get it from user authentication)
      const response = await axios.get("http://localhost:7000/studentId");
      setRegisteredCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching registered courses:", error.message);
    }
  };

  const registerCourse = async () => {
    try {
      // Generate a unique identifier for the student
      const studentId = generateUniqueId();

      // Check if the student has reached the maximum number of courses for the semester
      if (registeredCourses.length >= 5) {
        console.log(
          "You have reached the maximum number of courses for the semester."
        );
        return;
      }

      // Register the course for the student
      await axios.post("http://localhost:7000/register-course", {
        studentId,
        courseCode: selectedCourse,
      });

      fetchRegisteredCourses();
    } catch (error) {
      console.error("Error registering course:", error.message);
    }
  };

  // Function to generate a unique identifier (you can replace it with your preferred method)
  const generateUniqueId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <div className="mb-4">
        <h4>Available Courses</h4>
        <div className="d-flex flex-wrap">
          {courses.map((course) => (
            <Card
              key={course.code} // Change this line based on your schema
              className="m-2"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => setSelectedCourse(course.code)}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h4>Registered Courses</h4>
        <ul>
          {registeredCourses.map((courseCode, index) => (
            <li key={`${courseCode}-${index}`}>{courseCode}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
