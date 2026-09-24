/*
 * gear-intro.js — name intro made of tiny gears and wrenches.
 * 1. parts form a spinning 7-tooth gear in the center
 * 2. the gear explodes into pieces scattered across the screen
 * 3. the pieces collect in the center and spin as a sphere
 * 4. the pieces stream out of the sphere, left to right, into "daniel / akinwale" (Ribeye)
 * 5. the parts settle into solid letters; moving the pointer near them turns
 *    that part of the letters back into gears and wrenches
 *
 * Usage: GearIntro.mount(canvasElement, { first, last, onDone })
 */
(function () {
  "use strict";

  const DEFAULTS = {
    first: "daniel",
    last: "akinwale",
    font: '"Ribeye", Georgia, serif',
    fontLoad: '400 100px "Ribeye"',  // font to wait for before building the name
    stroke: 0,             // extra letter weight as a fraction of font size (0 = as drawn)
    textColor: "#ece8df",
    gear: ["#d64541", "#a8302c", "#ec6a63", "#c23a36"],   // red
    wrench: ["#c7ced6", "#9aa4ae", "#e2e6ea"],            // steel
    wrenchShare: 0.35,
    lastScale: 0.6,        // last name size relative to first name
    suffix: ".com",        // tiny text after the last name; bounces in from the right once the letters are solid
    suffixScale: 0.18,     // suffix size relative to the last name
    suffixColor: "#e0524c", // red, to match the accents
    suffixHop: 1.2,        // bounce height, relative to the last-name size
    leftMargin: 0.04,      // name's left edge, as a fraction of screen width
    sizeScale: 0.5625,     // overall name size multiplier
    onLayout: null,        // called with { x, firstSize, lastSize, bottom } after each layout
    onDone: null
  };

  // timeline (seconds)
  const T_SPIN = 1.7;       // gear forms and spins up
  const T_EXPLODE = T_SPIN + 0.9;   // gear blows apart out to the screen edges
  const HOLD = 0.2;                  // pieces hang at the edges for a moment
  const T_GATHER = T_EXPLODE + HOLD + 0.8;  // pieces pull into a sphere in the center
  const T_BURST = T_GATHER + 1.0;    // sphere spins, then pieces stream into the name
  const T_SOLID = T_BURST + 1.75;    // parts fade into solid letters
  const SPHERE_W = 2.6;              // sphere spin speed (rad/s)
  const SOLID_FADE = 0.6;
  const SUFFIX_DUR = 1.3;   // .com bounce from the right edge to its spot
  const W_MAX = 6.5;        // gear spin speed at end of spin-up (rad/s)

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[(Math.random() * arr.length) | 0];
  const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
  const easeOutBack = (x) => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const smooth = (x) => x * x * (3 - 2 * x);
  const flip = (m) => smooth(clamp01((m - 0.25) / 0.3)); // quick solid <-> parts switch

  // ---------- sprites ----------
  const SPR = 64;
  function gearSprite(color, teeth) {
    const c = document.createElement("canvas"); c.width = c.height = SPR;
    const g = c.getContext("2d"), r = SPR / 2;
    g.translate(r, r); g.fillStyle = color; g.beginPath();
    const n = teeth * 4, ro = r * 0.96, ri = r * 0.76;
    for (let k = 0; k <= n; k++) {
      const a = (k / n) * Math.PI * 2 + Math.PI / n, rad = (k % 4 < 2) ? ro : ri;
      k ? g.lineTo(Math.cos(a) * rad, Math.sin(a) * rad) : g.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
    }
    g.fill();
    g.globalCompositeOperation = "destination-out";
    g.beginPath(); g.arc(0, 0, r * 0.28, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + Math.PI / 4;
      g.beginPath(); g.arc(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5, r * 0.1, 0, Math.PI * 2); g.fill();
    }
    return c;
  }
  function wrenchSprite(color) {
    const c = document.createElement("canvas"); c.width = c.height = SPR;
    const g = c.getContext("2d"), r = SPR / 2, hw = r * 0.13;
    g.translate(r, r); g.fillStyle = color;
    g.beginPath();
    if (g.roundRect) g.roundRect(-r * 0.62, -hw, r * 1.2, hw * 2, hw); else g.rect(-r * 0.62, -hw, r * 1.2, hw * 2);
    g.fill();
    g.beginPath(); g.arc(r * 0.6, 0, r * 0.34, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(-r * 0.68, 0, r * 0.24, 0, Math.PI * 2); g.fill();
    g.globalCompositeOperation = "destination-out";
    g.fillRect(r * 0.62, -r * 0.13, r * 0.5, r * 0.26);
    g.beginPath(); g.arc(-r * 0.68, 0, r * 0.12, 0, Math.PI * 2); g.fill();
    return c;
  }

  function mount(canvas, options) {
    const O = Object.assign({}, DEFAULTS, options || {});
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = { gear: O.gear.map((c, i) => gearSprite(c, [8, 10, 12, 9][i % 4])), wrench: O.wrench.map(wrenchSprite) };
    const textLayer = document.createElement("canvas");
    const holeLayer = document.createElement("canvas");
    const solidLayer = document.createElement("canvas");
    const tctx = textLayer.getContext("2d"), hctx = holeLayer.getContext("2d"), sctx = solidLayer.getContext("2d");

    let W, H, DPR, cx, cy, fs, gap, hoverR, gearR = 100, pieceScale = 1, parts = [];
    let t0 = 0, last = 0, skip = false, doneFired = false, maxMech = 0;
    const mouse = { x: -1e5, y: -1e5 };

    let strokeK = 0;

    // which: "first", "last" or undefined for both
    function drawName(g, scale, color, which) {
      g.save(); g.scale(scale, scale);
      g.textBaseline = "alphabetic"; g.textAlign = "left";
      g.fillStyle = g.strokeStyle = color; g.lineJoin = "round";
      if (which !== "last") {
        g.font = `400 ${fs}px ${O.font}`; g.lineWidth = fs * strokeK;
        g.fillText(O.first, nameX, base1); g.strokeText(O.first, nameX, base1);
      }
      if (which !== "first") {
        g.font = `400 ${fs2}px ${O.font}`; g.lineWidth = fs2 * strokeK;
        g.fillText(O.last, nameX, base2); g.strokeText(O.last, nameX, base2);
        if (!which && O.suffix) {
          sufX = nameX + g.measureText(O.last).width + fs2 * 0.03;
          sufSize = Math.max(7, fs2 * O.suffixScale);
          g.font = `400 ${sufSize}px ${O.font}`; sufW = g.measureText(O.suffix).width;
        }
      }
      g.restore();
    }
    let nameX = 0, base1 = 0, base2 = 0, fs2 = 0, gap2 = 0, sufX = 0, sufSize = 0, sufW = 0;

    function samplePoints(drawFn, step) {
      const o = document.createElement("canvas"); o.width = W; o.height = H;
      const g = o.getContext("2d", { willReadFrequently: true });
      drawFn(g);
      const d = g.getImageData(0, 0, W, H).data, pts = [];
      let row = 0;
      for (let y = step / 2; y < H; y += step, row++) {
        for (let x = (row % 2) * step / 2; x < W; x += step) {
          if (d[((y | 0) * W + (x | 0)) * 4 + 3] > 120) pts.push([x, y]);
        }
      }
      return pts;
    }

    // 7 trapezoid teeth, a rim, 5 spokes and a hub
    function drawGear(g, R) {
      g.save(); g.translate(cx, cy); g.fillStyle = "#000";
      const teeth = 7, rb = R * 0.7, pitch = (Math.PI * 2) / teeth;
      const baseHalf = pitch * 0.33, tipHalf = pitch * 0.14;
      g.beginPath();
      for (let i = 0; i < teeth; i++) {
        const c = i * pitch - Math.PI / 2;
        const p0 = c - baseHalf, p1 = c - tipHalf, p2 = c + tipHalf, p3 = c + baseHalf;
        if (i === 0) g.moveTo(Math.cos(p0) * rb, Math.sin(p0) * rb);
        g.lineTo(Math.cos(p1) * R, Math.sin(p1) * R);
        g.lineTo(Math.cos(p2) * R, Math.sin(p2) * R);   // flat tip
        g.lineTo(Math.cos(p3) * rb, Math.sin(p3) * rb);
        g.arc(0, 0, rb, p3, c + pitch - baseHalf);
      }
      g.closePath(); g.fill();
      // open the web, leaving a rim, 5 spokes and a hub
      g.globalCompositeOperation = "destination-out";
      g.beginPath(); g.arc(0, 0, R * 0.5, 0, Math.PI * 2); g.fill();
      g.globalCompositeOperation = "source-over";
      for (let i = 0; i < 5; i++) {
        g.save(); g.rotate(i * Math.PI * 2 / 5 - Math.PI / 2);
        g.fillRect(0, -R * 0.07, R * 0.54, R * 0.14);
        g.restore();
      }
      g.beginPath(); g.arc(0, 0, R * 0.24, 0, Math.PI * 2); g.fill();
      g.globalCompositeOperation = "destination-out";
      g.beginPath(); g.arc(0, 0, R * 0.1, 0, Math.PI * 2); g.fill();
      g.restore();
    }

    function layout(replay) {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width)); H = Math.max(1, Math.round(rect.height));
      for (const c of [canvas, textLayer, holeLayer, solidLayer]) { c.width = W * DPR; c.height = H * DPR; }
      strokeK = O.stroke;

      // name layout: two left-aligned lines, block centered
      // first name large, last name smaller underneath, both left-aligned; block centered
      const m = document.createElement("canvas").getContext("2d");
      m.font = `400 100px ${O.font}`;
      const w1 = m.measureText(O.first).width / 100, w2 = m.measureText(O.last).width / 100 * O.lastScale;
      const asc1 = m.measureText(O.first).actualBoundingBoxAscent / 100;
      const asc2 = m.measureText(O.last).actualBoundingBoxAscent / 100;
      const lineGap = 0.28;
      const hEm = asc1 + lineGap + O.lastScale * asc2;   // top of first line to baseline of second
      fs = O.sizeScale * Math.min((W * (W < 700 ? 0.88 : 0.7)) / Math.max(w1, w2), (H * 0.55) / hEm);
      fs2 = fs * O.lastScale;
      nameX = Math.max(12, W * O.leftMargin);
      cx = W / 2; cy = H * 0.46;
      base1 = cy - (hEm * fs) / 2 + fs * asc1;
      base2 = base1 + fs * lineGap + fs2 * asc2;

      const DENSITY = 1.2;   // more pieces per letter (1 = original)
      gap = Math.max(2.7, fs / 26 / Math.sqrt(DENSITY));
      gap2 = Math.max(2.3, fs2 / 22 / Math.sqrt(DENSITY));
      pieceScale = Math.sqrt(DENSITY);
      hoverR = Math.max(60, fs * 0.5);

      const textPts = [
        ...samplePoints((g) => drawName(g, 1, "#000", "first"), gap).map((q) => [q[0], q[1], gap]),
        ...samplePoints((g) => drawName(g, 1, "#000", "last"), gap2).map((q) => [q[0], q[1], gap2])
      ];
      const N = textPts.length;

      // gear points, spaced so the gear uses about the same number of parts
      const Rg = Math.min(W, H) * 0.24;
      const fine = samplePoints((g) => drawGear(g, Rg), 2);
      const gGap = Math.max(2.5, Math.sqrt((fine.length * 4) / N));
      let gearPts = samplePoints((g) => drawGear(g, Rg), gGap);
      gearPts.sort(() => Math.random() - 0.5);
      while (gearPts.length < N) { const q = pick(gearPts); gearPts.push([q[0] + rand(-1, 1), q[1] + rand(-1, 1)]); }
      gearPts.length = N;

      gearR = Rg;
      const edge = 8;   // keep pieces just inside the screen border
      const nameW = Math.max(1, Math.max(...textPts.map((q) => q[0])) - nameX);
      parts = textPts.map(([tx, ty, pg], i) => {
        const [gx, gy] = gearPts[i];
        const isWrench = Math.random() < O.wrenchShare;
        const r0 = Math.hypot(gx - cx, gy - cy), a0 = Math.atan2(gy - cy, gx - cx);
        return {
          type: isWrench ? "wrench" : "gear",
          spr: pick(isWrench ? sprites.wrench : sprites.gear),
          tx, ty, r0, a0,
          appear: (r0 / Rg) * 0.45 + rand(0, 0.15),
          sizeG: (isWrench ? 1.6 : 1.25) * gGap * rand(0.95, 1.15),
          sizeT: (isWrench ? 1.7 : 1.3) * pg * pieceScale * rand(0.95, 1.15), pg,
          // scattered spot after the explosion
          // flies straight out from its spot on the gear, most pieces ending near the screen border
          ...(() => {
            const a = a0 + SPIN_END + rand(-0.6, 0.6), dx = Math.cos(a), dy = Math.sin(a);
            const tx = dx > 0 ? (W - edge - cx) / dx : dx < 0 ? (edge - cx) / dx : Infinity;
            const ty = dy > 0 ? (H - edge - cy) / dy : dy < 0 ? (edge - cy) / dy : Infinity;
            const f = Math.sqrt(Math.random());   // even coverage from the center out to the edges
            return { ex: cx + dx * Math.min(tx, ty) * f, ey: cy + dy * Math.min(tx, ty) * f };
          })(),
          // spot on the sphere (unit vector, mostly near the surface)
          ...(() => {
            const z = rand(-1, 1), th = rand(0, Math.PI * 2), q = Math.sqrt(1 - z * z), rf = rand(0.82, 1);
            return { ux: q * Math.cos(th) * rf, uy: q * Math.sin(th) * rf, uz: z * rf };
          })(),
          // stream into the name left to right (last name slightly after)
          delay: ((tx - nameX) / nameW) * 0.6 + (pg === gap ? 0 : 0.12) + rand(0, 0.1),
          dur: rand(0.85, 1.1),
          tumble: rand(-5, 5),
          curl: rand(-0.18, 0.18),
          spinC: rand(-14, 14),
          rest: isWrench ? pick([-0.785, 0.785, 2.356, -2.356]) + rand(-0.25, 0.25) : rand(0, 6.28),
          idle: (Math.random() < 0.5 ? -1 : 1) * rand(2, 4),
          mech: 0, spin: 0
        };
      });

      tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, textLayer.width, textLayer.height);
      drawName(tctx, DPR, O.textColor);
      hctx.setTransform(1, 0, 0, 1, 0, 0); hctx.clearRect(0, 0, holeLayer.width, holeLayer.height);

      O.onLayout && O.onLayout({ x: nameX, firstSize: fs, lastSize: fs2, bottom: base2 });
      if (replay) { skip = false; doneFired = false; t0 = performance.now(); }
      if (reduce) skip = true;
    }

    // gear spin angle during spin-up (integral of a ramping angular speed)
    const spinAngle = (t) => 0.8 * t + (W_MAX - 0.8) * t * t * t / (3 * T_SPIN * T_SPIN);
    const SPIN_END = spinAngle(T_SPIN);

    // sphere position of a part at time t: [x, y, depth 0..1]
    function spherePos(p, t) {
      const R = Math.min(W, H) * 0.17;
      const ph = SPHERE_W * (t - T_EXPLODE), c = Math.cos(ph), s = Math.sin(ph);
      const x1 = p.ux * c + p.uz * s, z1 = -p.ux * s + p.uz * c;          // spin about the vertical axis
      const tilt = 0.35, ct = Math.cos(tilt), st = Math.sin(tilt);
      const y2 = p.uy * ct - z1 * st, z2 = p.uy * st + z1 * ct;          // tilt toward the viewer
      return [cx + x1 * R, cy + y2 * R, (z2 + 1) / 2];
    }

    // where a part is between the gear and its letter (t >= T_SPIN): [x, y, rot, depth]
    function midPos(p, t) {
      const tum = p.rest + p.tumble * (t - T_SPIN);
      if (t < T_EXPLODE) {
        const gx = cx + Math.cos(p.a0 + SPIN_END) * p.r0, gy = cy + Math.sin(p.a0 + SPIN_END) * p.r0;
        const e = easeOutQuart(clamp01((t - T_SPIN) / (T_EXPLODE - T_SPIN)));
        return [gx + (p.ex - gx) * e, gy + (p.ey - gy) * e, tum, 1];
      }
      const sp = spherePos(p, t);
      if (t < T_GATHER) {
        const v = clamp01((t - T_EXPLODE - HOLD) / (T_GATHER - T_EXPLODE - HOLD));
        const e = v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;   // ease in-out
        return [p.ex + (sp[0] - p.ex) * e, p.ey + (sp[1] - p.ey) * e, tum, 1 + (sp[2] - 1) * e];
      }
      return [sp[0], sp[1], tum, sp[2]];
    }

    function frame(now) {
      if (canvas.getBoundingClientRect().bottom <= 0) { last = now; raf = requestAnimationFrame(frame); return; }
      const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
      const t = skip ? 99 : (now - t0) / 1000;
      if (t > T_SOLID + SOLID_FADE && !doneFired) { doneFired = true; O.onDone && O.onDone(); }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const solidA = smooth(clamp01((t - T_SOLID) / SOLID_FADE));
      const settled = t >= T_SOLID;
      const decay = Math.exp(-dt * 1.6);
      maxMech = 0;

      for (const p of parts) {
        let x, y, rot, size, alpha = 1;
        if (t < T_SPIN) {
          const th = spinAngle(t), k = clamp01((t - p.appear) / 0.3);
          if (k <= 0) continue;
          x = cx + Math.cos(p.a0 + th) * p.r0; y = cy + Math.sin(p.a0 + th) * p.r0;
          rot = p.rest + th; size = p.sizeG * easeOutBack(k); alpha = k;
        } else if (t < T_BURST + p.delay) {
          const m = midPos(p, t), shade = 0.7 + 0.3 * m[3];
          x = m[0]; y = m[1]; rot = m[2]; size = p.sizeG * (0.75 + 0.4 * m[3]); alpha = shade;
        } else {
          const launch = T_BURST + p.delay, s = midPos(p, launch);
          const v = clamp01((t - launch) / p.dur), e = easeOutQuart(v);
          const dx = p.tx - s[0], dy = p.ty - s[1];
          const bend = p.curl * Math.sin(Math.PI * e);
          x = s[0] + dx * e - dy * bend; y = s[1] + dy * e + dx * bend;
          rot = p.rest + (s[2] - p.rest) * (1 - e); size = p.sizeG + (p.sizeT - p.sizeG) * e;

          if (settled) {
            // hover: parts near the pointer come back out of the solid letters
            const mx = p.tx - mouse.x, my = p.ty - mouse.y, d = Math.hypot(mx, my);
            const near = d < hoverR ? smooth(clamp01((hoverR - d) / (hoverR * 0.6))) : 0;
            p.mech = Math.max(near, p.mech * decay);
            if (p.mech > 0.002) {
              p.spin += p.idle * dt * p.mech;
              const push = p.mech * p.pg * 0.3 / (d || 1);
              x += mx * push; y += my * push;
            }
            rot += p.spin;
            if (p.mech > maxMech) maxMech = p.mech;
          }
          alpha = Math.max(1 - solidA, flip(p.mech));
          size *= 1 + 0.15 * flip(p.mech);
        }
        if (alpha <= 0.01) continue;
        const c = Math.cos(rot) * size * DPR, sn = Math.sin(rot) * size * DPR;
        ctx.globalAlpha = alpha;
        ctx.setTransform(c, sn, -sn, c, x * DPR, y * DPR);
        ctx.drawImage(p.spr, -0.5, -0.5, 1, 1);
      }
      ctx.globalAlpha = 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (solidA > 0) {
        ctx.globalAlpha = solidA;
        if (maxMech > 0.02) {
          // cut the solid letters away exactly where parts are showing
          hctx.setTransform(DPR, 0, 0, DPR, 0, 0);
          hctx.clearRect(0, 0, W, H);
          hctx.fillStyle = "#000";
          for (const p of parts) {
            const a = flip(p.mech);
            if (a <= 0.01) continue;
            hctx.globalAlpha = a;
            hctx.beginPath(); hctx.arc(p.tx, p.ty, p.pg * 1.05, 0, Math.PI * 2); hctx.fill();
          }
          hctx.globalAlpha = 1;
          sctx.globalCompositeOperation = "copy"; sctx.drawImage(textLayer, 0, 0);
          sctx.globalCompositeOperation = "destination-out"; sctx.drawImage(holeLayer, 0, 0);
          ctx.drawImage(solidLayer, 0, 0);
        } else {
          ctx.drawImage(textLayer, 0, 0);
        }
        ctx.globalAlpha = 1;
      }

      // ".com" hops in from beyond the right edge once the letters are solid
      const ts = t - (T_SOLID + SOLID_FADE);
      if (O.suffix && ts > 0) {
        const u = Math.min(1, ts / SUFFIX_DUR);
        const startX = W + 4;
        const x = startX + (sufX - startX) * (1 - Math.pow(1 - u, 2));
        const hop = Math.abs(Math.sin(Math.PI * 4 * u)) * fs2 * O.suffixHop * Math.pow(1 - u, 1.4);   // 4 shrinking hops
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        ctx.font = `400 ${sufSize}px ${O.font}`;
        ctx.textBaseline = "alphabetic"; ctx.textAlign = "left";
        ctx.fillStyle = O.suffixColor;
        ctx.fillText(O.suffix, x, base2 - hop);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      raf = requestAnimationFrame(frame);
    }

    const setMouse = (x, y) => { const r = canvas.getBoundingClientRect(); mouse.x = x - r.left; mouse.y = y - r.top; };
    const clearMouse = () => { mouse.x = mouse.y = -1e5; };
    const onMove = (e) => setMouse(e.clientX, e.clientY);
    const onTouch = (e) => { const tt = e.touches[0]; if (tt) setMouse(tt.clientX, tt.clientY); };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", clearMouse);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", clearMouse);
    let rt;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => layout(false), 200); };
    window.addEventListener("resize", onResize);

    let raf;
    const ready = document.fonts
      ? Promise.race([document.fonts.load(O.fontLoad).catch(() => {}), new Promise((r) => setTimeout(r, 3000))])
      : Promise.resolve();
    ready.then(() => { layout(true); raf = requestAnimationFrame(frame); });

    return {
      replay() { layout(true); },
      destroy() {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
      }
    };
  }

  window.GearIntro = { mount };
})();
