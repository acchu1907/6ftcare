import { useState } from "react";

function DoctorPatients() {
  const [search, setSearch] = useState("");

  const patients = [
    {
      id: 1,
      name: "Ananya R",
      age: 24,
      issue: "Dizziness",
      lastVisit: "12 Feb 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul K",
      age: 32,
      issue: "Blood Pressure",
      lastVisit: "10 Feb 2026",
      status: "Follow-up",
    },
    {
      id: 3,
      name: "Meera S",
      age: 28,
      issue: "Thyroid Check",
      lastVisit: "05 Feb 2026",
      status: "Active",
    },
  ];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 style={styles.heading}>Patients</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* Patient List */}
      {filteredPatients.map((patient) => (
        <div key={patient.id} style={styles.card}>
          <div>
            <h3>{patient.name}</h3>
            <p>Age: {patient.age}</p>
            <p>Issue: {patient.issue}</p>
            <p>Last Visit: {patient.lastVisit}</p>
          </div>

          <div style={styles.rightSection}>
            <span
              style={{
                ...styles.badge,
                backgroundColor:
                  patient.status === "Active" ? "#4CAF50" : "#FFA500",
              }}
            >
              {patient.status}
            </span>

            <button style={styles.button}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  heading: {
    marginBottom: "25px",
    color: "#3c5a99",
  },

  search: {
    padding: "10px 15px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    marginBottom: "30px",
    width: "300px",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
  },

  badge: {
    padding: "5px 12px",
    borderRadius: "15px",
    color: "white",
    fontSize: "12px",
  },

  button: {
    padding: "8px 15px",
    backgroundColor: "#3c5a99",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default DoctorPatients;