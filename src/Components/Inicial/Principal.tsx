import React from "react";
import styles from "./Principal.module.css";
import Header from "../Header";
import NavPrincipal from "./NavPrincipal";
import { Route, Routes } from "react-router-dom";
import Central from "../Content/Central";
import SelectClinica from "../Form/SelectClinica";
import PasswordChange from "../Content/PasswordChange";

const Principal = () => {
  return (
    <>
      <section className={styles.principal}>
        <div className={styles.menus}>
          <NavPrincipal />
          <div className={styles.exibicao}>
            <Header />
            <SelectClinica />
            <Routes>
              <Route
                path="resultados"
                element={<Central tipo="resultado" titulo="Resultados" />}
              />
              <Route
                path="pedidosdeexames"
                element={<Central tipo="Pedido de Exame" titulo="Pedidos de Exames" />}
              />
              <Route
                path="receitas"
                element={<Central tipo="Receituário" titulo="Receitas" />}
              />
              <Route
                path="relatorios"
                element={
                  <Central tipo="Relatório Médico" titulo="Relatórios Médicos" />
                }
              />
              <Route
                path="atestados"
                element={<Central tipo="Atestado Médico" titulo="Atestados" />}
              />
              <Route
                path="prontuarios"
                element={<Central tipo="prontuario" titulo="Prontuários" />}
              />
              <Route
                path="alterarsenha"
                element={<PasswordChange />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default Principal;
