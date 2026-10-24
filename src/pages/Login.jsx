import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { obtenerUsuarios } from "../utils/usuarios.js";

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    const encontrado = obtenerUsuarios().find(
      (u) => u.usuario === usuario.trim() && u.password === password.trim()
    );

    if (!encontrado) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(encontrado));
    alert("Bienvenido, " + encontrado.usuario);
    navigate(encontrado.rol === "admin" ? "/admin" : "/");
  };

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <form className="card color shadow-sm p-4" noValidate onSubmit={enviar}>
              <h1 className="h3 text-center mb-4">Iniciar Sesión</h1>

              <div className="mb-3">
                <CampoFormulario
                  id="usuario"
                  etiqueta="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <CampoFormulario
                  id="password"
                  etiqueta="Contraseña"
                  tipo="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Ingresar
              </button>

              <p className="text-center small mt-3 mb-0">
                ¿No tienes cuenta? <Link className="fw-bold" to="/registro">Regístrate aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
