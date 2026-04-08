import { useEffect, useMemo, useState } from 'react';
import { simulatorPlans, siteData, type SimulatorPlanId } from './data';

const navItems = [
  { href: '#about', label: '会社紹介' },
  { href: '#service', label: '仕事内容' },
  { href: '#simulator', label: '収入例' },
  { href: '#members', label: 'メンバー' },
  { href: '#contact', label: '応募・連絡' },
];

type AppPhase = 'loading' | 'ready' | 'error';

const MIN_LOADING_MS = 1200;
const MAX_LOADING_MS = 9000;
const logoAsset = `${import.meta.env.BASE_URL}favicon.svg`;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

function waitForWindowLoad() {
  return new Promise<void>((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }

    const handleLoad = () => resolve();
    window.addEventListener('load', handleLoad, { once: true });
  });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [plan, setPlan] = useState<SimulatorPlanId>('regular');
  const [days, setDays] = useState(22);
  const [extraJobs, setExtraJobs] = useState(2);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [appPhase, setAppPhase] = useState<AppPhase>('loading');

  const preloadAssets = useMemo(
    () =>
      Array.from(
        new Set([
          siteData.heroVideo.poster,
          ...siteData.heroSlides.map((slide) => slide.image),
          ...siteData.strengths.map((item) => item.image),
          ...siteData.members.map((member) => member.image),
        ]),
      ),
    [],
  );

  useEffect(() => {
    let active = true;
    let timedOut = false;
    const startedAt = Date.now();
    let readyTimer = 0;

    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      if (active) {
        setAppPhase('error');
      }
    }, MAX_LOADING_MS);

    Promise.allSettled([waitForWindowLoad(), ...preloadAssets.map((src) => preloadImage(src))]).then(() => {
      if (!active || timedOut) {
        return;
      }

      window.clearTimeout(timeoutId);
      readyTimer = window.setTimeout(() => {
        if (active) {
          setAppPhase('ready');
        }
      }, Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt)));
    });

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      window.clearTimeout(readyTimer);
    };
  }, [preloadAssets]);

  useEffect(() => {
    if (appPhase !== 'ready') {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % siteData.heroSlides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [appPhase]);

  const activePlan = simulatorPlans.find((item) => item.id === plan) ?? simulatorPlans[0];
  const memberLoops = [siteData.members, siteData.members];

  const monthlyIncome = useMemo(() => {
    return activePlan.dailyFee * days + activePlan.monthlyBase * extraJobs;
  }, [activePlan.dailyFee, activePlan.monthlyBase, days, extraJobs]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(value);

  if (appPhase !== 'ready') {
    const isError = appPhase === 'error';

    return (
      <div className={`app-state-screen ${isError ? 'is-error' : ''}`}>
        <div className="app-state-card" role={isError ? 'alert' : 'status'} aria-live="polite">
          <img
            className={`loading-logo ${isError ? '' : 'is-loading'}`}
            src={logoAsset}
            alt={`${siteData.company.name} ロゴ`}
          />
          <p className="state-eyebrow">{isError ? 'SERVER ERROR' : 'LOADING'}</p>
          <h1>{isError ? '読み込みに時間がかかっています' : 'サイトを読み込んでいます'}</h1>
          <p className="state-copy">
            {isError
              ? 'サーバーまたは通信状況の影響で表示準備に時間がかかっています。少し時間を置くか、再読み込みをお試しください。'
              : 'トップ動画や仮写真を含めた画面を準備しています。'}
          </p>
          {isError ? (
            <button type="button" className="button button-primary" onClick={() => window.location.reload()}>
              再読み込みする
            </button>
          ) : (
            <div className="loading-bar" aria-hidden="true">
              <span />
            </div>
          )}
        </div>
      </div>
    );
  }

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
          <div className="hero-full-bleed">
            <div className="hero-video-shell">
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={siteData.heroVideo.poster}
              >
                <source src={siteData.heroVideo.src} type="video/mp4" />
              </video>
              <div className="hero-video-scrim" />

              <div className="hero-stage-grid">
                <div className="hero-copy-block">
                  <p className="eyebrow">RECRUITMENT SITE</p>
                  <h1>{siteData.company.catch}</h1>
                  <p className="hero-lead">{siteData.company.lead}</p>
                  <div className="hero-actions">
                    <a className="button button-primary button-cta" href="#contact">
                      <span className="button-label">今すぐ応募する</span>
                      <span className="button-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <a className="button button-secondary button-link" href="#simulator">
                      <span className="button-label">月収をチェック</span>
                      <span className="button-arrow button-arrow-static" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                  <ul className="hero-tags">
                    <li>
                      <span className="hero-tag-dot" />
                      未経験歓迎
                    </li>
                    <li>
                      <span className="hero-tag-dot" />
                      横浜エリア中心
                    </li>
                    <li>
                      <span className="hero-tag-dot" />
                      柔軟な案件相談
                    </li>
                  </ul>
                </div>

                <div className="hero-slider-card">
                  <div className="hero-slider-viewport">
                    <div
                      className="hero-slider-track"
                      style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                    >
                      {siteData.heroSlides.map((slide) => (
                        <div key={slide.eyebrow} className={`slide-visual ${slide.theme}`}>
                          <img className="slide-photo" src={slide.image} alt="" />
                          <div className="slide-filter" />
                          <div className="slide-overlay">
                            <p className="eyebrow">{slide.eyebrow}</p>
                            <h2>{slide.title}</h2>
                            <p>{slide.text}</p>
                            <div className="slide-stats">
                              {slide.stats.map((item) => (
                                <span key={item}>{item}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
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

              <div className="hero-video-badge">
                <span>{siteData.heroVideo.label}</span>
                <small>{siteData.heroVideo.note}</small>
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
                <article key={item.no} className="panel-card strength-card">
                  <div className="strength-photo">
                    <img src={item.image} alt="" />
                  </div>
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
                定期便、スポット便、夜間案件の3軸で整理し、働き方ごとの差が視覚的にも伝わる構成に整えています。
              </p>
            </div>

            <div className="service-grid">
              {siteData.serviceBlocks.map((item) => (
                <article key={item.title} className={`panel-card service-card service-card-${item.theme}`}>
                  <div className={`service-visual service-visual-${item.theme}`} />
                  <h3>{item.title}</h3>
                  {!item.isRecruiting && <p className="status-note">※現在は募集しておりません</p>}
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
                    className={`${item.id === plan ? 'active' : ''} ${!item.isRecruiting ? 'is-closed' : ''}`}
                    onClick={() => setPlan(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {!activePlan.isRecruiting && (
                <p className="simulator-status-note">※現在は募集しておりません</p>
              )}

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

              <a className="button button-accent button-cta simulator-cta" href="#contact">
                <span className="button-label">
                  {activePlan.isRecruiting ? 'この条件で応募する' : '募集状況を問い合わせる'}
                </span>
                <span className="button-arrow" aria-hidden="true">
                  →
                </span>
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
                顔写真が後から入る前提で、円形の写真トリミングを先に組み込んでいます。
                いまは仮写真なので、差し替えるだけで実写に置き換えられます。
              </p>
            </div>
            <div className="member-marquee">
              <div className="member-track">
                {memberLoops.map((group, loopIndex) => (
                  <div
                    key={`member-loop-${loopIndex}`}
                    className="member-list"
                    aria-hidden={loopIndex === 1}
                  >
                    {group.map((member) => (
                      <article key={`${member.name}-${loopIndex}`} className="member-card member-card-flow">
                        <div className="member-photo">
                          <img className="member-photo-image" src={member.image} alt={`${member.role}の仮写真`} />
                        </div>
                        <h3>{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <p>{member.comment}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
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
                <article
                  key={job.title}
                  className={`job-card ${job.isRecruiting ? 'is-open' : 'is-closed'} job-card-${job.theme}`}
                >
                  <div className="job-card-strip" />
                  <h3>{job.title}</h3>
                  {!job.isRecruiting && <p className="status-note status-note-dark">※現在は募集しておりません</p>}
                  {job.isRecruiting && <p className="job-open-label">現在募集中</p>}
                  <strong>{job.pay}</strong>
                  <p>{job.body}</p>
                </article>
              ))}
            </div>

            <div className="faq-grid">
              {siteData.faq.map((item, index) => (
                <article key={item.q} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex((current) => (current === index ? null : index))}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <span className="faq-icon-bar" />
                      <span className="faq-icon-bar faq-icon-vertical" />
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section company-section" id="company">
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
          <div className="container contact-shell">
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

            <div className="contact-data">
              <div className="contact-data-row">
                <span>会社名</span>
                <strong>{siteData.company.name}</strong>
              </div>
              <div className="contact-data-row">
                <span>住所</span>
                <strong>{siteData.company.address}</strong>
              </div>
              <div className="contact-data-row">
                <span>メール</span>
                <strong>{siteData.company.mail}</strong>
              </div>
              <div className="contact-data-row">
                <span>電話番号</span>
                <strong>{siteData.company.tel}</strong>
              </div>
              <div className="contact-data-row">
                <span>備考</span>
                <strong>外部フォームやLINE導線を追加可能</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-cta" href="#contact">
        <span className="button-label">今すぐ応募する</span>
        <span className="button-arrow" aria-hidden="true">
          →
        </span>
      </a>

      <footer className="site-footer">
        <div className="container footer-row">
          <div>
            <strong>{siteData.company.name}</strong>
            <p>{siteData.company.access}</p>
          </div>
          <div className="footer-actions">
            <a className="back-to-top" href="#top">
              トップへ戻る
            </a>
            <small>© 2026 {siteData.company.name}</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
