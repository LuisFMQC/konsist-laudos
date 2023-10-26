import React from "react";
import styles from "./Header.module.css";
import { ReactComponent as Settngs } from "../Assets/settings.svg";
import sair from "../Assets/sair.svg";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../ClinicaContext";

const Header = () => {
  const { userLogout, nome } = React.useContext(UserContext);
  const location = useLocation();
  const currentRoute = location.pathname;
  const [showMenu, setShowMenu] = React.useState(false);

  function onChangeShowMenu() {
    setShowMenu(!showMenu);
  }

  React.useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <section className={styles.header}>
      <div className={styles.titulo}>
        <h1>Seja bem vindo</h1>
        <h1>{nome}</h1>
      </div>
      <div className={styles.mostrarMenu}>
        <Settngs className={styles.itemMostrar} onClick={onChangeShowMenu} />
        {/* {showMenu && ( */}
        <div className={`${styles.itensMenu} ${showMenu ? styles.open : ""}`}>
          <ul>
            {/* <li>
              <Link
                className={
                  currentRoute.includes("/perfil")
                    ? styles.selected
                    : styles.item
                }
                to="/home/perfil"
              >
                Meu Perfil
              </Link>
            </li> */}
            <li>
              <Link
                to="/home/alterarsenha"
                className={
                  currentRoute.includes("/alterarsenha")
                    ? styles.selected
                    : styles.item
                }
              >
                Alterar Senha
              </Link>
            </li>
            <li className={styles.sair} onClick={userLogout}>
              <p>Sair</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.125 15.825C15.975 15.675 15.9 15.4938 15.9 15.2813C15.9 15.0688 15.975 14.8917 16.125 14.75L18.125 12.75H10.125C9.9125 12.75 9.73438 12.6777 9.59063 12.5331C9.44688 12.3885 9.375 12.2094 9.375 11.9956C9.375 11.7819 9.44688 11.6042 9.59063 11.4625C9.73438 11.3208 9.9125 11.25 10.125 11.25H18.075L16.05 9.225C15.9167 9.09167 15.85 8.92128 15.85 8.71383C15.85 8.50636 15.9268 8.32719 16.0803 8.17633C16.2211 8.02544 16.3971 7.95 16.6083 7.95C16.8194 7.95 17 8.025 17.15 8.175L20.475 11.5C20.5583 11.5833 20.6167 11.6678 20.65 11.7533C20.6833 11.8389 20.7 11.9306 20.7 12.0283C20.7 12.1261 20.6833 12.2167 20.65 12.3C20.6167 12.3833 20.5583 12.4667 20.475 12.55L17.175 15.85C17.0417 15.9833 16.8708 16.05 16.6625 16.05C16.4542 16.05 16.275 15.975 16.125 15.825ZM4.5 21C4.1 21 3.75 20.85 3.45 20.55C3.15 20.25 3 19.9 3 19.5V4.5C3 4.1 3.15 3.75 3.45 3.45C3.75 3.15 4.1 3 4.5 3H11.025C11.2375 3 11.4156 3.07229 11.5594 3.21688C11.7031 3.36148 11.775 3.54064 11.775 3.75438C11.775 3.96813 11.7031 4.14583 11.5594 4.2875C11.4156 4.42917 11.2375 4.5 11.025 4.5H4.5V19.5H11.025C11.2375 19.5 11.4156 19.5723 11.5594 19.7169C11.7031 19.8615 11.775 20.0406 11.775 20.2544C11.775 20.4681 11.7031 20.6458 11.5594 20.7875C11.4156 20.9292 11.2375 21 11.025 21H4.5Z"
                  fill="#BE0D23"
                />
              </svg>
            </li>
          </ul>
        </div>
        {/* )} */}
      </div>
      {/*  */}
    </section>
  );
};

export default Header;
