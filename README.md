# Sahra (سهرة)

**Your Cairo night, planned in 30 seconds.**

Sahra is a night-out planner for Cairo. Pick a vibe, an area, and a budget, and it builds you a full three-stop evening: dinner around 8, the main stop at 10:30, and a late finish after midnight, with a cost estimate for two and live "open now" badges synced to Cairo time.

Built in one night as a demo project.

## Features

- 🎛️ **3-question planner**: vibe (chill / foodie / fancy / full chaos), area (Zamalek, Maadi, Downtown, New Cairo, Heliopolis, Sheikh Zayed, or surprise me), and budget for two
- 🗺️ **3-stop plans** with times, blurbs, per-stop costs and a total estimate
- 🟢 **Live open-now badges** computed from Cairo local time (`Africa/Cairo`)
- 🕐 **Live Cairo clock** in the nav
- 🔀 **Shuffle** to regenerate a plan with the same answers
- 📋 **Copy plan** to clipboard, or **send it straight to WhatsApp** via `wa.me` share
- 📱 Fully responsive, zero dependencies, zero build step

## Run it

It's a static site. Either open `index.html` directly, or serve it:

```bash
cd sahra
python3 -m http.server 8000
# open http://localhost:8000
```

## Stack

- Vanilla HTML, CSS and JavaScript
- No frameworks, no bundler, no backend
- Google Fonts: Space Grotesk + IBM Plex Sans Arabic

## Data

All 20 venues in `app.js` are **fictional demo data**. Any resemblance to a real Cairo spot that actually serves koshari at 1am is a happy coincidence.

## Roadmap (if this ever becomes real)

- Real venue data with opening hours from an API
- Saved plans and group voting
- Ramadan mode (the whole city inverts, the planner should too)
- Arabic-first toggle

---

Made with ☕ and very little sleep in Cairo.
