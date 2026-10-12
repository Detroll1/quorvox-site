import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { links } from '../data/content';

function Logo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 8h8v8H8z" /><path d="M16 16l3 3" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="top">
      <div className="wrap top-in">
        <Link className="logo" to="/"><Logo />quorvox</Link>
        <nav className={'nav' + (open ? ' open' : '')}>
          <NavLink to="/projects">Проекты</NavLink>
          <NavLink to="/journal">Журнал</NavLink>
          <NavLink to="/contact">Контакты</NavLink>
        </nav>
        <div className="top-btns">
          <a className="btn btn-line" href={links.github} target="_blank" rel="noopener">GitHub</a>
          <Link className="btn" to="/contact">Обсудить проект</Link>
        </div>
        <button className="burger" aria-label="Открыть меню" onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-cols">
          <div><span className="mono">Сайт</span><Link to="/">Главная</Link><Link to="/projects">Проекты</Link><Link to="/journal">Журнал</Link><Link to="/contact">Контакты</Link></div>
          <div><span className="mono">Связь</span><a href={links.telegram} target="_blank" rel="noopener">Telegram</a><a href={'mailto:' + links.email}>Почта</a><a href={links.github} target="_blank" rel="noopener">GitHub</a></div>
          <div><span className="mono">© 2026</span><a href={links.telegram} target="_blank" rel="noopener">Quorvox_team</a><span className="mono" style={{ textTransform: 'none' }}>Сделано на React + Vite</span></div>
        </div>
        <div className="word" aria-hidden="true">quorvox</div>
      </div>
    </footer>
  );
}

// Появление блоков при прокрутке и подсветка под курсором — один раз на каждую страницу.
function useEffects(pathname: string) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('js');
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | undefined;
    if (!calm && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io!.unobserve(e.target); }
      }), { rootMargin: '0px 0px -6% 0px' });
      ['.sec-title', '.grid4>*', '.statement', '.folder', '.list', '.rows li', '.team>div', '.stack', '.cta', '.clist li', '.form']
        .forEach((sel) => document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
          el.classList.add('rv');
          el.style.setProperty('--d', Math.min(i, 6) * 0.06 + 's');
          io!.observe(el);
        }));
    }
    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.cell,.team>div,.folder');
      if (!el) return;
      const b = el.getBoundingClientRect();
      const x = ((e.clientX - b.left) / b.width) * 100, y = ((e.clientY - b.top) / b.height) * 100;
      el.style.setProperty('--mx', x + '%'); el.style.setProperty('--my', y + '%');
      if (el.classList.contains('folder')) el.style.setProperty('--at', x + '% ' + y + '%');
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => { io?.disconnect(); document.removeEventListener('mousemove', onMove); };
  }, [pathname]);
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffects(pathname);
  return (
    <>
      <Header />
      <main className="page" key={pathname}><Outlet /></main>
      <Footer />
    </>
  );
}
