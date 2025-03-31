function openTab(event, tabName) {
  const tabContents = document.querySelectorAll(".section__skills-tab-content");
  tabContents.forEach((tab) => (tab.style.display = "none"));

  var tabLinks = document.querySelectorAll(".section__skills-tab-link");
  tabLinks.forEach((link) => link.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".section__skills-tab-link.active").style.display =
    "block";
});
