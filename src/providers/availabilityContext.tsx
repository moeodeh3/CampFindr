import React, { createContext, useContext, useState } from 'react';
import { AvailabilityInput } from '../hooks/api/ontario-parks/types';

interface AvailabilityContextType {
  availabilityInput: AvailabilityInput | null;
  setAvailabilityInput: (input: AvailabilityInput | null) => void;
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(
  undefined
);

export const AvailabilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [availabilityInput, setAvailabilityInput] =
    useState<AvailabilityInput | null>(null);

  return (
    <AvailabilityContext.Provider
      value={{ availabilityInput, setAvailabilityInput }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = (): AvailabilityContextType => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw new Error(
      'useAvailability must be used within an AvailabilityProvider'
    );
  }
  return context;
};
