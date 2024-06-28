// Until.tsx
import React, { useMemo } from "react";
import styles from "./DateContainer.module.scss"; // Adjust the path based on your project structure

interface DaysUntilProps {
  date: string;
}

const Until: React.FC<DaysUntilProps> = ({ date = "2021-01-01" }) => {
  const today = new Date();
  const dateObject = useMemo(() => {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [date]);

  const diffDays = useMemo(() => {
    const timeDiff = dateObject.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }, [dateObject, today]);

  if (diffDays === 0) return <div className={styles.daysUntil}>Heute</div>;
  if (diffDays === 1) return <div className={styles.daysUntil}>Morgen</div>;
  if (diffDays === 2) return <div className={styles.daysUntil}>Übermorgen</div>;
  if (diffDays < 0) return <div className={styles.daysUntil}>Vor {Math.abs(diffDays)} Tagen</div>;
  return <div className={styles.daysUntil}>In {diffDays} Tagen</div>;
};

export default Until;
