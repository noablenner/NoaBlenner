/* ============================================================
   NOA BLENNER — LE MOTEUR DU N'IMPORTE QUOI
   100% offline. Tous les sons sont générés en direct (Web Audio).
   Aucune information utile n'a été utilisée.
   ============================================================ */

const IMGS = ["assets/noa-profile.png", "assets/noa-face.jpeg", "assets/noa-full.jpeg"];
let soundOn = true;

/* ---------- AUDIO : usine à prouts ---------- */
let AC;
function ac(){ if(!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); return AC; }

function fart(){
  if(!soundOn) return;
  const c = ac(), t = c.currentTime;
  const o = c.createOscillator(), g = c.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(80 + Math.random()*40, t);
  o.frequency.exponentialRampToValueAtTime(40, t + 0.25 + Math.random()*0.2);
  // petit vibrato pour le côté "moite"
  const lfo = c.createOscillator(), lfoG = c.createGain();
  lfo.frequency.value = 18 + Math.random()*20; lfoG.gain.value = 30;
  lfo.connect(lfoG); lfoG.connect(o.frequency);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
  o.connect(g); g.connect(c.destination);
  o.start(t); lfo.start(t); o.stop(t + 0.5); lfo.stop(t + 0.5);
}

function boing(){
  if(!soundOn) return;
  const c = ac(), t = c.currentTime;
  const o = c.createOscillator(), g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(700, t);
  o.frequency.exponentialRampToValueAtTime(120, t + 0.3);
  g.gain.setValueAtTime(0.3, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + 0.4);
}

function scream(){
  if(!soundOn) return;
  const c = ac(), t = c.currentTime;
  const o = c.createOscillator(), g = c.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(300, t);
  o.frequency.linearRampToValueAtTime(1400, t + 0.4);
  o.frequency.linearRampToValueAtTime(900, t + 0.6);
  g.gain.setValueAtTime(0.18, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  o.connect(g); g.connect(c.destination);
  o.start(t); o.stop(t + 0.75);
}

function blip(){
  if(!soundOn) return;
  const c = ac(), t = c.currentTime;
  const o = c.createOscillator(), g = c.createGain();
  o.type="square"; o.frequency.value = 200 + Math.random()*900;
  g.gain.setValueAtTime(0.15,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.12);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+0.13);
}

const SOUNDS = [fart, boing, scream, blip];
function randomSound(){ SOUNDS[Math.floor(Math.random()*SOUNDS.length)](); }

/* ---------- LOADER BIDON ---------- */
const loadMsgs = [
  "Initialisation des prouts...","Téléchargement du charisme de Noa...",
  "Compilation du n'importe quoi...","Réveil des toilettes skibidi...",
  "Calcul du QI de Noa (erreur)...","Chargement à 3%... non 1%... non 0%...",
  "Presque jamais prêt...","Ça sert à rien mais on continue..."
];
let lp = 0;
const fill = document.getElementById("loadfill");
const ltxt = document.getElementById("loadtext");
const loadTimer = setInterval(()=>{
  lp += Math.random()*14;
  // PIÈGE : ça redescend parfois
  if(Math.random() < 0.25) lp -= Math.random()*10;
  lp = Math.max(0, Math.min(100, lp));
  fill.style.width = lp + "%";
  ltxt.textContent = loadMsgs[Math.floor(Math.random()*loadMsgs.length)];
  blip();
  if(lp >= 99){
    clearInterval(loadTimer);
    fill.style.width = "100%";
    ltxt.textContent = "FINI ! (enfin presque)";
    document.getElementById("enterBtn").classList.remove("hidden");
  }
}, 350);

document.getElementById("enterBtn").addEventListener("click", ()=>{
  ac().resume();
  document.getElementById("loader").style.display = "none";
  scream();
  startChaos();
});

/* ---------- ÉMOJIS QUI TOMBENT ---------- */
const FALL_EMOJI = ["🚽","💀","🤡","💩","🔥","🗿","😱","👽","🤖","🥶","💅","🫵","🍌","📢"];
function rainEmoji(){
  const e = document.createElement("div");
  e.className = "fall";
  e.textContent = FALL_EMOJI[Math.floor(Math.random()*FALL_EMOJI.length)];
  e.style.left = Math.random()*100 + "vw";
  const dur = 3 + Math.random()*4;
  e.style.transition = `transform ${dur}s linear, opacity ${dur}s`;
  document.body.appendChild(e);
  requestAnimationFrame(()=>{
    e.style.transform = `translateY(110vh) rotate(${Math.random()*1080}deg)`;
    e.style.opacity = "0.2";
  });
  setTimeout(()=>e.remove(), dur*1000);
}

/* ---------- CURSEUR : TRAÎNÉE DE NOA ---------- */
let lastTrail = 0;
document.addEventListener("mousemove", (ev)=>{
  const now = Date.now();
  if(now - lastTrail < 60) return;
  lastTrail = now;
  const img = document.createElement("img");
  img.src = IMGS[Math.floor(Math.random()*IMGS.length)];
  img.className = "trail-noa";
  img.style.left = (ev.clientX - 17) + "px";
  img.style.top = (ev.clientY - 17) + "px";
  img.style.transition = "transform .6s, opacity .6s";
  document.getElementById("cursorTrail").appendChild(img);
  requestAnimationFrame(()=>{ img.style.transform = "scale(0) rotate(360deg)"; img.style.opacity = "0"; });
  setTimeout(()=>img.remove(), 600);
});

/* ---------- GROSSE TÊTE : EFFETS CHELOUS ---------- */
const FX = ["fx-scream","fx-crazy","fx-smile","fx-tiny","fx-huge"];
const FX_LABELS = {
  "fx-scream":"AAAAAAAH 😱","fx-crazy":"DEVENU FOU 🤪","fx-smile":"SOURIRE INQUIÉTANT 😁",
  "fx-tiny":"oups trop petit 🐜","fx-huge":"TROP GROS 🫨"
};
const mainHead = document.getElementById("mainHead");
const headLabel = document.getElementById("headLabel");
function randomHeadFx(){
  FX.forEach(f => mainHead.classList.remove(f));
  const f = FX[Math.floor(Math.random()*FX.length)];
  mainHead.classList.add(f);
  headLabel.textContent = FX_LABELS[f];
  if(f === "fx-scream" || f === "fx-crazy") scream(); else randomSound();
}
mainHead.addEventListener("click", randomHeadFx);

/* ---------- BOUTON "NE PAS APPUYER" = PIÈGE ---------- */
const trapMsgs = [
  "JE T'AVAIS DIT DE PAS APPUYER 😡","Bravo. T'as cassé internet.","🚽 SKIBIDI ALERTE 🚽",
  "Noa est déçu de toi.","Erreur 404 : ton self-control introuvable.","T'as gagné... rien du tout.",
  "+1 prout dans ta vie.","Ce bouton ne fait RIEN. Comme ce site."
];
document.getElementById("dontPress").addEventListener("click", ()=>{
  fart();
  flash();
  spawnPopup(trapMsgs[Math.floor(Math.random()*trapMsgs.length)]);
  // petite pluie d'emojis bonus
  for(let i=0;i<15;i++) setTimeout(rainEmoji, i*60);
});

/* ---------- FLASH ÉCRAN ---------- */
function flash(){
  const f = document.getElementById("flashLayer");
  const c = ["#fff","#ff00cc","#00ffe1","#fff700"][Math.floor(Math.random()*4)];
  f.style.transition = "none"; f.style.background = c; f.style.opacity = "1";
  requestAnimationFrame(()=>{ f.style.transition = "opacity .4s"; f.style.opacity = "0"; });
}

/* ---------- POPUPS QUI SE MULTIPLIENT ---------- */
let popupCount = 0;
function spawnPopup(msg){
  const host = document.getElementById("popupHost");
  const p = document.createElement("div");
  p.className = "popup";
  p.style.left = (Math.random()*Math.max(50, window.innerWidth-320)) + "px";
  p.style.top = (Math.random()*Math.max(50, window.innerHeight-260)) + "px";
  const img = IMGS[Math.floor(Math.random()*IMGS.length)];
  p.innerHTML = `
    <div class="popup-bar"><span>⚠️ NOA.exe</span><span class="popup-x">✕</span></div>
    <div class="popup-body">
      <img src="${img}" alt="noa">
      <p>${msg}</p>
      <button class="popup-ok">OK</button>
    </div>`;
  host.appendChild(p);
  blip();

  // PIÈGE : fermer = ouvrir 2 nouveaux popups (mais on plafonne pour pas tout péter)
  const closeFns = ()=>{
    p.remove(); fart();
    if(popupCount < 10){
      spawnPopup("tu croyais pouvoir me fermer ? 😈");
      spawnPopup("SKIBIDI 🚽");
    }
  };
  p.querySelector(".popup-x").addEventListener("click", closeFns);
  p.querySelector(".popup-ok").addEventListener("click", closeFns);
  popupCount++;
  // le compteur redescend tout seul pour pas bloquer la page à vie
  setTimeout(()=>{ popupCount = Math.max(0, popupCount-1); }, 4000);
}

/* ---------- MUR DE TÊTES ---------- */
function buildHeadWall(){
  const wall = document.getElementById("headWall");
  for(let i=0;i<48;i++){
    const img = document.createElement("img");
    img.src = IMGS[Math.floor(Math.random()*IMGS.length)];
    img.className = "wall-head";
    img.style.filter = `hue-rotate(${Math.random()*360}deg)`;
    img.addEventListener("mouseenter", ()=>{ randomSound(); img.style.transform = `rotate(90deg) scale(1.5)`; });
    img.addEventListener("mouseleave", ()=>{ img.style.transform = "rotate(90deg)"; });
    img.addEventListener("click", ()=>{ scream(); img.style.filter = `hue-rotate(${Math.random()*360}deg) invert(1)`; });
    wall.appendChild(img);
  }
}

/* ---------- BOUTON QUI FUIT ---------- */
const runner = document.getElementById("runner");
const runZone = document.getElementById("runZone");
function flee(){
  const z = runZone.getBoundingClientRect();
  const maxX = z.width - runner.offsetWidth - 10;
  const maxY = z.height - runner.offsetHeight - 10;
  runner.style.left = Math.max(0, Math.random()*maxX) + "px";
  runner.style.top  = Math.max(0, Math.random()*maxY) + "px";
  boing();
}
runner.addEventListener("mouseenter", flee);
runner.addEventListener("click", (e)=>{
  // si jamais on l'attrape (mobile) : encore un piège
  e.preventDefault(); flee();
  spawnPopup("HAHA tu m'auras jamais 🏃💨");
});

/* ---------- QUIZ PIÈGE ---------- */
document.querySelectorAll(".quiz-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const r = document.getElementById("quizResult");
    if(btn.dataset.ok === "true"){
      r.textContent = "✅ EXACT. La réponse à tout est NOA. (2+2 aussi.)";
      scream(); flash();
      for(let i=0;i<25;i++) setTimeout(rainEmoji, i*40);
    } else {
      r.textContent = "❌ FAUX. La bonne réponse était NOA. Évidemment.";
      fart();
      // PIÈGE : la bonne réponse change de place
      const ans = document.querySelector(".quiz-answers");
      [...ans.children].sort(()=>Math.random()-0.5).forEach(c=>ans.appendChild(c));
    }
  });
});

/* ---------- COMPTEURS DE STATS ---------- */
let statsDone = false;
function runStats(){
  if(statsDone) return; statsDone = true;
  document.querySelectorAll(".stat-num").forEach(el=>{
    const target = +el.dataset.target; let cur = 0;
    const step = Math.max(1, target/60);
    const id = setInterval(()=>{
      cur += step;
      if(cur >= target){ cur = target; clearInterval(id); }
      el.textContent = Math.floor(cur).toLocaleString("fr-FR");
    }, 30);
  });
}
// déclenche quand on scrolle jusqu'aux stats
const statObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) runStats(); });
});
const s3 = document.querySelector(".s3");
if(s3) statObserver.observe(s3);

/* ---------- QI ALÉATOIRE ---------- */
const iqNum = document.getElementById("iqNum");
if(iqNum){
  setInterval(()=>{
    const vals = ["∞","3","420","-7","🍌","999","QI?","2.5"];
    iqNum.textContent = vals[Math.floor(Math.random()*vals.length)];
  }, 700);
}

/* ---------- TITRE QUI BOUGE AU SURVOL ---------- */
const megaTitle = document.getElementById("megaTitle");
megaTitle.addEventListener("mouseenter", ()=>{ randomSound(); });

/* ---------- MUTE ---------- */
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", ()=>{
  soundOn = !soundOn;
  muteBtn.textContent = soundOn ? "🔊 SON : ON" : "🔇 SON : OFF (lâche)";
  if(soundOn) boing();
});

/* ---------- CLIC N'IMPORTE OÙ = SON + EMOJI ---------- */
document.addEventListener("click", (e)=>{
  if(e.target.closest("#loader")) return;
  randomSound();
});

/* ---------- LANCEMENT DU CHAOS ---------- */
function startChaos(){
  buildHeadWall();
  setInterval(rainEmoji, 500);
  // prout aléatoire surprise (le piège sonore ultime)
  setInterval(()=>{ if(Math.random() < 0.3) fart(); }, 5000);
  // popup surprise de temps en temps
  setInterval(()=>{
    if(Math.random() < 0.35 && popupCount < 4){
      spawnPopup(trapMsgs[Math.floor(Math.random()*trapMsgs.length)]);
    }
  }, 9000);
}

/* essaie de démarrer même si on saute le loader (au cas où) */
window.addEventListener("load", ()=>{
  // sécurité : si le loader bug, on peut quand même entrer après 12s
  setTimeout(()=>{
    const eb = document.getElementById("enterBtn");
    if(eb) eb.classList.remove("hidden");
  }, 12000);
});
