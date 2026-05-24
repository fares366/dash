import { useState } from 'react';
import { Search as SearchIcon, MapPin, Clock, GraduationCap, X, Bookmark, ArrowRight } from 'lucide-react';
import styles from './search.module.css';
import utils from './utils.module.css';

const internships = [
  { id: 1, title: 'Front-End Developer Intern',       company: 'Sonatrach', location: 'Algiers, Algeria', duration: '6 months', type: 'On-site', level: 'Master',  paid: true,  match: 91, start: 'Sept 2025', skills: ['React', 'TypeScript', 'Three.js'],   domain: 'Engineering', missing: null        },
  { id: 2, title: 'Data Science Intern',              company: 'Djezzy',    location: 'Oran, Algeria',    duration: '3 months', type: 'Hybrid',  level: 'Master',  paid: true,  match: 87, start: 'Oct 2025',  skills: ['Python', 'ML', 'SQL'],               domain: 'Data',        missing: null        },
  { id: 3, title: 'UI/UX Designer Intern',            company: 'Ooredoo',   location: 'Constantine',      duration: '4 months', type: 'Remote',  level: 'Licence', paid: false, match: 65, start: 'Nov 2025',  skills: ['Figma', 'Adobe XD', 'CSS'],          domain: 'Design',      missing: 'Figma'     },
  { id: 4, title: 'Backend Engineer Intern',          company: 'Mobilis',   location: 'Algiers',          duration: '6 months', type: 'On-site', level: 'Master',  paid: true,  match: 91, start: 'Sept 2025', skills: ['Node.js', 'PostgreSQL', 'Docker'],   domain: 'Engineering', missing: 'Docker'    },
  { id: 5, title: 'Mobile Dev Intern (React Native)', company: 'CPA Bank',  location: 'Algiers',          duration: '5 months', type: 'Hybrid',  level: 'Licence', paid: true,  match: 72, start: 'Oct 2025',  skills: ['React Native', 'JavaScript', 'API'], domain: 'Mobile',      missing: null        },
];

function MatchRing({ score }: { score: number }) {
  const r = 20, cx = 26;
  const circ = 2 * Math.PI * r;
  const prog = (score / 100) * circ;
  const color = score >= 80 ? 'var(--teal)' : score >= 65 ? 'var(--amber)' : 'var(--red)';
  return (
    <div className={utils.matchRing}>
      <svg width={cx * 2} height={cx * 2} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--badge-bg)" strokeWidth={4} />
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${prog} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className={utils.matchScoreText}>
        <span style={{ fontSize: 12, fontWeight: 800, color }}>{score}%</span>
        <span className={utils.matchScoreLbl}>match</span>
      </div>
    </div>
  );
}

export default function Search() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<typeof internships[0] | null>(null);

  const filtered = internships.filter(j =>
    j.title.toLowerCase().includes(q.toLowerCase()) ||
    j.company.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <h1 className={utils.pageTitle}>Search Internships</h1>
          <p className={utils.pageSub}>Browse {internships.length} available offers matched for you</p>
        </div>
      </div>

      <div className={styles.compatBanner}>
        <div className={styles.compatLeft}>
          <span className={styles.compatIcon}>✦</span>
          <div>
            <span className={styles.compatScore}>Your Compatibility Score is <strong>78/100</strong></span>
            <span className={styles.compatSub}>Complete your profile and add missing skills to unlock more high-match offers</span>
          </div>
        </div>
        <button className={`${utils.btn} ${utils.btnPrimary} ${utils.btnSm}`}>Improve Score →</button>
      </div>

      <div className={`${utils.card} ${styles.filtersCard}`}>
        <div className={utils.searchWrap}>
          <span className={utils.searchIcon}><SearchIcon size={15} /></span>
          <input
            className={utils.searchInput}
            placeholder="Search by title, company or skill…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
        <div className={styles.filterRow}>
          {([
            ['Domain',   ['All', 'Engineering', 'Data', 'Design', 'Mobile']],
            ['Duration', ['All', '1–2 months', '3 months', '4–6 months']],
            ['Type',     ['All', 'On-site', 'Remote', 'Hybrid']],
            ['Level',    ['All', 'Licence', 'Master']],
            ['Pay',      ['All', 'Paid', 'Unpaid']],
          ] as [string, string[]][]).map(([label, opts]) => (
            <select key={label} className={utils.filterSelect} style={{ width: 'auto' }}>
              {opts.map(o => <option key={o}>{o === 'All' ? `${label}: All` : o}</option>)}
            </select>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.results}>
          <p className={styles.count}>{filtered.length} results · sorted by AI match</p>
          {filtered.map(j => (
            <div
              key={j.id}
              className={`${styles.card} ${selected?.id === j.id ? styles.cardActive : ''}`}
              onClick={() => setSelected(j)}
            >
              <div className={styles.cardInner}>
                <div className={styles.logo}>🏢</div>
                <div className={styles.info}>
                  <div className={styles.header}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {(j.match >= 80 || j.paid) && (
                        <div className={styles.cardTopRow}>
                          {j.match >= 80 && <span className={styles.topMatchBadge}>⭐ Top Match</span>}
                          {j.paid && <span className={styles.paidBadge}>💰 Paid</span>}
                        </div>
                      )}
                      <div className={styles.title}>{j.title}</div>
                      <div className={styles.company}>{j.company} · {j.location}</div>
                    </div>
                    <MatchRing score={j.match} />
                  </div>
                  <div className={styles.tagsRow}>
                    <span className={`${utils.tag} ${utils.tagMuted}`}><Clock size={10} /> {j.duration}</span>
                    <span className={`${utils.tag} ${utils.tagMuted}`}><MapPin size={10} /> {j.type}</span>
                    <span className={`${utils.tag} ${utils.tagMuted}`}><GraduationCap size={10} /> {j.level}</span>
                    <span className={`${utils.tag} ${utils.tagTeal}`}>{j.domain}</span>
                  </div>
                  <div className={styles.skills}>
                    {j.skills.map(s => <span key={s} className={utils.skillTag}>✓ {s}</span>)}
                  </div>
                  {j.missing && (
                    <p className={styles.missingNote}>⚠ Missing: <span>{j.missing}</span> · Add it to boost your score</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className={styles.detail}>
            <div className={`${utils.card} ${styles.detailCard}`} style={{ border: '1px solid var(--teal-mid)', boxShadow: 'var(--shadow-teal)' }}>
              <div className={styles.detailHeader}>
                <div className={styles.logo} style={{ fontSize: 26 }}>🏢</div>
                <button className={`${utils.btn} ${utils.btnGhost} ${utils.btnSm}`} onClick={() => setSelected(null)}><X size={14} /></button>
              </div>
              <h3 className={styles.detailTitle}>{selected.title}</h3>
              <p className={styles.detailCompany}>{selected.company} · {selected.location}</p>

              <div className={styles.scoreWrap}>
                <div className={styles.score}>{selected.match}%</div>
                <div className={styles.scoreLabel}>AI Compatibility Score</div>
                <div className={utils.progressBar} style={{ width: 180, margin: '8px auto 0' }}>
                  <div className={utils.progressFill} style={{ width: `${selected.match}%` }} />
                </div>
              </div>

              <div className={utils.divider} />

              <div className={styles.metaGrid}>
                {[['Location', selected.location], ['Duration', selected.duration], ['Start Date', selected.start], ['Level', selected.level]].map(([k, v]) => (
                  <div key={k} className={styles.metaItem}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <p className={styles.sectionLabel}>Required Skills</p>
                {selected.skills.map(s => (
                  <div key={s} className={styles.skillRow}>
                    <span className={utils.skillTag}><span className={`${utils.dot} ${utils.dotAdv}`} />{s}</span>
                    <span className={`${utils.tag} ${utils.tagGreen}`} style={{ fontSize: 10.5 }}>✓ You have this</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`${utils.btn} ${utils.btnPrimary}`} style={{ flex: 1 }}>Apply Now <ArrowRight size={13} /></button>
                <button className={`${utils.btn} ${utils.btnOutline}`}><Bookmark size={14} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
