const navbar = document.querySelector("#site-navbar");
const siteRoot = navbar.dataset.siteRoot;
const brand = navbar.querySelector(".brand");
const topNavbar = navbar.querySelector(".topnav");
const navButton = navbar.querySelector(".navbar-button");

fetch(`${siteRoot}components/navbar.html`)
  .then((response) => {
    if (!response.ok) throw new Error("Could not load the navbar");
    return response.text();
  })
  .then((html) => {
    navbar.innerHTML = html;

    navbar.querySelectorAll("[data-path]").forEach((element) => {
      const attribute = element.tagName === "IMG" ? "src" : "href";
      element.setAttribute(attribute, siteRoot + element.dataset.path);
      element.removeAttribute("data-path");
    });
    const brand = navbar.querySelector(".brand");
    const topNavbar = navbar.querySelector(".topnav");
    const navButton = navbar.querySelector(".navbar-button");
    const navInner = navbar.querySelector(".topnav-inner");

    const checkBrandWrap = () => {
      const range = document.createRange();
      range.selectNodeContents(brand);

      const isWrapped = range.getClientRects().length > 1;
      topNavbar.classList.toggle("brand-wrapped", isWrapped);
    };

    navButton.addEventListener("click", () => {
      const isOpen = topNavbar.classList.toggle("menu-open");
      navButton.setAttribute("aria-expanded", isOpen);
    });

    const resizeObserver = new ResizeObserver(checkBrandWrap);
    resizeObserver.observe(navInner);
    checkBrandWrap();
  })
  .catch((error) => console.error(error));

