// CalendarDays.tsx

import React, { useState, useEffect, useMemo } from 'react';
import styles from './CalenderDays.module.scss';
import DateContainer from '../design/DateContainer';
import ContentColumns from '../layout/ContentColumns';
import { ContentType } from '@/app/types';
import { formatDate } from '@/utils/date'; // Adjust the path as per your project structure

interface CalendarProps {
  contents: ContentType[];
}

const CalendarDays: React.FC<CalendarProps> = ({ contents }) => {
  const [groupedFiles, setGroupedFiles] = useState<{ [key: string]: ContentType[] }>({});

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

    // Sort files within each date group
    Object.entries(groupedByDate).forEach(([date, files]) => {
      groupedByDate[date] = files.sort((a, b) => (a.metadata?.name as string).localeCompare(b.metadata?.name as string));
    });

    setGroupedFiles(groupedByDate);
  }, [contents]);

  const sortedDates = useMemo(() => Object.keys(groupedFiles).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  ), [groupedFiles]);

  return (
    <div className={styles.calendar}>
      {sortedDates.map((date) => (
        <div key={date} className={styles.calendarItem}>
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
