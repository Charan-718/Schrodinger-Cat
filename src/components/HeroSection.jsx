import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import CatMoireAnimation from './CatMoireAnimation';

const STATS = [
  { value: '99.97%', label: 'Quantum Coherence' },
  { value: '0.3ms',  label: 'Processing Latency' },
  { value: '2048+',  label: 'Logical Qubits' },
  { value: '∞',      label: 'Scalability Index' },
];

const Hero = () => {
  const orbRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth  - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Ambient background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--primary" ref={orbRef}/>
        <div className="hero__orb hero__orb--teal"/>
        <div className="hero__grid"/>
        <div className="hero__scanline"/>
      </div>

      <CatMoireAnimation />

      <div className="container hero__inner">

        {/* Badge */}
        <div className="hero__badge" style={{ animationDelay: '0ms' }}>
          <span className="hero__badge-dot"/>
          <span className="hero__badge-mono">ARP · QUANTUM CORE v4.2</span>
          <span className="hero__badge-sep"/>
          <span className="hero__badge-text">Now processing 2048 qubits</span>
        </div>

        {/* Headline */}
        <h1 className="hero__headline" style={{ animationDelay: '80ms' }}>
          <span className="hero__headline-line">Quantum-Driven</span>
          <span className="hero__headline-line hero__headline-line--accent">
            Business Intelligence
          </span>
          <span className="hero__headline-line">for the Modern Enterprise</span>
        </h1>

        {/* Sub-headline */}
        <p className="hero__sub" style={{ animationDelay: '180ms' }}>
          ARP unifies <strong>quantum computing</strong>, <strong>AI orchestration</strong>, and
          <strong> real-time financial modeling</strong> into a single administrative
          intelligence platform — purpose-built for Business Administration
          at unprecedented computational scale.
        </p>

        {/* CTA row */}
        <div className="hero__ctas" style={{ animationDelay: '260ms' }}>
          <a href="#solutions" className="btn btn--primary">
            <span>Explore Platform</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#technology" className="btn btn--ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            <span>Watch Demo</span>
          </a>
        </div>

        {/* Trust stripe */}
        <p className="hero__trust" style={{ animationDelay: '340ms' }}>
          Trusted by Fortune 500 finance, healthcare, and logistics enterprises
        </p>

        {/* Stats row */}
        <div className="hero__stats" style={{ animationDelay: '400ms' }}>
          {STATS.map(({ value, label }) => (
            <div className="hero__stat" key={label}>
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
        
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint">
        <span className="hero__scroll-line"/>
        <span className="hero__scroll-text">SCROLL</span>
      </div>
    </section>
  );
};

/* --- Solutions --- */
const SOLUTIONS = [
  {
    id: 'qfa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    tag: 'CORE MODULE',
    title: 'Quantum Financial Analytics',
    description:
      'Harness superposition-based portfolio optimization that evaluates all possible allocation states simultaneously — delivering sub-millisecond risk-adjusted returns at enterprise scale.',
    features: ['Variational Quantum Eigensolver', 'Monte Carlo Acceleration', 'Real-time P&L Attribution'],
    color: 'purple',
  },
  {
    id: 'aim',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    tag: 'AI LAYER',
    title: 'Administrative Intelligence Matrix',
    description:
      'AI-native workflow orchestration that automates procurement, compliance, HR analytics, and operational forecasting with quantum-enhanced language models tuned for business administration.',
    features: ['Autonomous Procurement AI', 'Compliance Radar Engine', 'Predictive HR Modeling'],
    color: 'teal',
  },
  {
    id: 'qsc',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 11h6"/>
      </svg>
    ),
    tag: 'INFRASTRUCTURE',
    title: 'Quantum Supply Chain',
    description:
      'End-to-end logistics optimization using QUBO formulations to solve routing, inventory, and supplier-network problems that are computationally intractable for classical systems.',
    features: ['Traveling Salesman Solver', 'Inventory Quantum Annealing', 'Supplier Risk Quantum Graph'],
    color: 'navy',
  },
  {
    id: 'bda',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6"/>
      </svg>
    ),
    tag: 'ANALYTICS',
    title: 'Business Decision Accelerator',
    description:
      'Quantum-classical hybrid decision trees that model 10⁶× more outcome branches per second than classical analytics — powering C-suite strategy with unprecedented scenario depth.',
    features: ['Hybrid Decision Trees', 'Scenario Depth Engine', 'Executive Dashboard Layer'],
    color: 'purple',
  },
];

const Solutions = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="solutions" id="solutions">
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <span className="section-eyebrow">Solutions</span>
          <h2 className="section-title">
            One Platform.<br/>
            <em>Infinite Computational Advantage.</em>
          </h2>
          <p className="section-desc">
            Four integrated modules that transform every pillar of Business Administration
            through quantum-accelerated computation and applied artificial intelligence.
          </p>
        </div>

        {/* Cards grid */}
        <div className="solutions__grid">
          {SOLUTIONS.map((sol) => (
            <article
              key={sol.id}
              className={`solution-card solution-card--${sol.color}${active === sol.id ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(sol.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="solution-card__top">
                <div className="solution-card__icon">{sol.icon}</div>
                <span className="solution-card__tag">{sol.tag}</span>
              </div>

              <h3 className="solution-card__title">{sol.title}</h3>
              <p className="solution-card__desc">{sol.description}</p>

              <ul className="solution-card__features">
                {sol.features.map((f) => (
                  <li key={f} className="solution-card__feature">
                    <span className="feature-dot"/>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="solution-card__footer">
                <a href={`#${sol.id}`} className="solution-card__link">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              {/* Hover glow accent */}
              <div className="solution-card__glow"/>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Technology --- */
const LAYERS = [
  {
    id: 'layer-q',
    label: 'QUANTUM LAYER',
    title: 'Quantum Processing Unit',
    items: ['Superconducting Qubit Arrays', 'Error Correction (Surface Code)', 'Quantum Memory Register'],
    color: 'purple',
  },
  {
    id: 'layer-h',
    label: 'HYBRID BRIDGE',
    title: 'Classical–Quantum Middleware',
    items: ['QUBO Compiler', 'Variational Circuit Optimizer', 'Noise-Aware Transpiler'],
    color: 'teal',
  },
  {
    id: 'layer-ai',
    label: 'AI INFERENCE',
    title: 'Neural Orchestration Engine',
    items: ['Quantum-Enhanced LLMs', 'Federated Learning Cluster', 'Explainability Runtime'],
    color: 'navy',
  },
  {
    id: 'layer-ba',
    label: 'BUSINESS LAYER',
    title: 'Administration Intelligence',
    items: ['ERP Deep Integration', 'Real-time Audit Trails', 'Regulatory Compliance Mesh'],
    color: 'purple',
  },
];

const METRICS = [
  { label: 'Quantum Volume',    value: '65,536',  unit: 'QV' },
  { label: 'Gate Fidelity',     value: '99.97',   unit: '%'  },
  { label: 'T1 Coherence',      value: '350',     unit: 'μs' },
  { label: 'Classical Speedup', value: '10⁶×',    unit: ''   },
  { label: 'CLOPS',             value: '15,000',  unit: '/s' },
  { label: 'Circuit Depth',     value: '2,048',   unit: 'ops'},
];

const Technology = () => (
  <section className="technology" id="technology">
    <div className="container">
      <div className="technology__layout">

        {/* Left: content */}
        <div className="technology__content">
          <span className="section-eyebrow">Technology</span>
          <h2 className="section-title" style={{ textAlign: 'left' }}>
            Architecture built<br/>
            <em>from the qubit up.</em>
          </h2>
          <p className="section-desc" style={{ margin: 0 }}>
            ARP's four-layer quantum-classical hybrid architecture is designed from first
            principles — ensuring every business decision benefits from quantum speedup
            without exposing complexity to end users.
          </p>

          {/* Metric grid */}
          <div className="technology__metrics">
            {METRICS.map(({ label, value, unit }) => (
              <div className="tech-metric" key={label}>
                <span className="tech-metric__value">
                  {value}
                  {unit && <span className="tech-metric__unit">{unit}</span>}
                </span>
                <span className="tech-metric__label">{label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
            Download Architecture Brief
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>
        </div>

        {/* Right: architecture diagram */}
        <div className="technology__diagram">
          {LAYERS.map((layer, i) => (
            <div className={`arch-layer arch-layer--${layer.color}`} key={layer.id}>
              <div className="arch-layer__index">{String(i + 1).padStart(2, '0')}</div>
              <div className="arch-layer__body">
                <span className="arch-layer__label">{layer.label}</span>
                <h4 className="arch-layer__title">{layer.title}</h4>
                <ul className="arch-layer__items">
                  {layer.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              {/* Connector */}
              {i < LAYERS.length - 1 && (
                <div className="arch-layer__connector">
                  <span className="arch-connector-line"/>
                  <span className="arch-connector-label">ENTANGLED CHANNEL</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

/* --- Platform --- */
const TABS = [
  {
    id: 'dashboard',
    label: 'Command Dashboard',
    icon: '⬡',
    headline: 'Unified Quantum Command Center',
    desc: 'A single pane of glass across all quantum and classical workloads — real-time circuit execution, job queuing, result streaming, and anomaly detection consolidated into an executive-grade interface.',
    capabilities: [
      { name: 'Live Circuit Visualizer', status: 'active' },
      { name: 'Quantum Job Scheduler',  status: 'active' },
      { name: 'Coherence Monitor',      status: 'active' },
      { name: 'Error Budget Tracker',   status: 'beta'   },
    ],
    visual: 'dashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics Suite',
    icon: '◈',
    headline: 'Business Intelligence, Quantumly Accelerated',
    desc: 'Built-in BI modules with quantum-enhanced OLAP cubes that deliver sub-second aggregation across petabyte datasets — purpose-built for CFO, COO, and CRO workflows.',
    capabilities: [
      { name: 'Quantum OLAP Engine',      status: 'active' },
      { name: 'Predictive Cashflow AI',   status: 'active' },
      { name: 'Regulatory Stress Tests',  status: 'active' },
      { name: 'ESG Impact Modeler',        status: 'beta'   },
    ],
    visual: 'analytics',
  },
  {
    id: 'security',
    label: 'Quantum Security',
    icon: '◇',
    headline: 'Post-Quantum Cryptography by Default',
    desc: 'ARP ships with NIST-approved post-quantum cryptographic algorithms (CRYSTALS-Kyber, CRYSTALS-Dilithium) baked into every data pipeline — ensuring future-proof compliance today.',
    capabilities: [
      { name: 'CRYSTALS-Kyber KEM',    status: 'active' },
      { name: 'CRYSTALS-Dilithium Sig', status: 'active' },
      { name: 'QKD Network Support',    status: 'beta'   },
      { name: 'Threat Quantum Scanner', status: 'active' },
    ],
    visual: 'security',
  },
];

const VisualPlaceholder = ({ type }) => (
  <div className={`platform-visual platform-visual--${type}`}>
    <div className="platform-visual__grid">
      {type === 'dashboard' && (
        <>
          <div className="pv-card pv-card--wide">
            <span className="pv-label">Quantum Jobs Running</span>
            <span className="pv-value" style={{ color: 'var(--accent-primary)' }}>247</span>
            <div className="pv-bar-row">
              {[80,45,90,60,75,50,95].map((h,i) => (
                <div key={i} className="pv-bar" style={{ height: `${h}%`, animationDelay: `${i*80}ms` }}/>
              ))}
            </div>
          </div>
          <div className="pv-card">
            <span className="pv-label">Gate Fidelity</span>
            <span className="pv-value">99.97%</span>
          </div>
          <div className="pv-card">
            <span className="pv-label">Queue Depth</span>
            <span className="pv-value" style={{ color: 'var(--accent-teal)' }}>12ms</span>
          </div>
          <div className="pv-card pv-card--wide">
            <span className="pv-label">Coherence Over Time</span>
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" style={{ width: '100%', height: 50 }}>
              <polyline
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                points="0,40 30,35 60,20 90,28 120,15 150,22 180,10 200,14"
              />
              <polyline
                fill="rgba(147,51,234,0.1)"
                stroke="none"
                points="0,40 30,35 60,20 90,28 120,15 150,22 180,10 200,14 200,60 0,60"
              />
            </svg>
          </div>
        </>
      )}
      {type === 'analytics' && (
        <>
          <div className="pv-card pv-card--wide">
            <span className="pv-label">Revenue Forecast (Q4)</span>
            <span className="pv-value" style={{ color: 'var(--accent-teal)' }}>+18.4%</span>
            <div className="pv-donut-row">
              {['Revenue','OpEx','EBITDA'].map((l,i)=>(
                <div key={l} className="pv-pill">
                  <span className="pv-pill-dot" style={{ background: ['var(--accent-primary)','var(--accent-teal)','var(--accent-navy)'][i] }}/>
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div className="pv-card">
            <span className="pv-label">Risk Score</span>
            <span className="pv-value" style={{ color: 'var(--accent-primary)' }}>LOW</span>
          </div>
          <div className="pv-card">
            <span className="pv-label">Models Active</span>
            <span className="pv-value">48</span>
          </div>
        </>
      )}
      {type === 'security' && (
        <>
          <div className="pv-card pv-card--wide">
            <span className="pv-label">Encryption Status</span>
            <span className="pv-value" style={{ color: 'var(--accent-teal)' }}>SECURE</span>
            <div className="pv-shield">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
          </div>
          <div className="pv-card">
            <span className="pv-label">Threats Blocked</span>
            <span className="pv-value" style={{ color: 'var(--accent-primary)' }}>0</span>
          </div>
          <div className="pv-card">
            <span className="pv-label">PQC Algorithm</span>
            <span className="pv-value" style={{ fontSize: '0.75rem' }}>KYBER-1024</span>
          </div>
        </>
      )}
    </div>
  </div>
);

const Platform = () => {
  const [active, setActive] = useState('dashboard');
  const tab = TABS.find(t => t.id === active);

  return (
    <section className="platform" id="platform">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Platform</span>
          <h2 className="section-title">
            Everything your enterprise<br/>
            <em>needs, quantumly.</em>
          </h2>
        </div>

        {/* Tab nav */}
        <div className="platform__tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`platform__tab${active === t.id ? ' is-active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className="platform__tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div className="platform__panel" role="tabpanel">
          <div className="platform__panel-content">
            <h3 className="platform__panel-headline">{tab.headline}</h3>
            <p className="platform__panel-desc">{tab.desc}</p>

            <ul className="platform__capabilities">
              {tab.capabilities.map(({ name, status }) => (
                <li key={name} className="platform__capability">
                  <span className={`capability-badge capability-badge--${status}`}>{status}</span>
                  <span className="capability-name">{name}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn btn--primary" style={{ marginTop: 'var(--space-4)' }}>
              Try {tab.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <VisualPlaceholder type={tab.visual || tab.id} />
        </div>
      </div>
    </section>
  );
};

/* --- Research --- */
const PAPERS = [
  {
    id: 'r1',
    category: 'White Paper',
    title: 'Quantum Advantage in Enterprise Financial Modelling: A Practical Study',
    authors: 'ARP Research · Dr. Ananya R. et al.',
    date: 'Mar 2025',
    readTime: '18 min read',
    tags: ['QFA', 'QAOA', 'Monte Carlo'],
    color: 'purple',
  },
  {
    id: 'r2',
    category: 'Technical Report',
    title: 'Post-Quantum Cryptography Migration Playbook for Enterprise IT',
    authors: 'ARP Security Labs',
    date: 'Feb 2025',
    readTime: '24 min read',
    tags: ['PQC', 'CRYSTALS-Kyber', 'NIST'],
    color: 'teal',
  },
  {
    id: 'r3',
    category: 'Case Study',
    title: 'How Meridian Logistics Reduced OpEx by 23% with Quantum Supply Chain',
    authors: 'ARP Client Success',
    date: 'Jan 2025',
    readTime: '12 min read',
    tags: ['Logistics', 'QUBO', 'VRP'],
    color: 'navy',
  },
];

const Research = () => (
  <section className="research" id="research">
    <div className="container">
      <div className="section-header">
        <span className="section-eyebrow">Research</span>
        <h2 className="section-title">
          Knowledge at the frontier<br/>
          <em>of quantum science.</em>
        </h2>
        <p className="section-desc">
          Our research team publishes findings on applied quantum computing in business
          contexts — from financial optimization to post-quantum security.
        </p>
      </div>

      <div className="research__grid">
        {PAPERS.map(({ id, category, title, authors, date, readTime, tags, color }) => (
          <article key={id} className={`research-card research-card--${color}`}>
            <div className="research-card__meta">
              <span className={`research-card__category research-card__category--${color}`}>
                {category}
              </span>
              <span className="research-card__date">{date}</span>
            </div>

            <h3 className="research-card__title">{title}</h3>

            <div className="research-card__tags">
              {tags.map(tag => (
                <span key={tag} className="research-tag">{tag}</span>
              ))}
            </div>

            <div className="research-card__footer">
              <span className="research-card__authors">{authors}</span>
              <a href="#" className="research-card__link">
                {readTime}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="research__cta">
        <a href="#" className="btn btn--ghost">
          View all publications
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
);

/* --- Testimonials --- */
const TESTIMONIALS = [
  {
    quote: "ARP's quantum optimization reduced our global logistics cost by 23% in the first quarter. Nothing in classical computing came close.",
    name: 'Sarah K.',
    title: 'Chief Operations Officer',
    company: 'Meridian Logistics Group',
    initials: 'SK',
    color: 'purple',
  },
  {
    quote: "The quantum financial analytics module processes our entire portfolio risk landscape in 0.3 milliseconds. Our traders have never been more confident.",
    name: 'James T.',
    title: 'Head of Quantitative Finance',
    company: 'Apex Capital Partners',
    initials: 'JT',
    color: 'teal',
  },
  {
    quote: "Post-quantum security compliance was a 2-year roadmap for us. ARP made it a 6-week deployment. The CISO and the board were speechless.",
    name: 'Priya M.',
    title: 'Chief Information Security Officer',
    company: 'Vantara Healthcare Systems',
    initials: 'PM',
    color: 'navy',
  },
];

const LOGOS = ['Meridian', 'Apex Capital', 'Vantara', 'Orbis Pharma', 'NexaBank', 'StellarMFG'];

const Testimonials = () => (
  <section className="testimonials" id="about">
    <div className="container">
      {/* Logo bar */}
      <div className="testimonials__logos">
        <span className="testimonials__logos-label">Trusted by</span>
        <div className="testimonials__logo-track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className="testimonials__logo">{l}</span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="section-header">
        <span className="section-eyebrow">Testimonials</span>
        <h2 className="section-title">
          Results that speak<br/>
          <em>in quantum leaps.</em>
        </h2>
      </div>

      {/* Cards */}
      <div className="testimonials__grid">
        {TESTIMONIALS.map(({ quote, name, title, company, initials, color }) => (
          <blockquote key={name} className={`testimonial-card testimonial-card--${color}`}>
            <div className="testimonial-card__quote">
              <svg className="testimonial-card__quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="testimonial-card__text">{quote}</p>
            </div>

            <footer className="testimonial-card__footer">
              <div className="testimonial-card__avatar" aria-hidden="true">
                {initials}
              </div>
              <div>
                <cite className="testimonial-card__name">{name}</cite>
                <p className="testimonial-card__role">{title} · {company}</p>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);

/* --- CTA --- */
const CTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sent');
    setTimeout(() => { setStatus('idle'); setEmail(''); }, 4000);
  };

  return (
    <section className="cta-section" id="contact">
      {/* Background elements */}
      <div className="cta-section__bg">
        <div className="cta-orb cta-orb--1"/>
        <div className="cta-orb cta-orb--2"/>
        <div className="cta-grid"/>
      </div>

      <div className="container">
        <div className="cta-section__inner">
          {/* Eyebrow */}
          <div className="cta-section__eyebrow">
            <span className="cta-eyebrow-dot"/>
            <span>QUANTUM ADVANTAGE AWAITS</span>
          </div>

          {/* Headline */}
          <h2 className="cta-section__headline">
            Begin your organisation's<br/>
            <em>quantum transformation.</em>
          </h2>

          <p className="cta-section__sub">
            Schedule a bespoke demonstration with our quantum architects
            and discover what ARP can unlock for your enterprise in 90 days.
          </p>

          {/* Form */}
          {status === 'idle' ? (
            <form className="cta-section__form" onSubmit={handleSubmit} noValidate>
              <div className="cta-input-wrapper">
                <svg className="cta-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  placeholder="your.name@enterprise.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="cta-input"
                  required
                />
              </div>
              <button type="submit" className="btn btn--primary cta-submit">
                Request Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          ) : (
            <div className="cta-section__success">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span>Thank you — we'll be in touch within 24 hours.</span>
            </div>
          )}

          <p className="cta-section__disclaimer">
            No credit card. No commitment. Our quantum architects will contact you within one business day.
          </p>

          {/* Feature bullets */}
          <div className="cta-section__pills">
            {['Post-Quantum Security', 'GDPR Compliant', 'ISO 27001 Certified', 'SOC 2 Type II'].map(pill => (
              <span key={pill} className="cta-pill">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Footer --- */
const FOOTER_LINKS = {
  Platform: ['Quantum Analytics', 'AI Matrix', 'Supply Chain', 'Security Suite', 'API Access'],
  Company:  ['About ARP', 'Research Lab', 'Careers', 'Press', 'Partners'],
  Resources:['Documentation', 'Quantum Primer', 'Case Studies', 'Changelog', 'Status'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer__top-rule"/>
    <div className="container">
      <div className="footer__inner">

        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-q">Q</span>
            <span className="footer__logo-word">ARP QUANTUM</span>
          </div>
          <p className="footer__brand-desc">
            Quantum-accelerated business administration intelligence for the modern enterprise.
            Built on open standards. Secured by post-quantum cryptography.
          </p>
          <div className="footer__social">
            {['X', 'Li', 'Gh', 'Yt'].map(icon => (
              <a key={icon} href="#" className="footer__social-btn" aria-label={icon}>
                {icon}
              </a>
            ))}
          </div>
          <span className="footer__iso-badge">ISO 27001 · SOC 2 Type II · GDPR</span>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category} className="footer__col">
            <h4 className="footer__col-title">{category}</h4>
            <ul className="footer__col-links">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="footer__link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copy">
          © {new Date().getFullYear()} ARP Quantum Technologies. All rights reserved.
        </p>
        <div className="footer__bottom-right">
          <span className="footer__version">
            <span className="footer__version-dot"/>
            Core v4.2.1 · Stable
          </span>
        </div>
      </div>
    </div>
  </footer>
);


const HeroSection = () => {
  return (
    <main>
      <Hero />
      <Solutions />
      <Technology />
      <Platform />
      <Research />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default HeroSection;
