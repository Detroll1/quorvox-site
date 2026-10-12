import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { EntryRow, Folder, ProjectRow } from '../components/Parts';
import { journal, journalCats, links, projectGroups, projects } from '../data/content';

function PageHead({ tag, title, children }: { tag: string; title: string; children: ReactNode }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <span className="mono">{tag}</span>
        <h1 style={{ marginTop: 14 }}>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <>
      <PageHead tag="Проекты" title="Что мы уже сделали">Боты, приложения, веб-сервисы и сайты. Часть проектов живые, их можно открыть и попробовать.</PageHead>
      <section className="sec">
        <div className="wrap">
          <div className="folders">{projects.filter((p) => p.featured).map((p) => <Folder p={p} key={p.name} />)}</div>
          <div style={{ marginTop: 72 }}>
            {projectGroups.map((g) => (
              <div className="list" key={g}>
                <h2>{g}</h2>
                <ul className="rows">{projects.filter((p) => p.group === g).map((p) => <ProjectRow p={p} key={p.name} />)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap cta"><h2>Нужен похожий проект?</h2><Link className="btn" to="/contact">Обсудить</Link></div>
      </section>
    </>
  );
}

export function Journal() {
  return (
    <>
      <PageHead tag="Журнал" title="Релизы и обновления">
        Что выпустили и что поменяли. Подробности и обсуждение — в нашем <a href={links.telegram} target="_blank" rel="noopener">Telegram-канале</a>.
      </PageHead>
      <section className="sec">
        <div className="wrap">
          {journalCats.map((c) => (
            <div className="list" key={c}>
              <h2>{c}</h2>
              <ul className="rows">{journal.filter((e) => e.cat === c).map((e) => <EntryRow e={e} key={e.url + e.title} />)}</ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Contact() {
  return (
    <>
      <PageHead tag="Контакты" title="Обсудим ваш проект">Опишите задачу в паре строк. В ответ напишем, можно ли её сделать, сколько займёт и сколько будет стоить.</PageHead>
      <section className="sec">
        <div className="wrap contact">
          <ul className="clist">
            <li><span className="mono">Telegram</span><a href={links.telegram} target="_blank" rel="noopener">@Quorvox_team</a></li>
            <li><span className="mono">Почта</span><a href={'mailto:' + links.email}>{links.email}</a></li>
            <li><span className="mono">GitHub</span><a href={links.github} target="_blank" rel="noopener">github.com/Quorvox</a></li>
            <li><span className="mono">Город</span><span>Североморск, работаем удалённо</span></li>
          </ul>
          <form className="form" action={'https://formsubmit.co/' + links.email} method="POST">
            <input type="hidden" name="_subject" value="Заявка с сайта Quorvox" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" className="hp" tabIndex={-1} autoComplete="off" />
            <label>Как к вам обращаться<input name="name" required autoComplete="name" /></label>
            <label>Telegram или почта для ответа<input name="contact" required /></label>
            <label>Что нужно сделать<textarea name="task" rows={5} required placeholder="Например: бот для приёма заказов в Telegram" /></label>
            <button className="btn" type="submit">Отправить заявку</button>
          </form>
        </div>
      </section>
    </>
  );
}
