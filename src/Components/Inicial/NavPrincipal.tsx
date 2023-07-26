import React from "react";
import styles from "./NavPrincipal.module.css";
import logo from "../../Assets/logo.png";
import resultados from "../../Assets/resultados.svg";
import prontuarios from "../../Assets/prontuario.svg";
import exames from "../../Assets/exames.svg";
import atestados from "../../Assets/atestados.svg";
import receitas from "../../Assets/receitas.svg";
import relatorios from "../../Assets/relatorios.svg";
import { Link, useLocation } from "react-router-dom";
import clinicas from "./Clinicas";
import { useClinicaContext } from "../../ClinicaContext";

interface Clinica {
  nome: string;
}

interface Clinicas {
  clinicas: Clinica[];
}

const NavPrincipal = () => {
  const location = useLocation();
  const [rotaAtual, setRotaAtual] = React.useState("");
  const { clinica, setClinica } = useClinicaContext();

  React.useEffect(() => {
    setRotaAtual(location.pathname);
  }, [location]);

  const handleChangeClinica = (e: any) => {
    setClinica(e.target.value);
  };

  return (
    <section className={styles.containerMenu}>
      <img src={logo} alt="logomarca da empresa Konsist" />
      <div className={styles.clinica}>
        {/* <label htmlFor="estados">Selecione a clínica</label> */}
        <select
          name="clinicas"
          id="clinicas"
          onChange={handleChangeClinica}
          value={clinica}
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
      <span className={styles.separador}></span>
      <nav className={styles.menu}>
        <div className={styles.itemMenu}>
          <img src={resultados} alt="marcador da página inicial" />
          <Link
            className={
              rotaAtual.includes("/resultados") ? styles.selected : styles.item
            }
            to="/home/resultados"
          >
            Resultados
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <img src={exames} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/pedidosdeexames")
                ? styles.selected
                : styles.item
            }
            to="/home/pedidosdeexames"
          >
            Pedidos de Exames
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <img src={receitas} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/receitas") ? styles.selected : styles.item
            }
            to="/home/receitas"
          >
            Receitas
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <img src={relatorios} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/relatorios") ? styles.selected : styles.item
            }
            to="/home/relatorios"
          >
            Relatórios
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <img src={prontuarios} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/prontuarios") ? styles.selected : styles.item
            }
            to="/home/prontuarios"
          >
            Prontuários
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <img src={atestados} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/atestados") ? styles.selected : styles.item
            }
            to="/home/atestados"
          >
            Atestados
          </Link>
        </div>
      </nav>
      <div className={styles.copyright}>
        <p>Konsist Serviços Empresariais</p>
        <p>© Todos os direitos reservados.</p>
      </div>
    </section>
  );
};

export default NavPrincipal;
