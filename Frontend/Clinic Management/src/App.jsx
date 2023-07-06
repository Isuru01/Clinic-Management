import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Dashboard, Appoinment, Pay, Search } from "./pages/index";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard/:type/:action?" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
