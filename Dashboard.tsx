import { Sparkles, FileText, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import type { Page } from './App';
import styles from './dashboard-page.module.css';
import utils from './utils.module.css';

type Status = 'pending' | 'accepted' | 'rejected';

const statCards = [
  { label: 'AI Matches',    value: '12', sub: '+3 today',     subGreen: true,  icon: <Sparkles size={17} />,      tone: 'teal'   },
  { label: 'Applications',  value: '4',  sub: '2 pending',    subGreen: false, icon: <FileText size={17} />,      tone: 'amber'  },
  { label: 'Profile Views', value: '28', sub: '+7 this week', subGreen: true,  icon: <Eye size={17} />,           tone: 'purple' },
  { label: 'Student Chats', value: '3',  sub: '2 unread',     subGreen: false, icon: <MessageSquare size={17} />, tone: 'blue'   },
];

const recommendations = [
  { id: 1, title: 'Front-End Developer Intern', company: 'Sonatrach', location: 'Algiers',     duration: '6 months', mode: 'On-site', match: 91 },
  { id: 2, title: 'Data Science Intern',        company: 'Djezzy',    location: 'Oran',        duration: '3 months', mode: 'Hybrid',  match: 87 },
  { id: 3, title: 'UI/UX Designer Intern',      company: 'Ooredoo',   location: 'Constantine', duration: '4 months', mode: 'Remote',  match: 76 },
];

const applications: { id: number; role: string; meta: string; status: Status }[] = [
  { id: 1, role: 'Front-End Developer Intern', meta: 'Sonatrach · 12 Jul 2025',     status: 'pending'  },
  { id: 2, role: 'ML Engineer Intern',         meta: 'Nextralis · 5 Jul 2025',      status: 'accepted' },
  { id: 3, role: 'Full-Stack Intern',          meta: 'Cevital Group · 28 Jun 2025', status: 'rejected' },
];

const appHistory: { id: number; role: string; company: string; date: string; match: number; status: Status }[] = [
  { id: 1, role: 'Front-End Developer Intern', company: 'Sonatrach', date: '12 Jul 2025', match: 87, status: 'pending'  },
  { id: 2, role: 'ML Engineer Intern',         company: 'Nextralis', date: '5 Jul 2025',  match: 91, status: 'accepted' },
  { id: 3, role: 'Full-Stack Intern',          company: 'Cevital',   date: '28 Jun 2025', match: 68, status: 'rejected' },
  { id: 4, role: 'DevOps Intern',              company: 'NCA Rouiba',date: '20 Jun 2025', match: 72, status: 'pending'  },
];

const topSkills = [
  { name: 'Docker',     demand: 85, color: 'var(--red)'   },
  { name: 'React',      demand: 78, color: 'var(--teal)'  },
  { name: 'TypeScript', demand: 72, color: 'var(--teal)'  },
  { name: 'GraphQL',    demand: 61, color: 'var(--purple)' },
  { name: 'Python',     demand: 65, color: 'var(--amber)' },
];

const statusMap: Record<Status, { label: string; cls: string }> = {
  pending:  { label: 'Pending',  cls: utils.tagYellow },
  accepted: { label: 'Accepted', cls: utils.tagGreen  },
  rejected: { label: 'Rejected', cls: utils.tagRed    },
};

function MatchRing({ score }: { score: number }) {
  const r = 20, cx = 26;
  const circ = 2 * Math.PI * r;
  const prog = (score / 100) * circ;
  return (
    <div className={utils.matchRing}>
      <svg width={cx * 2} height={cx * 2} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--badge-bg)" strokeWidth={4} />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--teal)" strokeWidth={4}
          strokeDasharray={`${prog} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className={utils.matchScoreText}>
        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--teal)' }}>{score}%</span>
        <span className={utils.matchScoreLbl}>match</span>
      </div>
    </div>
  );
}

export default function Dashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <h1 className={utils.pageTitle}>Welcome back, <span style={{ color: 'var(--teal)' }}>Amira</span></h1>
          <p className={utils.pageSub}>Here's your activity snapshot for today</p>
        </div>
      </div>

      <div className={`${utils.grid4} ${styles.statGrid}`}>
        {statCards.map((card, i) => (
          <div key={card.label} className={`${utils.card} ${styles.statCard}`} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className={`${styles.statIcon} ${styles[card.tone as keyof typeof styles]}`}>{card.icon}</div>
            <div className={styles.statLabel}>{card.label}</div>
            <div className={styles.statValue}>{card.value}</div>
            <div className={`${styles.statSub} ${card.subGreen ? styles.statSubGreen : ''}`}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <section className={utils.card}>
          <div className={styles.panelHead}>
            <div>
              <h3 className={styles.panelTitle}>AI Recommendations</h3>
              <p className={styles.panelSub}>Curated for your profile</p>
            </div>
            <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`} onClick={() => onNavigate('ai')}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className={styles.recList}>
            {recommendations.map(item => (
              <div key={item.id} className={styles.recCard}>
                <div className={styles.companyLogo}>🏢</div>
                <div className={styles.recInfo}>
                  <strong>{item.title}</strong>
                  <div className={styles.recMeta}>{item.company} · {item.location}</div>
                  <div className={styles.tags}>
                    <span className={`${utils.tag} ${utils.tagMuted}`}>{item.duration}</span>
                    <span className={`${utils.tag} ${utils.tagMuted}`}>{item.mode}</span>
                  </div>
                </div>
                <MatchRing score={item.match} />
              </div>
            ))}
          </div>
        </section>

        <div className={styles.rightCol}>
          <section className={utils.card}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelTitle}>My Applications</h3>
              <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`} onClick={() => onNavigate('applications')}>
                View all <ArrowRight size={12} />
              </button>
            </div>
            {applications.map(app => {
              const s = statusMap[app.status];
              return (
                <div key={app.id} className={styles.appRow}>
                  <div>
                    <strong className={styles.appTitle}>{app.role}</strong>
                    <span className={styles.appMeta}>{app.meta}</span>
                  </div>
                  <span className={`${utils.tag} ${s.cls}`}>{s.label}</span>
                </div>
              );
            })}
          </section>

          <section className={utils.card}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelTitle}>Application History</h3>
              <span className={`${utils.tag} ${utils.tagMuted}`} style={{ fontSize: 10.5 }}>Match score with AI compatibility</span>
            </div>
            <div style={{ marginTop: 10 }}>
              {appHistory.map(app => {
                const s = statusMap[app.status];
                const matchColor = app.match >= 80 ? 'var(--teal)' : app.match >= 70 ? 'var(--amber)' : 'var(--red)';
                return (
                  <div key={app.id} className={styles.appRow}>
                    <span className={`${utils.tag} ${s.cls}`} style={{ fontSize: 10.5, minWidth: 64, textAlign: 'center' }}>{s.label}</span>
                    <div style={{ flex: 1 }}>
                      <strong className={styles.appTitle}>{app.role}</strong>
                      <span className={styles.appMeta}>{app.company} · {app.date}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: matchColor }}>{app.match}%</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={utils.card}>
            <div className={styles.panelHead}>
              <h3 className={styles.panelTitle}>Top In-Demand Skills</h3>
              <span className={`${utils.tag} ${utils.tagMuted}`} style={{ fontSize: 10.5 }}>Most requested in your target domains</span>
            </div>
            <div style={{ marginTop: 14 }}>
              {topSkills.map((skill, i) => (
                <div key={skill.name} className={styles.skillRow}>
                  <div className={styles.skillMeta}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: skill.color, display: 'inline-block', flexShrink: 0 }} />
                      {skill.name}
                    </strong>
                    <span>{skill.demand}% of offers</span>
                  </div>
                  <div className={utils.progressBar}>
                    <div className={utils.progressFill} style={{ width: `${skill.demand}%`, background: skill.color, animationDelay: `${0.2 + i * 0.1}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
