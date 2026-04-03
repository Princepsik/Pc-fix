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
    title: "🎮 Herní PC pro náročné hry",
    store: "Doporučený výběr",
    price: "cca 25–45 000 Kč",
    text: "Výběr herních PC s grafikami RTX 40, vhodný pro moderní hry ve Full HD i vyšších detailech. Odkaz vede na relevantní nabídku, ne na všechny počítače.",
    linkText: "Zobrazit herní PC",
    link: "https://m.alza.cz/herni-pc-s-nvidia-geforce-rtx-40xx/18904102.htm"
  },
  {
    title: "⚡ SSD upgrade 1 TB",
    store: "Konkrétní doporučení",
    price: "dle aktuální ceny",
    text: "WD Blue SN580 1TB je rozumný NVMe SSD upgrade pro výrazné zrychlení systému i aplikací.",
    linkText: "Zobrazit SSD",
    link: "https://www.alza.cz/wd-blue-sn580-1tb-d7844409.htm"
  },
  {
    title: "🧠 RAM upgrade 16 GB DDR4",
    store: "Konkrétní doporučení",
    price: "dle aktuální ceny",
    text: "Kingston FURY 16GB KIT DDR4 3200 MHz je vhodný upgrade pro starší i běžné herní sestavy s DDR4.",
    linkText: "Zobrazit RAM",
    link: "https://www.alza.cz/kingston-fury-16gb-kit-ddr4-3200mhz-cl16-beast-black-d6622616.htm"
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

const termsModal = document.getElementById("termsModal");
const openTermsModal = document.getElementById("openTermsModal");
const closeTermsModal = document.getElementById("closeTermsModal");
const termsModalBackdrop = document.getElementById("termsModalBackdrop");

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
        <img src="${item.image}" alt="${item.title.replace(/<br\s*\/?>/gi, " ")}">
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
      <a 
  href="${item.link}" 
  target="_blank" 
  rel="noreferrer sponsored"
  class="affiliate-card__link"
  onclick="gtag('event', 'affiliate_click', {
    event_category: 'affiliate',
    event_label: '${item.title}'
  });"
>
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
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =====================
// MODAL - OBCHODNÍ PODMÍNKY
// =====================

if (termsModal && openTermsModal && closeTermsModal && termsModalBackdrop) {
  const openModal = () => {
    termsModal.classList.add("is-open");
    termsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    termsModal.classList.remove("is-open");
    termsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openTermsModal.addEventListener("click", openModal);
  closeTermsModal.addEventListener("click", closeModal);
  termsModalBackdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && termsModal.classList.contains("is-open")) {
      closeModal();
    }
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