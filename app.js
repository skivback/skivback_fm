"use strict";
const stations=[
{index:1,name:"SPACE 103.2",frequency:"103.2",videoId:"6TnV43UWoqk",startSeconds:3,logo:"space.png"},
{index:2,name:"NON-STOP-POP FM",frequency:"100.1",videoId:"Fjp0wu3lEHk",logo:"non-stop-pop-fm.png"},
{index:3,name:"RADIO LOS SANTOS",frequency:"106.1",videoId:"C3_FSXZtRe8",logo:"radio-los-santos.png"},
{index:4,name:"WEST COAST CLASSICS",frequency:"95.6",videoId:"z0Wf3IuZnf0",logo:"west-coast-classics.webp"},
{index:5,name:"REBEL RADIO",frequency:"89.5",videoId:"HeLsaX1I5B4",logo:"rebel-radio.webp"},
{index:6,name:"THE LOWDOWN 91.1",frequency:"91.1",videoId:"RT9h-C24idQ",logo:"the-lowdown.webp"},
{index:7,name:"BLUE ARK",frequency:"94.7",videoId:"LRdjhqMYSGg",logo:"the-blue-ark.png"},
{index:8,name:"WORLDWIDE FM",frequency:"96.5",videoId:"GgIB2WClkwY",logo:"worldwide-fm.png"},
{index:9,name:"EAST LOS FM",frequency:"106.2",videoId:"xTpsoTmhdNc",logo:"east-los-fm.png"},
{index:10,name:"CHANNEL X",frequency:"99.1",videoId:"HHG44PJ0oyo",logo:"channel-x.png"},
{index:11,name:"RADIO MIRROR PARK",frequency:"88.9",videoId:"SDWHIACuuaQ",logo:"radio-mirror-park.webp"},
{index:12,name:"SOULWAX FM",frequency:"93.7",videoId:"EhsQZl8BFz8",logo:"soulwax-fm.jpg"},
{index:13,name:"FLYLO FM",frequency:"98.3",videoId:"3P-ux63rHkU",logo:"fly-lo-fm.png"},
{index:14,name:"VINEWOOD BOULEVARD RADIO",frequency:"101.5",videoId:"5fnGyUc2eFs",logo:"vinewood-boulevard-radio.webp"},
{index:15,name:"LOS SANTOS ROCK RADIO",frequency:"102.3",videoId:"Xy75nA56vcc",logo:"los-santos-rock-radio.png"},
{index:16,name:"LOS SANTOS UNDERGROUND RADIO",frequency:"90.3",videoId:"9cL6IDCtuzs",logo:"los-santos-underground-radio.png"},
{index:17,name:"iFRUIT RADIO",frequency:"107.9",videoId:"P3qixldzDow",logo:"ifruit-radio.webp"},
{index:18,name:"KULT FM",frequency:"99.1",videoId:"I2Xjuz-mnN0",logo:"kult-fm.webp"},
{index:19,name:"STILL SLIPPING LOS SANTOS",frequency:"96.2",videoId:"fpvJaphZ2_g",logo:"still-slipping-los-santos.png"},
{index:20,name:"THE MUSIC LOCKER",frequency:"102.8",videoId:"dBvMBYbUZFc",logo:"music-locker-radio.png"},
{index:21,name:"MEDIA PLAYER",frequency:"88.1",videoId:"dPkzYz-AYOs",logo:"media-player.png"},
{index:22,name:"MOTOMAMI LOS SANTOS",frequency:"94.4",videoId:"30uA_Hppzpc",logo:"motomami.png"},
{index:23,name:"BLONDED LOS SANTOS",frequency:"97.8",videoId:"-tVumJBaTWY",logo:"blonded-los-santos.webp"}
];

const localLogo = logo => `assets/logos/${logo}`;
function setLogoImage(img, logo, alt = "") {
  img.alt = alt;
  img.src = localLogo(logo);
}

let player,currentStationIndex=6,progressTimer=null,userSeeking=false;
const $=s=>document.querySelector(s),stationList=$("#station-list"),currentStation=$("#current-station"),currentTrack=$("#current-track"),frequency=$("#frequency"),stationLogo=$("#station-logo"),playPause=$("#play-pause"),progress=$("#progress"),currentTime=$("#current-time"),duration=$("#duration"),volume=$("#volume");
const formatTime=s=>{if(!Number.isFinite(s)||s<0)return"00:00";const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`};
function renderStationList(){stationList.replaceChildren();stations.forEach((s,i)=>{const b=document.createElement("button");b.type="button";b.className="station-button";b.title=s.name;b.setAttribute("aria-label",s.name);const img=document.createElement("img");setLogoImage(img,s.logo,"");const text=document.createElement("span");text.textContent=s.name;b.append(img,text);b.addEventListener("click",()=>loadStation(i));stationList.appendChild(b)});updateActiveStation()}
function updateActiveStation(){const s=stations[currentStationIndex];document.querySelectorAll(".station-button").forEach((b,i)=>{b.classList.toggle("active",i===currentStationIndex);if(i===currentStationIndex)b.scrollIntoView({block:"nearest",behavior:"smooth"})});currentStation.textContent=s.name;frequency.textContent=s.frequency;setLogoImage(stationLogo,s.logo,s.name);currentTrack.textContent="GTA RADIO — FULL STATION";document.title=`${s.name} · Skivback FM`}
function loadStation(i){currentStationIndex=(i+stations.length)%stations.length;const s=stations[currentStationIndex];updateActiveStation();if(!player||typeof player.loadVideoById!=="function")return;player.loadVideoById({videoId:s.videoId,startSeconds:s.startSeconds??0})}
function updateProgress(){if(!player||userSeeking)return;const e=player.getCurrentTime?.()??0,t=player.getDuration?.()??0;currentTime.textContent=formatTime(e);duration.textContent=formatTime(t);progress.value=t>0?String(e/t*100):"0"}
window.onYouTubeIframeAPIReady=function(){const s=stations[currentStationIndex];player=new YT.Player("youtube-player",{width:"1",height:"1",videoId:s.videoId,playerVars:{playsinline:1,rel:0,start:s.startSeconds??0},events:{onReady:e=>{e.target.setVolume(Number(volume.value));progressTimer=setInterval(updateProgress,500)},onStateChange:e=>{playPause.textContent=e.data===YT.PlayerState.PLAYING?"PAUSE":"PLAY";if(e.data===YT.PlayerState.ENDED)loadStation(currentStationIndex+1)},onError:e=>currentTrack.textContent=`YouTube-fel: ${e.data}`}})};
$("#previous").addEventListener("click",()=>loadStation(currentStationIndex-1));$("#next").addEventListener("click",()=>loadStation(currentStationIndex+1));playPause.addEventListener("click",()=>{if(!player)return;player.getPlayerState()===YT.PlayerState.PLAYING?player.pauseVideo():player.playVideo()});progress.addEventListener("input",()=>{userSeeking=true;const t=player?.getDuration?.()??0;currentTime.textContent=formatTime(t*Number(progress.value)/100)});progress.addEventListener("change",()=>{const t=player?.getDuration?.()??0;player?.seekTo?.(t*Number(progress.value)/100,true);userSeeking=false});volume.addEventListener("input",()=>{
  player?.setVolume?.(Number(volume.value));
  if(Number(volume.value)>0) player?.unMute?.();
});

const shareButton=$("#share");
const shareUrl="https://skivback.github.io/skivback_fm/";
shareButton.addEventListener("click",async()=>{
  try{
    if(navigator.share){
      await navigator.share({title:"Skivback FM",text:"Lyssna på Skivback FM",url:shareUrl});
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    const original=shareButton.getAttribute("aria-label");
    shareButton.classList.add("copied");
    shareButton.setAttribute("aria-label","Länken kopierad");
    shareButton.title="Länken kopierad";
    setTimeout(()=>{
      shareButton.classList.remove("copied");
      shareButton.setAttribute("aria-label",original);
      shareButton.title="Dela Skivback FM";
    },1600);
  }catch(error){
    if(error?.name!=="AbortError") window.prompt("Kopiera länken:",shareUrl);
  }
});
renderStationList();
