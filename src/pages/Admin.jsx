import Header from "../components/Header.jsx";
import { productos } from "../data/productos.js";
import { obtenerUsuarios } from "../utils/usuarios.js";

export default function Admin() {
  const usuarios = obtenerUsuarios();

  return (
    <>
      <Header />
      <section>
        <div className="formulario color">
          <h1>Usuarios Registrados</h1>
          <table id="tablaUsuariosAdmin">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.usuario}>
                  <td>{u.usuario}</td>
                  <td>{u.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="formulario color">
          <h1>Productos Creados</h1>
          <table id="tablaProductosAdmin">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
