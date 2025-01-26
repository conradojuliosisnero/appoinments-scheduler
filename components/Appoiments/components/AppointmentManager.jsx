"use client";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import AppointmentList from "./AppointmentList";
import styles from "../styles/appoinments.module.css";

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API
    // Por ahora, usaremos datos de ejemplo
    const fetchAppointments = async () => {
      // const response = await fetch('tu-api-url');
      // const data = await response.json();
      const data = [
        {
          id: 1,
          title: "Consulta General",
          status: "pendiente",
          patient: "Juan Pérez",
        },
        {
          id: 2,
          title: "Revisión Cardiología",
          status: "completada",
          patient: "María García",
        },
        {
          id: 3,
          title: "Examen de Sangre",
          status: "cancelada",
          patient: "Carlos Rodríguez",
        },
      ];
      setAppointments(data);
      setFilteredAppointments(data);
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || appointment.status === statusFilter)
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, statusFilter, appointments]);

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Citas Médicas</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <AppointmentList appointments={filteredAppointments} />
    </div>
    </>
  );
};

export default AppointmentManager;
