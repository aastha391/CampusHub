import '../styles/pages.css';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Save, Award, BookOpen, Calendar, Users } from 'lucide-react';

const SKILLS_LIST = ['React', 'Python', 'ML', 'Node.js', 'Java', 'C++', 'Data Science', 'UI/UX', 'Android', 'Blockchain', 'IoT', 'DevOps'];

export default function ProfilePage() {
  const { user, events, notes, clubs, showToast } = useApp();
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState(['React', 'Python']);
  const [bio, setBio] = useState('Passionate about building things that matter. CSE final year. Open to collaborations!');
  const [linkedin, setLinkedin] = useState('');

  const myRsvps = events.filter(e => e.rsvps.includes(user.id));
  const myClubs = clubs.filter(c => c.joined);

  const saveProfile = () => {
    setEditing(false);
    showToast('Profile updated! ✅', 'success');
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '700px' }}>
      <div className="section-title">My Profile</div>
      <div className="section-sub">Manage your campus identity</div>

      {/* Profile card */}
      <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
          <div className="avatar" style={{ width: '70px', height: '70px', fontSize: '24px', background: user?.color, color: 'white', flexShrink: 0 }}>
            {user?.avatar}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{user?.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>{user?.email}</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-blue">{user?.branch}</span>
              {user?.year > 0 && <span className="badge badge-teal">Year {user?.year}</span>}
              <span className={`badge badge-${user?.role === 'admin' ? 'purple' : user?.role === 'clubhead' ? 'orange' : 'green'}`} style={{ textTransform: 'capitalize' }}>{user?.role}</span>
            </div>
          </div>
          <button className={`btn btn-sm ${editing ? 'btn-primary' : 'btn-secondary'}`} onClick={() => editing ? saveProfile() : setEditing(true)}>
            {editing ? <><Save size={13} /> Save</> : <><Edit3 size={13} /> Edit Profile</>}
          </button>
        </div>

        <div className="divider" />

        <div className="form-group">
          <label>Bio</label>
          {editing ? (
            <textarea className="input" value={bio} onChange={e => setBio(e.target.value)} style={{ minHeight: '80px' }} />
          ) : (
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{bio}</p>
          )}
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>
          {editing ? (
            <input className="input" placeholder="https://linkedin.com/in/yourname" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
          ) : (
            <div style={{ fontSize: '14px', color: linkedin ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{linkedin || 'Not set'}</div>
          )}
        </div>

        <div>
          <label>Skills</label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {SKILLS_LIST.map(s => (
              <button key={s} onClick={() => editing && setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                className={`tag ${skills.includes(s) ? 'active' : ''}`}
                style={{ cursor: editing ? 'pointer' : 'default', fontSize: '12px' }}>
                {s}
              </button>
            ))}
          </div>
          {editing && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>Click to toggle skills</div>}
        </div>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: '20px' }}>
        {[
          { icon: Calendar, label: 'Events RSVPed', value: myRsvps.length, color: '#4361ee' },
          { icon: Users, label: 'Clubs Joined', value: myClubs.length, color: '#7209b7' },
          { icon: BookOpen, label: 'Notes Downloaded', value: 4, color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '18px', textAlign: 'center' }}>
            <s.icon size={22} color={s.color} style={{ marginBottom: '8px' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* My RSVPs */}
      {myRsvps.length > 0 && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px' }}>My RSVPs</div>
          {myRsvps.map(ev => (
            <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--bg-primary)', borderRadius: '10px', marginBottom: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{ev.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{ev.date} · {ev.venue}</div>
              </div>
              <span className="badge badge-green">Registered</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
