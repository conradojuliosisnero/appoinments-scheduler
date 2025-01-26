"use client";
import styles from "./error.module.css";
export default function ErrorComponent({ message }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>!</div>
        <h2 className={styles.errorTitle}>Oops, algo salió mal</h2>
        <p className={styles.errorMessage}>{message}</p>
        <button className={styles.btnReload} onClick={() => window.location.reload()}>
          Recargar
        </button>
      </div>
    </div>
  );
}
