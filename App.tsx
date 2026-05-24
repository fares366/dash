import { useState } from 'react';
import type { ReactNode } from 'react';
import { DashboardThemeProvider, useDashboardTheme } from './DashboardThemeContext';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Search from './Search';
import Applications from './Applications';
import AIRecommendations from './AIRecommendations';
import Messages from './Messages';
import Notifications from './Notifications';
import Analytics from './Analytics';
import styles from './dashboard.module.css';

export type Page =
  | 'dashboard'
  | 'profile'
  | 'search'
  | 'applications'
  | 'ai'
  | 'messages'
  | 'notifications'
  | 'analytics';

function Shell() {
  const { theme, toggleTheme } = useDashboardTheme();
  const [page, setPage] = useState<Page>('dashboard');

  const pageMap: Record<Page, ReactNode> = {
    dashboard:     <Dashboard onNavigate={setPage} />,
    profile:       <Profile />,
    search:        <Search />,
    applications:  <Applications />,
    ai:            <AIRecommendations />,
    messages:      <Messages />,
    notifications: <Notifications />,
    analytics:     <Analytics />,
  };

  return (
    <div className={styles.app} data-theme={theme === 'light' ? 'light' : undefined}>
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className={styles.main}>{pageMap[page]}</main>
    </div>
  );
}

export default function DashboardApp() {
  return (
    <DashboardThemeProvider>
      <Shell />
    </DashboardThemeProvider>
  );
}
