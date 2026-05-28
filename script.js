const accordionButtons = document.querySelectorAll(".accordion-item button");
const revealTargets = document.querySelectorAll([
  ".section-heading",
  ".meaning-layout",
  ".type-stage",
  ".numbers-map",
  ".advantages-layout",
  ".scheme img",
  ".steps-map",
  ".gallery-wrap",
  ".learn-more",
  ".site-footer"
].join(","));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader?.classList.remove("is-menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});


const schemeButtons = document.querySelectorAll("[data-scheme-label]");
const schemeCaption = document.querySelector("[data-scheme-caption]");

schemeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = `${button.dataset.schemeIndex}: ${button.dataset.schemeLabel}`;
    if (schemeCaption) schemeCaption.textContent = text;

    schemeButtons.forEach((current) => {
      current.classList.remove("is-active");
      current.setAttribute("aria-pressed", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
  });
});
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  siteHeader?.classList.remove("is-menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

if (revealTargets.length) {
  document.documentElement.classList.add("reveal-ready");

  revealTargets.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 70}ms`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealVisibleItems = () => {
      revealTargets.forEach((item) => {
        if (item.classList.contains("is-visible")) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          item.classList.add("is-visible");
        }
      });
    };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    revealTargets.forEach((item) => revealObserver.observe(item));
    window.addEventListener("scroll", revealVisibleItems, { passive: true });
    window.addEventListener("resize", revealVisibleItems);
    window.requestAnimationFrame(revealVisibleItems);
    window.setTimeout(revealVisibleItems, 300);
  }
}

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".accordion-item");
    const isOpen = item.classList.contains("is-open");

    document.querySelectorAll(".accordion-item").forEach((current) => {
      current.classList.remove("is-open");
      current.querySelector("button").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const typeSlider = document.querySelector("[data-slider]");
const prevType = document.querySelector("[data-slider-prev]");
const nextType = document.querySelector("[data-slider-next]");
const typeCards = Array.from(document.querySelectorAll(".type-card"));
const typeSets = [
  [
    {
      title: "Классический румбокс",
      text: "Объёмный конструктор для ручной сборки детализированной миниатюры интерьера.",
      src: "фотки обр/DSC_0030.png",
      alt: "Классический румбокс"
    },
    {
      title: "Румбокс-блокнот",
      text: "Творческий набор для создания миниатюрных интерьеров с помощью наклеек.",
      src: "фотки обр/DSC_0011.png",
      alt: "Румбокс-блокнот"
    },
    {
      title: "Румбокс-чемоданчик",
      text: "Разновидность классического румбокса в форме чемодана для сборки миниатюры внутри.",
      src: "фотки обр/DSC_0141.jpg",
      alt: "Румбокс-чемоданчик"
    }
  ],
  [
    {
      title: "Румбокс-блокнот",
      text: "Творческий набор для создания миниатюрных интерьеров с помощью наклеек.",
      src: "фотки обр/DSC_0011.png",
      alt: "Румбокс-блокнот"
    },
    {
      title: "Румбокс-чемоданчик",
      text: "Разновидность классического румбокса в форме чемодана для сборки миниатюры внутри.",
      src: "фотки обр/DSC_0141.jpg",
      alt: "Румбокс-чемоданчик"
    },
    {
      title: "Нестандартная форма",
      text: "Румбокс, выполненный внутри любого нестандартного предмета-оболочки.",
      src: "фотки обр/Нестандартная форма.jpg",
      alt: "Румбокс в нестандартной форме"
    }
  ],
  [
    {
      title: "Книжный румбокс",
      text: "Миниатюра интерьера, собранная внутри полой книги или между обложками.",
      src: "фотки обр/Rectangle 22393.jpg",
      alt: "Книжный румбокс"
    },
    {
      title: "Классический румбокс",
      text: "Объёмный конструктор для ручной сборки детализированной миниатюры интерьера.",
      src: "фотки обр/DSC_0030.png",
      alt: "Классический румбокс"
    },
    {
      title: "Румбокс-блокнот",
      text: "Творческий набор для создания миниатюрных интерьеров с помощью наклеек.",
      src: "фотки обр/DSC_0011.png",
      alt: "Румбокс-блокнот"
    }
  ]
];
let typeIndex = 0;
let typeLocked = false;

typeSets[0] = typeCards.map((card) => {
  const image = card.querySelector("img");
  const title = card.querySelector(".type-text h3");
  const text = card.querySelector(".type-text p");

  return {
    title: title?.textContent.trim() || "",
    text: text?.textContent.trim() || "",
    src: image?.getAttribute("src") || "",
    alt: image?.getAttribute("alt") || ""
  };
});

function scrollTypes(direction) {
  if (!typeSlider) return;
  const amount = typeSlider.clientWidth * 0.8;
  typeSlider.scrollBy({ left: direction * amount, behavior: "smooth" });
}

function updateTypes(direction) {
  if (!typeSlider || !typeCards.length) return;

  if (window.matchMedia("(max-width: 900px)").matches) {
    scrollTypes(direction);
    return;
  }

  if (typeLocked) return;
  typeLocked = true;
  typeIndex = (typeIndex + direction + typeSets.length) % typeSets.length;
  typeSlider.classList.add("is-changing");

  window.setTimeout(() => {
    typeCards.forEach((card, index) => {
      const item = typeSets[typeIndex]?.[index];
      if (!item) return;

      const image = card.querySelector("img");
      const title = card.querySelector(".type-text h3");
      const text = card.querySelector(".type-text p");

      if (image) {
        image.src = item.src;
        image.alt = item.alt;
      }
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
    });

    typeSlider.classList.remove("is-changing");
    window.setTimeout(() => {
      typeLocked = false;
    }, 240);
  }, 180);
}

prevType?.addEventListener("click", () => updateTypes(-1));
nextType?.addEventListener("click", () => updateTypes(1));

const infoCards = document.querySelectorAll(".advantage-card");
const infoImage = document.querySelector("[data-info-image-target]");
const defaultInfoImage = {
  src: infoImage?.getAttribute("src") || "",
  alt: infoImage?.getAttribute("alt") || ""
};

function setInfoImage(src, alt) {
  if (!infoImage || infoImage.getAttribute("src") === src) return;
  infoImage.classList.add("is-changing");

  window.setTimeout(() => {
    infoImage.src = src;
    infoImage.alt = alt;
    infoImage.classList.remove("is-changing");
  }, 150);
}

infoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const isOpen = card.classList.contains("is-open");

    infoCards.forEach((current) => {
      current.classList.remove("is-open");
      current.setAttribute("aria-expanded", "false");
    });

    if (isOpen) {
      setInfoImage(defaultInfoImage.src, defaultInfoImage.alt);
      return;
    }

    card.classList.add("is-open");
    card.setAttribute("aria-expanded", "true");
    setInfoImage(card.dataset.infoImage, card.dataset.infoAlt);
  });
});

const gallery = document.querySelector("[data-gallery]");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const progress = document.querySelector("[data-progress]");
const galleryImages = document.querySelectorAll("[data-gallery-image]");
const gallerySets = [
  [
    ["фотки обр/DSC_0019.jpg", "Дверца садового румбокса"],
    ["фотки обр/DSC_0034.jpg", "Детали нижнего этажа румбокса"],
    ["фотки обр/DSC_0036.jpg", "Миниатюрный столик внутри комнаты"],
    ["фотки обр/DSC_0043.jpg", "Цветы и лестница в миниатюре"],
    ["фотки обр/DSC_0037.jpg", "Веранда миниатюрного домика"]
  ],
  [
    ["фотки обр/DSC_0025.jpg", "Цветы и мебель внутри румбокса"],
    ["фотки обр/DSC_0126.jpg", "Миниатюрная мебель на белом фоне"],
    ["фотки обр/DSC_0038.jpg", "Барная стойка внутри миниатюрного домика"],
    ["фотки обр/DSC_0144.jpg", "Комната румбокса с вентилятором и швейной машинкой"],
    ["фотки обр/DSC_0137.jpg", "Миниатюрные аксессуары на белом фоне"]
  ],
  [
    ["фотки обр/DSC_0145.jpg", "Швейный уголок в румбоксе"],
    ["фотки обр/DSC_0022.jpg", "Детали садового купола"],
    ["фотки обр/DSC_0150.jpg", "Механическая миниатюрная комната"],
    ["фотки обр/DSC_0152.jpg", "Детали индустриального румбокса"],
    ["фотки обр/DSC_0154.jpg", "Круглое окно в миниатюре"]
  ]
];
let galleryIndex = 0;

function updateGalleryProgress() {
  if (!gallery || !progress) return;
  const step = gallerySets.length > 1 ? 200 / (gallerySets.length - 1) : 0;
  progress.style.transform = `translateX(${galleryIndex * step}%)`;
}

function scrollGallery(direction) {
  if (!gallery || !galleryImages.length) return;
  galleryIndex = (galleryIndex + direction + gallerySets.length) % gallerySets.length;
  const nextSet = gallerySets[galleryIndex];

  gallery.classList.add("is-changing");

  window.setTimeout(() => {
    galleryImages.forEach((image, index) => {
      const [src, alt] = nextSet[index];
      image.src = src;
      image.alt = alt;
    });
    gallery.classList.remove("is-changing");
    updateGalleryProgress();
  }, 160);
}

galleryPrev?.addEventListener("click", () => scrollGallery(-1));
galleryNext?.addEventListener("click", () => scrollGallery(1));
window.addEventListener("resize", updateGalleryProgress);
updateGalleryProgress();
