"use strict";
const stations=[
{index:1,name:"SPACE 103.2",frequency:"103.2",videoId:"6TnV43UWoqk",startSeconds:3},
{index:2,name:"NON-STOP-POP FM",frequency:"100.1",videoId:"Fjp0wu3lEHk"},
{index:3,name:"RADIO LOS SANTOS",frequency:"106.1",videoId:"C3_FSXZtRe8"},
{index:4,name:"WEST COAST CLASSICS",frequency:"95.6",videoId:"z0Wf3IuZnf0"},
{index:5,name:"REBEL RADIO",frequency:"89.5",videoId:"HeLsaX1I5B4"},
{index:6,name:"THE LOWDOWN",frequency:"91.1",videoId:"RT9h-C24idQ"},
{index:7,name:"BLUE ARK",frequency:"94.7",videoId:"LRdjhqMYSGg"},
{index:8,name:"WORLDWIDE FM",frequency:"96.5",videoId:"GgIB2WClkwY"},
{index:9,name:"EAST LOS FM",frequency:"106.2",videoId:"xTpsoTmhdNc"},
{index:10,name:"CHANNEL X",frequency:"99.1",videoId:"HHG44PJ0oyo"},
{index:11,name:"RADIO MIRROR PARK",frequency:"88.9",videoId:"SDWHIACuuaQ"},
{index:12,name:"SOULWAX FM",frequency:"93.7",videoId:"EhsQZl8BFz8"},
{index:13,name:"FLYLO FM",frequency:"98.3",videoId:"3P-ux63rHkU"},
{index:14,name:"VINEWOOD BOULEVARD",frequency:"101.5",videoId:"5fnGyUc2eFs"},
{index:15,name:"LOS SANTOS UNDERGROUND",frequency:"90.3",videoId:"Xy75nA56vcc"},
{index:16,name:"KULT FM",frequency:"99.1",videoId:"I2Xjuz-mnN0"},
{index:17,name:"STILL SLIPPING",frequency:"96.2",videoId:"fpvJaphZ2_g"},
{index:18,name:"MUSIC LOCKER",frequency:"102.8",videoId:"9cL6IDCtuzs"},
{index:19,name:"MOTOMAMI LOS SANTOS",frequency:"94.4",videoId:"P3qixldzDow"},
{index:20,name:"MEDIA PLAYER",frequency:"88.1",videoId:"dBvMBYbUZFc"},
{index:21,name:"SKIVBACK SELECT 1",frequency:"91.4",videoId:"dPkzYz-AYOs"},
{index:22,name:"SKIVBACK SELECT 2",frequency:"97.8",videoId:"30uA_Hppzpc"},
{index:23,name:"SKIVBACK SELECT 3",frequency:"104.6",videoId:"-tVumJBaTWY"}
];
let player,currentStationIndex=0,progressTimer=null,userSeeking=false;
const $=s=>document.querySelector(s),stationList=$("#station-list"),currentStation=$("#current-station"),currentTrack=$("#current-track"),frequency=$("#frequency"),channelNumber=$("#channel-number"),playPause=$("#play-pause"),progress=$("#progress"),currentTime=$("#current-time"),duration=$("#duration"),volume=$("#volume"),muteButton=$("#mute");
const formatTime=s=>{if(!Number.isFinite(s)||s<0)return"00:00";const m=Math.floor(s/60),sec=Math.floor(s%60);return`${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`};
function renderStationList(){stationList.replaceChildren();stations.forEach((s,i)=>{const b=document.createElement("button");b.type="button";b.className="station-button";b.textContent=s.name;b.addEventListener("click",()=>loadStation(i));stationList.appendChild(b)});updateActiveStation()}
function updateActiveStation(){const s=stations[currentStationIndex];document.querySelectorAll(".station-button").forEach((b,i)=>b.classList.toggle("active",i===currentStationIndex));currentStation.textContent=s.name;frequency.textContent=s.frequency;channelNumber.textContent=`${String(s.index).padStart(2,"0")} / ${stations.length}`;currentTrack.textContent="GTA RADIO — FULL STATION";document.title=`${s.name} · Skivback FM`}
function loadStation(i){currentStationIndex=(i+stations.length)%stations.length;const s=stations[currentStationIndex];updateActiveStation();if(!player||typeof player.loadVideoById!=="function")return;player.loadVideoById({videoId:s.videoId,startSeconds:s.startSeconds??0})}
function updateProgress(){if(!player||userSeeking)return;const e=player.getCurrentTime?.()??0,t=player.getDuration?.()??0;currentTime.textContent=formatTime(e);duration.textContent=formatTime(t);progress.value=t>0?String(e/t*100):"0"}
window.onYouTubeIframeAPIReady=function(){const s=stations[0];player=new YT.Player("youtube-player",{width:"640",height:"360",videoId:s.videoId,playerVars:{playsinline:1,rel:0,start:s.startSeconds??0},events:{onReady:e=>{e.target.setVolume(Number(volume.value));progressTimer=setInterval(updateProgress,500)},onStateChange:e=>{playPause.textContent=e.data===YT.PlayerState.PLAYING?"PAUSE":"PLAY";if(e.data===YT.PlayerState.ENDED)loadStation(currentStationIndex+1)},onError:e=>currentTrack.textContent=`YouTube-fel: ${e.data}`}})};
$("#previous").addEventListener("click",()=>loadStation(currentStationIndex-1));$("#next").addEventListener("click",()=>loadStation(currentStationIndex+1));$("#random-station").addEventListener("click",()=>{let i=currentStationIndex;while(stations.length>1&&i===currentStationIndex)i=Math.floor(Math.random()*stations.length);loadStation(i)});playPause.addEventListener("click",()=>{if(!player)return;player.getPlayerState()===YT.PlayerState.PLAYING?player.pauseVideo():player.playVideo()});progress.addEventListener("input",()=>{userSeeking=true;const t=player?.getDuration?.()??0;currentTime.textContent=formatTime(t*Number(progress.value)/100)});progress.addEventListener("change",()=>{const t=player?.getDuration?.()??0;player?.seekTo?.(t*Number(progress.value)/100,true);userSeeking=false});volume.addEventListener("input",()=>{player?.setVolume?.(Number(volume.value));if(Number(volume.value)>0){player?.unMute?.();muteButton.textContent="MUTE"}});muteButton.addEventListener("click",()=>{if(!player)return;if(player.isMuted()){player.unMute();muteButton.textContent="MUTE"}else{player.mute();muteButton.textContent="UNMUTE"}});renderStationList();
