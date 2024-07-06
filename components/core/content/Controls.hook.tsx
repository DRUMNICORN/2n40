import React, { useCallback, useMemo } from 'react';
import { MetadataType } from '@/exports/interfaces';

interface EntityFilterProps {
    param: MetadataType;
    setParam: (key: any, value: string | string[] | null) => void;
    toggleParam: (key: any, value: string) => void;
}

export const useControls = ({ param, setParam, toggleParam }: EntityFilterProps) => {
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

    return {
        param,
        handleSwap,
        handleKeyPress,
        setParam,
        toggleParam,
        metadataEntries,
    };
};
