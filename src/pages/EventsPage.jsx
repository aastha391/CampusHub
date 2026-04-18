import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, Users, CheckCircle, Search } from 'lucide-react';

const CATS = ['All', 'Technical', 'Cultural', 'Business', 'Workshop', 'Sports'];
const CAT_COLORS = { Technical: 'blue', Cultural: 'purple', Business: 'orange', Workshop: 'teal', Sports: 'green' };

export default function EventsPage() {
  const { events, rsvpEvent, user, showToast, addNotification } = useApp();
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [rsvpModal, setRsvpModal] = useState(null);

  const filtered = events.filter(e =>
    (cat === 'All' || e.category === cat) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRsvp = (ev) => {
    rsvpEvent(ev.id);
    const isNowRsvp = !ev.rsvps.includes(user.id);
    showToast(isNowRsvp ? `RSVP confirmed for ${ev.title}! 🎉` : `RSVP cancelled for ${ev.title}`, isNowRsvp ? 'success' : 'info');
    if (isNowRsvp) addNotification(`Your RSVP for ${ev.title} is confirmed!`, 'success');
    setRsvpModal(null);
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '20px' }}>
        <div className="section-title">Upcoming Events</div>
        <div className="section-sub">RSVP to events happening on campus</div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: 1, minWidth: '200px' }}>
            <Search size={16} className="search-icon" />
            <input className="input" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c} className={`tag ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-3">
        {filtered.map((ev, i) => {
          const rsvpd = ev.rsvps.includes(user.id);
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          const full = pct >= 100;
          return (
            <div key={ev.id} className="card" style={{ padding: '0', overflow: 'hidden', animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
              {/* Color top bar */}
              <div style={{ height: '4px', background: `var(--accent-${CAT_COLORS[ev.category] || 'blue'})` }} />
              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.3, flex: 1, marginRight: '8px' }}>{ev.title}</h3>
                  <span className={`badge badge-${CAT_COLORS[ev.category] || 'blue'}`}>{ev.category}</span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>📋 {ev.organizer}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {ev.date}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {ev.time}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {ev.venue}
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={11} /> {ev.registered} registered</span>
                    <span style={{ color: pct >= 90 ? 'var(--accent-red)' : pct >= 70 ? 'var(--accent-orange)' : 'var(--text-muted)' }}>{pct}% full</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${Math.min(pct, 100)}%`, background: pct >= 90 ? 'var(--accent-red)' : pct >= 70 ? 'var(--accent-orange)' : 'var(--accent-blue)' }} />
                  </div>
                </div>

                <button onClick={() => setRsvpModal(ev)} disabled={full && !rsvpd}
                  className={`btn btn-${rsvpd ? 'success' : 'primary'}`}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {rsvpd ? <><CheckCircle size={14} /> RSVPed ✓</> : full ? 'Event Full' : 'RSVP Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <Calendar size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>No events found</div>
          <div style={{ fontSize: '13px' }}>Try changing filters</div>
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpModal && (
        <div className="modal-overlay" onClick={() => setRsvpModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>{rsvpModal.title}</h3>
                <span className={`badge badge-${CAT_COLORS[rsvpModal.category] || 'blue'}`} style={{ marginTop: '4px' }}>{rsvpModal.category}</span>
              </div>
              <button onClick={() => setRsvpModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-muted)' }}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>{rsvpModal.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-primary)', borderRadius: '10px', padding: '14px' }}>
                {[['📋 Organizer', rsvpModal.organizer], ['📅 Date', rsvpModal.date], ['🕐 Time', rsvpModal.time], ['📍 Venue', rsvpModal.venue]].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(67,97,238,0.06)', borderRadius: '8px', fontSize: '13px', color: 'var(--accent-blue)' }}>
                👤 RSVP as <strong>{user.name}</strong> ({user.email})
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setRsvpModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleRsvp(rsvpModal)}>
                {rsvpModal.rsvps.includes(user.id) ? 'Cancel RSVP' : 'Confirm RSVP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
