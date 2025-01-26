import { Statistic } from "antd";
import styles from "../styles/home.module.css";

export default function Stadistic({ events }) {
  return (
    <div className={styles.statistics}>
      <Statistic
        title="Pendientes"
        value={events.filter((e) => e.status === "pending").length}
        valueStyle={{ color: "#faad14" }}
      />
      <Statistic
        title="Confirmadas"
        value={events.filter((e) => e.status === "confirmed").length}
        valueStyle={{ color: "#52c41a" }}
      />
      <Statistic
        title="Canceladas"
        value={events.filter((e) => e.status === "cancelled").length}
        valueStyle={{ color: "#f5222d" }}
      />
    </div>
  );
}
