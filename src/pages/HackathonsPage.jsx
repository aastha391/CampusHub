import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Users, Clock, Wifi, MapPin, Plus, UserPlus } from 'lucide-react';

const STATUS_COLOR = { open: 'green', upcoming: 'yellow', closed: 'red' };
const MODE_ICON = { Online: '🌐', Offline: '📍', Hybrid: '🔀' };

export default function HackathonsPage() {
  const { hackathons, addHackathonTeammate, user, showToast } = useApp();
  const [filter, setFilter] = useState('All');
  const [teamModal, setTeamModal] = useState(null);
  const [form, setForm] = useState({ name: '', skill: '' });

  const filtered = hackathons.filter(h => filter === 'All' || h.mode === filter || (filter === 'Open' && h.status === 'open'));

  const handleAddTeammate = () => {
    if (!form.name || !form.skill) return;
    addHackathonTeammate(teamModal.id, form.name, form.skill);
    showToast(`Added ${form.name} as teammate! 🤝`, 'success');
    setForm({ name: '', skill: '' });
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="section-title">Hackathon Updates</div>
          <div className="section-sub">Open competitions and opportunities</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'Open', 'Online', 'Offline', 'Hybrid'].map(f => (
          <button key={f} className={`tag ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((h, i) => (
          <div key={h.id} className="card" style={{ padding: '20px', animation: `fadeIn 0.4s ease ${i * 0.07}s both` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px' }}>{h.name}</h3>
                  <span className={`badge badge-${STATUS_COLOR[h.status]}`}>{h.status}</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>by {h.organizer}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {h.tags.map(t => (
                    <span key={t} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                  ['Prize', h.prize, Trophy, '#f59e0b'],
                  ['Deadline', h.deadline, Clock, '#ef4444'],
                  ['Mode', `${MODE_ICON[h.mode]} ${h.mode}`, Wifi, '#4361ee'],
                  ['Team', `${h.teamSize} members`, Users, '#10b981'],
                ].map(([label, val, Icon, color]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setTeamModal(h)}>
                  <UserPlus size={13} /> Team
                </button>
                <button className="btn btn-primary btn-sm">Apply →</button>
              </div>
            </div>

            {/* Teammates */}
            {h.teammates.length > 0 && (
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                  👥 TEAM FORMATION BOARD
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {h.teammates.map(t => (
                    <div key={t.id} style={{ padding: '6px 12px', background: 'rgba(67,97,238,0.08)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-blue)', border: '1px solid rgba(67,97,238,0.2)' }}>
                      {t.name} · {t.skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {teamModal && (
        <div className="modal-overlay" onClick={() => setTeamModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Team Formation</h3>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{teamModal.name}</div>
              </div>
              <button onClick={() => setTeamModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ background: 'var(--bg-primary)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>LOOKING FOR TEAMMATES</div>
                {teamModal.teammates.length === 0 ? (
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>No teammates added yet — be the first!</div>
                ) : teamModal.teammates.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'white', borderRadius: '8px', marginBottom: '6px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600 }}>{t.name}</span>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{t.skill}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Add yourself to team board:</div>
              <div className="form-group">
                <label>Your Name</label>
                <input className="input" placeholder={user.name} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Primary Skill</label>
                <input className="input" placeholder="e.g. React, ML, UI Design, Backend" value={form.skill} onChange={e => setForm({ ...form, skill: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Python', 'React', 'ML', 'Backend', 'UI/UX', 'IoT', 'Data'].map(s => (
                  <button key={s} className="tag" style={{ fontSize: '11px' }} onClick={() => setForm({ ...form, skill: s })}>{s}</button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setTeamModal(null)}>Close</button>
              <button className="btn btn-primary" onClick={handleAddTeammate}><Plus size={14} /> Add to Board</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
