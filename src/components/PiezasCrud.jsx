import { useState } from "react";

const URL = "http://127.0.0.1:8000/api/piezas/";

export default function PiezasCrud({ piezas, recargar }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [material, setMaterial] = useState("");
  const [esOriginal, setEsOriginal] = useState(1);
  const [fechaMod, setFechaMod] = useState("2026-11-20T12:00:00");
  const [archivo, setArchivo] = useState(0);
  const [editId, setEditId] = useState(null);

  const limpiar = () => {
    setEditId(null);
    setNombre("");
    setDescripcion("");
    setMaterial("");
    setEsOriginal(1);
    setArchivo(0);
  };

  const guardar = async (e) => {
    e.preventDefault();
    const datos = {
      nombre,
      descripcion,
      material,
      esOriginal: Number(esOriginal),
      fechaMod,
      archivo: Number(archivo),
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
      alert("Error al guardar pieza: " + JSON.stringify(err));
      return;
    }

    limpiar();
    recargar();
  };

  const editar = (pz) => {
    setEditId(pz.piezaId);
    setNombre(pz.nombre || "");
    setDescripcion(pz.descripcion || "");
    setMaterial(pz.material || "");
    setEsOriginal(pz.esOriginal ?? 1);
    if (pz.fechaMod) setFechaMod(pz.fechaMod.slice(0, 19));
    setArchivo(pz.archivo ?? 0);
  };

  const borrar = async (pz) => {
    await fetch(`${URL}${pz.piezaId}/`, { method: "DELETE" });
    recargar();
  };

  return (
    <div>
      <h3>{editId ? "Editar Pieza" : "Nueva Pieza"}</h3>
      <form onSubmit={guardar}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />{" "}
        <input placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />{" "}
        <input placeholder="Material" value={material} onChange={(e) => setMaterial(e.target.value)} required />{" "}
        <input type="number" placeholder="Es Original (1 o 0)" value={esOriginal} onChange={(e) => setEsOriginal(e.target.value)} required />{" "}
        <input type="text" placeholder="Fecha (YYYY-MM-DDTHH:MM:SS)" value={fechaMod} onChange={(e) => setFechaMod(e.target.value)} required />{" "}
        <input type="number" placeholder="Archivo" value={archivo} onChange={(e) => setArchivo(e.target.value)} required />{" "}
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
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Material</th>
            <th>Es Original</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {piezas.map((pz) => (
            <tr key={pz.piezaId}>
              <td>{pz.piezaId}</td>
              <td>{pz.nombre}</td>
              <td>{pz.descripcion}</td>
              <td>{pz.material}</td>
              <td>{pz.esOriginal}</td>
              <td>{pz.archivo}</td>
              <td>
                <button type="button" onClick={() => editar(pz)}>Editar</button>{" "}
                <button type="button" onClick={() => borrar(pz)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}