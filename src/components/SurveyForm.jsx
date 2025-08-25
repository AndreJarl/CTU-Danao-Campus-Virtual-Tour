import React, { useState } from "react";
import { db, collection, addDoc } from "../config/firebase";

function SurveyForm({ onSubmit }) {
  const [year, setYear] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [usage, setUsage] = useState("");

  const surveyCollection = collection(db, "studentResponse");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year || !satisfaction || !usage) return alert("Please fill all fields");

    try {
      await addDoc(surveyCollection, { year, satisfaction, usage });
      alert("Survey submitted!");
      setYear(""); setSatisfaction(""); setUsage("");
     
    } catch (err) {
      console.error("Error submitting survey:", err);
      alert("Failed to submit survey");
    }
  };

  return (
    <form className="absolute top-[30%] left-[40%]  w-[300px] h-[200px] flex flex-col justify-center p-4 bg-white border rounded shadow-lg z-50" onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <label>
        Year Level:
        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">Select</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </label>
      <br />
      <label>
        Satisfaction:
        <select value={satisfaction} onChange={e => setSatisfaction(e.target.value)}>
          <option value="">Select</option>
          <option value="Very Satisfied">Very Satisfied</option>
          <option value="Satisfied">Satisfied</option>
          <option value="Neutral">Neutral</option>
          <option value="Unsatisfied">Unsatisfied</option>
          <option value="Very Unsatisfied">Very Unsatisfied</option>
        </select>
      </label>
      <br />
      <label>
        Usage Frequency:
        <select value={usage} onChange={e => setUsage(e.target.value)}>
          <option value="">Select</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Rarely">Rarely</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit Survey</button>
    </form>
  );
}

export default SurveyForm;
