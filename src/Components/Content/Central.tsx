import React from "react";
import { useLocation } from "react-router-dom";
import ContainerCards from "./ContainerCards";
import styles from "./Central.module.css";

interface CentralProps {
  tipo: string;
  titulo: string;
}

const Central = ({ tipo, titulo }: CentralProps) => {
  return (
    <section className={`${styles.containerCards} animeLeft`}>
      <ContainerCards tipo={tipo} titulo={titulo} />
    </section>
  );
};

export default Central;
