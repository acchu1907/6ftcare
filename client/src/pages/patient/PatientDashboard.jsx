import { useState, useEffect } from "react";
import "./PatientDashboard.css";
import Navbar from "../../components/Navbar";

function PatientDashboard() {

  // ================= DATA =================
  const hospitalsData = [
    {
      name: "Apollo Hospital",
      doctors: [
        {
          name: "Dr. Smith",
          speciality: "Cardiologist",
          availability: {
            Monday: ["10:00", "11:00"],
            Tuesday: ["14:00"],
          },
        },
        {
          name: "Dr. Jane",
          speciality: "Dermatologist",
          availability: {
            Monday: ["12:00"],
            Wednesday: ["10:00", "11:00"],
          },
        },
      ],
    },
    {
      name: "Fortis Hospital",
      doctors: [
        {
          name: "Dr. Kumar",
          speciality: "Orthopedic",
          availability: {
            Tuesday: ["10:00", "16:00"],
            Thursday: ["11:00"],
          },
        },
      ],
    },
  ];

  // ================= STATE =================
  const [activeView, setActiveView] = useState("dashboard");

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [reports, setReports] = useState(5);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // ================= HANDLERS =================
  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
    setSelectedDay("");
    setSelectedTime("");
    setAvailableDoctors([]);
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    setSelectedDay(day);
    setSelectedTime("");

    const hospital = hospitalsData.find(
      (h) => h.name === selectedHospital
    );

    if (!hospital) return;

    const doctors = hospital.doctors.filter(
      (d) => d.availability[day]
    );

    setAvailableDoctors(doctors);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleConfirm = (doctor) => {
    if (!selectedHospital || !selectedDay || !selectedTime) {
      alert("Please complete selections");
      return;
    }

    const exists = appointments.find(
      (a) =>
        a.doctor === doctor.name &&
        a.date === `${selectedHospital} - ${selectedDay} ${selectedTime}`
    );

    if (exists) {
      alert("This slot is already booked");
      return;
    }

    setAppointments((prev) => [
      ...prev,
      {
        doctor: doctor.name,
        speciality: doctor.speciality,
        date: `${selectedHospital} - ${selectedDay} ${selectedTime}`,
        status: "Confirmed",
      },
    ]);
  };

  const cancelAppointment = (index) => {
    const updated = [...appointments];
    updated.splice(index, 1);
    setAppointments(updated);
  };

  // ================= UI =================
  return (
    <>
      

      <div className="patient-container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Patient Panel</h3>
          <ul>
            <li
              className={activeView === "dashboard" ? "active" : ""}
              onClick={() => setActiveView("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={activeView === "appointments" ? "active" : ""}
              onClick={() => setActiveView("appointments")}
            >
              Appointments
            </li>
            <li
              className={activeView === "records" ? "active" : ""}
              onClick={() => setActiveView("records")}
            >
              Medical Records
            </li>
            <li
              className={activeView === "health" ? "active" : ""}
              onClick={() => setActiveView("health")}
            >
              Health Data
            </li>
            <li
              className={activeView === "pharmacy" ? "active" : ""}
              onClick={() => setActiveView("pharmacy")}
            >
              Pharmacy
            </li>
            <li
              className={activeView === "profile" ? "active" : ""}
              onClick={() => setActiveView("profile")}
            >
              Profile
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <h2>Welcome, Patient 👋</h2>

          {/* ================= DASHBOARD VIEW ================= */}
          {activeView === "dashboard" && (
            <>
              <div className="booking-card">
                <div className="booking-row">
                  <select onChange={handleHospitalChange}>
                    <option value="">Select Hospital</option>
                    {hospitalsData.map((h, i) => (
                      <option key={i} value={h.name}>
                        {h.name}
                      </option>
                    ))}
                  </select>

                  <select
                    disabled={!selectedHospital}
                    onChange={handleDayChange}
                  >
                    <option value="">Select Day</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                  </select>

                  <select
                    disabled={!selectedDay}
                    onChange={handleTimeChange}
                  >
                    <option value="">Select Time</option>
                    {availableDoctors.flatMap((d) =>
                      d.availability[selectedDay]?.map((time, i) => (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {availableDoctors.length > 0 && selectedTime && (
                  <div className="doctor-list">
                    {availableDoctors.map((d, i) => (
                      <div key={i} className="doctor-card">
                        <div>
                          <strong>{d.name}</strong>
                          <p>{d.speciality}</p>
                        </div>
                        <button onClick={() => handleConfirm(d)}>
                          Confirm
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="stats">
                <div className="card">
                  Upcoming Appointments: {appointments.length}
                </div>
                <div className="card">
                  Reports Uploaded: {reports}
                </div>
                <div className="card">
                  Prescriptions: 3
                </div>
              </div>
            </>
          )}

          {/* ================= APPOINTMENTS VIEW ================= */}
          {activeView === "appointments" && (
            <div className="section">
              <h3>All Appointments</h3>

              {appointments.length === 0 && (
                <p>No appointments yet.</p>
              )}

              {appointments.map((a, index) => (
                <div key={index} className="appointment-card">
                  <p><strong>{a.doctor}</strong> - {a.speciality}</p>
                  <p>{a.date}</p>
                  <p>Status: {a.status}</p>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(index)}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================= PLACEHOLDER VIEWS ================= */}
          {activeView === "records" && (
            <div className="section">
              <h3>Medical Records</h3>
              <p>Upload and manage medical reports here.</p>
            </div>
          )}

          {activeView === "health" && (
            <div className="section">
              <h3>Health Data</h3>
              <p>Track BP, Sugar, BMI and more.</p>
            </div>
          )}

          {activeView === "pharmacy" && (
            <div className="section">
              <h3>Pharmacy</h3>
              <p>Order medicines online.</p>
            </div>
          )}

          {activeView === "profile" && (
            <div className="section">
              <h3>Profile</h3>
              <p>Manage your personal details.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default PatientDashboard;