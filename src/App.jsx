import { useState, useEffect } from "react";

const skills = [
  {
    id: "reading",
    icon: "🧠",
    title: "Reading the Game",
    subtitle: "Your #1 equalizer against faster, bigger opponents",
    color: "#1B4332",
    accent: "#95D5B2",
    why: "This is THE skill that separates elite center backs from average ones — and it has nothing to do with your body. Fabio Cannavaro won the Ballon d'Or at 5'9\" because he could read the game better than anyone. If you can predict what happens next, you don't need to be fast — you're already there.",
    keyConcepts: [
      "Anticipate the pass BEFORE it's played — watch the passer's hips, eyes, and body shape",
      "Recognize patterns: if the ball goes wide, where does the striker move? Learn the 3-4 common runs",
      "\"Scan\" constantly — check shoulders every 3-5 seconds to know where runners are",
      "Study your opponent's dominant foot and tendencies in the first 10 minutes",
    ],
    proExamples: [
      { name: "Fabio Cannavaro", note: "5'9\", won Ballon d'Or — pure reading ability" },
      { name: "Thiago Silva", note: "Master of positioning over pace" },
      { name: "Franco Baresi", note: "5'9\", arguably the GOAT — never needed speed" },
    ],
    videos: [
      { title: "How to Become a Smart Center Back ft. Van Dijk", search: "How to become a smart center back Virgil van Dijk", channel: "Search YouTube" },
      { title: "Thiago Silva — Art of Defending (Tactical Analysis)", search: "Thiago Silva art of defending tactical analysis", channel: "Search YouTube" },
      { title: "Cannavaro — Best Defender Without Pace", search: "Cannavaro best defending without pace compilation", channel: "Search YouTube" },
      { title: "How to Read the Game as a Defender", search: "how to read the game as a defender soccer tutorial", channel: "Search YouTube" },
    ],
    drill: "Watch one full pro match per week. Pause when a center back gets the ball or is about to defend — predict the next action. Rewind and compare. Do this for Thiago Silva or Van Dijk games specifically."
  },
  {
    id: "positioning",
    icon: "📐",
    title: "Positioning & Body Shape",
    subtitle: "Be in the right place, angled the right way",
    color: "#0D1B2A",
    accent: "#90E0EF",
    why: "Great positioning makes speed irrelevant. John Terry was famously slow but almost never got beat because he was always in the perfect spot. The key is angles: if you're positioned correctly between the ball, the attacker, and your goal, you've already won before the play starts.",
    keyConcepts: [
      "Stay goal-side and ball-side — always between attacker and your goal",
      "Defend at an angle (side-on, not square) so you can move any direction quickly",
      "Drop early when you sense a through ball — don't wait to react",
      "Keep the correct distance: close enough to press, far enough to not get turned",
      "Shift as a unit with your CB partner — stay compact, protect the middle first",
    ],
    proExamples: [
      { name: "John Terry", note: "Slow, but rarely beaten — positioning genius" },
      { name: "Giorgio Chiellini", note: "Used angles and aggression over pace" },
      { name: "Marquinhos", note: "Reads the space before the ball arrives" },
    ],
    videos: [
      { title: "John Terry Defensive Positioning Masterclass", search: "John Terry positioning defending masterclass analysis", channel: "Search YouTube" },
      { title: "How to Play Center Back — Online Soccer Academy", search: "Online Soccer Academy how to play center back", channel: "Search YouTube" },
      { title: "Defensive Body Shape & Jockey Technique", search: "defensive body shape jockey technique soccer tutorial", channel: "Search YouTube" },
      { title: "Center Back Positioning When Ball Is Wide", search: "center back positioning ball wide defending tutorial", channel: "Search YouTube" },
    ],
    drill: "1v1 drill with a teammate: they dribble at you from 20 yards. Practice sprinting to close down, then SLOWING into a side-on jockey stance at 2-3 yards. Focus on patience — don't dive in."
  },
  {
    id: "communication",
    icon: "📣",
    title: "Communication & Leadership",
    subtitle: "Your voice is your superpower",
    color: "#3C1642",
    accent: "#E0AAFF",
    why: "If you can't outrun the attacker, you can organize your team so the attacker never gets the ball in a dangerous position in the first place. The best center backs are vocal commanders — calling out runners, squeezing the line, directing teammates. This is a skill you can develop TODAY with zero athleticism required.",
    keyConcepts: [
      "Use short, loud, specific commands: \"HOLD!\" \"STEP!\" \"DROP!\" \"RUNNER LEFT!\" \"MAN ON!\"",
      "Communicate BEFORE the danger — proactive, not reactive",
      "Direct fullbacks and midfielders — you have the best view of the whole field",
      "After winning the ball, talk your team through transition immediately",
      "Set the defensive line height with clear verbal cues",
    ],
    proExamples: [
      { name: "Virgil van Dijk", note: "Transformed Liverpool's entire defense with voice & presence" },
      { name: "Sergio Ramos", note: "Relentless vocal energy, organized from the back" },
      { name: "Carles Puyol", note: "\"Could not keep quiet\" — Piqué's words. Pure passion + direction" },
    ],
    videos: [
      { title: "How Center Backs Organize a Defense", search: "how center backs organize defense communication soccer", channel: "Search YouTube" },
      { title: "Van Dijk Leadership on the Pitch — Mic'd Up", search: "Virgil van Dijk micd up leadership defending", channel: "Search YouTube" },
      { title: "Defensive Communication Drills for Youth", search: "defensive communication drills youth soccer", channel: "Search YouTube" },
    ],
    drill: "In your next training scrimmage, challenge yourself to give a verbal command before EVERY defensive action — even small ones. Call out \"ball-side!\" or \"I've got near post!\" on every set piece. Make it a habit."
  },
  {
    id: "tackling",
    icon: "⚡",
    title: "Smart Tackling & 1v1 Defending",
    subtitle: "Patience over aggression",
    color: "#582F0E",
    accent: "#FAA307",
    why: "When you're not the fastest, you CANNOT afford to get beaten by diving in too early. The jockey technique — staying on your feet, staying patient, forcing the attacker to make a mistake — is how undersized or slower defenders shut down even the quickest forwards.",
    keyConcepts: [
      "NEVER commit to a tackle in open space unless you're 90%+ sure you'll win it",
      "Jockey: stay low, side-on, weight on balls of feet, watching the BALL not the feet",
      "Force attacker to their weak foot or toward the sideline",
      "When attacker takes a heavy touch — THAT's when you pounce",
      "Delay, delay, delay — buy time for teammates to recover and help",
    ],
    proExamples: [
      { name: "Paolo Maldini", note: "\"If I have to make a tackle, I've already made a mistake\"" },
      { name: "Chiellini", note: "Master of the dark arts — used body, angles, experience" },
      { name: "Puyol", note: "Relentless determination — never gave up on a play" },
    ],
    videos: [
      { title: "Jockey Defending Technique for Soccer Defenders", search: "jockey defending technique soccer tutorial beginner", channel: "Search YouTube" },
      { title: "Paolo Maldini — The Art of Defending", search: "Paolo Maldini art of defending compilation", channel: "Search YouTube" },
      { title: "1v1 Defending Drills for Center Backs", search: "1v1 defending drills center back soccer", channel: "Search YouTube" },
      { title: "How to Defend Without Diving In", search: "how to defend without diving in soccer patience", channel: "Search YouTube" },
    ],
    drill: "Pair up with the best dribbler on your team. Do 1v1s from 15 yards. Your ONLY goal: don't get beaten for 10 seconds. No tackling allowed at first — just jockey and contain. Then progress to tackling only on heavy touches."
  },
  {
    id: "ball",
    icon: "🎯",
    title: "Composure on the Ball",
    subtitle: "Win it, keep it, start the attack",
    color: "#1A1A2E",
    accent: "#E94560",
    why: "Modern soccer demands that center backs start the attack. If you can receive under pressure, pick the right pass, and calmly distribute, you become invaluable — coaches at every level want CBs who are comfortable in possession. This is another skill where brains beat athleticism.",
    keyConcepts: [
      "Receive side-on with hips open — gives you options to play forward",
      "First touch should move the ball away from pressure",
      "Look for the line-breaking pass into midfield before going simple",
      "Use both feet — practice your weaker foot until it's reliable",
      "Don't panic under press — if you can beat the first press with a touch, you relieve pressure for the whole team",
    ],
    proExamples: [
      { name: "Thiago Silva", note: "Calm as ice under pressure — always finds the right pass" },
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
    icon: "🦅",
    title: "Aerial Ability & Timing",
    subtitle: "Height is optional — timing and positioning are not",
    color: "#2D3436",
    accent: "#00CEC9",
    why: "You don't have to be 6'2\" to win headers. Shorter defenders like Cannavaro (5'9\") and Puyol (5'10\") were dominant in the air because they timed their jumps perfectly, positioned themselves first, and used their bodies intelligently. Great timing beats great height.",
    keyConcepts: [
      "Attack the ball — move TOWARD it, don't wait for it to come to you",
      "Time your jump: arrive at the highest point when the ball arrives",
      "Use your body to shield the attacker from the ball — get position BEFORE jumping",
      "Head to a teammate when possible (think of it as a pass, not a clearance)",
      "On defensive set pieces, track the runner AND the ball simultaneously",
    ],
    proExamples: [
      { name: "Cannavaro", note: "5'9\" — won virtually every aerial duel through timing" },
      { name: "Puyol", note: "5'10\" — famous headed goal vs Germany in 2010 WC semi-final" },
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
    icon: "📺",
    title: "Film Study & Game Intelligence",
    subtitle: "The homework that separates good from great",
    color: "#212529",
    accent: "#FFD166",
    why: "Every elite center back studies film. Watch your upcoming opponent's tendencies. Study how the best defenders handle different types of strikers. This is free, requires no physical ability, and is the single fastest way to improve your defending IQ.",
    keyConcepts: [
      "Watch 1 full match per week focused ONLY on the center backs",
      "Pause when the CB gets the ball — what would YOU do? Then compare",
      "Study your own game film — where were you out of position?",
      "Before each match, learn your opponent's dominant foot, favorite runs, and tendencies",
      "Watch how different CBs handle different striker types (target man vs. quick forward)",
    ],
    proExamples: [
      { name: "Thiago Silva", note: "Famous for studying opponents meticulously before matches" },
      { name: "Chiellini", note: "Wrote his thesis on sports science — ultimate student of the game" },
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
  { day: "Weekend", focus: "MATCH DAY → Post-match: Write 3 things you did well + 1 to improve", category: "all" },
];

const skillTags = [
  { id: "reading", label: "🧠 Reading", color: "#95D5B2" },
  { id: "positioning", label: "📐 Positioning", color: "#90E0EF" },
  { id: "communication", label: "📣 Communication", color: "#E0AAFF" },
  { id: "tackling", label: "⚡ Tackling", color: "#FAA307" },
  { id: "ball", label: "🎯 On the Ball", color: "#E94560" },
  { id: "aerial", label: "🦅 Aerial", color: "#00CEC9" },
  { id: "study", label: "📺 Film Study", color: "#FFD166" },
  { id: "general", label: "⚽ General", color: "#999" },
];

export default function CBGuide() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [showPlan, setShowPlan] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [checkedDrills, setCheckedDrills] = useState({});

  // Playlist state
  const [playlist, setPlaylist] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newTag, setNewTag] = useState("general");
  const [playlistLoaded, setPlaylistLoaded] = useState(false);
  const [filterTag, setFilterTag] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");

  // Share/Import state
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [showImportPanel, setShowImportPanel] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const [importCode, setImportCode] = useState("");
  const [importPreview, setImportPreview] = useState(null);
  const [importStatus, setImportStatus] = useState(""); // "success", "error", ""
  const [copiedShare, setCopiedShare] = useState(false);

  // Dual storage: try window.storage (Claude), fall back to localStorage
  const storageGet = async (key) => {
    try {
      if (window.storage && window.storage.get) {
        const result = await window.storage.get(key);
        return result ? result.value : null;
      }
    } catch {}
    try { return localStorage.getItem(key); } catch { return null; }
  };

  const storageSet = async (key, value) => {
    try {
      if (window.storage && window.storage.set) {
        await window.storage.set(key, value);
        return;
      }
    } catch {}
    try { localStorage.setItem(key, value); } catch {}
  };

  // Load playlist on mount
  useEffect(() => {
    const loadPlaylist = async () => {
      const data = await storageGet("cb-playlist");
      if (data) {
        try { setPlaylist(JSON.parse(data)); } catch {}
      }
      setPlaylistLoaded(true);
    };
    loadPlaylist();
  }, []);

  // Save playlist whenever it changes
  useEffect(() => {
    if (!playlistLoaded) return;
    storageSet("cb-playlist", JSON.stringify(playlist));
  }, [playlist, playlistLoaded]);

  // Share: encode playlist to a compact string
  const generateShareCode = () => {
    const compact = playlist.map(p => ({
      u: p.url,
      n: p.note || "",
      t: p.tag,
      d: p.addedAt || "",
    }));
    const json = JSON.stringify(compact);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    const code = "CBP1:" + encoded; // prefix for versioning
    setShareCode(code);
    setShowSharePanel(true);
    setShowImportPanel(false);
    setCopiedShare(false);
  };

  const copyShareCode = () => {
    navigator.clipboard.writeText(shareCode).then(() => {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }).catch(() => {
      // Fallback: select text in the textarea
      const el = document.getElementById("share-code-field");
      if (el) { el.select(); document.execCommand("copy"); setCopiedShare(true); }
    });
  };

  // Import: decode a share code and preview
  const previewImport = () => {
    setImportStatus("");
    try {
      const code = importCode.trim();
      if (!code.startsWith("CBP1:")) throw new Error("Invalid code");
      const encoded = code.slice(5);
      const json = decodeURIComponent(escape(atob(encoded)));
      const compact = JSON.parse(json);
      const items = compact.map((p, i) => ({
        id: "imp_" + Date.now() + "_" + i,
        url: p.u,
        note: p.n || "",
        tag: p.t || "general",
        addedAt: p.d || new Date().toLocaleDateString(),
      }));
      setImportPreview(items);
    } catch (e) {
      setImportStatus("error");
      setImportPreview(null);
    }
  };

  const confirmImport = () => {
    if (!importPreview) return;
    // Merge: add only URLs not already in playlist
    const existingUrls = new Set(playlist.map(p => p.url));
    const newItems = importPreview.filter(p => !existingUrls.has(p.url));
    const dupes = importPreview.length - newItems.length;
    setPlaylist(prev => [...newItems, ...prev]);
    setImportStatus("success");
    setImportPreview(null);
    setImportCode("");
    setTimeout(() => {
      setImportStatus("");
      setShowImportPanel(false);
    }, 2500);
  };

  // Extract a readable title from a URL
  const extractTitle = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) return "YouTube Video";
      if (u.hostname.includes("tiktok.com")) return "TikTok Video";
      if (u.hostname.includes("instagram.com")) return "Instagram Reel";
      if (u.hostname.includes("vimeo.com")) return "Vimeo Video";
      return u.hostname.replace("www.", "");
    } catch {
      return "Video Link";
    }
  };

  // Get favicon/platform icon
  const getPlatformEmoji = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) return "🔴";
      if (u.hostname.includes("tiktok")) return "🎵";
      if (u.hostname.includes("instagram")) return "📷";
      if (u.hostname.includes("vimeo")) return "🔵";
      return "🔗";
    } catch {
      return "🔗";
    }
  };

  const addToPlaylist = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    // Basic URL validation — accept anything with a dot
    const isUrl = trimmed.includes(".");
    const url = isUrl && !trimmed.startsWith("http") ? "https://" + trimmed : trimmed;

    const entry = {
      id: Date.now().toString(),
      url,
      note: newNote.trim() || "",
      tag: newTag,
      addedAt: new Date().toLocaleDateString(),
    };
    setPlaylist(prev => [entry, ...prev]);
    setNewUrl("");
    setNewNote("");
    setNewTag("general");
  };

  const removeFromPlaylist = (id) => {
    setPlaylist(prev => prev.filter(p => p.id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditNote(item.note);
  };

  const saveEdit = (id) => {
    setPlaylist(prev => prev.map(p => p.id === id ? { ...p, note: editNote } : p));
    setEditingId(null);
    setEditNote("");
  };

  const filteredPlaylist = filterTag === "all" ? playlist : playlist.filter(p => p.tag === filterTag);

  const toggleDrill = (day) => {
    setCheckedDrills(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const activeData = skills.find(s => s.id === activeSkill);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      color: "#E8E8E8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(145deg, #0A0A0A 0%, #1a2a1a 40%, #0A0A0A 100%)",
        padding: "48px 24px 40px",
        textAlign: "center",
        borderBottom: "1px solid #222",
      }}>
        <div style={{ fontSize: "14px", letterSpacing: "4px", color: "#6B8F71", textTransform: "uppercase", marginBottom: "12px", fontFamily: "monospace" }}>
          THE SMART DEFENDER'S PLAYBOOK
        </div>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 40px)",
          fontWeight: 400,
          margin: "0 0 12px",
          lineHeight: 1.2,
          color: "#F0F0F0",
        }}>
          Brain Over Brawn
        </h1>
        <p style={{
          fontSize: "15px",
          color: "#999",
          maxWidth: "520px",
          margin: "0 auto 24px",
          lineHeight: 1.6,
        }}>
          What every center back must master when they're not the fastest, tallest, or most physical player on the pitch. Curated videos, pro examples & weekly drills.
        </p>
        <div style={{
          display: "inline-block",
          background: "#1a2a1a",
          border: "1px solid #2a3a2a",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "13px",
          color: "#95D5B2",
          fontFamily: "monospace",
        }}>
          ⚽ Featuring: Cannavaro · Puyol · Silva · Terry · Maldini · Baresi
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div style={{ padding: "32px 20px", maxWidth: "720px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}>
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => { setActiveSkill(activeSkill === skill.id ? null : skill.id); setShowPlan(false); setShowPlaylist(false); }}
              style={{
                background: activeSkill === skill.id ? skill.color : "#151515",
                border: activeSkill === skill.id ? `2px solid ${skill.accent}` : "1px solid #2a2a2a",
                borderRadius: "10px",
                padding: "16px 14px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                transform: activeSkill === skill.id ? "scale(1.02)" : "scale(1)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{skill.icon}</div>
              <div style={{
                fontSize: "14px",
                fontWeight: 700,
                color: activeSkill === skill.id ? skill.accent : "#ccc",
                fontFamily: "monospace",
                marginBottom: "2px",
              }}>
                {skill.title}
              </div>
              <div style={{
                fontSize: "11px",
                color: activeSkill === skill.id ? "#ddd" : "#666",
                lineHeight: 1.4,
              }}>
                {skill.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Toggle Buttons Row */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button
            onClick={() => { setShowPlan(!showPlan); setActiveSkill(null); setShowPlaylist(false); }}
            style={{
              flex: 1,
              background: showPlan ? "#1a1a2e" : "#151515",
              border: showPlan ? "2px solid #E94560" : "1px solid #2a2a2a",
              borderRadius: "10px",
              padding: "14px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: showPlan ? "#E94560" : "#999", letterSpacing: "2px", textTransform: "uppercase" }}>
              📋 Weekly Plan
            </span>
          </button>
          <button
            onClick={() => { setShowPlaylist(!showPlaylist); setActiveSkill(null); setShowPlan(false); }}
            style={{
              flex: 1,
              background: showPlaylist ? "#1a2420" : "#151515",
              border: showPlaylist ? "2px solid #06D6A0" : "1px solid #2a2a2a",
              borderRadius: "10px",
              padding: "14px",
              cursor: "pointer",
              textAlign: "center",
              position: "relative",
            }}
          >
            <span style={{ fontSize: "13px", fontFamily: "monospace", color: showPlaylist ? "#06D6A0" : "#999", letterSpacing: "2px", textTransform: "uppercase" }}>
              🎬 My Playlist {playlist.length > 0 ? `(${playlist.length})` : ""}
            </span>
          </button>
        </div>

        {/* Expanded Content */}
        {activeData && !showPlan && !showPlaylist && (
          <div style={{
            background: activeData.color,
            border: `1px solid ${activeData.accent}33`,
            borderRadius: "14px",
            padding: "28px 24px",
            animation: "fadeIn 0.3s ease",
          }}>
            {/* WHY section */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: activeData.accent,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                WHY THIS MATTERS
              </div>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#ddd", margin: 0 }}>
                {activeData.why}
              </p>
            </div>

            {/* Key Concepts */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: activeData.accent,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>
                KEY CONCEPTS
              </div>
              {activeData.keyConcepts.map((c, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "8px",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "#ccc",
                }}>
                  <span style={{ color: activeData.accent, fontFamily: "monospace", flexShrink: 0 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{c}</span>
                </div>
              ))}
            </div>

            {/* Pro Examples */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: activeData.accent,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>
                PROS TO STUDY
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {activeData.proExamples.map((p, i) => (
                  <div key={i} style={{
                    background: "#00000040",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    flex: "1 1 200px",
                  }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: activeData.accent, marginBottom: "2px" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#aaa", lineHeight: 1.4 }}>
                      {p.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: activeData.accent,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>
                🎬 VIDEO STUDY LIST
              </div>
              {activeData.videos.map((v, i) => (
                <a
                  key={i}
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.search)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#00000030",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    marginBottom: "6px",
                    textDecoration: "none",
                    border: "1px solid #ffffff10",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = activeData.accent + "55"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#ffffff10"}
                >
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#FF000022",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}>
                    ▶
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "13px",
                      color: "#eee",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}>
                      {v.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "#888" }}>
                      Click to search on YouTube →
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Practice Drill */}
            <div style={{
              background: `${activeData.accent}15`,
              border: `1px solid ${activeData.accent}33`,
              borderRadius: "10px",
              padding: "16px",
            }}>
              <div style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: activeData.accent,
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                🏋️ PRACTICE DRILL
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#ccc", margin: 0 }}>
                {activeData.drill}
              </p>
            </div>
          </div>
        )}

        {/* Weekly Plan */}
        {showPlan && (
          <div style={{
            background: "#1a1a2e",
            border: "1px solid #E9456033",
            borderRadius: "14px",
            padding: "28px 24px",
          }}>
            <div style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "#E94560",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>
              WEEKLY TRAINING PLAN
            </div>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px", lineHeight: 1.6 }}>
              Supplement your regular team training with this brain-first schedule. None of these require elite athleticism — just focus and consistency.
            </p>
            {weeklyPlan.map((day, i) => (
              <div
                key={i}
                onClick={() => toggleDrill(day.day)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px",
                  background: checkedDrills[day.day] ? "#E9456015" : "#00000030",
                  borderRadius: "8px",
                  marginBottom: "6px",
                  cursor: "pointer",
                  border: checkedDrills[day.day] ? "1px solid #E9456033" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "6px",
                  border: checkedDrills[day.day] ? "2px solid #E94560" : "2px solid #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  flexShrink: 0,
                  marginTop: "1px",
                  color: "#E94560",
                }}>
                  {checkedDrills[day.day] ? "✓" : ""}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: checkedDrills[day.day] ? "#E94560" : "#ccc",
                    fontFamily: "monospace",
                    marginBottom: "2px",
                  }}>
                    {day.day}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    color: checkedDrills[day.day] ? "#bbb" : "#888",
                    lineHeight: 1.5,
                    textDecoration: checkedDrills[day.day] ? "line-through" : "none",
                  }}>
                    {day.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playlist Panel */}
        {showPlaylist && (
          <div style={{
            background: "#0f1a16",
            border: "1px solid #06D6A033",
            borderRadius: "14px",
            padding: "28px 24px",
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "#06D6A0",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>
              MY VIDEO PLAYLIST
            </div>
            <p style={{ fontSize: "13px", color: "#777", marginBottom: "20px", lineHeight: 1.6 }}>
              Paste links to videos you find helpful — YouTube, TikTok, Instagram, anything. Tag them by skill and build your personal study library.
            </p>

            {/* Add New Link Form */}
            <div style={{
              background: "#00000040",
              borderRadius: "10px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid #06D6A020",
            }}>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && addToPlaylist()}
                  placeholder="Paste a video URL here..."
                  style={{
                    width: "100%",
                    background: "#0A0A0A",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    color: "#eee",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && addToPlaylist()}
                  placeholder="Add a note (optional) — e.g. 'Great example of jockey technique at 3:20'"
                  style={{
                    width: "100%",
                    background: "#0A0A0A",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#ccc",
                    fontSize: "13px",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ fontSize: "11px", color: "#888", fontFamily: "monospace", marginRight: "4px" }}>TAG:</div>
                {skillTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setNewTag(tag.id)}
                    style={{
                      background: newTag === tag.id ? tag.color + "25" : "transparent",
                      border: newTag === tag.id ? `1px solid ${tag.color}` : "1px solid #333",
                      borderRadius: "20px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontSize: "11px",
                      color: newTag === tag.id ? tag.color : "#888",
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <button
                onClick={addToPlaylist}
                disabled={!newUrl.trim()}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  background: newUrl.trim() ? "#06D6A0" : "#333",
                  border: "none",
                  borderRadius: "8px",
                  padding: "11px",
                  cursor: newUrl.trim() ? "pointer" : "not-allowed",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: newUrl.trim() ? "#0A0A0A" : "#666",
                  fontFamily: "monospace",
                  letterSpacing: "1px",
                  transition: "all 0.15s ease",
                }}
              >
                + ADD TO PLAYLIST
              </button>
            </div>

            {/* Filter Tags */}
            {playlist.length > 0 && (
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontSize: "11px", color: "#555", fontFamily: "monospace", marginRight: "4px" }}>FILTER:</div>
                <button
                  onClick={() => setFilterTag("all")}
                  style={{
                    background: filterTag === "all" ? "#06D6A020" : "transparent",
                    border: filterTag === "all" ? "1px solid #06D6A0" : "1px solid #2a2a2a",
                    borderRadius: "20px",
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: filterTag === "all" ? "#06D6A0" : "#666",
                    fontFamily: "monospace",
                  }}
                >
                  All ({playlist.length})
                </button>
                {skillTags.filter(tag => playlist.some(p => p.tag === tag.id)).map((tag) => {
                  const count = playlist.filter(p => p.tag === tag.id).length;
                  return (
                    <button
                      key={tag.id}
                      onClick={() => setFilterTag(filterTag === tag.id ? "all" : tag.id)}
                      style={{
                        background: filterTag === tag.id ? tag.color + "20" : "transparent",
                        border: filterTag === tag.id ? `1px solid ${tag.color}` : "1px solid #2a2a2a",
                        borderRadius: "20px",
                        padding: "3px 10px",
                        cursor: "pointer",
                        fontSize: "11px",
                        color: filterTag === tag.id ? tag.color : "#666",
                        fontFamily: "monospace",
                      }}
                    >
                      {tag.label} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Playlist Items */}
            {filteredPlaylist.length === 0 && playlist.length === 0 && (
              <div style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "#444",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎬</div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#555" }}>
                  Your playlist is empty! Find videos from the skill sections above or paste any link you discover.
                </div>
              </div>
            )}

            {filteredPlaylist.length === 0 && playlist.length > 0 && (
              <div style={{ textAlign: "center", padding: "20px", color: "#555", fontSize: "13px" }}>
                No videos with this tag yet.
              </div>
            )}

            {filteredPlaylist.map((item) => {
              const tag = skillTags.find(t => t.id === item.tag) || skillTags[skillTags.length - 1];
              const isEditing = editingId === item.id;
              return (
                <div key={item.id} style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  padding: "12px 14px",
                  background: "#00000030",
                  borderRadius: "8px",
                  marginBottom: "6px",
                  border: "1px solid #ffffff08",
                }}>
                  {/* Platform icon */}
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: tag.color + "15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}>
                    {getPlatformEmoji(item.url)}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        color: "#ddd",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {extractTitle(item.url)}
                      <span style={{ color: "#555", fontWeight: 400, marginLeft: "6px", fontSize: "11px" }}>↗</span>
                    </a>
                    <div style={{
                      fontSize: "11px",
                      color: "#555",
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "4px",
                    }}>
                      {item.url}
                    </div>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        <input
                          type="text"
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                          autoFocus
                          style={{
                            flex: 1,
                            background: "#0A0A0A",
                            border: "1px solid #06D6A044",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            color: "#ccc",
                            fontSize: "12px",
                            outline: "none",
                          }}
                          placeholder="Edit note..."
                        />
                        <button
                          onClick={() => saveEdit(item.id)}
                          style={{
                            background: "#06D6A0",
                            border: "none",
                            borderRadius: "6px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#0A0A0A",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{
                            background: "transparent",
                            border: "1px solid #333",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontSize: "11px",
                            color: "#666",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      item.note && (
                        <div
                          onClick={() => startEdit(item)}
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            lineHeight: 1.4,
                            cursor: "pointer",
                            fontStyle: "italic",
                          }}
                          title="Click to edit note"
                        >
                          "{item.note}"
                        </div>
                      )
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{
                        fontSize: "10px",
                        color: tag.color,
                        fontFamily: "monospace",
                        background: tag.color + "15",
                        padding: "2px 8px",
                        borderRadius: "10px",
                      }}>
                        {tag.label}
                      </span>
                      <span style={{ fontSize: "10px", color: "#444", fontFamily: "monospace" }}>{item.addedAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
                    {!item.note && !isEditing && (
                      <button
                        onClick={() => startEdit(item)}
                        style={{
                          background: "transparent",
                          border: "1px solid #333",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "10px",
                          color: "#666",
                          fontFamily: "monospace",
                        }}
                        title="Add a note"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => removeFromPlaylist(item.id)}
                      style={{
                        background: "transparent",
                        border: "1px solid #333",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        cursor: "pointer",
                        fontSize: "10px",
                        color: "#666",
                        fontFamily: "monospace",
                      }}
                      title="Remove from playlist"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Share / Import Section */}
            <div style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid #ffffff10",
            }}>
              {/* Share/Import toggle buttons */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <button
                  onClick={() => {
                    if (!showSharePanel) generateShareCode();
                    else setShowSharePanel(false);
                    setShowImportPanel(false);
                  }}
                  disabled={playlist.length === 0}
                  style={{
                    flex: 1,
                    background: showSharePanel ? "#06D6A015" : "#00000030",
                    border: showSharePanel ? "1px solid #06D6A044" : "1px solid #ffffff10",
                    borderRadius: "8px",
                    padding: "10px",
                    cursor: playlist.length > 0 ? "pointer" : "not-allowed",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: showSharePanel ? "#06D6A0" : (playlist.length > 0 ? "#999" : "#444"),
                    letterSpacing: "1px",
                  }}
                >
                  📤 SHARE MY PLAYLIST
                </button>
                <button
                  onClick={() => {
                    setShowImportPanel(!showImportPanel);
                    setShowSharePanel(false);
                    setImportCode("");
                    setImportPreview(null);
                    setImportStatus("");
                  }}
                  style={{
                    flex: 1,
                    background: showImportPanel ? "#7C3AED15" : "#00000030",
                    border: showImportPanel ? "1px solid #7C3AED44" : "1px solid #ffffff10",
                    borderRadius: "8px",
                    padding: "10px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: showImportPanel ? "#A78BFA" : "#999",
                    letterSpacing: "1px",
                  }}
                >
                  📥 IMPORT VIDEOS
                </button>
              </div>

              {/* Share Panel */}
              {showSharePanel && (
                <div style={{
                  background: "#06D6A008",
                  border: "1px solid #06D6A022",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "12px",
                  animation: "fadeIn 0.2s ease",
                }}>
                  <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#06D6A0", letterSpacing: "2px", marginBottom: "8px" }}>
                    SHARE CODE
                  </div>
                  <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, marginBottom: "10px" }}>
                    Copy this code and text/email it. They can paste it into the "Import Videos" section to get all your picks.
                  </p>
                  <textarea
                    id="share-code-field"
                    readOnly
                    value={shareCode}
                    style={{
                      width: "100%",
                      background: "#0A0A0A",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      padding: "10px",
                      color: "#777",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      resize: "none",
                      height: "60px",
                      outline: "none",
                      wordBreak: "break-all",
                    }}
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={copyShareCode}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      background: copiedShare ? "#06D6A030" : "#06D6A0",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: copiedShare ? "#06D6A0" : "#0A0A0A",
                      fontFamily: "monospace",
                      letterSpacing: "1px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedShare ? "✓ COPIED TO CLIPBOARD!" : "COPY CODE"}
                  </button>
                  <div style={{ fontSize: "11px", color: "#555", marginTop: "8px", textAlign: "center", fontFamily: "monospace" }}>
                    Includes {playlist.length} video{playlist.length !== 1 ? "s" : ""} with notes & tags
                  </div>
                </div>
              )}

              {/* Import Panel */}
              {showImportPanel && (
                <div style={{
                  background: "#7C3AED08",
                  border: "1px solid #7C3AED22",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "12px",
                  animation: "fadeIn 0.2s ease",
                }}>
                  <div style={{ fontSize: "11px", fontFamily: "monospace", color: "#A78BFA", letterSpacing: "2px", marginBottom: "8px" }}>
                    IMPORT VIDEOS
                  </div>

                  {importStatus === "success" ? (
                    <div style={{
                      textAlign: "center",
                      padding: "20px",
                    }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
                      <div style={{ fontSize: "14px", color: "#06D6A0", fontWeight: 700, fontFamily: "monospace" }}>
                        Videos imported!
                      </div>
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, marginBottom: "10px" }}>
                        Paste a share code from a parent, coach, or teammate to add their video picks to your playlist.
                      </p>
                      <textarea
                        value={importCode}
                        onChange={(e) => { setImportCode(e.target.value); setImportPreview(null); setImportStatus(""); }}
                        placeholder="Paste share code here (starts with CBP1:)..."
                        style={{
                          width: "100%",
                          background: "#0A0A0A",
                          border: importStatus === "error" ? "1px solid #E9456066" : "1px solid #333",
                          borderRadius: "8px",
                          padding: "10px",
                          color: "#ccc",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          resize: "none",
                          height: "60px",
                          outline: "none",
                          wordBreak: "break-all",
                        }}
                      />
                      {importStatus === "error" && (
                        <div style={{ fontSize: "11px", color: "#E94560", marginTop: "6px", fontFamily: "monospace" }}>
                          ⚠ Invalid share code — make sure you copied the full code including "CBP1:"
                        </div>
                      )}

                      {!importPreview && (
                        <button
                          onClick={previewImport}
                          disabled={!importCode.trim()}
                          style={{
                            marginTop: "8px",
                            width: "100%",
                            background: importCode.trim() ? "#A78BFA" : "#333",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px",
                            cursor: importCode.trim() ? "pointer" : "not-allowed",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: importCode.trim() ? "#0A0A0A" : "#666",
                            fontFamily: "monospace",
                            letterSpacing: "1px",
                          }}
                        >
                          PREVIEW IMPORT
                        </button>
                      )}

                      {/* Import Preview */}
                      {importPreview && (
                        <div style={{ marginTop: "12px" }}>
                          <div style={{
                            fontSize: "11px",
                            fontFamily: "monospace",
                            color: "#A78BFA",
                            marginBottom: "8px",
                          }}>
                            Found {importPreview.length} video{importPreview.length !== 1 ? "s" : ""}:
                          </div>
                          <div style={{
                            maxHeight: "160px",
                            overflowY: "auto",
                            background: "#00000030",
                            borderRadius: "8px",
                            padding: "8px",
                            marginBottom: "10px",
                          }}>
                            {importPreview.map((item, i) => {
                              const tag = skillTags.find(t => t.id === item.tag) || skillTags[skillTags.length - 1];
                              return (
                                <div key={i} style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "6px 8px",
                                  borderBottom: i < importPreview.length - 1 ? "1px solid #ffffff08" : "none",
                                }}>
                                  <span style={{ fontSize: "14px" }}>{getPlatformEmoji(item.url)}</span>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                      fontSize: "12px",
                                      color: "#ccc",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}>
                                      {extractTitle(item.url)}
                                      {item.note && <span style={{ color: "#777", fontStyle: "italic" }}> — {item.note}</span>}
                                    </div>
                                  </div>
                                  <span style={{
                                    fontSize: "9px",
                                    color: tag.color,
                                    fontFamily: "monospace",
                                    background: tag.color + "15",
                                    padding: "2px 6px",
                                    borderRadius: "8px",
                                    flexShrink: 0,
                                  }}>
                                    {tag.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={confirmImport}
                              style={{
                                flex: 1,
                                background: "#06D6A0",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px",
                                cursor: "pointer",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#0A0A0A",
                                fontFamily: "monospace",
                                letterSpacing: "1px",
                              }}
                            >
                              ✓ ADD ALL TO MY PLAYLIST
                            </button>
                            <button
                              onClick={() => { setImportPreview(null); setImportCode(""); }}
                              style={{
                                background: "transparent",
                                border: "1px solid #333",
                                borderRadius: "8px",
                                padding: "10px 14px",
                                cursor: "pointer",
                                fontSize: "12px",
                                color: "#666",
                                fontFamily: "monospace",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Playlist footer */}
            {playlist.length > 0 && (
              <div style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #ffffff08",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontSize: "11px", color: "#444", fontFamily: "monospace" }}>
                  {playlist.length} video{playlist.length !== 1 ? "s" : ""} saved · Auto-saved
                </span>
                <button
                  onClick={() => {
                    if (confirm("Clear your entire playlist? This can't be undone.")) {
                      setPlaylist([]);
                    }
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #333",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: "#555",
                    fontFamily: "monospace",
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        )}
        {/* Bottom Quote */}
        {!activeData && !showPlan && !showPlaylist && (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#555",
          }}>
            <div style={{ fontSize: "18px", fontStyle: "italic", color: "#777", marginBottom: "12px", lineHeight: 1.6 }}>
              "If I have to make a tackle, then I have already made a mistake."
            </div>
            <div style={{ fontSize: "13px", fontFamily: "monospace", color: "#555" }}>
              — Paolo Maldini
            </div>
            <div style={{ marginTop: "24px", fontSize: "12px", color: "#444" }}>
              ↑ Tap a skill above to explore ↑
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.92; }
      `}</style>
    </div>
  );
}
