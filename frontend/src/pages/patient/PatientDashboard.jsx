import { useState, useEffect } from "react";
import "./PatientDashboard.css";
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
  const [reports, setReports] = useState([]);
  const [records, setRecords] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);

  const [newRecordName, setNewRecordName] = useState("");

  const [health, setHealth] = useState({
    bp: "",
    sugar: "",
    bmi: ""
  });

  const [medicine, setMedicine] = useState("");
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH =================
  const fetchAppointments = async () => {
    const res = await axios.get(`http://localhost:5000/api/patient/appointments?patientId=${user._id}`);
    setAppointments(res.data);
  };

  const fetchRecords = async () => {
    const res = await axios.get(`http://localhost:5000/api/records/${user._id}`);
    setRecords(res.data);
  };

  const fetchHealth = async () => {
    const res = await axios.get(`http://localhost:5000/api/health/${user._id}`);
    if (res.data) setHealth(res.data);
  };
  const fetchOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/pharmacy", {
    headers: { Authorization: localStorage.getItem("token") }
  });
  setOrders(res.data);
};

  useEffect(() => {
    fetchAppointments();
    fetchRecords();
    fetchHealth();
    fetchOrders();
  }, []);

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

    const hospital = hospitalsData.find(h => h.name === selectedHospital);
    if (!hospital) return;

    const doctors = hospital.doctors.filter(d => d.availability[day]);
    setAvailableDoctors(doctors);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleConfirm = async (doctor) => {
    if (!selectedHospital || !selectedDay || !selectedTime) {
      alert("Complete selections");
      return;
    }

    await axios.post("http://localhost:5000/api/patient/book", {
      patientId: user._id,
      doctorName: doctor.name,
      speciality: doctor.speciality,
      hospital: selectedHospital,
      date: selectedDay,
      time: selectedTime,
    });

    alert("Booked");
    fetchAppointments();

    setSelectedHospital("");
    setSelectedDay("");
    setSelectedTime("");
    setAvailableDoctors([]);
  };

  const cancelAppointment = async (id) => {
    await axios.put(`http://localhost:5000/api/patient/cancel/${id}`);
    fetchAppointments();
  };

  const handleUploadRecord = async () => {
    if (!newRecordName) return;

    await axios.post("http://localhost:5000/api/records/upload", {
      patientId: user._id,
      fileName: newRecordName,
      fileUrl: "dummy.pdf"
    });

    setNewRecordName("");
    fetchRecords();
  };

  const handleSaveHealth = async () => {
    await axios.post("http://localhost:5000/api/health", {
      patientId: user._id,
      ...health
    });

    alert("Saved");
  };

  const upcomingAppointments = appointments.filter(
    a => a.status === "Pending" || a.status === "Confirmed"
  );

  const previousAppointments = appointments.filter(
    a => ["Closed", "Cancelled", "Rejected"].includes(a.status)
  );
const [profile, setProfile] = useState({
  name: user?.name || "",
  email: user?.email || ""
});

const handleProfileUpdate = async () => {
  try {
    const res = await axios.put(
      "http://localhost:5000/api/auth/update",
      profile,
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data));

    alert("Profile updated");

  } catch (err) {
    alert("Update failed");
  }
};

const handleOrder = async () => {
  if (!medicine) return;

  await axios.post(
    "http://localhost:5000/api/pharmacy/order",
    { medicine },
    {
      headers: { Authorization: localStorage.getItem("token") }
    }
  );

  setMedicine("");
  fetchOrders();
};
  // ================= UI =================
  return (
    <div className="patient-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Patient Panel</h3>
        <ul>
          <li onClick={() => setActiveView("dashboard")}>Dashboard</li>
          <li onClick={() => setActiveView("appointments")}>Appointments</li>
          <li onClick={() => setActiveView("records")}>Medical Records</li>
          <li onClick={() => setActiveView("health")}>Health Data</li>
          <li onClick={()=>setActiveView("pharmacy")}>Pharmacy</li> 
          <li onClick={()=>setActiveView("profile")}>Profile</li> 
        </ul>
      </div>

      {/* MAIN */}
      <div className="main-content">
        <h2>Welcome, {user?.name}</h2>

        {/* DASHBOARD */}
        {activeView === "dashboard" && (
          <div className="stats">
            <div className="card">Appointments: {appointments.length}</div>
            <div className="card">Reports: {records.length}</div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {activeView === "appointments" && (
          <>
            <select value={selectedHospital} onChange={handleHospitalChange}>
              <option>Select Hospital</option>
              {hospitalsData.map(h => <option key={h.name}>{h.name}</option>)}
            </select>

            <select value={selectedDay} onChange={handleDayChange}>
              <option>Select Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
            </select>

            <select value={selectedTime} onChange={handleTimeChange}>
              <option>Select Time</option>
              {availableDoctors.flatMap(d =>
                d.availability[selectedDay]?.map((t, i) =>
                  <option key={i}>{t}</option>
                )
              )}
            </select>

            {availableDoctors.map(d => (
              <div key={d.name}>
                {d.name}
                <button onClick={() => handleConfirm(d)}>Confirm</button>
              </div>
            ))}

            <h3>Upcoming</h3>
            {upcomingAppointments.map(a => (
              <div key={a._id}>
                {a.doctorName}
                <button onClick={() => cancelAppointment(a._id)}>Cancel</button>
              </div>
            ))}
          </>
        )}

        {/* RECORDS */}
        {activeView === "records" && (
          <>
            <input
              value={newRecordName}
              onChange={(e) => setNewRecordName(e.target.value)}
              placeholder="Record name"
            />
            <button onClick={handleUploadRecord}>Upload</button>

            {records.map(r => (
              <div key={r._id}>{r.fileName}</div>
            ))}
          </>
        )}

        {/* HEALTH */}
        {activeView === "health" && (
          <>
            <input
              placeholder="BP"
              value={health.bp}
              onChange={(e) => setHealth({ ...health, bp: e.target.value })}
            />
            <input
              placeholder="Sugar"
              value={health.sugar}
              onChange={(e) => setHealth({ ...health, sugar: e.target.value })}
            />
            <input
              placeholder="BMI"
              value={health.bmi}
              onChange={(e) => setHealth({ ...health, bmi: e.target.value })}
            />

            <button onClick={handleSaveHealth}>Save</button>
             
           
          </>
        )}
        {/* PHARMACY */}
        {activeView === "pharmacy" && (
  <div className="section">
    

    <input
      placeholder="Enter medicine name"
      value={medicine}
      onChange={(e) => setMedicine(e.target.value)}
    />

    <button onClick={handleOrder}>
      Order
    </button>

    <h4>Your Orders</h4>

    {orders.length === 0 && <p>No orders yet</p>}

    {orders.map((o) => (
      <div key={o._id}>
        {o.medicine} - {o.status}
      </div>
    ))}
  </div>
)}
        {/* PROFILE */} 
        {activeView === "profile" && (
  <div className="section">
    <h3>Profile</h3>

    <input
      value={profile.name}
      onChange={(e) =>
        setProfile({ ...profile, name: e.target.value })
      }
    />

    <input
      value={profile.email}
      onChange={(e) =>
        setProfile({ ...profile, email: e.target.value })
      }
    />

    <button onClick={handleProfileUpdate}>
      Save Changes
    </button>

    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}
    >
      Logout
    </button>
  </div>
)}
      
        

      </div>
    </div>
  );
}

export default PatientDashboard;