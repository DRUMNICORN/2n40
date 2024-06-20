import React from 'react';
import { ViewType } from '@/app/types';
import CalendarDays from '@/components/view/CalenderDays';
import Carousel from '@/components/view/Carousel';
// import Columns from '@/components/layout/Columns';

const CalendarDaysMemo = React.memo(CalendarDays as React.FC) as React.FC;
const CarouselMemo = React.memo(Carousel as React.FC) as React.FC;
// const ColumnsMemo = React.memo(Columns as React.FC) as React.FC;

export const useViewComponent = (mode: ViewType): React.FC => {
  switch (mode) {
    case ViewType.CalendarDays:
      return CalendarDaysMemo;
    case ViewType.Carousel:
      return CarouselMemo;
    default:
      return () => <></>;
  }
};
