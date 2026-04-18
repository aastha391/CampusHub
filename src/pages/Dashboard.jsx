import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar, FileText, Users, Trophy, Sun, TrendingUp, Bell, Star,
  Shield, Plus, CheckCircle, Trash2, Megaphone, BarChart3, AlertTriangle
} from 'lucide-react';
import '../styles/dashboard.css';

function StudentDashboard({ setPage }) {
  const { user, events, notes, clubs, notifications, announcements } = useApp();
  const myClubs = clubs.filter(c => c.joined);
  const unread = notifications.filter(n => !n.read);
  const starredAnn = announcements.filter(a => a.starred);
  const stats = [
    { label: 'Upcoming Events', value: events.length, icon: Calendar, color: '#4361ee', page: 'events' },
    { label: 'Notes Available', value: notes.filter(n => n.approved).length, icon: FileText, color: '#7209b7', page: 'notes' },
    { label: 'Clubs Joined', value: myClubs.length, icon: Users, color: '#06b6d4', page: 'clubs' },
    { label: 'Open Hackathons', value: 4, icon: Trophy, color: '#f97316', page: 'hackathons' },
  ];
  return (
    <div className="animate-fade">
      <div className="dashboard-greeting">
        <div className="dashboard-greeting-row">
          <Sun size={20} color="#f59e0b" />
          <span className="dashboard-greeting-time">{new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'},</span>
        </div>
        <h1 className="dashboard-heading">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
      </div>
      <div className="today-banner">
        <div style={{width:40,height:40,borderRadius:10,background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Calendar size={20} color="white"/></div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>Happening Today</div>
          <div style={{fontSize:13,opacity:0.85}}>{events.slice(0,2).map(e=>e.title).join(' · ')}</div>
        </div>
        <button onClick={()=>setPage('events')} style={{background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,color:'white',padding:'8px 14px',cursor:'pointer',fontWeight:600,fontSize:13,fontFamily:'var(--font-body)'}}>View All</button>
      </div>
      <div className="dashboard-stat-grid">
        {stats.map((s,i)=>(
          <div key={i} className="dashboard-stat-card" onClick={()=>setPage(s.page)} style={{animationDelay:`${i*0.08}s`}}>
            <div className="dashboard-stat-icon" style={{background:s.color+'18'}}><s.icon size={20} color={s.color}/></div>
            <div className="dashboard-stat-value" style={{color:s.color}}>{s.value}</div>
            <div className="dashboard-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="dashboard-two-col">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Upcoming Events</span>
            <button className="dashboard-card-link" onClick={()=>setPage('events')}>See all</button>
          </div>
          {events.slice(0,4).map(e=>(
            <div key={e.id} className="dashboard-event-item">
              <div className="dashboard-event-date">
                <div className="dashboard-event-month">{e.date.split(' ')[0].toUpperCase()}</div>
                <div className="dashboard-event-day">{e.date.split(' ')[1]}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div className="dashboard-event-title">{e.title}</div>
                <div className="dashboard-event-meta">{e.organizer} · {e.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title" style={{display:'flex',alignItems:'center',gap:6}}><Bell size={15} color="var(--accent-blue)"/> Recent Activity</span>
              {unread.length>0&&<span className="badge badge-red">{unread.length} new</span>}
            </div>
            {notifications.slice(0,3).map(n=>(
              <div key={n.id} className="dashboard-notif-item">
                <div className="dashboard-notif-dot" style={{background:n.read?'var(--border)':'var(--accent-blue)'}}/>
                <div>
                  <div className="dashboard-notif-text" style={{fontWeight:n.read?400:600}}>{n.text}</div>
                  <div className="dashboard-notif-time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">My Clubs</span>
              <button className="dashboard-card-link" onClick={()=>setPage('clubs')}>Join more</button>
            </div>
            {myClubs.length===0?(
              <div style={{fontSize:13,color:'var(--text-muted)',textAlign:'center',padding:'12px 0'}}>You haven't joined any clubs yet</div>
            ):myClubs.map(c=>(
              <div key={c.id} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <div className="avatar" style={{background:c.color,color:'white',fontSize:12}}>{c.name.slice(0,2)}</div>
                <div><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:'var(--text-muted)'}}>{c.members} members</div></div>
              </div>
            ))}
          </div>
          {starredAnn.length>0&&(
            <div className="dashboard-card">
              <div style={{fontWeight:700,fontSize:15,marginBottom:12,display:'flex',alignItems:'center',gap:6}}><Star size={15} color="#f59e0b" fill="#f59e0b"/> Starred</div>
              {starredAnn.slice(0,2).map(a=>(
                <div key={a.id} style={{fontSize:12,color:'var(--text-secondary)',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontWeight:700}}>{a.club}: </span>{a.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ setPage }) {
  const { user, events, notes, announcements, approveNote, deleteNote, approveAnnouncement, deleteAnnouncement, addEvent, showToast } = useApp();
  const pendingNotes = notes.filter(n => !n.approved);
  const pendingAnn = announcements.filter(a => !a.approved);
  const [eventModal, setEventModal] = useState(false);
  const [form, setForm] = useState({ title:'', category:'Technical', organizer:'', date:'', time:'', venue:'', capacity:100, description:'' });

  const handleAddEvent = () => {
    if (!form.title||!form.organizer||!form.date) return showToast('Fill required fields','error');
    addEvent(form); showToast('Event added! 🎉','success'); setEventModal(false);
    setForm({title:'',category:'Technical',organizer:'',date:'',time:'',venue:'',capacity:100,description:''});
  };

  const quickActions = [
    { icon:Calendar, label:'Add Event', sub:'Create new event', color:'#4361ee', action:()=>setEventModal(true) },
    { icon:FileText, label:'Review Notes', sub:`${pendingNotes.length} pending`, color:'#7209b7', action:()=>setPage('admin') },
    { icon:Megaphone, label:'Announcements', sub:`${pendingAnn.length} pending`, color:'#f97316', action:()=>setPage('admin') },
    { icon:Users, label:'Manage Users', sub:'Roles & access', color:'#10b981', action:()=>setPage('admin') },
  ];

  return (
    <div className="animate-fade">
      <div className="admin-dashboard-hero" style={{marginBottom:24}}>
        <div style={{position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <Shield size={20} color="#a78bfa"/>
            <span style={{fontSize:12,color:'#a78bfa',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>Admin Control Center</span>
          </div>
          <div className="admin-dashboard-hero-title">Welcome, {user?.name?.split(' ')[0]} 🛡️</div>
          <div className="admin-dashboard-hero-sub">You have full control over all campus content, users and events.</div>
          <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
            {[{label:'Pending Notes',value:pendingNotes.length,alert:pendingNotes.length>0},{label:'Pending Announcements',value:pendingAnn.length,alert:pendingAnn.length>0},{label:'Total Events',value:events.length,alert:false},{label:'Total Notes',value:notes.length,alert:false}].map(s=>(
              <div key={s.label}>
                <div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:800,color:s.alert?'#fbbf24':'white'}}>{s.value}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{fontSize:13,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:1,marginBottom:10}}>Quick Actions</div>
      <div className="admin-quick-actions">
        {quickActions.map((a,i)=>(
          <button key={i} className="admin-quick-btn" onClick={a.action}>
            <div className="admin-quick-btn-icon" style={{background:a.color+'18'}}><a.icon size={20} color={a.color}/></div>
            <div className="admin-quick-btn-label">{a.label}</div>
            <div className="admin-quick-btn-sub">{a.sub}</div>
          </button>
        ))}
      </div>
      <div className="dashboard-two-col">
        <div className="admin-pending-section">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">📄 Pending Notes {pendingNotes.length>0&&<span className="badge badge-red" style={{marginLeft:6}}>{pendingNotes.length}</span>}</span>
            <button className="dashboard-card-link" onClick={()=>setPage('admin')}>View all</button>
          </div>
          {pendingNotes.length===0?(<div style={{textAlign:'center',padding:'16px 0',color:'var(--text-muted)',fontSize:13}}>✅ All caught up!</div>
          ):pendingNotes.slice(0,3).map(n=>(
            <div key={n.id} className="admin-pending-item">
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14}}>{n.title}</div>
                <div style={{fontSize:12,color:'var(--text-muted)'}}>{n.dept} · by {n.uploader}</div>
              </div>
              <button className="btn btn-success btn-sm" onClick={()=>{approveNote(n.id);showToast('Note approved!','success');}}><CheckCircle size={13}/></button>
              <button className="btn btn-danger btn-sm" onClick={()=>{deleteNote(n.id);showToast('Deleted','info');}}><Trash2 size={13}/></button>
            </div>
          ))}
        </div>
        <div className="admin-pending-section">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">📢 Pending Announcements {pendingAnn.length>0&&<span className="badge badge-red" style={{marginLeft:6}}>{pendingAnn.length}</span>}</span>
            <button className="dashboard-card-link" onClick={()=>setPage('admin')}>View all</button>
          </div>
          {pendingAnn.length===0?(<div style={{textAlign:'center',padding:'16px 0',color:'var(--text-muted)',fontSize:13}}>✅ All caught up!</div>
          ):pendingAnn.slice(0,3).map(a=>(
            <div key={a.id} className="admin-pending-item">
              <div className="avatar" style={{background:a.color,color:'white',fontSize:12}}>{a.initials}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13}}>{a.club}</div>
                <div style={{fontSize:12,color:'var(--text-muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:180}}>{a.message}</div>
              </div>
              <button className="btn btn-success btn-sm" onClick={()=>{approveAnnouncement(a.id);showToast('Published!','success');}}><CheckCircle size={13}/></button>
              <button className="btn btn-danger btn-sm" onClick={()=>{deleteAnnouncement(a.id);showToast('Deleted','info');}}><Trash2 size={13}/></button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-analytics-card" style={{marginTop:16}}>
        <div className="dashboard-card-header">
          <span className="dashboard-card-title"><BarChart3 size={15} style={{display:'inline',marginRight:6}}/>RSVP Analytics</span>
          <button className="dashboard-card-link" onClick={()=>setPage('admin')}>Full report</button>
        </div>
        {events.map(ev=>{const pct=Math.round((ev.registered/ev.capacity)*100);return(
          <div key={ev.id} className="admin-analytics-row">
            <div className="admin-analytics-label">
              <span style={{fontWeight:600,fontSize:13}}>{ev.title}</span>
              <span style={{color:'var(--text-muted)',fontSize:12}}>{ev.registered}/{ev.capacity} ({pct}%)</span>
            </div>
            <div className="progress"><div className="progress-bar" style={{width:`${Math.min(pct,100)}%`,background:pct>=90?'var(--accent-red)':pct>=70?'var(--accent-orange)':'var(--accent-blue)'}}/></div>
          </div>
        );})}
      </div>
      {eventModal&&(
        <div className="modal-overlay" onClick={()=>setEventModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700}}>Add New Event</h3>
              <button onClick={()=>setEventModal(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:20}}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Event Title *</label><input className="input" placeholder="e.g. Annual Tech Fest 2025" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="form-group"><label>Category</label><select className="input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{['Technical','Cultural','Business','Workshop','Sports'].map(c=><option key={c}>{c}</option>)}</select></div>
                <div className="form-group"><label>Organizer *</label><input className="input" placeholder="e.g. CSE Dept" value={form.organizer} onChange={e=>setForm({...form,organizer:e.target.value})}/></div>
                <div className="form-group"><label>Date *</label><input className="input" placeholder="e.g. May 20" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
                <div className="form-group"><label>Time</label><input className="input" placeholder="e.g. 10:00 AM" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div>
              </div>
              <div className="form-group"><label>Venue</label><input className="input" placeholder="e.g. Auditorium A" value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})}/></div>
              <div className="form-group"><label>Capacity</label><input className="input" type="number" value={form.capacity} onChange={e=>setForm({...form,capacity:parseInt(e.target.value)})}/></div>
              <div className="form-group"><label>Description</label><textarea className="input" placeholder="Describe the event..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setEventModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddEvent}><Plus size={14}/> Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ClubHeadDashboard({ setPage }) {
  const { user, events, announcements, addAnnouncement, addEvent, clubs, showToast } = useApp();
  const [annModal, setAnnModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [annForm, setAnnForm] = useState({ club:'ML Club', message:'', urgent:false });
  const [evForm, setEvForm] = useState({ title:'', category:'Workshop', organizer:'ML Club', date:'', time:'', venue:'', capacity:50, description:'' });
  const myAnnouncements = announcements.filter(a => a.club==='ML Club'||a.club==='E-Cell');
  const myEvents = events.filter(e => e.organizer==='ML Club'||e.organizer==='E-Cell');

  const handlePostAnn = () => {
    if(!annForm.message) return;
    addAnnouncement({...annForm,initials:annForm.club.slice(0,2).toUpperCase(),color:'#06b6d4'});
    showToast('Announcement submitted for admin approval 📢','success');
    setAnnForm({club:'ML Club',message:'',urgent:false}); setAnnModal(false);
  };
  const handleAddEvent = () => {
    if(!evForm.title||!evForm.date) return showToast('Fill required fields','error');
    addEvent(evForm); showToast('Event submitted for admin approval 🎉','success'); setEventModal(false);
  };

  const actions = [
    { icon:Megaphone, label:'Post Announcement', sub:'Notify your members', color:'#06b6d4', action:()=>setAnnModal(true) },
    { icon:Calendar, label:'Add Club Event', sub:'Schedule an event', color:'#4361ee', action:()=>setEventModal(true) },
    { icon:Users, label:'View Members', sub:`${clubs.find(c=>c.name==='ML Club')?.members||0} members`, color:'#7209b7', action:()=>setPage('clubs') },
    { icon:FileText, label:'Share Notes', sub:'Upload study material', color:'#10b981', action:()=>setPage('notes') },
  ];

  return (
    <div className="animate-fade">
      <div className="clubhead-hero">
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
          <Megaphone size={18} color="#6ee7b7"/>
          <span style={{fontSize:12,color:'#6ee7b7',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>Club Head Panel</span>
        </div>
        <div className="clubhead-hero-title">Welcome, {user?.name?.split(' ')[0]}! 📢</div>
        <div style={{fontSize:13,opacity:0.75,marginBottom:16}}>Manage your club announcements, events and members.</div>
        <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
          <div><div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:800}}>{myEvents.length}</div><div style={{fontSize:12,opacity:0.6}}>Club Events</div></div>
          <div><div style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:800}}>{myAnnouncements.length}</div><div style={{fontSize:12,opacity:0.6}}>Announcements Posted</div></div>
        </div>
      </div>
      <div style={{fontSize:13,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:1,marginBottom:10}}>What do you want to do?</div>
      <div className="clubhead-actions-grid">
        {actions.map((a,i)=>(
          <div key={i} className="clubhead-action-card" onClick={a.action}>
            <div style={{width:40,height:40,borderRadius:10,background:a.color+'18',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:8}}><a.icon size={20} color={a.color}/></div>
            <div className="clubhead-action-title">{a.label}</div>
            <div className="clubhead-action-sub">{a.sub}</div>
          </div>
        ))}
      </div>
      <div className="dashboard-two-col">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">My Announcements</span>
            <button className="dashboard-card-link" onClick={()=>setPage('clubs')}>View all</button>
          </div>
          {myAnnouncements.length===0?(
            <div style={{textAlign:'center',padding:'20px 0',color:'var(--text-muted)',fontSize:13}}>
              No announcements yet.<br/>
              <button className="btn btn-primary btn-sm" style={{marginTop:10}} onClick={()=>setAnnModal(true)}>Post first one</button>
            </div>
          ):myAnnouncements.slice(0,3).map(a=>(
            <div key={a.id} style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontWeight:600,fontSize:13}}>{a.club}</span>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  {!a.approved&&<span className="badge badge-yellow"><AlertTriangle size={9}/> Pending</span>}
                  {a.approved&&<span className="badge badge-green">Live</span>}
                  <span style={{fontSize:11,color:'var(--text-muted)'}}>{a.time}</span>
                </div>
              </div>
              <div style={{fontSize:13,color:'var(--text-secondary)'}}>{a.message}</div>
            </div>
          ))}
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">My Club Events</span>
            <button className="dashboard-card-link" onClick={()=>setPage('events')}>View all</button>
          </div>
          {myEvents.length===0?(
            <div style={{textAlign:'center',padding:'20px 0',color:'var(--text-muted)',fontSize:13}}>
              No club events yet.<br/>
              <button className="btn btn-primary btn-sm" style={{marginTop:10}} onClick={()=>setEventModal(true)}>Add first event</button>
            </div>
          ):myEvents.map(e=>(
            <div key={e.id} className="dashboard-event-item">
              <div className="dashboard-event-date">
                <div className="dashboard-event-month">{e.date.split(' ')[0].toUpperCase()}</div>
                <div className="dashboard-event-day">{e.date.split(' ')[1]}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div className="dashboard-event-title">{e.title}</div>
                <div className="dashboard-event-meta">{e.venue} · {e.registered} registered</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {annModal&&(
        <div className="modal-overlay" onClick={()=>setAnnModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700}}>Post Announcement</h3>
              <button onClick={()=>setAnnModal(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:20}}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Club Name</label><input className="input" value={annForm.club} onChange={e=>setAnnForm({...annForm,club:e.target.value})}/></div>
              <div className="form-group"><label>Message</label><textarea className="input" placeholder="Write your announcement..." value={annForm.message} onChange={e=>setAnnForm({...annForm,message:e.target.value})}/></div>
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:14}}><input type="checkbox" checked={annForm.urgent} onChange={e=>setAnnForm({...annForm,urgent:e.target.checked})}/>Mark as URGENT</label>
              <div style={{marginTop:12,fontSize:12,color:'var(--text-muted)',padding:'8px 12px',background:'var(--bg-primary)',borderRadius:8}}>ℹ️ Will be reviewed by admin before going live</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setAnnModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePostAnn}>Post</button>
            </div>
          </div>
        </div>
      )}
      {eventModal&&(
        <div className="modal-overlay" onClick={()=>setEventModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700}}>Add Club Event</h3>
              <button onClick={()=>setEventModal(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:20}}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Event Title *</label><input className="input" placeholder="e.g. ML Workshop #4" value={evForm.title} onChange={e=>setEvForm({...evForm,title:e.target.value})}/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="form-group"><label>Date *</label><input className="input" placeholder="e.g. May 20" value={evForm.date} onChange={e=>setEvForm({...evForm,date:e.target.value})}/></div>
                <div className="form-group"><label>Time</label><input className="input" placeholder="e.g. 3:00 PM" value={evForm.time} onChange={e=>setEvForm({...evForm,time:e.target.value})}/></div>
              </div>
              <div className="form-group"><label>Venue</label><input className="input" placeholder="e.g. Lab 3" value={evForm.venue} onChange={e=>setEvForm({...evForm,venue:e.target.value})}/></div>
              <div className="form-group"><label>Capacity</label><input className="input" type="number" value={evForm.capacity} onChange={e=>setEvForm({...evForm,capacity:parseInt(e.target.value)})}/></div>
              <div className="form-group"><label>Description</label><textarea className="input" placeholder="What's this event about?" value={evForm.description} onChange={e=>setEvForm({...evForm,description:e.target.value})}/></div>
              <div style={{fontSize:12,color:'var(--text-muted)',padding:'8px 12px',background:'var(--bg-primary)',borderRadius:8}}>ℹ️ Event will appear after admin approval</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={()=>setEventModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddEvent}><Plus size={14}/> Submit Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ setPage }) {
  const { user } = useApp();
  if (user?.role === 'admin') return <AdminDashboard setPage={setPage} />;
  if (user?.role === 'clubhead') return <ClubHeadDashboard setPage={setPage} />;
  return <StudentDashboard setPage={setPage} />;
}
