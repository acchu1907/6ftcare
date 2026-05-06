import { useState } from "react";

const DoctorAvailability = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      selectedDays,
      startTime,
      endTime,
    });

    alert("Availability Saved Successfully!");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Set Availability</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Select Available Days</label>

        <div style={styles.daysContainer}>
          {days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              style={{
                ...styles.dayButton,
                backgroundColor: selectedDays.includes(day)
                  ? "#4caf50"
                  : "#e0e0e0",
                color: selectedDays.includes(day) ? "white" : "black",
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <label style={styles.label}>Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.saveBtn}>
          Save Availability
        </button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  daysContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  dayButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  saveBtn: {
    backgroundColor: "#2196f3",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default DoctorAvailability;