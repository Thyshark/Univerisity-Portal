import React, { useState, useEffect } from "react";
import axios from "axios";
import ScoresDisplay from "./ScoresDisplay";

const LecturerDashboard = () => {
  const [formData, setFormData] = useState({
    studentName: "", // Change to studentName
    assignment1: 0,
    assignment2: 0,
    cat1: 0,
    cat2: 0,
    exam: 0,
  });

  const [scores, setScores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/api/scores", formData);
      console.log("Score saved successfully.");
      fetchScores();
    } catch (error) {
      console.error("Error saving score:", error.message);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/scores");
      setScores(response.data.scores);
    } catch (error) {
      console.error("Error fetching scores:", error.message);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div>
      <h1>Lecturer Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Assignment 1:
          <input
            type="number"
            name="assignment1"
            value={formData.assignment1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Assignment 2:
          <input
            type="number"
            name="assignment2"
            value={formData.assignment2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CAT 1:
          <input
            type="number"
            name="cat1"
            value={formData.cat1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          CAT 2:
          <input
            type="number"
            name="cat2"
            value={formData.cat2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Exam:
          <input
            type="number"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowScores(!showScores)}>
        {showScores ? "Hide Scores" : "Show Scores"}
      </button>

      {showScores && <ScoresDisplay scores={scores} />}
    </div>
  );
};

export default LecturerDashboard;
