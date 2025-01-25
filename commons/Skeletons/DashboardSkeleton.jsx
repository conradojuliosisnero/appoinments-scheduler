import styles from "./styles/dashboard-skelton.module.css";

export default function DashboardSkeleton() {
  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <div className={styles.navSkeleton}>
          <div className={styles.navItem}></div>
          <div className={styles.navItem}></div>
          <div className={styles.navItem}></div>
        </div>
      </aside>

      <div className={styles.content}>
        <div className={styles.calendarHeader}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.buttonSkeleton}></div>
        </div>

        <div className={styles.calendarSkeleton}>
          <div className={styles.calendarToolbar}>
            <div className={styles.toolbarButton}></div>
            <div className={styles.toolbarButton}></div>
            <div className={styles.toolbarButton}></div>
          </div>
          <div className={styles.calendarGrid}>
            {[...Array(35)].map((_, i) => (
              <div key={i} className={styles.calendarCell}></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
