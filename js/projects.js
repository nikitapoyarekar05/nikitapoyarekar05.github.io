const detailButtons = document.querySelectorAll(
  ".section__projects-details-button"
);
const modals = document.querySelectorAll(".section__projects-details");

detailButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].style.display = "block";
  });
});

function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
  }
}

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("section__projects-modal-close")) {
    closeModal(event.target.closest(".section__projects-details"));
  }
});

window.addEventListener("click", (event) => {
  modals.forEach((modal) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

let slideIndexMap = {};

function showSlides(n, project) {
  let slides = document.querySelectorAll(`[data-project="${project}"]`);

  if (slides.length === 0) return;

  if (!slideIndexMap[project]) slideIndexMap[project] = 0;

  if (n >= slides.length) {
    slideIndexMap[project] = 0;
  } else if (n < 0) {
    slideIndexMap[project] = slides.length - 1;
  } else {
    slideIndexMap[project] = n;
  }

  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndexMap[project]].style.display = "block";
}

function changeSlide(n, project) {
  console.log("jjjjjj: ", slideIndexMap[project] + n, project);
  showSlides(slideIndexMap[project] + n, project);
}

document.querySelectorAll("[data-project]").forEach((slide) => {
  let project = slide.getAttribute("data-project");
  if (!slideIndexMap[project]) {
    showSlides(0, project);
  }
});
