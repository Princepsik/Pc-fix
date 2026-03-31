// =====================
// DATA
// =====================

const pcItems = [
  {
    category: "gaming",
    title: "Pouze ilustrační<br>Gaming PC Ryzen 5 / RTX 3060",
    price: "18 900 Kč",
    specs: ["Ryzen 5", "16 GB RAM", "RTX 3060", "1 TB SSD"],
    description:
      "Ideální sestava pro hraní ve Full HD, běžný streaming i náročnější domácí použití.",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
  },
];

const affiliateItems = [
  {
    title: "SSD disk 1 TB",
    store: "Doporučený nákup",
    price: "od 1 690 Kč",
    text:
      "Skvělý upgrade pro starší notebook nebo PC. Výrazně zrychlí systém i běžnou práci.",
    linkText: "Zobrazit doporučení",
  },
  {
    title: "16 GB RAM kit",
    store: "Doporučený nákup",
    price: "od 1 290 Kč",
    text:
      "Rozumná volba pro kancelářské i domácí počítače při více spuštěných aplikacích.",
    linkText: "Zobrazit doporučení",
  },
  {
    title: "Monitor 24–27 palců",
    store: "Doporučený nákup",
    price: "od 2 490 Kč",
    text:
      "Tipy na kvalitní monitory s dobrým poměrem cena / výkon pro práci i zábavu.",
    linkText: "Zobrazit doporučení",
  },
];

// =====================
// ELEMENTY
// =====================

const pcGrid = document.getElementById("pcGrid");
const affiliateGrid = document.getElementById("affiliateGrid");
const filterButtons = document.querySelectorAll("[data-filter]");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");

// =====================
// RENDER PC
// =====================

function renderPcCards(items) {
  if (!pcGrid) return;

  pcGrid.innerHTML = items
    .map(
      (item) => `
    <article class="pc-card">
      <div class="pc-card__image">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="pc-card__body">
        <div class="pc-card__top">
          <h3>${item.title}</h3>
          <div class="pc-card__price">${item.price}</div>
        </div>
        <div class="pc-card__meta">
          ${item.specs.map((spec) => `<span class="tag">${spec}</span>`).join("")}
        </div>
        <p>${item.description}</p>
      </div>
    </article>
  `
    )
    .join("");
}

// =====================
// RENDER PRODUKTY
// =====================

function renderAffiliateCards() {
  if (!affiliateGrid) return;

  affiliateGrid.innerHTML = affiliateItems
    .map(
      (item) => `
    <article class="affiliate-card">
      <div class="affiliate-card__top">
        <div>
          <span class="badge badge--ghost">${item.store}</span>
          <h3>${item.title}</h3>
        </div>
        <div class="affiliate-price">${item.price}</div>
      </div>
      <p>${item.text}</p>
      <a href="#kontakt" class="affiliate-card__link">${item.linkText} →</a>
    </article>
  `
    )
    .join("");
}

// =====================
// FILTRY
// =====================

function setActiveFilter(button) {
  filterButtons.forEach((btn) => btn.classList.remove("is-active"));
  button.classList.add("is-active");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    setActiveFilter(button);

    if (filter === "all") {
      renderPcCards(pcItems);
      return;
    }

    const filtered = pcItems.filter((item) => item.category === filter);
    renderPcCards(filtered);
  });
});

// =====================
// MENU (MOBILE FIX)
// =====================

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // klik na odkaz = zavřít menu
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =====================
// FOOTER YEAR
// =====================

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =====================
// INIT
// =====================

renderPcCards(pcItems);
renderAffiliateCards();