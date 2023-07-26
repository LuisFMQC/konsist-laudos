import React from "react";
import styles from "./Principal.module.css";
import Header from "../Header";
import NavPrincipal from "./NavPrincipal";
import { Route, Routes } from "react-router-dom";
import Central from "../Content/Central";

const Principal = () => {
  return (
    <>
      <section className={styles.principal}>
        <div className={styles.menus}>
          <NavPrincipal />
          <div className={styles.exibicao}>
            <Header />
            <Routes>
              <Route
                path="resultados"
                element={<Central tipo="resultado" titulo="Resultados" />}
              />
              <Route
                path="pedidosdeexames"
                element={<Central tipo="exame" titulo="Pedidos de Exames" />}
              />
              <Route
                path="receitas"
                element={<Central tipo="receita" titulo="Receitas" />}
              />
              <Route
                path="relatorios"
                element={
                  <Central tipo="relatorio" titulo="Relatórios Médicos" />
                }
              />
              <Route
                path="atestados"
                element={<Central tipo="atestado" titulo="Atestados" />}
              />
              <Route
                path="prontuarios"
                element={<Central tipo="prontuario" titulo="Prontuários" />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default Principal;
