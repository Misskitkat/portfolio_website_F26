const footer = document.querySelector("#site-footer");
const footerRoot = footer.dataset.footerRoot;

fetch(`${footerRoot}components/footer.html`)
  .then((response) => {
    if (!response.ok) throw new Error("Could not load the footer");
    return response.text();
  })
  .then((html) => {
    footer.innerHTML = html;

    footer.querySelectorAll("[data-path]").forEach((element) => {
      const attribute = element.tagName === "IMG" ? "src" : "href";
      element.setAttribute(attribute, footerRoot + element.dataset.path);
      element.removeAttribute("data-path");
    });
  })
  .catch((error) => console.error(error));