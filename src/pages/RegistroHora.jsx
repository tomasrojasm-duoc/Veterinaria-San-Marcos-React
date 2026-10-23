import { useState } from "react";
import Header from "../components/Header.jsx";

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

  // Un solo manejador para todos los inputs (usa el atributo name)
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
      <section>
        <form className="formulario color" noValidate onSubmit={enviar}>
          <h1>Reserva de Hora</h1>
          <h3>Ingrese sus datos:</h3>
          <table>
            <tbody>
              <tr>
                <td><input type="text" name="nombreDuenio" placeholder="Nombre"
                  value={form.nombreDuenio} onChange={cambiar} /></td>
                <td><input type="text" name="apellidoDuenio" placeholder="Apellidos"
                  value={form.apellidoDuenio} onChange={cambiar} /></td>
              </tr>
              <tr>
                <td><input type="email" name="correo" placeholder="correo@ejemplo.com"
                  value={form.correo} onChange={cambiar} /></td>
                <td><input type="text" name="telefono" placeholder="Número de contacto"
                  value={form.telefono} onChange={cambiar} /></td>
              </tr>
              <tr>
                <td><input type="text" name="nombreMascota" placeholder="Nombre de Mascota"
                  value={form.nombreMascota} onChange={cambiar} /></td>
                <td><input type="number" name="edadMascota" min="1" max="100"
                  placeholder="Edad Mascota" value={form.edadMascota} onChange={cambiar} /></td>
              </tr>
              <tr>
                <td><input type="date" name="fecha" value={form.fecha} onChange={cambiar} /></td>
                <td><input type="time" name="hora" value={form.hora} onChange={cambiar} /></td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Agendar Hora</button>
        </form>
      </section>
    </>
  );
}
