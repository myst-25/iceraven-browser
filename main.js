// Main site functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializeHeader();
  initializeSmoothScroll();
  initializeDownloadButtons();
});

// Header initialization
function initializeHeader() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".main-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !isExpanded);
      nav.classList.toggle("active");
      menuBtn.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !menuBtn.contains(event.target)) {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Download button functionality
function initializeDownloadButtons() {
  const downloadButtons = document.querySelectorAll(".download-button");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Add your download logic here
      console.log("Download clicked:", this.textContent);
    });
  });
}

// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");
const body = document.body;

// Prevent default touch behavior
mobileMenuBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
  },
  { passive: false }
);

// Toggle mobile menu with improved animation and state management
function toggleMenu() {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";

  // Update ARIA attributes
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  mobileMenuBtn.setAttribute(
    "aria-label",
    isExpanded ? "Open menu" : "Close menu"
  );

  // Toggle classes
  mobileMenuBtn.classList.toggle("active");
  mainNav.classList.toggle("active");
  body.classList.toggle("menu-open");

  // Prevent body scroll when menu is open
  if (!isExpanded) {
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.height = "100%";
    body.style.top = "0";
    body.style.left = "0";
  } else {
    body.style.overflow = "";
    body.style.position = "";
    body.style.width = "";
    body.style.height = "";
    body.style.top = "";
    body.style.left = "";
  }
}

// Toggle mobile menu with debounce
let menuToggleTimeout;
function debouncedToggleMenu() {
  clearTimeout(menuToggleTimeout);
  menuToggleTimeout = setTimeout(toggleMenu, 50);
}

// Toggle mobile menu
mobileMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  debouncedToggleMenu();
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    mainNav.classList.contains("active") &&
    !mainNav.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    debouncedToggleMenu();
  }
});

// Close menu when clicking a link
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav.classList.contains("active")) {
      debouncedToggleMenu();
    }
  });
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mainNav.classList.contains("active")) {
    debouncedToggleMenu();
  }
});

// Fix for orientation change
window.addEventListener("orientationchange", () => {
  if (mainNav.classList.contains("active")) {
    debouncedToggleMenu();
  }
  setVhVariable();
});

// Fix for menu button touch events
mobileMenuBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    mobileMenuBtn.style.transform = "scale(0.95)";
  },
  { passive: false }
);

mobileMenuBtn.addEventListener("touchend", () => {
  mobileMenuBtn.style.transform = "";
});

// Fix for menu button focus
mobileMenuBtn.addEventListener("focus", () => {
  mobileMenuBtn.style.outline = "none";
});

// Fix for menu button blur
mobileMenuBtn.addEventListener("blur", () => {
  mobileMenuBtn.style.outline = "";
});

// Fix for menu button active state
mobileMenuBtn.addEventListener("mousedown", () => {
  mobileMenuBtn.style.transform = "scale(0.95)";
});

mobileMenuBtn.addEventListener("mouseup", () => {
  mobileMenuBtn.style.transform = "";
});

mobileMenuBtn.addEventListener("mouseleave", () => {
  mobileMenuBtn.style.transform = "";
});

// Fix for menu button keyboard navigation
mobileMenuBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    debouncedToggleMenu();
  }
});

// Fix for menu button accessibility
mobileMenuBtn.setAttribute("role", "button");
mobileMenuBtn.setAttribute("aria-label", "Open menu");
mobileMenuBtn.setAttribute("aria-expanded", "false");
mobileMenuBtn.setAttribute("aria-controls", "main-nav");
mobileMenuBtn.setAttribute("tabindex", "0");

// Fix for menu accessibility
mainNav.setAttribute("role", "navigation");
mainNav.setAttribute("aria-label", "Main navigation");

// Fix for menu items accessibility
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.setAttribute("role", "menuitem");
  link.setAttribute("tabindex", "0");
});

// Fix for Android Chrome 100vh issue
function setVhVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Set initial vh variable
setVhVariable();

// Update vh variable on resize and orientation change
window.addEventListener("resize", setVhVariable);
window.addEventListener("orientationchange", () => {
  setVhVariable();
  // Fix for orientation change causing menu issues
  if (mainNav.classList.contains("active")) {
    toggleMenu();
  }
});

// Fix for Android Chrome pull-to-refresh
document.body.style.overscrollBehavior = "none";

// Fix for Android Chrome input zoom
document.querySelectorAll("input, select, textarea").forEach((element) => {
  element.style.fontSize = "16px";
  element.style.maxHeight = "44px";
  element.style.padding = "8px 12px";
});

// Fix for Android Chrome tap highlight
document.querySelectorAll("a, button").forEach((element) => {
  element.style.webkitTapHighlightColor = "transparent";
  element.style.touchAction = "manipulation";
});

// Fix for Android Chrome button styles
document
  .querySelectorAll("button, .cta-button, .download-button, .community-link")
  .forEach((element) => {
    element.style.webkitAppearance = "none";
    element.style.appearance = "none";
    element.style.touchAction = "manipulation";

    // Add active state handling
    element.addEventListener("touchstart", () => {
      element.style.transform = "scale(0.98)";
    });

    element.addEventListener("touchend", () => {
      element.style.transform = "";
    });
  });

// Fix for Android Chrome scrolling
document
  .querySelectorAll(".download-table, .feature-grid, .community-grid")
  .forEach((element) => {
    element.style.webkitOverflowScrolling = "touch";
    element.style.scrollBehavior = "smooth";
    element.style.overscrollBehaviorY = "contain";
  });

// Fix for Android Chrome viewport height
if (window.innerHeight <= 500) {
  document.querySelector(".hero").style.minHeight = "100vh";
}

// Fix for Android Chrome animations
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  document
    .querySelectorAll(".feature-card, .community-card, .download-button")
    .forEach((element) => {
      element.style.willChange = "transform";
      element.style.transform = "translateZ(0)";
      element.style.backfaceVisibility = "hidden";
    });
}

// Fix for Android Chrome backdrop filter
if (CSS.supports("backdrop-filter", "blur(12px)")) {
  document
    .querySelectorAll(".hero, .header, .feature-card, .community-card")
    .forEach((element) => {
      element.style.backdropFilter = "var(--glass-backdrop)";
      element.style.webkitBackdropFilter = "var(--glass-backdrop)";
    });
}

// Fix for Android Chrome fixed positioning
document.querySelector(".header").style.transform = "translateZ(0)";

// Fix for Android Chrome scrolling containers
document.querySelectorAll(".scroll-container").forEach((element) => {
  element.style.webkitOverflowScrolling = "touch";
  element.style.overscrollBehaviorY = "contain";
  element.style.scrollBehavior = "smooth";
});

// Fix for Android Chrome form elements
document.querySelectorAll("input, select, textarea").forEach((element) => {
  element.style.webkitAppearance = "none";
  element.style.appearance = "none";
  element.style.borderRadius = "var(--border-radius)";
  element.style.touchAction = "manipulation";
});

// Fix for Android Chrome images
document.querySelectorAll("img").forEach((element) => {
  element.style.maxWidth = "100%";
  element.style.height = "auto";
  element.style.webkitUserDrag = "none";
  element.style.userDrag = "none";
  element.style.touchAction = "manipulation";
});

// Fix for Android Chrome links
document.querySelectorAll("a").forEach((element) => {
  element.style.webkitTapHighlightColor = "transparent";
  element.style.textDecoration = "none";
  element.style.touchAction = "manipulation";
});

// Fix for Android Chrome scrolling momentum
document.querySelectorAll(".scroll-momentum").forEach((element) => {
  element.style.webkitOverflowScrolling = "touch";
  element.style.scrollBehavior = "smooth";
  element.style.overscrollBehaviorY = "contain";
});

// Fix for Android Chrome touch events
document.addEventListener("touchstart", () => {}, { passive: true });
document.addEventListener("touchmove", () => {}, { passive: true });
document.addEventListener("touchend", () => {}, { passive: true });

// Fix for Android Chrome scroll events
document.addEventListener("scroll", () => {}, { passive: true });

// Fix for Android Chrome resize events
let resizeTimeout;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setVhVariable();
    }, 100);
  },
  { passive: true }
);
