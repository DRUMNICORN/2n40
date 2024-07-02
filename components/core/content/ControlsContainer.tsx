import React, { useCallback, useMemo } from 'react';
import ControlsComponent from './ControlsComponent';
import { MetadataType } from '@/exports/interfaces';

interface EntityFilterProps {
    param: MetadataType;
    setParam: (key: any, value: string | string[] | null) => void;
    toggleParam: (key: any, value: string) => void;
}

const ControlsContainer: React.FC<EntityFilterProps> = ({ param, setParam, toggleParam }) => {
    const handleSwap = useCallback(() => {
        if (!param) return;
        let name = param.name;
        if (param.name) toggleParam('connections', name as string);
    }, [param, toggleParam]);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSwap();
        }
    }, [handleSwap]);

    const metadataEntries = useMemo(() => param?.connections || [], [param]) as string[];

    return (
        <ControlsComponent
            param={param}
            handleSwap={handleSwap}
            handleKeyPress={handleKeyPress}
            setParam={setParam}
            toggleParam={toggleParam}
            metadataEntries={metadataEntries}
        />
    );
};

export default React.memo(ControlsContainer);
