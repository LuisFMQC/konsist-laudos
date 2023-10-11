import React from "react";
import useForm from "../Hooks/useForm";
import Input from "../Form/Input";
import styles from "./LoginForm.module.css";
import login from "../../Assets/img-login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../ClinicaContext";

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);
  const usuario = useForm("cpf");
  const senha = useForm("");
  const navigate = useNavigate();
  const [tamanhoCampo, setTamanhoCampo] = React.useState(100);
  const regex = /^[a-zA-Z@.]+$/;

  React.useEffect(() => {
    if (
      regex.test(usuario.value) ||
      usuario.value === undefined ||
      usuario.value === ""
    ) {
      setTamanhoCampo(100);
    } else {
      setTamanhoCampo(14);
    }
  }, [usuario.value]);

  function loginNavigate(e: any) {
    e.preventDefault();
    if (usuario.validate() && senha.validate()) {
      userLogin(usuario.value, senha.value);
    }
  }

  return (
    <section className={styles.login}>
      <div className={styles.containerLogin}>
        <h1>
          Bem vindo ao <span className={styles.r}>R</span>
          <span className={styles.x}>X</span>
        </h1>
        <form className={styles.form} onSubmit={loginNavigate}>
          <Input
            name="usuario"
            type="text"
            label="Usuário"
            placeholder="Email ou CPF"
            maxLength={tamanhoCampo}
            {...usuario}
          />
          <Input
            name="senha"
            type="password"
            label="Senha"
            placeholder="********"
            {...senha}
          />
          <div className={styles.esqueceu}>
            <Link className={styles.link} to="/perdeu">
              Esqueceu sua senha?
            </Link>
          </div>
          <button>Entrar</button>
          <p>{error}</p>
        </form>
        {/* <div className={styles.links}>
      <a href="">Suporte</a>
      <a href="">Contato</a>
      <a href="">Produtos</a>
    </div> */}
      </div>
      <img src={login} alt="imagem de um médico usando um notebook" />
    </section>
  );
};

export default LoginForm;
