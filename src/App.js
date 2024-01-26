import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter basename={ "/JAT-Job-Application-Tracker"}>
    <Header />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/app" element={<Dashboard />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
