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
      "Los Angeles","San Francisco","San Diego","Sacramento","Oakland",
      "Long Beach","Anaheim","Santa Ana","Riverside","Stockton"
    ],
    texas: [
      "Houston","Dallas","Austin","San Antonio","Fort Worth",
      "Arlington","Corpus Christi","Plano","Garland","Irving"
    ],
    florida: [
      "Miami","Orlando","Tampa","Jacksonville","St. Petersburg",
      "Hialeah","Fort Lauderdale","Tallahassee","Doral","Pembroke Pines"
    ],
    newyork: [
      "New York City","Buffalo","Rochester","Yonkers","Albany",
      "Syracuse","Troy","Niagara Falls","Utica","Glens Falls"
    ],
    illinois: [
      "Chicago","Aurora","Rockford","Joliet","Naperville",
      "Springfield","Peoria","Evanston","Cicero","Schaumburg"
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

  renderCities("california");

  stateItems.forEach(item => {
    item.addEventListener("click", () => {
      stateItems.forEach(s => s.classList.remove("active"));
      item.classList.add("active");
      renderCities(item.dataset.state);
    });
  });

  /* ==========================
     FAQ ACCORDION
  ========================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
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

// ================= QUOTE FORM (GitHub Pages) =================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const statusEl = document.getElementById("quoteStatus");
  const btn = document.getElementById("quoteBtn");

  // ✅ Use your LIVE /exec URL (the one that shows "Quote Receiver is live ✅")
  const SCRIPT_URL = "hiddenForm.action = "https://script.google.com/macros/s/AKfycbzCI_G3HG-FIyyDR3W6u62-ji1CbjXb56O2FDR9MjYLsl4vUoN2M3y8zRPzUCcmwAtD/exec";

  // Ensure the visible form never navigates away
  form.removeAttribute("action");
  form.removeAttribute("method");
  form.removeAttribute("target");

  // Hidden iframe (must match name below)
  let iframe = document.getElementById("quote_hidden_iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "quote_hidden_iframe";
    iframe.name = "quote_hidden_iframe";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  // Hidden form that actually posts to Apps Script
  let hiddenForm = document.getElementById("quote_hidden_form");
  if (!hiddenForm) {
    hiddenForm = document.createElement("form");
    hiddenForm.id = "quote_hidden_form";
    hiddenForm.style.display = "none";
    document.body.appendChild(hiddenForm);
  }

  hiddenForm.method = "POST";
  hiddenForm.action = SCRIPT_URL;
  hiddenForm.target = "quote_hidden_iframe";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Honeypot spam check
    const hp = document.getElementById("websiteField");
    if (hp && hp.value) return;

    statusEl.textContent = "Submitting…";
    btn.disabled = true;

    // Clear previous hidden inputs
    hiddenForm.innerHTML = "";

    // Copy the visible form data into hidden inputs
    const fd = new FormData(form);
    fd.append("source", window.location.href);
    fd.append("workflow_stage", "Lead received - needs qualification");

    for (const [key, value] of fd.entries()) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      hiddenForm.appendChild(input);
    }

    // Submit in the background (no CORS, no redirect)
    hiddenForm.submit();

    // Redirect the user
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 800);
  }, true);
});
