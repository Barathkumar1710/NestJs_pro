// components/Sidebar.tsx
import Link from 'next/link';
import styles from '../Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MyApp</div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Application Config</p>
        <nav className={styles.nav}>
          <Link href="/application-master" className={styles.navItem}>🗂 Application Master</Link>
          <Link href="/report-master" className={styles.navItem}>📑 Report Master</Link>
          <Link href="/rule-master" className={styles.navItem}>📘 Rule Master</Link>
        </nav>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Reports</p>
        <nav className={styles.nav}>
          <Link href="/reportScreen" className={styles.navItem}>📊 Data</Link>
          <Link href="/reportScreen" className={styles.navItem}>📝 Free Form</Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
