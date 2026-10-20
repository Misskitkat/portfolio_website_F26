const navbar = document.querySelector("#site-navbar");
const siteRoot = navbar.dataset.siteRoot;
const brand = navbar.querySelector(".brand");

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
    const topNavbar = navbar.querySelector(".topnav");
    const navInner = navbar.querySelector(".topnav-inner");
    const navButton = navbar.querySelector(".navbar-button");

    const checkNavbarWidth = () => {
      const needsDropdown = navInner.clientWidth < 760;
      topNavbar.classList.toggle("brand-wrapped", needsDropdown);

      if (!needsDropdown) {
        topNavbar.classList.remove("menu-open");
        navButton.setAttribute("aria-expanded", "false");
      }
    };

    navButton.addEventListener("click", () => {
      const isOpen = topNavbar.classList.toggle("menu-open");
      navButton.setAttribute("aria-expanded", isOpen);
    });

    const resizeObserver = new ResizeObserver(checkNavbarWidth);
    resizeObserver.observe(navInner);
    checkNavbarWidth();
  })
  .catch((error) => console.error(error));

