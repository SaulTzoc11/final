import { useState } from "react";

const URL = "http://127.0.0.1:8000/api/asignaciones/";

export default function AsignacionesCrud({ asignaciones, productos, piezas, recargar }) {
  const [codigo, setCodigo] = useState("");
  const [piezaId, setPiezaId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [editId, setEditId] = useState(null);

  const limpiar = () => {
    setEditId(null);
    setCodigo("");
    setPiezaId("");
    setProductoId("");
  };

  const guardar = async (e) => {
    e.preventDefault();
    const datos = {
      codigo: Number(codigo),
      archivo: Number(piezaId),
      productId: Number(productoId),
    };

    const targetUrl = editId ? `${URL}${editId}/` : URL;
    const method = editId ? "PUT" : "POST";

    const res = await fetch(targetUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Error al guardar asignacion: " + JSON.stringify(err));
      return;
    }

    limpiar();
    recargar();
  };

  const editar = (a) => {
    setEditId(a.asignacionPiezaId);
    setCodigo(a.codigo ?? "");
    setPiezaId(a.archivo);
    setProductoId(a.productId);
  };

  const borrar = async (a) => {
    await fetch(`${URL}${a.asignacionPiezaId}/`, { method: "DELETE" });
    recargar();
  };

  const nombreProducto = (id) => {
    const p = productos.find((item) => (item.producto ?? item.id) === id);
    return p ? p.nombre : id;
  };

  const nombrePieza = (id) => {
    const pz = piezas.find((item) => item.piezaId === id);
    return pz ? pz.nombre : id;
  };

  return (
    <div>
      <h3>{editId ? "Editar Asignacion" : "Nueva Asignacion de Pieza"}</h3>
      <form onSubmit={guardar}>
        <input
          type="number"
          placeholder="Codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />{" "}
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
          <option value="">-- Producto --</option>
          {productos.map((p) => {
            const idReal = p.producto ?? p.id;
            return (
              <option key={idReal} value={idReal}>
                {p.nombre}
              </option>
            );
          })}
        </select>{" "}
        <select value={piezaId} onChange={(e) => setPiezaId(e.target.value)} required>
          <option value="">-- Pieza --</option>
          {piezas.map((pz) => (
            <option key={pz.piezaId} value={pz.piezaId}>
              {pz.nombre}
            </option>
          ))}
        </select>{" "}
        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
        {editId && (
          <>
            {" "}
            <button type="button" onClick={limpiar}>Cancelar</button>
          </>
        )}
      </form>

      <br />

      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Pieza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((a) => (
            <tr key={a.asignacionPiezaId}>
              <td>{a.asignacionPiezaId}</td>
              <td>{a.codigo}</td>
              <td>{nombreProducto(a.productId)}</td>
              <td>{nombrePieza(a.archivo)}</td>
              <td>
                <button type="button" onClick={() => editar(a)}>Editar</button>{" "}
                <button type="button" onClick={() => borrar(a)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}