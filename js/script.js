"use strict";

/** Gerencia o tema visual e preserva a escolha da pessoa visitante. */
const themeManager = (() => {
  const storageKey = "felipe-invite-theme";
  const body = document.body;
  const button = document.querySelector(".theme-toggle");
  const icon = button.querySelector(".theme-toggle__icon");
  const label = button.querySelector(".theme-toggle__text");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    body.classList.toggle("dark", isDark);
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
    icon.textContent = isDark ? "🌙" : "☀️";
    label.textContent = isDark ? "Modo claro" : "Modo escuro";
  };

  const savedTheme = localStorage.getItem(storageKey);
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

  button.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
})();

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
