// Fixed Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

// Check for saved theme or prefer-color-scheme
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Animate toggle
  themeToggle.style.transform = "rotate(180deg) scale(0.8)";
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0) scale(1)";
  }, 300);
});

// Animated Text with CSS Animation Only (No JavaScript needed)
// The animation is handled purely with CSS keyframes

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".animate-left, .animate-right, .animate-bottom")
  .forEach((el) => {
    observer.observe(el);
  });

// Coffee Purchase Simulation (for main page)
document.querySelectorAll(".coffee-btn:not([href])").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (!this.getAttribute("href")) {
      e.preventDefault();
      showNotification("Redirecting to Coffee page...", "info");
      setTimeout(() => {
        window.location.href = "coffee.html";
      }, 1000);
    }
  });
});

// Contact Form Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Simulate sending
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
      submitBtn.style.background = "#10B981";

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Scroll progress indicator
const scrollIndicator = document.createElement("div");
scrollIndicator.id = "scrollIndicator";
document.body.appendChild(scrollIndicator);

const scrollIndicatorStyle = document.createElement("style");
scrollIndicatorStyle.textContent = `
    #scrollIndicator {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 1000;
        transition: width 0.1s;
    }
`;
document.head.appendChild(scrollIndicatorStyle);

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollIndicator.style.width = scrolled + "%";
});

// Show notification function
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotif = document.querySelector(".notification");
  if (existingNotif) existingNotif.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `;

  document.body.appendChild(notification);

  // Style notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#3B82F6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Add notification animation
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(notificationStyle);

// Create confetti effect
function createConfetti() {
  const colors = ["#4F46E5", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.innerHTML = "☕";

    confetti.style.cssText = `
            position: fixed;
            top: -20px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 10}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: 0;
            z-index: 9999;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
            pointer-events: none;
        `;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Add confetti animation
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
