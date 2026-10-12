import { useEffect, useRef } from 'react';

// Живая сеть: сетка точек, узлы, лучи растут и перестраиваются, по лучам бегут импульсы,
// у концов лучей всплывают подписи, точки вокруг курсора подсвечиваются, узлы обмениваются сигналами.

const STEP = 30;
const LABELS = ['bot.reply()', 'parse(url)', 'GET /menu', 'deploy ok', 'ws.connect', 'POST /order', 'render()', 'cache hit'];

type Hub = { c: number; r: number };
type Ray = { hub: Hub; c: number; r: number; grow: number; dying: boolean; flash: number; label?: string };
type Pulse = { ray?: Ray; from?: Hub; to?: Hub; k: number; v: number };

export default function Net() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, cols = 0, rows = 0, raf = 0, running = false;
    let hubs: Hub[] = [], rays: Ray[] = [], pulses: Pulse[] = [];
    const mouse = { x: -999, y: -999, px: 0, py: 0 };

    const xy = (c: number, r: number) => [c * STEP + 0.5, r * STEP + 0.5];

    function newRay(hub: Hub): Ray | null {
      for (let tries = 0; tries < 12; tries++) {
        const a = Math.random() * Math.PI * 2, len = 3 + Math.floor(Math.random() * 6);
        const c = hub.c + Math.round(Math.cos(a) * len), r = hub.r + Math.round(Math.sin(a) * len);
        if (c < 1 || r < 1 || c >= cols - 1 || r >= rows - 1) continue;
        if (rays.some((x) => x.c === c && x.r === r)) continue;
        // подпись только если рядом нет другой подписи и их не больше четырёх
        const labeled = rays.filter((x) => x.label && !x.dying);
        const roomy = labeled.length < 4 && labeled.every((x) => Math.abs(x.c - c) > 5 || Math.abs(x.r - r) > 2);
        const free = LABELS.filter((l) => !rays.some((x) => x.label === l));
        return { hub, c, r, grow: 0, dying: false, flash: 0, label: roomy && Math.random() < 0.5 && free.length ? free[Math.floor(Math.random() * free.length)] : undefined };
      }
      return null;
    }

    function build() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / STEP) + 1; rows = Math.ceil(H / STEP) + 1;
      const narrow = W < 700;
      hubs = narrow
        ? [{ c: Math.round(cols * 0.7), r: Math.round(rows * 0.2) }]
        : [{ c: Math.round(cols * 0.55), r: Math.round(rows * 0.33) }, { c: Math.round(cols * 0.8), r: Math.round(rows * 0.2) }];
      rays = []; pulses = [];
      hubs.forEach((h) => { for (let i = 0; i < (narrow ? 8 : 11); i++) { const r = newRay(h); if (r) { r.grow = 1; rays.push(r); } } });
    }

    let lastRewire = 0;
    function step(t: number) {
      // мягко догоняем курсор, чтобы движение было плавным
      const tx = mouse.x < 0 ? 0 : mouse.x / Math.max(W, 1) - 0.5, ty = mouse.y < 0 ? 0 : mouse.y / Math.max(H, 1) - 0.5;
      mouse.px += (tx - mouse.px) * 0.05;
      mouse.py += (ty - mouse.py) * 0.05;

      // раз в пару секунд один луч гаснет, на его месте вырастает новый
      if (t - lastRewire > 1800 && rays.length) {
        lastRewire = t;
        const alive = rays.filter((r) => !r.dying);
        alive[Math.floor(Math.random() * alive.length)].dying = true;
        const hub = hubs[Math.floor(Math.random() * hubs.length)];
        const r = newRay(hub); if (r) rays.push(r);
      }
      rays.forEach((r) => { r.grow += r.dying ? -0.03 : (1 - r.grow) * 0.06; r.flash *= 0.94; });
      rays = rays.filter((r) => !(r.dying && r.grow <= 0));

      if (Math.random() < 0.08) {
        const live = rays.filter((r) => r.grow > 0.95);
        if (live.length) pulses.push({ ray: live[Math.floor(Math.random() * live.length)], k: 0, v: 0.01 + Math.random() * 0.012 });
      }
      if (hubs.length > 1 && Math.random() < 0.02) {
        const back = Math.random() < 0.5;
        pulses.push({ from: hubs[back ? 1 : 0], to: hubs[back ? 0 : 1], k: 0, v: 0.006 });
      }
      pulses = pulses.filter((p) => {
        p.k += p.v;
        if (p.k >= 1 && p.ray) p.ray.flash = 1;
        return p.k < 1;
      });
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);
      const ox = mouse.px * 14, oy = mouse.py * 14;

      // точки: ярче возле узлов и вокруг курсора
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
        let near = 0;
        for (const h of hubs) near = Math.max(near, 1 - Math.hypot(c - h.c, r - h.r) / 9);
        const [x, y] = xy(c, r);
        const md = Math.hypot(x - mouse.x, y - mouse.y);
        const lit = md < 150 ? 1 - md / 150 : 0;
        const a = 0.07 + Math.max(near, 0) * 0.3 + lit * 0.5;
        const s = 2 + (near > 0.45 ? 1 : 0) + lit * 2;
        ctx.fillStyle = 'rgba(244,244,245,' + a + ')';
        ctx.fillRect(x - s / 2 + ox * near, y - s / 2 + oy * near, s, s);
      }

      // связь между узлами
      if (hubs.length > 1) {
        const [x1, y1] = xy(hubs[0].c, hubs[0].r), [x2, y2] = xy(hubs[1].c, hubs[1].r);
        ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(244,244,245,.14)';
        ctx.beginPath(); ctx.moveTo(x1 + ox, y1 + oy); ctx.lineTo(x2 + ox, y2 + oy); ctx.stroke();
        ctx.setLineDash([]);
      }

      // лучи, их концы и подписи
      ctx.font = '11px ui-monospace, Consolas, monospace';
      for (const ray of rays) {
        const [x1, y1] = xy(ray.hub.c, ray.hub.r), [x2, y2] = xy(ray.c, ray.r);
        const ex = x1 + (x2 - x1) * ray.grow + ox * 0.6, ey = y1 + (y2 - y1) * ray.grow + oy * 0.6;
        ctx.strokeStyle = 'rgba(244,244,245,' + (0.16 + ray.flash * 0.3) * ray.grow + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x1 + ox, y1 + oy); ctx.lineTo(ex, ey); ctx.stroke();
        const s = 6 + ray.flash * 4;
        ctx.fillStyle = 'rgba(244,244,245,' + (0.5 + ray.flash * 0.5) * ray.grow + ')';
        ctx.fillRect(ex - s / 2, ey - s / 2, s, s);
        if (ray.label && ray.grow > 0.9) {
          ctx.fillStyle = 'rgba(160,160,170,' + (0.35 + ray.flash * 0.65) * ray.grow + ')';
          ctx.fillText(ray.label, ex + 10, ey + 4);
        }
      }

      // импульсы
      for (const p of pulses) {
        let x: number, y: number;
        if (p.ray) {
          const [x1, y1] = xy(p.ray.hub.c, p.ray.hub.r), [x2, y2] = xy(p.ray.c, p.ray.r);
          x = x1 + (x2 - x1) * p.k + ox * (1 - p.k * 0.4); y = y1 + (y2 - y1) * p.k + oy * (1 - p.k * 0.4);
        } else {
          const [x1, y1] = xy(p.from!.c, p.from!.r), [x2, y2] = xy(p.to!.c, p.to!.r);
          x = x1 + (x2 - x1) * p.k + ox; y = y1 + (y2 - y1) * p.k + oy;
        }
        ctx.fillStyle = 'rgba(255,255,255,' + (p.ray ? 1 - p.k * 0.6 : 0.9) + ')';
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }

      // узлы: дышат, рамка вращается
      hubs.forEach((h, i) => {
        const [x, y] = xy(h.c, h.r);
        const s = 12 + Math.sin(t / 700 + i) * 1.5;
        ctx.fillStyle = '#f4f4f5';
        ctx.fillRect(x - s / 2 + ox, y - s / 2 + oy, s, s);
        ctx.save();
        ctx.translate(x + ox, y + oy); ctx.rotate(t / 4000 + i);
        ctx.strokeStyle = 'rgba(244,244,245,.3)';
        ctx.strokeRect(-s, -s, s * 2, s * 2);
        ctx.restore();
      });
    }

    function loop(t: number) { if (!running) return; step(t); draw(t); raf = requestAnimationFrame(loop); }
    function start() { if (!running && !calm) { running = true; raf = requestAnimationFrame(loop); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    const onResize = () => { build(); draw(0); };
    const onMove = (e: MouseEvent) => { const b = canvas.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    const onVis = () => (document.hidden ? stop() : start());

    build(); draw(0);
    addEventListener('resize', onResize);
    addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    const io = new IntersectionObserver((e) => (e[0].isIntersecting ? start() : stop()));
    io.observe(canvas);

    return () => {
      stop(); io.disconnect();
      removeEventListener('resize', onResize);
      removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas className="net" ref={ref} aria-hidden="true" />;
}
