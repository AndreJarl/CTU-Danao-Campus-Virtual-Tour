import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../config/firebase.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function Charts() {
  const [responses, setResponses] = useState([]);
  const surveyCollection = collection(db, "studentResponse");

  // Fetch survey responses from Firestore
  const fetchResponses = async () => {
    try {
      const snapshot = await getDocs(surveyCollection);
      const data = snapshot.docs.map((doc) => doc.data());
      setResponses(data);
    } catch (err) {
      console.error("Error fetching responses:", err);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  // Count occurrences for a given field
  const countOptions = (field) => {
    return responses.reduce((acc, r) => {
      if (!r[field]) return acc;
      acc[r[field]] = (acc[r[field]] || 0) + 1;
      return acc;
    }, {});
  };

  const yearCounts = countOptions("year");
  const satisfactionCounts = countOptions("satisfaction");
  const usageCounts = countOptions("usage");
  const totalResponses = responses.length;

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Responses" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex flex-col gap-10" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Survey Results</h2>
      <p>Total Responses: {totalResponses}</p>

      <h3>Year Level</h3>
      <Bar
        data={{
          labels: Object.keys(yearCounts),
          datasets: [
            {
              label: "Responses",
              data: Object.values(yearCounts),
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        }}
        options={barOptions}
      />

      <h3>Satisfaction</h3>
      <Pie
        data={{
          labels: Object.keys(satisfactionCounts),
          datasets: [
            {
              data: Object.values(satisfactionCounts),
              backgroundColor: [
                "#4caf50",
                "#8bc34a",
                "#ffc107",
                "#ff9800",
                "#f44336",
              ],
            },
          ],
        }}
      />

      <h3>Usage Frequency</h3>
      <Bar
        data={{
          labels: Object.keys(usageCounts),
          datasets: [
            {
              label: "Responses",
              data: Object.values(usageCounts),
              backgroundColor: "rgba(153,102,255,0.6)",
            },
          ],
        }}
        options={barOptions}
      />
    </div>
  );
}

export default Charts;
