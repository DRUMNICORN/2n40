// DateContainer.tsx

import React, { useMemo } from "react";
import styles from "./DateContainer.module.scss";
import Until from "./Until";
import { formatDate, getDayOfWeek } from "@/utils/date"; // Adjust the path as per your project structure

interface DateContainerProps {
  date: string;
}

const DateContainer: React.FC<DateContainerProps> = ({ date }) => {
  const parsedDate = useMemo(() => formatDate(date), [date]);
  const currentDate = new Date(parsedDate);
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();
  const dayOfWeek = useMemo(() => getDayOfWeek(currentDate), [currentDate]);

  return (
    <div className={`${styles.dateContainer} ${styles.visible}`}>
      <div className={styles.dayOfWeek}>{dayOfWeek}</div>
      <div className={styles.formattedDate}>
        <div className={styles.day}>{day}.</div>
        <div className={styles.month}>{month}.</div>
        <div className={styles.year}>{year}</div>
      </div>
      <div className={styles.styledHamburger}>
        <Until date={`${year}-${month}-${day}`} />
      </div>
    </div>
  );
};

export default DateContainer;
