import React, { createContext, useState, useContext } from "react";

interface ClinicaContextData {
  clinica: string;
  setClinica: (value: string) => void;
}

interface ClinicaProviderProps {
  children: React.ReactNode;
}

const ClinicaContext = createContext<ClinicaContextData>(
  {} as ClinicaContextData
);

export const useClinicaContext = () => useContext(ClinicaContext);

export const ClinicaProvider = ({ children }: ClinicaProviderProps) => {
  const [clinica, setClinica] = useState("");

  return (
    <ClinicaContext.Provider value={{ clinica, setClinica }}>
      {children}
    </ClinicaContext.Provider>
  );
};
