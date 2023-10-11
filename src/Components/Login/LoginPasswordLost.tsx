import React from "react";
import styles from "./LoginPasswordLost.module.css";
import useForm from "../Hooks/useForm";
import Input from "../Form/Input";
import { PASSWORD_LOST } from "../../api";


const LoginPasswordLost = () => {
  const email = useForm("email")
  const urlRecuperar = "http://localhost:3000/resetar"

  async function handleSubmit(e: any){
    e.preventDefault();
    if(email.validate()){
      const {url, options} = PASSWORD_LOST({email: email.value, linkRecuperar: urlRecuperar});
      const response = await fetch(url, options);
      const json = await response.json();
      if(response.ok) console.log(json);
    }
  }

  return <div className={styles.containerForm}>
  <h1>
    Digite o email para a recuperação de senha<span className={styles.ponto}>.</span>
  </h1>
  <form onSubmit={handleSubmit} className={styles.form}>
    <Input
      name="email"
      type="email"
      label="Email*"
      placeholder="Digite seu email aqui..."
      {...email}
    />
    <p className={styles.aviso}>*Deve ser o mesmo e-mail cadastrado anteriormente.</p>
    <button>ENVIAR</button>
  </form>
</div>;
};

export default LoginPasswordLost;
