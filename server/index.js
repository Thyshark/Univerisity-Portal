const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const usersmodel = require('./models/users');
const usersTypes =require('./models/usertypes');
const Course = require('./models/course');
const bodyParser = require('body-parser');
const Score= require('./models/scores');



const app = express(); 
  
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://kimiri:<password>@cluster12.d3hhmlb.mongodb.net/", 
{ useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

//   const upload = multer({ storage: multer.memoryStorage() }); // Initialize multer

  

app.post("/", (req, res) => {
    const { email, password } = req.body;
    usersmodel.findOne({ email: email })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json({ message: "success", userType: user.userType }); // Changed to use `userType` from the database
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("No record existed");
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json("Server error");
      });
  });

app.post("/register", (req, res) => {
    const { name, email, password, userType } = req.body;
  
    if (!['Admin', 'Lecturer', 'Student'].includes(userType)) {
      return res.status(400).json("Invalid userType");
    }
    
    usersmodel.findOne({ email: email })
      .then(existingUser => {
        if (existingUser) {
          res.json("User already exists");
        } else {
          // Ensure the provided userType is valid
          if (!Object.values(usersTypes).includes(userType)) {  // <-- Error points to this line
            return res.status(400).json("Invalid userType");
          }
  
          usersmodel.create({ name, email, password, userType })
            .then(newUser => {
              res.json(newUser);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json("Error creating user");
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json("Server error");
      });
  });

   


//////////////////////////courses

app.get("/studentId", async (req, res) => {
    try {
      const studentId = req.query.studentId;  // Change this line
      const registeredCourses = await StudentCourse.find({ studentId });
      res.json({ courses: registeredCourses.map((course) => course.courseCode) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  // ...

// Register a course for a student
app.post("/register-course", async (req, res) => {
    try {
      const { studentId, courseCode } = req.body;
  
      // Check if the student is already registered for this course
      const existingRegistration = await StudentCourse.findOne({ studentId, courseCode });
      if (existingRegistration) {
        return res.status(400).json({ message: "Student is already registered for this course." });
      }
  
      // Check if the student has reached the maximum number of courses for the semester
      const registeredCourses = await StudentCourse.find({ studentId });
      if (registeredCourses.length >= 5) {
        return res.status(400).json({ message: "Student has reached the maximum number of courses for the semester." });
      }
  
      // Register the course for the student
      const newRegistration = new StudentCourse({ studentId, courseCode });
      await newRegistration.save();
  
      res.json({ message: "Course registered successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // ...
  

//////////////////////////////

app.get("/course", async (req, res) => {
    try {
      const courses = await Course.find();
      res.json({ courses });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  /////////////////lecturer
  app.use(bodyParser.json());

  app.get('/api/scores', async (req, res) => {
    try {
        // Fetch scores from the database
        const scores = await Score.find();
        res.status(200).json({ scores }); // Update to use 'scores' instead of 'newScore'
    } catch (error) {
        console.error('Error fetching scores:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/scores', async (req, res) => {
    try {
      // Create a new Score instance based on the request body
      const { studentName, assignment1, assignment2, cat1, cat2, exam } = req.body;
      const newScore = new Score({
        studentName,
        assignment1,
        assignment2,
        cat1,
        cat2,
        exam,
      });
      // Save the score to the database
      await newScore.save();
  
      res.status(201).json({ message: 'Score saved successfully' });
    } catch (error) {
      console.error('Error saving score:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(7000, () => {
    console.log("The server is running on port 7000");
  });
  
