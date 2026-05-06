import { useState } from "react";
import DoctorSidebar from "../components/Doctor/temp";
import { Outlet } from "react-router-dom";

function DoctorLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <DoctorSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        style={{
          marginLeft: isOpen ? "300px" : "110px",
          padding: "40px",
          backgroundColor: "#e9edf5",
          minHeight: "calc(100vh - 80px)",
          
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default DoctorLayout;