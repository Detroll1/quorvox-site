import { Link } from 'react-router-dom';
import Net from '../components/Net';
import { EntryRow, Folder, RequestLog, Words } from '../components/Parts';
import { journal, links, projects, services, stack, team } from '../data/content';

export default function Home() {
  return (
    <>
      <section className="hero">
        <Net />
        <div className="wrap hero-in">
          <RequestLog />
          <span className="status mono"><i />Принимаем заказы</span>
          <h1><Words text="Сайты, боты и веб‑сервисы под ключ" /></h1>
          <div className="hero-row">
            <p>Quorvox — небольшая команда из Североморска. Делаем лендинги за сутки, Telegram-ботов, Android-приложения и сервисы с бэкендом. Работаем удалённо.</p>
            <div className="btns">
              <Link className="btn" to="/contact">Обсудить проект</Link>
              <Link className="btn btn-line" to="/projects">Смотреть проекты</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap strip">
        {projects.slice(0, 5).map((p) => <span key={p.name}>{p.name}</span>)}
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-title"><h2>Что можно заказать</h2></div>
          <div className="grid4">
            {services.map((s) => (
              <div className="cell" key={s.tag}><span className="mono">{s.tag}</span><b>{s.title}</b><p>{s.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <div className="hatch" />

      <section className="sec">
        <div className="wrap">
          <p className="statement">Делаем проекты разной сложности, <mark>от&nbsp;лендинга до&nbsp;сервиса</mark>, и&nbsp;берём заказы на&nbsp;разработку.</p>
          <p>Код пишем сами и используем ИИ-инструменты там, где они ускоряют работу без потери качества.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-title"><h2>Проекты</h2><Link to="/projects">Все проекты →</Link></div>
          <div className="folders">{projects.filter((p) => p.featured).map((p) => <Folder p={p} key={p.name} />)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-title"><h2>Журнал</h2><Link to="/journal">Все записи →</Link></div>
          <ul className="rows">{journal.slice(0, 4).map((e) => <EntryRow e={e} key={e.url + e.title} />)}</ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-title"><h2>Команда</h2></div>
          <div className="team">
            {team.map((m) => (
              <div key={m.name}><span className="ava">{m.letter}</span><b>{m.name}</b><span className="mono">{m.role}</span><p>{m.text}</p></div>
            ))}
          </div>
          <div className="stack">{stack.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap cta">
          <h2>Есть задача? Обсудим.</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a className="btn" href={links.telegram} target="_blank" rel="noopener">Написать в Telegram</a>
            <Link className="btn btn-line" to="/contact">Оставить заявку</Link>
          </div>
        </div>
      </section>
    </>
  );
}
