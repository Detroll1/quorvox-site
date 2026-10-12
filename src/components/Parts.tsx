import { useEffect, useState, type CSSProperties } from 'react';
import type { Entry, Project } from '../data/content';

export function Folder({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="dots" />
      <div className="folder-txt"><span className="mono">{p.kind}</span><h3>{p.name}</h3></div>
    </>
  );
  const style = { '--at': p.at } as CSSProperties;
  return p.url
    ? <a className="folder" style={style} href={p.url} target="_blank" rel="noopener">{inner}</a>
    : <div className="folder" style={style}>{inner}</div>;
}

export function EntryRow({ e }: { e: Entry }) {
  return (
    <li>
      <a className="row" href={e.url} target="_blank" rel="noopener">
        <b>{e.title}</b><time>{e.date}</time>
        {e.text && <p>{e.text}</p>}
      </a>
    </li>
  );
}

export function ProjectRow({ p }: { p: Project }) {
  const body = (
    <>
      <b>{p.name}</b><span className="tag">{p.tag}</span>
      <p>{p.text}</p>
      {p.chips && <span className="chips">{p.chips.map((c) => <span key={c}>{c}</span>)}</span>}
    </>
  );
  return <li>{p.url ? <a className="row" href={p.url} target="_blank" rel="noopener">{body}</a> : <div className="row">{body}</div>}</li>;
}

// Заголовок по словам: каждое слово выплывает с небольшой задержкой.
export function Words({ text }: { text: string }) {
  return <>{text.split(' ').map((w, i) => <span className="w" style={{ '--i': i } as CSSProperties} key={i}>{w}{' '}</span>)}</>;
}

// Лента «запросов» на первом экране: новые строки появляются снизу, старые уходят.
const REQS: [string, string][] = [
  ['POST /order', '201'], ['bot.reply()', '84ms'], ['GET /menu', '200'], ['parse(url)', '312 строк'],
  ['ws.connect', 'ok'], ['deploy', 'ok'], ['GET /journal', '200'], ['render()', '16ms']
];

export function RequestLog() {
  const [rows, setRows] = useState<number[]>([0, 1, 2]);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let n = 3;
    const id = setInterval(() => setRows((r) => [...r.slice(-3), n++]), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="log" aria-hidden="true">
      {rows.map((n) => {
        const [what, res] = REQS[n % REQS.length];
        return <div key={n}><b>→ {what}</b><span className={/^\d{3}$|ok/.test(res) ? 'ok' : ''}>{res}</span></div>;
      })}
    </div>
  );
}
