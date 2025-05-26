// Theme Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem("theme");

  // Apply dark theme by default if no theme is saved
  if (!savedTheme) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  // Toggle theme function with smooth transition
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Add transition class
    document.body.classList.add("theme-transition");

    // Change theme
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);
  }

  // Add click event listener to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  const body = document.body;

  if (mobileMenuBtn && mainNav) {
    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      mainNav.classList.toggle("active");
      body.classList.toggle("menu-open");

      // Update ARIA attributes
      const isExpanded = mobileMenuBtn.classList.contains("active");
      mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mainNav.classList.contains("active") &&
        !mainNav.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenuBtn.classList.remove("active");
        mainNav.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking a link
    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active");
        mainNav.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove("active");
        mainNav.classList.remove("active");
        body.classList.remove("menu-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    }, 250);
  });
});

// Smooth scroll for anchor links
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
