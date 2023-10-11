import React from "react";
import styles from "./PasswordChange.module.css";
import Input from "../Form/Input";
import useForm from "../Hooks/useForm";
import { PASSWORD_CHANGE } from "../../api";
import UserContext from "../../ClinicaContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const navigate = useNavigate();
  const senha = useForm("");
  const senhaAtual = useForm("");
  const confirmaSenha = useForm("");
  const el = null;
  const [passChanged, setPassChanged] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [requirementsMet, setRequirementsMet] = React.useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const { email } = React.useContext(UserContext);

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
      if (
        senha.value === confirmaSenha.value &&
        senha.validate() &&
        senhaAtual.validate()
      ) {
        const { url, options } = PASSWORD_CHANGE({
          email: email,
          senha: senhaAtual.value,
          senhanova: senha.value,
        });
        const response = await fetch(url, options);
        const json = await response.json();
        if (response.ok) {
          setPassChanged(true);
        }
        console.log(json);
      }
    }
  }

  function handleCloseModal() {
    setPassChanged(false);
    navigate("/home");
  }

  return (
    <div className={`${styles.containerForm} animeLeft`}>
      <Modal
        appElement={el}
        className={styles.modal}
        isOpen={passChanged}
        onRequestClose={() => handleCloseModal()}
        ariaHideApp={true}
      >
        <h2>
          Senha alterada com sucesso
          <span>.</span>
        </h2>
        <button onClick={() => handleCloseModal()}>Fechar</button>
      </Modal>
      <h1>
        Alteração de senha<span className={styles.ponto}>.</span>
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="senhaAtual"
          type="password"
          label="Senha atual"
          placeholder="Digite a sua senha atual..."
          {...senhaAtual}
        />
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
          <li className={styles.requirements}>
            {requirementsMet.length ? "✅" : "❌"} Deve conter pelo menos 8
            caracteres
          </li>
          <li className={styles.requirements}>
            {requirementsMet.uppercase ? "✅" : "❌"} Deve conter pelo menos uma
            letra maiúscula
          </li>
          <li className={styles.requirements}>
            {requirementsMet.lowercase ? "✅" : "❌"} Deve conter pelo menos uma
            letra minúscula
          </li>
          <li className={styles.requirements}>
            {requirementsMet.number ? "✅" : "❌"} Deve conter pelo menos um
            número
          </li>
        </ul>
        <button>ENVIAR</button>
      </form>
    </div>
  );
};

export default PasswordChange;
