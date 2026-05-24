import { Sparkles, CheckCircle, XCircle, Bookmark, ArrowRight, TrendingUp } from 'lucide-react';
import styles from './ai-recomand.module.css';
import utils from './utils.module.css';

const internships = [
  { id: 1, title: 'Backend Engineer Intern',    company: 'Mobilis',   location: 'Algiers',     duration: '6 months', type: 'On-site', paid: true,  match: 91, skills: ['Node.js', 'PostgreSQL'], missing: ['Docker']   },
  { id: 2, title: 'Front-End Developer Intern', company: 'Sonatrach', location: 'Algiers',     duration: '6 months', type: 'On-site', paid: true,  match: 87, skills: ['React', 'TypeScript'],   missing: ['GraphQL']  },
  { id: 3, title: 'Data Science Intern',        company: 'Djezzy',    location: 'Oran',        duration: '3 months', type: 'Hybrid',  paid: true,  match: 78, skills: ['Python', 'ML', 'SQL'],   missing: ['Spark']    },
  { id: 4, title: 'Mobile Dev (React Native)',  company: 'CPA Bank',  location: 'Algiers',     duration: '5 months', type: 'Hybrid',  paid: true,  match: 72, skills: ['React Native'],          missing: ['API']      },
  { id: 5, title: 'UI/UX Designer Intern',      company: 'Ooredoo',   location: 'Constantine', duration: '4 months', type: 'Remote',  paid: false, match: 65, skills: ['Figma', 'CSS'],          missing: ['Adobe XD'] },
];

function MatchRing({ score }: { score: number }) {
  const r = 22, cx = 28;
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
        <span style={{ fontSize: 14, fontWeight: 800, color }}>{score}%</span>
        <span className={utils.matchScoreLbl}>match</span>
      </div>
    </div>
  );
}

export default function AIRecommendations() {
  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <div className={styles.heroBadge}><Sparkles size={13} /> AI Powered</div>
          <h1 className={utils.pageTitle}>AI Recommendations</h1>
          <p className={utils.pageSub}>Offers curated for your profile, skills & preferences</p>
        </div>
      </div>

      <div className={`${utils.card} ${styles.banner}`}>
        <div className={styles.bannerIcon}><TrendingUp size={28} /></div>
        <div className={styles.bannerText}>
          <strong>Your Compatibility Score is <span style={{ color: 'var(--teal)' }}>78 / 100</span></strong>
          <p>Complete your profile and add missing skills to unlock more high-match offers</p>
        </div>
        <button className={`${utils.btn} ${utils.btnPrimary} ${utils.btnSm}`} style={{ flexShrink: 0 }}>
          Improve Score <ArrowRight size={12} />
        </button>
      </div>

      <div className={styles.list}>
        {internships.map((j, i) => (
          <div key={j.id}
            className={`${utils.card} ${styles.aiCard} ${j.match >= 80 ? styles.topMatch : ''}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className={styles.cardInner}>
              <MatchRing score={j.match} />
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{j.title}</h3>
                    <p className={styles.cardMeta}>
                      {j.company} · {j.location} · {j.duration} · {j.type}
                      {j.paid && <span style={{ color: 'var(--green)', fontWeight: 600, marginLeft: 8 }}>Paid</span>}
                    </p>
                  </div>
                  {j.match >= 80 && <span className={`${utils.tag} ${utils.tagTeal}`}>⭐ Top Match</span>}
                </div>

                <div className={styles.skillsSection}>
                  <p className={styles.skillsLabel}>Skills Match</p>
                  <div className={styles.skillsList}>
                    {j.skills.map(s => <span key={s} className={`${utils.tag} ${utils.tagGreen}`}><CheckCircle size={10} /> {s}</span>)}
                    {j.missing.map(s => <span key={s} className={`${utils.tag} ${utils.tagRed}`}><XCircle size={10} /> {s}</span>)}
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={`${utils.btn} ${utils.btnPrimary} ${utils.btnSm}`}>Apply Now</button>
                  <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`}><Bookmark size={12} /> Save</button>
                  <span className={styles.missingHint}>
                    Missing: <span style={{ color: 'var(--red)' }}>{j.missing.join(', ')}</span> · Add it to boost your score
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
