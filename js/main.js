document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
     MOBILE MENU TOGGLE
  ========================== */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  /* ==========================
     FOOTER YEAR AUTO UPDATE
  ========================== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================
     STATE → CITY SWITCHER
  ========================== */

  const stateData = {
    california: [
      "Los Angeles",
      "San Francisco",
      "San Diego",
      "Sacramento",
      "Oakland",
      "Long Beach",
      "Anaheim",
      "Santa Ana",
      "Riverside",
      "Stockton"
    ],

    texas: [
      "Houston",
      "Dallas",
      "Austin",
      "San Antonio",
      "Fort Worth",
      "Arlington",
      "Corpus Christi",
      "Plano",
      "Garland",
      "Irving"
    ],

    florida: [
      "Miami",
      "Orlando",
      "Tampa",
      "Jacksonville",
      "St. Petersburg",
      "Hialeah",
      "Fort Lauderdale",
      "Tallahassee",
      "Doral",
      "Pembroke Pines"
    ],

    newyork: [
      "New York City",
      "Buffalo",
      "Rochester",
      "Yonkers",
      "Albany",
      "Syracuse",
      "Troy",
      "Niagara Falls",
      "Utica",
      "Glens Falls"
    ],

    illinois: [
      "Chicago",
      "Aurora",
      "Rockford",
      "Joliet",
      "Naperville",
      "Springfield",
      "Peoria",
      "Evanston",
      "Cicero",
      "Schaumburg"
    ]
  };

  const stateItems = document.querySelectorAll(".state-item");
  const citiesGrid = document.getElementById("citiesGrid");
  const citiesTitle = document.getElementById("cities-title");

  function formatStateName(key) {
    return key.replace(/^\w/, c => c.toUpperCase());
  }

  function renderCities(stateKey) {
    if (!stateData[stateKey]) return;

    citiesGrid.innerHTML = "";
    citiesTitle.textContent = "Cities in " + formatStateName(stateKey);

    stateData[stateKey].forEach(city => {
      const card = document.createElement("div");
      card.className = "city-card";
      card.innerHTML = `
        <div class="city-name">${city}</div>
        <div class="city-state">${formatStateName(stateKey)}</div>
      `;
      citiesGrid.appendChild(card);
    });
  }

  // Default load
  renderCities("california");

  // State click handling
  stateItems.forEach(item => {
    item.addEventListener("click", () => {
      stateItems.forEach(s => s.classList.remove("active"));
      item.classList.add("active");
      renderCities(item.dataset.state);
    });
  });

    /* ==========================
     FAQ ACCORDION (FIXED)
  ========================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all
      faqItems.forEach(i => i.classList.remove("active"));

      // Open clicked one
      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });
});

// ================= COOKIE CONSENT =================
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (!banner || !acceptBtn) return;

  const consent = localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.style.display = "block";
    banner.setAttribute("aria-hidden", "false");
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    banner.setAttribute("aria-hidden", "true");
  });
});
