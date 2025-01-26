"use client";
import { useState } from "react";
import styles from "../styles/home.module.css";
import { useDispatch } from "react-redux";
import { toggleAppoinmentForm } from "@/slices/dashboardSlice";
import toast from "react-hot-toast";

export default function AppoinmentsForm() {
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleCloseForm = () => {
    dispatch(toggleAppoinmentForm(false));
    setNewAppointment({
      title: "",
      patientName: "",
      doctorName: "",
      type: "",
      date: "",
      time: "",
    });
  };

  const handleSaveAppointment = async (e) => {
    e.preventDefault();
    const [hours, minutes] = newAppointment.time.split(":");
    const startDate = new Date(newAppointment.date);
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const appointment = {
      title: newAppointment.title,
      start: startDate,
      end: endDate,
      description: newAppointment.patientName,
      status: "pending",
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      }
      const response = await fetch("/api/quotes/new", options);
      if (response.status !== 201) {
        throw new Error("Error al crear la cita");
      }
      const data = await response.json();
      setEvents([...events, appointment]);
      toast.success("Cita creada correctamente");
    } catch (error) {
      toast.error("Error al crear la cita");
    } finally {
    handleCloseForm();
    }

  };

  return (
    <>
      <div className={styles.overlay} onClick={handleCloseForm} />
      <form className={styles.appointmentForm} onSubmit={handleSaveAppointment}>
        <h2 className={styles.formTitle}>Nueva Cita</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>Título</label>
          <input
            type="text"
            className={styles.input}
            value={newAppointment.title}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                title: e.target.value,
              })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descripcion</label>
          <textarea
            type="text"
            className={styles.input}
            value={newAppointment.patientName}
            onChange={(e) =>
              setNewAppointment({
                ...newAppointment,
                patientName: e.target.value,
              })
            }
            style={{ resize: "none" }}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Fecha</label>
          <input
            type="date"
            className={styles.input}
            value={newAppointment.date}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, date: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Hora</label>
          <input
            type="time"
            className={styles.input}
            value={newAppointment.time}
            onChange={(e) =>
              setNewAppointment({ ...newAppointment, time: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCloseForm}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.saveButton}>
            Guardar
          </button>
        </div>
      </form>
    </>
  );
}
