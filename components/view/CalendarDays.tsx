import React, { useState, useEffect, useMemo } from 'react';
import styles from './CalendarDays.module.scss';
import ContentColumns from './ContentColumns';
import { formatDate } from '@/exports/date';
import DateContainer from '../core/design/DateContainer';
import { ContentType } from '@/exports/interfaces';

interface CalendarProps {
  contents: ContentType[];
}

const CalendarDays: React.FC<CalendarProps> = ({ contents }) => {
  const [groupedFiles, setGroupedFiles] = useState<{ [key: string]: ContentType[] }>({});
  const [revealedDays, setRevealedDays] = useState<string[]>([]);

  useEffect(() => {
    if (!contents) return;

    const groupedByDate: { [key: string]: ContentType[] } = {};

    contents.forEach((file) => {
      const dateKey = formatDate(file.metadata?.date?.toString() || "");
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(file);
    });

    Object.entries(groupedByDate).forEach(([date, files]) => {
      groupedByDate[date] = files.sort((a, b) => (a.metadata?.name as string).localeCompare(b.metadata?.name as string));
    });

    setGroupedFiles(groupedByDate);
  }, [contents]);

  const sortedDates = useMemo(() => Object.keys(groupedFiles).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  ), [groupedFiles]);

  useEffect(() => {
    setTimeout(() => {
      setRevealedDays(sortedDates);
    }, 500); // Adjust the delay as needed
  }, [sortedDates]);

  return (
    <div className={styles.calendar}>
      {sortedDates.map((date) => (
        <div key={date} className={`${styles.calendarItem} ${revealedDays.includes(date) ? styles.reveal : ''}`}>
          <div className={styles.dateInfo}>
            <DateContainer date={date} />
          </div>
          <div className={styles.cardsContainer}>
            <ContentColumns contents={groupedFiles[date]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarDays;
