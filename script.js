/* ===================================================================
   GET — Gestão de Equipamentos Tecnológicos
   Dados guardados em localStorage. Sem backend.
   =================================================================== */

const STORAGE_KEY = "get_app_data_v1";

const DEFAULT_DATA = {
  equipamentos: [
    { id: "eq1", nome: "Portátil Dell Latitude", tipo: "Portátil", serie: "SN-10231", estado: "disponivel" },
    { id: "eq2", nome: "Tablet Samsung Tab A9", tipo: "Tablet", serie: "SN-20345", estado: "disponivel" },
    { id: "eq3", nome: "Projetor Epson EB-X06", tipo: "Projetor", serie: "SN-30456", estado: "disponivel" }
  ],
  pedidos: [],     // { id, alunoNome, alunoNumero, equipId, equipNome, data, estado: pendente|aprovado|rejeitado }
  historico: [],   // { id, alunoNome, alunoNumero, equipNome, dataPedido, dataDevolucao, estado: emprestado|devolvido }
  config: {
    theme: "light",
    intensity: 50,
    accent: "#2E5EAA",
    fontsize: "medium",
    lang: "pt"
  },
  session: null // { nome, numero, role }
};

let DATA = loadData();

/* ---------- PERSISTENCE ---------- */
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(DEFAULT_DATA), ...parsed };
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
  } catch (e) {
    console.error("Erro ao guardar dados:", e);
    showToast(t("errSave"));
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---------- I18N ---------- */
const I18N = {
  pt: {
    brandSub: "Gestão de Equipamentos",
    navLogin: "Login", navEquip: "Equipamentos", navRegistar: "Registar Equipamento",
    navPedir: "Pedir Empréstimo", navGestao: "Gestão de Pedidos", navDevolucoes: "Devoluções",
    navHistorico: "Histórico", navConfig: "Configurações", noSession: "Sem sessão", logout: "Terminar sessão",
    eyebrowAccess: "Acesso ao sistema", loginTitle: "Entrar", loginAs: "Entrar como",
    roleAluno: "Aluno", roleAdmin: "Administrador", fieldName: "Nome", fieldNumAluno: "Número de aluno",
    btnEnter: "Entrar", aboutTitle: "Sobre este sistema",
    aboutText: "Plataforma de gestão de empréstimo de equipamentos tecnológicos da Escola Profissional do Fundão. Permite a alunos consultar e pedir equipamentos, e a administradores gerir o inventário e aprovar pedidos.",
    aboutItem1: "Registo e consulta de equipamentos", aboutItem2: "Pedido, aprovação e devolução de empréstimos",
    aboutItem3: "Histórico completo por aluno",
    eyebrowInventory: "Inventário", equipTitle: "Equipamentos Disponíveis", searchPlaceholder: "Pesquisar equipamento...",
    eyebrowAdmin: "Administração", registarTitle: "Registar Equipamento", fieldEquipName: "Nome do equipamento",
    fieldEquipType: "Tipo", typeLaptop: "Portátil", typeTablet: "Tablet", typeProjector: "Projetor", typeCamera: "Câmara",
    typeOther: "Outro", fieldSerial: "Número de série", btnRegister: "Registar", registeredList: "Equipamentos registados",
    thName: "Nome", thType: "Tipo", thSerial: "Nº Série", thStatus: "Estado",
    eyebrowRequest: "Pedido", pedirTitle: "Pedir Empréstimo", pedirHint: "Escolhe um equipamento disponível para submeter o teu pedido.",
    gestaoTitle: "Gestão de Pedidos", thStudent: "Aluno", thEquip: "Equipamento", thDate: "Data", thAction: "Ação",
    devolucoesTitle: "Registar Devolução", thLoanDate: "Data de empréstimo",
    eyebrowRecords: "Registos", historicoTitle: "Histórico de Empréstimos", thRequestDate: "Pedido em", thReturnDate: "Devolvido em",
    eyebrowSystem: "Sistema", configTitle: "Configurações",
    cfgThemeTitle: "Tema", cfgThemeDesc: "Escolhe entre claro e escuro.", cfgLight: "Claro", cfgDark: "Escuro",
    cfgIntensityTitle: "Intensidade do tema", cfgIntensityDesc: "Ajusta o contraste entre um tom mais suave e um mais forte.",
    cfgSoft: "Suave", cfgStrong: "Forte",
    cfgAccentTitle: "Cor de destaque", cfgAccentDesc: "A cor usada em botões e elementos principais.",
    cfgFontSizeTitle: "Tamanho da letra", cfgFontSizeDesc: "Define o tamanho do texto em todo o site.",
    cfgSmall: "Pequeno", cfgMedium: "Médio", cfgLarge: "Grande",
    cfgLangTitle: "Idioma", cfgLangDesc: "Idioma usado em todo o site.",
    cfgResetTitle: "Repor dados", cfgResetDesc: "Remove todos os equipamentos, pedidos e histórico guardados neste navegador. Esta ação não pode ser desfeita.",
    cfgResetBtn: "Limpar todos os dados",
    statusDisponivel: "Disponível", statusEmprestado: "Emprestado", statusPendente: "Pendente", statusAprovado: "Aprovado", statusRejeitado: "Rejeitado", statusDevolvido: "Devolvido",
    toastLoginOk: "Sessão iniciada", toastLogout: "Sessão terminada", toastEquipAdded: "Equipamento registado",
    toastRequestSent: "Pedido enviado", toastApproved: "Pedido aprovado", toastRejected: "Pedido rejeitado",
    toastReturned: "Devolução registada", toastReset: "Dados repostos", toastFillFields: "Preenche todos os campos",
    confirmReset: "Tens a certeza? Esta ação remove todos os dados guardados.",
    emptyEquip: "Nenhum equipamento encontrado.", emptyPedidos: "Não existem pedidos pendentes.",
    emptyDevolucoes: "Não existem equipamentos emprestados.", emptyHistorico: "Ainda não há histórico de empréstimos.",
    btnRequest: "Pedir empréstimo", btnApprove: "Aprovar", btnReject: "Rejeitar", btnReturn: "Registar devolução",
    errSave: "Não foi possível guardar os dados."
  },
  en: {
    brandSub: "Equipment Management",
    navLogin: "Login", navEquip: "Equipment", navRegistar: "Register Equipment",
    navPedir: "Request Loan", navGestao: "Manage Requests", navDevolucoes: "Returns",
    navHistorico: "History", navConfig: "Settings", noSession: "No session", logout: "Log out",
    eyebrowAccess: "System access", loginTitle: "Sign in", loginAs: "Sign in as",
    roleAluno: "Student", roleAdmin: "Administrator", fieldName: "Name", fieldNumAluno: "Student number",
    btnEnter: "Enter", aboutTitle: "About this system",
    aboutText: "Equipment loan management platform for Escola Profissional do Fundão. Lets students browse and request equipment, and admins manage inventory and approve requests.",
    aboutItem1: "Equipment registration and lookup", aboutItem2: "Loan requests, approval and returns",
    aboutItem3: "Full history per student",
    eyebrowInventory: "Inventory", equipTitle: "Available Equipment", searchPlaceholder: "Search equipment...",
    eyebrowAdmin: "Administration", registarTitle: "Register Equipment", fieldEquipName: "Equipment name",
    fieldEquipType: "Type", typeLaptop: "Laptop", typeTablet: "Tablet", typeProjector: "Projector", typeCamera: "Camera",
    typeOther: "Other", fieldSerial: "Serial number", btnRegister: "Register", registeredList: "Registered equipment",
    thName: "Name", thType: "Type", thSerial: "Serial No.", thStatus: "Status",
    eyebrowRequest: "Request", pedirTitle: "Request Loan", pedirHint: "Choose an available item to submit your request.",
    gestaoTitle: "Manage Requests", thStudent: "Student", thEquip: "Equipment", thDate: "Date", thAction: "Action",
    devolucoesTitle: "Register Return", thLoanDate: "Loan date",
    eyebrowRecords: "Records", historicoTitle: "Loan History", thRequestDate: "Requested on", thReturnDate: "Returned on",
    eyebrowSystem: "System", configTitle: "Settings",
    cfgThemeTitle: "Theme", cfgThemeDesc: "Choose between light and dark.", cfgLight: "Light", cfgDark: "Dark",
    cfgIntensityTitle: "Theme intensity", cfgIntensityDesc: "Adjust contrast between a softer and stronger tone.",
    cfgSoft: "Soft", cfgStrong: "Strong",
    cfgAccentTitle: "Accent color", cfgAccentDesc: "The color used on buttons and key elements.",
    cfgFontSizeTitle: "Font size", cfgFontSizeDesc: "Sets the text size across the site.",
    cfgSmall: "Small", cfgMedium: "Medium", cfgLarge: "Large",
    cfgLangTitle: "Language", cfgLangDesc: "Language used across the site.",
    cfgResetTitle: "Reset data", cfgResetDesc: "Removes all equipment, requests and history saved in this browser. This cannot be undone.",
    cfgResetBtn: "Clear all data",
    statusDisponivel: "Available", statusEmprestado: "Loaned", statusPendente: "Pending", statusAprovado: "Approved", statusRejeitado: "Rejected", statusDevolvido: "Returned",
    toastLoginOk: "Signed in", toastLogout: "Signed out", toastEquipAdded: "Equipment registered",
    toastRequestSent: "Request sent", toastApproved: "Request approved", toastRejected: "Request rejected",
    toastReturned: "Return registered", toastReset: "Data reset", toastFillFields: "Fill in all fields",
    confirmReset: "Are you sure? This removes all saved data.",
    emptyEquip: "No equipment found.", emptyPedidos: "There are no pending requests.",
    emptyDevolucoes: "No equipment currently on loan.", emptyHistorico: "No loan history yet.",
    btnRequest: "Request loan", btnApprove: "Approve", btnReject: "Reject", btnReturn: "Register return",
    errSave: "Could not save data."
  }
};

function t(key) {
  const lang = DATA.config.lang || "pt";
  return (I18N[lang] && I18N[lang][key]) || I18N.pt[key] || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
}

/* ---------- TOAST ---------- */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ---------- THEME / CONFIG ---------- */
function hexToRgb(hex) {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function applyConfig() {
  const cfg = DATA.config;
  document.documentElement.setAttribute("data-theme", cfg.theme);
  document.documentElement.setAttribute("data-fontsize", cfg.fontsize);
  document.documentElement.style.setProperty("--accent", cfg.accent);
  document.documentElement.style.setProperty("--accent-rgb", hexToRgb(cfg.accent));

  // Intensity: blend bg/surface between soft and strong versions
  const intensity = cfg.intensity / 100;
  if (cfg.theme === "light") {
    const bgLight = lerpColor("#FFFFFF", "#E4DFD2", intensity);
    const surfaceLight = lerpColor("#FFFFFF", "#FFFFFF", intensity);
    document.documentElement.style.setProperty("--bg", bgLight);
    document.documentElement.style.setProperty("--surface-2", lerpColor("#F2EFE7", "#DCD5C4", intensity));
  } else {
    const bgDark = lerpColor("#2A2926", "#0E0D0C", intensity);
    document.documentElement.style.setProperty("--bg", bgDark);
    document.documentElement.style.setProperty("--surface-2", lerpColor("#33312D", "#1C1B19", intensity));
  }

  // Update UI controls to reflect state
  document.querySelectorAll("[data-theme-select]").forEach(b =>
    b.classList.toggle("active", b.dataset.themeSelect === cfg.theme));
  document.querySelectorAll("[data-fontsize-select]").forEach(b =>
    b.classList.toggle("active", b.dataset.fontsizeSelect === cfg.fontsize));
  document.querySelectorAll("[data-lang-select]").forEach(b =>
    b.classList.toggle("active", b.dataset.langSelect === cfg.lang));
  document.querySelectorAll("[data-accent]").forEach(b =>
    b.classList.toggle("active", b.dataset.accent.toLowerCase() === cfg.accent.toLowerCase()));
  const range = document.getElementById("intensityRange");
  if (range) range.value = cfg.intensity;

  applyI18n();
}

function lerpColor(hexA, hexB, t) {
  const a = hexA.replace("#", ""), b = hexB.replace("#", "");
  const ar = parseInt(a.substring(0,2),16), ag = parseInt(a.substring(2,4),16), ab = parseInt(a.substring(4,6),16);
  const br = parseInt(b.substring(0,2),16), bg = parseInt(b.substring(2,4),16), bb = parseInt(b.substring(4,6),16);
  const r = Math.round(ar + (br-ar)*t), g = Math.round(ag + (bg-ag)*t), bl = Math.round(ab + (bb-ab)*t);
  return `#${[r,g,bl].map(v=>v.toString(16).padStart(2,"0")).join("")}`;
}

/* ---------- NAVIGATION ---------- */
function goToPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById("page-" + pageId).classList.add("active");
  document.querySelector(`.nav-item[data-page="${pageId}"]`).classList.add("active");
  document.getElementById("sidebar").classList.remove("open");
  renderCurrentPage(pageId);
  window.scrollTo(0, 0);
}

function renderCurrentPage(pageId) {
  if (pageId === "equipamentos") renderEquipamentos();
  if (pageId === "registar") renderRegistarTable();
  if (pageId === "pedir") renderPedirList();
  if (pageId === "gestao") renderGestaoTable();
  if (pageId === "devolucoes") renderDevolucoesTable();
  if (pageId === "historico") renderHistoricoTable();
}

function updateNavVisibility() {
  const role = DATA.session ? DATA.session.role : null;
  document.querySelectorAll(".nav-item[data-role]").forEach(item => {
    item.classList.toggle("nav-hidden", item.dataset.role !== role);
  });
}

function updateSessionBox() {
  const box = document.getElementById("sessionBox");
  const logoutBtn = document.getElementById("btnLogout");
  if (DATA.session) {
    box.innerHTML = `<strong>${escapeHtml(DATA.session.nome)}</strong>${DATA.session.role === "admin" ? t("roleAdmin") : t("roleAluno")}`;
    logoutBtn.classList.remove("hidden");
  } else {
    box.innerHTML = `<span class="session-label">${t("noSession")}</span>`;
    logoutBtn.classList.add("hidden");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- LOGIN ---------- */
let selectedRole = "aluno";

function setupLogin() {
  document.querySelectorAll("[data-role-select]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedRole = btn.dataset.roleSelect;
      document.querySelectorAll("[data-role-select]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("loginNumeroField").style.display = selectedRole === "aluno" ? "flex" : "none";
    });
  });

  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("loginNome").value.trim();
    const numero = document.getElementById("loginNumero").value.trim();
    if (!nome || (selectedRole === "aluno" && !numero)) {
      showToast(t("toastFillFields"));
      return;
    }
    DATA.session = { nome, numero: numero || "—", role: selectedRole };
    saveData();
    updateSessionBox();
    updateNavVisibility();
    showToast(t("toastLoginOk"));
    goToPage(selectedRole === "admin" ? "gestao" : "equipamentos");
    document.getElementById("loginForm").reset();
  });

  document.getElementById("btnLogout").addEventListener("click", () => {
    DATA.session = null;
    saveData();
    updateSessionBox();
    updateNavVisibility();
    showToast(t("toastLogout"));
    goToPage("login");
  });
}

function requireSession(role) {
  if (!DATA.session || (role && DATA.session.role !== role)) {
    showToast(t("noSession"));
    goToPage("login");
    return false;
  }
  return true;
}

/* ---------- EQUIPAMENTOS (consulta) ---------- */
function renderEquipamentos(filter = "") {
  const list = document.getElementById("equipList");
  const term = filter.toLowerCase();
  const items = DATA.equipamentos.filter(e => e.nome.toLowerCase().includes(term));
  document.getElementById("equipCount").textContent = items.length;

  if (items.length === 0) {
    list.innerHTML = `<p class="empty-msg">${t("emptyEquip")}</p>`;
    return;
  }
  list.innerHTML = items.map(e => equipCardHtml(e)).join("");
}

function equipCardHtml(e) {
  const statusClass = e.estado === "disponivel" ? "status-disponivel" : "status-emprestado";
  const statusText = e.estado === "disponivel" ? t("statusDisponivel") : t("statusEmprestado");
  return `
    <div class="equip-card">
      <div class="equip-card-top">
        <div>
          <div class="equip-name">${escapeHtml(e.nome)}</div>
          <div class="equip-type">${escapeHtml(e.tipo)}</div>
        </div>
        <span class="status-pill ${statusClass}">${statusText}</span>
      </div>
      <div class="equip-serial">${escapeHtml(e.serie)}</div>
    </div>`;
}

/* ---------- REGISTAR EQUIPAMENTO (admin) — RF01 ---------- */
function setupRegistar() {
  document.getElementById("registarForm").addEventListener("submit", e => {
    e.preventDefault();
    if (!requireSession("admin")) return;
    const nome = document.getElementById("regNome").value.trim();
    const tipo = document.getElementById("regTipo").value;
    const serie = document.getElementById("regSerie").value.trim();
    if (!nome || !serie) { showToast(t("toastFillFields")); return; }

    DATA.equipamentos.push({ id: uid(), nome, tipo, serie, estado: "disponivel" });
    saveData();
    showToast(t("toastEquipAdded"));
    document.getElementById("registarForm").reset();
    renderRegistarTable();
  });
}

function renderRegistarTable() {
  const tbody = document.querySelector("#regTable tbody");
  if (DATA.equipamentos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-msg">${t("emptyEquip")}</td></tr>`;
    return;
  }
  tbody.innerHTML = DATA.equipamentos.map(e => {
    const statusClass = e.estado === "disponivel" ? "status-disponivel" : "status-emprestado";
    const statusText = e.estado === "disponivel" ? t("statusDisponivel") : t("statusEmprestado");
    return `<tr>
      <td>${escapeHtml(e.nome)}</td>
      <td>${escapeHtml(e.tipo)}</td>
      <td>${escapeHtml(e.serie)}</td>
      <td><span class="status-pill ${statusClass}">${statusText}</span></td>
      <td><button class="btn-small btn-reject" data-remove-equip="${e.id}">×</button></td>
    </tr>`;
  }).join("");

  tbody.querySelectorAll("[data-remove-equip]").forEach(btn => {
    btn.addEventListener("click", () => {
      DATA.equipamentos = DATA.equipamentos.filter(eq => eq.id !== btn.dataset.removeEquip);
      saveData();
      renderRegistarTable();
    });
  });
}

/* ---------- PEDIR EMPRÉSTIMO (aluno) — RF03 / RF08 ---------- */
function renderPedirList() {
  const list = document.getElementById("pedirList");
  const disponiveis = DATA.equipamentos.filter(e => e.estado === "disponivel");

  if (disponiveis.length === 0) {
    list.innerHTML = `<p class="empty-msg">${t("emptyEquip")}</p>`;
    return;
  }

  list.innerHTML = disponiveis.map(e => `
    <div class="equip-card">
      <div class="equip-card-top">
        <div>
          <div class="equip-name">${escapeHtml(e.nome)}</div>
          <div class="equip-type">${escapeHtml(e.tipo)}</div>
        </div>
        <span class="status-pill status-disponivel">${t("statusDisponivel")}</span>
      </div>
      <div class="equip-serial">${escapeHtml(e.serie)}</div>
      <button class="btn btn-primary" data-request-equip="${e.id}">${t("btnRequest")}</button>
    </div>
  `).join("");

  list.querySelectorAll("[data-request-equip]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!requireSession("aluno")) return;
      const equip = DATA.equipamentos.find(eq => eq.id === btn.dataset.requestEquip);
      if (!equip || equip.estado !== "disponivel") return; // RF08: impede pedir já emprestado

      DATA.pedidos.push({
        id: uid(),
        alunoNome: DATA.session.nome,
        alunoNumero: DATA.session.numero,
        equipId: equip.id,
        equipNome: equip.nome,
        data: new Date().toLocaleDateString("pt-PT"),
        estado: "pendente"
      });
      equip.estado = "pendente_pedido"; // marca como já com pedido em curso, evita pedidos duplicados
      saveData();
      showToast(t("toastRequestSent"));
      renderPedirList();
    });
  });
}

/* ---------- GESTÃO DE PEDIDOS (admin) — RF04 / RF07 ---------- */
function renderGestaoTable() {
  const tbody = document.querySelector("#gestaoTable tbody");
  const pendentes = DATA.pedidos.filter(p => p.estado === "pendente");

  if (pendentes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-msg">${t("emptyPedidos")}</td></tr>`;
    return;
  }

  tbody.innerHTML = pendentes.map(p => `
    <tr>
      <td>${escapeHtml(p.alunoNome)}</td>
      <td>${escapeHtml(p.equipNome)}</td>
      <td>${p.data}</td>
      <td><span class="status-pill status-pendente">${t("statusPendente")}</span></td>
      <td class="action-cell">
        <button class="btn-small btn-approve" data-approve="${p.id}">${t("btnApprove")}</button>
        <button class="btn-small btn-reject" data-reject="${p.id}">${t("btnReject")}</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll("[data-approve]").forEach(btn => {
    btn.addEventListener("click", () => handlePedidoDecision(btn.dataset.approve, "aprovado"));
  });
  tbody.querySelectorAll("[data-reject]").forEach(btn => {
    btn.addEventListener("click", () => handlePedidoDecision(btn.dataset.reject, "rejeitado"));
  });
}

function handlePedidoDecision(pedidoId, decisao) {
  if (!requireSession("admin")) return;
  const pedido = DATA.pedidos.find(p => p.id === pedidoId);
  if (!pedido) return;
  const equip = DATA.equipamentos.find(e => e.id === pedido.equipId);

  pedido.estado = decisao;

  if (decisao === "aprovado") {
    if (equip) equip.estado = "emprestado"; // RF07: atualiza estado automaticamente
    DATA.historico.push({
      id: uid(),
      alunoNome: pedido.alunoNome,
      alunoNumero: pedido.alunoNumero,
      equipId: pedido.equipId,
      equipNome: pedido.equipNome,
      dataPedido: pedido.data,
      dataDevolucao: null,
      estado: "emprestado"
    });
    showToast(t("toastApproved"));
  } else {
    if (equip) equip.estado = "disponivel"; // liberta de novo
    showToast(t("toastRejected"));
  }

  saveData();
  renderGestaoTable();
}

/* ---------- DEVOLUÇÕES (admin) — RF05 / RF07 ---------- */
function renderDevolucoesTable() {
  const tbody = document.querySelector("#devolucoesTable tbody");
  const emprestados = DATA.historico.filter(h => h.estado === "emprestado");

  if (emprestados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-msg">${t("emptyDevolucoes")}</td></tr>`;
    return;
  }

  tbody.innerHTML = emprestados.map(h => `
    <tr>
      <td>${escapeHtml(h.alunoNome)}</td>
      <td>${escapeHtml(h.equipNome)}</td>
      <td>${h.dataPedido}</td>
      <td><button class="btn-small btn-approve" data-return="${h.id}">${t("btnReturn")}</button></td>
    </tr>
  `).join("");

  tbody.querySelectorAll("[data-return]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!requireSession("admin")) return;
      const registo = DATA.historico.find(h => h.id === btn.dataset.return);
      if (!registo) return;
      registo.estado = "devolvido";
      registo.dataDevolucao = new Date().toLocaleDateString("pt-PT");

      const equip = DATA.equipamentos.find(e => e.id === registo.equipId);
      if (equip) equip.estado = "disponivel"; // RF07

      saveData();
      showToast(t("toastReturned"));
      renderDevolucoesTable();
    });
  });
}

/* ---------- HISTÓRICO (RF06) ---------- */
function renderHistoricoTable() {
  const tbody = document.querySelector("#historicoTable tbody");
  let registos = DATA.historico;

  // Aluno só vê o seu próprio histórico
  if (DATA.session && DATA.session.role === "aluno") {
    registos = registos.filter(h => h.alunoNumero === DATA.session.numero);
  }

  if (registos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty-msg">${t("emptyHistorico")}</td></tr>`;
    return;
  }

  tbody.innerHTML = registos.slice().reverse().map(h => {
    const statusClass = h.estado === "devolvido" ? "status-disponivel" : "status-emprestado";
    const statusText = h.estado === "devolvido" ? t("statusDevolvido") : t("statusEmprestado");
    return `<tr>
      <td>${escapeHtml(h.alunoNome)}</td>
      <td>${escapeHtml(h.equipNome)}</td>
      <td>${h.dataPedido}</td>
      <td>${h.dataDevolucao || "—"}</td>
      <td><span class="status-pill ${statusClass}">${statusText}</span></td>
    </tr>`;
  }).join("");
}

/* ---------- CONFIGURAÇÕES ---------- */
function setupConfig() {
  document.querySelectorAll("[data-theme-select]").forEach(btn => {
    btn.addEventListener("click", () => {
      DATA.config.theme = btn.dataset.themeSelect;
      saveData(); applyConfig();
    });
  });

  document.querySelectorAll("[data-fontsize-select]").forEach(btn => {
    btn.addEventListener("click", () => {
      DATA.config.fontsize = btn.dataset.fontsizeSelect;
      saveData(); applyConfig();
    });
  });

  document.querySelectorAll("[data-lang-select]").forEach(btn => {
    btn.addEventListener("click", () => {
      DATA.config.lang = btn.dataset.langSelect;
      saveData(); applyConfig();
      updateSessionBox();
      updateNavVisibility();
      renderCurrentPage(currentPageId());
    });
  });

  document.querySelectorAll("[data-accent]").forEach(btn => {
    btn.addEventListener("click", () => {
      DATA.config.accent = btn.dataset.accent;
      saveData(); applyConfig();
    });
  });

  document.getElementById("intensityRange").addEventListener("input", (e) => {
    DATA.config.intensity = parseInt(e.target.value, 10);
    saveData(); applyConfig();
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    if (confirm(t("confirmReset"))) {
      const keepConfig = DATA.config;
      DATA = structuredClone(DEFAULT_DATA);
      DATA.config = keepConfig;
      saveData();
      updateSessionBox();
      updateNavVisibility();
      showToast(t("toastReset"));
      goToPage("login");
    }
  });
}

function currentPageId() {
  const active = document.querySelector(".page.active");
  return active ? active.id.replace("page-", "") : "login";
}

/* ---------- NAV WIRING ---------- */
function setupNav() {
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      const roleNeeded = btn.dataset.role;
      if (roleNeeded && !requireSession(roleNeeded)) return;
      goToPage(page);
    });
  });

  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });

  document.getElementById("equipSearch").addEventListener("input", (e) => {
    renderEquipamentos(e.target.value);
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setupLogin();
  setupRegistar();
  setupConfig();
  setupNav();
  updateSessionBox();
  updateNavVisibility();
  goToPage("login");
});