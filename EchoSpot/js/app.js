import { putEcho, getAllEchoes, countEchoes, clearAllEchoes } from './idb.js';
import { distanceMeters, randomPointNear, formatDistance, formatTimeAgo, watchLocation } from './geo.js';
import { synthDemoAudioBlob } from './synth.js';
import { initMap, onEchoClick, onMapClick, setUserPosition, panTo, renderEchoes, flyToEcho } from './map.js';

const FALLBACK_POS = { lat: -27.4698, lng: 153.0251 }; // used when geolocation fails (default: Brisbane City, Australia)
const AVATARS = ['🙂', '😎', '🥸', '🐱', '🐼', '🦊', '🐧', '👾', '🌈', '🎈'];
const MOODS = ['🎸', '🎹', '🎤', '🎧', '🌊', '🌙', '✨', '🥁', '🔥'];

const DEMO_PERSONAS = [
  { nickname: 'Night Breeze', avatar: '🌙' },
  { nickname: 'Some Passerby', avatar: '🐼' },
  { nickname: 'The Wanderer', avatar: '🎒' },
  { nickname: 'City Walker', avatar: '🚶' },
  { nickname: 'Tape Collector', avatar: '📻' },
  { nickname: 'In the Mist', avatar: '🌫️' },
  { nickname: 'Fig Tree Dave', avatar: '🌳' },
  { nickname: 'Stray Cat', avatar: '🐈' },
  { nickname: 'Anonymous', avatar: '🕶️' },
  { nickname: 'Riverside Rambler', avatar: '🚴' },
  { nickname: 'Ferry Hopper', avatar: '⛴️' },
  { nickname: 'Late Shift', avatar: '🌃' },
  { nickname: 'Sunday Wanderer', avatar: '☕' },
  { nickname: 'Old Soul', avatar: '📼' },
];

const DEMO_SEEDS = [
  { title: 'Whistling at the Queen St lights', mood: '🎤', genre: 'A Cappella' },
  { title: 'Ten seconds before the CityCat departs', mood: '🎧', genre: 'Field Recording' },
  { title: 'Just after the rain stopped', mood: '🌊', genre: 'Ambient' },
  { title: 'Synths at 3am', mood: '🎹', genre: 'Synthwave' },
  { title: 'Wind on the rooftop', mood: '🌙', genre: 'Ambient Drone' },
  { title: 'Static from an old record', mood: '✨', genre: 'Lo-fi' },
  { title: 'Clatter from the food stall', mood: '🥁', genre: 'Percussion Jam' },
  { title: 'Busker waiting under Story Bridge', mood: '🎸', genre: 'Acoustic Folk' },
  { title: 'Heart beating a little fast', mood: '🔥', genre: 'Drum & Bass' },
  { title: 'Feeling calm today', mood: '🌊', genre: 'Downtempo' },
  { title: 'Guitar practice on the balcony', mood: '🎸', genre: 'Indie Rock' },
  { title: 'Piano through an open window', mood: '🎹', genre: 'Piano Ballad' },
  { title: 'Humming on the ferry to South Bank', mood: '🎤', genre: 'Vocal Loop' },
  { title: 'Headphones on, city lights blurring', mood: '🎧', genre: 'Chillhop' },
  { title: 'River at dawn, still and quiet', mood: '🌊', genre: 'Ambient' },
  { title: 'Moonlight over the Botanic Gardens', mood: '🌙', genre: 'Nocturne' },
  { title: 'Fireworks echo from South Bank', mood: '✨', genre: 'Cinematic' },
  { title: 'Drumline warming up in the Mall', mood: '🥁', genre: 'Marching Beat' },
  { title: 'Bassline from the corner pub', mood: '🔥', genre: 'Funk' },
  { title: 'Jacaranda petals falling', mood: '🌙', genre: 'Dream Pop' },
  { title: 'Skateboard wheels on Grey Street', mood: '🥁', genre: 'Trap' },
  { title: 'A song for whoever finds this', mood: '✨', genre: 'Ethereal' },
  { title: 'Rooftop bar, golden hour', mood: '🎧', genre: 'Deep House' },
  { title: 'Practising scales before the gig', mood: '🎹', genre: 'Jazz' },
  { title: 'Left my headphones here on purpose', mood: '🎤', genre: 'Bedroom Pop' },
  { title: 'Thunderstorm rolling in from the west', mood: '🔥', genre: 'Post-Rock' },
];

const el = (id) => document.getElementById(id);
const dom = {
  profileBtn: el('profileBtn'),
  profileAvatar: el('profileAvatar'),
  profileName: el('profileName'),
  testModeBtn: el('testModeBtn'),
  resetDataBtn: el('resetDataBtn'),
  radiusRange: el('radiusRange'),
  radiusValue: el('radiusValue'),
  statusLine: el('statusLine'),
  echoList: el('echoList'),
  dropBtn: el('dropBtn'),

  onboardModal: el('onboardModal'),
  onboardName: el('onboardName'),
  onboardAvatarPicker: el('onboardAvatarPicker'),
  onboardSubmit: el('onboardSubmit'),

  dropModal: el('dropModal'),
  dropClose: el('dropClose'),
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabUpload: el('tabUpload'),
  tabRecord: el('tabRecord'),
  fileInput: el('fileInput'),
  fileHint: el('fileHint'),
  fileDropLabel: el('fileDropLabel'),
  recordBtn: el('recordBtn'),
  recordTime: el('recordTime'),
  recordPreview: el('recordPreview'),
  dropTitle: el('dropTitle'),
  dropMoodPicker: el('dropMoodPicker'),
  dropLocationInfo: el('dropLocationInfo'),
  dropSubmit: el('dropSubmit'),

  detailModal: el('detailModal'),
  detailClose: el('detailClose'),
  detailTitle: el('detailTitle'),
  detailGenre: el('detailGenre'),
  detailAvatar: el('detailAvatar'),
  detailNickname: el('detailNickname'),
  detailTime: el('detailTime'),
  detailDistance: el('detailDistance'),
  detailPlayBtn: el('detailPlayBtn'),
  detailTrack: el('detailTrack'),
  detailProgress: el('detailProgress'),
  detailLikeBtn: el('detailLikeBtn'),
  detailLikeIcon: el('detailLikeIcon'),
  detailLikeCount: el('detailLikeCount'),
  detailLocateBtn: el('detailLocateBtn'),

  audioPlayer: el('audioPlayer'),
  toast: el('toast'),
};

const state = {
  profile: JSON.parse(localStorage.getItem('echospot-profile') || 'null'),
  position: null,
  realPosition: null,
  testMode: false,
  ready: false,
  geoFallbackNote: '',
  radius: Number(dom.radiusRange.value),
  echoes: [],
  currentList: [],
  currentPlayingId: null,
  audioUrlCache: new Map(),
  likedIds: new Set(JSON.parse(localStorage.getItem('echospot-liked') || '[]')),
  detailEchoId: null,
  drop: { mood: MOODS[0], fileBlob: null },
  recorder: null,
  recordStream: null,
  recordTimerId: null,
  recordSeconds: 0,
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function showToast(msg) {
  dom.toast.textContent = msg;
  dom.toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => dom.toast.classList.remove('show'), 2600);
}

function formatRadiusLabel(m) {
  return m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;
}

function uid() {
  return (crypto.randomUUID && crypto.randomUUID()) || `e-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------- Avatar / mood picker ----------
function buildEmojiPicker(container, options, selected, onSelect) {
  container.innerHTML = '';
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'emoji-btn' + (opt === selected ? ' active' : '');
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.emoji-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(opt);
    });
    container.appendChild(btn);
  });
}

// ---------- Profile / onboarding ----------
function setProfileUI() {
  if (!state.profile) return;
  dom.profileAvatar.textContent = state.profile.avatar;
  dom.profileName.textContent = state.profile.nickname;
}

function openOnboarding() {
  let selectedAvatar = state.profile?.avatar || AVATARS[0];
  dom.onboardName.value = state.profile?.nickname || '';
  buildEmojiPicker(dom.onboardAvatarPicker, AVATARS, selectedAvatar, (v) => (selectedAvatar = v));
  dom.onboardModal.classList.remove('hidden');
  dom.onboardSubmit.onclick = () => {
    const nickname = dom.onboardName.value.trim() || 'Anonymous Traveler';
    state.profile = { nickname, avatar: selectedAvatar };
    localStorage.setItem('echospot-profile', JSON.stringify(state.profile));
    setProfileUI();
    dom.onboardModal.classList.add('hidden');
  };
}

// ---------- Demo data ----------
async function ensureSeedData(center) {
  const existing = await countEchoes();
  if (existing > 0) return;
  const picks = [...DEMO_SEEDS].sort(() => Math.random() - 0.5).slice(0, 16);
  for (const seed of picks) {
    const persona = DEMO_PERSONAS[Math.floor(Math.random() * DEMO_PERSONAS.length)];
    const point = randomPointNear(center, 60, 2800);
    const id = uid();
    const audioBlob = await synthDemoAudioBlob(id, seed.mood, 5 + Math.random() * 3);
    const echo = {
      id,
      lat: point.lat,
      lng: point.lng,
      title: seed.title,
      mood: seed.mood,
      genre: seed.genre,
      nickname: persona.nickname,
      avatar: persona.avatar,
      createdAt: Date.now() - Math.floor(Math.random() * 5 * 86400000),
      likes: Math.floor(Math.random() * 20),
      audioBlob,
      isDemo: true,
    };
    await putEcho(echo);
  }
}

async function ensureReady(center) {
  if (state.ready) return;
  state.ready = true;
  await ensureSeedData(center);
  state.echoes = await getAllEchoes();
}

// ---------- Map & list sync ----------
function syncUserMarker() {
  if (!state.position) return;
  setUserPosition(state.position, state.radius);
}

function refresh() {
  if (!state.position) return;
  const list = state.echoes
    .map((e) => ({ ...e, dist: distanceMeters(state.position, { lat: e.lat, lng: e.lng }) }))
    .filter((e) => e.dist <= state.radius)
    .sort((a, b) => a.dist - b.dist);
  state.currentList = list;
  renderFeedList(list);
  renderEchoes(list, state.currentPlayingId);
  const note = state.geoFallbackNote ? ` · ${state.geoFallbackNote}` : '';
  dom.statusLine.textContent = `${list.length} echo${list.length === 1 ? '' : 'es'} within ${formatRadiusLabel(state.radius)}${note}`;
}

function renderFeedList(list) {
  if (list.length === 0) {
    dom.echoList.innerHTML = `<li class="empty-hint">No echoes near you yet — be the first to drop one 🎵</li>`;
    return;
  }
  dom.echoList.innerHTML = list
    .map((echo) => {
      const playing = echo.id === state.currentPlayingId;
      const liked = state.likedIds.has(echo.id);
      return `
      <li class="echo-item ${playing ? 'playing' : ''}" data-id="${echo.id}">
        <button class="echo-play-btn" aria-label="Play">${playing ? '⏸' : '▶'}</button>
        <div class="echo-info">
          <div class="echo-title-row">
            <span class="echo-mood">${echo.mood}</span>
            <span class="echo-title">${escapeHtml(echo.title)}</span>
          </div>
          <div class="echo-meta">${echo.genre ? `<span class="genre-pill">${escapeHtml(echo.genre)}</span> · ` : ''}${echo.avatar} ${escapeHtml(echo.nickname)} · ${formatTimeAgo(echo.createdAt)} · ${formatDistance(echo.dist)}</div>
        </div>
        <div class="echo-likes">${liked ? '❤️' : '🤍'} ${echo.likes || 0}</div>
      </li>`;
    })
    .join('');
}

function syncPlaybackUI() {
  renderFeedList(state.currentList);
  renderEchoes(state.currentList, state.currentPlayingId);
  if (!dom.detailModal.classList.contains('hidden')) {
    dom.detailPlayBtn.textContent = state.currentPlayingId === state.detailEchoId ? '⏸' : '▶';
  }
}

// ---------- Playback ----------
function getAudioUrl(echo) {
  if (state.audioUrlCache.has(echo.id)) return state.audioUrlCache.get(echo.id);
  const url = URL.createObjectURL(echo.audioBlob);
  state.audioUrlCache.set(echo.id, url);
  return url;
}

async function playEcho(id) {
  const echo = state.echoes.find((e) => e.id === id);
  if (!echo) return;
  if (state.currentPlayingId === id) {
    dom.audioPlayer.pause();
    state.currentPlayingId = null;
    syncPlaybackUI();
    return;
  }
  try {
    dom.audioPlayer.src = getAudioUrl(echo);
    dom.audioPlayer.currentTime = 0;
    await dom.audioPlayer.play();
    state.currentPlayingId = id;
  } catch (err) {
    console.error(err);
    showToast('Playback failed, please try again');
    state.currentPlayingId = null;
  }
  syncPlaybackUI();
}

function updateDetailProgress() {
  if (dom.detailModal.classList.contains('hidden')) return;
  if (state.currentPlayingId !== state.detailEchoId || !dom.audioPlayer.duration) {
    return;
  }
  const pct = (dom.audioPlayer.currentTime / dom.audioPlayer.duration) * 100;
  dom.detailProgress.style.width = `${pct}%`;
}

// ---------- Detail card ----------
function updateDetailLikeUI(echo) {
  const liked = state.likedIds.has(echo.id);
  dom.detailLikeIcon.textContent = liked ? '❤️' : '🤍';
  dom.detailLikeCount.textContent = echo.likes || 0;
}

function openDetail(id) {
  const echo = state.echoes.find((e) => e.id === id);
  if (!echo) return;
  state.detailEchoId = id;
  dom.detailTitle.textContent = echo.title;
  dom.detailGenre.textContent = echo.genre || '';
  dom.detailGenre.classList.toggle('hidden', !echo.genre);
  dom.detailAvatar.textContent = echo.avatar;
  dom.detailNickname.textContent = echo.nickname;
  dom.detailTime.textContent = formatTimeAgo(echo.createdAt);
  const dist = state.position ? distanceMeters(state.position, echo) : null;
  dom.detailDistance.textContent = dist != null ? `${formatDistance(dist)} away` : '';
  dom.detailProgress.style.width = state.currentPlayingId === id ? dom.detailProgress.style.width : '0%';
  updateDetailLikeUI(echo);
  dom.detailPlayBtn.textContent = state.currentPlayingId === id ? '⏸' : '▶';
  dom.detailModal.classList.remove('hidden');
  flyToEcho(echo);
}

async function toggleLike(id) {
  const echo = state.echoes.find((e) => e.id === id);
  if (!echo) return;
  if (state.likedIds.has(id)) {
    state.likedIds.delete(id);
    echo.likes = Math.max(0, (echo.likes || 0) - 1);
  } else {
    state.likedIds.add(id);
    echo.likes = (echo.likes || 0) + 1;
  }
  localStorage.setItem('echospot-liked', JSON.stringify([...state.likedIds]));
  await putEcho(echo);
  updateDetailLikeUI(echo);
  renderFeedList(state.currentList);
}

// ---------- Dropping an echo ----------
function updateDropLocationInfo() {
  if (!state.position) {
    dom.dropLocationInfo.textContent = 'Will be dropped at: locating, please wait…';
    return;
  }
  dom.dropLocationInfo.textContent = `Will be dropped at: lat ${state.position.lat.toFixed(5)}, lng ${state.position.lng.toFixed(5)}`;
}

function validateDropForm() {
  dom.dropSubmit.disabled = !(state.drop.fileBlob && state.position);
}

function resetRecordUI() {
  dom.recordBtn.textContent = '🎙️ Start recording';
  dom.recordBtn.classList.remove('recording');
  dom.recordTime.textContent = '00:00';
  dom.recordPreview.classList.add('hidden');
  dom.recordPreview.removeAttribute('src');
  clearInterval(state.recordTimerId);
  state.recordTimerId = null;
  state.recordSeconds = 0;
}

function openDropModal() {
  state.drop = { mood: MOODS[0], fileBlob: null };
  dom.dropTitle.value = '';
  dom.fileHint.textContent = 'Click to choose an audio file';
  dom.fileInput.value = '';
  resetRecordUI();
  buildEmojiPicker(dom.dropMoodPicker, MOODS, state.drop.mood, (v) => (state.drop.mood = v));
  dom.tabButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === 'upload'));
  dom.tabUpload.classList.remove('hidden');
  dom.tabRecord.classList.add('hidden');
  updateDropLocationInfo();
  validateDropForm();
  dom.dropModal.classList.remove('hidden');
}

function closeDropModal() {
  dom.dropModal.classList.add('hidden');
  if (state.recorder && state.recorder.state === 'recording') {
    state.recorder.stop();
  }
  if (state.recordStream) {
    state.recordStream.getTracks().forEach((t) => t.stop());
    state.recordStream = null;
  }
  resetRecordUI();
}

async function handleDropSubmit() {
  if (!state.drop.fileBlob || !state.position) return;
  const id = uid();
  const echo = {
    id,
    lat: state.position.lat,
    lng: state.position.lng,
    title: dom.dropTitle.value.trim() || 'Untitled echo',
    mood: state.drop.mood,
    nickname: state.profile.nickname,
    avatar: state.profile.avatar,
    createdAt: Date.now(),
    likes: 0,
    audioBlob: state.drop.fileBlob,
    isDemo: false,
  };
  await putEcho(echo);
  state.echoes.push(echo);
  closeDropModal();
  showToast('Your echo has been left here 🎶');
  refresh();
}

function formatMMSS(s) {
  const m = String(Math.floor(s / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

async function toggleRecording() {
  if (state.recorder && state.recorder.state === 'recording') {
    state.recorder.stop();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordStream = stream;
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    const chunks = [];
    recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
      state.drop.fileBlob = blob;
      dom.recordPreview.src = URL.createObjectURL(blob);
      dom.recordPreview.classList.remove('hidden');
      stream.getTracks().forEach((t) => t.stop());
      state.recordStream = null;
      dom.recordBtn.textContent = '🎙️ Record again';
      dom.recordBtn.classList.remove('recording');
      clearInterval(state.recordTimerId);
      state.recordTimerId = null;
      validateDropForm();
    };
    recorder.start();
    state.recorder = recorder;
    state.recordSeconds = 0;
    dom.recordTime.textContent = '00:00';
    dom.recordBtn.textContent = '⏹ Stop recording';
    dom.recordBtn.classList.add('recording');
    state.recordTimerId = setInterval(() => {
      state.recordSeconds++;
      dom.recordTime.textContent = formatMMSS(state.recordSeconds);
    }, 1000);
  } catch (err) {
    console.error(err);
    showToast('Could not access the microphone — please check permissions');
  }
}

// ---------- Location ----------
function handlePositionUpdate(pos, meta) {
  state.realPosition = pos;
  state.geoFallbackNote = meta.fallback ? 'No location fix yet, using the default coordinate (try Simulate Location)' : '';
  if (state.testMode) return;
  const first = !state.position;
  state.position = pos;
  if (!dom.dropModal.classList.contains('hidden')) updateDropLocationInfo();
  if (first) {
    ensureReady(pos).then(() => {
      panTo(pos);
      syncUserMarker();
      refresh();
    });
  } else {
    syncUserMarker();
    refresh();
  }
}

function setSimulatedPosition(pos) {
  state.position = pos;
  if (!dom.dropModal.classList.contains('hidden')) updateDropLocationInfo();
  ensureReady(pos).then(() => {
    syncUserMarker();
    refresh();
  });
  showToast('Simulated location set to where you clicked');
}

// ---------- Reset ----------
let resetArmed = false;
let resetArmedTimer = null;

async function resetLocalData() {
  if (!resetArmed) {
    resetArmed = true;
    dom.resetDataBtn.textContent = '⚠️ Click again to confirm';
    dom.resetDataBtn.classList.add('danger-armed');
    clearTimeout(resetArmedTimer);
    resetArmedTimer = setTimeout(() => {
      resetArmed = false;
      dom.resetDataBtn.textContent = '🗑️ Reset data';
      dom.resetDataBtn.classList.remove('danger-armed');
    }, 4000);
    return;
  }
  clearTimeout(resetArmedTimer);
  localStorage.removeItem('echospot-profile');
  localStorage.removeItem('echospot-liked');
  localStorage.removeItem('echospot-lastpos');
  await clearAllEchoes();
  location.reload();
}

// ---------- Bootstrap ----------
function wireEvents() {
  dom.profileBtn.addEventListener('click', openOnboarding);
  dom.resetDataBtn.addEventListener('click', resetLocalData);

  dom.testModeBtn.addEventListener('click', () => {
    state.testMode = !state.testMode;
    dom.testModeBtn.textContent = state.testMode ? '🧭 Simulate location: on' : '🧭 Simulate location: off';
    dom.testModeBtn.classList.toggle('active', state.testMode);
    if (state.testMode) {
      showToast('Simulate location on: click anywhere on the map to set your position');
    } else if (state.realPosition) {
      state.position = state.realPosition;
      syncUserMarker();
      refresh();
      showToast('Back to using your real location');
    }
  });

  dom.radiusRange.addEventListener('input', () => {
    state.radius = Number(dom.radiusRange.value);
    dom.radiusValue.textContent = formatRadiusLabel(state.radius);
    syncUserMarker();
    refresh();
  });

  dom.dropBtn.addEventListener('click', openDropModal);
  dom.dropClose.addEventListener('click', closeDropModal);
  dom.dropModal.addEventListener('click', (e) => {
    if (e.target === dom.dropModal) closeDropModal();
  });
  dom.dropSubmit.addEventListener('click', handleDropSubmit);

  dom.tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      dom.tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const isUpload = btn.dataset.tab === 'upload';
      dom.tabUpload.classList.toggle('hidden', !isUpload);
      dom.tabRecord.classList.toggle('hidden', isUpload);
    });
  });

  dom.fileInput.addEventListener('change', () => {
    const file = dom.fileInput.files[0];
    if (!file) return;
    state.drop.fileBlob = file;
    dom.fileHint.textContent = file.name;
    validateDropForm();
  });

  dom.recordBtn.addEventListener('click', toggleRecording);

  dom.detailClose.addEventListener('click', () => dom.detailModal.classList.add('hidden'));
  dom.detailModal.addEventListener('click', (e) => {
    if (e.target === dom.detailModal) dom.detailModal.classList.add('hidden');
  });
  dom.detailPlayBtn.addEventListener('click', () => playEcho(state.detailEchoId));
  dom.detailLikeBtn.addEventListener('click', () => toggleLike(state.detailEchoId));
  dom.detailLocateBtn.addEventListener('click', () => {
    dom.detailModal.classList.add('hidden');
    const echo = state.echoes.find((e) => e.id === state.detailEchoId);
    if (echo) flyToEcho(echo);
  });
  dom.detailTrack.addEventListener('click', (e) => {
    if (state.currentPlayingId !== state.detailEchoId || !dom.audioPlayer.duration) return;
    const rect = dom.detailTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    dom.audioPlayer.currentTime = ratio * dom.audioPlayer.duration;
  });

  dom.echoList.addEventListener('click', (e) => {
    const item = e.target.closest('.echo-item');
    if (!item) return;
    const id = item.dataset.id;
    if (e.target.closest('.echo-play-btn')) {
      playEcho(id);
    } else {
      openDetail(id);
    }
  });

  dom.audioPlayer.addEventListener('ended', () => {
    state.currentPlayingId = null;
    syncPlaybackUI();
  });
  dom.audioPlayer.addEventListener('timeupdate', updateDetailProgress);
}

function main() {
  if (state.profile) {
    setProfileUI();
    dom.onboardModal.classList.add('hidden');
  } else {
    openOnboarding();
  }

  wireEvents();
  dom.radiusValue.textContent = formatRadiusLabel(state.radius);

  let lastKnown = FALLBACK_POS;
  try {
    const saved = JSON.parse(localStorage.getItem('echospot-lastpos') || 'null');
    if (saved) lastKnown = saved;
  } catch {}

  initMap('map', lastKnown);
  onEchoClick((id) => openDetail(id));
  onMapClick((pos) => {
    if (state.testMode) setSimulatedPosition(pos);
  });

  watchLocation({
    onUpdate: (pos, meta) => {
      if (!meta.fallback) localStorage.setItem('echospot-lastpos', JSON.stringify(pos));
      handlePositionUpdate(pos, meta);
    },
    onError: () => {},
    fallback: lastKnown,
  });
}

main();
