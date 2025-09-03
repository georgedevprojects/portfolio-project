document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Game Designer", "Programmer", "Level Designer"];
  let index = 0;
  const roleElement = document.getElementById("rotating-role");

  function animateText(newText) {
    // fade out existing letters
    const oldSpans = roleElement.querySelectorAll("span");
    oldSpans.forEach(span => {
      span.style.transition = "opacity 0.3s ease-out";
      span.style.opacity = 0;
    });

    setTimeout(() => {
      // Clear only the rotating text, not the header or ASCII
      roleElement.innerHTML = "";

      // Animate new text letter by letter
      newText.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = 0;
        span.style.transition = "opacity 0.4s ease-out";
        roleElement.appendChild(span);

        setTimeout(() => {
          span.style.opacity = 1;
        }, i * 80);
      });
    }, 300);
  }

  // Initial render
  animateText(roles[index]);

  // Rotate every 3 seconds
  setInterval(() => {
    index = (index + 1) % roles.length;
    animateText(roles[index]);
  }, 3000);

  // Load ASCII art (unchanged)
  fetch('assets/images/ascii-art.txt')
    .then(res => res.text())
    .then(data => {
      document.getElementById('ascii-art').innerHTML = `<pre>${data}</pre>`;
    });
});
