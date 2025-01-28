import toast from "react-hot-toast";
import styles from "../styles/appoinments.module.css";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import {
  toggleUpdateClientForm,
  toggleDeleteClientForm,
} from "@/slices/clientSlice";

const AppointmentList = ({ appointments }) => {
  const [updateAppointment, setUpdateAppointment] = useState(false);
  const [deleteAppointment, setDeleteAppointment] = useState(false);

  const dispatch = useDispatch();

  const users = [
    {
      id: 1,
      title: "Cita de prueba",
      patient: "Paciente de prueba",
      status: "pending",
    },
    {
      id: 2,
      title: "Cita de prueba 2",
      patient: "Paciente de prueba 2",
      status: "confirmed",
    },
    {
      id: 3,
      title: "Cita de prueba 3",
      patient: "Paciente de prueba 3",
    },
  ];

  useEffect(() => {
    dispatch(toggleUpdateClientForm(updateAppointment));
  }, [updateAppointment]);

  useEffect(() => {
    dispatch(toggleDeleteClientForm(deleteAppointment));
  }, [deleteAppointment]);

  return (
    <ul className={styles.list}>
      {users.map((appointment) => (
        <li key={appointment.id} className={styles.item}>
          <h3>{appointment.title}</h3>
          <p>Paciente: {appointment.patient}</p>
          <span className={`${styles.status} ${styles[appointment.status]}`}>
            {appointment.status}
          </span>
          <div className={styles.buttonsContainer}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "48%" }}
              className={styles.buttonEdit}
              onClick={() => setUpdateAppointment(true)}
            >
              Actualizar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "48%" }}
              className={styles.buttonDelete}
              onClick={() => setDeleteAppointment(true)}
            >
              Eliminar
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;
