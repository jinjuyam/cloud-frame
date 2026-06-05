// ===== 구름 데이터 (Figma 디자인 그대로) =====
//  slug = clouds-data.js 의 하프톤 데이터 키
const clouds = [
  { en: "Cumulus Type",      kr: "뭉게구름 타입",   slug: "cumulus" },
  { en: "Cirrus Type",       kr: "새털구름 타입",   slug: "cirrus" },
  { en: "Altocumulus Type",  kr: "양떼구름 타입",   slug: "altocumulus" },
  { en: "Cumulonimbus Type", kr: "소나기구름 타입", slug: "cumulonimbus" },
  { en: "Roll Cloud Type",   kr: "두루마리구름 타입", slug: "rollcloud" },
  { en: "Cirrocumulus Type", kr: "비늘구름 타입",   slug: "cirrocumulus" },
];

// ===== 리스트 렌더링 =====
const list = document.getElementById("cloudList");
list.innerHTML = clouds
  .map(
    (c, i) => `
    <li class="cloud-item" data-index="${i}">
      <span class="cloud-num">${i + 1}</span>
      <span class="cloud-text">
        <span class="cloud-title">${c.en}</span>
        <span class="cloud-sub">${c.kr}</span>
      </span>
      <canvas class="hover-cloud" data-cloud="${c.slug}" aria-hidden="true"></canvas>
    </li>`
  )
  .join("");

// ===== 내비게이션: Drift / About 창 전환 =====
const stage = document.querySelector(".stage");
const links = document.querySelectorAll(".topnav-link");

// 첫 진입 시 해시로 상태 지정
if (location.hash === "#about") stage.classList.add("show-about");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;

    // 큰 화면: 해당 창을 앞으로 가져오기
    stage.classList.remove("show-archive");
    stage.classList.toggle("show-about", target === "about");

    // 작은 화면(창이 세로로 쌓임): 부드럽게 스크롤
    const el = document.getElementById(target);
    if (el && window.innerWidth <= 1080) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// 종이(창)를 직접 클릭하면 그 종이가 위로 올라오게
const aboutWin = document.querySelector(".window--about");
const driftWin = document.querySelector(".window--drift");
aboutWin.addEventListener("click", () => {
  stage.classList.remove("show-archive");
  stage.classList.add("show-about");
});
driftWin.addEventListener("click", () => {
  stage.classList.remove("show-about", "show-archive");
});

// ===== 구름별 상세(Archive) 데이터 =====
//  halftone.mode: "photo"(실사진·HALO_DATA) / "silhouette"(일러스트·CLOUD_HT[slug])
const details = {
  cumulus: {
    label: "뭉게구름 타입", title: "Cumulus Type",
    desc: [
      "뭉게구름은 맑고 따뜻한 날 하늘 위로 솟아오르는 크고 하얀 구름이다. 지면이 태양열로 달궈지면 따뜻한 공기가 위로 올라가면서 수증기가 응결되어 만들어진다. 아래쪽은 평평하고 위쪽은 꽃양배추처럼 뭉실뭉실 부풀어 오른 형태가 특징이다.",
      "주로 오후에 발달하며 날씨가 좋을 때 자주 볼 수 있지만, 크게 성장하면 천둥번개를 동반한 적란운으로 발전하기도 한다.",
    ],
    tags: ["Puffy", "Cotton Candy", "Pure White", "Objet"],
    note: { date: "26.03.02", name: "뭉게구름", img: "img/note-cloud.png", fit: "cover" },
    halftone: { mode: "photo" },
  },
  cirrus: {
    label: "새털구름 타입", title: "Cirrus Type",
    desc: [
      "새털구름은 고도 6,000m 이상의 높은 하늘에서 얼음 결정으로 이루어진 얇고 실처럼 늘어진 구름이다. 바람에 쓸려 가늘게 뻗어나가는 모습이 특징이며, 햇빛을 투과시켜 하늘을 반투명하게 물들인다.",
      "주로 따뜻한 전선이 접근할 때 먼저 나타나며, 날씨 변화의 전조로 여겨진다. 얼음 결정이 낙하하면서 바람에 흩날려 갈고리나 말꼬리 모양을 이루기도 한다.",
    ],
    tags: ["Wispy", "Ice Crystal", "High Altitude", "Translucent"],
    note: { date: "26.03.03", name: "새털구름", img: "img/note-cirrus.png", fit: "cover" },
    halftone: { mode: "photo", photo: "cirrus" },
  },
  altocumulus: {
    label: "양떼구름 타입", title: "Altocumulus Type",
    desc: [
      "양떼구름은 중간 고도인 2,000~7,000m 사이에서 형성되는 구름으로, 작은 덩어리들이 줄지어 늘어선 모습이 양떼를 닮아 붙여진 이름이다. 흰색 또는 회색의 작은 구름 조각들이 규칙적인 패턴을 이루며 하늘을 가득 채운다.",
      "주로 안정된 대기 속 공기의 파동에 의해 생성되며, 아침에 나타났다가 낮이 되면 사라지는 경우가 많다. 양떼구름이 많이 보이면 다음 날 날씨가 흐려질 가능성이 높다.",
    ],
    tags: ["Fleecy", "Mid Altitude", "Rippled", "Pattern"],
    note: { date: "26.03.06", name: "양떼구름", img: "img/note-altocumulus.png", fit: "cover" },
    halftone: { mode: "photo", photo: "altocumulus" },
  },
  cumulonimbus: {
    label: "소나기구름 타입", title: "Cumulonimbus Type",
    desc: [
      "소나기구름은 강렬한 상승기류를 타고 수직으로 치솟는 거대한 구름이다. 꼭대기가 대기 상층부에 막혀 모루처럼 옆으로 퍼지며, 천둥과 번개, 강한 비를 동반한다. 모든 구름 중 가장 강력한 에너지를 품고 있다.",
      "대류가 활발한 여름 오후에 빠르게 발달하며, 완전히 성장한 적란운은 높이가 10,000m를 넘기도 한다. 멀리서도 한눈에 알아볼 수 있는 가장 극적인 구름이다.",
    ],
    tags: ["Anvil", "Thunder", "Convection", "Dramatic"],
    note: { date: "26.03.07", name: "소나기구름", img: "img/note-cumulonimbus.png", fit: "cover" },
    halftone: { mode: "photo", photo: "cumulonimbus" },
  },
  rollcloud: {
    label: "두루마리구름 타입", title: "Roll Cloud Type",
    desc: [
      "두루마리구름은 하늘을 가로질러 길고 수평하게 말린 원통형 구름이다. 대기의 경계면에서 차갑고 무거운 공기가 따뜻한 공기 위를 타고 밀려올 때, 두 공기층의 경계에서 회전하며 형성된다.",
      "드물게 나타나는 희귀한 구름으로, 끝없이 이어지는 두루마리처럼 하늘을 가로지른다. 주로 새벽 해안가나 산악 지대에서 관측되며, 천천히 회전하며 이동한다.",
    ],
    tags: ["Roll", "Horizontal", "Rare", "Rotating"],
    note: { date: "26.03.12", name: "두루마리구름", img: "img/note-rollcloud.png", fit: "cover" },
    halftone: { mode: "photo", photo: "rollcloud" },
  },
  cirrocumulus: {
    label: "비늘구름 타입", title: "Cirrocumulus Type",
    desc: [
      "비늘구름은 높은 고도에서 작고 하얀 덩어리들이 촘촘하게 줄지어 늘어선 구름이다. 물고기 비늘이나 모래사장의 잔물결처럼 규칙적인 패턴을 이루며, 얇고 반투명해 하늘빛이 그대로 비쳐 보인다.",
      "얼음 결정과 과냉각 물방울이 함께 섞여 만들어지며, 맑고 추운 날 높은 하늘에 나타난다. 비늘구름이 넓게 펼쳐지면 고등어 하늘이라 불리며, 날씨 변화가 임박했다는 신호로 여겨진다.",
    ],
    tags: ["Mackerel Sky", "Ripple", "High Altitude", "Delicate"],
    note: { date: "26.03.21", name: "비늘구름", img: "img/note-cirrocumulus.png", fit: "cover" },
    halftone: { mode: "photo", photo: "cirrocumulus" },
  },
};

// Archive 창 내용 채우고 열기
function openArchive(key) {
  const d = details[key];
  if (!d) return;
  document.getElementById("archiveLabel").textContent = d.label;
  document.getElementById("archiveTitle").textContent = d.title;
  document.getElementById("archiveDesc").innerHTML = d.desc.map((p) => `<p>${p}</p>`).join("");
  document.getElementById("archiveTags").innerHTML = d.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  document.getElementById("noteDate").textContent = d.note.date;
  document.getElementById("noteName").textContent = d.note.name;
  const nc = document.getElementById("noteCloud");
  nc.src = d.note.img;
  nc.style.objectFit = d.note.fit || "cover";

  stage.classList.remove("show-about");
  stage.classList.add("show-archive");
  requestAnimationFrame(() => window.__renderArchive && window.__renderArchive(key, d.halftone));

  // 모바일: 상세가 위에 열리므로 그 위치로 스크롤
  if (window.innerWidth <= 1080) {
    requestAnimationFrame(() =>
      document.getElementById("archive").scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }
}

// 목록 항목 클릭 → 상세 데이터가 있으면 Archive 열기
document.querySelectorAll(".cloud-item").forEach((li) => {
  const key = clouds[+li.dataset.index].slug;
  if (!details[key]) return;
  li.style.cursor = "pointer";
  li.addEventListener("click", (e) => {
    e.stopPropagation(); // driftWin 핸들러가 닫지 않도록
    openArchive(key);
  });
});

// 닫기 (X 버튼 / Esc)
document.getElementById("archiveClose").addEventListener("click", (e) => {
  e.stopPropagation();
  stage.classList.remove("show-archive");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") stage.classList.remove("show-archive");
});

// =========================================================
//  Archive 인터랙티브 하프톤 (마우스에 도트가 두둥실 반응)
//  - photo 모드: 실사진(HALO_DATA), 밝을수록 큰 도트
//  - silhouette 모드: 일러스트(CLOUD_HT[slug])를 미세 도트로, 어두운 프레임 안에 담아 표시
//  window.__renderArchive(key, {mode, slug}) 로 어떤 구름을 그릴지 지정
// =========================================================
(function () {
  const canvas = document.getElementById("haloCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const INFLUENCE = 120;   // 마우스 영향 반경(px)
  const LIFT = 38;         // 위로 떠오르는 높이(px)
  const SWAY = 9;          // 좌우로 살랑이는 폭(px)
  const SWAY_SPEED = 2.4;  // 흔들림 속도
  const EASE = 0.12;       // 떠오름/복귀 부드러움(두둥실)
  const SPACING_BIG = 6;   // silhouette 모드 도트 간격(px)
  const mouse = { x: -9999, y: -9999, on: false };

  let dots = [], W = 0, H = 0, dpr = 1, raf = 0, t = 0, cur = null, needRebuild = true;
  const visible = () => canvas.clientWidth > 0 && canvas.clientHeight > 0;

  // ---- 명암/실루엣 격자 디코드 & 캐시 (file:// 픽셀 접근 없음) ----
  function decodeGrid(b64) {
    const bin = atob(b64), g = new Float32Array(bin.length);
    for (let i = 0; i < g.length; i++) g[i] = bin.charCodeAt(i) / 255;
    return g;
  }
  const sources = {};
  if (window.HALO_DATA) {
    const D = window.HALO_DATA, g = decodeGrid(D.lum);
    let lo = 1, hi = 0;
    for (let i = 0; i < g.length; i++) { const v = g[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
    if (hi - lo < 0.05) { lo = 0; hi = 1; }
    sources.__photo = { mode: "photo", grid: g, cols: D.cols, rows: D.rows, lo, hi };
  }
  function silSource(slug) {
    if (sources[slug]) return sources[slug];
    const D = window.CLOUD_HT && window.CLOUD_HT[slug];
    if (!D) return null;
    sources[slug] = { mode: "silhouette", grid: decodeGrid(D.lum), cols: D.cols, rows: D.rows, w: D.w, h: D.h };
    return sources[slug];
  }
  // 구름별 실사진 하프톤(선계산 명암 격자, 대비 보정)
  function photoSource(key) {
    if (sources["ph_" + key]) return sources["ph_" + key];
    const D = window.HALO_PHOTOS && window.HALO_PHOTOS[key];
    if (!D) return null;
    const g = decodeGrid(D.lum);
    let lo = 1, hi = 0;
    for (let i = 0; i < g.length; i++) { const v = g[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
    if (hi - lo < 0.05) { lo = 0; hi = 1; }
    sources["ph_" + key] = { mode: "photo", grid: g, cols: D.cols, rows: D.rows, lo, hi };
    return sources["ph_" + key];
  }

  window.__renderArchive = function (key, cfg) {
    cfg = cfg || { mode: key === "cumulus" ? "photo" : "silhouette", slug: key };
    let src;
    if (cfg.mode === "photo") src = (cfg.photo && photoSource(cfg.photo)) || sources.__photo;
    else src = silSource(cfg.slug || key);
    if (!src) return;
    cur = src; needRebuild = true;
    build();
  };

  // 실사진: 격자 셀마다 도트, 밝을수록 큰 도트(어두운 하늘=작은 도트)
  function buildPhoto() {
    const C = cur.cols, R = cur.rows, g = cur.grid, lo = cur.lo, hi = cur.hi;
    const cellW = W / C, cellH = H / R, maxR = cellW * 0.62;
    const OVER = Math.ceil(LIFT / cellH) + 2; // 아래가 떠오를 때 빈자리 메움
    const out = [];
    for (let r = 0; r < R + OVER; r++) {
      const sr = Math.min(r, R - 1);
      for (let c = 0; c < C; c++) {
        let bn = (g[sr * C + c] - lo) / (hi - lo);
        bn = Math.pow(Math.min(1, Math.max(0, bn)), 1.45);
        const x = (c + 0.5) * cellW, y = (r + 0.5) * cellH;
        out.push({ bx: x, by: y, x, y, baseRad: maxR * (0.08 + bn * 1.05), ph: (c + r) * 0.45 });
      }
    }
    return out;
  }

  // 일러스트: 어두운 프레임 안에 비율 맞춰 담고(contain), 미세 도트 + 은은한 그라데이션
  function buildSilhouette() {
    const gw = cur.cols, gh = cur.rows, g = cur.grid;
    const silAspect = cur.w / cur.h, boxAspect = W / H, pad = 0.86;
    let fitW, fitH;
    if (silAspect > boxAspect) { fitW = W * pad; fitH = fitW / silAspect; }
    else { fitH = H * pad; fitW = fitH * silAspect; }
    const offX = (W - fitW) / 2, offY = (H - fitH) / 2;
    const cols = Math.max(2, Math.round(fitW / SPACING_BIG));
    const rows = Math.max(2, Math.round(fitH / SPACING_BIG));
    const maxR = SPACING_BIG * 0.6;
    const out = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const u = (c + 0.5) / cols, v = (r + 0.5) / rows;
        const gx = Math.min(gw - 1, u * gw - 0.5), gy = Math.min(gh - 1, v * gh - 0.5);
        const x0 = Math.max(0, Math.floor(gx)), y0 = Math.max(0, Math.floor(gy));
        const x1 = Math.min(gw - 1, x0 + 1), y1 = Math.min(gh - 1, y0 + 1);
        const fx = gx - x0, fy = gy - y0;
        const a = g[y0 * gw + x0], b = g[y0 * gw + x1], cc = g[y1 * gw + x0], dd = g[y1 * gw + x1];
        let dens = (a * (1 - fx) + b * fx) * (1 - fy) + (cc * (1 - fx) + dd * fx) * fy;
        if (dens < 0.1) continue;
        const shade = 1 - (0.5 * u + 0.5 * v) * 0.28;
        const edge = Math.min(1, dens / 0.45);
        const jit = 0.82 + Math.random() * 0.3;
        const size = Math.max(0.1, Math.min(1.1, shade * edge * jit));
        const x = offX + (c + 0.5) * (fitW / cols), y = offY + (r + 0.5) * (fitH / rows);
        out.push({ bx: x, by: y, x, y, baseRad: maxR * size, ph: (c + r) * 0.5 });
      }
    }
    return out;
  }

  function build() {
    if (!cur || !visible()) return;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!needRebuild && w === W && h === H) return;
    W = w; H = h; needRebuild = false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = cur.mode === "photo" ? buildPhoto() : buildSilhouette();
    if (!raf) loop();
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!visible()) return;            // 닫혀 있으면 안 그림(절약)
    t += 0.045;
    ctx.clearRect(0, 0, W, H);
    for (let k = 0; k < dots.length; k++) {
      const d = dots[k];
      let tx = d.bx, ty = d.by, grow = 0;
      if (mouse.on) {
        const dx = d.bx - mouse.x, dy = d.by - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < INFLUENCE) {
          let f = 1 - dist / INFLUENCE;
          f = f * f * (3 - 2 * f);                       // 부드러운 감쇠(smoothstep)
          tx = d.bx + Math.sin(t * SWAY_SPEED + d.ph) * f * SWAY;  // 좌우 살랑
          ty = d.by - f * LIFT;                          // 위로 두둥실
          grow = f * 0.5;
        }
      }
      d.x += (tx - d.x) * EASE;
      d.y += (ty - d.y) * EASE;
      const rad = d.baseRad * (1 + grow);
      if (rad < 0.3) continue;
      ctx.beginPath();
      ctx.arc(d.x, d.y, rad, 0, 6.2832);
      ctx.fillStyle = "#f2f2f2";
      ctx.fill();
    }
  }

  canvas.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.on = true;
  });
  canvas.addEventListener("pointerleave", () => { mouse.on = false; });

  // 캔버스 크기가 바뀌면 다시 빌드(열릴 때 크기 확보되는 타이밍 포함)
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => build()).observe(canvas);
  }
  window.__initHalo = build; // (구버전 호환)
})();

// =========================================================
//  목차 호버 하프톤 구름 (6개)
//  - 검정 실루엣 → 도트(밝기/불투명도 기반), 흰/투명 = 도트 없음
//  - 도트 간격 14px, 호버하면 도트들이 위로 두둥실 떠오름
// =========================================================
(function () {
  const DATA = window.CLOUD_HT;
  if (!DATA) return;

  const SPACING = 3.6;      // 도트 간격(px) — 아주 촘촘하게(형태 또렷)
  const TARGET_W = 210;     // 구름 표시 가로 크기(px) — 글씨와 안 겹치게 작게
  const MAXR = SPACING * 0.62; // 도트 최대 반지름(아주 작게)
  const RISE = 28;          // 떠오르기 전 아래로 내려가 있는 거리
  const BOB = 4.5;          // 두둥실 위아래 폭
  const SWAY = 3;           // 살짝 좌우 흔들림
  const SWAY_SPEED = 1.7;   // 흔들림 속도
  const EASE = 0.12;        // 등장/퇴장 부드러움

  const items = [];
  let t = 0, raf = 0;

  function buildDots(it) {
    const d = it.data;
    const W = TARGET_W, H = Math.round(TARGET_W * d.h / d.w);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    it.W = W; it.H = H;
    it.canvas.style.width = W + "px";
    it.canvas.style.height = H + "px";
    it.canvas.width = W * dpr; it.canvas.height = H * dpr;
    it.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.max(2, Math.round(W / SPACING));
    const rows = Math.max(2, Math.round(H / SPACING));
    const gw = d.cols, gh = d.rows;
    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // 셀 중심을 0~1 좌표로 → 선계산 격자에서 이중선형 샘플
        const u = (c + 0.5) / cols, v = (r + 0.5) / rows;
        const gx = Math.min(gw - 1, u * gw - 0.5), gy = Math.min(gh - 1, v * gh - 0.5);
        const x0 = Math.max(0, Math.floor(gx)), y0 = Math.max(0, Math.floor(gy));
        const x1 = Math.min(gw - 1, x0 + 1), y1 = Math.min(gh - 1, y0 + 1);
        const fx = gx - x0, fy = gy - y0;
        const g = it.grid;
        const a = g[y0 * gw + x0], b = g[y0 * gw + x1];
        const cc = g[y1 * gw + x0], dd = g[y1 * gw + x1];
        let dens = (a * (1 - fx) + b * fx) * (1 - fy) + (cc * (1 - fx) + dd * fx) * fy;
        if (dens < 0.1) continue;             // 거의 투명 → 도트 없음

        // ── 도트 크기 (촘촘한 미세 하프톤) ──
        // 형태가 또렷이 읽히도록 내부는 거의 꽉 채우고, 은은한 그라데이션 + 약간의 불균형
        const shade = 1 - (0.5 * u + 0.5 * v) * 0.28;  // 우하단으로 살짝 옅게(입체감)
        const edge = Math.min(1, dens / 0.45);         // 실루엣 경계 도트는 작게
        const jit = 0.82 + Math.random() * 0.3;        // 크기 약간 불균형(유기적)
        let size = shade * edge * jit;
        size = Math.max(0.1, Math.min(1.1, size));

        const x = (c + 0.5) * (W / cols), y = (r + 0.5) * (H / rows);
        dots.push({ x, y, size, ph: (c + r) * 0.5 });
      }
    }
    it.dots = dots;
    it.built = true;
  }

  function draw(it) {
    const ctx = it.ctx, p = it.p;
    ctx.clearRect(0, 0, it.W, it.H);
    if (p <= 0.001) return;
    for (let k = 0; k < it.dots.length; k++) {
      const dt = it.dots[k];
      const rise = (1 - p) * RISE;
      const bob = Math.sin(t * SWAY_SPEED + dt.ph) * BOB * p;
      const sway = Math.cos(t * SWAY_SPEED * 0.8 + dt.ph) * SWAY * p;
      const x = dt.x + sway, y = dt.y + rise + bob;
      const rad = MAXR * dt.size * (0.55 + 0.45 * p);
      if (rad < 0.3) continue;
      ctx.globalAlpha = p;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, 6.2832);
      ctx.fillStyle = "#161616";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    t += 0.04;
    let active = false;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      it.p += (it.target - it.p) * EASE;
      if (it.target > 0 || it.p > 0.001) { draw(it); active = true; }
    }
    raf = active ? requestAnimationFrame(loop) : 0;
  }
  function ensureLoop() { if (!raf) raf = requestAnimationFrame(loop); }

  document.querySelectorAll(".cloud-item").forEach((li) => {
    const canvas = li.querySelector(".hover-cloud");
    if (!canvas) return;
    const d = DATA[canvas.dataset.cloud];
    if (!d) return;
    const bin = atob(d.lum);
    const grid = new Float32Array(d.cols * d.rows);
    for (let i = 0; i < grid.length; i++) grid[i] = bin.charCodeAt(i) / 255;
    const it = { canvas, ctx: canvas.getContext("2d"), data: d, grid, dots: [], W: 0, H: 0, p: 0, target: 0, built: false };
    items.push(it);

    li.addEventListener("pointerenter", () => {
      if (!it.built) buildDots(it);
      it.target = 1; ensureLoop();
    });
    li.addEventListener("pointerleave", () => { it.target = 0; ensureLoop(); });
  });
})();

// =========================================================
//  딥링크 — #cumulus, #cirrus … 로 접속하면 해당 상세 바로 열기
//  (#archive = 뭉게구름)
// =========================================================
(function () {
  const k = location.hash.slice(1);
  const key = k === "archive" ? "cumulus" : k;
  if (details[key]) requestAnimationFrame(() => openArchive(key));
})();
