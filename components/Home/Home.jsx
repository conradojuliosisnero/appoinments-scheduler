"use client";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./styles/home.module.css";
import DashboardHeader from "../../commons/DashboardHeader";
import DashboardContend from "./components/DashboardContend";
import AppoinmentsForm from "./components/AppoinmentsForm";
import { useSelector } from "react-redux";

function Dashboard() {
  const showForm = useSelector((state) => state.dashboard.newAppoinmentForm);

  return (
    <div className={styles.container}>
      <DashboardHeader />
      <DashboardContend />
      {showForm && <AppoinmentsForm />}
    </div>
  );
}

export default Dashboard;
