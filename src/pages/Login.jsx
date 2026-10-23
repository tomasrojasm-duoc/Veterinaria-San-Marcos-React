import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
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
      <section>
        <form className="formulario color" noValidate onSubmit={enviar}>
          <h1>Iniciar Sesión</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Ingresar</button>

          <p className="linkRegistro">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </form>
      </section>
    </>
  );
}
