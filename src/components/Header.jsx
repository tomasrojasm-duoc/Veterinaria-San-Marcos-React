import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";

export default function Header({ completo = false }) {
  const navigate = useNavigate();
  const { cantidadTotal, abrir } = useCarrito();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const irA = (ruta) => {
    setMenuAbierto(false);
    navigate(ruta);
  };

  const abrirCarrito = () => {
    setMenuAbierto(false);
    abrir();
  };

  return (
    <header className="sticky-top">
      <nav
        className="navbar navbar-expand-lg navbar-vet"
        aria-label="navegacion"
      >
        <div className="container">
          {!completo && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/">Inicio</Link>
              </li>
            </ul>
          )}

          {completo && (
            <>
              <Link className="navbar-brand" to="/">
                <img src="/IMG/logopng.png" className="logopng" alt="Logo" />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                aria-controls="menuPrincipal"
                aria-expanded={menuAbierto}
                aria-label="Mostrar u ocultar menú"
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
                id="menuPrincipal"
              >
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to="/">Inicio</Link>
                  </li>
                  {/* Anclas: llevan a las secciones del Home (el Header completo solo se usa ahí) */}
                  <li className="nav-item">
                    <a className="nav-link fw-bold" href="#servicios" onClick={() => setMenuAbierto(false)}>Servicios</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fw-bold" href="#nosotros" onClick={() => setMenuAbierto(false)}>Nosotros</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fw-bold" href="#productos" onClick={() => setMenuAbierto(false)}>Productos</a>
                  </li>
                </ul>

                <div className="d-flex flex-column flex-lg-row gap-2 py-2 py-lg-0">
                  <button className="btn btn-primary fw-bold" onClick={() => irA("/registro-hora")}>
                    Agendar Hora
                  </button>
                  <button className="btn btn-outline-primary fw-bold" onClick={() => irA("/horas")}>
                    Horas Agendadas
                  </button>
                  <button className="btn btn-outline-primary fw-bold" onClick={() => irA("/login")}>
                    Iniciar Sesion
                  </button>
                  <button className="btn btn-vet-oscuro fw-bold" onClick={abrirCarrito}>
                    Carrito ({cantidadTotal})
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
