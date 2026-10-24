import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import { productos } from "../data/productos.js";
import { obtenerUsuarios } from "../utils/usuarios.js";

export default function Admin() {
  const navigate = useNavigate();
  const usuarios = obtenerUsuarios();
  const agendas = JSON.parse(localStorage.getItem("agendas")) || [];

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="adminLayout">
        <aside className="adminLateral">
          <div className="adminMarca">San Marcos<br />Admin</div>
          <a className="activo" href="#dashboard">Dashboard</a>
          <a href="#productos-admin">Productos</a>
          <a href="#usuarios-admin">Usuarios</a>
          <Link to="/horas">Horas agendadas</Link>
          <Link to="/">Ir a la tienda</Link>
          <button type="button" className="adminSalir" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </aside>

        <main className="adminContenido" id="dashboard">
          <h1 className="tituloAdmin">Dashboard</h1>
          <p className="mb-4">Resumen de la actividad de la veterinaria.</p>

          <div className="row row-cols-2 row-cols-xl-4 g-3 mb-4">
            <div className="col">
              <div className="kpiAdmin"><span>Productos</span><strong>{productos.length}</strong></div>
            </div>
            <div className="col">
              <div className="kpiAdmin"><span>Usuarios</span><strong>{usuarios.length}</strong></div>
            </div>
            <div className="col">
              <div className="kpiAdmin kpiSuave"><span>Horas agendadas</span><strong>{agendas.length}</strong></div>
            </div>
          </div>

          <div className="row g-4">
            <section className="col-xl-6" id="usuarios-admin">
              <div className="color rounded shadow-sm p-4 h-100">
                <h2 className="h4 mb-4">Usuarios registrados</h2>
                <div className="table-responsive">
                  <table id="tablaUsuariosAdmin" className="table table-striped table-hover tabla-vet mb-0">
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
              </div>
            </section>

            <section className="col-xl-6" id="productos-admin">
              <div className="color rounded shadow-sm p-4 h-100">
                <h2 className="h4 mb-4">Productos creados</h2>
                <div className="table-responsive">
                  <table id="tablaProductosAdmin" className="table table-striped table-hover tabla-vet mb-0">
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
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
