import { useState } from "react";

const URL = "http://127.0.0.1:8000/api/productos/";

export default function ProductosCrud({ productos, recargar }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaMod, setFechaMod] = useState("2026-11-20T12:00:00");
  const [archivo, setArchivo] = useState(0);
  const [editId, setEditId] = useState(null);

  const guardar = async (e) => {
    e.preventDefault();
    const datos = {
      nombre,
      descripcion,
      precio,
      fechaMod,
      archivo: Number(archivo),
    };

    if (editId) {
      await fetch(`${URL}${editId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    } else {
      await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
    }

    setEditId(null);
    setNombre("");
    setDescripcion("");
    setPrecio("");
    recargar();
  };

  const editar = (p) => {
    const idReal = p.producto ?? p.id;
    setEditId(idReal);
    setNombre(p.nombre || "");
    setDescripcion(p.descripcion || "");
    setPrecio(p.precio || "");
    if (p.fechaMod) setFechaMod(p.fechaMod.slice(0, 19));
    setArchivo(p.archivo ?? 0);
  };

  const borrar = async (p) => {
    const idReal = p.producto ?? p.id;
    await fetch(`${URL}${idReal}/`, { method: "DELETE" });
    recargar();
  };

  return (
    <div>
      <h3>{editId ? "Editar Producto" : "Nuevo Producto"}</h3>
      <form onSubmit={guardar}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />{" "}
        <input placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />{" "}
        <input type="number" step="0.01" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />{" "}
        <input type="text" placeholder="Fecha (YYYY-MM-DDTHH:MM:SS)" value={fechaMod} onChange={(e) => setFechaMod(e.target.value)} required />{" "}
        <input type="number" placeholder="Archivo" value={archivo} onChange={(e) => setArchivo(e.target.value)} required />{" "}
        <button type="submit">{editId ? "Actualizar" : "Guardar"}</button>
        {editId && (
          <>
            {" "}
            <button type="button" onClick={() => { setEditId(null); setNombre(""); setDescripcion(""); setPrecio(""); }}>
              Cancelar
            </button>
          </>
        )}
      </form>

      <br />

      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const idReal = p.producto ?? p.id;
            return (
              <tr key={idReal}>
                <td>{idReal}</td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>
                  <button type="button" onClick={() => editar(p)}>Editar</button>{" "}
                  <button type="button" onClick={() => borrar(p)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}