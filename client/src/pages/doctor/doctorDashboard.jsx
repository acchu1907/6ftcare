import React, { useState } from "react";

function DoctorDashboard() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats = {
    todayAppointments: 5,
    pendingRequests: 3,
    completed: 18,
  };

  const messages = [
    {
      id: 1,
      patient: "Ananya R",
      message: "Doctor, I have been feeling dizzy for 2 days.",
      time: "10:30 AM",
    },
    {
      id: 2,
      patient: "Rahul K",
      message: "Can I change my appointment timing?",
      time: "11:45 AM",
    },
    {
      id: 3,
      patient: "Meera S",
      message: "Uploaded my blood test report. Please check.",
      time: "1:15 PM",
    },
  ];

  return (
    <>

      {/* MAIN CONTENT */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "50px" : "50px",
          transition: "margin-left 0.3s ease",
          padding: "40px",
          backgroundColor: "#e9edf5",
          minHeight: "100vh",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h1 style={styles.heading}>Doctor Dashboard</h1>

        {/* Stats Section */}
        <div style={styles.statsContainer}>
          <div style={{ ...styles.statCard, ...styles.pink }}>
            <h3>Today's Appointments</h3>
            <p>{stats.todayAppointments}</p>
          </div>

          <div style={{ ...styles.statCard, ...styles.purple }}>
            <h3>Pending Requests</h3>
            <p>{stats.pendingRequests}</p>
          </div>

          <div style={{ ...styles.statCard, ...styles.yellow }}>
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>

        {/* Messages Section */}
        <div style={styles.messageSection}>
          <h2 style={{ marginBottom: "20px", color: "#3c5a99" }}>
            Patient Queries
          </h2>

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageCard,
                ...(selectedMessage === msg.id ? styles.expanded : {}),
              }}
              onClick={() =>
                setSelectedMessage(
                  selectedMessage === msg.id ? null : msg.id
                )
              }
            >
              <div style={styles.messageHeader}>
                <strong>{msg.patient}</strong>
                <span>{msg.time}</span>
              </div>

              <p>{msg.message}</p>

              {selectedMessage === msg.id && (
                <div style={styles.replyBox}>
                  <textarea
                    placeholder="Type your reply..."
                    style={styles.textarea}
                  />
                  <button style={styles.replyBtn}>
                    Send Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorDashboard;

/* ---------------- STYLES ---------------- */

const styles = {
  heading: {
    marginBottom: "30px",
    color: "#3c5a99",
  },

  statsContainer: {
    display: "flex",
    gap: "30px",
    marginBottom: "50px",
  },

  statCard: {
    flex: 1,
    padding: "30px",
    borderRadius: "25px",
    color: "white",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  },

  pink: {
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
  },

  purple: {
    background: "linear-gradient(135deg, #7f7fd5, #86a8e7)",
  },

  yellow: {
    background: "linear-gradient(135deg, #fbd786, #f7797d)",
  },

  messageSection: {
    background: "white",
    padding: "30px",
    borderRadius: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  messageCard: {
    background: "#f4f7fb",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  expanded: {
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transform: "scale(1.02)",
  },

  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#3c5a99",
  },

  replyBox: {
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  textarea: {
    padding: "10px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    resize: "none",
    minHeight: "80px",
  },

  replyBtn: {
    alignSelf: "flex-end",
    padding: "8px 20px",
    borderRadius: "20px",
    border: "none",
    background: "#3c5a99",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};