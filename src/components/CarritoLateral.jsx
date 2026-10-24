import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext.jsx";
import { formatoPrecio } from "../utils/formato.js";

export default function CarritoLateral() {
  const { carrito, abierto, cerrar, cambiarCantidad, quitar, total } = useCarrito();

  const iniciarPago = () => {
    if (total === 0) {
      alert("El carrito está vacío");
    } else {
      alert("Total a pagar: " + formatoPrecio(total));
    }
  };

  return (
    <>
      <div className={`fondoCarrito ${abierto ? "mostrar" : ""}`} onClick={cerrar}></div>

      <aside className={`carritoLateral ${abierto ? "abierto" : ""}`}>
        <div className="tituloCarrito">
          <h2>Resumen</h2>
          <button onClick={cerrar} aria-label="Cerrar carrito">X</button>
        </div>

        <div className="listaCarrito">
          {carrito.length === 0 ? (
            <p className="carritoVacio">No hay productos en el carrito.</p>
          ) : (
            carrito.map((p) => (
              <div
                className="productoCarrito d-flex justify-content-between border-bottom pb-3 mb-3"
                key={p.id}
              >
                <div className="datosProducto d-flex flex-column gap-1">
                  <strong>{p.nombre}</strong>
                  <span>{formatoPrecio(p.precio)}</span>
                  <div className="cantidadProducto d-flex align-items-center gap-2">
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
                </div>
                <div className="precioProducto d-flex flex-column align-items-end gap-2 m-0">
                  <strong>{formatoPrecio(p.precio * p.cantidad)}</strong>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => quitar(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="resumenCarrito">
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
        </div>

        <div className="botonesCarrito">
          <button className="btn btn-primary flex-fill" onClick={iniciarPago}>
            Iniciar pago
          </button>
          <Link className="btn btn-primary flex-fill" to="/carrito" onClick={cerrar}>
            Ir al carro
          </Link>
        </div>
      </aside>
    </>
  );
}
