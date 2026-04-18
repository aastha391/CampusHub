import { BookOpen, FileText, Lightbulb, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';

const RESOURCES = [
  { icon: '🎯', title: 'Interview Prep Kit', desc: 'DSA, System Design, HR rounds', count: '120 resources', tag: 'Placement', tagColor: 'orange', color: '#f97316', link: '#' },
  { icon: '📄', title: 'Past Year Papers', desc: '10 years across all branches', count: '850+ papers', tag: 'Exams', tagColor: 'red', color: '#ef4444', link: '#' },
  { icon: '💡', title: 'Project Ideas', desc: 'Curated final year projects', count: '300+ ideas', tag: 'Projects', tagColor: 'purple', color: '#7209b7', link: '#' },
  { icon: '🎓', title: 'Free Courses', desc: 'Curated free online courses', count: '200+ courses', tag: 'Learning', tagColor: 'teal', color: '#06b6d4', link: '#' },
  { icon: '📝', title: 'Resume Templates', desc: 'ATS-friendly LaTeX templates', count: '25 templates', tag: 'Career', tagColor: 'green', color: '#10b981', link: '#' },
  { icon: '💼', title: 'Internship Portal', desc: 'Verified campus internships', count: '60+ listings', tag: 'Internship', tagColor: 'blue', color: '#4361ee', link: '#' },
];

const QUICK_LINKS = [
  { icon: '🔗', title: 'LeetCode', desc: 'Coding practice', url: 'https://leetcode.com' },
  { icon: '🔗', title: 'NPTEL', desc: 'Free certifications', url: 'https://nptel.ac.in' },
  { icon: '🔗', title: 'GeeksForGeeks', desc: 'CS fundamentals', url: 'https://geeksforgeeks.org' },
  { icon: '🔗', title: 'GitHub Student Pack', desc: 'Free dev tools', url: 'https://education.github.com' },
];

export default function ResourcesPage() {
  return (
    <div className="animate-fade">
      <div className="section-title">Resource Dashboard</div>
      <div className="section-sub">All your academic resources in one place</div>

      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {RESOURCES.map((r, i) => (
          <div key={i} className="card" style={{ padding: '22px', cursor: 'pointer', animation: `fadeIn 0.4s ease ${i * 0.07}s both` }}
            onClick={() => window.open(r.link, '_blank')}>
            <div style={{ fontSize: '28px', marginBottom: '12px', animation: i % 2 === 0 ? 'float 3s ease-in-out infinite' : 'float 3s ease-in-out 1.5s infinite' }}>{r.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>{r.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.4 }}>{r.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.count}</span>
              <span className={`badge badge-${r.tagColor}`}>{r.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="section-title" style={{ fontSize: '18px', marginBottom: '12px' }}>Quick Links</div>
      <div className="grid-4">
        {QUICK_LINKS.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noreferrer"
            className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit', animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}>
            <div style={{ fontSize: '20px' }}>{l.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>{l.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l.desc}</div>
            </div>
            <ExternalLink size={14} color="var(--text-muted)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </div>
  );
}
