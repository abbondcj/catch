import React from "react";
import { Routes, Route } from 'react-router-dom'
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/home/Home";
import './App.css'

export const CatchApp = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

