"use client";
import { useRef, useState, useEffect } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";
import SCBIcon from "../../public/scb.svg";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [tableOptions, setTableOptions] = useState<string[]>([]);
  const [odsOptions, setOdsOptions] = useState<string[]>([]);
  const [frequencyOptions, setFrequencyOptions] = useState<string[]>([]);
  const [versionOptions, setVersionOptions] = useState<string[]>([]);

  useEffect(() => {
     fetch("http://localhost:5000/api/dropdown-data")
      .then((res) => res.json())
      .then((data) => {
        setTableOptions(data.tableNames || []);
        setOdsOptions(data.odsVals || []);
        setFrequencyOptions(data.frequencyVals || []);
        setVersionOptions(data.versionVals || []);
      })
      
      .catch((err) => console.error("Dropdown fetch failed:", err));      
  }, []);

  const [rows, setRows] = useState(
    Array(1).fill({
      table: "",
      ods: "",
      frequency: "",
      version: "",
      showCalendar: false,
      selectedDate: new Date(),
    })
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...rows];
    updated[index][field] = value;

    if (field === "ods" && value !== "custom") {
      updated[index].showCalendar = false;
    }

    setRows(updated);
  };

  const toggleCalendar = (index: number) => {
    const updated = [...rows];
    updated[index].showCalendar = !updated[index].showCalendar;
    setRows(updated);
  };

  const handleDateChange = (index: number, date: Date) => {
    const updated = [...rows];
    updated[index].selectedDate = date;
    updated[index].ods = format(date, "dd/MM/yyyy");
    updated[index].showCalendar = false;
    setRows(updated);
  };

  const parseDate = (dateStr: string): Date | null => {
    const [dd, mm, yyyy] = dateStr.split("/");
    if (dd && mm && yyyy) {
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    return null;
  };

  useEffect(() => {
    const closeCalendar = (event: MouseEvent) => {
      calendarRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setRows((prev) =>
            prev.map((row, i) =>
              i === index ? { ...row, showCalendar: false } : row
            )
          );
        }
      });
    };
    document.addEventListener("mousedown", closeCalendar);
    return () => document.removeEventListener("mousedown", closeCalendar);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button className={styles.dropbtn} onClick={() => setIsOpen(!isOpen)}>
              <svg width="25px" height="25px" viewBox="0 0 20 20" fill="none">
                <path
                  fill="#000000"
                  fillRule="evenodd"
                  d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
                />
              </svg>
            </button>
            {isOpen && (
              <div className={styles.dropdownContents}>
                <a onClick={() => setIsSubOpen(!isSubOpen)} style={{ cursor: "pointer" }}>
                  Application config
                </a>
                <Link href="/application-master">Application Master</Link>
                <Link href="/report-master">Report Master</Link>
                <Link href="/">Rule Master</Link>
                <Link href="/reportScreen">Reports</Link>
                <Link href="/report-templates">Report Templates</Link>
              </div>
            )}
          </div>
          <div className={styles.logoContainer}>
            <Image src={SCBIcon} alt="SCB" width={120} height={40} />
          </div>
        </div>
      </div>
      <div className={styles.separator} />

      <div className={styles.mainPage} style={{marginTop: "25px"}}>
        {/* <h3 style={{ marginLeft: "30px" }}>Table Configuration Grid</h3> */}
        <table style={{ width: "84%", margin: "20px auto", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f2f2f2" }}>
              <th style={cellStyle}>Table_Name</th>
              <th style={cellStyle}>ODS_VAL</th>
              <th style={cellStyle}>Frequency_val</th>
              <th style={cellStyle}>Version_val</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={cellStyle}>
                  <select value={row.table} onChange={(e) => handleChange(index, "table", e.target.value)}>
                    <option value="">Select</option>
                    {tableOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>

                <td style={{ ...cellStyle, position: "relative" }}>
                  <select
                    value={row.ods}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        toggleCalendar(index);
                      } else {
                        handleChange(index, "ods", e.target.value);
                      }
                    }}
                    onClick={() => toggleCalendar(index)}
                  >
                    <option value="">Select</option>
                    {odsOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="custom">Custom Date</option>
                  </select>

                  {row.showCalendar && (
                    <div
                      ref={(ref) => (calendarRefs.current[index] = ref)}
                      style={{ position: "absolute", top: "40px", zIndex: 1000 }}
                    >
                      <Calendar
                        onChange={(date) => handleDateChange(index, date as Date)}
                        value={row.selectedDate}
                      />
                    </div>
                  )}
                </td>

                <td style={cellStyle}>
                  <select
                    value={row.frequency}
                    onChange={(e) => handleChange(index, "frequency", e.target.value)}
                  >
                    <option value="">Select</option>
                    {frequencyOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>

                <td style={cellStyle}>
                  <select
                    value={row.version}
                    onChange={(e) => handleChange(index, "version", e.target.value)}
                  >
                    <option value="">Select</option>
                    {versionOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody> 
        </table>
      </div>
    </div>
  );
}

const cellStyle: React.CSSProperties = {
  padding: "15px",
  border: "1px solid #ccc",
};
