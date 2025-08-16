const track = document.querySelector('.carousel-track');
let slides = Array.from(document.querySelectorAll('.carousel-slide'));
let currentIndex = 1; // Start on the first real slide

// Clone first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(document.querySelectorAll('.carousel-slide'));

function updateSlide(animate = true) {
  const slideWidth = slides[0].offsetWidth + 30; // width + margin
  const container = document.querySelector('.carousel-container').offsetWidth;
  const offset = (container - slideWidth) / 2;

  if (!animate) {
    track.style.transition = "none";
  } else {
    track.style.transition = "transform 0.8s ease-in-out";
  }

  track.style.transform = `translateX(${-currentIndex * slideWidth + offset}px)`;
}

// Auto slide every 5 seconds
setInterval(() => {
  currentIndex++;
  updateSlide();

  // Handle wrapping (after transition ends)
  track.addEventListener("transitionend", () => {
    if (slides[currentIndex].id === "first-clone") {
      currentIndex = 1;
      updateSlide(false);
    }
    if (slides[currentIndex].id === "last-clone") {
      currentIndex = slides.length - 2;
      updateSlide(false);
    }
  }, { once: true });

}, 5000);

// Init
window.addEventListener("load", () => {
  updateSlide(false);
});
window.addEventListener("resize", () => {
  updateSlide(false);
});
