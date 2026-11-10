const FILAS = [
  ["Invitación con QR", "No", "Depende del sistema", "Sí, con el plano y el lote marcado"],
  ["Registro que se puede buscar", "No", "Sí", "Sí, con quién lo dejó pasar, y a Excel"],
  ["Horarios por rubro y temporada", "No", "Generalmente no", "Sí, y la barrera los aplica"],
  ["Seguros de proveedores y autos", "No", "Generalmente no", "Sí, con avisos de vencimiento"],
  ["Lectora de QR y DNI en la garita", "No", "Generalmente no", "Sí"],
];

const DATOS = [
  ["Una cuenta por guardia", "Cada ingreso queda con nombre y apellido."],
  ["Accesos que se pueden cortar", "Si un guardia se va, se le cierra el acceso al instante."],
  ["Cada barrio, su propia base", "Los datos no se mezclan con los de otro barrio."],
];

export function PorQue() {
  return (
    <section id="por-que" aria-labelledby="porque-title" className="porque">
      <div className="sec-ancho">
        <h2 id="porque-title" className="sec-titulo">Por qué Pazzit.</h2>
        <p className="sec-bajada">Hecho para la barrera de un barrio cerrado, no adaptado desde otra cosa.</p>
        <div className="tabla-scroll">
          <table className="tabla">
            <caption className="sr-only">Comparación entre cuaderno y WhatsApp, una app de administración con módulo de accesos, y Pazzit</caption>
            <thead>
              <tr><td /><th scope="col">Cuaderno y WhatsApp</th><th scope="col">App de administración con módulo de accesos</th><th scope="col" className="tabla-pazzit">Pazzit</th></tr>
            </thead>
            <tbody>
              {FILAS.map(([f, a, b, c]) => (
                <tr key={f}><th scope="row">{f}</th><td>{a}</td><td>{b}</td><td className="tabla-pazzit">{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="porque-sub">Los datos del barrio, cuidados.</h3>
        <dl className="puntos">
          {DATOS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
