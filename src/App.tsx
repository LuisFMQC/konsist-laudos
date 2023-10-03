import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Principal from "./Components/Inicial/Principal";
import Login from "./Components/Login/Login";
import Header from "./Components/Header";
import { UserStorage } from "./ClinicaContext";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/home/*" element={<Principal />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
