import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBo1QI2ofMnOGev0t-2IRthtcppQyLspPY",
  authDomain: "soccertrainer-4f1c8.firebaseapp.com",
  projectId: "soccertrainer-4f1c8",
  storageBucket: "soccertrainer-4f1c8.firebasestorage.app",
  messagingSenderId: "958459610580",
  appId: "1:958459610580:web:99d53044f385caf2884241"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get or create a persistent user ID
export function getUserId() {
  let id = localStorage.getItem("soccer-user-id");
  if (!id) {
    id = "u_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("soccer-user-id", id);
  }
  return id;
}

export function getUserName() {
  return localStorage.getItem("soccer-user-name") || "";
}

export function setUserName(name) {
  localStorage.setItem("soccer-user-name", name);
}

// Firestore helpers
const playlistsRef = collection(db, "playlists");

export function subscribeToPlaylists(appName, userId, callback) {
  // Query: my playlists OR shared playlists for this app
  // We need two listeners since Firestore can't do OR across different fields
  let myPlaylists = [];
  let sharedPlaylists = [];
  let initialLoadDone = { my: false, shared: false };

  const notify = () => {
    // Combine, dedup by id, sort: mine first, then shared
    const all = [...myPlaylists, ...sharedPlaylists];
    const seen = new Set();
    const deduped = all.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
    callback(deduped, initialLoadDone.my && initialLoadDone.shared);
  };

  // My playlists (private + my shared ones)
  const myQuery = query(playlistsRef, where("app", "==", appName), where("ownerId", "==", userId), orderBy("createdAt", "asc"));
  const unsub1 = onSnapshot(myQuery, (snap) => {
    myPlaylists = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    initialLoadDone.my = true;
    notify();
  });

  // Others' shared playlists
  const sharedQuery = query(playlistsRef, where("app", "==", appName), where("shared", "==", true), orderBy("createdAt", "asc"));
  const unsub2 = onSnapshot(sharedQuery, (snap) => {
    sharedPlaylists = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    initialLoadDone.shared = true;
    notify();
  });

  return () => { unsub1(); unsub2(); };
}

export async function createPlaylist(appName, userId, userName, name, shared = false) {
  const docRef = await addDoc(playlistsRef, {
    app: appName,
    ownerId: userId,
    ownerName: userName,
    name,
    shared,
    videos: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePlaylist(playlistId, updates) {
  const ref = doc(db, "playlists", playlistId);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
}

export async function deletePlaylistDoc(playlistId) {
  await deleteDoc(doc(db, "playlists", playlistId));
}

export { db };
