"use client";
import { Plus } from "lucide-react";
import styles from "../styles/home.module.css";
import { useDispatch } from "react-redux";
import { toggleAppoinmentForm } from "@/slices/dashboardSlice";

export default function DashboardBtnAppoinment() {
  const dispatch = useDispatch();

  const handleNewAppointment = () => {
    dispatch(toggleAppoinmentForm(true));
  };

  return (
    <button className={styles.newAppointment} onClick={handleNewAppointment}>
      <Plus size={20} />
      Nueva Cita
    </button>
  );
}
