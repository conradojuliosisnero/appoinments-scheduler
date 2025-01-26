"use client";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
import DashboardSkeleton from "@/commons/Skeletons/DashboardSkeleton";
import { useSelector } from "react-redux";
import ErrorComponent from "@/commons/Errors/Errors";
import dynamic from "next/dynamic";
import FilterCalendar from "./FilterCalendar";

const Appoinments = dynamic(() =>
  import("@/components/Appoiments/Appoinments")
);

const AppoinmentsForm = dynamic(() =>
  import("@/components/Home/components/AppoinmentsForm")
);

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
  const [events, setEvents] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.dashboard?.userData?.id);
  const showForm = useSelector((state) => state.dashboard?.newAppoinmentForm);
  const filtersFind = useSelector((state) => state.dashboard.filtersFind);

  // Determinar qué eventos mostrar
  const eventsToShow =
    filtersFind?.length > 0
      ? filtersFind.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      : events;

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await fetch(`/api/quotes/user/${userId}`);
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();

        // Transformar datos al formato correcto
        const events = data.flatMap((user) =>
          user.appointments.map((appointment) => {
            const start = new Date(appointment.startDate);
            const end = new Date(appointment.endDate);

            return {
              id: appointment.id,
              title: appointment.title,
              start,
              end,
              status: appointment.status.toLowerCase(),
              patient: user.name,
              description: appointment.description,
            };
          })
        );

        setEvents(events);
      } catch (error) {
        setEvents([]);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getInitialData();
    }
  }, [userId]);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <main className={styles.main}>
        <DashboardNav />
        <div className={styles.content}>
          <div className={styles.calendarHeader}>
            <h1 className={styles.calendarTitle}>Calendario de Citas</h1>
            <DashboardBtnAppoinment />
          </div>

          <FilterCalendar events={events} />
          <div className={styles.calendar}>
            <Calendar
              localizer={localizer}
              events={eventsToShow}
              startAccessor="start"
              endAccessor="end"
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)}
              culture="es"
              eventPropGetter={(event) => ({
                className: event.status.toLowerCase().replace(" ", "-"),
              })}
              components={{
                agenda: Appoinments,
              }}
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
        {showForm && <AppoinmentsForm />}
      </main>
    </>
  );
}
