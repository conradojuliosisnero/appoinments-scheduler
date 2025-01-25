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
import { useEffect, useState } from "react";
import DashboardNav from "../../../commons/DashboardNav";
import { useDispatch } from "react-redux";
import DashboardSkeleton from "@/commons/Skeletons/DashboardSkeleton";
// import { useFetch } from "@/hooks/useFetch";

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await fetch("/api/quotes");
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setEvents([]);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    getInitialData();
  }, []);

  if (loading) return <DashboardSkeleton />;
  if (error) return <p>Ocurrió un error: {error}</p>;

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
