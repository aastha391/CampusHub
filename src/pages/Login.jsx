import { useState, useEffect } from "react";
import "../styles/Login.css";

const roles = [
  {
    id: "student",
    label: "Student",
    emoji: "🎓",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.4)",
    desc: "Access events, notes, clubs & more",
    email: "22cs001@college.edu",
    password: "campus123",
    accent: "#818cf8",
  },
  {
    id: "admin",
    label: "Admin",
    emoji: "🛡️",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.4)",
    desc: "Manage campus, users & content",
    email: "admin@college.edu",
    password: "campus123",
    accent: "#38bdf8",
  },
  {
    id: "clubhead",
    label: "Club Head",
    emoji: "📢",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    desc: "Post announcements & manage your club",
    email: "clubhead@college.edu",
    password: "campus123",
    accent: "#34d399",
  },
];

export default function Login({ onLogin }) {
  const [phase, setPhase] = useState("intro"); // intro → roles → login
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [introStep, setIntroStep] = useState(0); // 0=logo anim, 1=text reveal, 2=fade to roles

  useEffect(() => {
    // Logo appears at 0ms
    const t1 = setTimeout(() => setIntroStep(1), 600);   // tagline fades in
    const t2 = setTimeout(() => setIntroStep(2), 1800);  // start exit
    const t3 = setTimeout(() => setPhase("roles"), 2400); // show roles
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail(role.email);
    setPassword(role.password);
    setTimeout(() => setPhase("login"), 80);
  };

  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    setTimeout(() => {
      const success = onLogin && onLogin(email, selectedRole.id);
      setLoading(false);
      if (success === false) {
        setLoginError("Invalid email. Use the demo email shown.");
      }
    }, 1200);
  };

  const handleBack = () => {
    setPhase("roles");
    setSelectedRole(null);
  };

  const role = selectedRole;

  return (
    <div className="ch-root">
      {/* Ambient orbs */}
      <div className="ch-orb ch-orb1" />
      <div className="ch-orb ch-orb2" />
      <div className="ch-orb ch-orb3" />
      <div className="ch-grid" />

      {/* ── INTRO PHASE ── */}
      {phase === "intro" && (
        <div className={`ch-intro ${introStep >= 2 ? "ch-intro--exit" : ""}`}>
          <div className={`ch-intro-logo ${introStep >= 0 ? "ch-intro-logo--in" : ""}`}>
            <div className="ch-logo-3d">
              <div className="ch-logo-cube">
                <span className="ch-logo-icon">⚡</span>
              </div>
              <div className="ch-logo-ring ch-logo-ring1" />
              <div className="ch-logo-ring ch-logo-ring2" />
            </div>
            <div className={`ch-intro-wordmark ${introStep >= 1 ? "ch-intro-wordmark--in" : ""}`}>
              <span className="ch-word-campus">Campus</span>
              <span className="ch-word-hub">Hub</span>
            </div>
          </div>
          <div className={`ch-intro-tag ${introStep >= 1 ? "ch-intro-tag--in" : ""}`}>
            Your college life, all in one place.
          </div>
        </div>
      )}

      {/* ── ROLE SELECTION PHASE ── */}
      {phase === "roles" && (
        <div className="ch-roles-screen">
          <div className="ch-roles-header">
            <div className="ch-header-logo">
              <span className="ch-header-icon">⚡</span>
              <span className="ch-word-campus">Campus</span><span className="ch-word-hub">Hub</span>
            </div>
            <p className="ch-roles-sub">
              The all-in-one digital campus — events, notes, clubs, hackathons, and more.<br />
              <span>Select your role to get started.</span>
            </p>
          </div>

          <div className="ch-role-cards">
            {roles.map((r, i) => (
              <button
                key={r.id}
                className="ch-role-card"
                style={{
                  "--card-color": r.color,
                  "--card-glow": r.glow,
                  "--card-accent": r.accent,
                  animationDelay: `${i * 0.12}s`,
                }}
                onClick={() => handleRoleSelect(r)}
              >
                <div className="ch-card-glow-bg" />
                <div className="ch-card-top">
                  <div className="ch-card-emoji-wrap">
                    <span className="ch-card-emoji">{r.emoji}</span>
                    <div className="ch-card-emoji-ring" />
                  </div>
                  <div className="ch-card-arrow">→</div>
                </div>
                <div className="ch-card-label">{r.label}</div>
                <div className="ch-card-desc">{r.desc}</div>
                <div className="ch-card-shimmer" />
              </button>
            ))}
          </div>

          <div className="ch-roles-footer">
            College email verified · Secure login · Role-based access
          </div>
        </div>
      )}

      {/* ── LOGIN PHASE ── */}
      {phase === "login" && role && (
        <div className="ch-login-screen" style={{ "--role-color": role.color, "--role-glow": role.glow, "--role-accent": role.accent }}>
          <div className="ch-login-card">
            <button className="ch-back-btn" onClick={handleBack}>
              ← Back
            </button>

            <div className="ch-login-hero">
              <div className="ch-login-emoji-wrap">
                <span className="ch-login-emoji">{role.emoji}</span>
                <div className="ch-login-emoji-ring" />
                <div className="ch-login-emoji-ring2" />
              </div>
              <div>
                <h2 className="ch-login-title">Sign in as <span>{role.label}</span></h2>
                <p className="ch-login-desc">{role.desc}</p>
              </div>
            </div>

            <form className="ch-form" onSubmit={handleLogin}>
              <div className="ch-field">
                <label>College Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={role.email}
                  required
                />
              </div>
              <div className="ch-field">
                <label>Password</label>
                <div className="ch-pass-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" className="ch-eye" onClick={() => setShowPass(v => !v)}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button className={`ch-submit ${loading ? "ch-submit--loading" : ""}`} type="submit">
                {loading ? (
                  <span className="ch-spinner" />
                ) : (
                  <>Sign in as {role.label} →</>
                )}
              </button>
            </form>

            {loginError && (
              <div className="ch-login-error">{loginError}</div>
            )}
            <div className="ch-demo-hint">
              <span>Demo email: {selectedRole?.email} · any password</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
