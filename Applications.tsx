import { useState } from 'react';
import { Eye, XCircle } from 'lucide-react';
import styles from './application.module.css';
import utils from './utils.module.css';

type Status = 'pending' | 'accepted' | 'rejected';

const apps = [
  { id: 1, title: 'Front-End Developer Intern', company: 'Sonatrach',     date: '12 Jul 2025', status: 'pending'  as Status },
  { id: 2, title: 'ML Engineer Intern',         company: 'Nextralis',     date: '5 Jul 2025',  status: 'accepted' as Status },
  { id: 3, title: 'Full-Stack Intern',          company: 'Cevital Group', date: '28 Jun 2025', status: 'rejected' as Status },
  { id: 4, title: 'DevOps Intern',              company: 'NCA Rouiba',    date: '20 Jun 2025', status: 'pending'  as Status },
];

const statusMap: Record<Status, { label: string; cls: string; color: string }> = {
  pending:  { label: 'Pending',  cls: utils.tagYellow, color: 'var(--amber)' },
  accepted: { label: 'Accepted', cls: utils.tagGreen,  color: 'var(--green)' },
  rejected: { label: 'Rejected', cls: utils.tagRed,    color: 'var(--red)'   },
};

const tabs = ['all', 'pending', 'accepted', 'rejected'] as const;
type Tab = typeof tabs[number];

export default function Applications() {
  const [tab, setTab] = useState<Tab>('all');
  const filtered = tab === 'all' ? apps : apps.filter(a => a.status === tab);

  const counts: Record<Tab, number> = {
    all:      apps.length,
    pending:  apps.filter(a => a.status === 'pending').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <h1 className={utils.pageTitle}>My Applications</h1>
          <p className={utils.pageSub}>Track all your submitted applications</p>
        </div>
      </div>

      <div className={`${utils.grid4} ${styles.statGrid}`}>
        {tabs.map(t => {
          const color = t === 'all' ? 'var(--teal)' : statusMap[t as Status]?.color;
          return (
            <div
              key={t}
              className={`${utils.card} ${styles.statCard} ${tab === t ? styles.statCardActive : ''}`}
              style={{ borderColor: tab === t ? color : undefined } as React.CSSProperties}
              onClick={() => setTab(t)}
            >
              <div className={styles.statValue} style={{ color }}>{counts[t]}</div>
              <div className={styles.statLabel}>{t.charAt(0).toUpperCase() + t.slice(1)}</div>
            </div>
          );
        })}
      </div>

      <div className={utils.card}>
        <div className={utils.tabs} style={{ marginBottom: 20 }}>
          {tabs.map(t => (
            <button key={t} className={`${utils.tab} ${tab === t ? utils.tabActive : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className={utils.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td><span style={{ fontWeight: 600 }}>{a.title}</span></td>
                  <td><span style={{ color: 'var(--text-dim)' }}>{a.company}</span></td>
                  <td><span style={{ color: 'var(--text-dim)', fontSize: 12.5 }}>{a.date}</span></td>
                  <td><span className={`${utils.tag} ${statusMap[a.status].cls}`}>{statusMap[a.status].label}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <button className={`${utils.btn} ${utils.btnOutline} ${utils.btnSm}`}><Eye size={12} /> View</button>
                      {a.status === 'pending' && <button className={`${utils.btn} ${utils.btnDanger} ${utils.btnSm}`}><XCircle size={12} /> Withdraw</button>}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>
                    No applications in this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
