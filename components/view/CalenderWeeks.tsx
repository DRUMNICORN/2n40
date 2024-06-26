import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import styles from './CalenderWeeks.module.scss';
import Content from '../content/Content';
import { ContentType, MetadataType } from '@/app/types';
import Linked from '../design/Linked';

interface CalendarProps {
  contents: ContentType[];
}

const CalenderWeeks: React.FC<CalendarProps> = (props) => {
  const { contents: files } = props;
  //  const { setContent, toggleVisibility, visible, setEditing } = useEntityOverlay();
  const [datedFiles, setDatedFiles] = useState<{ [date: string]: any[] }>({});
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  useEffect(() => {
    if (!files) return;

    const updatedDatedFiles: { [date: string]: any[] } = {};
    files.forEach((file) => {
      let date = (file.metadata?.date as string).split(/-/gm).reverse().join('.');
      if (!date) {
        date = 'Unknown';
      }

      updatedDatedFiles[date] = updatedDatedFiles[date] || [];
      updatedDatedFiles[date].push(file);
    });

    Object.keys(updatedDatedFiles).forEach((date) => {
      updatedDatedFiles[date].sort((a, b) => a.name.localeCompare(b.name));
    });

    setDatedFiles(updatedDatedFiles);
  }, [files]);

  const generateDatesForMonth = (monthOffset: number): string[] => {
    const dates: string[] = [];
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);
    currentDate.setDate(1); // Ensure the date starts at the 1st of the month
    currentDate.setHours(0, 0, 0, 0); // Reset time to avoid timezone issues

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      date.setHours(0, 0, 0, 0); // Reset time for each date
      dates.push(date.toISOString().slice(0, 10));
    }

    return dates;
  };

  const monthsToShow = 3;
  const currentDate = new Date();
  const monthDates: string[] = [];

  for (let i = 0; i < monthsToShow; i++) {
    const dates = generateDatesForMonth(i);
    monthDates.push(...dates);
  }

  const sortedDates = useMemo(() => monthDates, [monthDates]);

  const handleDateHover = (date: string) => {
    setHoveredDate(date);
  };

  const handleDateClick = (date: string) => {
    // setDate(date);
    // setName("New Event");
    // setContent({ date, name: 'New Event' } as ContentType);
    // setContent((prev) => ({ ...prev, date, name: 'New Event' } as ContentType)); TODO: Fix this
    // setEditing(true);
    // toggleVisibility();
  };


  const renderWeeks = () => {
    const weeks = [];
    const daysInMonth = sortedDates.length;
    let currentWeek = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = sortedDates[i];
      const day = new Date(date).getDate(); // Extract day of the month
      currentWeek.push(
        <div
          key={date}
          className={styles.day}
          onMouseEnter={() => handleDateHover(date)}
          onMouseLeave={() => handleDateHover('')}
          onClick={() => handleDateClick(date)}
        >
          <div className={styles.dateInfo}>
            {day === 1 ? `${new Date(date).toLocaleString('default', { month: 'long' })} ${new Date(date).getFullYear()}` : day}
            {hoveredDate === date && (
              <Linked>
                <MdAdd className={styles.addIcon} />
              </Linked>
            )}
          </div>
          <div className={styles.cardsContainer}>
            {datedFiles[date] &&
              datedFiles[date].map((file, index) => (
                <Content key={index} content={file} showDetailsOverlay={false} onConnectionClick={function (entry: string | MetadataType): void {
                  throw new Error('Function not implemented.');
                }} />
              ))}
          </div>
        </div>
      );

      if ((i + 1) % 7 === 0 || i === daysInMonth - 1) {
        weeks.push(
          <div key={i} className={styles.week}>
            {currentWeek}
          </div>
        );
        currentWeek = [];
      }
    }
    return weeks;
  };


  return (
    <div className={styles.calendar}>
      <div className={styles.weekDays}>
        <div>So</div>
        <div>Mo</div>
        <div>Di</div>
        <div>Mi</div>
        <div>Do</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      {renderWeeks()}
    </div>
  );

};

export default CalenderWeeks;
