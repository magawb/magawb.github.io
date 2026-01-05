// Animaciones al hacer scroll
const animated = document.querySelectorAll('.animate');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

animated.forEach(el => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const elements = [
    { id: "title", speed: 60 },
    { id: "subtitle", speed: 40 }
  ];

  function typeElement(el, speed, callback) {
    const text = el.textContent;
    el.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;

      if (i === text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  }

  let index = 0;

  function startTyping() {
    if (index < elements.length) {
      const el = document.getElementById(elements[index].id);
      typeElement(el, elements[index].speed, () => {
        index++;
        setTimeout(startTyping, 300);
      });
    }
  }

  startTyping();
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    mode: "no-cors",
    body: data
  }).then(() => {
    form.reset();
    document.getElementById("success").style.display = "block";
  });
});