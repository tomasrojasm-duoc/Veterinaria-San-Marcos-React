import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
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
      <section>
        <form className="formulario color" noValidate onSubmit={enviar}>
          <h1>Crear Cuenta</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="text" placeholder="Usuario" value={usuario}
                    onChange={(e) => setUsuario(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="password" placeholder="Contraseña" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="password" placeholder="Confirmar contraseña" value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)} />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Crear Cuenta</button>

          <p className="linkRegistro">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </form>
      </section>
    </>
  );
}
