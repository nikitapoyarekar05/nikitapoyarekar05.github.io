const downloadButton = document.getElementById("downloadResume");
downloadButton.addEventListener("click", () => {
  const resumePath = "nikita.pdf";
  const link = document.createElement("a");
  link.href = resumePath;
  link.download = "Nikita Poyrekar.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("Resume downloaded");
});

// modal
const detailButtons = document.querySelectorAll(
  ".section__projects-details-button"
);
const modals = document.querySelectorAll(".section__projects-details");

detailButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modals[index].style.display = "block";
    modals[index].querySelector("h3").innerText = `Project Title ${index + 1}`;
  });
});

function closeModal(modal) {
  // console.log({ modal });
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

// carousal
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
  showSlides(slideIndexMap[project] + n, project);
}

document.querySelectorAll("[data-project]").forEach((slide) => {
  let project = slide.getAttribute("data-project");
  if (!slideIndexMap[project]) {
    showSlides(0, project);
  }
});
