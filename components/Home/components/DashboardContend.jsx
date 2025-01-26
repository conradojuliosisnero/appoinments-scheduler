"use client";

import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../styles/home.module.css";
import DashboardNav from "../../../commons/DashboardNav";
import DashboardSkeleton from "@/commons/Skeletons/DashboardSkeleton";
import ErrorComponent from "@/commons/Errors/Errors";
import dynamic from "next/dynamic";
import FilterCalendar from "./FilterCalendar";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import { useSelector } from "react-redux";
import { quoteService } from "@/services/quotes";
import toast from "react-hot-toast";
import Stadistic from "./Stadistic";

const Appoinments = dynamic(() =>
  import("@/components/Appoiments/Appoinments")
);

// const localizer = BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

export default function DashboardContend() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // redux
  const userId = useSelector((state) => state.dashboard?.userData?.id);
  const filteredEvents = useSelector((state) => state.dashboard.filtersFind);

  useEffect(() => {
    if (!userId) return;

    const initializeEvents = async () => {
      try {
        setLoading(true);
        const userEvents = quoteService.getCitas(userId);
        const formattedEvents = userEvents.map(formatEvent);
        setEvents(formattedEvents);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeEvents();
  }, [userId]);

  const formatEvent = (appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    status: appointment.status.toLowerCase(),
    description: appointment.description,
  });

  const handleSelectEvent = (event) => {
    setCurrentEvent({
      id: event.id,
      title: event.title,
      description: event.description,
      date: moment(event.start),
      time: moment(event.start),
      status: event.status,
    });
    setIsModalVisible(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setCurrentEvent({
      start,
      end,
      title: "",
      description: "",
      status: "pending",
    });
    setIsModalVisible(true);
  };

  const handleSaveEvent = async (values) => {
    try {
      const { title, description, date, time, status } = values;
      const startDate = date.toDate();
      const [hours, minutes] = time.format("HH:mm").split(":");
      startDate.setHours(parseInt(hours), parseInt(minutes));

      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      const eventToSave = {
        title,
        description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: status || "pending",
      };

      const savedEvent = currentEvent.id
        ? await quoteService.updateCita(userId, currentEvent.id, eventToSave)
        : await quoteService.createCita(userId, eventToSave);

      const formattedEvent = formatEvent(savedEvent);

      setEvents((prev) =>
        currentEvent.id
          ? prev.map((evt) =>
              evt.id === currentEvent.id ? formattedEvent : evt
            )
          : [...prev, formattedEvent]
      );

      toast.success(currentEvent.id ? "Cita actualizada" : "Cita creada");
      setIsModalVisible(false);
    } catch (err) {
      console.error("Error al guardar la cita:", err);
      toast.error("Error al guardar la cita");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await quoteService.deleteCita(userId, currentEvent.id);
      setEvents((prev) => prev.filter((evt) => evt.id !== currentEvent.id));
      toast.success("Cita eliminada exitosamente");
      setIsModalVisible(false);
    } catch (err) {
      console.error("Error al eliminar la cita:", err);
      toast.error("Error al eliminar la cita");
    }
  };

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorComponent />;

  return (
    <main className={styles.main}>
      <DashboardNav />
      <div className={styles.content}>
        <div className={styles.calendarHeader}>
          <h1 className={styles.calendarTitle}>Calendario de Citas</h1>
          <FilterCalendar events={events} />
        </div>
        {/* START STADISTIC  */}
        <Stadistic events={events} />
        {/* END STADISTIC  */}

        {/* CALENDAR  */}
        <div className={styles.calendar}>
          <Calendar
            localizer={localizer}
            events={filteredEvents.length > 0 ? filteredEvents : events}
            startAccessor="start"
            endAccessor="end"
            date={currentDate}
            onNavigate={setCurrentDate}
            culture="es"
            selectable
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            eventPropGetter={({ status }) => ({
              className: status?.toLowerCase().replace(" ", "-"),
            })}
            components={{ agenda: Appoinments }}
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

      {/* MODAL FORM ADD APPOINTMENT  */}
      {isModalVisible && (
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {currentEvent?.id ? "Editar Cita" : "Nueva Cita"}
            </div>
          }
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            initialValues={currentEvent}
            onFinish={handleSaveEvent}
            layout="vertical"
            className={styles.modalForm}
          >
            <Form.Item
              name="title"
              label="Título"
              rules={[{ required: true, message: "Ingrese un título" }]}
              hasFeedback
            >
              <Input placeholder="Ingrese un título para la cita" />
            </Form.Item>
            <Form.Item name="description" label="Descripción">
              <Input.TextArea
                rows={4}
                placeholder="Ingrese una descripción (opcional)"
              />
            </Form.Item>
            <Form.Item
              name="date"
              label="Fecha"
              rules={[{ required: true, message: "Seleccione una fecha" }]}
              hasFeedback
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                placeholder="Seleccione una fecha"
              />
            </Form.Item>
            <Form.Item
              name="time"
              label="Hora"
              rules={[{ required: true, message: "Seleccione una hora" }]}
              hasFeedback
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Seleccione una hora"
              />
            </Form.Item>
            <Form.Item name="status" label="Estado">
              <Select placeholder="Seleccione el estado de la cita">
                <Select.Option value="pending">Pendiente</Select.Option>
                <Select.Option value="confirmed">Confirmada</Select.Option>
                <Select.Option value="cancelled">Cancelada</Select.Option>
              </Select>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                danger
                onClick={handleDeleteEvent}
                style={{ width: "48%" }}
              >
                Eliminar
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: "48%" }}>
                {currentEvent?.id ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </Form>
        </Modal>
      )}

    </main>
  );
}
