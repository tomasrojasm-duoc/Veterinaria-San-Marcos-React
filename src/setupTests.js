import "@testing-library/jest-dom/vitest";

let almacenamientoUtil = false;
try {
  almacenamientoUtil = typeof globalThis.localStorage?.clear === "function";
} catch {
  almacenamientoUtil = false;
}

if (!almacenamientoUtil) {
  const datos = new Map();
  const almacenamiento = {
    getItem: (clave) => (datos.has(String(clave)) ? datos.get(String(clave)) : null),
    setItem: (clave, valor) => {
      datos.set(String(clave), String(valor));
    },
    removeItem: (clave) => {
      datos.delete(String(clave));
    },
    clear: () => datos.clear(),
    key: (indice) => Array.from(datos.keys())[indice] ?? null,
    get length() {
      return datos.size;
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: almacenamiento,
    configurable: true,
    writable: true,
  });
}
