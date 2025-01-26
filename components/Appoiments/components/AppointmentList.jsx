import styles from "../styles/appoinments.module.css";

const AppointmentList = ({ appointments }) => {
  return (
    <ul className={styles.list}>
      {appointments.map((appointment) => (
        <li key={appointment.id} className={styles.item}>
          <h3>{appointment.title}</h3>
          <p>Paciente: {appointment.patient}</p>
          <span className={`${styles.status} ${styles[appointment.status]}`}>
            {appointment.status}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;
