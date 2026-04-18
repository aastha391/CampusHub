import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar, Users, FileText, BookOpen, Trophy, Bell, LogOut,
  Menu, X, Zap, Home, MessageSquare, Search, Package, ChevronRight
} from 'lucide-react';

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'clubs', label: 'Club Announcements', icon: Users },
  { key: 'notes', label: 'Notes Sharing', icon: FileText },
  { key: 'resources', label: 'Resources', icon: BookOpen },
  { key: 'hackathons', label: 'Hackathons', icon: Trophy },
  { key: 'qna', label: 'Q&A Board', icon: MessageSquare },
  { key: 'lostfound', label: 'Lost & Found', icon: Package },
  { key: 'profile', label: 'My Profile', icon: Search },
];

const ADMIN_NAV = [
  { key: 'admin', label: 'Admin Panel', icon: Zap },
];

export default function Layout({ page, setPage, children }) {
  const { user, logout, notifications, unreadCount, markAllRead } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const allNav = user?.role === 'admin' ? [...NAV, ...ADMIN_NAV] : NAV;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '240px' : '64px', flexShrink: 0,
        background: 'var(--bg-sidebar)', transition: 'width 0.3s ease',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            width: '36px', height: '36px', flexShrink: 0, borderRadius: '10px',
            background: 'linear-gradient(135deg, #4361ee, #7209b7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'white' }}>
                Campus<span style={{ color: '#4361ee' }}>Hub</span>
              </div>
              <div style={{ fontSize: '10px', color: '#475569', letterSpacing: '0.5px', textTransform: 'uppercase' }}>digital campus</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
          {allNav.map(n => {
            const active = page === n.key;
            return (
              <button key={n.key} onClick={() => setPage(n.key)}
                title={!sidebarOpen ? n.label : ''}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 12px', border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(67,97,238,0.25)' : 'transparent',
                  borderRadius: '10px', marginBottom: '2px',
                  color: active ? 'white' : 'var(--text-sidebar)',
                  fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: active ? 700 : 500,
                  transition: 'all 0.2s', whiteSpace: 'nowrap', textAlign: 'left',
                  borderLeft: active ? '3px solid #4361ee' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <n.icon size={18} style={{ flexShrink: 0, color: active ? '#4361ee' : 'inherit' }} />
                {sidebarOpen && <span>{n.label}</span>}
                {sidebarOpen && active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {sidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '4px' }}>
              <div className="avatar" style={{ background: user?.color, color: 'white', fontSize: '12px' }}>{user?.avatar}</div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'capitalize' }}>{user?.role} · {user?.branch}</div>
              </div>
            </div>
          )}
          <button onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
              padding: '10px 12px', border: 'none', cursor: 'pointer',
              background: 'transparent', borderRadius: '10px',
              color: '#ef4444', fontFamily: 'var(--font-body)', fontSize: '13.5px', fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '240px' : '64px', transition: 'margin-left 0.3s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Topbar */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(240,244,255,0.85)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)', padding: '0 24px',
          height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex' }}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {allNav.find(n => n.key === page)?.label || 'Dashboard'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Role badge */}
            <span className={`badge badge-${user?.role === 'admin' ? 'purple' : user?.role === 'clubhead' ? 'teal' : 'blue'}`}>
              {user?.role === 'admin' ? '🛡️ Admin' : user?.role === 'clubhead' ? '📢 Club Head' : '🎓 Student'}
            </span>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead(); }}
                style={{
                  background: 'white', border: '1px solid var(--border)', borderRadius: '10px',
                  width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <Bell size={18} color="var(--text-secondary)" style={notifOpen ? { animation: 'ringPop 0.4s ease' } : {}} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px', background: 'var(--accent-red)',
                    color: 'white', fontSize: '10px', fontWeight: 800, width: '18px', height: '18px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid white',
                  }}>{unreadCount}</span>
                )}
              </button>

              {notifOpen && (
                <div style={{
                  position: 'absolute', right: 0, top: '46px', width: '320px',
                  background: 'white', borderRadius: '14px', border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)', zIndex: 200, animation: 'bounceIn 0.3s ease',
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>Notifications</span>
                    <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>Mark all read</button>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{
                        padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                        borderBottom: '1px solid var(--border)', background: n.read ? 'transparent' : 'rgba(67,97,238,0.04)',
                        transition: 'background 0.2s',
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '5px', flexShrink: 0, background: n.read ? 'var(--border)' : n.type === 'success' ? 'var(--accent-green)' : n.type === 'warning' ? 'var(--accent-orange)' : 'var(--accent-blue)' }} />
                        <div>
                          <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: n.read ? 400 : 600 }}>{n.text}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="avatar" style={{ background: user?.color, color: 'white', cursor: 'pointer', fontSize: '13px' }}
              onClick={() => setPage('profile')}>
              {user?.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', animation: 'fadeIn 0.4s ease both' }}>
          {children}
        </main>
      </div>

      {/* Click outside notif */}
      {notifOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 199 }} onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
