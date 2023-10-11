import React, { createContext, useState, useContext } from "react";
import { getSuggestedQuery } from "@testing-library/react";
import { LOGIN_POST, TOKEN_VALIDATE_GET, DOCS_GET, USER_LOGOUT } from "./api";
import { useNavigate } from "react-router-dom";

interface UserContextData {
  error: string | null;
  login: boolean | null;
  loading: boolean | null;
  data: [];
  clinicas:
    | [
        {
          id: number;
          nome: string;
          contato: string;
        }
      ]
    | undefined;
  clinica: { id: number; nome: string; contato: string } | undefined;
  nome: string;
  setClinica: React.Dispatch<
    React.SetStateAction<
      { id: number; nome: string; contato: string } | undefined
    >
  >;
  token: string | undefined;
  email: string | undefined;
  userLogout: () => Promise<void>;
  userLogin: (username: string, password: string) => Promise<void>;
  getUser: (token: string) => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

export const useUserContext = () => useContext(UserContext);

export const UserStorage = ({ children }: UserProviderProps) => {
  const [data, setData] = React.useState<any>();
  const [nome, setNome] = React.useState<any>();
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [id, setId] = React.useState();
  const [email, setEmail] = React.useState();
  const [token, setToken] = React.useState<string>();
  const [clinicas, setClinicas] = React.useState();
  const [clinica, setClinica] = React.useState<
    { id: number; nome: string; contato: string } | undefined
  >(undefined);
  const navigate = useNavigate();

  async function getUser(token: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = DOCS_GET(token);
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setLogin(true);
    } catch (err: any) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = LOGIN_POST({ email: username, senha: password });
      const tokenRes = await fetch(url, options);
      const { id, message, cliente, nome, email } = await tokenRes.json();
      setNome(nome);
      setClinicas(cliente);
      setId(id);
      setEmail(email);
      if (!tokenRes.ok) {
        throw new Error(`Usuário ou senha incorretos!`);
      }
      const token: string | null = tokenRes.headers.get("Authorization");
      if (token) {
        setToken(token);
        window.localStorage.setItem("token", token);
        await getUser(token);
      }
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function sair() {
    if (id && token) {
      const { url, options } = USER_LOGOUT({ id: id, token: token }, token);
      const response = await fetch(url, options);
      const { message } = await response.json();
      if (!response.ok) throw new Error(`Error: ${message}`);
      return true;
    }
    return true;
  }

  const userLogout = React.useCallback(
    async function () {
      const verificaSaida = sair();
      if (!verificaSaida) throw new Error("Erro no Logout!");
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      setClinicas(undefined);
      setClinica(undefined);
      window.localStorage.removeItem("token");
      navigate("/");
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autologin() {
      const tokenCache = window.localStorage.getItem("token");
      if (tokenCache) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_GET(tokenCache);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token Inválido");
          await getUser(tokenCache);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autologin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        error,
        loading,
        login,
        data,
        userLogout,
        userLogin,
        clinicas,
        setClinica,
        clinica,
        getUser,
        token,
        nome,
        email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
