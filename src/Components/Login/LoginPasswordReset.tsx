import React from "react";
import styles from "./LoginPasswordReset.module.css";
import Input from "../Form/Input";
import useForm from "../Hooks/useForm";

const LoginPasswordReset = () => {
  const senha = useForm("");
  const confirmaSenha = useForm("");
  const [password, setPassword] = React.useState("");
  const [requirementsMet, setRequirementsMet] = React.useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const checkRequirements = (value: string) => {
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (
      requirementsMet.length &&
      requirementsMet.uppercase &&
      requirementsMet.lowercase &&
      requirementsMet.number
    ) {
      if (senha.value === confirmaSenha.value) {
      }
    }

    // const response = fetch();
  }

  return (
    <div className={styles.containerForm}>
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
