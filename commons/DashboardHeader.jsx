import { User, Stethoscope } from "lucide-react";
import styles from "./home.module.css";

export default function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Stethoscope size={24} />
        <span>MediCitas</span>
      </div>
      <div className={styles.userMenu}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Dr. Juan García</div>
          <div className={styles.userRole}>Médico General</div>
        </div>
        <div className={styles.avatar}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
