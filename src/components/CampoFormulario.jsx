
export default function CampoFormulario({ id, etiqueta, tipo = "text", ...resto }) {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      <input id={id} type={tipo} className="form-control" {...resto} />
    </>
  );
}
