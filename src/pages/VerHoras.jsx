import Header from "../components/Header.jsx";

export default function VerHoras() {
  const agendas = JSON.parse(localStorage.getItem("agendas")) || [];

  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="color rounded shadow-sm p-4">
          <h1 className="h3 text-center mb-4">Horas Agendadas</h1>
          <div className="table-responsive">
            <table id="tablaAgendas" className="table table-striped table-hover tabla-vet mb-0">
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
        </div>
      </main>
    </>
  );
}
