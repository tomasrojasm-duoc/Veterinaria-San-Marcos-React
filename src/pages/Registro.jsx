import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import CampoFormulario from "../components/CampoFormulario.jsx";
import { existeUsuario, guardarUsuarios, obtenerUsuarios } from "../utils/usuarios.js";

export default function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const enviar = (e) => {
    e.preventDefault();

    const nuevoUsuario = usuario.trim();
    const nuevaPassword = password.trim();

    if (nuevoUsuario === "" || nuevaPassword === "") {
      alert("Por favor completa todos los campos");
      return;
    }

    if (nuevaPassword !== confirmar.trim()) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (existeUsuario(nuevoUsuario)) {
      alert("Ese nombre de usuario ya existe, elige otro");
      return;
    }

    guardarUsuarios([
      ...obtenerUsuarios(),
      { usuario: nuevoUsuario, password: nuevaPassword, rol: "cliente" },
    ]);

    alert("Cuenta creada con éxito, ahora puedes iniciar sesión");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <form className="card color shadow-sm p-4" noValidate onSubmit={enviar}>
              <h1 className="h3 text-center mb-4">Crear Cuenta</h1>

              <div className="mb-3">
                <CampoFormulario
                  id="usuario"
                  etiqueta="Usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CampoFormulario
                  id="password"
                  etiqueta="Contraseña"
                  tipo="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <CampoFormulario
                  id="confirmar"
                  etiqueta="Confirmar contraseña"
                  tipo="password"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Crear Cuenta
              </button>

              <p className="text-center small mt-3 mb-0">
                ¿Ya tienes cuenta? <Link className="fw-bold" to="/login">Inicia sesión aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
