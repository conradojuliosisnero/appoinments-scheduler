"use client";
import { Plus } from "lucide-react";
import styles from "../styles/home.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAppoinmentForm } from "@/slices/dashboardSlice";

export default function DashboardBtnAppoinment() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handlerToggle = () => {
    setShowForm(!showForm);
  };

  const handleNewAppointment = () => {
    handlerToggle();
    dispatch(toggleAppoinmentForm(showForm));
  };

  return (
    <button className={styles.newAppointment} onClick={handleNewAppointment}>
      <Plus size={20} />
      Nueva Cita
    </button>
  );
}
