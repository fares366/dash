import { useState } from 'react';
import type { JSX } from 'react';
import { Sparkles, FileText, MessageSquare, User, Star } from 'lucide-react';
import styles from './notification.module.css';
import utils from './utils.module.css';

type NotifType = 'match' | 'reply' | 'msg' | 'profile' | 'eval';

const notifications: { id: number; type: NotifType; text: string; time: string; read: boolean }[] = [
  { id: 1, type: 'match',   text: 'New offer matching your profile: Backend Engineer at Mobilis (91% match)', time: '2 min ago',  read: false },
  { id: 2, type: 'reply',   text: 'Sonatrach responded to your application — check your status',               time: '1h ago',     read: false },
  { id: 3, type: 'msg',     text: "New message from Djezzy HR: 'We'd love to schedule a call…'",               time: '3h ago',     read: false },
  { id: 4, type: 'profile', text: 'Complete your profile to improve AI matching accuracy',                     time: 'Yesterday',  read: true  },
  { id: 5, type: 'eval',    text: 'Rate your internship experience at Nextralis',                              time: '2 days ago', read: true  },
];

const iconMap: Record<NotifType, JSX.Element> = {
  match:   <Sparkles size={18} />,
  reply:   <FileText size={18} />,
  msg:     <MessageSquare size={18} />,
  profile: <User size={18} />,
  eval:    <Star size={18} />,
};

const colorMap: Record<NotifType, string> = {
  match:   'var(--teal)',
  reply:   'var(--green)',
  msg:     'var(--purple)',
  profile: 'var(--amber)',
  eval:    'var(--amber)',
};

export default function Notifications() {
  const [items, setItems] = useState(notifications);
  const unread = items.filter(n => !n.read).length;

  return (
    <div className={`${utils.pageWrap} ${utils.anim}`}>
      <div className={utils.pageHeader}>
        <div>
          <h1 className={utils.pageTitle}>Notifications</h1>
          <p className={utils.pageSub}>{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        <button
          className={`${utils.btn} ${utils.btnOutline}`}
          onClick={() => setItems(items.map(n => ({ ...n, read: true })))}
        >
          Mark all as read
        </button>
      </div>

      <div className={`${utils.card} ${styles.list}`}>
        {items.map(n => (
          <div
            key={n.id}
            className={`${styles.item} ${!n.read ? styles.itemUnread : ''}`}
            onClick={() => setItems(items.map(x => x.id === n.id ? { ...x, read: true } : x))}
          >
            <div
              className={styles.iconWrap}
              style={{
                background: colorMap[n.type] + '18',
                border: `1px solid ${colorMap[n.type]}33`,
                color: colorMap[n.type],
              }}
            >
              {iconMap[n.type]}
            </div>
            <div className={styles.itemBody}>
              <div className={`${styles.itemText} ${!n.read ? styles.itemTextUnread : styles.itemTextRead}`}>
                {n.text}
              </div>
              <div className={styles.itemTime}>{n.time}</div>
            </div>
            {!n.read && <div className={styles.dot} />}
          </div>
        ))}
      </div>
    </div>
  );
}
