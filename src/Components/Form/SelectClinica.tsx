import React from "react";
import { UserContext } from "../../ClinicaContext";
import styles from "./SelectClinica.module.css";

const SelectClinica = () => {
  const { clinica, setClinica, clinicas } = React.useContext(UserContext);
  const handleChangeClinica = (e: any) => {
    setClinica(clinicas?.find((objeto) => e.target.value === objeto.nome));
  };

  return (
    <div className={styles.clinica}>
      {/* <label htmlFor="estados">Selecione a clínica</label> */}
      <select
        name="clinicas"
        id="clinicas"
        onChange={handleChangeClinica}
        value={clinica ? clinica.nome : ""}
      >
        <option value="">Selecione uma clínica...</option>
        {clinicas &&
          clinicas.map((clinica, index) => (
            <option key={index} value={clinica.nome}>
              {clinica.nome}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectClinica;
