<script>
document.addEventListener("DOMContentLoaded", () => {
  chargerDashboard();
  chargerPreview();
  chargerThemeSemaine();
  appliquerEtatMusique();
  appliquerNightMode();
});

/* =====================
   DASHBOARD
===================== */
function chargerDashboard() {
  if (!google || !google.script) return;
  google.script.run.withSuccessHandler(remplirDashboard)
    .getDashboardData();
}

function remplirDashboard(data) {
  if (!data) return;
  document.getElementById("date").innerText = data.date || "";
  remplirListe("agenda", data.agenda || [], e => e.titre);
  remplirListe("mails", data.mails || [], m => m.subject);
}

function remplirListe(id, items, format) {
  const ul = document.getElementById(id);
  if (!ul) return;
  ul.innerHTML = "";
  if (!items.length) {
    ul.innerHTML = "<li>Aucun élément</li>";
    return;
  }
  items.forEach(i => {
    const li = document.createElement("li");
    li.textContent = format(i);
    ul.appendChild(li);
  });
}

/* =====================
   THEME DE LA SEMAINE
===================== */
function chargerThemeSemaine() {
  const themes = [
    {
      pays: "Cuba",
      image: "https://source.unsplash.com/featured/?cuba,street",
      texte: "Semaine Cuba — avancer avec peu, créer avec rien.",
      spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7YCknf2jT6s",
      musique: "Ambiance cubaine — chaleur et débrouille"
    },
    {
      pays: "Argentine",
      image: "https://source.unsplash.com/featured/?argentina,city",
      texte: "Semaine Argentine — décider, tenir, regarder droit.",
      spotify: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1c7Cw4m1nXx",
      musique: "Ambiance argentine — intensité et verticalité"
    },
    {
      pays: "La Réunion",
      image: "https://source.unsplash.com/featured/?la-reunion,island",
      texte: "Semaine La Réunion — s’ancrer, respirer, s’adapter.",
      spotify: "https://open.spotify.com/embed/playlist/5TtFz3eWQvZpM3kz2c6S8s",
      musique: "Maloya & Séga — ancrage et énergie"
    },
    {
      pays: "Madagascar",
      image: "https://source.unsplash.com/featured/?madagascar,people",
      texte: "Semaine Madagascar — avancer ensemble, humblement.",
      spotify: "https://open.spotify.com/embed/playlist/1kZ3RZQxYyYlXbqgGmMADA",
      musique: "Ambiance malgache — lien et humanité"
    }
  ];

  const index = Math.floor((Date.now() / (1000 * 60 * 60 * 24 * 7)) % themes.length);
  const t = themes[index];

  const img = document.getElementById("themeImage");
  const caption = document.getElementById("themeCaption");
  const player = document.getElementById("spotifyPlayer");
  const musicCaption = document.getElementById("musicCaption");

  if (!img || !caption) return;

  img.src = "";
  img.alt = "Ambiance " + t.pays;

  setTimeout(() => {
    img.src = t.image + "&v=" + Date.now();
  }, 50);

  caption.textContent = t.texte;

  if (player) {
    player.dataset.src = t.spotify;
    player.src = "";
  }

  if (musicCaption) {
    musicCaption.textContent = t.musique;
  }
}

/* =====================
   MUSIQUE ON / OFF
===================== */
function toggleMusic() {
  const enabled = localStorage.getItem("musicEnabled") === "true";
  localStorage.setItem("musicEnabled", String(!enabled));
  appliquerEtatMusique();
}

function appliquerEtatMusique() {
  const enabled = localStorage.getItem("musicEnabled") === "true";
  const btn = document.getElementById("toggleMusicBtn");
  const player = document.getElementById("spotifyPlayer");

  if (!btn || !player) return;

  btn.setAttribute("aria-pressed", enabled);
  btn.textContent = enabled ? "🔇 Couper la musique" : "🎧 Activer la musique";
  player.src = enabled ? player.dataset.src : "";
}

/* =====================
   MODE NUIT
===================== */
function toggleNightMode() {
  const enabled = localStorage.getItem("nightMode") === "true";
  localStorage.setItem("nightMode", String(!enabled));
  appliquerNightMode();
}

function appliquerNightMode() {
  const enabled = localStorage.getItem("nightMode") === "true";
  document.body.classList.toggle("night", enabled);

  const btn = document.getElementById("toggleNightBtn");
  if (btn) {
    btn.setAttribute("aria-pressed", enabled);
    btn.textContent = enabled ? "☀️ Mode jour" : "🌙 Mode nuit";
  }
}

/* =========================
   THEME DE LA SEMAINE
========================= */

.theme-figure {
  width: 100%;
  margin: 0;
  padding: 0;
}

.theme-figure img {
  display: block;
  width: 100%;
  height: auto;
  min-height: 180px;
  max-height: 260px;
  object-fit: cover;
  border-radius: 12px;
  background: #f0f0f0;
}

.theme-card {
  overflow: visible;
}

</script>

