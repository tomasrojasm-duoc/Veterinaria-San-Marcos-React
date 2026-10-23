import Header from "../components/Header.jsx";

export default function VerHoras() {
  const agendas = JSON.parse(localStorage.getItem("agendas")) || [];

  return (
    <>
      <Header />
      <section>
        <div className="formulario color">
          <h1>Horas Agendadas</h1>
          <table id="tablaAgendas">
            <thead>
              <tr>
                <th>Dueño</th>
                <th>Mascota</th>
                <th>Fecha</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {agendas.map((a) => (
                <tr key={a.id}>
                  <td>{a.nombreDuenio} {a.apellidoDuenio}</td>
                  <td>{a.nombreMascota}</td>
                  <td>{a.fecha}</td>
                  <td>{a.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
