import { useState, useEffect } from "react";
import { getUserId, getUserName, setUserName, subscribeToPlaylists, createPlaylist, updatePlaylist, deletePlaylistDoc } from "./firebase.js";

const skills = [
  {
    id: "reading",
    icon: "\ud83e\udde0",
    title: "Reading the Game",
    subtitle: "Your #1 equalizer against faster, bigger opponents",
    color: "#1B4332",
    accent: "#95D5B2",
    why: "This is THE skill that separates elite center backs from average ones \u2014 and it has nothing to do with your body. Fabio Cannavaro won the Ballon d'Or at 5'9\" because he could read the game better than anyone. If you can predict what happens next, you don't need to be fast \u2014 you're already there.",
    keyConcepts: [
      "Anticipate the pass BEFORE it's played \u2014 watch the passer's hips, eyes, and body shape",
      "Recognize patterns: if the ball goes wide, where does the striker move? Learn the 3-4 common runs",
      "\"Scan\" constantly \u2014 check shoulders every 3-5 seconds to know where runners are",
      "Study your opponent's dominant foot and tendencies in the first 10 minutes",
    ],
    proExamples: [
      { name: "Fabio Cannavaro", note: "5'9\", won Ballon d'Or \u2014 pure reading ability" },
      { name: "Thiago Silva", note: "Master of positioning over pace" },
      { name: "Franco Baresi", note: "5'9\", arguably the GOAT \u2014 never needed speed" },
    ],
    videos: [
      { title: "How to Become a Smart Center Back ft. Van Dijk", search: "How to become a smart center back Virgil van Dijk", channel: "Search YouTube" },
      { title: "Thiago Silva \u2014 Art of Defending (Tactical Analysis)", search: "Thiago Silva art of defending tactical analysis", channel: "Search YouTube" },
      { title: "Cannavaro \u2014 Best Defender Without Pace", search: "Cannavaro best defending without pace compilation", channel: "Search YouTube" },
      { title: "How to Read the Game as a Defender", search: "how to read the game as a defender soccer tutorial", channel: "Search YouTube" },
    ],
    drill: "Watch one full pro match per week. Pause when a center back gets the ball or is about to defend \u2014 predict the next action. Rewind and compare. Do this for Thiago Silva or Van Dijk games specifically."
  },
  {
    id: "positioning",
    icon: "\ud83d\udcd0",
    title: "Positioning & Body Shape",
    subtitle: "Be in the right place, angled the right way",
    color: "#0D1B2A",
    accent: "#90E0EF",
    why: "Great positioning makes speed irrelevant. John Terry was famously slow but almost never got beat because he was always in the perfect spot. The key is angles: if you're positioned correctly between the ball, the attacker, and your goal, you've already won before the play starts.",
    keyConcepts: [
      "Stay goal-side and ball-side \u2014 always between attacker and your goal",
      "Defend at an angle (side-on, not square) so you can move any direction quickly",
      "Drop early when you sense a through ball \u2014 don't wait to react",
      "Keep the correct distance: close enough to press, far enough to not get turned",
      "Shift as a unit with your CB partner \u2014 stay compact, protect the middle first",
    ],
    proExamples: [
      { name: "John Terry", note: "Slow, but rarely beaten \u2014 positioning genius" },
      { name: "Giorgio Chiellini", note: "Used angles and aggression over pace" },
      { name: "Marquinhos", note: "Reads the space before the ball arrives" },
    ],
    videos: [
      { title: "John Terry Defensive Positioning Masterclass", search: "John Terry positioning defending masterclass analysis", channel: "Search YouTube" },
      { title: "How to Play Center Back \u2014 Online Soccer Academy", search: "Online Soccer Academy how to play center back", channel: "Search YouTube" },
      { title: "Defensive Body Shape & Jockey Technique", search: "defensive body shape jockey technique soccer tutorial", channel: "Search YouTube" },
      { title: "Center Back Positioning When Ball Is Wide", search: "center back positioning ball wide defending tutorial", channel: "Search YouTube" },
    ],
    drill: "1v1 drill with a teammate: they dribble at you from 20 yards. Practice sprinting to close down, then SLOWING into a side-on jockey stance at 2-3 yards. Focus on patience \u2014 don't dive in."
  },
  {
    id: "communication",
    icon: "\ud83d\udce3",
    title: "Communication & Leadership",
    subtitle: "Your voice is your superpower",
    color: "#3C1642",
    accent: "#E0AAFF",
    why: "If you can't outrun the attacker, you can organize your team so the attacker never gets the ball in a dangerous position in the first place. The best center backs are vocal commanders \u2014 calling out runners, squeezing the line, directing teammates. This is a skill you can develop TODAY with zero athleticism required.",
    keyConcepts: [
      "Use short, loud, specific commands: \"HOLD!\" \"STEP!\" \"DROP!\" \"RUNNER LEFT!\" \"MAN ON!\"",
      "Communicate BEFORE the danger \u2014 proactive, not reactive",
      "Direct fullbacks and midfielders \u2014 you have the best view of the whole field",
      "After winning the ball, talk your team through transition immediately",
      "Set the defensive line height with clear verbal cues",
    ],
    proExamples: [
      { name: "Virgil van Dijk", note: "Transformed Liverpool's entire defense with voice & presence" },
      { name: "Sergio Ramos", note: "Relentless vocal energy, organized from the back" },
      { name: "Carles Puyol", note: "\"Could not keep quiet\" \u2014 Piqu\u00e9's words. Pure passion + direction" },
    ],
    videos: [
      { title: "How Center Backs Organize a Defense", search: "how center backs organize defense communication soccer", channel: "Search YouTube" },
      { title: "Van Dijk Leadership on the Pitch \u2014 Mic'd Up", search: "Virgil van Dijk micd up leadership defending", channel: "Search YouTube" },
      { title: "Defensive Communication Drills for Youth", search: "defensive communication drills youth soccer", channel: "Search YouTube" },
    ],
    drill: "In your next training scrimmage, challenge yourself to give a verbal command before EVERY defensive action \u2014 even small ones. Call out \"ball-side!\" or \"I've got near post!\" on every set piece. Make it a habit."
  },
  {
    id: "tackling",
    icon: "\u26a1",
    title: "Smart Tackling & 1v1 Defending",
    subtitle: "Patience over aggression",
    color: "#582F0E",
    accent: "#FAA307",
    why: "When you're not the fastest, you CANNOT afford to get beaten by diving in too early. The jockey technique \u2014 staying on your feet, staying patient, forcing the attacker to make a mistake \u2014 is how undersized or slower defenders shut down even the quickest forwards.",
    keyConcepts: [
      "NEVER commit to a tackle in open space unless you're 90%+ sure you'll win it",
      "Jockey: stay low, side-on, weight on balls of feet, watching the BALL not the feet",
      "Force attacker to their weak foot or toward the sideline",
      "When attacker takes a heavy touch \u2014 THAT's when you pounce",
      "Delay, delay, delay \u2014 buy time for teammates to recover and help",
    ],
    proExamples: [
      { name: "Paolo Maldini", note: "\"If I have to make a tackle, I've already made a mistake\"" },
      { name: "Chiellini", note: "Master of the dark arts \u2014 used body, angles, experience" },
      { name: "Puyol", note: "Relentless determination \u2014 never gave up on a play" },
    ],
    videos: [
      { title: "Jockey Defending Technique for Soccer Defenders", search: "jockey defending technique soccer tutorial beginner", channel: "Search YouTube" },
      { title: "Paolo Maldini \u2014 The Art of Defending", search: "Paolo Maldini art of defending compilation", channel: "Search YouTube" },
      { title: "1v1 Defending Drills for Center Backs", search: "1v1 defending drills center back soccer", channel: "Search YouTube" },
      { title: "How to Defend Without Diving In", search: "how to defend without diving in soccer patience", channel: "Search YouTube" },
    ],
    drill: "Pair up with the best dribbler on your team. Do 1v1s from 15 yards. Your ONLY goal: don't get beaten for 10 seconds. No tackling allowed at first \u2014 just jockey and contain. Then progress to tackling only on heavy touches."
  },
  {
    id: "ball",
    icon: "\ud83c\udfaf",
    title: "Composure on the Ball",
    subtitle: "Win it, keep it, start the attack",
    color: "#1A1A2E",
    accent: "#E94560",
    why: "Modern soccer demands that center backs start the attack. If you can receive under pressure, pick the right pass, and calmly distribute, you become invaluable \u2014 coaches at every level want CBs who are comfortable in possession. This is another skill where brains beat athleticism.",
    keyConcepts: [
      "Receive side-on with hips open \u2014 gives you options to play forward",
      "First touch should move the ball away from pressure",
      "Look for the line-breaking pass into midfield before going simple",
      "Use both feet \u2014 practice your weaker foot until it's reliable",
      "Don't panic under press \u2014 if you can beat the first press with a touch, you relieve pressure for the whole team",
    ],
    proExamples: [
      { name: "Thiago Silva", note: "Calm as ice under pressure \u2014 always finds the right pass" },
      { name: "Van Dijk", note: "Long-range diagonal switches that change the whole attack" },
      { name: "Marquinhos", note: "Carries the ball forward when space opens" },
    ],
    videos: [
      { title: "Center Back Build-Up Play Tutorial", search: "center back build up play tutorial passing", channel: "Search YouTube" },
      { title: "How to Play Out From the Back as a CB", search: "how to play out from the back center back soccer", channel: "Search YouTube" },
      { title: "Passing Under Pressure Drills for Defenders", search: "passing under pressure drills defenders soccer", channel: "Search YouTube" },
    ],
    drill: "Set up two mini goals 30 yards apart. Receive a pass with your back to one goal, take a touch to open up, and play a driven pass through the other mini goal. Alternate feet. Repeat 20x each foot."
  },
  {
    id: "aerial",
    icon: "\ud83e\udd85",
    title: "Aerial Ability & Timing",
    subtitle: "Height is optional \u2014 timing and positioning are not",
    color: "#2D3436",
    accent: "#00CEC9",
    why: "You don't have to be 6'2\" to win headers. Shorter defenders like Cannavaro (5'9\") and Puyol (5'10\") were dominant in the air because they timed their jumps perfectly, positioned themselves first, and used their bodies intelligently. Great timing beats great height.",
    keyConcepts: [
      "Attack the ball \u2014 move TOWARD it, don't wait for it to come to you",
      "Time your jump: arrive at the highest point when the ball arrives",
      "Use your body to shield the attacker from the ball \u2014 get position BEFORE jumping",
      "Head to a teammate when possible (think of it as a pass, not a clearance)",
      "On defensive set pieces, track the runner AND the ball simultaneously",
    ],
    proExamples: [
      { name: "Cannavaro", note: "5'9\" \u2014 won virtually every aerial duel through timing" },
      { name: "Puyol", note: "5'10\" \u2014 famous headed goal vs Germany in 2010 WC semi-final" },
      { name: "Ramos", note: "Not the tallest but lethal in the air on both ends" },
    ],
    videos: [
      { title: "How to Win Headers as a Shorter Defender", search: "how to win headers shorter defender soccer tips", channel: "Search YouTube" },
      { title: "Cannavaro Aerial Duels Compilation", search: "Cannavaro aerial duels winning headers compilation", channel: "Search YouTube" },
      { title: "Heading Drills for Center Backs", search: "heading drills center backs soccer training", channel: "Search YouTube" },
    ],
    drill: "Have a partner throw/cross 20 balls to you from different angles. Focus on: getting your body in position FIRST, then timing the jump. Start with standing headers, progress to running and jumping."
  },
  {
    id: "study",
    icon: "\ud83d\udcfa",
    title: "Film Study & Game Intelligence",
    subtitle: "The homework that separates good from great",
    color: "#212529",
    accent: "#FFD166",
    why: "Every elite center back studies film. Watch your upcoming opponent's tendencies. Study how the best defenders handle different types of strikers. This is free, requires no physical ability, and is the single fastest way to improve your defending IQ.",
    keyConcepts: [
      "Watch 1 full match per week focused ONLY on the center backs",
      "Pause when the CB gets the ball \u2014 what would YOU do? Then compare",
      "Study your own game film \u2014 where were you out of position?",
      "Before each match, learn your opponent's dominant foot, favorite runs, and tendencies",
      "Watch how different CBs handle different striker types (target man vs. quick forward)",
    ],
    proExamples: [
      { name: "Thiago Silva", note: "Famous for studying opponents meticulously before matches" },
      { name: "Chiellini", note: "Wrote his thesis on sports science \u2014 ultimate student of the game" },
    ],
    videos: [
      { title: "How to Analyze a Soccer Match as a Defender", search: "how to analyze soccer match defender film study", channel: "Search YouTube" },
      { title: "Tactical Analysis: World's Best Center Backs 2024", search: "tactical analysis best center backs defending 2024", channel: "Search YouTube" },
      { title: "RicFit: Study Pro Center Backs (Pause & Predict Method)", search: "RicFit study pro center backs pause predict", channel: "Search YouTube" },
    ],
    drill: "Pick one defender (start with Thiago Silva). Watch a full match on YouTube. Every time the ball is near them, pause and predict their next move. Keep a tally of how often you predict correctly. Aim for 70%+."
  },
];

const weeklyPlan = [
  { day: "Monday", focus: "1v1 Jockey Drill (15 min) + Heading Practice (10 min)", category: "tackling, aerial" },
  { day: "Tuesday", focus: "Film Study: Watch 1 half focused on a pro CB", category: "study" },
  { day: "Wednesday", focus: "Passing Under Pressure Drill (15 min) + Communication Scrimmage", category: "ball, communication" },
  { day: "Thursday", focus: "Positional Shadow Play: Walk-through defensive shape with CB partner", category: "positioning" },
  { day: "Friday", focus: "Pre-match: Study opponent's striker (10 min video if available)", category: "study, reading" },
  { day: "Weekend", focus: "MATCH DAY \u2192 Post-match: Write 3 things you did well + 1 to improve", category: "all" },
];


const skillTags = [
  { id: "reading", label: "\ud83e\udde0 Reading", color: "#95D5B2" },
  { id: "positioning", label: "\ud83d\udccd Positioning", color: "#74C0FC" },
  { id: "communication", label: "\ud83d\udce2 Communication", color: "#FBBF24" },
  { id: "tackling", label: "\ud83e\udee1 Tackling", color: "#F87171" },
  { id: "ball", label: "\u26bd Composure", color: "#C084FC" },
  { id: "aerial", label: "\ud83e\udd85 Aerial", color: "#FB923C" },
  { id: "study", label: "\ud83d\udcfa Film Study", color: "#FCD34D" },
  { id: "general", label: "\u26bd General", color: "#999" },
];

function NamePicker({ onSave }) {
  const [name, setName] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "20px" }}>
      <div style={{ background: "#151515", border: "1px solid #06D6A044", borderRadius: "16px", padding: "32px 28px", maxWidth: "360px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚽</div>
        <div style={{ fontSize: "18px", fontWeight: 700, color: "#eee", marginBottom: "8px", fontFamily: "Georgia, serif" }}>Welcome to Brain Over Brawn</div>
        <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "20px" }}>Pick a name so your family knows whose playlists are whose.</p>
        <input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && name.trim() && onSave(name.trim())}
          placeholder="Your name..."
          style={{ width: "100%", background: "#0A0A0A", border: "1px solid #333", borderRadius: "10px", padding: "14px 16px", color: "#eee", fontSize: "16px", outline: "none", textAlign: "center", boxSizing: "border-box", marginBottom: "12px" }}
        />
        <button
          onClick={() => name.trim() && onSave(name.trim())}
          disabled={!name.trim()}
          style={{ width: "100%", background: name.trim() ? "#06D6A0" : "#333", border: "none", borderRadius: "10px", padding: "14px", cursor: name.trim() ? "pointer" : "not-allowed", fontSize: "14px", fontWeight: 700, color: name.trim() ? "#0A0A0A" : "#666", fontFamily: "monospace", letterSpacing: "1px" }}
        >
          LET'S GO
        </button>
      </div>
    </div>
  );
}

export default function CBGuide() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [showPlan, setShowPlan] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [checkedDrills, setCheckedDrills] = useState({});

  // User identity
  const [userId] = useState(() => getUserId());
  const [userName, setUserNameState] = useState(() => getUserName());
  const [showNamePicker, setShowNamePicker] = useState(!getUserName());

  // Firebase playlists
  const [allPlaylists, setAllPlaylists] = useState([]);
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Playlist form state
  const [newUrl, setNewUrl] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTag, setNewTag] = useState("general");
  const [filterTag, setFilterTag] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [renamingPlaylistId, setRenamingPlaylistId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistShared, setNewPlaylistShared] = useState(false);

  // Subscribe to Firestore playlists
  useEffect(() => {
    const unsub = subscribeToPlaylists("cb", userId, (playlists, ready) => {
      setAllPlaylists(playlists);
      if (ready && !loaded) {
        setLoaded(true);
        if (playlists.length > 0 && !activePlaylistId) {
          const mine = playlists.find(p => p.ownerId === userId);
          setActivePlaylistId(mine ? mine.id : playlists[0].id);
        }
      }
    });
    return unsub;
  }, [userId]);

  // Derived state
  const myPlaylists = allPlaylists.filter(p => p.ownerId === userId);
  const sharedFromOthers = allPlaylists.filter(p => p.ownerId !== userId && p.shared);
  const activePlaylist = allPlaylists.find(p => p.id === activePlaylistId);
  const videos = activePlaylist ? (activePlaylist.videos || []) : [];
  const filteredVideos = filterTag === "all" ? videos : videos.filter(v => v.tag === filterTag);
  const totalVideoCount = myPlaylists.reduce((sum, p) => sum + (p.videos || []).length, 0);
  const isOwner = activePlaylist && activePlaylist.ownerId === userId;

  const handleNameSave = (name) => {
    setUserName(name);
    setUserNameState(name);
    setShowNamePicker(false);
    // Create default playlist
    createPlaylist("cb", userId, name, "My Videos", false);
  };

  // Video CRUD
  const addVideo = async () => {
    if (!activePlaylist || !isOwner) return;
    const t = newUrl.trim();
    if (!t) return;
    const url = t.includes(".") && !t.startsWith("http") ? "https://" + t : t;
    const video = { id: Date.now().toString(), url, note: newNote.trim(), tag: newTag, addedAt: new Date().toLocaleDateString() };
    await updatePlaylist(activePlaylistId, { videos: [video, ...videos] });
    setNewUrl(""); setNewNote(""); setNewTag("general");
  };

  const removeVideo = async (videoId) => {
    if (!isOwner) return;
    await updatePlaylist(activePlaylistId, { videos: videos.filter(v => v.id !== videoId) });
  };

  const saveVideoEdit = async (videoId) => {
    if (!isOwner) return;
    await updatePlaylist(activePlaylistId, { videos: videos.map(v => v.id === videoId ? { ...v, note: editNote } : v) });
    setEditingId(null); setEditNote("");
  };

  // Playlist management
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;
    const id = await createPlaylist("cb", userId, userName, newPlaylistName.trim(), newPlaylistShared);
    setActivePlaylistId(id);
    setNewPlaylistName(""); setNewPlaylistShared(false); setShowNewPlaylistForm(false); setFilterTag("all");
  };

  const handleDeletePlaylist = async (id) => {
    const pl = allPlaylists.find(p => p.id === id);
    if (!pl || pl.ownerId !== userId) return;
    if (!confirm(`Delete "${pl.name}"? This removes all its videos.`)) return;
    await deletePlaylistDoc(id);
    if (activePlaylistId === id) {
      const remaining = myPlaylists.filter(p => p.id !== id);
      setActivePlaylistId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleRenamePlaylist = async () => {
    if (!renameValue.trim()) return;
    await updatePlaylist(renamingPlaylistId, { name: renameValue.trim() });
    setRenamingPlaylistId(null); setRenameValue("");
  };

  const toggleShared = async (pl) => {
    if (pl.ownerId !== userId) return;
    await updatePlaylist(pl.id, { shared: !pl.shared });
  };

  // Helpers
  const extractTitle = (url) => { try { const u = new URL(url); if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) return "YouTube Video"; if (u.hostname.includes("tiktok")) return "TikTok Video"; if (u.hostname.includes("instagram")) return "Instagram Reel"; if (u.hostname.includes("vimeo")) return "Vimeo Video"; return u.hostname.replace("www.", ""); } catch { return "Video Link"; } };
  const getPlatformEmoji = (url) => { try { const u = new URL(url); if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) return "\ud83d\udd34"; if (u.hostname.includes("tiktok")) return "\ud83c\udfb5"; if (u.hostname.includes("instagram")) return "\ud83d\udcf7"; if (u.hostname.includes("vimeo")) return "\ud83d\udd35"; return "\ud83d\udd17"; } catch { return "\ud83d\udd17"; } };
  const toggleDrill = (day) => setCheckedDrills(prev => ({ ...prev, [day]: !prev[day] }));
  const startEdit = (item) => { setEditingId(item.id); setEditNote(item.note); };

  const activeData = skills.find(s => s.id === activeSkill);

  const renderVideoList = (vids, accent) => vids.map((v, i) => (
    <a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.search)}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", background: "#00000030", borderRadius: "8px", padding: "12px 14px", marginBottom: "6px", textDecoration: "none", border: "1px solid #ffffff10" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#FF000022", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>▶</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13px", color: "#eee", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.title}</div>
        <div style={{ fontSize: "11px", color: "#888" }}>Click to search on YouTube →</div>
      </div>
    </a>
  ));

  const renderPlaylistItem = (item) => {
    const tag = skillTags.find(t => t.id === item.tag) || skillTags[skillTags.length - 1];
    const isEditingThis = editingId === item.id;
    return (
      <div key={item.id} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "12px 14px", background: "#00000030", borderRadius: "8px", marginBottom: "6px", border: "1px solid #ffffff08" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: tag.color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{getPlatformEmoji(item.url)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#ddd", fontWeight: 600, textDecoration: "none", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{extractTitle(item.url)} <span style={{ color: "#555", fontWeight: 400, marginLeft: "6px", fontSize: "11px" }}>↗</span></a>
          <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "4px" }}>{item.url}</div>
          {isEditingThis && isOwner ? (
            <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
              <input type="text" value={editNote} onChange={e => setEditNote(e.target.value)} onKeyDown={e => e.key === "Enter" && saveVideoEdit(item.id)} autoFocus style={{ flex: 1, background: "#0A0A0A", border: "1px solid #06D6A044", borderRadius: "6px", padding: "6px 10px", color: "#ccc", fontSize: "12px", outline: "none" }} placeholder="Edit note..." />
              <button onClick={() => saveVideoEdit(item.id)} style={{ background: "#06D6A0", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "11px", fontWeight: 700, color: "#0A0A0A" }}>Save</button>
              <button onClick={() => setEditingId(null)} style={{ background: "transparent", border: "1px solid #333", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "11px", color: "#666" }}>✕</button>
            </div>
          ) : item.note && <div onClick={() => isOwner && startEdit(item)} style={{ fontSize: "12px", color: "#999", lineHeight: 1.4, cursor: isOwner ? "pointer" : "default", fontStyle: "italic" }} title={isOwner ? "Click to edit" : ""}>"{item.note}"</div>}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "10px", color: tag.color, fontFamily: "monospace", background: tag.color + "15", padding: "2px 8px", borderRadius: "10px" }}>{tag.label}</span>
            <span style={{ fontSize: "10px", color: "#444", fontFamily: "monospace" }}>{item.addedAt}</span>
          </div>
        </div>
        {isOwner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
            {!item.note && !isEditingThis && <button onClick={() => startEdit(item)} style={{ background: "transparent", border: "1px solid #333", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "10px", color: "#666", fontFamily: "monospace" }} title="Add note">✏️</button>}
            <button onClick={() => removeVideo(item.id)} style={{ background: "transparent", border: "1px solid #333", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "10px", color: "#666", fontFamily: "monospace" }} title="Remove">🗑️</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#E8E8E8", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {showNamePicker && <NamePicker onSave={handleNameSave} />}

      {/* Hero */}
      <div style={{ background: "linear-gradient(145deg, #0A0A0A 0%, #1a2a1a 40%, #0A0A0A 100%)", padding: "48px 24px 40px", textAlign: "center", borderBottom: "1px solid #222" }}>
        <div style={{ fontSize: "14px", letterSpacing: "4px", color: "#6B8F71", textTransform: "uppercase", marginBottom: "12px", fontFamily: "monospace" }}>THE SMART DEFENDER'S PLAYBOOK</div>
        <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 400, margin: "0 0 12px", lineHeight: 1.2, color: "#F0F0F0" }}>Brain Over Brawn</h1>
        <p style={{ fontSize: "15px", color: "#999", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>What every center back must master when they're not the fastest, tallest, or most physical player on the pitch.</p>
        <div style={{ display: "inline-block", background: "#1a2a1a", border: "1px solid #2a3a2a", borderRadius: "8px", padding: "12px 20px", fontSize: "13px", color: "#95D5B2", fontFamily: "monospace" }}>⚽ Featuring: Cannavaro · Puyol · Silva · Terry · Maldini · Baresi</div>
        {userName && <div style={{ marginTop: "12px", fontSize: "11px", color: "#555", fontFamily: "monospace" }}>Logged in as {userName}</div>}
      </div>

      <div style={{ padding: "32px 20px", maxWidth: "720px", margin: "0 auto" }}>
        {/* Skill Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {skills.map((skill) => (
            <button key={skill.id} onClick={() => { setActiveSkill(activeSkill === skill.id ? null : skill.id); setShowPlan(false); setShowPlaylist(false); }} style={{ background: activeSkill === skill.id ? skill.color : "#151515", border: activeSkill === skill.id ? `2px solid ${skill.accent}` : "1px solid #2a2a2a", borderRadius: "10px", padding: "16px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", transform: activeSkill === skill.id ? "scale(1.02)" : "scale(1)" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{skill.icon}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: activeSkill === skill.id ? skill.accent : "#ccc", fontFamily: "monospace", marginBottom: "2px" }}>{skill.title}</div>
              <div style={{ fontSize: "11px", color: activeSkill === skill.id ? "#ddd" : "#666", lineHeight: 1.4 }}>{skill.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Toggle Buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button onClick={() => { setShowPlan(!showPlan); setActiveSkill(null); setShowPlaylist(false); }} style={{ flex: 1, background: showPlan ? "#1a2420" : "#151515", border: showPlan ? "2px solid #06D6A0" : "1px solid #2a2a2a", borderRadius: "10px", padding: "14px", cursor: "pointer", textAlign: "center" }}>
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: showPlan ? "#06D6A0" : "#999", letterSpacing: "2px", textTransform: "uppercase" }}>📋 Weekly Plan</span>
          </button>
          <button onClick={() => { setShowPlaylist(!showPlaylist); setActiveSkill(null); setShowPlan(false); }} style={{ flex: 1, background: showPlaylist ? "#1a2420" : "#151515", border: showPlaylist ? "2px solid #06D6A0" : "1px solid #2a2a2a", borderRadius: "10px", padding: "14px", cursor: "pointer", textAlign: "center", position: "relative" }}>
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: showPlaylist ? "#06D6A0" : "#999", letterSpacing: "2px", textTransform: "uppercase" }}>🎬 Playlists {totalVideoCount > 0 ? `(${totalVideoCount})` : ""}</span>
          </button>
        </div>

        {/* Expanded Skill Content */}
        {activeData && !showPlan && !showPlaylist && (
          <div style={{ background: activeData.color, border: `1px solid ${activeData.accent}33`, borderRadius: "14px", padding: "28px 24px", animation: "fadeIn 0.3s ease" }}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: activeData.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>WHY THIS MATTERS</div>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#ddd", margin: 0 }}>{activeData.why}</p>
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: activeData.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>KEY CONCEPTS</div>
              {activeData.keyConcepts.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", fontSize: "13px", lineHeight: 1.6, color: "#ccc" }}>
                  <span style={{ color: activeData.accent, fontFamily: "monospace", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: activeData.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>PROS TO STUDY</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {activeData.proExamples.map((p, i) => (
                  <div key={i} style={{ background: "#00000040", borderRadius: "8px", padding: "10px 14px", flex: "1 1 200px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: activeData.accent, marginBottom: "2px" }}>{p.name}</div>
                    <div style={{ fontSize: "12px", color: "#aaa", lineHeight: 1.4 }}>{p.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: activeData.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "10px" }}>🎬 VIDEO STUDY LIST</div>
              {renderVideoList(activeData.videos, activeData.accent)}
            </div>
            <div style={{ background: `${activeData.accent}15`, border: `1px solid ${activeData.accent}33`, borderRadius: "10px", padding: "16px" }}>
              <div style={{ fontSize: "11px", fontFamily: "monospace", color: activeData.accent, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>🏋️ PRACTICE DRILL</div>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#ccc", margin: 0 }}>{activeData.drill}</p>
            </div>
          </div>
        )}

        {/* Weekly Plan */}
        {showPlan && !showPlaylist && (
          <div style={{ background: "#0f1a16", border: "1px solid #06D6A033", borderRadius: "14px", padding: "28px 24px" }}>
            <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#06D6A0", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>WEEKLY TRAINING PLAN</div>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px", lineHeight: 1.6 }}>Supplement your team training with these defender-specific sessions. Focus on reading and communication daily.</p>
            {weeklyPlan.map((day, i) => (
              <div key={i} onClick={() => toggleDrill(day.day)} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px", background: checkedDrills[day.day] ? "#06D6A015" : "#00000030", borderRadius: "8px", marginBottom: "6px", cursor: "pointer", border: checkedDrills[day.day] ? "1px solid #06D6A033" : "1px solid transparent", transition: "all 0.15s ease" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "6px", border: checkedDrills[day.day] ? "2px solid #06D6A0" : "2px solid #444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0, marginTop: "1px", color: "#06D6A0" }}>{checkedDrills[day.day] ? "✓" : ""}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: checkedDrills[day.day] ? "#06D6A0" : "#ccc", fontFamily: "monospace", marginBottom: "2px" }}>{day.day}</div>
                  <div style={{ fontSize: "13px", color: checkedDrills[day.day] ? "#bbb" : "#888", lineHeight: 1.5, textDecoration: checkedDrills[day.day] ? "line-through" : "none" }}>{day.focus}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playlist Panel */}
        {showPlaylist && (
          <div style={{ background: "#0f1a16", border: "1px solid #06D6A033", borderRadius: "14px", padding: "28px 24px", animation: "fadeIn 0.3s ease" }}>
            <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#06D6A0", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>VIDEO PLAYLISTS</div>
            <p style={{ fontSize: "13px", color: "#777", marginBottom: "16px", lineHeight: 1.6 }}>Your playlists sync live — add a video and everyone with access sees it instantly.</p>

            {!loaded && <div style={{ textAlign: "center", padding: "32px", color: "#555", fontFamily: "monospace", fontSize: "13px" }}>Loading playlists...</div>}

            {loaded && (
              <>
                {/* My Playlist Tabs */}
                {myPlaylists.length > 0 && (
                  <div style={{ marginBottom: "8px" }}>
                    <div style={{ fontSize: "10px", color: "#555", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "6px" }}>MY PLAYLISTS</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                      {myPlaylists.map(pl => (
                        <div key={pl.id} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                          {renamingPlaylistId === pl.id ? (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleRenamePlaylist(); if (e.key === "Escape") setRenamingPlaylistId(null); }} style={{ background: "#0A0A0A", border: "1px solid #06D6A0", borderRadius: "6px", padding: "5px 8px", color: "#eee", fontSize: "12px", width: "120px", outline: "none" }} />
                              <button onClick={handleRenamePlaylist} style={{ background: "#06D6A030", border: "1px solid #06D6A0", borderRadius: "6px", padding: "4px 8px", color: "#06D6A0", fontSize: "11px", cursor: "pointer" }}>✓</button>
                            </div>
                          ) : (
                            <button onClick={() => { setActivePlaylistId(pl.id); setFilterTag("all"); }} onDoubleClick={() => { setRenamingPlaylistId(pl.id); setRenameValue(pl.name); }} style={{ background: activePlaylistId === pl.id ? "#06D6A020" : "#00000040", border: activePlaylistId === pl.id ? "1px solid #06D6A0" : "1px solid #333", borderRadius: myPlaylists.length > 1 && activePlaylistId === pl.id ? "8px 0 0 8px" : "8px", padding: "7px 12px", cursor: "pointer", fontSize: "12px", color: activePlaylistId === pl.id ? "#06D6A0" : "#999", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                              {pl.shared ? "🌐 " : "🔒 "}{pl.name} ({(pl.videos || []).length})
                            </button>
                          )}
                          {activePlaylistId === pl.id && myPlaylists.length > 1 && renamingPlaylistId !== pl.id && (
                            <button onClick={() => handleDeletePlaylist(pl.id)} title="Delete" style={{ background: "#33000040", border: "1px solid #333", borderLeft: "none", borderRadius: "0 8px 8px 0", padding: "7px 8px", cursor: "pointer", fontSize: "11px", color: "#FF6B6B", fontFamily: "monospace" }}>✕</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shared from others */}
                {sharedFromOthers.length > 0 && (
                  <div style={{ marginBottom: "8px" }}>
                    <div style={{ fontSize: "10px", color: "#555", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "6px" }}>SHARED WITH ME</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {sharedFromOthers.map(pl => (
                        <button key={pl.id} onClick={() => { setActivePlaylistId(pl.id); setFilterTag("all"); }} style={{ background: activePlaylistId === pl.id ? "#06D6A020" : "#00000040", border: activePlaylistId === pl.id ? "1px solid #06D6A0" : "1px solid #333", borderRadius: "8px", padding: "7px 12px", cursor: "pointer", fontSize: "12px", color: activePlaylistId === pl.id ? "#06D6A0" : "#999", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                          🌐 {pl.name} ({(pl.videos || []).length}) <span style={{ fontSize: "10px", color: "#666" }}>by {pl.ownerName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* New playlist / shared toggle buttons */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", marginTop: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  {!showNewPlaylistForm ? (
                    <button onClick={() => setShowNewPlaylistForm(true)} style={{ background: "transparent", border: "1px dashed #06D6A060", borderRadius: "8px", padding: "7px 12px", cursor: "pointer", fontSize: "12px", color: "#06D6A0", fontFamily: "monospace" }}>+ New Playlist</button>
                  ) : (
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                      <input autoFocus value={newPlaylistName} onChange={e => setNewPlaylistName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleCreatePlaylist(); if (e.key === "Escape") setShowNewPlaylistForm(false); }} placeholder="Playlist name..." style={{ background: "#0A0A0A", border: "1px solid #06D6A0", borderRadius: "6px", padding: "6px 10px", color: "#eee", fontSize: "12px", width: "140px", outline: "none" }} />
                      <button onClick={() => setNewPlaylistShared(!newPlaylistShared)} style={{ background: newPlaylistShared ? "#06D6A020" : "transparent", border: "1px solid #333", borderRadius: "6px", padding: "6px 8px", cursor: "pointer", fontSize: "11px", color: newPlaylistShared ? "#06D6A0" : "#666", fontFamily: "monospace" }}>{newPlaylistShared ? "🌐 Shared" : "🔒 Private"}</button>
                      <button onClick={handleCreatePlaylist} style={{ background: "#06D6A0", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "11px", fontWeight: 700, color: "#0A0A0A" }}>Create</button>
                      <button onClick={() => setShowNewPlaylistForm(false)} style={{ background: "transparent", border: "1px solid #333", borderRadius: "6px", padding: "6px 8px", cursor: "pointer", fontSize: "11px", color: "#666" }}>✕</button>
                    </div>
                  )}
                  {activePlaylist && isOwner && (
                    <button onClick={() => toggleShared(activePlaylist)} style={{ background: activePlaylist.shared ? "#06D6A015" : "transparent", border: `1px solid ${activePlaylist.shared ? "#06D6A044" : "#333"}`, borderRadius: "6px", padding: "6px 10px", cursor: "pointer", fontSize: "11px", color: activePlaylist.shared ? "#06D6A0" : "#666", fontFamily: "monospace" }}>{activePlaylist.shared ? "🌐 Shared with family" : "🔒 Private — tap to share"}</button>
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "#444", marginBottom: "16px", fontStyle: "italic" }}>Double-click a tab to rename · {activePlaylist && !isOwner ? "Viewing shared playlist (read-only)" : "Changes sync live"}</div>

                {/* Add Video Form (only if owner) */}
                {activePlaylist && isOwner && (
                  <div style={{ background: "#00000040", borderRadius: "10px", padding: "16px", marginBottom: "20px", border: "1px solid #06D6A020" }}>
                    <input type="text" value={newUrl} onChange={e => setNewUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && addVideo()} placeholder="Paste a video URL here..." style={{ width: "100%", background: "#0A0A0A", border: "1px solid #333", borderRadius: "8px", padding: "12px 14px", color: "#eee", fontSize: "14px", fontFamily: "monospace", outline: "none", marginBottom: "10px", boxSizing: "border-box" }} />
                    <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={e => e.key === "Enter" && addVideo()} placeholder="Add a note (optional)" style={{ width: "100%", background: "#0A0A0A", border: "1px solid #333", borderRadius: "8px", padding: "10px 14px", color: "#ccc", fontSize: "13px", outline: "none", marginBottom: "10px", boxSizing: "border-box" }} />
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginBottom: "12px" }}>
                      <div style={{ fontSize: "11px", color: "#888", fontFamily: "monospace" }}>TAG:</div>
                      {skillTags.map(tag => (
                        <button key={tag.id} onClick={() => setNewTag(tag.id)} style={{ background: newTag === tag.id ? tag.color + "25" : "transparent", border: newTag === tag.id ? `1px solid ${tag.color}` : "1px solid #333", borderRadius: "20px", padding: "4px 10px", cursor: "pointer", fontSize: "11px", color: newTag === tag.id ? tag.color : "#888", fontFamily: "monospace", whiteSpace: "nowrap" }}>{tag.label}</button>
                      ))}
                    </div>
                    <button onClick={addVideo} disabled={!newUrl.trim()} style={{ width: "100%", background: newUrl.trim() ? "#06D6A0" : "#333", border: "none", borderRadius: "8px", padding: "11px", cursor: newUrl.trim() ? "pointer" : "not-allowed", fontSize: "13px", fontWeight: 700, color: newUrl.trim() ? "#0A0A0A" : "#666", fontFamily: "monospace", letterSpacing: "1px" }}>+ ADD TO PLAYLIST</button>
                  </div>
                )}

                {/* Filter Tags */}
                {videos.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace" }}>FILTER:</div>
                    <button onClick={() => setFilterTag("all")} style={{ background: filterTag === "all" ? "#06D6A020" : "transparent", border: filterTag === "all" ? "1px solid #06D6A0" : "1px solid #2a2a2a", borderRadius: "20px", padding: "3px 10px", cursor: "pointer", fontSize: "11px", color: filterTag === "all" ? "#06D6A0" : "#666", fontFamily: "monospace" }}>All ({videos.length})</button>
                    {skillTags.filter(tag => videos.some(v => v.tag === tag.id)).map(tag => {
                      const count = videos.filter(v => v.tag === tag.id).length;
                      return <button key={tag.id} onClick={() => setFilterTag(filterTag === tag.id ? "all" : tag.id)} style={{ background: filterTag === tag.id ? tag.color + "20" : "transparent", border: filterTag === tag.id ? `1px solid ${tag.color}` : "1px solid #2a2a2a", borderRadius: "20px", padding: "3px 10px", cursor: "pointer", fontSize: "11px", color: filterTag === tag.id ? tag.color : "#666", fontFamily: "monospace" }}>{tag.label} ({count})</button>;
                    })}
                  </div>
                )}

                {/* Video List */}
                {!activePlaylist && myPlaylists.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px", color: "#444" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎬</div>
                    <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>Create your first playlist to start saving training videos!</div>
                  </div>
                )}
                {activePlaylist && videos.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px", color: "#444" }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎬</div>
                    <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{isOwner ? "This playlist is empty! Add videos from the skill sections above." : "No videos yet — the owner hasn't added any."}</div>
                  </div>
                )}
                {filteredVideos.map(renderPlaylistItem)}

                {/* Footer */}
                {videos.length > 0 && (
                  <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #ffffff08", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#444", fontFamily: "monospace" }}>{videos.length} video{videos.length !== 1 ? "s" : ""} · Synced live via Firebase</span>
                    {isOwner && <button onClick={async () => { if (confirm("Clear all videos?")) await updatePlaylist(activePlaylistId, { videos: [] }); }} style={{ background: "transparent", border: "1px solid #333", borderRadius: "6px", padding: "5px 12px", cursor: "pointer", fontSize: "11px", color: "#555", fontFamily: "monospace" }}>Clear All</button>}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Bottom Quote */}
        {!activeData && !showPlan && !showPlaylist && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#555" }}>
            <div style={{ fontSize: "18px", fontStyle: "italic", color: "#777", marginBottom: "12px", lineHeight: 1.6 }}>"I never made a tackle in my career — a tackle means you've already made a mistake."</div>
            <div style={{ fontSize: "13px", fontFamily: "monospace", color: "#555" }}>— Paolo Maldini</div>
            <div style={{ marginTop: "24px", fontSize: "12px", color: "#444" }}>↑ Tap a skill above to explore ↑</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.92; }
      `}</style>
    </div>
  );
}
