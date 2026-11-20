import { useEffect, useState } from "react";
import ProductosCrud from "./components/ProductosCrud";
import PiezasCrud from "./components/PiezasCrud";
import AsignacionesCrud from "./components/AsignacionesCrud";

const BASE = "http://127.0.0.1:8000/api";

export default function App() {
  const [seccion, setSeccion] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [piezas, setPiezas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);

  const cargarTodo = async () => {
    const [r1, r2, r3] = await Promise.all([
      fetch(`${BASE}/productos/`),
      fetch(`${BASE}/piezas/`),
      fetch(`${BASE}/asignaciones/`),
    ]);
    if (r1.ok) setProductos(await r1.json());
    if (r2.ok) setPiezas(await r2.json());
    if (r3.ok) setAsignaciones(await r3.json());
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Sistema de Productos y Piezas</h2>

      <div>
        <button type="button" onClick={() => setSeccion("productos")}>Productos</button>{" "}
        <button type="button" onClick={() => setSeccion("piezas")}>Piezas</button>{" "}
        <button type="button" onClick={() => setSeccion("asignaciones")}>Asignacion Pieza</button>
      </div>

      <hr />

      {seccion === "productos" && <ProductosCrud productos={productos} recargar={cargarTodo} />}
      {seccion === "piezas" && <PiezasCrud piezas={piezas} recargar={cargarTodo} />}
      {seccion === "asignaciones" && (
        <AsignacionesCrud
          asignaciones={asignaciones}
          productos={productos}
          piezas={piezas}
          recargar={cargarTodo}
        />
      )}
    </div>
  );
}