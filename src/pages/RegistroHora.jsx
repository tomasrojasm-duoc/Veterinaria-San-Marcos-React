import { useState } from "react";
import Header from "../components/Header.jsx";
import CampoFormulario from "../components/CampoFormulario.jsx";

const VACIO = {
  nombreDuenio: "",
  apellidoDuenio: "",
  correo: "",
  telefono: "",
  nombreMascota: "",
  edadMascota: "",
  fecha: "",
  hora: "",
};

export default function RegistroHora() {
  const [form, setForm] = useState(VACIO);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = (e) => {
    e.preventDefault();

    if (!form.nombreDuenio.trim() || !form.correo.trim() || !form.fecha || !form.hora) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const agendas = JSON.parse(localStorage.getItem("agendas")) || [];
    agendas.push({
      id: Date.now(),
      ...form,
      nombreDuenio: form.nombreDuenio.trim(),
      apellidoDuenio: form.apellidoDuenio.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
      nombreMascota: form.nombreMascota.trim(),
    });
    localStorage.setItem("agendas", JSON.stringify(agendas));

    alert("¡Hora agendada con éxito!");
    setForm(VACIO);
  };

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <form className="card color shadow-sm p-4" noValidate onSubmit={enviar}>
              <h1 className="h3 text-center">Reserva de Hora</h1>
              <h2 className="h6 text-center text-muted mb-4">Ingrese sus datos:</h2>

              <div className="row g-3">
                <div className="col-md-6">
                  <CampoFormulario id="nombreDuenio" name="nombreDuenio" etiqueta="Nombre"
                    value={form.nombreDuenio} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="apellidoDuenio" name="apellidoDuenio" etiqueta="Apellidos"
                    value={form.apellidoDuenio} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="correo" name="correo" tipo="email" etiqueta="Correo"
                    placeholder="correo@ejemplo.com" value={form.correo} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="telefono" name="telefono" etiqueta="Número de contacto"
                    value={form.telefono} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="nombreMascota" name="nombreMascota" etiqueta="Nombre de la mascota"
                    value={form.nombreMascota} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="edadMascota" name="edadMascota" tipo="number" min="1" max="100"
                    etiqueta="Edad de la mascota" value={form.edadMascota} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="fecha" name="fecha" tipo="date" etiqueta="Fecha"
                    value={form.fecha} onChange={cambiar} />
                </div>
                <div className="col-md-6">
                  <CampoFormulario id="hora" name="hora" tipo="time" etiqueta="Hora"
                    value={form.hora} onChange={cambiar} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4">
                Agendar Hora
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
