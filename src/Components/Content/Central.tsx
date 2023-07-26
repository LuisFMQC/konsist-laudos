import React from "react";
import { useLocation } from "react-router-dom";
import ContainerCards from "./ContainerCards";

interface CentralProps {
  tipo: string;
  titulo: string;
}

const Central = ({ tipo, titulo }: CentralProps) => {
  return (
    <>
      <ContainerCards tipo={tipo} titulo={titulo} />
    </>
  );
};

export default Central;
