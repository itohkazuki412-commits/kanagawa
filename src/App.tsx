import { useEffect, useMemo, useState } from 'react';
import { simulatorPlans, siteData, type SimulatorPlanId } from './data';

const navItems = [
  { href: '#about', label: '会社紹介' },
  { href: '#service', label: '仕事内容' },
  { href: '#simulator', label: '収入例' },
  { href: '#members', label: 'メンバー' },
  { href: '#contact', label: '応募・連絡' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [plan, setPlan] = useState<SimulatorPlanId>('regular');
  const [days, setDays] = useState(22);
  const [extraJobs, setExtraJobs] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % siteData.heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = siteData.heroSlides[slideIndex];
  const activePlan = simulatorPlans.find((item) => item.id === plan) ?? simulatorPlans[0];

  const monthlyIncome = useMemo(() => {
    return activePlan.dailyFee * days + activePlan.monthlyBase * extraJobs;
  }, [activePlan.dailyFee, activePlan.monthlyBase, days, extraJobs]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-row">
          <a className="brand-mark" href="#top" aria-label={`${siteData.company.name} トップへ戻る`}>
            <span className="brand-icon">JLS</span>
            <span className="brand-copy">
              <strong>{siteData.company.name}</strong>
              <small>{siteData.company.englishName}</small>
            </span>
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-label="メニューを開閉"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="button button-primary button-nav" href={siteData.company.entryUrl}>
              応募する
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-backdrop" />
          <div className="container hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">RECRUITMENT SITE</p>
              <h1>{siteData.company.catch}</h1>
              <p className="hero-lead">{siteData.company.lead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  今すぐ応募する
                </a>
                <a className="button button-secondary" href="#simulator">
                  月収をチェック
                </a>
              </div>
              <ul className="hero-tags">
                <li>未経験歓迎</li>
                <li>横浜エリア中心</li>
                <li>柔軟な案件相談</li>
              </ul>
            </div>

            <div className="hero-slider-card">
              <div className={`slide-visual ${activeSlide.theme}`}>
                <div className="slide-overlay">
                  <p className="eyebrow">{activeSlide.eyebrow}</p>
                  <h2>{activeSlide.title}</h2>
                  <p>{activeSlide.text}</p>
                  <div className="slide-stats">
                    {activeSlide.stats.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="slider-dots" aria-label="スライダー操作">
                {siteData.heroSlides.map((item, index) => (
                  <button
                    key={item.eyebrow}
                    type="button"
                    className={index === slideIndex ? 'active' : ''}
                    onClick={() => setSlideIndex(index)}
                    aria-label={`${index + 1}枚目を表示`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-intro" id="about">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">ABOUT US</p>
              <h2>配送を、働く人にとっても誇れる仕事に。</h2>
              <p>
                参考サイトと同じように、会社の考え方から仕事内容、採用情報までを一画面で追える構成にしています。
                テキストや人数、住所、写真は後から差し替えやすいようにデータ化しています。
              </p>
            </div>
            <div className="strength-grid">
              {siteData.strengths.map((item) => (
                <article key={item.no} className="panel-card">
                  <p className="card-no">{item.no}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="service">
          <div className="container">
            <div className="split-heading">
              <div className="section-heading">
                <p className="eyebrow">SERVICE</p>
                <h2>仕事内容と対応サービス</h2>
              </div>
              <p className="heading-note">
                定期便、スポット便、夜間案件の3軸で見せる構成にし、求職者が自分に近い働き方を選びやすくしています。
              </p>
            </div>

            <div className="service-grid">
              {siteData.serviceBlocks.map((item) => (
                <article key={item.title} className="panel-card service-card">
                  <div className="service-visual" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul className="bullet-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="fleet-grid">
              {siteData.fleetBlocks.map((item) => (
                <article key={item.title} className="fleet-card">
                  <div>
                    <p className="eyebrow">FLEET</p>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section simulator-section" id="simulator">
          <div className="container simulator-wrap">
            <div className="section-heading simulator-head">
              <p className="eyebrow">INCOME SIMULATOR</p>
              <h2>あなたの月収をシミュレーション</h2>
              <p>
                画像の雰囲気をベースに、働き方と稼働日数で目安を確認できるUIを実装しています。
                数字は `src/data.ts` の単価を変えるだけで調整できます。
              </p>
            </div>

            <div className="simulator-card">
              <div className="simulator-tabs" role="tablist" aria-label="働き方を選択">
                {simulatorPlans.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === plan ? 'active' : ''}
                    onClick={() => setPlan(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="range-group">
                <div className="range-header">
                  <span>月間稼働日数</span>
                  <strong>{days}日</strong>
                </div>
                <input
                  type="range"
                  min="8"
                  max="26"
                  value={days}
                  onChange={(event) => setDays(Number(event.target.value))}
                />
              </div>

              <div className="range-group">
                <div className="range-header">
                  <span>追加スポット案件</span>
                  <strong>{extraJobs}件</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={extraJobs}
                  onChange={(event) => setExtraJobs(Number(event.target.value))}
                />
              </div>

              <div className="income-result">
                <p>想定月収（税引前）</p>
                <strong>{formatCurrency(monthlyIncome)}</strong>
                <span>
                  日額 {formatCurrency(activePlan.dailyFee)} × {days}日 + 追加案件 {extraJobs}件
                </span>
              </div>

              <a className="button button-accent simulator-cta" href="#contact">
                この条件で応募する
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="members">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MEMBERS</p>
              <h2>メンバー紹介</h2>
              <p>
                `CARAVEL` のメンバー紹介セクションを踏襲しつつ、顔写真が未確定でも公開できるようプレースホルダー仕様にしています。
              </p>
            </div>
            <div className="member-grid">
              {siteData.members.map((member) => (
                <article key={member.name} className="member-card">
                  <div className="member-photo">{member.name.slice(0, 1)}</div>
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p>{member.comment}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="recruit">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">RECRUIT</p>
              <h2>募集職種</h2>
              <p>応募前に仕事内容と報酬イメージが分かるよう、カード形式で整理しています。</p>
            </div>
            <div className="job-grid">
              {siteData.jobs.map((job) => (
                <article key={job.title} className="job-card">
                  <h3>{job.title}</h3>
                  <strong>{job.pay}</strong>
                  <p>{job.body}</p>
                </article>
              ))}
            </div>

            <div className="faq-grid">
              {siteData.faq.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="company">
          <div className="container company-grid">
            <div>
              <div className="section-heading">
                <p className="eyebrow">COMPANY</p>
                <h2>会社概要</h2>
              </div>
              <div className="overview-table">
                {siteData.overview.map(([label, value]) => (
                  <div key={label} className="overview-row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-card">
              {siteData.company.mapEmbedUrl ? (
                <iframe
                  title="会社所在地"
                  src={siteData.company.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="map-placeholder">
                  <p>Google Map 埋め込みエリア</p>
                  <span>後から `src/data.ts` の URL を入れるだけで差し替えできます。</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">CONTACT</p>
              <h2>応募・お問い合わせ</h2>
              <p>
                今回は React 化を優先し、まずは公開しやすい連絡導線にしています。応募フォームの送信先が決まり次第、
                API 連携や外部フォーム埋め込みも追加しやすい構成です。
              </p>
              <div className="contact-actions">
                <a className="button button-primary" href={`tel:${siteData.company.tel}`}>
                  TEL {siteData.company.tel}
                </a>
                <a className="button button-secondary" href={`mailto:${siteData.company.mail}`}>
                  MAILで相談する
                </a>
              </div>
            </div>

            <div className="contact-card">
              <h3>掲載情報</h3>
              <ul className="contact-list">
                <li>会社名: {siteData.company.name}</li>
                <li>住所: {siteData.company.address}</li>
                <li>メール: {siteData.company.mail}</li>
                <li>電話番号: {siteData.company.tel}</li>
                <li>備考: 外部フォームやLINE導線を追加可能</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-cta" href="#contact">
        今すぐ応募する
      </a>

      <footer className="site-footer">
        <div className="container footer-row">
          <div>
            <strong>{siteData.company.name}</strong>
            <p>{siteData.company.access}</p>
          </div>
          <small>© 2026 {siteData.company.name}</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
