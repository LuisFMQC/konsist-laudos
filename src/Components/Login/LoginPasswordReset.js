import React from "react";
import styles from "./LoginPasswordReset.module.css";
import Input from "../Form/Input";
import useForm from "../Hooks/useForm";
import { PASSWORD_RESET, USER_GET } from "../../api";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const LoginPasswordReset = () => {
  const senha = useForm("");
  const confirmaSenha = useForm("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const el = null;
  const url = window.location.href;
  const partesDaUrl = url.split("/");
  const token = partesDaUrl[partesDaUrl.length - 1];
  const [passChanged, setPassChanged] = React.useState(false);
  const navigate = useNavigate();
  const [requirementsMet, setRequirementsMet] = React.useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const checkRequirements = (value) => {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    setRequirementsMet({
      length: lengthRegex.test(value),
      uppercase: uppercaseRegex.test(value),
      lowercase: lowercaseRegex.test(value),
      number: numberRegex.test(value),
    });
  };

  async function getUser() {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const { email } = await response.json();
    if (response.ok) {
      setEmail(email);
      console.log("Pegou os dados");
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    checkRequirements(senha.value);
  }, [senha.value]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      requirementsMet.length &&
      requirementsMet.uppercase &&
      requirementsMet.lowercase &&
      requirementsMet.number
    ) {
      if (senha.value === confirmaSenha.value) {
        const { url, options } = PASSWORD_RESET(
          { email: email, senhanova: senha.value },
          token
        );
        const response = await fetch(url, options);
        const json = await response.json();
        if (response.ok) {
          setPassChanged(true);
        }
      }
    }

    // const response = fetch();
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
          Senha redefinida com sucesso
          <span>.</span>
        </h2>
        {/* <p>
          Agradecemos o interesse em nossos produtos, para dar continuidade na
          contratação do sistema após a leitura da proposta{" "}
          <span>basta nos responder o e-mail</span> da proposta.
        </p> */}
        <button onClick={() => handleCloseModal()}>Fechar</button>
      </Modal>
      <h1>
        Redefinição de senha<span className={styles.ponto}>.</span>
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="senha"
          type="password"
          label="Nova senha"
          placeholder="Digite a nova senha..."
          {...senha}
        />
        <Input
          name="confirma"
          type="password"
          label="Confirmar nova senha"
          placeholder="Confirme a nova senha..."
          {...confirmaSenha}
        />
        <ul>
          <li>
            {requirementsMet.length ? "✅" : "❌"} Deve conter pelo menos 8
            caracteres
          </li>
          <li>
            {requirementsMet.uppercase ? "✅" : "❌"} Deve conter pelo menos uma
            letra maiúscula
          </li>
          <li>
            {requirementsMet.lowercase ? "✅" : "❌"} Deve conter pelo menos uma
            letra minúscula
          </li>
          <li>
            {requirementsMet.number ? "✅" : "❌"} Deve conter pelo menos um
            número
          </li>
        </ul>
        <button>ENVIAR</button>
      </form>
    </div>
  );
};

export default LoginPasswordReset;
