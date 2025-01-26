import styles from "./styles/home.module.css";
import dynamic from "next/dynamic";

const DashboardHeader = dynamic(() => import("@/commons/DashboardHeader"));
const DashboardContend = dynamic(() => import("./components/DashboardContend"));

function Dashboard() {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <DashboardContend />
    </div>
  );
}

export default Dashboard;
