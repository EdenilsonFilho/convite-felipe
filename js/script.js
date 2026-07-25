"use strict";

/** Ativa a mensagem final somente quando ela entra no campo de visão. */
const setupScrollReveal = () => {
  const closing = document.querySelector(".closing");
  if (!("IntersectionObserver" in window)) return;

  closing.style.animationPlayState = "paused";
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    closing.style.animationPlayState = "running";
    observer.unobserve(closing);
  }, { threshold: 0.15 });
  observer.observe(closing);
};

setupScrollReveal();

/** Abre links externos por uma ação direta da pessoa usuária. */
const setupExternalLinks = () => {
  const externalLinks = document.querySelectorAll("[data-external-url]");

  externalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.open(link.dataset.externalUrl, "_blank", "noopener");
    });
  });
};

setupExternalLinks();

/** Alterna as fotos do Felipe em um intervalo confortável para leitura. */
const setupPhotoRotation = () => {
  const photos = document.querySelectorAll(".photo-placeholder__image");
  if (photos.length < 2) return;

  let activePhoto = 0;
  window.setInterval(() => {
    photos[activePhoto].classList.remove("is-visible");
    activePhoto = (activePhoto + 1) % photos.length;
    photos[activePhoto].classList.add("is-visible");
  }, 5000);
};

setupPhotoRotation();
