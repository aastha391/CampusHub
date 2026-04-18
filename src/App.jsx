import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/EventsPage';
import ClubsPage from './pages/ClubsPage';
import NotesPage from './pages/NotesPage';
import ResourcesPage from './pages/ResourcesPage';
import HackathonsPage from './pages/HackathonsPage';
import QnAPage from './pages/QnAPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import './index.css';

function AppContent() {
  const { user ,login} = useApp();
  const [page, setPage] = useState('dashboard');

  if (!user) return <Login onLogin={login}/>;

  const pages = {
    dashboard: <Dashboard setPage={setPage} />,
    events: <EventsPage />,
    clubs: <ClubsPage />,
    notes: <NotesPage />,
    resources: <ResourcesPage />,
    hackathons: <HackathonsPage />,
    qna: <QnAPage />,
    lostfound: <QnAPage />,
    profile: <ProfilePage />,
    admin: <AdminPage />,
  };

  return (
    <>
      <Layout page={page} setPage={setPage}>
        {pages[page] || <Dashboard setPage={setPage} />}
      </Layout>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
