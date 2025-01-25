"use client";
import { Calendar } from "react-big-calendar";
import { dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../styles/home.module.css";
import DashboardBtnAppoinment from "./DashboardBtnAppoinment";
import { useState } from "react";
import DashboardNav from "../../../commons/DashboardNav";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function DashboardContend() {
  const [events, setEvents] = useState([
    {
      title: "Consulta General",
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 0),
      patientName: "Juan Pérez",
      doctorName: "Dr. García",
      type: "General",
    },
  ]);

  return (
    <>
      <main className={styles.main}>
        <DashboardNav />
        <div className={styles.content}>
          <div className={styles.calendarHeader}>
            <h1 className={styles.calendarTitle}>Calendario de Citas</h1>
            <DashboardBtnAppoinment />
          </div>

          <div className={styles.calendar}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              culture="es"
              messages={{
                next: "Siguiente",
                previous: "Anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
                agenda: "Agenda",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
