import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";

// completo = true  -> muestra logo y botones (página de inicio)
// completo = false -> solo el link "Inicio" (resto de páginas)
export default function Header({ completo = false }) {
  const navigate = useNavigate();
  const { cantidadTotal, abrir } = useCarrito();

  return (
    <header>
      <div className="cabecera encabezado">
        <nav aria-label="navegacion">
          <ul>
            {completo && (
              <li>
                <img src="/IMG/logopng.png" className="logopng" alt="Logo" />
              </li>
            )}
            <li><Link to="/">Inicio</Link></li>
          </ul>
        </nav>

        {completo && (
          <>
            <button className="btnAgendar" onClick={() => navigate("/registro-hora")}>
              Agendar Hora
            </button>
            <button className="btnAgendar" onClick={() => navigate("/horas")}>
              Horas Agendadas
            </button>
            <button className="btnAgendar" onClick={() => navigate("/login")}>
              Iniciar Sesion
            </button>
            <button className="btnCarrito" onClick={abrir}>
              Carrito ({cantidadTotal})
            </button>
          </>
        )}
      </div>
    </header>
  );
}
