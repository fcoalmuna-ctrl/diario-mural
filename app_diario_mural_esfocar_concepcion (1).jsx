import React, { useState, useEffect } from "react";

// 🔹 IMÁGENES SEGURAS (NO FALLAN)
const LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Carabineros_de_Chile_escudo.png";
const FONDO_URL = "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1974&auto=format&fit=crop";

export default function DiarioMuralApp() {
  const [editMode, setEditMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("diarioMuralData");
    return saved
      ? JSON.parse(saved)
      : {
          info: "Formación integral basada en disciplina, vocación de servicio y respeto a la comunidad.",
          efemerides: "27 de abril: Conmemoración institucional.",
          valores: "Honor, Disciplina, Lealtad, Vocación de servicio.",
          interes: "Mantener presentación personal y cumplir horarios.",
          mensaje: "Formarse como Carabinero es un honor, servir es un deber.",
          cumpleanos: "Hoy: Sin registros.",
          humor: "¿Por qué el carabinero llevó una escalera? ¡Para llegar al siguiente nivel del servicio!",
          instrucciones: "Sin novedades para el día.",
          cinta: "Bienvenidos a ESFOCAR Concepción | Disciplina - Honor - Servicio |"
        };
  });

  useEffect(() => {
    localStorage.setItem("diarioMuralData", JSON.stringify(data));
  }, [data]);

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const fecha = time.toLocaleDateString();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${FONDO_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div style={{ backgroundColor: "rgba(0,0,0,0.75)", minHeight: "100vh" }}>

        {/* CINTA */}
        <div style={{ background: "#1f7a1f", overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-block", padding: "8px", animation: "marquee 12s linear infinite" }}>
            {editMode ? (
              <input
                style={{ width: "100%" }}
                value={data.cinta}
                onChange={(e) => handleChange("cinta", e.target.value)}
              />
            ) : data.cinta}
          </div>
        </div>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={LOGO_URL}
              alt="logo"
              style={{ width: "60px", background: "white", borderRadius: "50%", padding: "5px" }}
            />
            <div>
              <h2>Diario Mural ESFOCAR</h2>
              <p style={{ fontSize: "12px" }}>Sede Concepción</p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div>{fecha}</div>
            <div style={{ fontWeight: "bold" }}>{time.toLocaleTimeString()}</div>
            <button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Guardar" : "Editar"}
            </button>
          </div>
        </div>

        {/* CONTENIDO */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px" }}>
          <Section title="Instrucciones" value={data.instrucciones} editMode={editMode} onChange={(v) => handleChange("instrucciones", v)} />
          <Section title="Información" value={data.info} editMode={editMode} onChange={(v) => handleChange("info", v)} />
          <Section title="Efemérides" value={data.efemerides} editMode={editMode} onChange={(v) => handleChange("efemerides", v)} />
          <Section title="Valores" value={data.valores} editMode={editMode} onChange={(v) => handleChange("valores", v)} />
          <Section title="Interés" value={data.interes} editMode={editMode} onChange={(v) => handleChange("interes", v)} />
          <Section title="Cumpleaños" value={data.cumpleanos} editMode={editMode} onChange={(v) => handleChange("cumpleanos", v)} />
          <Section title="Humor" value={data.humor} editMode={editMode} onChange={(v) => handleChange("humor", v)} />
          <Section title="Mensaje" value={data.mensaje} editMode={editMode} onChange={(v) => handleChange("mensaje", v)} />
        </div>

        {/* QR */}
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Escanea para acceder</p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://TU-URL-REAL.com"
          />
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

function Section({ title, value, editMode, onChange }) {
  return (
    <div style={{ background: "white", color: "black", padding: "10px", borderRadius: "8px" }}>
      <strong>{title}</strong>
      {editMode ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

// 🔹 TEST BÁSICO (no rompe si falta localStorage)
try {
  if (typeof localStorage === "undefined") {
    console.warn("localStorage no disponible");
  }
} catch (e) {
  console.warn("Error acceso localStorage");
}
