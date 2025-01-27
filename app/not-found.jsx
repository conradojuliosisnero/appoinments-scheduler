"use client";
import Link from 'next/link';
import styles from '@/styles/not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1 className={styles.title}>404</h1>
              <p className={styles.message}>Página no encontrada</p>
              <Link href="/" className={styles.link}>Volver al Home</Link>
      </div>
      {/* <div className={styles.animation}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div> */}
    </div>
  );
};

export default NotFound;