import React from "react";
import styles from "./NavPrincipal.module.css";
import logo from "../../Assets/logo.png";
import { ReactComponent as Resultados } from "../../Assets/resultados.svg";
import { ReactComponent as Prontuarios } from "../../Assets/prontuario.svg";
import { ReactComponent as Exames } from "../../Assets/exames.svg";
import { ReactComponent as Atestados } from "../../Assets/atestados.svg";
import { ReactComponent as Receitas } from "../../Assets/receitas.svg";
import { ReactComponent as Relatorios } from "../../Assets/relatorios.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../ClinicaContext";

interface Clinica {
  nome: string;
}

interface Clinicas {
  clinicas: Clinica[];
}

const NavPrincipal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rotaAtual, setRotaAtual] = React.useState("");
  const { clinica, setClinica, clinicas, userLogout } =
    React.useContext(UserContext);

  React.useEffect(() => {
    setRotaAtual(location.pathname);
  }, [location]);

  React.useEffect(() => {
    if (!clinicas) {
      userLogout();
      navigate("/");
    }
    if (clinicas) setClinica(clinicas[0]);
  }, []);

  const handleChangeClinica = (e: any) => {
    setClinica(clinicas?.find((objeto) => e.target.value === objeto.nome));
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
      <span className={styles.separador}></span>
      <nav className={styles.menu}>
        <div className={styles.itemMenu}>
          <Link
            className={
              rotaAtual.includes("/resultados") ? styles.selected : styles.item
            }
            to="/home/resultados"
          >
            <Resultados
              fill="white"
              className={
                rotaAtual.includes("/resultados")
                  ? styles.imgSelected
                  : styles.img
              }
            />
            Resultados
          </Link>
        </div>
        <div className={styles.itemMenu}>
          {/* <img src={exames} alt="marcador das agendas" /> */}

          <Link
            className={
              rotaAtual.includes("/pedidosdeexames")
                ? styles.selected
                : styles.item
            }
            to="/home/pedidosdeexames"
          >
            <Exames
              fill="white"
              className={
                rotaAtual.includes("/pedidosdeexames")
                  ? styles.imgSelected
                  : styles.img
              }
            />
            Pedidos
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <Link
            className={
              rotaAtual.includes("/receitas") ? styles.selected : styles.item
            }
            to="/home/receitas"
          >
            <Receitas
              fill="white"
              className={
                rotaAtual.includes("/receitas")
                  ? styles.imgSelected
                  : styles.img
              }
            />
            Receitas
          </Link>
        </div>
        <div className={styles.itemMenu}>
          <Link
            className={
              rotaAtual.includes("/relatorios") ? styles.selected : styles.item
            }
            to="/home/relatorios"
          >
            <Relatorios
              fill="white"
              className={
                rotaAtual.includes("/relatorios")
                  ? styles.imgSelected
                  : styles.img
              }
            />
            Relatórios
          </Link>
        </div>
        {/* <div className={styles.itemMenu}>
          <img src={prontuarios} alt="marcador das agendas" />
          <Link
            className={
              rotaAtual.includes("/prontuarios") ? styles.selected : styles.item
            }
            to="/home/prontuarios"
          >
            Prontuários
          </Link>
        </div> */}
        <div className={styles.itemMenu}>
          <Link
            className={
              rotaAtual.includes("/atestados") ? styles.selected : styles.item
            }
            to="/home/atestados"
          >
            <Atestados
              fill="white"
              className={
                rotaAtual.includes("/atestados")
                  ? styles.imgSelected
                  : styles.img
              }
            />
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
