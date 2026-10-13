import { putEcho, getAllEchoes, countEchoes, clearAllEchoes, deleteEcho } from './idb.js';
import { distanceMeters, randomPointNear, formatDistance, formatTimeAgo, watchLocation } from './geo.js';
import { synthDemoAudioBlob } from './synth.js';
import { initMap, onEchoClick, onMapClick, setUserPosition, panTo, renderEchoes, flyToEcho, refreshMapSize } from './map.js';

const FALLBACK_POS = { lat: -27.4698, lng: 153.0251 }; // used when geolocation fails (default: Brisbane City, Australia)
const AVATARS = ['🙂', '😎', '🥸', '🐱', '🐼', '🦊', '🐧', '👾', '🌈', '🎈'];
const MOODS = ['🎸', '🎹', '🎤', '🎧', '🌊', '🌙', '✨', '🥁', '🔥'];
const AUDIO_TYPES = [
  { key: 'song', label: 'Song', icon: '🎵' },
  { key: 'hum', label: 'Hum', icon: '🎤' },
  { key: 'voice', label: 'Voice', icon: '🗣️' },
  { key: 'field', label: 'Field rec', icon: '🎙️' },
  { key: 'other', label: 'Other', icon: '✨' },
];
const UNLOCK_DISTANCE = 50; // metres — full playback only within this range
const PREVIEW_SECONDS = 9; // short preview when outside unlock range

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
  menuBtn: el('menuBtn'),
  menuDropdown: el('menuDropdown'),
  menuTestModeBtn: el('menuTestModeBtn'),
  menuResetBtn: el('menuResetBtn'),
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
  tabLink: el('tabLink'),
  fileInput: el('fileInput'),
  fileHint: el('fileHint'),
  fileDropLabel: el('fileDropLabel'),
  dropLink: el('dropLink'),
  recordBtn: el('recordBtn'),
  recordTime: el('recordTime'),
  recordPreview: el('recordPreview'),
  dropTitle: el('dropTitle'),
  dropTypePicker: el('dropTypePicker'),
  dropMoodPicker: el('dropMoodPicker'),
  dropContext: el('dropContext'),
  dropConsent: el('dropConsent'),
  dropConsentRow: el('dropConsentRow'),
  dropLocationInfo: el('dropLocationInfo'),
  dropSubmit: el('dropSubmit'),

  detailModal: el('detailModal'),
  detailClose: el('detailClose'),
  detailTitle: el('detailTitle'),
  detailType: el('detailType'),
  detailDuration: el('detailDuration'),
  detailGenre: el('detailGenre'),
  detailAvatar: el('detailAvatar'),
  detailNickname: el('detailNickname'),
  detailTime: el('detailTime'),
  detailPlayCount: el('detailPlayCount'),
  detailDistance: el('detailDistance'),
  detailPlayer: el('detailPlayer'),
  detailPlayBtn: el('detailPlayBtn'),
  detailLinkArea: el('detailLinkArea'),
  detailLinkBtn: el('detailLinkBtn'),
  detailTrack: el('detailTrack'),
  detailProgress: el('detailProgress'),
  detailContext: el('detailContext'),
  detailContextText: el('detailContextText'),
  feedPanel: el('feedPanel'),
  panelHandle: el('panelHandle'),
  peekCount: el('peekCount'),
  lockedHint: el('lockedHint'),
  lockedHintText: el('lockedHintText'),
  takeMeThereBtn: el('takeMeThereBtn'),
  previewTag: el('previewTag'),
  reactionBar: el('reactionBar'),
  replyBtn: el('replyBtn'),
  replyInputArea: el('replyInputArea'),
  replyInput: el('replyInput'),
  replyList: el('replyList'),
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
  toppedUp: false,
  geoFallbackNote: '',
  radius: Number(dom.radiusRange.value),
  echoes: [],
  currentList: [],
  currentPlayingId: null,
  audioUrlCache: new Map(),
  likedIds: new Set(JSON.parse(localStorage.getItem('echospot-liked') || '[]')),
  detailEchoId: null,
  drop: { mood: MOODS[0], audioType: 'song', fileBlob: null, url: '', context: '', consent: false },
  recorder: null,
  recordStream: null,
  recordTimerId: null,
  recordSeconds: 0,
  previewTimerId: null,
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

function normalizeEcho(echo) {
  return {
    ...echo,
    audioType: echo.audioType || 'other',
    context: echo.context || '',
    url: echo.url || '',
    consent: !!echo.consent,
    plays: echo.plays || 0,
    likes: echo.likes || 0,
    replies: Array.isArray(echo.replies) ? echo.replies : [],
  };
}

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function detectService(url) {
  try {
    const host = new URL(url).hostname;
    if (host.includes('spotify')) return 'Spotify';
    if (host.includes('youtube') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('soundcloud')) return 'SoundCloud';
    return 'link';
  } catch {
    return 'link';
  }
}

function mapGenreToType(genre) {
  const g = (genre || '').toLowerCase();
  if (g.includes('vocal') || g.includes('a cappella') || g.includes('ballad') || g.includes('pop') || g.includes('rock') || g.includes('indie') || g.includes('jazz') || g.includes('funk') || g.includes('synth') || g.includes('house') || g.includes('drum & bass') || g.includes('trap') || g.includes('chillhop') || g.includes('cinematic') || g.includes('post-rock') || g.includes('dream pop') || g.includes('ethereal') || g.includes('marching')) return 'song';
  if (g.includes('field') || g.includes('ambient') || g.includes('drone') || g.includes('recording')) return 'field';
  if (g.includes('hum')) return 'hum';
  return 'other';
}

// ---------- Audio duration helper ----------
function getAudioDuration(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    let settled = false;
    const cleanup = () => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
    };
    audio.addEventListener('loadedmetadata', () => {
      cleanup();
      resolve(Math.round(audio.duration || 0));
    });
    audio.addEventListener('error', () => {
      cleanup();
      resolve(0);
    });
    setTimeout(() => {
      cleanup();
      resolve(0);
    }, 3000);
  });
}

// ---------- Pickers ----------
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

function buildTypePicker(container, selected, onSelect) {
  container.innerHTML = '';
  AUDIO_TYPES.forEach((type) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'type-btn' + (type.key === selected ? ' active' : '');
    btn.innerHTML = `<span>${type.icon}</span>${type.label}`;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.type-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(type.key);
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
// Demo echoes are clustered around wherever the person opens the app: a couple at arm's reach
// so the unlock rule can be felt immediately, the rest within a short walk. Without this the
// map is empty wherever you happen to be standing, which reads as a broken app.
const SEED_VERSION = 3;
const SEED_RANGES = [[8, 30], [12, 40], [25, 48], [70, 160], [120, 280], [200, 420], [350, 700], [600, 1200]];
const TOPUP_RANGES = [[10, 35], [20, 45], [80, 200], [150, 400]];

async function buildDemoEcho(seed, point) {
  const persona = DEMO_PERSONAS[Math.floor(Math.random() * DEMO_PERSONAS.length)];
  const id = uid();
  const audioBlob = await synthDemoAudioBlob(id, seed.mood, 5 + Math.random() * 3);
  return {
    id,
    lat: point.lat,
    lng: point.lng,
    title: seed.title,
    mood: seed.mood,
    genre: seed.genre,
    audioType: mapGenreToType(seed.genre),
    context: seed.context || '',
    nickname: persona.nickname,
    avatar: persona.avatar,
    createdAt: Date.now() - Math.floor(Math.random() * 5 * 86400000),
    likes: Math.floor(Math.random() * 20),
    plays: Math.floor(Math.random() * 50),
    replies: [],
    audioBlob,
    url: '',
    duration: Math.round(5 + Math.random() * 3),
    consent: true,
    isDemo: true,
  };
}

async function seedAround(center, ranges) {
  const picks = [...DEMO_SEEDS].sort(() => Math.random() - 0.5).slice(0, ranges.length);
  for (let i = 0; i < picks.length; i++) {
    const [min, max] = ranges[i];
    await putEcho(await buildDemoEcho(picks[i], randomPointNear(center, min, max)));
  }
}

async function ensureSeedData(center) {
  const seeded = Number(localStorage.getItem('echospot-seed-version') || 0);
  const existing = await countEchoes();

  if (existing > 0 && seeded === SEED_VERSION) return;

  // Replace an older demo set, but never touch echoes this person left themselves.
  if (existing > 0) {
    for (const echo of await getAllEchoes()) {
      if (echo.isDemo) await deleteEcho(echo.id);
    }
  }

  await seedAround(center, SEED_RANGES);
  localStorage.setItem('echospot-seed-version', String(SEED_VERSION));
}

// Someone who opens the app in a different suburb — or a tradeshow visitor standing where the
// first seed set was never placed — still needs something within walking distance.
async function topUpNearby(center) {
  const near = state.echoes.filter(
    (e) => e.isDemo && distanceMeters(center, { lat: e.lat, lng: e.lng }) <= 400
  );
  if (near.length >= 2) return false;
  await seedAround(center, TOPUP_RANGES);
  state.echoes = (await getAllEchoes()).map(normalizeEcho);
  return true;
}

async function ensureReady(center) {
  if (state.ready) {
    await topUpNearby(center);
    return;
  }
  state.ready = true;
  await ensureSeedData(center);
  state.echoes = (await getAllEchoes()).map(normalizeEcho);
  migrateOldLikes();
  await topUpNearby(center);
}

// Migrate "likedIds" from older versions into explicit heart reactions
function migrateOldLikes() {
  if (!state.profile) return;
  const toSave = [];
  state.echoes.forEach((echo) => {
    if (!state.likedIds.has(echo.id)) return;
    const hasMine = echo.replies.some((r) => r.type === 'reaction' && r.text === '❤️' && r.nickname === state.profile.nickname);
    if (!hasMine) {
      echo.replies.push({
        id: uid(),
        type: 'reaction',
        text: '❤️',
        nickname: state.profile.nickname,
        avatar: state.profile.avatar,
        createdAt: Date.now(),
      });
      echo.likes += 1;
      toSave.push(echo);
    }
  });
  if (toSave.length) {
    toSave.forEach((e) => putEcho(e));
    localStorage.removeItem('echospot-liked');
    state.likedIds.clear();
  }
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
  if (!dom.detailModal.classList.contains('hidden')) updateDetailLockState();
  const note = state.geoFallbackNote ? ` · ${state.geoFallbackNote}` : '';
  const playable = list.filter((e) => e.url || e.dist <= UNLOCK_DISTANCE).length;
  dom.statusLine.textContent = `${list.length} echo${list.length === 1 ? '' : 'es'} within ${formatRadiusLabel(state.radius)} · ${playable} playable here${note}`;
  dom.peekCount.textContent = list.length
    ? `${list.length} nearby · ${playable} playable`
    : 'nothing within range';
}

function renderFeedList(list) {
  if (list.length === 0) {
    const nearest = state.position
      ? state.echoes
          .map((e) => distanceMeters(state.position, { lat: e.lat, lng: e.lng }))
          .sort((a, b) => a - b)[0]
      : null;
    dom.echoList.innerHTML = nearest
      ? `<li class="empty-hint">Nothing within ${formatRadiusLabel(state.radius)}.
           The closest echo is <b>${formatDistance(nearest)}</b> away.
           <button class="widen-btn" id="widenBtn">Look out to ${formatRadiusLabel(Math.min(2000, Math.ceil(nearest / 100) * 100))}</button>
           <span class="empty-or">or leave the first one here 🎵</span></li>`
      : `<li class="empty-hint">No echoes near you yet — be the first to drop one 🎵</li>`;
    const widen = el('widenBtn');
    if (widen && nearest) {
      widen.addEventListener('click', () => {
        const next = Math.min(2000, Math.ceil(nearest / 100) * 100);
        dom.radiusRange.value = String(next);
        state.radius = next;
        dom.radiusValue.textContent = formatRadiusLabel(next);
        syncUserMarker();
        refresh();
      });
    }
    return;
  }
  dom.echoList.innerHTML = list
    .map((echo) => {
      const playing = echo.id === state.currentPlayingId;
      const type = AUDIO_TYPES.find((t) => t.key === echo.audioType) || AUDIO_TYPES[4];
      const unlocked = echo.dist != null && echo.dist <= UNLOCK_DISTANCE;
      const isLink = !!echo.url;
      const durationStr = echo.duration ? formatMMSS(echo.duration) : (isLink ? 'link' : '');
      const status = isLink
        ? `<span class="echo-status link">↗ opens in ${escapeHtml(detectService(echo.url))}</span>`
        : unlocked
          ? '<span class="echo-status open">🔓 you are here · full echo</span>'
          : `<span class="echo-status locked">🔒 ${PREVIEW_SECONDS} s preview · walk ${formatDistance(echo.dist - UNLOCK_DISTANCE)} to unlock</span>`;
      return `
      <li class="echo-item ${playing ? 'playing' : ''} ${!unlocked && !isLink ? 'locked' : ''}" data-id="${echo.id}">
        <button class="echo-play-btn ${!unlocked && !isLink ? 'preview' : ''}" aria-label="${isLink ? 'Open link' : unlocked ? 'Play' : `Play ${PREVIEW_SECONDS} second preview`}">${playing ? '⏸' : '▶'}</button>
        <div class="echo-info">
          <div class="echo-title-row">
            <span class="echo-mood">${echo.mood}</span>
            <span class="echo-title">${escapeHtml(echo.title)}</span>
          </div>
          <div class="echo-meta">
            <span class="type-pill">${type.icon} ${type.label}</span>
            ${durationStr ? `<span class="duration-badge">${durationStr}</span> · ` : ''}
            ${echo.avatar} ${escapeHtml(echo.nickname)} · ${formatTimeAgo(echo.createdAt)} · ${formatDistance(echo.dist)}
          </div>
          ${status}
        </div>
        <div class="echo-likes">▶ ${echo.plays || 0} · ${echo.likes || 0}</div>
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

async function incrementPlays(echo) {
  echo.plays = (echo.plays || 0) + 1;
  await putEcho(echo);
  dom.detailPlayCount.textContent = `▶ ${echo.plays}`;
  refresh();
}

async function playEcho(id) {
  const echo = state.echoes.find((e) => e.id === id);
  if (!echo) return;
  if (state.currentPlayingId === id) {
    dom.audioPlayer.pause();
    state.currentPlayingId = null;
    clearTimeout(state.previewTimerId);
    state.previewTimerId = null;
    syncPlaybackUI();
    return;
  }
  clearTimeout(state.previewTimerId);
  state.previewTimerId = null;

  const dist = state.position ? distanceMeters(state.position, echo) : 0;
  const isLink = !!echo.url;

  // Streaming links open externally; we do not host copyrighted audio
  if (isLink) {
    incrementPlays(echo);
    window.open(echo.url, '_blank', 'noopener,noreferrer');
    showToast(`Opening ${detectService(echo.url)}…`);
    syncPlaybackUI();
    return;
  }

  const unlocked = dist <= UNLOCK_DISTANCE;
  try {
    dom.audioPlayer.src = getAudioUrl(echo);
    dom.audioPlayer.currentTime = 0;
    await dom.audioPlayer.play();
    state.currentPlayingId = id;
    if (unlocked) {
      incrementPlays(echo);
    } else {
      state.previewTimerId = setTimeout(() => {
        dom.audioPlayer.pause();
        state.currentPlayingId = null;
        syncPlaybackUI();
        showToast('Walk within 50 m to hear the full echo');
      }, PREVIEW_SECONDS * 1000);
    }
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
function updateReactionUI(echo) {
  const counts = {};
  (echo.replies || []).forEach((r) => {
    if (r.type === 'reaction') counts[r.text] = (counts[r.text] || 0) + 1;
  });
  dom.reactionBar.querySelectorAll('.reaction-btn').forEach((btn) => {
    const r = btn.dataset.reaction;
    const count = counts[r] || 0;
    btn.querySelector('span').textContent = count;
    const mine = state.profile && (echo.replies || []).some((rep) => rep.type === 'reaction' && rep.text === r && rep.nickname === state.profile.nickname);
    btn.classList.toggle('reacted', mine);
  });
}

function renderReplies(echo) {
  const textReplies = (echo.replies || []).filter((r) => r.type === 'text').sort((a, b) => b.createdAt - a.createdAt);
  dom.replyList.classList.toggle('hidden', textReplies.length === 0);
  if (textReplies.length === 0) {
    dom.replyList.innerHTML = '';
    return;
  }
  dom.replyList.innerHTML = textReplies
    .map(
      (r) => `
    <div class="reply-item">
      <span class="reply-avatar">${escapeHtml(r.avatar)}</span>
      <div class="reply-body">
        <div class="reply-text">${escapeHtml(r.text)}</div>
        <div class="reply-meta">${escapeHtml(r.nickname)} · ${formatTimeAgo(r.createdAt)}</div>
      </div>
    </div>`
    )
    .join('');
}

function openDetail(id) {
  const echo = state.echoes.find((e) => e.id === id);
  if (!echo) return;
  state.detailEchoId = id;
  dom.detailTitle.textContent = echo.title;
  const type = AUDIO_TYPES.find((t) => t.key === echo.audioType) || AUDIO_TYPES[4];
  dom.detailType.textContent = `${type.icon} ${type.label}`;
  dom.detailType.classList.toggle('hidden', false);
  const durationStr = echo.duration ? formatMMSS(echo.duration) : '';
  dom.detailDuration.textContent = durationStr;
  dom.detailDuration.classList.toggle('hidden', !durationStr);
  dom.detailGenre.textContent = echo.genre || '';
  dom.detailGenre.classList.toggle('hidden', !echo.genre);
  dom.detailAvatar.textContent = echo.avatar;
  dom.detailNickname.textContent = echo.nickname;
  dom.detailTime.textContent = formatTimeAgo(echo.createdAt);
  dom.detailPlayCount.textContent = `▶ ${echo.plays || 0}`;
  const dist = state.position ? distanceMeters(state.position, echo) : null;
  const isLink = !!echo.url;
  dom.detailPlayer.classList.toggle('hidden', isLink);
  dom.detailLinkArea.classList.toggle('hidden', !isLink);
  if (isLink) {
    dom.detailLinkBtn.href = echo.url;
    dom.detailLinkBtn.textContent = `Open ${detectService(echo.url)}`;
  }
  dom.detailContext.classList.toggle('hidden', !echo.context);
  dom.detailContextText.textContent = echo.context || '';
  updateDetailLockState();
  dom.detailProgress.style.width = state.currentPlayingId === id ? dom.detailProgress.style.width : '0%';
  updateReactionUI(echo);
  renderReplies(echo);
  dom.replyInputArea.classList.add('hidden');
  dom.replyInput.value = '';
  dom.detailPlayBtn.textContent = state.currentPlayingId === id ? '⏸' : '▶';
  dom.detailModal.classList.remove('hidden');
  flyToEcho(echo, bottomSheetInset());
}

// Keeps the card honest while the person walks: how far is left, what pressing play will
// actually give them, and a way to get there.
function updateDetailLockState() {
  const echo = state.echoes.find((e) => e.id === state.detailEchoId);
  if (!echo) return;
  const dist = state.position ? distanceMeters(state.position, echo) : null;
  const isLink = !!echo.url;
  const unlocked = dist != null && dist <= UNLOCK_DISTANCE;

  dom.detailDistance.textContent =
    dist == null
      ? 'Waiting for your location…'
      : unlocked
        ? `🔓 ${formatDistance(dist)} away — you are standing where it was left`
        : `🔒 ${formatDistance(dist)} away — unlocks within ${UNLOCK_DISTANCE} m`;
  dom.detailDistance.classList.toggle('locked', !unlocked && !isLink);

  const locked = !isLink && !unlocked;
  dom.lockedHint.classList.toggle('hidden', !locked);
  if (locked) {
    dom.lockedHintText.textContent =
      dist == null
        ? `Full echo unlocks within ${UNLOCK_DISTANCE} m of this spot`
        : `${PREVIEW_SECONDS} s preview from here · walk ${formatDistance(Math.max(dist - UNLOCK_DISTANCE, 0))} for the full echo`;
  }
  dom.previewTag.classList.toggle('hidden', !locked);
  dom.detailPlayBtn.classList.toggle('preview', locked);
  dom.detailPlayBtn.setAttribute(
    'aria-label',
    locked ? `Play ${PREVIEW_SECONDS} second preview` : 'Play'
  );
}

function openDirectionsToDetail() {
  const echo = state.echoes.find((e) => e.id === state.detailEchoId);
  if (!echo) return;
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${echo.lat},${echo.lng}`,
    '_blank',
    'noopener,noreferrer'
  );
}

async function addReaction(reaction) {
  const echo = state.echoes.find((e) => e.id === state.detailEchoId);
  if (!echo || !state.profile) return;
  const existing = echo.replies.find((r) => r.type === 'reaction' && r.nickname === state.profile.nickname);
  const hadHeart = existing?.text === '❤️';
  const willHeart = reaction === '❤️';
  // remove current user's existing reaction
  echo.replies = echo.replies.filter((r) => !(r.type === 'reaction' && r.nickname === state.profile.nickname));
  // if not toggling off, push the new one
  if (!existing || existing.text !== reaction) {
    echo.replies.push({
      id: uid(),
      type: 'reaction',
      text: reaction,
      nickname: state.profile.nickname,
      avatar: state.profile.avatar,
      createdAt: Date.now(),
    });
  }
  // update like count based on heart transitions
  if (hadHeart && !willHeart) echo.likes = Math.max(0, (echo.likes || 0) - 1);
  if (!hadHeart && willHeart) echo.likes = (echo.likes || 0) + 1;
  await putEcho(echo);
  updateReactionUI(echo);
  refresh();
}

async function addReply(text) {
  const echo = state.echoes.find((e) => e.id === state.detailEchoId);
  if (!echo || !state.profile || !text.trim()) return;
  echo.replies.push({
    id: uid(),
    type: 'text',
    text: text.trim(),
    nickname: state.profile.nickname,
    avatar: state.profile.avatar,
    createdAt: Date.now(),
  });
  await putEcho(echo);
  renderReplies(echo);
  refresh();
  showToast('Reply left 👋');
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
  const tab = [...dom.tabButtons].find((b) => b.classList.contains('active'))?.dataset.tab || 'upload';
  let hasContent = false;
  if (tab === 'upload' || tab === 'record') hasContent = !!state.drop.fileBlob;
  else if (tab === 'link') hasContent = isValidUrl(state.drop.url);
  const consentOk = tab === 'link' || state.drop.consent;
  dom.dropSubmit.disabled = !(hasContent && state.position && consentOk);
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
  state.drop = { mood: MOODS[0], audioType: 'song', fileBlob: null, url: '', context: '', consent: false };
  dom.dropTitle.value = '';
  dom.dropContext.value = '';
  dom.dropLink.value = '';
  dom.dropConsent.checked = false;
  dom.fileHint.textContent = 'Click to choose an audio file';
  dom.fileInput.value = '';
  resetRecordUI();
  buildTypePicker(dom.dropTypePicker, state.drop.audioType, (v) => {
    state.drop.audioType = v;
    validateDropForm();
  });
  buildEmojiPicker(dom.dropMoodPicker, MOODS, state.drop.mood, (v) => (state.drop.mood = v));
  dom.tabButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === 'upload'));
  dom.tabUpload.classList.remove('hidden');
  dom.tabRecord.classList.add('hidden');
  dom.tabLink.classList.add('hidden');
  dom.dropConsentRow.classList.remove('hidden');
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
  if (!state.position) return;
  const tab = [...dom.tabButtons].find((b) => b.classList.contains('active'))?.dataset.tab || 'upload';
  let audioBlob = null;
  let url = '';
  let duration = 0;

  if (tab === 'link') {
    url = state.drop.url.trim();
    if (!isValidUrl(url)) return;
  } else {
    audioBlob = state.drop.fileBlob;
    if (!audioBlob) return;
    duration = await getAudioDuration(audioBlob);
  }

  const id = uid();
  const echo = {
    id,
    lat: state.position.lat,
    lng: state.position.lng,
    title: dom.dropTitle.value.trim() || 'Untitled echo',
    mood: state.drop.mood,
    audioType: state.drop.audioType,
    context: dom.dropContext.value.trim(),
    genre: '',
    nickname: state.profile.nickname,
    avatar: state.profile.avatar,
    createdAt: Date.now(),
    likes: 0,
    plays: 0,
    replies: [],
    audioBlob,
    url,
    duration,
    consent: state.drop.consent,
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
  } else if (!state.toppedUp && state.ready) {
    state.toppedUp = true;
    topUpNearby(pos).then((added) => {
      syncUserMarker();
      refresh();
      if (added) showToast('Loaded the echoes around you');
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
    dom.menuResetBtn.textContent = '⚠️ Click again to confirm';
    clearTimeout(resetArmedTimer);
    resetArmedTimer = setTimeout(() => {
      resetArmed = false;
      dom.resetDataBtn.textContent = '🗑️ Reset data';
      dom.resetDataBtn.classList.remove('danger-armed');
      dom.menuResetBtn.textContent = '🗑️ Reset data';
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

// ---------- Menu & test mode ----------
function updateTestModeUI() {
  const label = state.testMode ? '🧭 Simulate location: on' : '🧭 Simulate location: off';
  dom.testModeBtn.textContent = label;
  dom.menuTestModeBtn.textContent = label;
  dom.testModeBtn.classList.toggle('active', state.testMode);
}

function toggleTestMode() {
  state.testMode = !state.testMode;
  updateTestModeUI();
  if (state.testMode) {
    showToast('Simulate location on: click anywhere on the map to set your position');
  } else if (state.realPosition) {
    state.position = state.realPosition;
    syncUserMarker();
    refresh();
    showToast('Back to using your real location');
  }
}

function toggleMenu(show) {
  const open = typeof show === 'boolean' ? show : !dom.menuDropdown.classList.contains('open');
  dom.menuDropdown.classList.toggle('open', open);
  dom.menuBtn.setAttribute('aria-expanded', String(open));
}

// ---------- Bottom sheet (phones) ----------
function isPhoneLayout() {
  return window.matchMedia('(max-width: 720px)').matches;
}

function bottomSheetInset() {
  return isPhoneLayout() ? dom.feedPanel.getBoundingClientRect().height : 0;
}

const SHEET_STATES = ['peek', 'default', 'expanded'];

function setSheetState(next) {
  const state_ = SHEET_STATES.includes(next) ? next : 'default';
  dom.feedPanel.classList.remove('peek', 'expanded');
  if (state_ !== 'default') dom.feedPanel.classList.add(state_);
  dom.feedPanel.dataset.sheet = state_;
  dom.panelHandle.setAttribute('aria-expanded', String(state_ !== 'peek'));
  setTimeout(refreshMapSize, 260);
}

function currentSheetState() {
  return dom.feedPanel.dataset.sheet || 'default';
}

function stepSheet(direction) {
  const i = SHEET_STATES.indexOf(currentSheetState());
  const next = Math.min(SHEET_STATES.length - 1, Math.max(0, i + direction));
  setSheetState(SHEET_STATES[next]);
}

// ---------- Bootstrap ----------
function wireEvents() {
  dom.takeMeThereBtn.addEventListener('click', openDirectionsToDetail);
  dom.panelHandle.addEventListener('click', () => {
    stepSheet(currentSheetState() === 'expanded' ? -2 : 1);
  });

  let dragStartY = null;
  dom.panelHandle.addEventListener('touchstart', (e) => {
    dragStartY = e.touches[0].clientY;
  }, { passive: true });
  dom.panelHandle.addEventListener('touchend', (e) => {
    if (dragStartY == null) return;
    const dy = e.changedTouches[0].clientY - dragStartY;
    if (Math.abs(dy) > 24) stepSheet(dy < 0 ? 1 : -1);
    dragStartY = null;
  });

  window.addEventListener('resize', () => {
    refreshMapSize();
    if (!isPhoneLayout()) setSheetState('default');
  });
  dom.profileBtn.addEventListener('click', openOnboarding);
  dom.resetDataBtn.addEventListener('click', resetLocalData);
  dom.menuResetBtn.addEventListener('click', resetLocalData);

  dom.menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  document.addEventListener('click', () => toggleMenu(false));

  dom.testModeBtn.addEventListener('click', toggleTestMode);
  dom.menuTestModeBtn.addEventListener('click', toggleTestMode);

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
      const tab = btn.dataset.tab;
      dom.tabUpload.classList.toggle('hidden', tab !== 'upload');
      dom.tabRecord.classList.toggle('hidden', tab !== 'record');
      dom.tabLink.classList.toggle('hidden', tab !== 'link');
      dom.dropConsentRow.classList.toggle('hidden', tab === 'link');
      validateDropForm();
    });
  });

  dom.fileInput.addEventListener('change', () => {
    const file = dom.fileInput.files[0];
    if (!file) return;
    state.drop.fileBlob = file;
    dom.fileHint.textContent = file.name;
    validateDropForm();
  });

  dom.dropLink.addEventListener('input', () => {
    state.drop.url = dom.dropLink.value;
    validateDropForm();
  });

  dom.dropConsent.addEventListener('change', () => {
    state.drop.consent = dom.dropConsent.checked;
    validateDropForm();
  });

  dom.recordBtn.addEventListener('click', toggleRecording);

  dom.detailClose.addEventListener('click', () => dom.detailModal.classList.add('hidden'));
  dom.detailModal.addEventListener('click', (e) => {
    if (e.target === dom.detailModal) dom.detailModal.classList.add('hidden');
  });
  dom.detailPlayBtn.addEventListener('click', () => playEcho(state.detailEchoId));
  dom.detailLocateBtn.addEventListener('click', () => {
    dom.detailModal.classList.add('hidden');
    const echo = state.echoes.find((e) => e.id === state.detailEchoId);
    if (echo) flyToEcho(echo, bottomSheetInset());
  });
  dom.detailTrack.addEventListener('click', (e) => {
    if (state.currentPlayingId !== state.detailEchoId || !dom.audioPlayer.duration) return;
    const rect = dom.detailTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    dom.audioPlayer.currentTime = ratio * dom.audioPlayer.duration;
  });

  dom.reactionBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.reaction-btn');
    if (!btn) return;
    addReaction(btn.dataset.reaction);
  });

  dom.replyBtn.addEventListener('click', () => {
    dom.replyInputArea.classList.toggle('hidden');
    if (!dom.replyInputArea.classList.contains('hidden')) dom.replyInput.focus();
  });
  dom.replyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addReply(dom.replyInput.value);
      dom.replyInput.value = '';
      dom.replyInputArea.classList.add('hidden');
    }
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
    clearTimeout(state.previewTimerId);
    state.previewTimerId = null;
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
  // On a phone the map is the point; the list waits at the bottom until it is asked for.
  setSheetState(isPhoneLayout() ? 'peek' : 'default');

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
