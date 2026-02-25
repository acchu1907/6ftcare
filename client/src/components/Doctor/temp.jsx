import React from "react";
import { NavLink } from "react-router-dom";
import "./DoctorSidebar.css";

function DoctorSidebar() {
  return (
    <div className="doctor-sidebar">
      <h2 className="sidebar-logo">6FeetCare</h2>

      <nav className="sidebar-links">
        <NavLink to="/doctor" end>
          Dashboard
        </NavLink>

        <NavLink to="/doctor/appointments">
          Appointments
        </NavLink>

        <NavLink to="/doctor/patients">
          Patients
        </NavLink>

        <NavLink to="/doctor/prescription">
          Prescription
        </NavLink>

        <NavLink to="/doctor/availability">
          Availability
        </NavLink>
      </nav>
    </div>
  );
}

export default DoctorSidebar;