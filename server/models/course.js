const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

// Sample courses
const sampleCourses = [
    { code: 'IST1020', name: 'Introduction to Computer Science', description: 'Fundamental concepts of computer science.' },
    { code: 'MTH201', name: 'Calculus I', description: 'Fundamental principles of calculus.' },
    { code: 'IST2045', name: 'Networking', description: 'Introduction to Network' },
    { code: 'APT1050', name: 'Databases', description: 'Intruduction to Databases.' },
    { code: 'GRM2000', name: 'Research', description: 'Introduction to Research.' },

    // Add more sample courses as needed
  ];
  
  // Insert sample courses into the database
  Course.insertMany(sampleCourses)
    .then(() => {
      console.log('Sample courses inserted successfully.');
    })
    .catch((error) => {
      console.error('Error inserting sample courses:', error.message);
    });
module.exports = Course;
