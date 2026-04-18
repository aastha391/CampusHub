import '../styles/admin.css';
import { useState } from 'react';
import { useApp, MOCK_USERS } from '../context/AppContext';
import { Shield, CheckCircle, Trash2, Plus, BarChart3, Users, FileText, Megaphone, Calendar } from 'lucide-react';

export default function AdminPage() {
  const { events, notes, announcements, approveNote, deleteNote, approveAnnouncement, deleteAnnouncement, addEvent, showToast, updateUserRole } = useApp();
  const [tab, setTab] = useState('overview');
  const [eventModal, setEventModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Technical', organizer: '', date: '', time: '', venue: '', capacity: 100, description: '' });

  const pendingNotes = notes.filter(n => !n.approved);
  const pendingAnn = announcements.filter(a => !a.approved);

  const handleAddEvent = () => {
    if (!form.title || !form.organizer || !form.date) return showToast('Fill required fields', 'error');
    addEvent(form);
    showToast('Event added successfully! 🎉', 'success');
    setEventModal(false);
    setForm({ title: '', category: 'Technical', organizer: '', date: '', time: '', venue: '', capacity: 100, description: '' });
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'events', label: 'Events', icon: Calendar },
    { key: 'notes', label: 'Notes Approval', icon: FileText },
    { key: 'announcements', label: 'Announcements', icon: Megaphone },
    { key: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7209b7, #4361ee)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={18} color="white" />
        </div>
        <div>
          <div className="section-title" style={{ margin: 0 }}>Admin Panel</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Manage all campus content</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px',
              color: tab === t.key ? 'var(--accent-blue)' : 'var(--text-secondary)',
              borderBottom: tab === t.key ? '2px solid var(--accent-blue)' : '2px solid transparent',
              marginBottom: '-1px', transition: 'all 0.2s',
            }}>
            <t.icon size={14} />
            {t.label}
            {t.key === 'notes' && pendingNotes.length > 0 && <span style={{ background: 'var(--accent-red)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>{pendingNotes.length}</span>}
            {t.key === 'announcements' && pendingAnn.length > 0 && <span style={{ background: 'var(--accent-red)', color: 'white', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '10px' }}>{pendingAnn.length}</span>}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div>
          <div className="grid-4" style={{ marginBottom: '24px' }}>
            {[
              { label: 'Total Events', value: events.length, icon: Calendar, color: '#4361ee' },
              { label: 'Total Notes', value: notes.length, icon: FileText, color: '#7209b7' },
              { label: 'Pending Notes', value: pendingNotes.length, icon: FileText, color: '#ef4444' },
              { label: 'Pending Ann.', value: pendingAnn.length, icon: Megaphone, color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '18px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* RSVP Analytics */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>RSVP Analytics</div>
            {events.map(ev => {
              const pct = Math.round((ev.registered / ev.capacity) * 100);
              return (
                <div key={ev.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 600 }}>{ev.title}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{ev.registered}/{ev.capacity} ({pct}%)</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 90 ? 'var(--accent-red)' : pct >= 70 ? 'var(--accent-orange)' : 'var(--accent-blue)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {tab === 'events' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <button className="btn btn-primary" onClick={() => setEventModal(true)}><Plus size={14} /> Add Event</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {events.map(ev => (
              <div key={ev.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '2px' }}>{ev.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{ev.organizer} · {ev.date} · {ev.venue}</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ev.registered} RSVPs</div>
                <span className="badge badge-blue">{ev.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Approval */}
      {tab === 'notes' && (
        <div>
          {pendingNotes.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>✅ All notes approved!</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notes.map(n => (
              <div key={n.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', opacity: n.approved ? 0.6 : 1 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '2px' }}>{n.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{n.dept} · {n.sem} · by {n.uploader}</div>
                </div>
                {n.approved ? (
                  <span className="badge badge-green"><CheckCircle size={10} /> Approved</span>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-success btn-sm" onClick={() => { approveNote(n.id); showToast(`"${n.title}" approved`, 'success'); }}>
                      <CheckCircle size={13} /> Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => { deleteNote(n.id); showToast('Note deleted', 'info'); }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Approval */}
      {tab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {announcements.map(a => (
            <div key={a.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px', opacity: a.approved ? 0.6 : 1 }}>
              <div className="avatar" style={{ background: a.color, color: 'white', fontSize: '12px' }}>{a.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{a.club}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{a.message}</div>
              </div>
              {a.approved ? (
                <span className="badge badge-green"><CheckCircle size={10} /> Live</span>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-success btn-sm" onClick={() => { approveAnnouncement(a.id); showToast('Announcement published!', 'success'); }}>
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => { deleteAnnouncement(a.id); showToast('Deleted', 'info'); }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {MOCK_USERS.map(u => (
            <div key={u.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="avatar" style={{ background: u.color, color: 'white', fontSize: '12px' }}>{u.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>{u.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email} · {u.branch}</div>
              </div>
              <select defaultValue={u.role}
                style={{ padding: '6px 10px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '12px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                onChange={e => { updateUserRole(u.id, e.target.value); showToast(`Role updated for ${u.name}`, 'success'); }}>
                <option value="student">Student</option>
                <option value="clubhead">Club Head</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Add Event Modal */}
      {eventModal && (
        <div className="modal-overlay" onClick={() => setEventModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Add New Event</h3>
              <button onClick={() => setEventModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Event Title *</label>
                <input className="input" placeholder="e.g. Annual Tech Fest 2025" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {['Technical', 'Cultural', 'Business', 'Workshop', 'Sports'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Organizer *</label>
                  <input className="input" placeholder="e.g. CSE Dept" value={form.organizer} onChange={e => setForm({ ...form, organizer: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input className="input" placeholder="e.g. May 20" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input className="input" placeholder="e.g. 10:00 AM" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input className="input" placeholder="e.g. Auditorium A" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input className="input" type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: parseInt(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input" placeholder="Describe the event..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEventModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddEvent}><Plus size={14} /> Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
