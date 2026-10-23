import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarrito);
  const [abierto, setAbierto] = useState(false);

  // Guarda en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregar = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cambio) => {
    setCarrito((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + cambio } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const quitar = (id) => setCarrito((prev) => prev.filter((p) => p.id !== id));

  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        abierto,
        abrir: () => setAbierto(true),
        cerrar: () => setAbierto(false),
        agregar,
        cambiarCantidad,
        quitar,
        cantidadTotal,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
