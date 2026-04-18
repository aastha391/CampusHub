import { useApp } from '../context/AppContext';
import { Calendar, FileText, Users, Trophy, Sun, TrendingUp, Bell, Star } from 'lucide-react';

const COLORS = { blue: '#4361ee', purple: '#7209b7', teal: '#06b6d4', orange: '#f97316', green: '#10b981' };

export default function Dashboard({ setPage }) {
  const { user, events, notes, clubs, hackathons, announcements, notifications } = useApp();
  const todayEvents = events.filter(e => e.date.includes('Apr 22') || e.date.includes('Apr 25'));
  const myClubs = clubs.filter(c => c.joined);
  const unread = notifications.filter(n => !n.read);
  const starredAnn = announcements.filter(a => a.starred);

  const stats = [
    { label: 'Upcoming Events', value: events.length, icon: Calendar, color: COLORS.blue, page: 'events' },
    { label: 'Notes Available', value: notes.filter(n => n.approved).length, icon: FileText, color: COLORS.purple, page: 'notes' },
    { label: 'Active Clubs', value: clubs.length, icon: Users, color: COLORS.teal, page: 'clubs' },
    { label: 'Open Hackathons', value: hackathons.filter(h => h.status === 'open').length, icon: Trophy, color: COLORS.orange, page: 'hackathons' },
  ];

  return (
    <div className="animate-fade">
      {/* Greeting */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Sun size={20} color="#f59e0b" />
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'},
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
      </div>

      {/* Today Banner */}
      <div className="today-banner" style={{ marginBottom: '24px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Calendar size={20} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>Happening Today</div>
          {todayEvents.length > 0 ? (
            <div style={{ fontSize: '13px', opacity: 0.85 }}>
              {todayEvents.map(e => e.title).join(' · ')}
            </div>
          ) : (
            <div style={{ fontSize: '13px', opacity: 0.85 }}>No events today — check upcoming events</div>
          )}
        </div>
        <button onClick={() => setPage('events')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: 'white', padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)' }}>
          View All
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        {stats.map((s, i) => (
          <div key={i} className="card" onClick={() => setPage(s.page)}
            style={{ padding: '20px', cursor: 'pointer', animation: `fadeIn 0.5s ease ${i * 0.08}s both` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={20} color={s.color} />
              </div>
              <TrendingUp size={14} color="var(--accent-green)" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: s.color, marginBottom: '2px' }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Recent events */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>Upcoming Events</div>
            <button onClick={() => setPage('events')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>See all</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {events.slice(0, 4).map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--bg-primary)', borderRadius: '10px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '10px', color: 'var(--accent-blue)', fontWeight: 700 }}>{e.date.split(' ')[0].toUpperCase()}</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, lineHeight: 1 }}>{e.date.split(' ')[1]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{e.organizer} · {e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & My Clubs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Notifications preview */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={15} color="var(--accent-blue)" /> Recent Activity
              </div>
              {unread.length > 0 && <span className="badge badge-red">{unread.length} new</span>}
            </div>
            {notifications.slice(0, 3).map(n => (
              <div key={n.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', marginTop: '6px', flexShrink: 0, background: n.read ? 'var(--border)' : 'var(--accent-blue)' }} />
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: n.read ? 400 : 600 }}>{n.text}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* My clubs */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>My Clubs</div>
              <button onClick={() => setPage('clubs')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>Join more</button>
            </div>
            {myClubs.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
                You haven't joined any clubs yet
              </div>
            ) : (
              myClubs.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="avatar" style={{ background: c.color, color: 'white', fontSize: '12px' }}>{c.name.slice(0, 2)}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.members} members</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Starred announcements */}
          {starredAnn.length > 0 && (
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={15} color="#f59e0b" fill="#f59e0b" /> Starred
              </div>
              {starredAnn.slice(0, 2).map(a => (
                <div key={a.id} style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 700 }}>{a.club}: </span>{a.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
