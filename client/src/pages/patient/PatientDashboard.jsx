import { useState } from "react";
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
  const [appointments, setAppointments] = useState([
    {
      doctor: "Dr. Smith",
      speciality: "Cardiologist",
      date: "20 Feb 2026",
      status: "Confirmed",
    },
  ]);

  const [reports, setReports] = useState(5);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);

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

    if (!hospital) {
      setAvailableDoctors([]);
      return;
    }

    const doctors = hospital.doctors.filter(
      (d) => d.availability[day]
    );

    setAvailableDoctors(doctors);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleConfirmAppointment = () => {
    if (
      !selectedHospital ||
      !selectedDay ||
      !selectedTime ||
      availableDoctors.length === 0
    ) {
      alert("Please select hospital, day and time");
      return;
    }

    const doctor = availableDoctors.find((d) =>
      d.availability[selectedDay]?.includes(selectedTime)
    );

    if (!doctor) {
      alert("No doctor available for this slot");
      return;
    }

    setAppointments((prev) => [
      ...prev,
      {
        doctor: doctor.name,
        speciality: doctor.speciality,
        date: `${selectedHospital} - ${selectedDay} ${selectedTime}`,
        status: "Pending",
      },
    ]);

    alert("Appointment booked successfully!");
  };

  // ================= UI =================
  return (
    <>
     

      <div className="patient-container">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Patient Panel</h3>
          <ul>
            <li>Dashboard</li>
            <li>Appointments</li>
            <li>Medical Records</li>
            <li>Health Data</li>
            <li>Pharmacy</li>
            <li>Profile</li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          <h2>Welcome, Patient 👋</h2>

          {/* BOOK APPOINTMENT */}
          <div className="booking-section">
            <select onChange={handleHospitalChange}>
              <option value="">Select Hospital</option>
              {hospitalsData.map((h, i) => (
                <option key={i} value={h.name}>
                  {h.name}
                </option>
              ))}
            </select>

            <select onChange={handleDayChange}>
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
            </select>

            <select onChange={handleTimeChange}>
              <option value="">Select Time</option>
              {availableDoctors.flatMap((d) =>
                d.availability[selectedDay]?.map((time, i) => (
                  <option key={i} value={time}>
                    {time}
                  </option>
                ))
              )}
            </select>

            {availableDoctors.length > 0 && (
              <div className="available-doctors">
                <h4>Available Doctors</h4>
                {availableDoctors.map((d, i) => (
                  <p key={i}>
                    {d.name} ({d.speciality})
                  </p>
                ))}
              </div>
            )}

            <button onClick={handleConfirmAppointment}>
              Confirm Appointment
            </button>
          </div>

          {/* STATS */}
          <div className="stats">
            <div className="card">
              Upcoming Appointments: {appointments.length}
            </div>
            <div className="card">Reports Uploaded: {reports}</div>
            <div className="card">Prescriptions: 3</div>
          </div>

          {/* APPOINTMENTS LIST */}
          <div className="section">
            <h3>Upcoming Appointments</h3>

            {appointments.map((a, index) => (
              <div className="appointment-card" key={index}>
                <p>{a.doctor} - {a.speciality}</p>
                <p>Date: {a.date}</p>
                <p>Status: {a.status}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="section">
            <h3>Quick Actions</h3>
            <div className="actions">
              <button onClick={() => setReports(reports + 1)}>
                Upload Report
              </button>
              <button>Order Medicines</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientDashboard;
