import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { formatoPrecio } from "../utils/formato.js";

export default function Carrito() {
  const { carrito, cambiarCantidad, quitar, cantidadTotal, total } = useCarrito();

  // La página del carrito usa un fondo distinto (clase en <body>)
  useEffect(() => {
    document.body.classList.add("paginaCarrito");
    return () => document.body.classList.remove("paginaCarrito");
  }, []);

  const iniciarPago = () => {
    if (total === 0) {
      alert("El carrito está vacío");
    } else {
      alert("Total a pagar: " + formatoPrecio(total));
    }
  };

  return (
    <>
      <Header />

      <main className="contenidoCarrito">
        <section>
          <div className="cabeceraPaginaCarrito">
            <h1>Carro ({cantidadTotal} items)</h1>
            <Link to="/">Seguir comprando</Link>
          </div>

          <div>
            {carrito.length === 0 ? (
              <div className="carritoVacioPagina">El carrito está vacío.</div>
            ) : (
              carrito.map((p) => (
                <div className="productoPagina" key={p.id}>
                  <div>
                    <h3>{p.nombre}</h3>
                    <p>Precio: {formatoPrecio(p.precio)}</p>
                    <div className="cantidadProducto">
                      <button onClick={() => cambiarCantidad(p.id, -1)}>-</button>
                      <span>{p.cantidad}</span>
                      <button onClick={() => cambiarCantidad(p.id, 1)}>+</button>
                    </div>
                    <button className="eliminarPagina" onClick={() => quitar(p.id)}>
                      Eliminar
                    </button>
                  </div>
                  <strong>{formatoPrecio(p.precio * p.cantidad)}</strong>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="resumenPaginaCarrito">
          <h2>Resumen ({cantidadTotal} productos)</h2>

          <div className="filaCarrito">
            <div>
              <strong>Pago con transferencias</strong>
              <small>Transferencia y Banco Estado</small>
            </div>
            <strong>{formatoPrecio(total)}</strong>
          </div>

          <div className="filaCarrito">
            <div>
              <span>Otros medios de pago</span>
              <small>Webpay/Onepay</small>
            </div>
            <span>{formatoPrecio(total)}</span>
          </div>

          <div className="filaCarrito">
            <strong>Envío</strong>
            <span>-</span>
          </div>

          <div className="filaCarrito totalCarrito">
            <strong>TOTAL</strong>
            <strong>{formatoPrecio(total)}</strong>
          </div>

          <button className="botonPagoPagina" onClick={iniciarPago}>
            Iniciar pago
          </button>
        </aside>
      </main>
    </>
  );
}
