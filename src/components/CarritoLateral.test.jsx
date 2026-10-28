import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CarritoLateral from "./CarritoLateral.jsx";
import { CarritoProvider } from "../context/CarritoContext.jsx";


const alimento = { id: 1, nombre: "Alimento para Perros", precio: 25000 };
const churu = { id: 2, nombre: "Churu", precio: 14990 };

function montarCarrito(productosEnCarrito = []) {
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <CarritoLateral />
      </CarritoProvider>
    </MemoryRouter>
  );
}

function filaTotal() {
  return screen.getByText("TOTAL").closest(".filaCarrito");
}

describe("CarritoLateral", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("muestra el mensaje de carrito vacío y total $0 cuando no hay productos", () => {
    montarCarrito([]);

    expect(screen.getByText("No hay productos en el carrito.")).toBeInTheDocument();
    expect(filaTotal()).toHaveTextContent(/TOTAL\s*\$\s*0$/);
  });

  it("lista los productos con su subtotal y calcula el total", () => {

    montarCarrito([
      { ...alimento, cantidad: 2 },
      { ...churu, cantidad: 2 },
    ]);

    expect(screen.getByText("Alimento para Perros")).toBeInTheDocument();
    expect(screen.getByText("Churu")).toBeInTheDocument();
    expect(screen.queryByText("No hay productos en el carrito.")).not.toBeInTheDocument();

    expect(screen.getByText(/^\$\s?50\.000$/)).toBeInTheDocument(); 
    expect(screen.getByText(/^\$\s?29\.980$/)).toBeInTheDocument(); 
    expect(filaTotal()).toHaveTextContent(/TOTAL\s*\$\s*79\.980/);
  });

  it('el botón "+" sube la cantidad, recalcula el total y lo guarda en localStorage', async () => {
 
    const usuario = userEvent.setup();
    montarCarrito([{ ...churu, cantidad: 1 }]);
    expect(screen.getByText("1")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(filaTotal()).toHaveTextContent(/TOTAL\s*\$\s*29\.980/);
    expect(JSON.parse(localStorage.getItem("carrito"))[0].cantidad).toBe(2);
  });

  it('el botón "-" con cantidad 1 elimina el producto y vuelve al estado vacío', async () => {
    const usuario = userEvent.setup();
    montarCarrito([{ ...alimento, cantidad: 1 }]);

    await usuario.click(screen.getByRole("button", { name: "-" }));

    expect(screen.queryByText("Alimento para Perros")).not.toBeInTheDocument();
    expect(screen.getByText("No hay productos en el carrito.")).toBeInTheDocument();
    expect(localStorage.getItem("carrito")).toBe("[]");
  });

  it('"Iniciar pago" informa el total a pagar (alert simulado con un mock)', async () => {

    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
    const usuario = userEvent.setup();
    montarCarrito([
      { ...alimento, cantidad: 2 },
      { ...churu, cantidad: 1 },
    ]);

    await usuario.click(screen.getByRole("button", { name: "Iniciar pago" }));

    expect(alerta).toHaveBeenCalledTimes(1);
    expect(alerta).toHaveBeenCalledWith(
      expect.stringMatching(/^Total a pagar: \$\s?64\.990$/)
    );
  });

  it('"Iniciar pago" avisa que el carrito está vacío cuando no hay productos', async () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
    const usuario = userEvent.setup();
    montarCarrito([]);

    await usuario.click(screen.getByRole("button", { name: "Iniciar pago" }));

    expect(alerta).toHaveBeenCalledWith("El carrito está vacío");
  });
});
