import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { formatoPrecio } from "../utils/formato.js";

export default function Carrito() {
  const { carrito, cambiarCantidad, quitar, cantidadTotal, total } = useCarrito();

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

      <main className="container my-5">
        <div className="row g-4">
          <section className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h3 fw-normal mb-0">Carro ({cantidadTotal} items)</h1>
              <Link to="/">Seguir comprando</Link>
            </div>

            {carrito.length === 0 ? (
              <div className="card card-body text-center text-muted py-5">
                El carrito está vacío.
              </div>
            ) : (
              carrito.map((p) => (
                <div className="card mb-3" key={p.id}>
                  <div className="card-body d-flex justify-content-between align-items-center gap-3">
                    <div>
                      <h3 className="h5">{p.nombre}</h3>
                      <p className="text-muted mb-2">Precio: {formatoPrecio(p.precio)}</p>
                      <div className="cantidadProducto d-flex align-items-center gap-2 mb-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => cambiarCantidad(p.id, -1)}
                        >
                          -
                        </button>
                        <span>{p.cantidad}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => cambiarCantidad(p.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => quitar(p.id)}>
                        Eliminar
                      </button>
                    </div>
                    <strong>{formatoPrecio(p.precio * p.cantidad)}</strong>
                  </div>
                </div>
              ))
            )}
          </section>

          <aside className="col-lg-4">
            <div className="card align-self-start">
              <div className="card-body">
                <h2 className="h5 tituloResumen">Resumen ({cantidadTotal} productos)</h2>

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

                <button className="btn btn-primary w-100 mt-3" onClick={iniciarPago}>
                  Iniciar pago
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
