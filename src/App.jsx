import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import RegistroHora from "./pages/RegistroHora.jsx";
import VerHoras from "./pages/VerHoras.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/registro-hora" element={<RegistroHora />} />
      <Route path="/horas" element={<VerHoras />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
