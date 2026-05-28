let model = null;
let layout = { version: "0.1", diagram: { steps: {}, connectors: {}, terminals: {} } };
let activeView = "flow";
let dragState = null;
let diagramEditMode = false;
let selectedDiagramStepId = null;

const els = {
  loadStatus: document.getElementById("loadStatus"),
  fileInput: document.getElementById("fileInput"),
  searchInput: document.getElementById("searchInput"),
  phaseFilter: document.getElementById("phaseFilter"),
  actorFilter: document.getElementById("actorFilter"),
  pendingOnly: document.getElementById("pendingOnly"),
  diagramMode: document.getElementById("diagramMode"),
  exportLayout: document.getElementById("exportLayout"),
exportDiagramSvg: document.getElementById("exportDiagramSvg"),
  exportDiagramJpg: document.getElementById("exportDiagramJpg"),
  layoutInput: document.getElementById("layoutInput"),
  summary: document.getElementById("summary"),
  flowView: document.getElementById("flowView"),
  diagramView: document.getElementById("diagramView"),
  transitionsView: document.getElementById("transitionsView"),
  decisionsView: document.getElementById("decisionsView"),
  scopeView: document.getElementById("scopeView"),
  traceView: document.getElementById("traceView"),
  jsonView: document.getElementById("jsonView")
};

init();

async function init() {
  bindEvents();
  try {
    const response = await fetch("../data/metafin_consolidado.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    model = await response.json();
    await loadLayout();
    els.loadStatus.textContent = "JSON cargado desde /data";
    hydrateFilters();
    render();
  } catch (error) {
    els.loadStatus.textContent = "Abre con servidor local o carga el JSON manualmente";
    renderEmpty();
  }
}

function bindEvents() {
  [els.searchInput, els.phaseFilter, els.actorFilter, els.pendingOnly].forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });

  els.fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    model = JSON.parse(await file.text());
    await loadLayout();
    els.loadStatus.textContent = `JSON cargado: ${file.name}`;
    hydrateFilters();
    render();
  });

  els.exportLayout.addEventListener("click", exportLayout);
els.exportDiagramSvg.addEventListener("click", exportDiagramSvg);
  els.exportDiagramJpg.addEventListener("click", exportDiagramJpg);
  els.diagramMode.addEventListener("click", () => {
    diagramEditMode = !diagramEditMode;
    updateDiagramModeButton();
    renderDiagram();
  });

  els.layoutInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    layout = JSON.parse(await file.text());
    render();
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
      document.getElementById(`${activeView}View`).classList.add("active");
      render();
    });
  });
}

async function loadLayout() {
  try {
    const response = await fetch("../data/metafin_layout.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    layout = await response.json();
  } catch {
    layout = { version: "0.1", diagram: { steps: {}, connectors: {}, terminals: {} } };
  }
}

function updateDiagramModeButton() {
  els.diagramMode.textContent = diagramEditMode ? "Editar" : "Visualizar";
  els.diagramMode.setAttribute("aria-pressed", String(diagramEditMode));
  els.diagramMode.classList.toggle("active", diagramEditMode);
}

function hydrateFilters() {
  const phases = unique(model.flujo.map((step) => step.fase));
  const actors = unique(model.flujo.flatMap((step) => step.actor_principal));

  fillSelect(els.phaseFilter, phases, "Todas");
  fillSelect(els.actorFilter, actors, "Todos");
}

function fillSelect(select, values, firstLabel) {
  const current = select.value;
  select.innerHTML = `<option value="">${firstLabel}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  select.value = values.includes(current) ? current : "";
}

function render() {
  if (!model) {
    renderEmpty();
    return;
  }
  renderSummary();
  renderFlow();
  renderDiagram();
  renderTransitions();
  renderDecisions();
  renderScope();
  renderTrace();
  renderJson();
}

function renderEmpty() {
  els.summary.innerHTML = "";
  els.flowView.innerHTML = `
    <div class="panel" style="padding:16px">
      No se pudo cargar <code>../data/metafin_consolidado.json</code> desde archivo local.
      Usa un servidor local o el botón <b>Cargar JSON</b>.
    </div>`;
}

function getFilteredFlow() {
  const query = normalize(els.searchInput.value);
  const phase = els.phaseFilter.value;
  const actor = els.actorFilter.value;
  const onlyPending = els.pendingOnly.checked;

  return model.flujo.filter((step) => {
    const haystack = normalize([
      step.etapa,
      step.resultado,
      step.sistema,
      step.fase,
      step.estado_definicion,
      step.actor_principal.join(" "),
      step.pendientes.join(" ")
    ].join(" "));

    if (query && !haystack.includes(query)) return false;
    if (phase && step.fase !== phase) return false;
    if (actor && !step.actor_principal.includes(actor)) return false;
    if (onlyPending && step.pendientes.length === 0) return false;
    return true;
  });
}

function renderSummary() {
  const flow = getFilteredFlow();
  const pendingSteps = flow.filter((step) => step.pendientes.length > 0).length;
  els.summary.innerHTML = [
    metric(flow.length, "etapas filtradas"),
    metric(model.flujo.length, "etapas totales"),
    metric(pendingSteps, "etapas con pendientes"),
    metric(model.decisiones_pendientes.length, "decisiones pendientes"),
    metric(model.deals_mvp.length, "Deals MVP")
  ].join("");
}

function metric(value, label) {
  return `<div class="metric"><b>${value}</b><span>${label}</span></div>`;
}

function renderFlow() {
  const flow = getFilteredFlow();
  els.flowView.innerHTML = `<div class="flow">${flow.map(renderStep).join("")}</div>`;
}

function renderDiagram() {
  const lanes = [
    "Cliente",
    "Call Center",
    "Sistema",
    "Proveedor",
    "Supervisor"
  ];
  const laneIndex = new Map(lanes.map((lane, index) => [lane, index]));
  const visibleSteps = getFilteredFlow();
  const visibleIds = new Set(visibleSteps.map((step) => step.id));
  const steps = visibleSteps.map((step, index) => {
    const saved = layout.diagram?.steps?.[String(step.id)];
    return {
      ...step,
      lane: resolveLane(step.actor_principal, laneIndex),
      row: index,
      savedX: saved?.x,
      savedY: saved?.y
    };
  });
  const stepById = new Map(steps.map((step) => [step.id, step]));
  const transitions = (model.transiciones || []).filter((t) => visibleIds.has(t.desde) && (t.hacia === null || visibleIds.has(t.hacia)));
  const rowHeight = 248;
  const laneWidth = 260;
  const headerHeight = 44;
  const leftPad = 44;
  const width = leftPad + lanes.length * laneWidth + 520;
  const height = headerHeight + Math.max(steps.length, 1) * rowHeight + 50;

  const cards = steps.map((step) => {
    const x = Number.isFinite(step.savedX) ? step.savedX : leftPad + step.lane * laneWidth + 18;
    const y = Number.isFinite(step.savedY) ? step.savedY : headerHeight + step.row * rowHeight + 28;
    const titleLines = wrapText(step.etapa, 25, 3);
    const metaLines = wrapText(step.descripcion || step.resultado, 36, 9);
    const sysIcons = systemIcons(step.sistema);
    return `
      <g class="diagramCard ${selectedDiagramStepId === step.id ? "selected" : ""}" data-step-id="${step.id}" transform="translate(${x} ${y})">
        <title>${escapeSvg(step.sistema || "")}</title>
        <rect width="240" height="155" rx="7" class="${phaseClass(step.fase)}"></rect>
        <circle cx="19" cy="20" r="13"></circle>
        <text x="19" y="24" text-anchor="middle" class="cardNum">${step.id}</text>
        <text x="40" y="18" class="cardTitle">${svgTspans(titleLines, 40, 18, 14)}</text>
        <text x="12" y="48" class="cardMeta">${svgTspans(metaLines, 12, 48, 13)}</text>
        ${svgIconBadges(sysIcons)}
        <g class="cardResetBtn" data-step-id="${step.id}">
          <circle cx="226" cy="14" r="11"></circle>
          <text x="226" y="19" text-anchor="middle" class="cardResetIcon">↺</text>
        </g>
      </g>`;
  }).join("");

  const connectorLines = [];
  const connectorHandles = [];
  transitions.forEach((transition, index) => {
    const from = stepById.get(transition.desde);
    const to = transition.hacia === null ? null : stepById.get(transition.hacia);
    if (!from) return;
    const fromX = Number.isFinite(from.savedX) ? from.savedX : leftPad + from.lane * laneWidth + 18;
    const fromY = Number.isFinite(from.savedY) ? from.savedY : headerHeight + from.row * rowHeight + 28;
    const toX = to ? (Number.isFinite(to.savedX) ? to.savedX : leftPad + to.lane * laneWidth + 18) : null;
    const toY = to ? (Number.isFinite(to.savedY) ? to.savedY : headerHeight + to.row * rowHeight + 28) : null;
    const cls = transitionTypeClass(transition.tipo);
    const key = transitionKey(transition);
    const savedConnector = layout.diagram?.connectors?.[key];
    const savedTerminal = layout.diagram?.terminals?.[key];
    const defaults = defaultConnectorPoints(transition, fromX, fromY, toX, toY, index);
    const start = savedConnector?.from || defaults.from;
    const end = transition.hacia === null
      ? (savedTerminal || savedConnector?.to || defaults.to)
      : (savedConnector?.to || defaults.to);
    const control = savedConnector?.control || defaultControlPoint(start, end, transition, index);
    const path = connectorPath(start, end, control);
    const markerId = cls === "pending" ? "arrowPending" : cls === "cond" ? "arrowCond" : "arrowNormal";
    const label = savedConnector?.label || defaultLabelPoint(start, end, control, index);
    const labelLines = wrapText(transition.condicion, 34, 2);
    const terminal = transition.hacia === null
      ? `<g class="terminalNode ${cls}" transform="translate(${end.x - 38} ${end.y - 17})">
          <rect width="76" height="34" rx="17"></rect>
          <text x="38" y="22" text-anchor="middle">Fin</text>
        </g>`
      : "";
    connectorLines.push(`
      <g class="connector" data-connector-key="${escapeHtml(key)}">
        <path class="flowLine ${cls}" d="${path}" marker-end="url(#${markerId})"></path>
        ${terminal}
        <g class="lineLabel ${cls}" data-connector-key="${escapeHtml(key)}" transform="translate(${label.x} ${label.y})">
          <text text-anchor="middle">${svgTspans(labelLines, 0, 0, 12)}</text>
        </g>
      </g>`);
    connectorHandles.push(`
      <g class="connectorHandleGroup" data-connector-key="${escapeHtml(key)}">
        <circle class="connectorHandle from" data-connector-key="${escapeHtml(key)}" data-end="from" cx="${start.x}" cy="${start.y}" r="6"></circle>
        <circle class="connectorHandle to" data-connector-key="${escapeHtml(key)}" data-end="to" cx="${end.x}" cy="${end.y}" r="6"></circle>
        <circle class="connectorHandle control" data-connector-key="${escapeHtml(key)}" data-end="control" cx="${control.x}" cy="${control.y}" r="5"></circle>
        <circle class="connectorHandle label" data-connector-key="${escapeHtml(key)}" data-end="label" cx="${label.x}" cy="${label.y}" r="4"></circle>
      </g>`);
  });

  const headers = lanes.map((lane, index) => {
    const x = leftPad + index * laneWidth;
    return `
      <g transform="translate(${x} 0)">
        <rect width="${laneWidth}" height="${headerHeight}" class="laneHeader"></rect>
        <text x="${laneWidth / 2}" y="27" text-anchor="middle" class="laneTitle">${escapeSvg(lane)}</text>
      </g>`;
  }).join("");

  const laneBands = lanes.map((_, index) => {
    const x = leftPad + index * laneWidth;
    return `<rect x="${x}" y="${headerHeight}" width="${laneWidth}" height="${height - headerHeight}" class="laneBand ${index % 2 ? "alt" : ""}"></rect>`;
  }).join("");

  const selectedStep = steps.find((step) => step.id === selectedDiagramStepId) || null;
  if (selectedDiagramStepId !== null && !steps.some((step) => step.id === selectedDiagramStepId)) {
    selectedDiagramStepId = null;
  }
  const selectedPosition = selectedStep ? {
    x: Number.isFinite(selectedStep.savedX) ? selectedStep.savedX : leftPad + selectedStep.lane * laneWidth + 18,
    y: Number.isFinite(selectedStep.savedY) ? selectedStep.savedY : headerHeight + selectedStep.row * rowHeight + 28
  } : null;

  els.diagramView.innerHTML = `
    <div class="diagramWrap ${diagramEditMode ? "editMode" : "viewMode"}">
      <div class="diagramHint">
        Diagrama básico generado desde <code>data/metafin_consolidado.json</code>.
        Mostrando <b>${steps.length}</b> etapas y <b>${transitions.length}</b> transiciones.
        ${diagramEditMode ? "Modo edición: arrastra tarjetas, conectores y etiquetas." : "Modo visualización: controles ocultos."}
        Usa <b>Exportar layout</b> para guardar posiciones.
        <span class="legend"><span class="dot normal"></span>normal <span class="dot cond"></span>pendiente/reproceso <span class="dot pending"></span>excepción/cierre</span>
      </div>
      <svg class="diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="Flujo con swimlanes">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".18"></feDropShadow>
          </filter>
          <marker id="arrowNormal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 7 3.5 L 0 7 z" class="arrow"></path>
          </marker>
          <marker id="arrowCond" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 7 3.5 L 0 7 z" class="arrow cond"></path>
          </marker>
          <marker id="arrowPending" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 7 3.5 L 0 7 z" class="arrow pending"></path>
          </marker>
        </defs>
        ${laneBands}
        ${headers}
        ${connectorLines.join("")}
        ${cards}
        ${connectorHandles.join("")}
      </svg>
      ${renderDiagramDetails(selectedStep, selectedPosition, width)}
    </div>`;
  bindDiagramSelection();
  if (!diagramEditMode) return;
  bindDiagramDrag();
  bindConnectorDrag();
}

function renderDiagramDetails(step, position, diagramWidth) {
  if (!step) return "";
  const panelWidth = 390;
  const gap = 18;
  const left = position.x + 240 + gap + panelWidth > diagramWidth
    ? Math.max(12, position.x - panelWidth - gap)
    : position.x + 240 + gap;
  const top = Math.max(56, position.y + 10);
  const incoming = (model.transiciones || []).filter((transition) => transition.hacia === step.id);
  const outgoing = (model.transiciones || []).filter((transition) => transition.desde === step.id);
  const flowById = new Map(model.flujo.map((item) => [item.id, item]));
  return `
    <aside class="diagramDetails" style="left:${left}px; top:${top}px" aria-live="polite">
      <button class="detailsClose" aria-label="Cerrar detalle">✕</button>
      <div class="detailsHeader">
        <span class="num">${step.id}</span>
        <div>
          <h2>${escapeHtml(step.etapa)}</h2>
          <p>${escapeHtml(step.resultado)}</p>
        </div>
      </div>
      <dl>
        <dt>Actores</dt>
        <dd>${step.actor_principal.map((actor) => `<span class="pill">${escapeHtml(actor)}</span>`).join("")}</dd>
        <dt>Sistema / canal</dt>
        <dd>${escapeHtml(step.sistema)}</dd>
        <dt>Fase</dt>
        <dd><span class="pill phase ${phaseClass(step.fase)}">${escapeHtml(step.fase)}</span></dd>
        <dt>Estado</dt>
        <dd>${escapeHtml(step.estado_definicion)}</dd>
        <dt>Pendientes</dt>
        <dd>${step.pendientes.length ? `<ul>${step.pendientes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "Sin pendientes"}</dd>
        <dt>Entradas</dt>
        <dd>${incoming.length ? `<ul>${incoming.map((transition) => `<li><b>${transition.desde}</b> · ${escapeHtml(flowById.get(transition.desde)?.etapa || "Origen")}<br><span>${escapeHtml(transition.condicion)}</span></li>`).join("")}</ul>` : "Inicio o sin entradas filtradas"}</dd>
        <dt>Salidas</dt>
        <dd>${outgoing.length ? `<ul>${outgoing.map((transition) => `<li>${transition.hacia === null ? "<b>Fin</b>" : `<b>${transition.hacia}</b> · ${escapeHtml(flowById.get(transition.hacia)?.etapa || "Destino")}`}<br><span>${escapeHtml(transition.condicion)}</span></li>`).join("")}</ul>` : "Sin salidas"}</dd>
        <dt>Referencias</dt>
        <dd>${step.referencias.map((ref) => `<code>${escapeHtml(ref)}</code>`).join(" ")}</dd>
      </dl>
    </aside>`;
}

function renderStep(step) {
  return `
    <article class="step" data-phase="${escapeHtml(step.fase)}">
      <div><span class="num">${step.id}</span></div>
      <div>
        <div class="title">${escapeHtml(step.etapa)}</div>
        <div class="muted">${escapeHtml(step.resultado)}</div>
        <div class="pillRow">${step.actor_principal.map((actor) => `<span class="pill">${escapeHtml(actor)}</span>`).join("")}</div>
      </div>
      <div>
        <div class="title">Sistema / canal</div>
        <div class="muted">${escapeHtml(step.sistema)}</div>
      </div>
      <div>
        <div class="title">Fase</div>
        <span class="pill phase ${phaseClass(step.fase)}">${escapeHtml(step.fase)}</span>
        <div class="muted" style="margin-top:7px">${escapeHtml(step.estado_definicion)}</div>
      </div>
      <div>
        <div class="title">Pendientes</div>
        ${step.pendientes.length ? `<ul class="muted">${step.pendientes.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : `<div class="muted">Sin pendientes bloqueantes</div>`}
      </div>
    </article>`;
}

function renderDecisions() {
  els.decisionsView.innerHTML = `
    <div class="panel">
      <table>
        <thead><tr><th>ID</th><th>Tema</th><th>Estado</th><th>Pendiente</th></tr></thead>
        <tbody>
          ${model.decisiones_pendientes.map((d) => `
            <tr>
              <td><b>${escapeHtml(d.id)}</b></td>
              <td>${escapeHtml(d.tema)}</td>
              <td>${escapeHtml(d.estado)}</td>
              <td>${escapeHtml(d.pendiente)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderTransitions() {
  const flowById = new Map(model.flujo.map((step) => [step.id, step]));
  els.transitionsView.innerHTML = `
    <div class="panel">
      <table>
        <thead><tr><th>Desde</th><th>Condición</th><th>Hacia</th><th>Tipo</th></tr></thead>
        <tbody>
          ${(model.transiciones || []).map((transition) => {
            const from = flowById.get(transition.desde);
            const to = transition.hacia === null ? null : flowById.get(transition.hacia);
            return `
              <tr>
                <td><b>${transition.desde}</b> · ${escapeHtml(from?.etapa || "No identificado")}</td>
                <td>${escapeHtml(transition.condicion)}</td>
                <td>${transition.hacia === null ? "Fin" : `<b>${transition.hacia}</b> · ${escapeHtml(to?.etapa || "No identificado")}`}</td>
                <td><span class="pill ${transitionTypeClass(transition.tipo)}">${escapeHtml(transition.tipo)}</span></td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderScope() {
  const labels = {
    mvp: "MVP",
    mvp_condicionado: "MVP condicionado",
    fase_2: "Fase 2",
    fuera_del_sistema_con_registro: "Fuera del sistema con registro"
  };
  els.scopeView.innerHTML = `
    <div class="scopeGrid">
      ${Object.entries(model.alcance).map(([key, items]) => `
        <section class="scopeCard">
          <h3>${labels[key] || key}</h3>
          <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>`).join("")}
    </div>`;
}

function renderTrace() {
  els.traceView.innerHTML = `
    <div class="panel">
      <table>
        <thead><tr><th>Paso HTML</th><th>Nombre HTML</th><th>Tratamiento</th><th>Proceso real</th></tr></thead>
        <tbody>
          ${model.trazabilidad_html.map((row) => `
            <tr>
              <td><b>${escapeHtml(row.paso_html)}</b></td>
              <td>${escapeHtml(row.nombre_html)}</td>
              <td>${escapeHtml(row.tratamiento)}</td>
              <td>${escapeHtml(row.proceso_real)}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function renderJson() {
  els.jsonView.innerHTML = `<pre>${escapeHtml(JSON.stringify(model, null, 2))}</pre>`;
}

function phaseClass(phase) {
  if (phase === "MVP condicionado") return "cond";
  if (phase === "Pendiente de definición") return "pending";
  return "";
}

function transitionTypeClass(type) {
  if (["excepcion", "cierre", "fin"].includes(type)) return "pending";
  if (["pendiente", "reproceso"].includes(type)) return "cond";
  return "";
}

function resolveLane(actors, laneIndex) {
  for (const actor of actors) {
    if (laneIndex.has(actor)) return laneIndex.get(actor);
  }
  const supervisorAliases = ["Área Administrativa", "Administración", "Gestión", "Área Admin", "Finanzas"];
  if (actors.some((a) => supervisorAliases.includes(a))) return laneIndex.get("Supervisor");
  return laneIndex.get("Sistema");
}

function escapeSvg(value) {
  return escapeHtml(value);
}

function bindDiagramDrag() {
  const svg = els.diagramView.querySelector("svg");
  if (!svg) return;
  svg.querySelectorAll(".cardResetBtn").forEach((btn) => {
    btn.addEventListener("pointerdown", (event) => event.stopPropagation());
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const stepId = Number(btn.dataset.stepId);
      if (!layout.diagram) return;
      (model.transiciones || []).forEach((transition) => {
        if (transition.desde !== stepId && transition.hacia !== stepId) return;
        const key = transitionKey(transition);
        delete layout.diagram.connectors?.[key];
        delete layout.diagram.terminals?.[key];
      });
      renderDiagram();
    });
  });
  svg.querySelectorAll(".diagramCard").forEach((card) => {
    card.addEventListener("pointerdown", (event) => {
      const id = card.dataset.stepId;
      const point = svgPoint(svg, event.clientX, event.clientY);
      const current = getStepPositionFromTransform(card);
      dragState = { id, card, offsetX: point.x - current.x, offsetY: point.y - current.y, startX: current.x, startY: current.y };
      card.setPointerCapture(event.pointerId);
      card.classList.add("dragging");
    });
    card.addEventListener("pointermove", (event) => {
      if (!dragState || dragState.card !== card) return;
      const point = svgPoint(svg, event.clientX, event.clientY);
      const x = Math.round(point.x - dragState.offsetX);
      const y = Math.round(point.y - dragState.offsetY);
      setStepLayout(dragState.id, x, y);
      card.setAttribute("transform", `translate(${x} ${y})`);
    });
    card.addEventListener("pointerup", (event) => {
      if (!dragState || dragState.card !== card) return;
      card.releasePointerCapture(event.pointerId);
      card.classList.remove("dragging");
      const newPos = getStepPositionFromTransform(card);
      updateConnectorsForMovedStep(Number(dragState.id), newPos.x - dragState.startX, newPos.y - dragState.startY);
      dragState = null;
      renderDiagram();
    });
  });
}

function bindDiagramSelection() {
  const svg = els.diagramView.querySelector("svg");
  if (!svg) return;
  svg.querySelectorAll(".diagramCard").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedDiagramStepId = Number(card.dataset.stepId);
      renderDiagram();
    });
  });
  const closeBtn = els.diagramView.querySelector(".detailsClose");
  if (closeBtn) {
    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedDiagramStepId = null;
      renderDiagram();
    });
  }
}

function bindConnectorDrag() {
  const svg = els.diagramView.querySelector("svg");
  if (!svg) return;
  svg.querySelectorAll(".connectorHandle").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      const key = handle.dataset.connectorKey;
      const end = handle.dataset.end;
      const point = svgPoint(svg, event.clientX, event.clientY);
      const current = { x: Number(handle.getAttribute("cx")), y: Number(handle.getAttribute("cy")) };
      dragState = { kind: "connector", key, end, offsetX: point.x - current.x, offsetY: point.y - current.y };
      handle.setPointerCapture(event.pointerId);
      handle.classList.add("dragging");
    });
    handle.addEventListener("pointermove", (event) => {
      if (!dragState || dragState.kind !== "connector" || dragState.key !== handle.dataset.connectorKey || dragState.end !== handle.dataset.end) return;
      const point = svgPoint(svg, event.clientX, event.clientY);
      const rawX = Math.round(point.x - dragState.offsetX);
      const rawY = Math.round(point.y - dragState.offsetY);
      const snapped = snapConnectorPoint(svg, dragState.key, dragState.end, rawX, rawY);
      setConnectorLayout(dragState.key, dragState.end, snapped.x, snapped.y);
      handle.setAttribute("cx", snapped.x);
      handle.setAttribute("cy", snapped.y);
    });
    handle.addEventListener("pointerup", (event) => {
      if (!dragState || dragState.kind !== "connector" || dragState.key !== handle.dataset.connectorKey || dragState.end !== handle.dataset.end) return;
      handle.releasePointerCapture(event.pointerId);
      handle.classList.remove("dragging");
      dragState = null;
      renderDiagram();
    });
  });
}

function svgPoint(svg, clientX, clientY) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function getStepPositionFromTransform(card) {
  const transform = card.getAttribute("transform") || "";
  const match = transform.match(/translate\(([-\d.]+)\s+([-\d.]+)\)/);
  return {
    x: match ? Number(match[1]) : 0,
    y: match ? Number(match[2]) : 0
  };
}

function updateConnectorsForMovedStep(stepId, deltaX, deltaY) {
  if ((deltaX === 0 && deltaY === 0) || !layout.diagram?.connectors) return;
  (model.transiciones || []).forEach((transition) => {
    const key = transitionKey(transition);
    const saved = layout.diagram.connectors[key];
    if (!saved) return;
    const fromMoves = transition.desde === stepId;
    const toMoves = transition.hacia !== null && transition.hacia === stepId;
    const isTerminal = transition.hacia === null;
    if (fromMoves && saved.from) saved.from = { x: Math.round(saved.from.x + deltaX), y: Math.round(saved.from.y + deltaY) };
    if (toMoves && saved.to) saved.to = { x: Math.round(saved.to.x + deltaX), y: Math.round(saved.to.y + deltaY) };
    if (isTerminal && fromMoves) {
      if (saved.to) saved.to = { x: Math.round(saved.to.x + deltaX), y: Math.round(saved.to.y + deltaY) };
      if (layout.diagram.terminals?.[key]) layout.diagram.terminals[key] = { x: Math.round(layout.diagram.terminals[key].x + deltaX), y: Math.round(layout.diagram.terminals[key].y + deltaY) };
    }
    const factor = (fromMoves && (toMoves || isTerminal)) ? 1 : (fromMoves || toMoves) ? 0.5 : 0;
    if (factor > 0) {
      if (saved.control) saved.control = { x: Math.round(saved.control.x + deltaX * factor), y: Math.round(saved.control.y + deltaY * factor) };
      if (saved.label) saved.label = { x: Math.round(saved.label.x + deltaX * factor), y: Math.round(saved.label.y + deltaY * factor) };
    }
  });
}

function setStepLayout(id, x, y) {
  if (!layout.diagram) layout.diagram = { steps: {} };
  if (!layout.diagram.steps) layout.diagram.steps = {};
  layout.diagram.steps[String(id)] = { x, y };
}

function setConnectorLayout(key, end, x, y) {
  if (!layout.diagram) layout.diagram = { steps: {}, connectors: {}, terminals: {} };
  if (!layout.diagram.connectors) layout.diagram.connectors = {};
  if (!layout.diagram.connectors[key]) layout.diagram.connectors[key] = {};
  if (end === "label" || end === "control") {
    layout.diagram.connectors[key][end] = { x, y };
    return;
  }
  layout.diagram.connectors[key][end] = { x, y };
  if (end === "to" && key.includes(">fin|")) {
    if (!layout.diagram.terminals) layout.diagram.terminals = {};
    layout.diagram.terminals[key] = { x, y };
  }
}

function snapConnectorPoint(svg, key, end, x, y) {
  if (end !== "from" && end !== "to") return { x, y };
  const transition = (model.transiciones || []).find((item) => transitionKey(item) === key);
  if (!transition) return { x, y };
  if (end === "to" && transition.hacia === null) return { x, y };
  const stepId = end === "from" ? transition.desde : transition.hacia;
  const card = svg.querySelector(`.diagramCard[data-step-id="${stepId}"]`);
  if (!card) return { x, y };
  const pos = getStepPositionFromTransform(card);
  return closestPointOnCard(pos.x, pos.y, 240, 155, x, y);
}

function closestPointOnCard(cardX, cardY, width, height, x, y) {
  const left = cardX;
  const right = cardX + width;
  const top = cardY;
  const bottom = cardY + height;
  const clampedX = clamp(x, left, right);
  const clampedY = clamp(y, top, bottom);
  const distances = [
    { x: clampedX, y: top, d: Math.abs(y - top) },
    { x: clampedX, y: bottom, d: Math.abs(y - bottom) },
    { x: left, y: clampedY, d: Math.abs(x - left) },
    { x: right, y: clampedY, d: Math.abs(x - right) }
  ];
  distances.sort((a, b) => a.d - b.d);
  return { x: Math.round(distances[0].x), y: Math.round(distances[0].y) };
}

function transitionKey(transition) {
  return `${transition.desde}>${transition.hacia === null ? "fin" : transition.hacia}|${transition.condicion}`;
}

function defaultConnectorPoints(transition, fromX, fromY, toX, toY, index) {
  const isForwardNormal = transition.tipo === "normal" && transition.hacia !== null && transition.hacia > transition.desde;
  if (transition.hacia === null) {
    return {
      from: { x: fromX + 248, y: fromY + 70 + ((index % 2) * 18) },
      to: { x: fromX + 434, y: fromY + 70 + ((index % 2) * 18) }
    };
  }
  if (isForwardNormal) {
    return {
      from: { x: fromX + 120, y: fromY + 163 },
      to: { x: toX + 120, y: toY - 8 }
    };
  }
  return {
    from: { x: fromX + 248, y: fromY + 70 + ((index % 2) * 22) },
    to: { x: toX - 8, y: toY + 70 }
  };
}

function connectorPath(start, end, control) {
  return `M ${start.x} ${start.y} Q ${control.x} ${control.y}, ${end.x} ${end.y}`;
}

function defaultControlPoint(start, end, transition, index) {
  const offset = 34 + ((index % 3) * 18);
  if (transition.tipo === "normal" && transition.hacia !== null && transition.hacia > transition.desde) {
    return {
      x: Math.round((start.x + end.x) / 2),
      y: Math.round((start.y + end.y) / 2)
    };
  }
  return {
    x: Math.round((start.x + end.x) / 2),
    y: Math.round((start.y + end.y) / 2) - offset
  };
}

function defaultLabelPoint(start, end, control, index) {
  return {
    x: control.x,
    y: control.y - 16 - ((index % 2) * 12)
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function exportLayout() {
  downloadBlob(new Blob([JSON.stringify(layout, null, 2)], { type: "application/json" }), "metafin_layout.json");
}

function resolveCssVars(css) {
  const style = getComputedStyle(document.documentElement);
  return css.replace(/var\(--([^)]+)\)/g, (_, name) => style.getPropertyValue(`--${name.trim()}`).trim() || "unset");
}

async function loadCss() {
  try {
    const r = await fetch("styles.css", { cache: "no-store" });
    return r.ok ? resolveCssVars(await r.text()) : "";
  } catch { return ""; }
}

function getContentBounds(svg) {
  const headerH = 44, leftPad = 44, laneW = 260, numLanes = 5;
  let x0 = leftPad, y0 = 0, x1 = leftPad + numLanes * laneW, y1 = headerH;

  svg.querySelectorAll(".diagramCard").forEach((card) => {
    const p = getStepPositionFromTransform(card);
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x + 240);
    y1 = Math.max(y1, p.y + 191);
  });

  svg.querySelectorAll(".terminalNode").forEach((node) => {
    const m = (node.getAttribute("transform") || "").match(/translate\(([-\d.]+)\s+([-\d.]+)\)/);
    if (m) {
      x1 = Math.max(x1, +m[1] + 76);
      y1 = Math.max(y1, +m[2] + 34);
    }
  });

  const pad = 24;
  return { x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2 };
}

function buildSvgClone(svg, css, bounds, renderW, renderH) {
  const clone = svg.cloneNode(true);
  clone.removeAttribute("class");
  clone.setAttribute("viewBox", `${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`);
  clone.setAttribute("width", String(renderW));
  clone.setAttribute("height", String(renderH));
  clone.querySelectorAll(".connectorHandle").forEach((el) => el.remove());
  clone.querySelectorAll(".diagramCard.selected").forEach((el) => el.classList.remove("selected"));
  if (css) {
    const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
    styleEl.textContent = css;
    clone.insertBefore(styleEl, clone.firstChild);
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(clone);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function exportDiagramSvg() {
  const svg = els.diagramView.querySelector("svg");
  if (!svg) return;
  const bounds = getContentBounds(svg);
  const css = await loadCss();
  const svgStr = buildSvgClone(svg, css, bounds, bounds.w, bounds.h);
  downloadBlob(new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" }), "metafin_diagrama.svg");
}

async function exportDiagramJpg() {
  const svg = els.diagramView.querySelector("svg");
  if (!svg) return;
  const bounds = getContentBounds(svg);

  // Anchor scale to content WIDTH (= the 5 swimlanes).
  // Using the longer side (height) would shrink the width to ~855 px
  // making text 8 px → blurry. Width-anchored scale keeps text ~27 px.
  const A4_LONG_PX = Math.round(297 * 250 / 25.4); // 2921 px (A4 long at 250 DPI)
  const scale = A4_LONG_PX / bounds.w;
  const canvasW = Math.round(bounds.w * scale);
  const canvasH = Math.round(bounds.h * scale);

  const css = await loadCss();
  const svgStr = buildSvgClone(svg, css, bounds, canvasW, canvasH);

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasW, canvasH);

  const img = new Image();
  await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr); });
  ctx.drawImage(img, 0, 0, canvasW, canvasH);

  canvas.toBlob((blob) => downloadBlob(blob, "metafin_diagrama.jpg"), "image/jpeg", 0.95);
}

function wrapText(value, maxChars, maxLines = 3) {
  const words = String(value || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines - 1);
  kept.push(lines.slice(maxLines - 1).join(" "));
  return kept;
}

const BADGE_ICONS = {
  phone:    { color: "#1b5c9e", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  whatsapp: { color: "#25a244", filled: true, d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.999 2c-5.514 0-9.999 4.486-9.999 10 0 1.768.465 3.425 1.28 4.866L2 22l5.277-1.249C8.64 21.514 10.288 22 12 22c5.514 0 10-4.486 10-10S17.513 2 11.999 2z" },
  email:    { color: "#667085", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  system:   { color: "#102233", d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  external: { color: "#b42318", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" },
  manual:   { color: "#a45f00", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }
};

function systemIcons(sistema) {
  const s = (sistema || "").toLowerCase();
  const icons = [];
  if (s.includes("whatsapp"))                           icons.push(BADGE_ICONS.whatsapp);
  if (s.includes("teléfono") || s.includes("telefono")) icons.push(BADGE_ICONS.phone);
  if (s.includes("correo"))                             icons.push(BADGE_ICONS.email);
  if (s.includes("manual"))                             icons.push(BADGE_ICONS.manual);
  if (s.includes("fuera"))                              icons.push(BADGE_ICONS.external);
  if (s.startsWith("dentro") || s.includes("sistema dispara")) icons.push(BADGE_ICONS.system);
  return icons.slice(0, 4);
}

function svgIconBadges(icons) {
  if (!icons.length) return "";
  const r = 16, gap = 5;
  let cx = r + 8;
  const cy = 172;
  return icons.map((icon) => {
    const pathEl = icon.filled
      ? `<path d="${icon.d}" fill="white"/>`
      : `<path d="${icon.d}" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    const badge = `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${icon.color}"/>
      <g transform="translate(${cx - 7} ${cy - 7}) scale(0.6)">
        ${pathEl}
      </g>`;
    cx += r * 2 + gap;
    return badge;
  }).join("");
}

function svgTspans(lines, x, y, lineHeight) {
  return lines.map((line, index) => {
    const dy = index === 0 ? 0 : lineHeight;
    return `<tspan x="${x}" dy="${dy}">${escapeSvg(line)}</tspan>`;
  }).join("");
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, "es"));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
