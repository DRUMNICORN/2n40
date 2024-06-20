import { useState } from 'react';
import { ViewType } from '@/app/types';
import CalendarDays from '../components/view/CalenderDays';

interface ViewModeHook {
    mode: ViewType;
    cycleViewMode: () => void;
    setMode: (mode: ViewType) => void;
}

export const useViewMode = (): ViewModeHook => {
    const [mode, setMode] = useState<ViewType>(ViewType.CalendarDays);

    const cycleViewMode = () => {
        const type_values = Object.values(ViewType);
        const index = (type_values.indexOf(mode) + 1) % type_values.length;
        setMode(type_values[index] as ViewType);
    };

    return {
        mode,
        cycleViewMode,
        setMode
    };
};
