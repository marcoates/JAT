import React from "react";
import { HashRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {

  const basename = 'http://marcoates.github.io/JAT-Job-Application-Tracker'; 

  return (
    <HashRouter basename={basename}>
    <Header />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/app" element={<Dashboard />} />
    </Routes>
    </HashRouter>
  );
}

export default App;
