"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the context interface
interface Tooltip {
  message: string;
  duration?: number; // Duration in milliseconds
  active: boolean;
}

interface TooltipContextInterface {
  tooltip: string;
  setTooltip: React.Dispatch<React.SetStateAction<string>>;
  triggerTooltip: (message: string, duration?: number) => void;
  tooltips: Tooltip[];
  setTooltips: React.Dispatch<React.SetStateAction<Tooltip[]>>;
}

// Create the context
const TooltipContext = createContext<TooltipContextInterface>({} as TooltipContextInterface);

// Create a provider component for the tooltip context
export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState(`Wilkommen - zurück!`);
  const [tooltips, setTooltips] = useState<Tooltip[]>([]);

  useEffect(() => {
    if (tooltips.length > 0) {
      const activeTooltip = tooltips.find((tooltip) => tooltip.active);
      if (activeTooltip) {
        setTooltip(activeTooltip.message);

        if (activeTooltip.duration) {
          const timeout = setTimeout(() => {
            setTooltips((prevTooltips) =>
              prevTooltips.map((t) =>
                t.message === activeTooltip.message ? { ...t, active: false } : t
              )
            );
            setTooltip(`Wilkommen - zurück!`);
          }, activeTooltip.duration);

          return () => clearTimeout(timeout);
        }
      } else {
        setTooltip(`Wilkommen - zurück!`);
      }
    }
  }, [tooltips]);

  const triggerTooltip = (message: string, duration?: number) => {
    setTooltips((prevTooltips) =>
      prevTooltips.map((tooltip) =>
        tooltip.message === message
          ? { ...tooltip, active: true, duration }
          : tooltip
      )
    );
  };

  const tooltipContextValue: TooltipContextInterface = {
    tooltip,
    setTooltip,
    triggerTooltip,
    tooltips,
    setTooltips,
  };

  return (
    <TooltipContext.Provider value={tooltipContextValue}>
      {children}
    </TooltipContext.Provider>
  );
};

// useTooltip is a custom hook to consume the tooltip context
export const useTooltip = (): TooltipContextInterface => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider");
  }

  return context;
};
