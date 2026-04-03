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
    title: "🎮 KCD II na ULTRA",
    store: "Doporučeno",
    price: "cca 27 000 Kč",
    text: "Hotový herní počítač pro moderní hry na vysoké až ultra detaily bez řešení komponent.",
    linkText: "Koupit na Alza.cz",
    link: "https://www.alza.cz/..."
  },
  {
    title: "🔧 Levnější upgrade pro KCD II",
    store: "Postav si sám",
    price: "cca 25 000 Kč",
    text: "Podobný výkon za méně peněz, ideální pro vlastní stavbu nebo upgrade.",
    linkText: "Zobrazit komponenty",
    link: "https://www.alza.cz/..."
  },
  {
    title: "⚡ Upgrade staršího PC",
    store: "Nejlepší poměr cena/výkon",
    price: "od 2 500 Kč",
    text: "SSD a RAM jsou nejrychlejší cesta, jak citelně zrychlit starší počítač.",
    linkText: "Zobrazit doporučení",
    link: "https://www.alza.cz/..."
  }
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
      (item, index) => `
    <article class="affiliate-card ${index === 0 ? "affiliate-card--featured" : ""}">
      <div>
        <span class="badge badge--ghost">${item.store}</span>
        <h3>${item.title}</h3>
        <div class="affiliate-price">${item.price}</div>
      </div>
      <p>${item.text}</p>
      <a href="${item.link}" target="_blank" rel="noreferrer sponsored" class="affiliate-card__link">
        ${item.linkText} <span aria-hidden="true">→</span>
      </a>
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