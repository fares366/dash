import { useState } from 'react';
import { CheckCircle, Circle, Upload, X } from 'lucide-react';
import styles from './profile.module.css';
import utils from './utils.module.css';

const tabs = ['info', 'skills', 'preferences', 'documents'] as const;
type Tab = typeof tabs[number];

const skills = [
  { name: 'React',          level: 'Advanced'     },
  { name: 'JavaScript',     level: 'Advanced'     },
  { name: 'TypeScript',     level: 'Intermediate' },
  { name: 'CSS / Tailwind', level: 'Advanced'     },
  { name: 'Node.js',        level: 'Intermediate' },
  { name: 'Python',         level: 'Beginner'     },
  { name: 'Git',            level: 'Advanced'     },
];

const levelCls: Record<string, string> = {
  Advanced:     utils.tagTeal,
  Intermediate: utils.tagYellow,
  Beginner:     utils.tagMuted,
};
const dotCls: Record<string, string> = {
  Advanced:     utils.dotAdv,
  Intermediate: utils.dotMid,
  Beginner:     utils.dotBeg,
};

export default function Profile() {
  const [tab, setTab] = useState<Tab>('info');

  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <h1 className={utils.pageTitle}>My Profile</h1>
          <p className={utils.pageSub}>Manage your student profile and documents</p>
        </div>
        <button className={`${utils.btn} ${utils.btnPrimary}`}><CheckCircle size={14} /> Save Changes</button>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={`${utils.card} ${styles.avatarCard}`}>
            <div className={styles.avatarLg}>A</div>
            <div className={styles.avatarName}>Amira Benali</div>
            <div className={styles.avatarLevel}>Master 2 · Computer Science</div>
            <div className={styles.avatarUni}>University of Oran 1</div>
            <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`} style={{ width: '100%' }}>
              <Upload size={12} /> Change Photo
            </button>
          </div>

          <div className={`${utils.card} ${styles.strengthCard}`}>
            <div className={styles.strengthTitle}>Profile Strength</div>
            <div className={utils.completionBar}>
              <div className={utils.completionFill} style={{ width: '75%' }} />
            </div>
            <div className={styles.strengthPct}>75% Complete</div>
            {[
              { label: 'Add LinkedIn URL', done: false },
              { label: 'Upload CV',        done: true  },
              { label: 'Add skills',       done: true  },
              { label: 'Set preferences',  done: false },
            ].map((item, i) => (
              <div key={i} className={styles.checkItem}>
                {item.done
                  ? <CheckCircle size={13} color="var(--green)" />
                  : <Circle size={13} color="var(--muted)" />
                }
                <span style={{
                  textDecoration: item.done ? 'line-through' : 'none',
                  color: item.done ? 'var(--muted)' : 'var(--text)',
                  fontSize: 12,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={utils.tabs} style={{ marginBottom: 20 }}>
            {tabs.map(t => (
              <button key={t} className={`${utils.tab} ${tab === t ? utils.tabActive : ''}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'info' && (
            <div className={utils.card}>
              <h3 className={styles.cardTitle}>Personal Information</h3>
              <p className={styles.cardSub}>Your basic details visible to recruiters</p>
              <div className={styles.formGrid}>
                {[
                  ['First Name', 'Amira'], ['Last Name', 'Benali'],
                  ['Email', 'amira.benali@gmail.com'], ['Phone', '+213 555 123 456'],
                  ['University', 'University of Oran 1'], ['Level', 'Master 2'],
                  ['Specialty', 'Computer Science'], ['Graduation Year', '2026'],
                ].map(([l, v]) => (
                  <div key={l} className={utils.formGroup}>
                    <label className={utils.formLabel}>{l}</label>
                    <input className={utils.formInput} defaultValue={v} />
                  </div>
                ))}
              </div>
              <div className={utils.formGroup}>
                <label className={utils.formLabel}>About Me</label>
                <textarea className={utils.formInput} defaultValue="Passionate software engineering student specializing in frontend development. Looking for a 6-month internship in web or mobile development." />
              </div>
            </div>
          )}

          {tab === 'skills' && (
            <div className={utils.card}>
              <h3 className={styles.cardTitle}>Skills & Technologies</h3>
              <p className={styles.cardSub}>Add skills to improve AI matching accuracy</p>
              <div>
                {skills.map((s, i) => (
                  <div key={i} className={styles.skillItem}>
                    <span className={utils.skillTag}>
                      <span className={`${utils.dot} ${dotCls[s.level]}`} />
                      {s.name}
                    </span>
                    <div className={styles.skillActions}>
                      <span className={`${utils.tag} ${levelCls[s.level]}`}>{s.level}</span>
                      <button className={`${utils.btn} ${utils.btnGhost} ${utils.btnSm}`} style={{ color: 'var(--red)' }}><X size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.addRow}>
                <input className={utils.formInput} placeholder="Add a skill…" style={{ flex: 1 }} />
                <select className={utils.filterSelect} style={{ width: 'auto' }}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <button className={`${utils.btn} ${utils.btnPrimary}`}>+ Add</button>
              </div>
            </div>
          )}

          {tab === 'preferences' && (
            <div className={utils.card}>
              <h3 className={styles.cardTitle}>Internship Preferences</h3>
              <p className={styles.cardSub}>Tell the AI what kind of internship you're looking for</p>
              <div className={styles.formGrid}>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Preferred Sectors</label>
                  <div className={styles.prefTags}>
                    {['Web Dev', 'Data Science', 'Mobile', 'DevOps', 'AI/ML', 'Design'].map(s => (
                      <span key={s} className={`${utils.tag} ${['Web Dev', 'Data Science', 'Mobile'].includes(s) ? utils.tagTeal : utils.tagMuted}`} style={{ cursor: 'pointer' }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Work Type</label>
                  <div className={styles.prefTags}>
                    {['On-site', 'Remote', 'Hybrid'].map(t => (
                      <span key={t} className={`${utils.tag} ${t === 'Hybrid' ? utils.tagTeal : utils.tagMuted}`} style={{ cursor: 'pointer' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Preferred Location</label>
                  <input className={utils.formInput} defaultValue="Algiers, Algeria" />
                </div>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Duration</label>
                  <select className={utils.formInput}>
                    <option>4-6 months</option><option>1-3 months</option><option>6+ months</option>
                  </select>
                </div>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Start Date</label>
                  <input className={utils.formInput} type="date" defaultValue="2025-09-01" />
                </div>
                <div className={utils.formGroup}>
                  <label className={utils.formLabel}>Compensation</label>
                  <select className={utils.formInput}>
                    <option>Paid preferred</option><option>Paid only</option><option>No preference</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab === 'documents' && (
            <div className={utils.card}>
              <h3 className={styles.cardTitle}>Documents</h3>
              <p className={styles.cardSub}>Upload your CV and cover letter</p>
              {[
                { label: 'Curriculum Vitae (CV)', uploaded: true,  filename: 'Amira_Benali_CV_2025.pdf', size: '245 KB' },
                { label: 'Cover Letter',          uploaded: false },
              ].map((doc, i) => (
                <div key={i} className={`${styles.docCard} ${doc.uploaded ? styles.docCardUploaded : ''}`}>
                  <div>
                    <div className={styles.docTitle}>{doc.label}</div>
                    <div className={styles.docStatus} style={{ color: doc.uploaded ? 'var(--green)' : 'var(--muted)' }}>
                      {doc.uploaded ? `✓ Uploaded: ${doc.filename} · ${doc.size}` : 'No file uploaded yet'}
                    </div>
                  </div>
                  <div className={styles.docActions}>
                    {doc.uploaded && <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`}>Preview</button>}
                    <button className={`${utils.btn} ${utils.btnPrimary} ${utils.btnSm}`}><Upload size={12} /> {doc.uploaded ? 'Update' : 'Upload'}</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
