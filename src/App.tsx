import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Principal from "./Components/Inicial/Principal";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";
import { ClinicaProvider } from "./ClinicaContext";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ClinicaProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/*" element={<Principal />} />
          </Routes>
        </ClinicaProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
