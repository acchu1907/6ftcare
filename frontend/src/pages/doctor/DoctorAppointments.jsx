function DoctorAppointments() {
  return (
    <div>
      <h1 style={{ marginBottom: "30px", color: "#3c5a99" }}>
        Appointments
      </h1>

      <div style={styles.card}>
        <h3>Rahul Sharma</h3>
        <p>10:30 AM</p>
        <p>General Checkup</p>
        <button style={styles.button}>Mark as Completed</button>
      </div>

      <div style={styles.card}>
        <h3>Ananya R</h3>
        <p>12:00 PM</p>
        <p>Dizziness Consultation</p>
        <button style={styles.button}>Mark as Completed</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#3c5a99",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default DoctorAppointments;