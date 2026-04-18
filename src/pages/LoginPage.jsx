import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, Users, Trophy, FileText, Zap, Shield, Star, ArrowRight, Eye, EyeOff } from 'lucide-react';

const CREDENTIALS = [
  { label: 'Student', email: '22cs001@college.edu', role: 'student', hint: 'rollno@college.edu' },
  { label: 'Admin', email: 'admin@college.edu', role: 'admin', hint: 'admin@college.edu' },
  { label: 'Club Head', email: 'clubhead@college.edu', role: 'clubhead', hint: 'clubhead@college.edu' },
];

const FEATURES = [
  { icon: Calendar, color: '#4361ee', title: 'Campus Events', desc: 'RSVP to events, workshops & fests' },
  { icon: FileText, color: '#7209b7', title: 'Notes Sharing', desc: 'Upload & download study material' },
  { icon: Users, color: '#06b6d4', title: 'Club Hub', desc: 'Join clubs, get announcements' },
  { icon: Trophy, color: '#f59e0b', title: 'Hackathons', desc: 'Find teammates, apply & win' },
  { icon: BookOpen, color: '#10b981', title: 'Resources', desc: 'Interview prep, past papers & more' },
  { icon: Zap, color: '#ef4444', title: 'Q&A Board', desc: 'Anonymous campus discussions' },
];

const STATS = [
  { value: '2,400+', label: 'Students' },
  { value: '120+', label: 'Events/Year' },
  { value: '28', label: 'Active Clubs' },
  { value: '1.2K', label: 'Notes Shared' },
];

export default function LoginPage() {
  const { login, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const ok = login(email, role);
    if (!ok) {
      showToast('Invalid credentials. Try a demo account below.', 'error');
    }
    setLoading(false);
  };

  const quickLogin = (cred) => {
    setEmail(cred.email);
    setRole(cred.role);
    setPassword('campus123');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* LEFT - Branding */}
      <div style={{
        flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 40%, #0d1b4b 100%)',
        padding: '48px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
        minWidth: 0,
      }}>
        {/* BG Orbs */}
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(67,97,238,0.15)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(114,9,183,0.15)', filter: 'blur(60px)' }} />

        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #4361ee, #7209b7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'float 3s ease-in-out infinite',
            }}>
              <Zap size={22} color="white" fill="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'white' }}>
                Campus<span style={{ color: '#4361ee' }}>Hub</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>digital campus</div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '16px' }}>
            Your college life,<br />
            <span style={{ background: 'linear-gradient(90deg, #4361ee, #7209b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              all in one place.
            </span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '420px' }}>
            CampusHub is your digital college companion — discover events, share notes,
            join clubs, find hackathon teammates, and stay updated with campus announcements.
            Everything your college needs, centralized.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '28px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ animation: 'fadeIn 0.6s ease both' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'white' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '480px' }}>
            {FEATURES.map((f, i) => (
              <div key={i}
                onMouseEnter={() => setActiveFeature(i)}
                style={{
                  background: activeFeature === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${activeFeature === i ? f.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '10px', padding: '12px',
                  cursor: 'default', transition: 'all 0.25s ease',
                }}>
                <f.icon size={18} color={f.color} style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: 'relative', marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={14} color="#4361ee" />
          <span style={{ fontSize: '12px', color: '#475569' }}>College email verified · Secure login · Role-based access</span>
        </div>
      </div>

      {/* RIGHT - Login Form */}
      <div style={{
        width: '460px', flexShrink: 0, background: 'white',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '48px 40px', overflowY: 'auto',
      }}>
        <div style={{ animation: 'fadeIn 0.6s ease both' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
            Sign in to CampusHub
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
            Use your college email to access the platform
          </p>

          {/* Role tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'var(--bg-primary)', padding: '4px', borderRadius: '10px' }}>
            {[{ v: 'student', l: 'Student' }, { v: 'clubhead', l: 'Club Head' }, { v: 'admin', l: 'Admin' }].map(r => (
              <button key={r.v} onClick={() => setRole(r.v)} style={{
                flex: 1, padding: '8px', border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px',
                background: role === r.v ? 'white' : 'transparent',
                color: role === r.v ? 'var(--accent-blue)' : 'var(--text-secondary)',
                boxShadow: role === r.v ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.2s',
              }}>{r.l}</button>
            ))}
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>College Email</label>
              <input className="input" type="email" placeholder="rollno@college.edu" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} required style={{ paddingRight: '40px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', padding: '13px' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Signing in...
                </span>
              ) : (
                <><span>Sign in</span><ArrowRight size={16} /></>
              )}
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-blue)', fontSize: '13px', fontWeight: 600 }}>
                🔐 Sign in with Google (Coming Soon)
              </button>
            </div>
          </form>

          {/* Demo accounts */}
          <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              🎯 Quick Demo Login
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CREDENTIALS.map(c => (
                <button key={c.role} onClick={() => quickLogin(c)}
                  style={{
                    background: 'white', border: '1px solid var(--border)', borderRadius: '8px',
                    padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {c.role === 'student' ? '🎓' : c.role === 'admin' ? '🛡️' : '📢'} {c.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.hint}</div>
                  </div>
                  <ArrowRight size={14} color="var(--accent-blue)" />
                </button>
              ))}
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '20px' }}>
            CampusHub © 2025 · Built with React + Vite · Phase 1
          </p>
        </div>
      </div>
    </div>
  );
}
