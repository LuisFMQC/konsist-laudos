import React from "react";
import styles from "./LoginPasswordLost.module.css";
import useForm from "../Hooks/useForm";
import Input from "../Form/Input";
import { PASSWORD_LOST } from "../../api";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const LoginPasswordLost = () => {
  const email = useForm("email");
  const urlRecuperar = "http://18.230.75.177:1415/resetar";
  const [passChanged, setPassChanged] = React.useState(false);
  const el = null;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (email.validate()) {
      const { url, options } = PASSWORD_LOST({
        email: email.value,
        linkRecuperar: urlRecuperar,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setPassChanged(true);
      }
    }
  }

  function handleCloseModal() {
    setPassChanged(false);
    navigate("/");
  }

  return (
    <div className={styles.containerForm}>
      <Modal
        appElement={el}
        className={styles.modal}
        isOpen={passChanged}
        onRequestClose={() => handleCloseModal()}
        ariaHideApp={true}
      >
        <h2>
          Email para redefinição de senha enviado com sucesso
          <span>!</span>
        </h2>
        <p>
          Um email foi enviado para <span>{email.value}</span> com as instruções
          para a redefinição de senha.
        </p>
        <button onClick={() => handleCloseModal()}>Fechar</button>
      </Modal>
      <h1>
        Digite o email para a recuperação de senha
        <span className={styles.ponto}>.</span>
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="email"
          type="email"
          label="Email*"
          placeholder="Digite seu email aqui..."
          {...email}
        />
        <p className={styles.aviso}>
          *Deve ser o mesmo e-mail cadastrado anteriormente.
        </p>
        <button>ENVIAR</button>
      </form>
    </div>
  );
};

export default LoginPasswordLost;
