import { useState, useMemo } from "react";

const ALLOYS = [
  { label: "1100",  density: 0.0975 },
  { label: "2014",  density: 0.101  },
  { label: "2024",  density: 0.100  },
  { label: "2219",  density: 0.103  },
  { label: "3003",  density: 0.0984 },
  { label: "5005",  density: 0.0974 },
  { label: "5052",  density: 0.097  },
  { label: "5083",  density: 0.096  },
  { label: "5086",  density: 0.0964 },
  { label: "6013",  density: 0.0975 },
  { label: "6061",  density: 0.0975 },
  { label: "6082",  density: 0.0975 },
  { label: "7050",  density: 0.102  },
  { label: "7068",  density: 0.1024 },
  { label: "7075",  density: 0.101  },
  { label: "7085",  density: 0.1024 },
  { label: "Other", density: null   },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
* { box-sizing: border-box; }
input::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
input[type=number] { -moz-appearance: textfield; }

.sso-page {
  background: linear-gradient(135deg, #171717 0%, #262626 50%, #0a0a0a 100%);
  min-height: 100vh; padding: 20px 24px;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: #171717;
}
.sso-wrap { max-width: 960px; margin: 0 auto; }

.sso-card {
  background: rgba(255,255,255,0.97); border-radius: 16px; padding: 20px; margin-bottom: 20px;
  border: 1px solid #d4d4d4; box-shadow: 0 4px 24px rgba(0,0,0,0.18);
}
.sso-card-accent {
  background: rgba(255,255,255,0.97); border-radius: 16px; padding: 20px; margin-bottom: 20px;
  border-top: 4px solid #dc2626; box-shadow: 0 8px 32px rgba(0,0,0,0.22);
}
.sso-inner {
  background: linear-gradient(135deg, #fafafa, #f5f5f5);
  border-radius: 12px; padding: 16px; border: 1px solid #e5e5e5;
}
.sso-grid2  { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.sso-grid3  { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.sso-grid2s { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

.sso-label {
  font-size: 10px; font-weight: 700; color: #737373;
  text-transform: uppercase; letter-spacing: 0.09em;
  display: block; margin-bottom: 5px;
}
.sso-section-label {
  font-size: 11px; font-weight: 700; color: #dc2626;
  text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;
}
.sso-input {
  width: 100%; background: #fff; border: 1.5px solid #d4d4d4; border-radius: 8px;
  color: #171717; padding: 9px 11px; font-size: 14px;
  font-family: inherit; outline: none; transition: border-color 0.15s;
}
.sso-input:focus { border-color: #dc2626; }
.sso-input-disabled {
  width: 100%; background: #f5f5f5; border: 1.5px solid #e5e5e5; border-radius: 8px;
  color: #a3a3a3; padding: 9px 11px; font-size: 14px;
}
.sso-select {
  width: 100%; background: #fff; border: 1.5px solid #d4d4d4; border-radius: 8px;
  color: #171717; padding: 9px 11px; font-size: 14px;
  font-family: inherit; outline: none; cursor: pointer;
}
.sso-select:focus { border-color: #dc2626; }

.sso-toggle { display: inline-flex; border-radius: 8px; overflow: hidden; border: 1.5px solid #d4d4d4; margin-bottom: 14px; }
.sso-toggle-btn { padding: 6px 16px; font-size: 12px; font-weight: 700; font-family: inherit; cursor: pointer; border: none; letter-spacing: 0.05em; transition: background 0.15s, color 0.15s; }
.sso-toggle-on  { background: #dc2626; color: #fff; }
.sso-toggle-off { background: #fff; color: #737373; }

.sso-stat        { border-radius: 10px; padding: 10px 12px; border: 1px solid #e5e5e5; background: linear-gradient(135deg,#fafafa,#f5f5f5); }
.sso-stat-green  { border-radius: 10px; padding: 10px 12px; border: 1px solid #bbf7d0; background: linear-gradient(135deg,#f0fdf4,#dcfce7); }
.sso-stat-red    { border-radius: 10px; padding: 10px 12px; border: 1px solid #fecaca; background: linear-gradient(135deg,#fef2f2,#fee2e2); }
.sso-stat-yellow { border-radius: 10px; padding: 10px 12px; border: 1px solid #fde68a; background: linear-gradient(135deg,#fffbeb,#fef3c7); }
.sso-stat-label  { font-size: 9px; font-weight: 700; color: #737373; text-transform: uppercase; letter-spacing: 0.09em; margin-bottom: 4px; }

.sso-result-card {
  flex: 1; background: rgba(255,255,255,0.97); border-radius: 16px; padding: 20px;
  border: 1px solid #d4d4d4; box-shadow: 0 4px 24px rgba(0,0,0,0.18); position: relative;
}
.sso-result-best {
  flex: 1; background: rgba(255,255,255,0.97); border-radius: 16px; padding: 20px;
  border: 1px solid #d4d4d4; border-top: 4px solid #dc2626;
  box-shadow: 0 8px 32px rgba(0,0,0,0.22); position: relative;
}
.sso-divider { border: none; border-top: 1px solid #e5e5e5; margin: 14px 0; }
.sso-empty {
  flex: 1; background: rgba(255,255,255,0.4); border-radius: 16px; padding: 40px 20px;
  border: 1.5px dashed #d4d4d4; display: flex; align-items: center; justify-content: center;
}
`;

function round(n, dec = 3) {
  return Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec);
}

function calcOrientation(MW, ML, Q, K, across, along) {
  const cols = Math.floor((MW + K) / (across + K));
  if (cols === 0) return null;
  const rows  = Math.ceil(Q / cols);
  const subL  = round(rows * along + (rows - 1) * K);
  if (subL > ML) return null;
  const remainder  = round(Math.max(0, ML - subL - K));
  const yield_     = cols * rows;
  const masterArea = round(MW * ML, 2);
  const subArea    = round(MW * subL, 2);
  // Output-based scrap rate (CML standard): (Input − Output) / Output
  const masterScrapPct = round(((masterArea - subArea) / subArea) * 100, 2);
  return {
    cols, rows, subL, subArea, masterArea,
    yield: yield_, spare: yield_ - Q,
    remainder, masterScrapPct,
  };
}

function Field({ label, value, onChange, placeholder, disabled }) {
  return (
    <div>
      <label className="sso-label">{label}</label>
      {disabled
        ? <div className="sso-input-disabled">{value}</div>
        : <input className="sso-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      }
    </div>
  );
}

function Stat({ label, value, sub, type }) {
  const cls   = { green: "sso-stat-green", red: "sso-stat-red", yellow: "sso-stat-yellow" }[type] || "sso-stat";
  const color = { green: "#16a34a", red: "#dc2626", yellow: "#b45309" }[type] || "#171717";
  return (
    <div className={cls}>
      <div className="sso-stat-label">{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color, lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "#a3a3a3", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function ResultCard({ o, label, orientLabel, isBest, MW, onSave }) {
  if (!o) return (
    <div className="sso-empty">
      <span style={{ color: "#a3a3a3", fontSize: 13, textAlign: "center" }}>
        Piece does not fit<br />across master width
      </span>
    </div>
  );

  return (
    <div className={isBest ? "sso-result-best" : "sso-result-card"}>
      {isBest && (
        <div style={{
          position: "absolute", top: -1, right: 18,
          background: "#dc2626", color: "#fff",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
          padding: "3px 12px", borderRadius: "0 0 8px 8px",
        }}>MAX DROP</div>
      )}

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#171717" }}>{label}</div>
        <div style={{ fontSize: 11, color: "#737373", marginTop: 1 }}>Oriented {orientLabel}</div>
      </div>

      {/* Sub-sheet */}
      <div className="sso-inner" style={{ marginBottom: 14 }}>
        <div className="sso-stat-label">Sub-Sheet to Cut</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#171717", lineHeight: 1.1 }}>
          {MW}" &times; {o.subL}"
        </div>
        {o.subWeight != null && (
          <div style={{ fontSize: 12, color: "#737373", marginTop: 3 }}>{o.subWeight.toLocaleString()} lbs</div>
        )}
      </div>

      {/* Layout + spare */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
        <Stat label="Layout" value={`${o.cols}×${o.rows}`} sub="cols × rows" />
        <Stat label="Yield"  value={`${o.yield} pcs`} />
        <Stat label="Spare"  value={`+${o.spare}`} sub="over qty" type={o.spare > 0 ? "yellow" : undefined} />
      </div>

      <hr className="sso-divider" />

      {/* Drop back to stock */}
      <div style={{ marginBottom: 14 }}>
        <div className="sso-stat-label" style={{ marginBottom: 6 }}>Drop Back to Stock</div>
        {o.remainder > 0 ? (
          <div className={isBest ? "sso-stat-green" : "sso-stat"}>
            <div style={{ fontSize: 20, fontWeight: 700, color: isBest ? "#16a34a" : "#171717", lineHeight: 1.2 }}>
              {MW}" &times; {o.remainder}"
            </div>
            {o.remWeight != null && (
              <div style={{ fontSize: 11, color: "#737373", marginTop: 3 }}>{o.remWeight.toLocaleString()} lbs recovered</div>
            )}
          </div>
        ) : (
          <div className="sso-stat">
            <span style={{ color: "#a3a3a3", fontSize: 13 }}>No usable drop</span>
          </div>
        )}
      </div>

      <hr className="sso-divider" />

      {/* Master scrap rate — THE number */}
      <div className="sso-stat-label" style={{ marginBottom: 6 }}>Master Scrap Rate (Output-Based)</div>
      <div className="sso-stat-red">
        <div style={{ fontSize: 28, fontWeight: 800, color: "#dc2626", lineHeight: 1 }}>
          {o.masterScrapPct}%
        </div>
        <div style={{ fontSize: 11, color: "#737373", marginTop: 4 }}>
          ({o.masterArea.toLocaleString()} − {o.subArea.toLocaleString()}) / {o.subArea.toLocaleString()} sq in
        </div>
      </div>

      <button
        onClick={onSave}
        style={{
          marginTop: 14, width: "100%", padding: "9px 0",
          background: "linear-gradient(135deg,#fafafa,#f5f5f5)",
          border: "1.5px solid #d4d4d4", borderRadius: 8,
          fontSize: 12, fontWeight: 700, color: "#525252",
          fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.05em",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = "#dc2626"; e.currentTarget.style.color = "#dc2626"; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = "#d4d4d4"; e.currentTarget.style.color = "#525252"; }}
      >
        + SAVE TO HISTORY
      </button>

    </div>
  );
}

export default function SubSheetOptimizer() {
  const [mw,   setMw]   = useState("48.5");
  const [ml,   setMl]   = useState("144.5");
  const [thk,  setThk]  = useState("2");
  const [pw,   setPw]   = useState("7.25");
  const [ph,   setPh]   = useState("6");

  const [orderMode, setOrderMode] = useState("pcs");
  const [qtyPcs,    setQtyPcs]    = useState("17");
  const [qtyLbs,    setQtyLbs]    = useState("");

  const [kerf,     setKerf]     = useState("0.3");
  const [alloyIdx, setAlloyIdx] = useState(6); // 5052
  const [customDensity, setCustomDensity] = useState("0.098");
  const [history, setHistory] = useState([]);

  const density = ALLOYS[alloyIdx].density ?? (parseFloat(customDensity) || null);

  const resolvedQty = useMemo(() => {
    if (orderMode === "pcs") return parseInt(qtyPcs) || 0;
    const PW = parseFloat(pw), PH = parseFloat(ph), THK = parseFloat(thk);
    const lbs = parseFloat(qtyLbs);
    if (!density || isNaN(PW) || isNaN(PH) || isNaN(THK) || isNaN(lbs) || lbs <= 0) return 0;
    return Math.floor(lbs / (PW * PH * THK * density));
  }, [orderMode, qtyPcs, qtyLbs, pw, ph, thk, density]);

  const pcsAsLbs = useMemo(() => {
    if (orderMode !== "pcs" || !resolvedQty) return null;
    const PW = parseFloat(pw), PH = parseFloat(ph), THK = parseFloat(thk);
    if (!density || isNaN(PW) || isNaN(PH) || isNaN(THK)) return null;
    return round(resolvedQty * PW * PH * THK * density, 1);
  }, [orderMode, resolvedQty, pw, ph, thk, density]);

  const pieceWeight = useMemo(() => {
    const PW = parseFloat(pw), PH = parseFloat(ph), THK = parseFloat(thk);
    if (!density || isNaN(PW) || isNaN(PH) || isNaN(THK)) return null;
    return round(PW * PH * THK * density, 3);
  }, [pw, ph, thk, density]);

  const results = useMemo(() => {
    const MW = parseFloat(mw), ML = parseFloat(ml), THK = parseFloat(thk);
    const PW = parseFloat(pw), PH = parseFloat(ph);
    const Q  = resolvedQty, K = parseFloat(kerf);
    if ([MW, ML, THK, PW, PH, K].some(v => isNaN(v) || v <= 0) || Q <= 0) return null;

    const enrich = (o) => {
      if (!o) return null;
      return {
        ...o,
        subWeight:    density ? Math.round(MW * o.subL * THK * density) : null,
        remWeight:    density && o.remainder > 0 ? Math.round(MW * o.remainder * THK * density) : null,
        masterWeight: density ? Math.round(MW * ML * THK * density) : null,
      };
    };

    return {
      o1: enrich(calcOrientation(MW, ML, Q, K, PW, PH)),
      o2: enrich(calcOrientation(MW, ML, Q, K, PH, PW)),
      MW, ML, THK, PW, PH, Q, K,
    };
  }, [mw, ml, thk, pw, ph, resolvedQty, kerf, density]);

  const bestIs = results
    ? (!results.o1 ? 2 : !results.o2 ? 1 : results.o1.remainder >= results.o2.remainder ? 1 : 2)
    : null;

  const saveToHistory = (o, label, orientLabel) => {
    if (!o || !results) return;
    setHistory(h => [{
      id: Date.now(),
      label,
      orientLabel,
      alloy: ALLOYS[alloyIdx].label,
      masterDims: `${results.MW}" × ${results.ML}"`,
      subSheet: `${results.MW}" × ${o.subL}"`,
      layout: `${o.cols}×${o.rows}`,
      yield: o.yield,
      spare: o.spare,
      remainder: o.remainder > 0 ? `${results.MW}" × ${o.remainder}"` : "None",
      remWeight: o.remWeight,
      subWeight: o.subWeight,
      scrapPct: o.masterScrapPct,
      qty: results.Q,
    }, ...h]);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="sso-page">
        <div className="sso-wrap">

          {/* Header */}
          <div className="sso-card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 5, height: 40, background: "#dc2626", borderRadius: 3, flexShrink: 0 }} />
              <div>
                <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#171717" }}>Sub-Sheet Cut Optimizer</h1>
                <p style={{ margin: "3px 0 0", color: "#737373", fontSize: 13 }}>
                  Find the smallest sub-sheet to cut from master — maximize drop back to stock.
                </p>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="sso-card-accent">
            <div className="sso-grid2">

              <div>
                <div className="sso-section-label">Master Sheet</div>
                <div className="sso-grid3" style={{ marginBottom: 20 }}>
                  <Field label="Width (in)"     value={mw}  onChange={setMw}  placeholder="48.5"  />
                  <Field label="Length (in)"    value={ml}  onChange={setMl}  placeholder="144.5" />
                  <Field label="Thickness (in)" value={thk} onChange={setThk} placeholder="2"     />
                </div>

                <div className="sso-section-label">Piece Dimensions</div>
                <div className="sso-grid3" style={{ marginBottom: 20 }}>
                  <Field label="Width (in)"     value={pw}  onChange={setPw}  placeholder="7.25" />
                  <Field label="Height (in)"    value={ph}  onChange={setPh}  placeholder="6"    />
                  <Field label="Each Piece (lbs)" value={pieceWeight != null ? pieceWeight : "—"} disabled />
                </div>

                <div className="sso-section-label">Required Order</div>
                <div className="sso-toggle">
                  <button className={`sso-toggle-btn ${orderMode === "pcs" ? "sso-toggle-on" : "sso-toggle-off"}`} onClick={() => setOrderMode("pcs")}>PCS</button>
                  <button className={`sso-toggle-btn ${orderMode === "lbs" ? "sso-toggle-on" : "sso-toggle-off"}`} onClick={() => setOrderMode("lbs")}>LBS</button>
                </div>
                {orderMode === "pcs" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <Field label="Qty Needed (pcs)"  value={qtyPcs} onChange={setQtyPcs} placeholder="17" />
                    <Field label="≈ Lbs Equivalent"  value={pcsAsLbs != null ? `${pcsAsLbs} lbs` : "—"} disabled />
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <Field label="Total Lbs Needed"  value={qtyLbs} onChange={setQtyLbs} placeholder="750" />
                    <Field label="= Qty (pcs)"        value={resolvedQty > 0 ? `${resolvedQty} pcs` : "—"} disabled />
                  </div>
                )}
              </div>

              <div>
                <div className="sso-section-label">Settings</div>
                <div className="sso-grid3" style={{ marginBottom: 16 }}>
                  <Field label="Kerf (in)" value={kerf} onChange={setKerf} placeholder="0.3" />
                  <div>
                    <label className="sso-label">Alloy</label>
                    <select className="sso-select" value={alloyIdx} onChange={e => setAlloyIdx(parseInt(e.target.value))}>
                      {ALLOYS.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
                    </select>
                  </div>
                  {ALLOYS[alloyIdx].density === null
                    ? <Field label="Density (lb/in³)" value={customDensity} onChange={setCustomDensity} placeholder="0.098" />
                    : <Field label="Density (lb/in³)" value={ALLOYS[alloyIdx].density} disabled />
                  }
                </div>

                {results && (
                  <div className="sso-inner">
                    <div className="sso-stat-label" style={{ marginBottom: 10 }}>Master Reference</div>
                    <div className="sso-grid2s">
                      <Stat label="Master Area"   value={`${round(results.MW * results.ML, 2).toLocaleString()} sq in`} />
                      <Stat label="Master Weight" value={results.o1?.masterWeight != null ? `${results.o1.masterWeight.toLocaleString()} lbs` : "—"} />
                      <Stat label="Piece Area"    value={`${round(results.PW * results.PH, 3)} sq in`} />
                      <Stat label="Qty Resolved"  value={`${results.Q} pcs`} type={orderMode === "lbs" ? "yellow" : undefined} />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Results */}
          {results ? (
            <div style={{ display: "flex", gap: 16 }}>
              <ResultCard o={results.o1} label="Option A" orientLabel={`${results.PW}" × ${results.PH}" (W×H)`}         isBest={bestIs === 1} MW={results.MW} onSave={() => saveToHistory(results.o1, "Option A", `${results.PW}" × ${results.PH}" (W×H)`)} />
              <ResultCard o={results.o2} label="Option B" orientLabel={`${results.PH}" × ${results.PW}" (H×W flipped)`} isBest={bestIs === 2} MW={results.MW} onSave={() => saveToHistory(results.o2, "Option B", `${results.PH}" × ${results.PW}" (H×W flipped)`)} />
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 40, textAlign: "center", color: "#a3a3a3", fontSize: 14 }}>
              Fill in all fields above to see results.
            </div>
          )}

          <div style={{ textAlign: "center", color: "#525252", fontSize: 11, marginTop: 16 }}>
            Master scrap rate is output-based: (Master Area &minus; Sub-Sheet Area) / Sub-Sheet Area &nbsp;&bull;&nbsp; Kerf applied between pieces and on master cross-cut
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="sso-card" style={{ padding: 0, overflow: "hidden", marginTop: 20 }}>
              <div style={{ background: "linear-gradient(135deg,#171717,#262626)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>Saved Calculations ({history.length})</p>
                <button
                  onClick={() => setHistory([])}
                  style={{ fontSize: 10, color: "#a3a3a3", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}
                >Clear All</button>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {history.map(rec => (
                  <div key={rec.id} style={{ background: "linear-gradient(135deg,#fafafa,#fff)", borderRadius: 12, padding: "12px 16px", border: "1px solid #e5e5e5", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#fee2e2", color: "#dc2626" }}>{rec.label}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#f5f5f5", color: "#525252", border: "1px solid #e5e5e5" }}>{rec.alloy}</span>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#171717", margin: 0 }}>{rec.subSheet}</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, auto)", gap: "4px 16px", fontSize: 11, color: "#737373" }}>
                        <span>Master: {rec.masterDims}</span>
                        <span>Layout: {rec.layout}</span>
                        <span>Yield: {rec.yield} pcs (+{rec.spare} spare)</span>
                        <span>Drop: {rec.remainder}{rec.remWeight ? ` (${rec.remWeight.toLocaleString()} lbs)` : ""}</span>
                        <span style={{ color: "#dc2626", fontWeight: 700 }}>Scrap: {rec.scrapPct}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setHistory(h => h.filter(r => r.id !== rec.id))}
                      style={{ fontSize: 16, color: "#a3a3a3", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", flexShrink: 0, lineHeight: 1 }}
                    >✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, padding: "4px 2px", fontSize: 11, color: "#525252" }}>
            <span>Sub-Sheet Cut Optimizer &mdash; Champagne Metals</span>
            <span style={{ fontStyle: "italic" }}>Erin Morgan &mdash; ext. 289</span>
          </div>

        </div>
      </div>
    </>
  );
}
