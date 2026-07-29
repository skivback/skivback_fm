"use strict";

const APP_URL = "https://skivback.github.io/skivback_fm/";
const STATION_QUERY_PARAMETER = "station";
const TIME_QUERY_PARAMETER = "t";
const PLAY_ATTENTION_CLASS = "needs-play";
const RANDOM_START_MARGIN_SECONDS = 120;
const MINIMUM_DURATION_FOR_RANDOM_START_SECONDS = 300;
const RANDOM_SEEK_RETRY_INTERVAL_MS = 250;
const RANDOM_SEEK_MAX_ATTEMPTS = 20;
const SEEK_STEP_SECONDS = 5 * 60;

const stations = [
  {
    index: 1,
    name: "SPACE 103.2",
    slug: "space-103-2",
    frequency: "103.2",
    videoId: "6TnV43UWoqk",
    startSeconds: 3,
    logo: "space.png",
  },
  {
    index: 2,
    name: "NON-STOP-POP FM",
    slug: "non-stop-pop-fm",
    frequency: "100.1",
    videoId: "Fjp0wu3lEHk",
    logo: "non-stop-pop-fm.png",
  },
  {
    index: 3,
    name: "RADIO LOS SANTOS",
    slug: "radio-los-santos",
    frequency: "106.1",
    videoId: "C3_FSXZtRe8",
    logo: "radio-los-santos.png",
  },
  {
    index: 4,
    name: "WEST COAST CLASSICS",
    slug: "west-coast-classics",
    frequency: "95.6",
    videoId: "z0Wf3IuZnf0",
    logo: "west-coast-classics.webp",
  },
  {
    index: 5,
    name: "REBEL RADIO",
    slug: "rebel-radio",
    frequency: "89.5",
    videoId: "HeLsaX1I5B4",
    logo: "rebel-radio.webp",
  },
  {
    index: 6,
    name: "THE LOWDOWN 91.1",
    slug: "the-lowdown-91-1",
    frequency: "91.1",
    videoId: "RT9h-C24idQ",
    logo: "the-lowdown.webp",
  },
  {
    index: 7,
    name: "BLUE ARK",
    slug: "blue-ark",
    frequency: "94.7",
    videoId: "LRdjhqMYSGg",
    logo: "the-blue-ark.png",
  },
  {
    index: 8,
    name: "WORLDWIDE FM",
    slug: "worldwide-fm",
    frequency: "96.5",
    videoId: "GgIB2WClkwY",
    logo: "worldwide-fm.png",
  },
  {
    index: 9,
    name: "EAST LOS FM",
    slug: "east-los-fm",
    frequency: "106.2",
    videoId: "xTpsoTmhdNc",
    logo: "east-los-fm.png",
  },
  {
    index: 10,
    name: "CHANNEL X",
    slug: "channel-x",
    frequency: "99.1",
    videoId: "HHG44PJ0oyo",
    logo: "channel-x.png",
  },
  {
    index: 11,
    name: "RADIO MIRROR PARK",
    slug: "radio-mirror-park",
    frequency: "88.9",
    videoId: "SDWHIACuuaQ",
    logo: "radio-mirror-park.webp",
  },
  {
    index: 12,
    name: "SOULWAX FM",
    slug: "soulwax-fm",
    frequency: "93.7",
    videoId: "EhsQZl8BFz8",
    logo: "soulwax-fm.jpg",
  },
  {
    index: 13,
    name: "FLYLO FM",
    slug: "flylo-fm",
    frequency: "98.3",
    videoId: "3P-ux63rHkU",
    logo: "fly-lo-fm.png",
  },
  {
    index: 14,
    name: "VINEWOOD BOULEVARD RADIO",
    slug: "vinewood-boulevard-radio",
    frequency: "101.5",
    videoId: "5fnGyUc2eFs",
    logo: "vinewood-boulevard-radio.webp",
  },
  {
    index: 15,
    name: "LOS SANTOS ROCK RADIO",
    slug: "los-santos-rock-radio",
    frequency: "102.3",
    videoId: "Xy75nA56vcc",
    logo: "los-santos-rock-radio.png",
  },
  {
    index: 16,
    name: "LOS SANTOS UNDERGROUND RADIO",
    slug: "los-santos-underground-radio",
    frequency: "90.3",
    videoId: "9cL6IDCtuzs",
    logo: "los-santos-underground-radio.png",
  },
  {
    index: 17,
    name: "iFRUIT RADIO",
    slug: "ifruit-radio",
    frequency: "107.9",
    videoId: "P3qixldzDow",
    logo: "ifruit-radio.webp",
  },
  {
    index: 18,
    name: "KULT FM",
    slug: "kult-fm",
    frequency: "99.1",
    videoId: "I2Xjuz-mnN0",
    logo: "kult-fm.webp",
  },
  {
    index: 19,
    name: "STILL SLIPPING LOS SANTOS",
    slug: "still-slipping-los-santos",
    frequency: "96.2",
    videoId: "fpvJaphZ2_g",
    logo: "still-slipping-los-santos.png",
  },
  {
    index: 20,
    name: "THE MUSIC LOCKER",
    slug: "the-music-locker",
    frequency: "102.8",
    videoId: "dBvMBYbUZFc",
    logo: "music-locker-radio.png",
  },
  {
    index: 21,
    name: "MEDIA PLAYER",
    slug: "media-player",
    frequency: "88.1",
    videoId: "dPkzYz-AYOs",
    logo: "media-player.png",
  },
  {
    index: 22,
    name: "MOTOMAMI LOS SANTOS",
    slug: "motomami-los-santos",
    frequency: "94.4",
    videoId: "30uA_Hppzpc",
    logo: "motomami.png",
  },
  {
    index: 23,
    name: "BLONDED LOS SANTOS",
    slug: "blonded-los-santos",
    frequency: "97.8",
    videoId: "-tVumJBaTWY",
    logo: "blonded-los-santos.webp",
  },
];

const selectElement = (selector) => document.querySelector(selector);

const stationList = selectElement("#station-list");
const currentStationElement = selectElement("#current-station");
const currentTrackElement = selectElement("#current-track");
const frequencyElement = selectElement("#frequency");
const stationLogoElement = selectElement("#station-logo");
const playPauseButton = selectElement("#play-pause");
const previousButton = selectElement("#previous");
const nextButton = selectElement("#next");
const volumeSlider = selectElement("#volume");
const shareButton = selectElement("#share");

let player;
let currentStationIndex = getInitialStationIndex();
let randomSeekAttempt = 0;
let randomSeekPending = true;
let sharedStartSeconds = getSharedStartSeconds();

playPauseButton.classList.add(PLAY_ATTENTION_CLASS);

function getRandomStationIndex() {
  return Math.floor(Math.random() * stations.length);
}

function getInitialStationIndex() {
  const stationSlug = new URLSearchParams(window.location.search).get(
    STATION_QUERY_PARAMETER,
  );

  if (!stationSlug) {
    return getRandomStationIndex();
  }

  const stationIndex = stations.findIndex(
    (station) => station.slug === stationSlug.toLowerCase(),
  );

  return stationIndex >= 0 ? stationIndex : getRandomStationIndex();
}

function getSharedStartSeconds() {
  const rawTime = new URLSearchParams(window.location.search).get(
    TIME_QUERY_PARAMETER,
  );
  const parsedTime = Number.parseInt(rawTime ?? "", 10);

  return Number.isFinite(parsedTime) && parsedTime >= 0 ? parsedTime : null;
}

function getStationShareUrl(station = stations[currentStationIndex]) {
  const url = new URL(APP_URL);
  url.searchParams.set(STATION_QUERY_PARAMETER, station.slug);

  const currentTime = Math.floor(player?.getCurrentTime?.() ?? 0);
  if (currentTime >= 0) {
    url.searchParams.set(TIME_QUERY_PARAMETER, String(currentTime));
  }

  return url.toString();
}

function updateStationUrl() {
  const station = stations[currentStationIndex];
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(STATION_QUERY_PARAMETER, station.slug);
  currentUrl.searchParams.delete(TIME_QUERY_PARAMETER);

  window.history.replaceState(
    { station: station.slug },
    "",
    currentUrl,
  );
}

function getLogoPath(logoFilename) {
  return `assets/logos/${logoFilename}`;
}

function setLogoImage(imageElement, logoFilename, altText = "") {
  imageElement.alt = altText;
  imageElement.src = getLogoPath(logoFilename);
}

function renderStationList() {
  stationList.replaceChildren();

  stations.forEach((station, stationIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "station-button";
    button.title = station.name;
    button.setAttribute("aria-label", station.name);

    const logoImage = document.createElement("img");
    setLogoImage(logoImage, station.logo);

    const stationName = document.createElement("span");
    stationName.textContent = station.name;

    button.append(logoImage, stationName);
    button.addEventListener("click", () => loadStation(stationIndex, { updateUrl: true }));

    stationList.appendChild(button);
  });

  updateActiveStation();
}

function updateActiveStation() {
  const station = stations[currentStationIndex];
  const stationButtons = document.querySelectorAll(".station-button");

  stationButtons.forEach((button, stationIndex) => {
    const isActive = stationIndex === currentStationIndex;
    button.classList.toggle("active", isActive);

    if (isActive) {
      button.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  });

  currentStationElement.textContent = station.name;
  frequencyElement.textContent = station.frequency;
  currentTrackElement.textContent = "GTA RADIO — FULL STATION";
  setLogoImage(stationLogoElement, station.logo, station.name);

  document.title = `${station.name} · Skivback FM`;
  shareButton.setAttribute("aria-label", `Dela ${station.name}`);
  shareButton.title = `Dela ${station.name}`;
}

function getRandomPlaybackPosition(totalSeconds) {
  if (totalSeconds < MINIMUM_DURATION_FOR_RANDOM_START_SECONDS) {
    return 0;
  }

  const availableSeconds =
    totalSeconds - RANDOM_START_MARGIN_SECONDS * 2;

  return (
    RANDOM_START_MARGIN_SECONDS +
    Math.floor(Math.random() * availableSeconds)
  );
}

function scheduleRandomSeek() {
  randomSeekPending = true;
  randomSeekAttempt = 0;
  seekToRandomPositionWhenAvailable();
}

function seekToRandomPositionWhenAvailable() {
  if (!player || !randomSeekPending) {
    return;
  }

  const totalSeconds = player.getDuration?.() ?? 0;

  if (totalSeconds > 0) {
    const randomPosition = getRandomPlaybackPosition(totalSeconds);
    player.seekTo(randomPosition, true);
    randomSeekPending = false;
    return;
  }

  randomSeekAttempt += 1;

  if (randomSeekAttempt < RANDOM_SEEK_MAX_ATTEMPTS) {
    window.setTimeout(
      seekToRandomPositionWhenAvailable,
      RANDOM_SEEK_RETRY_INTERVAL_MS,
    );
  }
}

function loadStation(stationIndex, { updateUrl = false } = {}) {
  currentStationIndex =
    (stationIndex + stations.length) % stations.length;

  const station = stations[currentStationIndex];
  updateActiveStation();

  if (updateUrl) {
    updateStationUrl();
  }

  if (!player || typeof player.loadVideoById !== "function") {
    return;
  }

  sharedStartSeconds = null;
  randomSeekPending = true;
  randomSeekAttempt = 0;

  player.loadVideoById({
    videoId: station.videoId,
    startSeconds: 0,
  });
}

function handlePlayerReady(event) {
  event.target.setVolume(Number(volumeSlider.value));

  if (sharedStartSeconds !== null) {
    randomSeekPending = false;
    randomSeekAttempt = 0;
    event.target.seekTo(sharedStartSeconds, true);
    return;
  }

  scheduleRandomSeek();
}

function handlePlayerStateChange(event) {
  const isPlaying = event.data === YT.PlayerState.PLAYING;
  playPauseButton.textContent = isPlaying ? "PAUSE" : "PLAY";
  playPauseButton.classList.toggle(PLAY_ATTENTION_CLASS, !isPlaying);

  if (sharedStartSeconds !== null) {
    event.target.seekTo(sharedStartSeconds, true);
    sharedStartSeconds = null;
  } else if (randomSeekPending) {
    seekToRandomPositionWhenAvailable();
  }

  if (event.data === YT.PlayerState.ENDED) {
    restartCurrentStationFromBeginning();
  }
}

function restartCurrentStationFromBeginning() {
  randomSeekPending = false;
  randomSeekAttempt = 0;
  player?.seekTo?.(0, true);
  player?.playVideo?.();
}

function handlePlayerError(event) {
  currentTrackElement.textContent = `YouTube-fel: ${event.data}`;
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  const station = stations[currentStationIndex];
  player = new YT.Player("youtube-player", {
    width: "1",
    height: "1",
    videoId: station.videoId,
    playerVars: {
      playsinline: 1,
      rel: 0,
      start: 0,
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handlePlayerStateChange,
      onError: handlePlayerError,
    },
  });
};

function togglePlayback() {
  if (!player) {
    return;
  }

  const isPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;

  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function handleVolumeInput() {
  const volume = Number(volumeSlider.value);
  player?.setVolume?.(volume);

  if (volume > 0) {
    player?.unMute?.();
  }
}

async function shareSkivbackFm() {
  const station = stations[currentStationIndex];
  const shareUrl = getStationShareUrl(station);

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${station.name} · Skivback FM`,
        text: `Lyssna på ${station.name} i Skivback FM`,
        url: shareUrl,
      });
      return;
    }

    await copyShareUrl(shareUrl);
  } catch (error) {
    if (error?.name !== "AbortError") {
      window.prompt("Kopiera länken:", shareUrl);
    }
  }
}

async function copyShareUrl(shareUrl) {
  await navigator.clipboard.writeText(shareUrl);

  shareButton.classList.add("copied");
  shareButton.setAttribute("aria-label", "Länken kopierad");
  shareButton.title = "Länken kopierad";

  window.setTimeout(resetShareButton, 1600);
}

function resetShareButton() {
  shareButton.classList.remove("copied");
  const station = stations[currentStationIndex];
  shareButton.setAttribute("aria-label", `Dela ${station.name}`);
  shareButton.title = `Dela ${station.name}`;
}

function seekWithinCurrentStation(offsetSeconds) {
  if (!player || typeof player.getCurrentTime !== "function") {
    return;
  }

  const currentTime = player.getCurrentTime() || 0;
  const duration = player.getDuration?.() || 0;
  const maximumTime = duration > 1 ? duration - 1 : currentTime + offsetSeconds;
  const targetTime = Math.min(
    Math.max(currentTime + offsetSeconds, 0),
    maximumTime,
  );

  randomSeekPending = false;
  randomSeekAttempt = 0;
  player.seekTo(targetTime, true);
}

previousButton.addEventListener("click", () => {
  seekWithinCurrentStation(-SEEK_STEP_SECONDS);
});

nextButton.addEventListener("click", () => {
  seekWithinCurrentStation(SEEK_STEP_SECONDS);
});

playPauseButton.addEventListener("click", togglePlayback);
volumeSlider.addEventListener("input", handleVolumeInput);
shareButton.addEventListener("click", shareSkivbackFm);


window.addEventListener("popstate", () => {
  const stationIndex = getInitialStationIndex();

  if (stationIndex !== currentStationIndex) {
    loadStation(stationIndex);
  }
});

renderStationList();
updateStationUrl();
