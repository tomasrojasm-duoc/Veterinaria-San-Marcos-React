import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import CarritoLateral from "../components/CarritoLateral.jsx";
import { productos } from "../data/productos.js";
import { servicios } from "../data/servicios.js";
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

      <CarritoLateral />

      <section className="hero" id="inicio">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1>Veterinaria San Marcos</h1>
              <h3 className="heroLema">"Cuidamos a quienes amas"</h3>
              <p className="lead my-4">
                Atención cercana y de calidad para perros, gatos, conejos y aves.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link className="btn btn-primary btn-lg fw-bold" to="/registro-hora">
                  Agendar Hora
                </Link>
                <a className="btn btn-outline-primary btn-lg fw-bold" href="#servicios">
                  Nuestros servicios
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="heroMarco">
                <img src="/IMG/cachorro.jpg" alt="Cachorro siendo atendido en la veterinaria" className="heroFoto" />
                <div className="heroInsignia">
                  <strong>+15 años</strong>
                  <span>cuidando mascotas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccionBlanca" id="servicios">
        <div className="container">
          <div className="mb-5">
            <h2 className="tituloSeccion">Servicios</h2>
            <p className="subtituloSeccion">Todo lo que tu mascota necesita</p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
            {servicios.map((s, i) => (
              <div className="col" key={s.id}>
                <div className="card tarjetaServicio h-100">
                  <div className="card-body p-4">
                    <div className="numeroServicio">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="h5">{s.titulo}</h3>
                    <p className="mb-0 text-muted">{s.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion seccionSuave" id="nosotros">
        <div className="container">
          <div className="row g-0 tarjetaNosotros">
            <div className="col-lg-6 color p-4 p-lg-5">
              <h2 className="tituloSeccion">Quiénes somos</h2>
              <p className="subtituloSeccion mb-3">Atención cercana, enfocada en cada mascota</p>
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
            <div className="col-lg-6 imgNosotros">
              <img src="/IMG/vet_img_1.jpg" alt="Veterinaria San Marcos" />
            </div>
          </div>
        </div>
      </section>

      <section className="seccion seccionBlanca">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <img src="/IMG/gatito.jpg" alt="Gatito revisado con un estetoscopio" className="fotoGatito" />
            </div>
            <div className="col-lg-7">
              <h2 className="tituloSeccion">Experiencia</h2>
              <p className="subtituloSeccion mb-4">Más de 15 años cuidando mascotas</p>

              <div className="row g-3 mb-4 text-center">
                <div className="col-4">
                  <div className="cifra">
                    <strong>2009</strong>
                    <span>nuestro inicio</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="cifra">
                    <strong>+15</strong>
                    <span>años de experiencia</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="cifra">
                    <strong>25</strong>
                    <span>pacientes diarios</span>
                  </div>
                </div>
              </div>

              <p className="fw-bold mb-2">Atendemos a:</p>
              <div className="d-flex flex-wrap gap-2">
                <span className="chipAnimal">Perros</span>
                <span className="chipAnimal">Gatos</span>
                <span className="chipAnimal">Conejos</span>
                <span className="chipAnimal">Unicornios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="seccion" id="productos">
        <div className="container">
          <h2 className="tituloSeccion">Productos</h2>
          <p className="subtituloSeccion mb-5">Lo que tu mascota necesita, a un clic</p>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center">
            {productos.map((p) => (
              <div className="col" key={p.id}>
                <div className="card tarjetaProducto h-100">
                  <img src={p.img} alt={p.nombre} className="card-img-top imgProducto p-3" />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title h5">{p.nombre}</h3>
                    <p className="precioProducto">${p.precio.toLocaleString("es-CL")}</p>
                    <button className="btn btn-primary mt-auto" onClick={() => agregarProducto(p)}>
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {noti && (
            <div className="alert alert-success mt-4" role="status">
              {noti}
            </div>
          )}
        </div>
      </main>

      <footer className="pie text-center">
        <img src="/IMG/logopng.png" alt="Logo Veterinaria San Marcos" className="logoPie" />
        <p className="mb-1 fw-bold">Veterinaria San Marcos</p>
        <small>"Cuidamos a quienes amas" · © {new Date().getFullYear()}</small>
      </footer>
    </>
  );
}
