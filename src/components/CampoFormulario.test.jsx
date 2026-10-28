import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CampoFormulario from "./CampoFormulario.jsx";

describe("CampoFormulario", () => {
  it("conecta la etiqueta con el input mediante htmlFor e id", () => {

    render(<CampoFormulario id="usuario" etiqueta="Usuario" />);

    const input = screen.getByLabelText("Usuario");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "usuario");
  });

  it('usa type="text" cuando no se indica el tipo', () => {
    render(<CampoFormulario id="nombre" etiqueta="Nombre" />);

    expect(screen.getByLabelText("Nombre")).toHaveAttribute("type", "text");
  });

  it("respeta el tipo recibido por props (password)", () => {
    render(<CampoFormulario id="password" etiqueta="Contraseña" tipo="password" />);

    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
  });

  it("reenvía el resto de las props y llama a onChange al escribir", async () => {

    const onChange = vi.fn();
    const usuario = userEvent.setup();
    render(
      <CampoFormulario
        id="correo"
        etiqueta="Correo"
        placeholder="ana@correo.cl"
        onChange={onChange}
      />
    );
    const input = screen.getByLabelText("Correo");

    await usuario.type(input, "ana");

    expect(input).toHaveAttribute("placeholder", "ana@correo.cl");
    expect(input).toHaveValue("ana");
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
