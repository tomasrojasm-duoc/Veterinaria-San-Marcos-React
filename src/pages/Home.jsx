import { useEffect, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import CarritoLateral from "../components/CarritoLateral.jsx";
import { productos } from "../data/productos.js";
import { useCarrito } from "../context/CarritoContext.jsx";

export default function Home() {
  const { agregar } = useCarrito();
  const [noti, setNoti] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const agregarProducto = (producto) => {
    agregar(producto);
    setNoti("Producto agregado correctamente");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNoti(""), 3000);
  };

  return (
    <>
      <Header completo />

      <div className="contenedor margenAuto color">
        <h1>Veterinaria San Marcos</h1>
        <h3>"Cuidamos a quienes amas"</h3>
      </div>

      <CarritoLateral />

      <div className="seccionNosotros">
        <div className="nosotros color">
          <h2>¿Quiénes somos?</h2>
          <div>
            <p>
              En Veterinaria San Marcos cuidamos la salud y el bienestar de tus
              mascotas desde 2009. Ubicados en Rancagua, Región de O’Higgins,
              contamos con un equipo formado por médicos veterinarios, técnicos
              y personal administrativo comprometido con entregar una atención
              cercana y de calidad. Atendemos principalmente perros y gatos,
              además de conejos y aves, ofreciendo servicios de consulta
              general, vacunación, cirugía menor, desparasitación y control de
              peso. Con más de 15 años de experiencia y un promedio de 25
              pacientes diarios, seguimos creciendo para entregar una atención
              cada vez más eficiente, organizada y enfocada en el bienestar de
              cada mascota.
            </p>
          </div>
        </div>
        <div className="imgNosotros">
          <img src="/IMG/vet_img_1.jpg" alt="Veterinaria San Marcos" />
        </div>
      </div>

      <main className="seccionProductos">
        <h2 className="tituloProductos">Nuestros Productos</h2>
        <div className="contenedorProductos">
          {productos.map((p) => (
            <div className="cardProducto" key={p.id}>
              <img src={p.img} alt={p.nombre} className="imgProducto" />
              <h3>{p.nombre}</h3>
              <p className="precioProducto">${p.precio.toLocaleString("es-CL")}</p>
              <button onClick={() => agregarProducto(p)}>Agregar al Carrito</button>
            </div>
          ))}
        </div>
        <p id="noti">{noti}</p>
      </main>
    </>
  );
}
