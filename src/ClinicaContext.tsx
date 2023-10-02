import React, { createContext, useState, useContext } from "react";
import { getSuggestedQuery } from "@testing-library/react";
import { LOGIN_POST, TOKEN_VALIDATE_GET, DOCS_GET } from "./api";
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
  setClinica: React.Dispatch<
    React.SetStateAction<
      { id: number; nome: string; contato: string } | undefined
    >
  >;
  userLogout: () => Promise<void>;
  userLogin: (username: string, password: string) => Promise<void>;
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
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [id, setId] = React.useState();
  const [token, setToken] = React.useState<string>();
  const [clinicas, setClinicas] = React.useState();
  const [clinica, setClinica] = React.useState<
    { id: number; nome: string; contato: string } | undefined
  >(undefined);
  const navigate = useNavigate();

  async function getUser(token: string) {
    const { url, options } = DOCS_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = LOGIN_POST({ email: username, senha: password });
      const tokenRes = await fetch(url, options);
      const { id, message, cliente } = await tokenRes.json();
      setClinicas(cliente);
      setId(id);
      if (!tokenRes.ok) throw new Error(`Error: ${message}`);
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

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
    },
    [navigate]
  );

  React.useEffect(() => {
    async function autologin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_GET(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token Inválido");
          await getUser(token);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
