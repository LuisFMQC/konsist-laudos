import React from "react";

interface TypeItem {
  regex: RegExp;
  message: string;
}

const types: Record<string, TypeItem> = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números",
  },
  telefone: {
    regex: /\([1-9]\d\)\s9?\d{4}-\d{4}$/,
    message: "Digite um telefone válido",
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
    message: "CPF inválido"
  }
};

type Types = keyof typeof types;

const useForm = (type: Types) => {
  const [value, setValue] = React.useState("");
  const [error, setError]  = React.useState<string | null>(null);

  function validate(value: string) {
    if (!type) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
    } else {
      setError(null);
      return true;
    }
  }


  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (type !== "telefone") {
      if (error) validate(target.value);
      setValue(target.value);
    } else if (type === "telefone") {
      const formatarTelefone = (valor: string) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^([1-9]\d)/, "($1) ");
        valor = valor.replace(/(\s9?\d{4})(\d{4})$/, "$1-$2");

        return valor;
      }
      setValue(formatarTelefone(target.value));
    }
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
