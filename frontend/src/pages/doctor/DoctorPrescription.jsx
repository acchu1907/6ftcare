import { useState } from "react";

const DoctorPrescription = () => {
  const [patient, setPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicine = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      patient,
      diagnosis,
      medicines,
      notes,
    });

    alert("Prescription Saved Successfully!");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Write Prescription</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Patient */}
        <label style={styles.label}>Patient</label>
        <select
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Patient</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
        </select>

        {/* Diagnosis */}
        <label style={styles.label}>Diagnosis</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
          style={styles.textarea}
        />

        {/* Medicines */}
        <label style={styles.label}>Medicines</label>

        {medicines.map((med, index) => (
          <div key={index} style={styles.medicineRow}>
            <input
              type="text"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) =>
                handleMedicineChange(index, "name", e.target.value)
              }
              required
              style={styles.smallInput}
            />
            <input
              type="text"
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) =>
                handleMedicineChange(index, "dosage", e.target.value)
              }
              required
              style={styles.smallInput}
            />
            <input
              type="text"
              placeholder="Duration"
              value={med.duration}
              onChange={(e) =>
                handleMedicineChange(index, "duration", e.target.value)
              }
              required
              style={styles.smallInput}
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeMedicine(index)}
                style={styles.removeBtn}
              >
                X
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addMedicine}
          style={styles.addBtn}
        >
          + Add Medicine
        </button>

        {/* Notes */}
        <label style={styles.label}>Additional Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.textarea}
        />

        <button type="submit" style={styles.saveBtn}>
          Save Prescription
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
    maxWidth: "900px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  medicineRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  smallInput: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    flex: 1,
  },
  addBtn: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "200px",
  },
  removeBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
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

export default DoctorPrescription;