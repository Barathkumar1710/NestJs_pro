import React, { useRef, useState } from 'react';
import Image from "next/image";
import styles from "../page.module.css";
import Link from 'next/link';
import SCBIcon from "../../public/scb.svg";
import { LogoutIcon, SettingIcon } from "../../public/icons/icons";
import { useRouter } from 'next/navigation';
import Sidebar from './SideBar';

const Header = () => {
  const router =  useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const handleLinkClick = (e: React.MouseEvent) => {

    setIsOpen(false);
    setIsSubOpen(false);
  }

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsSubOpen(false);
  }

  const handleLogout = async() => {
     sessionStorage.removeItem('token');
     router.push('/login-page');
  }
  return (
    <>
      <div className={styles.header}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div className={styles.dropdow} ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              style={{
                cursor: "pointer",
                backgroundColor: "#ffff",
                color: 'white',
                padding: '2px',
                fontSize: '16px',
                border: 'none',
                width: '30px',
                marginTop: '15px',
              }}
            >
            <SettingIcon/>
            </button>
            {isOpen && (
              <div id="myDropdown" className={styles.dropdownContents} style={{ width: '220px' }}>
                <p style={{ marginLeft: '15px' }}>Application config</p>
                <div style={{ marginLeft: '15px' }}>
                  <Link href="/application-master" onClick={handleLinkClick}>Application Master</Link>
                  <Link href="/report-master" onClick={handleLinkClick}>Report Master</Link>
                  <Link href="/rule-master" onClick={handleLinkClick}>Rule Master</Link>
                </div>
                <p style={{ marginLeft: '15px' }}>Reports</p>
                <div style={{ marginLeft: '15px' }}>
                <Link href={{pathname: '/reportScreen'}} onClick={handleLinkClick}>Data</Link>
                <Link href={{pathname: '/reportScreen'}}onClick={handleLinkClick}>Free Form</Link>
                </div>
              </div>
            )}
          </div>
          <div className={styles.logoContainer}>
            <Image
              src={SCBIcon}
              alt="Standard Chartered Logo"
              width={120}
              height={40}
            />
          </div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>DELRR</p>
        </div>
        <div onClick={handleLogout} style={{cursor:'pointer'}}>
        <LogoutIcon/>
        </div>
      </div >
      <div className={styles.separator} />
    </>
  )
}

export default Header;


// components/Sidebar.tsx
import Link from 'next/link';
import styles from '../Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>MyApp</div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navItem}>🏠 Home</Link>
        <Link href="/about" className={styles.navItem}>ℹ️ About</Link>
        <Link href="/dashboard" className={styles.navItem}>📊 Dashboard</Link>
        <Link href="/settings" className={styles.navItem}>⚙️ Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
