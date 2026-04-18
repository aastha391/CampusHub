import '../styles/pages.css';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, ThumbsUp, Plus, Package, AlertCircle, CheckCircle } from 'lucide-react';

export default function QnAPage() {
  const { qna, addQna, upvoteQna, lostFound, addLostFound, resolveLostFound, user, showToast } = useApp();
  const [tab, setTab] = useState('qna');
  const [qModal, setQModal] = useState(false);
  const [lfModal, setLfModal] = useState(false);
  const [qForm, setQForm] = useState({ question: '', anonymous: true });
  const [lfForm, setLfForm] = useState({ type: 'lost', item: '', description: '', contact: user.email });

  const handleAddQ = () => {
    if (!qForm.question) return;
    addQna({ question: qForm.question, anonymous: qForm.anonymous, author: qForm.anonymous ? null : user.name });
    showToast('Question posted! 💬', 'success');
    setQForm({ question: '', anonymous: true });
    setQModal(false);
  };

  const handleAddLF = () => {
    if (!lfForm.item || !lfForm.description) return;
    addLostFound(lfForm);
    showToast('Posted to Lost & Found! 📦', 'success');
    setLfForm({ type: 'lost', item: '', description: '', contact: user.email });
    setLfModal(false);
  };

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[['qna', '💬 Q&A Board'], ['lostfound', '📦 Lost & Found']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'} btn-sm`}>{l}</button>
        ))}
        <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }} onClick={() => tab === 'qna' ? setQModal(true) : setLfModal(true)}>
          <Plus size={14} /> {tab === 'qna' ? 'Ask Question' : 'Post Item'}
        </button>
      </div>

      {tab === 'qna' && (
        <>
          <div className="section-title">Anonymous Q&A Board</div>
          <div className="section-sub">Ask campus questions, get answers from the community</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {qna.map((q, i) => (
              <div key={q.id} className="card" style={{ padding: '18px', animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => { upvoteQna(q.id); showToast('Upvoted!', 'success'); }}
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <ThumbsUp size={14} color="var(--accent-blue)" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)' }}>{q.upvotes}</span>
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px', lineHeight: 1.4 }}>{q.question}</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {q.anonymous ? '🎭 Anonymous' : `👤 ${q.author}`}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>
                        <MessageSquare size={12} style={{ display: 'inline', marginRight: '3px' }} />{q.answers} answers
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{q.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'lostfound' && (
        <>
          <div className="section-title">Lost & Found</div>
          <div className="section-sub">Help your campus community recover lost items</div>
          <div className="grid-2">
            {lostFound.map((item, i) => (
              <div key={item.id} className="card" style={{ padding: '18px', opacity: item.resolved ? 0.6 : 1, animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{item.type === 'lost' ? '🔍' : '📦'}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.item}</div>
                      <span className={`badge badge-${item.type === 'lost' ? 'red' : 'green'}`} style={{ marginTop: '2px' }}>
                        {item.type === 'lost' ? 'LOST' : 'FOUND'}
                      </span>
                    </div>
                  </div>
                  {item.resolved ? (
                    <span className="badge badge-green"><CheckCircle size={10} /> Resolved</span>
                  ) : (
                    (user.role === 'admin') && (
                      <button className="btn btn-success btn-sm" onClick={() => { resolveLostFound(item.id); showToast('Marked as resolved', 'success'); }}>
                        Resolve
                      </button>
                    )
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>{item.description}</p>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>📧 {item.contact}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Q&A Modal */}
      {qModal && (
        <div className="modal-overlay" onClick={() => setQModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Ask a Question</h3>
              <button onClick={() => setQModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Your Question</label>
                <textarea className="input" placeholder="e.g. Where can I get attendance proxy done? (kidding 😄)" value={qForm.question} onChange={e => setQForm({ ...qForm, question: e.target.value })} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={qForm.anonymous} onChange={e => setQForm({ ...qForm, anonymous: e.target.checked })} />
                🎭 Post anonymously
              </label>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setQModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddQ}>Post Question</button>
            </div>
          </div>
        </div>
      )}

      {/* Lost & Found Modal */}
      {lfModal && (
        <div className="modal-overlay" onClick={() => setLfModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>Post to Lost & Found</h3>
              <button onClick={() => setLfModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {['lost', 'found'].map(t => (
                  <button key={t} onClick={() => setLfForm({ ...lfForm, type: t })}
                    className={`btn btn-sm ${lfForm.type === t ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1, justifyContent: 'center', textTransform: 'capitalize' }}>
                    {t === 'lost' ? '🔍 I Lost Something' : '📦 I Found Something'}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label>Item Name</label>
                <input className="input" placeholder="e.g. Blue Water Bottle" value={lfForm.item} onChange={e => setLfForm({ ...lfForm, item: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description / Location</label>
                <textarea className="input" placeholder="Describe the item and where it was lost/found..." value={lfForm.description} onChange={e => setLfForm({ ...lfForm, description: e.target.value })} style={{ minHeight: '80px' }} />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input className="input" value={lfForm.contact} onChange={e => setLfForm({ ...lfForm, contact: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setLfModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddLF}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
