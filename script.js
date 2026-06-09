const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  const currentPage = document.body.dataset.page;
  if (link.dataset.page === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
