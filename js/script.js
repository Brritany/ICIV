/* =====================
   MODULE 1: IV Compatibility Matrix
===================== */
const CSV_URL = "data/CompatibilityMatrix.csv";
let MATRIX=null, selectedA='', selectedB='', currentGroup='All';
let groups={}, allDrugs=[];

const baseGroups = {
  "Sedation Drugs": [
    "Propofol","Precedex","Midazolam (Dormicum)",
    "Lorazepam (Anxicam)","Fentanyl","Morphine","Cisatracurium (Nimbex)"
  ],
  "Inotropic Drugs": [
    "Norepinephrine (Levophed)","Vasopressin (Pitressin)",
    "Epinephrine (Bosmin)","Dopamine"
  ]
};

fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    const parsed = Papa.parse(text.trim(), { skipEmptyLines: true });
    const raw = parsed.data;

    // 這裡加上 trim()，確保藥名一致
    const rows = raw.slice(1).map(r => r[0].trim());
    const cols = raw[0].slice(1).map(c => c.trim());
    const data = raw.slice(1).map(r => r.slice(1));

    MATRIX = { rows, cols, data };
    allDrugs = rows.map(d => d.trim()); // 再次確保無多餘空白
    buildGroups(allDrugs);
    renderTable(MATRIX);
    rebuildDropdowns("All");
    buildGroupButtons();
    attachHoverHighlight();
  });

function buildGroups(allDrugs){
  const assigned = new Set([].concat(...Object.values(baseGroups)));
  const others = allDrugs.filter(d => !assigned.has(d));
  groups = { ...baseGroups };
  if (others.length) groups["Others"] = others;
}

function formatDrugName(name){
  const m = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (!m) return name;
  return `${m[1].trim()}<br>(${m[2].trim()}®)`;
}

function renderGroupHeaders(thead, cols){
  const trGroup = document.createElement('tr');
  trGroup.appendChild(document.createElement('th'));
  trGroup.appendChild(document.createElement('th'));

  let i=0;
  while(i<cols.length){
    const colName = cols[i];
    const gname = Object.keys(groups).find(g => groups[g].includes(colName));
    const members = groups[gname];
    const span = members.length;
    const th = document.createElement('th');
    th.colSpan = span;
    th.textContent = gname;
    th.dataset.group = gname;
    th.style.background = "#f1f5f9";
    th.style.fontWeight = "bold";
    trGroup.appendChild(th);
    i += span;
  }
  thead.appendChild(trGroup);

  const trNames = document.createElement('tr');
  trNames.appendChild(document.createElement('th'));
  trNames.appendChild(document.createElement('th'));
  cols.forEach((c,j)=>{
    const th = document.createElement('th');
    th.innerHTML = formatDrugName(c);
    th.dataset.col = String(j + 2);
    th.dataset.group = Object.keys(groups).find(g => groups[g].includes(c));
    trNames.appendChild(th);
  });
  thead.appendChild(trNames);
}

function renderTable({ rows, cols, data }) {
  const thead = document.getElementById("thead");
  const tbody = document.getElementById("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  // 畫表頭
  renderGroupHeaders(thead, cols);

  let printedGroups = new Set();

  rows.forEach((rName, i) => {
    const gname = Object.keys(groups).find(g => groups[g].includes(rName)) || "Others";

    const tr = document.createElement("tr");
    tr.dataset.rowDrug = rName;
    tr.dataset.group = gname;

    // 左側群組名稱：只在第一次遇到這個群組時印出，並計算 rowSpan
    if (!printedGroups.has(gname)) {
      const gsize = rows.filter(r => groups[gname]?.includes(r)).length;
      const thGroup = document.createElement("th");
      thGroup.rowSpan = gsize;
      thGroup.textContent = gname;
      thGroup.dataset.group = gname;
      thGroup.style.background = "#f1f5f9";
      thGroup.style.fontWeight = "bold";
      tr.appendChild(thGroup);
      printedGroups.add(gname);
    }

    // 藥名 (row header)
    const thDrug = document.createElement("th");
    thDrug.innerHTML = formatDrugName(rName);
    thDrug.dataset.rowDrug = rName;
    thDrug.dataset.group = gname;
    tr.appendChild(thDrug);

    // 每個 cell
    cols.forEach((cName, j) => {
      const td = document.createElement("td");
      td.dataset.col = String(j + 2);
      td.dataset.group = Object.keys(groups).find(g => groups[g].includes(cName));

      let v = (data?.[i]?.[j] ?? "").trim();
      let cls = "v-empty";
      if (/^y$/i.test(v)) { v = "Y"; cls = "v-Y"; }
      else if (/^n$/i.test(v)) { v = "N"; cls = "v-N"; }
      else if (v === "!" || v === "！") { v = "!"; cls = "v-exclaim"; }
      else if (v === "?") { v = "?"; cls = "v-qmark"; }
      else if (v === "-") { v = "-"; cls = "v--"; }

      const span = document.createElement("span");
      span.className = `cell ${cls}`;
      span.textContent = v;
      td.appendChild(span);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function rebuildDropdowns(group){
  const selA=document.getElementById('selA'), selB=document.getElementById('selB');
  [selA, selB].forEach(sel => sel.innerHTML = '');
  const emptyOpt = document.createElement('option');
  emptyOpt.value=""; emptyOpt.textContent=""; 
  selA.appendChild(emptyOpt.cloneNode(true));
  selB.appendChild(emptyOpt.cloneNode(true));

  let list = [];
  if(group==="All") list = allDrugs;
  else list = groups[group] || [];
  list.forEach(d=>{
    const o1=document.createElement('option'); o1.value=o1.text=d; selA.appendChild(o1);
    const o2=document.createElement('option'); o2.value=o2.text=d; selB.appendChild(o2);
  });
  selA.addEventListener('change', ()=>{selectedA=selA.value; applySelectionHighlight();});
  selB.addEventListener('change', ()=>{selectedB=selB.value; applySelectionHighlight();});
}

function clearAllHighlights(){
  document.querySelectorAll('#matrixTbl td, #matrixTbl th').forEach(el=>{
    el.classList.remove('hit-row','hit-col');
  });
}

function applySelectionHighlight(){
  clearAllHighlights();
  if(!selectedA || !selectedB) return;
  const tr = Array.from(document.querySelectorAll('#tbody tr')).find(r => r.dataset.rowDrug === selectedA);
  if (tr){
    Array.from(tr.children).forEach(el => el.classList.add('hit-row'));
    const drugTh = tr.querySelector('th[data-row-drug]');
    if (drugTh) drugTh.classList.add('hit-row');
  }
  const j = MATRIX.cols.indexOf(selectedB);
  if (j >= 0){
    const colVisual = String(j + 2);
    const head = document.querySelector(`#thead tr:nth-child(2) th[data-col="${colVisual}"]`);
    if (head) head.classList.add('hit-col');
    document.querySelectorAll(`#tbody td[data-col="${colVisual}"]`).forEach(td => td.classList.add('hit-col'));
  }
}

function attachHoverHighlight(){
  const tbl=document.getElementById('matrixTbl');
  tbl.addEventListener('mousemove', (e)=>{
    const td = e.target.closest('td');
    const rowTh = e.target.closest('th[data-row-drug]');

    // only trigger on real row drug headers or td
    if(!td && !rowTh) return;

    clearAllHighlights();

    // get current row
    const tr = (td ? td.parentElement : rowTh.parentElement);

    // highlight row (skip the first group header cell)
    Array.from(tr.querySelectorAll('td, th[data-row-drug]'))
        .forEach(el => el.classList.add('hit-row'));

    // highlight column if hovering on td
    if(td){
      const colVisual = td.dataset.col;
      // only match thead second row (drug names), not group headers
      const head = document.querySelector(`#thead tr:nth-child(2) th[data-col="${colVisual}"]`);
      if (head) head.classList.add('hit-col');

      document.querySelectorAll(`#tbody td[data-col="${colVisual}"]`)
        .forEach(cell => cell.classList.add('hit-col'));
    }
  });

  tbl.addEventListener('mouseleave', ()=>{
    clearAllHighlights();
    applySelectionHighlight();
  });
}

function buildGroupButtons(){
  const container=document.getElementById('groupBtns');
  container.innerHTML='';
  ["All", ...Object.keys(groups)].forEach(g=>{
    const btn=document.createElement('button');
    btn.textContent=g;
    if(g==="All") btn.classList.add('active');
    btn.addEventListener('click',()=>filterGroup(g,btn));
    container.appendChild(btn);
  });
}

function filterGroup(group, btn){
  currentGroup=group;
  document.querySelectorAll('.group-buttons button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(group==="All"){
    document.querySelectorAll('#matrixTbl [data-group]').forEach(el=>el.classList.remove('hidden'));
  } else {
    document.querySelectorAll('#matrixTbl [data-group]').forEach(el=>{
      if(el.dataset.group===group) el.classList.remove('hidden');
      else el.classList.add('hidden');
    });
  }
  selectedA = '';
  selectedB = '';
  clearAllHighlights();
  rebuildDropdowns(group);
}

/* =====================
   Tabs Switching (共用)
===================== */
document.querySelectorAll(".module-tabs .tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".module-tabs .tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".module").forEach(m => m.classList.add("hidden"));
    document.getElementById(btn.dataset.target).classList.remove("hidden");
  });
});

/* =====================
   MODULE 2: Drug Quick Sheet (JSON-driven)
===================== */
const DRUG_INFO_URL = "data/DrugInfo.json";
let DRUG_INFO = {};
let currentDrugKey = null;

/* --- 藥物分類與顏色 --- */
const drugCategories = {
  "Vasopressors": {
    drugs: ["norepinephrine","epinephrine","dopamine","vasopressin"],
    color: "#dc2626" // 紅
  },
  "Sedatives": {
    drugs: ["propofol","dexmedetomidine","midazolam","lorazepam"],
    color: "#2563eb" // 藍
  },
  "Opioids": {
    drugs: ["fentanyl","morphine"],
    color: "#16a34a" // 綠
  },
  "Neuromuscular Blockers": {
    drugs: ["cisatracurium","succinylcholine","rocuronium"],
    color: "#9333ea" // 紫
  },
  "Reversal Agents": {
    drugs: ["neostigmine","sugammadex"],
    color: "#ca8a04" // 橘
  },
  "Vasodilators": {
    drugs: ["nitroglycerin","nicardipine","amiodarone"],
    color: "#0ea5e9" // 青藍
  },
  "Anticoagulants": {
    drugs: ["heparin","alprostadil"],
    color: "#6b7280" // 灰
  }
};

function getDrugColor(key){
  for (const [category, info] of Object.entries(drugCategories)){
    if (info.drugs.includes(key)) return info.color;
  }
  return "#374151"; // 預設灰黑
}

fetch(DRUG_INFO_URL)
  .then(r => r.json())
  .then(data => {
    DRUG_INFO = data || {};
    buildDrugInfoTabs();
    const first = Object.keys(DRUG_INFO)[0];
    if (first) selectDrugInfo(first, document.querySelector("#drugTabsInfo button"));
  });

function buildDrugInfoTabs(){
  const tabs = document.getElementById("drugTabsInfo");
  tabs.innerHTML = "";
  Object.keys(DRUG_INFO).forEach((key, idx) => {
    const d = DRUG_INFO[key] || {};
    const label = displayNameOf(d, key);
    const color = getDrugColor(key);
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.style.borderLeft = `6px solid ${color}`;
    if (idx === 0) btn.classList.add("active");
    btn.addEventListener("click", () => selectDrugInfo(key, btn));
    tabs.appendChild(btn);
  });
}

function selectDrugInfo(key, btn){
  currentDrugKey = key;
  document.querySelectorAll("#drugTabsInfo button").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderDrugInfo(DRUG_INFO[key], key);
}

function displayNameOf(d, fallbackKey){
  const g = d.genericName, b = d.brandName, dn = d.displayName;
  if (g && b) return `${g} (${b})`;
  if (dn) return dn;
  return fallbackKey;
}

function prettifyKey(k){
  return k
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, s => s.toUpperCase());
}

const labelMap = {
  genericName: "Generic Name",
  brandName: "Brand Name",
  preparation: "Preparation",
  commonDosing: "Common Dose",
  mechanismOfAction: "Mechanism",
  adverseEffects: "Adverse Effects",
  indications: "Indications",
  contraindications: "Contraindications",
  monitoring: "Monitoring",
  cautions: "Cautions",
  sources: "Sources",
  lastReviewed: "Last Reviewed"
};

function renderValue(v){
  if (Array.isArray(v)){
    return `<ul>${v.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
  }
  if (v && typeof v === "object"){
    const rows = Object.keys(v).map(subk => {
      const subval = renderValue(v[subk]);
      return `<div class="kv-row">
        <div class="kv-key">${escapeHTML(prettifyKey(subk))}</div>
        <div class="kv-val">${subval}</div>
      </div>`;
    }).join("");
    return `<div class="kv-list">${rows}</div>`;
  }
  return escapeHTML(String(v ?? ""));
}

function escapeHTML(s){
  return s.replace(/[&<>"']/g, c => (
    { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]
  ));
}

function renderDrugInfo(d = {}, key){
  const container = document.getElementById("drugInfoContainer");
  if (!d || Object.keys(d).length === 0){
    container.innerHTML = `<div class="kv-muted">No data.</div>`;
    return;
  }

  const title = displayNameOf(d, key);
  const color = getDrugColor(key);

  const knownOrder = [
    "genericName","brandName",
    "mechanismOfAction","indications","preparation","commonDosing",
    "adverseEffects","monitoring","contraindications","cautions","sources"
  ];

  const keysSorted = [
    ...knownOrder.filter(k => k in d),
    ...Object.keys(d).filter(k => !knownOrder.includes(k))
  ];

  const rows = keysSorted
    .filter(k => d[k] != null && d[k] !== "")
    .map(k => {
      if (k === "genericName" || k === "brandName") return "";
      if (k === "sources" && Array.isArray(d[k])) {
        const links = d[k]
          .map(src => {
            if (typeof src === "string") return `<li>${escapeHTML(src)}</li>`;
            const label = escapeHTML(src.label ?? src.url ?? "Link");
            const url = src.url ? `<a href="${escapeHTML(src.url)}" target="_blank" rel="noopener">${label}</a>` : label;
            return `<li>${url}</li>`;
          }).join("");
        return `
          <div class="kv-key">${labelMap[k] || prettifyKey(k)}</div>
          <div class="kv-val"><ul>${links}</ul></div>`;
      }
      return `
        <div class="kv-key">${labelMap[k] || prettifyKey(k)}</div>
        <div class="kv-val">${renderValue(d[k])}</div>`;
    })
    .join("");

  container.innerHTML = `
    <div class="drug-title" style="border-left: 6px solid ${color}; padding-left:8px;">
      ${escapeHTML(title)}
      ${d.lastReviewed ? `<div class="kv-muted">Last reviewed: ${escapeHTML(d.lastReviewed)}</div>` : ""}
    </div>
    <div class="kv-list">
      ${rows}
    </div>
  `;
}

