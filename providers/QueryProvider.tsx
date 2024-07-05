import React, { createContext, ReactNode, useContext, useState } from 'react';

interface QueryContextInterface {
    param: Record<string, string | string[]>; // Current query parameters
    setParam: (key: string, value: string | string[] | null) => void; // Set a single query parameter
    setParamState: (param: Record<string, string | string[]>) => void; // Set all query parameters
    toggleParam: (key: string, value: string) => void; // Toggle a query parameter value
}

const QueryContext = createContext<QueryContextInterface>({
    param: {},
    setParam: () => {},
    setParamState: () => {},
    toggleParam: () => {},
});

export const useQuery = () => {
    return useContext(QueryContext);
};

export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [param, setParamState] = useState<Record<string, string | string[]>>({});

    const setParam = (key: string, value: string | string[] | null) => {
        setParamState((prevParam: any) => {
            if (value === null) {
                delete prevParam[key];
            } else {
                prevParam[key] = value;
            }
            return { ...prevParam };
        });
    };

    const setParamStateHandler = (newParam: Record<string, string | string[]>) => {
        setParamState(newParam);
    };

    const toggleParam = (key: string, value: string) => {
        setParamState((prevParam) => {
            const currentValue = prevParam[key] || [];
            const newValue =
                Array.isArray(currentValue) ?
                    currentValue.includes(value) ?
                        currentValue.filter((v) => v !== value) :
                        [...currentValue, value] :
                    value;

            return { ...prevParam, [key]: newValue };
        });
    };

    const QueryContextValue: QueryContextInterface = {
        param,
        setParam,
        setParamState: setParamStateHandler,
        toggleParam,
    };

    return <QueryContext.Provider value={QueryContextValue}>{children}</QueryContext.Provider>;
};
