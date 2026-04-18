import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, AlertTriangle, Users, Plus, Check } from 'lucide-react';

const CLUB_COLORS = ['blue','teal','orange','green','purple','red'];

export default function ClubsPage() {
  const { announcements, toggleStar, clubs, joinClub, user, showToast, addAnnouncement } = useApp();
  const [tab, setTab] = useState('announcements');
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ club: '', message: '', urgent: false });

  const handleAdd = () => {
    if (!form.club || !form.message) return;
    addAnnouncement({ ...form, initials: form.club.slice(0, 2).toUpperCase(), color: '#4361ee' });
    showToast('Announcement submitted' + (user.role !== 'admin' ? ' — pending approval' : ''), 'success');
    setForm({ club: '', message: '', urgent: false });
    setAddModal(false);
  };

  return (
    <div className="animate-fade">
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[['announcements', '📢 Announcements'], ['clubs', '🏫 Clubs Directory']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'} btn-sm`}>{l}</button>
        ))}
        {(user.role === 'admin' || user.role === 'clubhead') && (
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setAddModal(true)}>
            <Plus size={14} /> Post Announcement
          </button>
        )}
      </div>

      {tab === 'announcements' && (
        <>
          <div className="section-title">Club Announcements</div>
          <div className="section-sub">Stay updated with clubs and departments</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {announcements.filter(a => a.approved).map((a, i) => (
              <div key={a.id} className="card" style={{ padding: '16px 20px', animation: `fadeIn 0.4s ease ${i * 0.05}s both` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="avatar" style={{ background: a.color, color: 'white', fontSize: '12px', flexShrink: 0 }}>{a.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px' }}>{a.club}</span>
                      {a.urgent && <span className="badge badge-red"><AlertTriangle size={10} /> URGENT</span>}
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>{a.time}</span>
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.message}</div>
                  </div>
                  <button onClick={() => { toggleStar(a.id); showToast(a.starred ? 'Removed from saved' : 'Announcement saved ⭐', a.starred ? 'info' : 'success'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
                    <Star size={16} fill={a.starred ? '#f59e0b' : 'none'} color={a.starred ? '#f59e0b' : 'var(--text-muted)'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'clubs' && (
        <>
          <div className="section-title">Clubs Directory</div>
          <div className="section-sub">Join clubs to receive their announcements and updates</div>
          <div className="grid-3">
            {clubs.map((c, i) => (
              <div key={c.id} className="card" style={{ padding: '20px', animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div className="avatar" style={{ background: c.color, color: 'white', width: '44px', height: '44px', fontSize: '14px' }}>
                    {c.name.slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{c.name}</div>
                    <span className={`badge badge-${CLUB_COLORS[i % CLUB_COLORS.length]}`}>{c.category}</span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>{c.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} /> {c.members} members
                  </span>
                  <button onClick={() => { joinClub(c.id); showToast(c.joined ? `Left ${c.name}` : `Joined ${c.name}! 🎉`, c.joined ? 'info' : 'success'); }}
                    className={`btn btn-sm ${c.joined ? 'btn-secondary' : 'btn-primary'}`}>
                    {c.joined ? <><Check size={13} /> Joined</> : '+ Join'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Announcement Modal */}
      {addModal && (
        <div className="modal-overlay" onClick={() => setAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Post Announcement</h3>
              <button onClick={() => setAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Club / Department Name</label>
                <input className="input" placeholder="e.g. ML Club" value={form.club} onChange={e => setForm({ ...form, club: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="input" placeholder="Write your announcement..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} />
                Mark as URGENT
              </label>
              {user.role !== 'admin' && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  ℹ️ Your announcement will be reviewed by admin before publishing
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
