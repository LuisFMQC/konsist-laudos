import React from 'react';
import useForm from '../Hooks/useForm';
import Input from '../Form/Input';
import styles from './LoginForm.module.css';
import login from '../../Assets/img-login.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const cpf = useForm('cpf');
  const senha = useForm("");

  return (
  <section className={styles.login}>
  <div className={styles.containerLogin}>
    <h1>
      Bem vindo ao <span className={styles.r}>R</span><span className={styles.x}>X</span>
    </h1>
    <form className={styles.form}>
      <Input
        name="cpf"
        type="cpf"  
        label="CPF"
        placeholder="000.000.000-00"
        {...cpf}
      />
      <Input
        name="senha"
        type="password"
        label="Senha"
        placeholder="********"
        {...senha}
      />
      <div className={styles.esqueceu}>
        <Link className={styles.link} to="/recuperar">
          Esqueceu sua senha?
        </Link>
      </div>
      <button>Entrar</button>
    </form>
    {/* <div className={styles.links}>
      <a href="">Suporte</a>
      <a href="">Contato</a>
      <a href="">Produtos</a>
    </div> */}
  </div>
  <img src={login} alt="imagem de um médico usando um notebook" />
</section>
)
};

export default LoginForm;
