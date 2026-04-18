import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const MOCK_USERS = [
  { id: 1, name: 'Rahul Kumar', email: '22cs001@college.edu', role: 'student', branch: 'CSE', year: 3, avatar: 'RK', color: '#4361ee' },
  { id: 2, name: 'Admin User', email: 'admin@college.edu', role: 'admin', branch: 'Admin', year: 0, avatar: 'AD', color: '#7209b7' },
  { id: 3, name: 'Priya Sharma', email: 'clubhead@college.edu', role: 'clubhead', branch: 'ECE', year: 4, avatar: 'PS', color: '#06b6d4' },
];

const INITIAL_EVENTS = [
  { id: 1, title: 'Tech Fest 2025', category: 'Technical', organizer: 'CSE Dept', date: 'Apr 22', time: '10:00 AM', venue: 'Auditorium A', registered: 87, capacity: 120, rsvps: [], description: 'Annual technical festival with competitions, workshops and speaker sessions.' },
  { id: 2, title: 'Cultural Night', category: 'Cultural', organizer: 'Cultural Club', date: 'Apr 25', time: '6:00 PM', venue: 'Open Ground', registered: 241, capacity: 300, rsvps: [], description: 'A celebration of music, dance and art from across India.' },
  { id: 3, title: 'Startup Pitch Day', category: 'Business', organizer: 'E-Cell', date: 'May 1', time: '2:00 PM', venue: 'Seminar Hall', registered: 48, capacity: 60, rsvps: [], description: 'Present your startup idea to real investors and mentors.' },
  { id: 4, title: 'AI Workshop', category: 'Workshop', organizer: 'ML Club', date: 'May 5', time: '11:00 AM', venue: 'Lab 3', registered: 39, capacity: 40, rsvps: [], description: 'Hands-on session on building AI models with Python.' },
  { id: 5, title: 'Sports Meet', category: 'Sports', organizer: 'Sports Club', date: 'May 8', time: '8:00 AM', venue: 'Grounds', registered: 156, capacity: 200, rsvps: [], description: 'Annual inter-department sports competition.' },
  { id: 6, title: 'Photography Walk', category: 'Cultural', organizer: 'Photo Club', date: 'May 10', time: '5:00 PM', venue: 'Campus', registered: 22, capacity: 30, rsvps: [], description: 'Explore the campus through a lens. All levels welcome.' },
];

const INITIAL_ANNOUNCEMENTS = [
  { id: 1, club: 'CSE Dept', initials: 'CS', color: '#4361ee', message: 'Final year project submissions due April 15. Submit via college portal only.', time: '2h ago', urgent: true, starred: false, approved: true },
  { id: 2, club: 'Library', initials: 'LB', color: '#10b981', message: 'New AI/ML books available for 15-day issue. Grab yours before they run out!', time: '5h ago', urgent: false, starred: false, approved: true },
  { id: 3, club: 'Placement Cell', initials: 'PC', color: '#f97316', message: 'Amazon campus drive scheduled for April 20. Register by April 10 on the portal.', time: '1d ago', urgent: true, starred: false, approved: true },
  { id: 4, club: 'ML Club', initials: 'ML', color: '#7209b7', message: 'Weekly reading group this Saturday 3pm. Topic: Transformers architecture deep dive.', time: '1d ago', urgent: false, starred: false, approved: true },
  { id: 5, club: 'E-Cell', initials: 'EC', color: '#06b6d4', message: 'Guest lecture by unicorn startup founder next Tuesday. Free entry for all students.', time: '2d ago', urgent: false, starred: false, approved: false },
  { id: 6, club: 'NSS', initials: 'NS', color: '#f59e0b', message: 'Blood donation camp on April 12. Volunteers please report at 9am to NSS office.', time: '2d ago', urgent: false, starred: false, approved: true },
];

const INITIAL_NOTES = [
  { id: 1, dept: 'CSE', sem: '4th Sem', subject: 'Data Structures', title: 'AVL Trees Complete Notes', uploader: 'Rahul M.', size: '2.4MB', downloads: 312, rating: 4.8, reviews: [], approved: true },
  { id: 2, dept: 'CSE', sem: '4th Sem', subject: 'DBMS', title: 'Normalization & SQL Cheatsheet', uploader: 'Priya K.', size: '1.1MB', downloads: 489, rating: 4.9, reviews: [], approved: true },
  { id: 3, dept: 'CSE', sem: '5th Sem', subject: 'OS Concepts', title: 'Process Scheduling Diagrams', uploader: 'Arjun S.', size: '3.2MB', downloads: 201, rating: 4.6, reviews: [], approved: true },
  { id: 4, dept: 'CSE', sem: '5th Sem', subject: 'Computer Networks', title: 'OSI Model Visual Notes', uploader: 'Sneha R.', size: '1.8MB', downloads: 267, rating: 4.7, reviews: [], approved: true },
  { id: 5, dept: 'AI/ML', sem: '6th Sem', subject: 'Machine Learning', title: 'ML Algorithms Handwritten', uploader: 'Karan T.', size: '5.1MB', downloads: 543, rating: 4.9, reviews: [], approved: false },
  { id: 6, dept: 'Web', sem: '6th Sem', subject: 'Web Development', title: 'React Hooks Explained with Examples', uploader: 'Nisha P.', size: '2.0MB', downloads: 388, rating: 4.8, reviews: [], approved: true },
];

const INITIAL_HACKATHONS = [
  { id: 1, name: 'HackMIT India', organizer: 'MIT ADT', status: 'open', prize: '₹2,00,000', deadline: 'Apr 28', mode: 'Offline', teamSize: '2-4', tags: ['AI', 'Web', 'IoT'], teammates: [] },
  { id: 2, name: 'Smart India Hackathon', organizer: 'Govt of India', status: 'open', prize: '₹1,00,000', deadline: 'May 10', mode: 'Online', teamSize: '6', tags: ['Govt', 'Social', 'Tech'], teammates: [] },
  { id: 3, name: 'CodeFest 5.0', organizer: 'IIT Bombay', status: 'upcoming', prize: '₹75,000', deadline: 'May 15', mode: 'Hybrid', teamSize: '2-3', tags: ['ML', 'Security', 'Finance'], teammates: [] },
  { id: 4, name: 'HackForChange', organizer: 'Google', status: 'open', prize: '$5,000', deadline: 'Apr 20', mode: 'Online', teamSize: '1-4', tags: ['Climate', 'Health', 'Education'], teammates: [] },
];

const INITIAL_QNA = [
  { id: 1, question: 'What is the cutoff for branch change in 2nd year?', answers: 3, upvotes: 12, time: '3h ago', anonymous: true },
  { id: 2, question: 'Anyone have notes for VLSI Design 6th sem ECE?', answers: 5, upvotes: 8, time: '1d ago', anonymous: false, author: 'Final Year Student' },
  { id: 3, question: 'Is the hostel WiFi working after 11pm?', answers: 7, upvotes: 23, time: '2d ago', anonymous: true },
];

const INITIAL_LOST_FOUND = [
  { id: 1, type: 'lost', item: 'Black Wallet', description: 'Near canteen, has ID card inside', contact: '22cs001@college.edu', date: 'Apr 15', resolved: false },
  { id: 2, type: 'found', item: 'Blue Water Bottle', description: 'Found in Lab 2, has stickers on it', contact: '22ec045@college.edu', date: 'Apr 14', resolved: false },
  { id: 3, type: 'lost', item: 'Airpods Case', description: 'Lost somewhere in library building', contact: '22me012@college.edu', date: 'Apr 13', resolved: true },
];

const INITIAL_CLUBS = [
  { id: 1, name: 'ML Club', category: 'Technical', members: 120, description: 'Machine learning enthusiasts building AI projects', joined: false, color: '#7209b7' },
  { id: 2, name: 'E-Cell', category: 'Business', members: 85, description: 'Entrepreneurship cell supporting student startups', joined: false, color: '#f97316' },
  { id: 3, name: 'Cultural Club', category: 'Cultural', members: 200, description: 'Dance, music and arts for the culturally inclined', joined: false, color: '#06b6d4' },
  { id: 4, name: 'Photo Club', category: 'Arts', members: 45, description: 'Photography walks and editing workshops', joined: false, color: '#10b981' },
  { id: 5, name: 'NSS', category: 'Social', members: 300, description: 'National Service Scheme for social impact', joined: false, color: '#f59e0b' },
  { id: 6, name: 'Sports Club', category: 'Sports', members: 180, description: 'Cricket, football, badminton and more', joined: false, color: '#ef4444' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Your RSVP for Tech Fest 2025 is confirmed!', time: '2h ago', read: false, type: 'success' },
  { id: 2, text: 'New announcement from CSE Dept — urgent', time: '3h ago', read: false, type: 'warning' },
  { id: 3, text: 'AI Workshop is 98% full — register soon!', time: '5h ago', read: true, type: 'info' },
  { id: 4, text: 'Your notes upload has been approved', time: '1d ago', read: true, type: 'success' },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [hackathons, setHackathons] = useState(INITIAL_HACKATHONS);
  const [qna, setQna] = useState(INITIAL_QNA);
  const [lostFound, setLostFound] = useState(INITIAL_LOST_FOUND);
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  const login = (email, role) => {
    const found = MOCK_USERS.find(u => u.email === email && u.role === role);
    if (found) { setUser(found); return true; }
    return false;
  };
  const logout = () => setUser(null);

  const rsvpEvent = (eventId) => {
    setEvents(evs => evs.map(e => {
      if (e.id !== eventId) return e;
      const alreadyRsvp = e.rsvps.includes(user.id);
      return {
        ...e,
        registered: alreadyRsvp ? e.registered - 1 : e.registered + 1,
        rsvps: alreadyRsvp ? e.rsvps.filter(id => id !== user.id) : [...e.rsvps, user.id]
      };
    }));
  };

  const addEvent = (ev) => setEvents(evs => [...evs, { ...ev, id: Date.now(), registered: 0, rsvps: [] }]);
  const deleteEvent = (id) => setEvents(evs => evs.filter(e => e.id !== id));

  const toggleStar = (annId) => setAnnouncements(anns => anns.map(a => a.id === annId ? { ...a, starred: !a.starred } : a));
  const approveAnnouncement = (id) => setAnnouncements(anns => anns.map(a => a.id === id ? { ...a, approved: true } : a));
  const deleteAnnouncement = (id) => setAnnouncements(anns => anns.filter(a => a.id !== id));
  const addAnnouncement = (ann) => setAnnouncements(anns => [...anns, { ...ann, id: Date.now(), time: 'just now', starred: false, approved: user?.role === 'admin' }]);

  const downloadNote = (noteId) => setNotes(ns => ns.map(n => n.id === noteId ? { ...n, downloads: n.downloads + 1 } : n));
  const approveNote = (id) => setNotes(ns => ns.map(n => n.id === id ? { ...n, approved: true } : n));
  const deleteNote = (id) => setNotes(ns => ns.filter(n => n.id !== id));
  const addNote = (note) => setNotes(ns => [...ns, { ...note, id: Date.now(), downloads: 0, rating: 0, reviews: [], approved: user?.role === 'admin' }]);
  const rateNote = (noteId, rating) => setNotes(ns => ns.map(n => n.id === noteId ? { ...n, rating: ((n.rating * n.reviews.length + rating) / (n.reviews.length + 1)).toFixed(1), reviews: [...n.reviews, rating] } : n));

  const joinClub = (clubId) => {
    setClubs(cs => cs.map(c => c.id === clubId ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));
  };

  const addHackathonTeammate = (hackId, name, skill) => {
    setHackathons(hs => hs.map(h => h.id === hackId ? { ...h, teammates: [...h.teammates, { name, skill, id: Date.now() }] } : h));
  };

  const addQna = (q) => setQna(qs => [{ ...q, id: Date.now(), answers: 0, upvotes: 0, time: 'just now' }, ...qs]);
  const upvoteQna = (id) => setQna(qs => qs.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));

  const addLostFound = (item) => setLostFound(lf => [{ ...item, id: Date.now(), date: 'Today', resolved: false }, ...lf]);
  const resolveLostFound = (id) => setLostFound(lf => lf.map(i => i.id === id ? { ...i, resolved: true } : i));

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  const addNotification = (text, type = 'info') => setNotifications(ns => [{ id: Date.now(), text, time: 'just now', read: false, type }, ...ns]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateUserRole = (userId, newRole) => {
    // In real app this would update DB; here just show toast
    showToast(`Role updated successfully`, 'success');
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      events, rsvpEvent, addEvent, deleteEvent,
      announcements, toggleStar, approveAnnouncement, deleteAnnouncement, addAnnouncement,
      notes, downloadNote, approveNote, deleteNote, addNote, rateNote,
      hackathons, addHackathonTeammate,
      qna, addQna, upvoteQna,
      lostFound, addLostFound, resolveLostFound,
      clubs, joinClub,
      notifications, unreadCount, markAllRead, addNotification,
      toasts, showToast,
      updateUserRole,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
