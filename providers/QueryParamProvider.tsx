import React from "react";
import { createContext, ReactNode, useState } from "react";


interface QueryParamContextInterface {
    param: Record<string, string | string[]>; // Current query parameters
    setParam: (key: string, value: string | string[] | null) => void; // Set a single query parameter
    setParamState: (param: Record<string, string | string[]>) => void; // Set all query parameters
    toggleParam: (key: string, value: string) => void; // Toggle a query parameter value
}





const QueryParamContext = createContext<QueryParamContextInterface>({
    param: {},
    setParam: () => { },
    setParamState: () => { },
    toggleParam: () => { },
});



export const QueryParamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [param, setParamState] = useState<Record<string, string | string[]>>({});

    const setParam = (key: string, value: string | string[] | null) => {
        setParamState((prevParam: any) => {
            return { ...prevParam, [key]: value };
        });
    };

    const toggleParam = (key: string, value: string) => {
        setParamState(prevParam => {
            const currentValue = prevParam[key] || [];
            const newValue = Array.isArray(currentValue)
                ? currentValue.includes(value)
                    ? currentValue.filter(v => v !== value)
                    : [...currentValue, value]
                : value;
            return { ...prevParam, [key]: newValue };
        });
    };

    const queryParamContextValue: QueryParamContextInterface = {
        param,
        setParam,
        setParamState,
        toggleParam,
    };

    return (
        <QueryParamContext.Provider value={queryParamContextValue}>
            {children}
        </QueryParamContext.Provider>
    );
};


export const useQueryParam = () => {
    return React.useContext(QueryParamContext);
};