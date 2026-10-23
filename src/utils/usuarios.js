const CLAVE = "usuarios";

export function obtenerUsuarios() {
  const guardados = localStorage.getItem(CLAVE);

  if (guardados == null) {
    const porDefecto = [{ usuario: "admin", password: "admin123", rol: "admin" }];
    localStorage.setItem(CLAVE, JSON.stringify(porDefecto));
    return porDefecto;
  }

  return JSON.parse(guardados);
}

export function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE, JSON.stringify(usuarios));
}

export function existeUsuario(nombreUsuario) {
  return obtenerUsuarios().some((u) => u.usuario === nombreUsuario);
}
