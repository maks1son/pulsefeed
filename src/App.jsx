import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BellRinging,
  Briefcase,
  ChartLineUp,
  Database,
  FileText,
  Receipt,
  ShieldCheck,
  SquaresFour,
  TelegramLogo,
  UsersThree,
  Wallet
} from '@phosphor-icons/react';
import CountUp from './components/CountUp.jsx';
import Carousel from './components/Carousel.jsx';

const carouselItems = [
  {
    id: 1,
    title: 'Signal score',
    description: 'Rank every post by reach velocity, saves, replies, and sponsor fit.',
    icon: <ChartLineUp className="carousel-icon" weight="bold" />
  },
  {
    id: 2,
    title: 'Lead ledger',
    description: 'Keep inbound sponsor demand, statuses, and owner notes in one place.',
    icon: <Briefcase className="carousel-icon" weight="bold" />
  },
  {
    id: 3,
    title: 'Revenue path',
    description: 'Connect content activity to invoices, payments, renewals, and gaps.',
    icon: <Wallet className="carousel-icon" weight="bold" />
  },
  {
    id: 4,
    title: 'Audience shifts',
    description: 'Spot where subscribers came from and which topics moved them.',
    icon: <UsersThree className="carousel-icon" weight="bold" />
  },
  {
    id: 5,
    title: 'Clean exports',
    description: 'Send a sponsor-ready report without rebuilding slides by hand.',
    icon: <FileText className="carousel-icon" weight="bold" />
  }
];

const faqs = [
  {
    question: 'How does this match my current work?',
    answer:
      'Pulsefeed is built around channel, post, lead, invoice, and sponsor workflows. The page shows the product as an operating layer, not a generic analytics board.'
  },
  {
    question: 'Is there a free plan?',
    answer:
      'The portfolio version is a demo landing. The offer can be packaged as a custom analytics dashboard for Telegram teams.'
  },
  {
    question: 'How does the ten day trial work?',
    answer:
      'A client can connect sample channel data, see signal scoring, and review a sponsor report before committing to the full setup.'
  },
  {
    question: 'Can I invite my team?',
    answer:
      'Yes. The concept supports editors, sales owners, founders, and analysts with separate operating views.'
  },
  {
    question: 'What if I need help?',
    answer:
      'The service can include setup, data cleanup, dashboard configuration, and monthly reporting support.'
  }
];

function useCarouselWidth() {
  const [width, setWidth] = useState(430);

  useEffect(() => {
    const update = () => {
      setWidth(Math.min(430, Math.max(292, window.innerWidth - 40)));
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Pulsefeed home">
        <span className="brand-mark">P</span>
        <span>Pulsefeed</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#wins">Workflow</a>
        <a href="#platform">Platform</a>
        <a href="#insights">Insights</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="header-cta" href="mailto:hello@pulsefeed.ai">
        Join waitlist
      </a>
    </header>
  );
}

function Metric({ label, children }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-product" aria-label="Pulsefeed dashboard preview">
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="product-window hero-window">
        <div className="window-bar">
          <span className="window-title">Channel cockpit</span>
          <span className="status-dot">Live</span>
        </div>
        <div className="dashboard-layout">
          <aside className="side-rail">
            <span className="rail-active">Overview</span>
            <span>Posts</span>
            <span>Leads</span>
            <span>Invoices</span>
            <span>Reports</span>
          </aside>
          <div className="dashboard-main">
            <div className="metric-row">
              <Metric label="Revenue ready">
                $<CountUp to={862000} separator="," duration={1.2} />
              </Metric>
              <Metric label="Signal quality">
                <CountUp to={94} duration={1.2} />%
              </Metric>
              <Metric label="Open deals">
                <CountUp to={38} duration={1.1} />
              </Metric>
            </div>
            <div className="line-chart" aria-hidden="true">
              <svg viewBox="0 0 520 170" role="img" aria-label="Telegram growth chart">
                <path className="chart-grid" d="M10 136 H510 M10 96 H510 M10 56 H510" />
                <path
                  className="chart-fill"
                  d="M16 130 L82 96 L146 116 L208 78 L272 90 L334 42 L402 76 L502 58 L502 150 L16 150 Z"
                />
                <path className="chart-line" d="M16 130 L82 96 L146 116 L208 78 L272 90 L334 42 L402 76 L502 58" />
              </svg>
            </div>
            <div className="mini-table">
              <span>Top signal</span>
              <span>Post launch guide</span>
              <strong>+41%</strong>
              <span>Sponsor fit</span>
              <span>Fintech tools</span>
              <strong>$14,200</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WinCards() {
  return (
    <section className="section wins" id="wins">
      <p className="section-kicker">Getting started</p>
      <h2>Your first win is five minutes away.</h2>
      <p className="section-copy">
        Bring your channel, lead, and invoice context into a single calm workflow.
      </p>

      <div className="win-grid">
        <article className="win-card">
          <div className="card-visual import-visual">
            <div className="import-line" />
            <button type="button">Import</button>
            <div className="import-line short" />
          </div>
          <h3>Bring your clients with you</h3>
          <p>Import your existing leads, channel tags, and sponsor notes in minutes.</p>
        </article>

        <article className="win-card">
          <div className="card-visual invoice-visual">
            <span className="bubble-index">2</span>
            <strong>
              $<CountUp to={20000} separator="," duration={1.3} />
            </strong>
            <div className="invoice-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
          <h3>Send your first invoice</h3>
          <p>Create sponsor invoices or post packages without opening a second tool.</p>
        </article>

        <article className="win-card">
          <div className="card-visual growth-visual">
            <strong>
              $<CountUp to={95000} separator="," duration={1.5} />
            </strong>
            <div className="growth-axis">
              <span style={{ height: '28%' }} />
              <span style={{ height: '44%' }} />
              <span style={{ height: '62%' }} />
              <span style={{ height: '86%' }} />
            </div>
            <em>$14,000</em>
          </div>
          <h3>See your cockpit come alive</h3>
          <p>Watch source, payment, and lead activity become one clean daily view.</p>
        </article>
      </div>
    </section>
  );
}

function ProductRow({ title, copy, variant, icon }) {
  return (
    <section className={`product-row ${variant}`}>
      <div className="row-copy">
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      <ProductWindow icon={icon} variant={variant} />
    </section>
  );
}

function ProductWindow({ icon, variant }) {
  return (
    <div className={`product-window row-window ${variant}`}>
      <div className="window-bar">
        <span className="window-title">Pulsefeed</span>
        <span className="status-dot">Synced</span>
      </div>
      <div className="row-window-body">
        <div className="row-window-sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="row-window-content">
          <div className="window-icon">{icon}</div>
          <div className="window-list">
            <span />
            <span />
            <span />
          </div>
          <div className="window-panel">
            <strong>
              $<CountUp to={82142} separator="," duration={1.2} />
            </strong>
            <p>Ready for approval</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformSection() {
  return (
    <section className="section platform" id="platform">
      <p className="section-kicker">The operating platform</p>
      <h2>From post to paid. All in one place.</h2>
      <p className="section-copy">
        Stay on top of reach, sponsors, invoices, and work that turns content into revenue.
      </p>
      <div className="platform-stack">
        <ProductRow
          title="Own your pipeline. Stop losing warm leads."
          copy="Close more deals without losing track of warm leads, reply context, next steps, and every open sponsor task."
          variant="pipeline"
          icon={<Database weight="duotone" />}
        />
        <ProductRow
          title="Run projects with ease. Know where things stand."
          copy="See every project in one place. Owners, offers, and deadlines connect to the reporting layer."
          variant="projects"
          icon={<SquaresFour weight="duotone" />}
        />
        <ProductRow
          title="Send invoices fast. No more chasing payments."
          copy="Get paid faster with invoices, sponsor terms, and payment status connected to your channel work."
          variant="payments"
          icon={<Receipt weight="duotone" />}
        />
      </div>
    </section>
  );
}

function CRMSection() {
  const rows = [
    ['MoonPay Digest', 'Mira', '$18,400', 'Proposal', 'Tomorrow'],
    ['Founder News', 'Alex', '$9,800', 'Negotiation', 'Friday'],
    ['DeFi Radar', 'Nika', '$22,000', 'Booked', 'Today'],
    ['Apps Weekly', 'Tim', '$7,500', 'Lead', 'Monday']
  ];

  return (
    <section className="section crm">
      <div className="crm-cloud" />
      <p className="section-kicker">Accounts and contacts</p>
      <h2>Your CRM, included.</h2>
      <p className="section-copy">
        A clean CRM using your channel data, sponsor history, and content context.
      </p>
      <div className="product-window crm-window">
        <div className="window-bar">
          <span className="window-title">Accounts</span>
          <span className="status-dot">Updated</span>
        </div>
        <div className="crm-table">
          {['Company', 'Owner', 'Value', 'Stage', 'Next step'].map(item => (
            <strong key={item}>{item}</strong>
          ))}
          {rows.flatMap(row => row.map((cell, index) => <span key={`${row[0]}-${index}`}>{cell}</span>))}
        </div>
      </div>
    </section>
  );
}

function InsightsSection() {
  const width = useCarouselWidth();

  return (
    <section className="section insights" id="insights">
      <div className="insight-card">
        <div>
          <p className="section-kicker">Coming soon</p>
          <h2>Smart insights. Know what is working.</h2>
          <p>
            Pulsefeed flags sponsor fit, post timing, and audience shifts before they turn into a missed opportunity.
          </p>
          <a className="primary-link" href="mailto:hello@pulsefeed.ai">
            Join the waitlist <ArrowRight weight="bold" />
          </a>
        </div>
        <div className="notification-preview">
          <BellRinging weight="duotone" />
          <strong>New sponsor signal</strong>
          <span>Fintech audience lifted 31% after the Tuesday post.</span>
        </div>
      </div>

      <div className="carousel-block">
        <p className="section-kicker">Before and after</p>
        <h2>Better insights. Fewer tools.</h2>
        <p className="section-copy">
          Replace scattered spreadsheets, chat notes, CRM fields, and sponsor reports.
        </p>
        <Carousel
          items={carouselItems}
          baseWidth={width}
          autoplay
          autoplayDelay={3200}
          pauseOnHover
          loop
          round={false}
        />
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section cta-section">
      <div className="cta-panel">
        <div className="cta-icon">
          <ShieldCheck weight="duotone" />
        </div>
        <h2>Stop running on guesswork.</h2>
        <p>Pulsefeed gives Telegram operators one place to see what works, what pays, and what needs attention.</p>
        <a className="button primary" href="mailto:hello@pulsefeed.ai">
          Join the waitlist today <ArrowRight weight="bold" />
        </a>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section faq" id="faq">
      <p className="section-kicker">Help</p>
      <h2>Totally fair to ask.</h2>
      <div className="faq-list">
        {faqs.map(item => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>Protect your margins. Cut the chaos.</h2>
        <p>Built as a portfolio product for Telegram analytics, creator revenue, and sponsor operations.</p>
        <a className="button primary" href="mailto:hello@pulsefeed.ai">
          Join the waitlist <ArrowRight weight="bold" />
        </a>
      </div>
      <div className="footer-links">
        <div>
          <strong>Socials</strong>
          <a href="https://t.me/" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href="mailto:hello@pulsefeed.ai">Email</a>
        </div>
        <div>
          <strong>Product</strong>
          <a href="#wins">Workflow</a>
          <a href="#platform">Platform</a>
          <a href="#insights">Insights</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-shell" id="top">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <TelegramLogo weight="fill" />
              Telegram signal analytics
            </p>
            <h1>Run On Signals, Not Guesswork.</h1>
            <p>
              Pulsefeed connects posts, reach, leads, and sponsor revenue so every channel decision has a clean trail.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="mailto:hello@pulsefeed.ai">
                Join the waitlist <ArrowRight weight="bold" />
              </a>
              <a className="button secondary" href="#platform">
                Watch it work
              </a>
            </div>
          </div>
          <HeroDashboard />
        </section>

        <WinCards />
        <PlatformSection />
        <CRMSection />
        <InsightsSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
    </div>
  );
}
