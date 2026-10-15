const placeholder = document.querySelector("#site-navbar");
const siteRoot = placeholder.dataset.siteRoot;

fetch(`${siteRoot}components/navbar.html`)
  .then((response) => {
    if (!response.ok) throw new Error("Could not load the navbar");
    return response.text();
  })
  .then((html) => {
    placeholder.innerHTML = html;

    placeholder.querySelectorAll("[data-path]").forEach((element) => {
      const attribute = element.tagName === "IMG" ? "src" : "href";
      element.setAttribute(attribute, siteRoot + element.dataset.path);
      element.removeAttribute("data-path");
    });
  })
  .catch((error) => console.error(error));