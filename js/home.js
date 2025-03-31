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
