import { useState, useEffect } from "react";
import "./PatientDashboard.css";
import Navbar from "../../components/Navbar";
import axios from "axios";

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

  const [appointments, setAppointments] = useState([]);

  const [reports, setReports] = useState(5);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

// for medical records
  const [records, setRecords] = useState([]);


  // ================= HANDLERS =================
  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
    setSelectedDay("");
    setSelectedTime("");
    setAvailableDoctors([]);
  };

  const fetchAppointments = async () => {

  try {

    const response = await axios.get(
      `http://localhost:5000/api/patient/appointments?patientId=${user._id}`
    );

    setAppointments(response.data);

  } catch (error) {

    console.log(error);

  }

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

  const handleConfirm = async (doctor) => {

  if (!selectedHospital || !selectedDay || !selectedTime) {
    alert("Please complete selections");
    return;
  }

  try {

    await axios.post(
      "http://localhost:5000/api/patient/book",
      {
        patientId: user._id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        hospital: selectedHospital,
        date: selectedDay,
        time: selectedTime,
      }
    );

alert("Appointment booked successfully");

fetchAppointments();

setSelectedHospital("");
setSelectedDay("");
setSelectedTime("");
setAvailableDoctors([]);

  } catch (error) {

    console.log(error);

    alert("Booking failed");
  }
};
const upcomingAppointments = appointments.filter(
  (a) =>
    a.status === "Pending" ||
    a.status === "Confirmed"
);

const previousAppointments = appointments.filter(
  (a) =>
    a.status === "Closed" ||
    a.status === "Cancelled" ||
    a.status === "Rejected"
);

const cancelAppointment = async (id) => {
  

  try {

    await axios.put(
      `http://localhost:5000/api/patient/cancel/${id}`
    );

    fetchAppointments();


  } catch (error) {

    console.log(error);

    alert("Cancel failed");

  }

};

//for medical records

const fetchRecords = async () => {

  try {

    const response = await axios.get(
      `http://localhost:5000/api/records/${user._id}`
    );
console.log(response.data);
    setRecords(response.data);

  } catch (error) {

    console.log(error);

  }

};


  useEffect(() => {
  fetchAppointments();

  //for medical records
  
  fetchRecords();
}, []);

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
          <h2>
            Welcome, {user?.name || "Patient"}
          </h2>

          {/* ================= DASHBOARD VIEW ================= */}
          {activeView === "dashboard" && (
            <>
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

              {/* ===== ADD APPOINTMENT ===== */}
              <h3>Add Appointment</h3>

              <div className="booking-card">

                <div className="booking-row">

                  <select
  value={selectedHospital}
  onChange={handleHospitalChange}
>
                    <option value="">Select Hospital</option>

                    {hospitalsData.map((h, i) => (
                      <option key={i} value={h.name}>
                        {h.name}
                      </option>
                    ))}
                  </select>

                  <select
  value={selectedDay}
  disabled={!selectedHospital}
  onChange={handleDayChange}
>
                    <option value="">Select Day</option>

                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>

                  </select>


<select
  value={selectedTime}
  disabled={!selectedDay}
  onChange={handleTimeChange}
>

<option value="">Select Time</option>

{availableDoctors.map((doctor) =>
  doctor.availability[selectedDay]?.map((time, index) => (
    <option
      key={`${doctor.name}-${index}`}
      value={time}
    >
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

              {/* ===== UPCOMING APPOINTMENTS ===== */}
              <h3>Upcoming Appointments</h3>

              {upcomingAppointments.length === 0 && (
                <p>No upcoming appointments.</p>
              )}

              {upcomingAppointments.map((a, index) => (

                <div key={index} className="appointment-card">

                  <p>
                    <strong>{a.doctorName}</strong> - {a.speciality}
                  </p>

                  <p>
                    {a.hospital} - {a.date} - {a.time}
                  </p>

                  <p>Status: {a.status}</p>

                  <button
                    className="cancel-btn"
                    onClick={() => cancelAppointment(a._id)}
                  >
                    Cancel
                  </button>

                </div>

              ))}

              {/* ===== PREVIOUS APPOINTMENTS ===== */}
              <h3>Previous Appointments</h3>

              {previousAppointments.length === 0 && (
                <p>No previous appointments.</p>
              )}

              {previousAppointments.map((a, index) => (

                <div key={index} className="appointment-card">

                  <p>
                    <strong>{a.doctorName}</strong> - {a.speciality}
                  </p>

                  <p>
                    {a.hospital} - {a.date} - {a.time}
                  </p>

                  <p>Status: {a.status}</p>

                </div>

              ))}

            </div>
          )}

{activeView === "records" && (

  <div className="section">

    <h3>Medical Records</h3>

    <div className="records-grid">

      {records.map((record) => (

        <div
          key={record._id}
          className="record-card"
        >

          <h4>{record.fileName}</h4>

          <button>
            Open
          </button>

        </div>

      ))}

    </div>

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