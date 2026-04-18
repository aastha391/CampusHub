import '../styles/notes.css';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Star, Search, Upload, Plus } from 'lucide-react';

const DEPT_COLORS = { CSE: 'blue', 'AI/ML': 'purple', Web: 'teal', ECE: 'orange', ME: 'green' };

export default function NotesPage() {
  const { notes, downloadNote, rateNote, addNote, user, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [uploadModal, setUploadModal] = useState(false);
  const [rateModal, setRateModal] = useState(null);
  const [hover, setHover] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [form, setForm] = useState({ dept: 'CSE', sem: '', subject: '', title: '', size: '1.0MB' });

  const depts = ['All', 'CSE', 'AI/ML', 'Web', 'ECE'];
  const filtered = notes.filter(n =>
    n.approved &&
    (dept === 'All' || n.dept === dept) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase()) || n.uploader.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDownload = (note) => {
    downloadNote(note.id);
    showToast(`Downloading "${note.title}"... 📥`, 'success');
  };

  const handleUpload = () => {
    if (!form.sem || !form.subject || !form.title) return showToast('Fill all fields', 'error');
    addNote({ ...form, uploader: user.name });
    showToast(user.role === 'admin' ? 'Notes uploaded!' : 'Notes submitted for approval ✅', 'success');
    setForm({ dept: 'CSE', sem: '', subject: '', title: '', size: '1.0MB' });
    setUploadModal(false);
  };

  const handleRate = () => {
    if (!myRating) return;
    rateNote(rateModal.id, myRating);
    showToast(`Rated "${rateModal.title}" ${myRating}⭐`, 'success');
    setRateModal(null);
    setMyRating(0);
  };

  const renderStars = (rating, interactive = false, hoverVal = 0) => (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= (interactive ? hoverVal || myRating : Math.round(rating)) ? '#f59e0b' : '#e2e8f0', cursor: interactive ? 'pointer' : 'default', fontSize: interactive ? '24px' : '13px' }}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && setMyRating(s)}>★</span>
      ))}
    </div>
  );

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div className="section-title">Notes Sharing</div>
          <div className="section-sub">Download and share study material</div>
        </div>
        <button className="btn btn-primary" onClick={() => setUploadModal(true)}><Upload size={14} /> Upload Notes</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
        <div className="search-box" style={{ flex: 1, minWidth: '200px' }}>
          <Search size={16} className="search-icon" />
          <input className="input" placeholder="Search by subject, title or uploader..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {depts.map(d => <button key={d} className={`tag ${dept === d ? 'active' : ''}`} onClick={() => setDept(d)}>{d}</button>)}
        </div>
      </div>

      <div className="grid-3">
        {filtered.map((n, i) => (
          <div key={n.id} className="card" style={{ padding: '18px', animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className={`badge badge-${DEPT_COLORS[n.dept] || 'blue'}`}>{n.dept}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.sem}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{n.subject}</div>
            <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{n.title}</h3>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              by {n.uploader} · {n.size} · {n.downloads}↓
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              {renderStars(n.rating)}
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>{n.rating || '–'}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleDownload(n)}>
                <Download size={13} /> Download
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setRateModal(n); setMyRating(0); setHover(0); }}
                style={{ padding: '7px 10px' }} title="Rate this note">
                <Star size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <Search size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>No notes found</div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <div className="modal-overlay" onClick={() => setUploadModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Upload Notes</h3>
              <button onClick={() => setUploadModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Department</label>
                  <select className="input" value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}>
                    {['CSE', 'ECE', 'ME', 'AI/ML', 'Web'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Semester</label>
                  <input className="input" placeholder="e.g. 4th Sem" value={form.sem} onChange={e => setForm({ ...form, sem: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input className="input" placeholder="e.g. Data Structures" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Notes Title</label>
                <input className="input" placeholder="e.g. Complete Unit 3 Notes" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>File (Demo — click to simulate)</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: '10px', padding: '24px', textAlign: 'center', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px' }}
                  onClick={() => setForm({ ...form, size: '2.4MB' })}>
                  <Upload size={24} style={{ marginBottom: '8px', opacity: 0.4 }} />
                  <div>Click to upload PDF / Images</div>
                  {form.size !== '1.0MB' && <div style={{ color: 'var(--accent-green)', marginTop: '6px', fontWeight: 600 }}>✓ File selected ({form.size})</div>}
                </div>
              </div>
              {user.role !== 'admin' && (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', padding: '8px 12px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  ℹ️ Notes will be reviewed before publishing
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setUploadModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpload}><Upload size={14} /> Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Modal */}
      {rateModal && (
        <div className="modal-overlay" onClick={() => setRateModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Rate Notes</h3>
              <button onClick={() => setRateModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{rateModal.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>by {rateModal.uploader}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Tap to rate:</div>
              {renderStars(myRating, true, hover)}
              <div style={{ marginTop: '8px', fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>{myRating ? `${myRating} / 5` : 'Select rating'}</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setRateModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleRate} disabled={!myRating}>Submit Rating</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
