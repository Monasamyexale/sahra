// Sahra (سهرة) — Cairo night-out planner
// All venues below are fictional demo data.

const VENUES = [
  // Zamalek
  { id: 1,  name: "Mahrousa Rooftop",     area: "Zamalek",      type: "activity", vibes: ["fancy", "chill"],  budget: "high", cost: 700, openUntil: 2,  blurb: "Nile views, low lights, and a playlist that knows when to stay quiet." },
  { id: 2,  name: "Kahwet 26th",          area: "Zamalek",      type: "late",     vibes: ["chill"],           budget: "low",  cost: 120, openUntil: 1,  blurb: "Old-school ahwa energy with surprisingly good konafa after midnight." },
  { id: 3,  name: "Baladi Bites",         area: "Zamalek",      type: "food",     vibes: ["foodie", "chill"], budget: "low",  cost: 180, openUntil: 0,  blurb: "Feteer, taameya and molokhia done like teta taught them." },
  { id: 4,  name: "The Lemon Tree",       area: "Zamalek",      type: "food",     vibes: ["fancy", "foodie"], budget: "high", cost: 650, openUntil: 1,  blurb: "Garden tables, mezze that keeps coming, and zero rush." },
  // Maadi
  { id: 5,  name: "Road 9 Social",        area: "Maadi",        type: "activity", vibes: ["chill", "chaos"],  budget: "mid",  cost: 350, openUntil: 2,  blurb: "Board games early, louder tables later. Everyone ends up staying." },
  { id: 6,  name: "Wok & Roll Maadi",     area: "Maadi",        type: "food",     vibes: ["foodie"],          budget: "mid",  cost: 320, openUntil: 23, blurb: "Pan-Asian comfort food ten steps from the metro." },
  { id: 7,  name: "Maadi Creek",          area: "Maadi",        type: "late",     vibes: ["chill", "fancy"],  budget: "mid",  cost: 400, openUntil: 3,  blurb: "A quiet waterside-ish terrace for the part of the night where you actually talk." },
  // Downtown
  { id: 8,  name: "El-Balad Vinyl Bar",   area: "Downtown",     type: "activity", vibes: ["chaos", "chill"],  budget: "mid",  cost: 300, openUntil: 3,  blurb: "Arabic classics on vinyl, a crowd that sings along by 11." },
  { id: 9,  name: "Koshari El-Modeern",   area: "Downtown",     type: "food",     vibes: ["foodie", "chaos"], budget: "low",  cost: 90,  openUntil: 2,  blurb: "Koshari at 1am hits different. Extra dakka, no regrets." },
  { id: 10, name: "Groppi Nights",        area: "Downtown",     type: "late",     vibes: ["fancy", "chill"],  budget: "high", cost: 500, openUntil: 2,  blurb: "A 1920s ballroom fantasy with mocktails and old Cairo glamour." },
  { id: 11, name: "Tahrir Roastery",      area: "Downtown",     type: "food",     vibes: ["chill", "foodie"], budget: "low",  cost: 140, openUntil: 22, blurb: "Third-wave coffee inside a Belle Époque building. Yes, really." },
  // New Cairo
  { id: 12, name: "5th Settlement Social",area: "New Cairo",    type: "activity", vibes: ["fancy", "chaos"],  budget: "high", cost: 600, openUntil: 2,  blurb: "Big terrace, bigger sound system. New Cairo doing the most." },
  { id: 13, name: "Bun & Beyond",         area: "New Cairo",    type: "food",     vibes: ["foodie", "chill"], budget: "mid",  cost: 280, openUntil: 1,  blurb: "Smash burgers worth the Ring Road drive. Get the loaded fries." },
  { id: 14, name: "Shisha & Stars",       area: "New Cairo",    type: "late",     vibes: ["chill"],           budget: "mid",  cost: 250, openUntil: 4,  blurb: "Open-air rooftop that somehow stays warm in January." },
  // Heliopolis
  { id: 15, name: "Korba Courtyard",      area: "Heliopolis",   type: "activity", vibes: ["chill", "fancy"],  budget: "mid",  cost: 350, openUntil: 1,  blurb: "Fairy lights, old buildings, and the best people-watching in town." },
  { id: 16, name: "Merryland Nights",     area: "Heliopolis",   type: "late",     vibes: ["chaos"],           budget: "low",  cost: 200, openUntil: 4,  blurb: "Street food carts and loud shaabi until very, very late." },
  { id: 17, name: "Heliopolis House",     area: "Heliopolis",   type: "food",     vibes: ["foodie", "fancy"], budget: "mid",  cost: 380, openUntil: 0,  blurb: "Egyptian fine dining without the stiff vibes." },
  // Sheikh Zayed
  { id: 18, name: "Zayed Skyline Lounge", area: "Sheikh Zayed", type: "activity", vibes: ["fancy"],           budget: "high", cost: 550, openUntil: 2,  blurb: "West Cairo's answer to a rooftop, minus the bridge traffic home." },
  { id: 19, name: "El-Boustan Grill",     area: "Sheikh Zayed", type: "food",     vibes: ["foodie"],          budget: "mid",  cost: 340, openUntil: 1,  blurb: "Mixed grill platters sized for people who skipped lunch." },
  { id: 20, name: "Arkan After Dark",     area: "Sheikh Zayed", type: "late",     vibes: ["chaos", "fancy"],  budget: "high", cost: 480, openUntil: 3,  blurb: "Where Zayed nights end when they refuse to end." }
];

const PICK_IDS = [8, 9, 5, 15, 1, 13];
const STOP_TIMES = ["8:00 PM", "10:30 PM", "12:30 AM"];
const STOP_LABELS = ["Start with dinner", "The main stop", "Late finish"];

// ---------- Cairo clock ----------
function cairoNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
}

function tickClock() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
  });
  document.getElementById("clock").textContent = "Cairo " + fmt.format(new Date());
}
setInterval(tickClock, 1000);
tickClock();

document.getElementById("year").textContent = cairoNow().getFullYear();
document.getElementById("statVenues").textContent = VENUES.length;

// ---------- Open-now logic ----------
function isOpenNow(venue) {
  const h = cairoNow().getHours();
  const until = venue.openUntil; // 0 means midnight
  if (until <= 6) return h >= 11 || h < until; // closes after midnight
  return h >= 11 && h < until;
}

// ---------- Planner ----------
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickStop(type, vibe, area, budget, used) {
  let pool = VENUES.filter(v => v.type === type && !used.has(v.id));
  let p = pool.filter(v =>
    (area === "any" || v.area === area) &&
    (budget === "high" || v.budget === budget || (budget === "mid" && v.budget === "low")) &&
    (type !== "activity" || v.vibes.includes(vibe))
  );
  if (p.length) return sample(p);
  // widen: drop area
  p = pool.filter(v =>
    (budget === "high" || v.budget === budget || (budget === "mid" && v.budget === "low")) &&
    (type !== "activity" || v.vibes.includes(vibe))
  );
  if (p.length) return sample(p);
  // widen: drop vibe/budget, keep type
  if (pool.length) return sample(pool);
  // last resort: reuse type from anywhere
  return sample(VENUES.filter(v => v.type === type));
}

function buildPlan() {
  const vibe = document.getElementById("vibe").value;
  const area = document.getElementById("area").value;
  const budget = document.getElementById("budget").value;

  const used = new Set();
  const dinner = pickStop("food", vibe, area, budget, used);     used.add(dinner.id);
  const main   = pickStop("activity", vibe, area, budget, used); used.add(main.id);
  const late   = pickStop("late", vibe, area, budget, used);

  return { stops: [dinner, main, late], vibe, area, budget };
}

let currentPlan = null;

function renderPlan() {
  const result = document.getElementById("result");
  const stopsEl = document.getElementById("stops");
  const totalEl = document.getElementById("resultTotal");
  const titleEl = document.getElementById("resultTitle");
  stopsEl.innerHTML = "";

  const areaTxt = currentPlan.area === "any" ? "Cairo" : currentPlan.area;
  titleEl.textContent = `Your night in ${areaTxt}`;

  currentPlan.stops.forEach((v, i) => {
    const li = document.createElement("li");
    li.className = "stop";
    const open = isOpenNow(v);
    li.innerHTML = `
      <div class="stop-time">${STOP_TIMES[i]}<small>${STOP_LABELS[i]}</small></div>
      <div class="stop-body">
        <h4>${v.name}</h4>
        <p>${v.blurb}</p>
        <div class="stop-meta">
          <span class="chip">${v.area}</span>
          <span class="chip">~${v.cost} EGP for two</span>
          <span class="chip ${open ? "open" : "closed"}">${open ? "Open now" : "Opens later"}</span>
        </div>
      </div>`;
    stopsEl.appendChild(li);
  });

  const total = currentPlan.stops.reduce((s, v) => s + v.cost, 0);
  totalEl.textContent = `≈ ${total.toLocaleString()} EGP for two`;
  result.hidden = false;
  document.getElementById("copiedMsg").hidden = true;
}

function planAsText() {
  const areaTxt = currentPlan.area === "any" ? "Cairo" : currentPlan.area;
  const lines = currentPlan.stops.map((v, i) =>
    `${STOP_TIMES[i]} — ${v.name} (${v.area}): ${v.blurb}`
  );
  const total = currentPlan.stops.reduce((s, v) => s + v.cost, 0);
  return `🌙 Sahra plan: a night in ${areaTxt}\n\n${lines.join("\n")}\n\nTotal ≈ ${total} EGP for two. Planned with Sahra (سهرة).`;
}

document.getElementById("planBtn").addEventListener("click", () => {
  currentPlan = buildPlan();
  renderPlan();
  document.getElementById("result").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  currentPlan = buildPlan();
  renderPlan();
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = planAsText();
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); ta.remove();
  }
  document.getElementById("copiedMsg").hidden = false;
});

document.getElementById("waBtn").addEventListener("click", () => {
  window.open("https://wa.me/?text=" + encodeURIComponent(planAsText()), "_blank");
});

// ---------- Tonight's picks ----------
function renderPicks() {
  const picks = document.getElementById("picks");
  picks.innerHTML = "";
  PICK_IDS.map(id => VENUES.find(v => v.id === id)).forEach(v => {
    const open = isOpenNow(v);
    const card = document.createElement("div");
    card.className = "pick";
    card.innerHTML = `
      <h4>${v.name}<span class="area-tag">${v.area}</span></h4>
      <p>${v.blurb}</p>
      <div class="stop-meta">
        <span class="chip">~${v.cost} EGP for two</span>
        <span class="chip ${open ? "open" : "closed"}">${open ? "Open now" : "Opens later"}</span>
      </div>`;
    picks.appendChild(card);
  });
}
renderPicks();
setInterval(renderPicks, 60000); // refresh open badges every minute
