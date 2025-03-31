document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".section__contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatusContainer = document.querySelector(
    ".section__contact__form-status-container"
  );

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  contactForm.addEventListener("submit", handleFormSubmit);

  // Validation functions
  function validateName() {
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById("name-error");

    if (nameValue === "") {
      showError(nameInput, nameError, "Name is required");
      return false;
    } else if (nameValue.length < 2) {
      showError(nameInput, nameError, "Name must be at least 2 characters");
      return false;
    } else {
      clearError(nameInput, nameError);
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById("email-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      showError(emailInput, emailError, "Email is required");
      return false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailInput, emailError, "Please enter a valid email address");
      return false;
    } else {
      clearError(emailInput, emailError);
      return true;
    }
  }

  function validateMessage() {
    const messageValue = messageInput.value.trim();
    const messageError = document.getElementById("message-error");

    if (messageValue === "") {
      showError(messageInput, messageError, "Message is required");
      return false;
    } else if (messageValue.length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters"
      );
      return false;
    } else {
      clearError(messageInput, messageError);
      return true;
    }
  }

  // Helper functions for showing/clearing errors
  function showError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function clearError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  // Form submission handler
  async function handleFormSubmit(e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      showFormStatus("loading", "Sending your message...");

      try {
        const formData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        };
        // console.log({ formData });

        const response = await submitFormToBackend(formData);
        console.log({ response });

        showFormStatus("success", "Your message has been sent successfully.");
        contactForm.reset();

        setTimeout(() => {
          clearFormStatus();
        }, 5000);
      } catch (error) {
        showFormStatus(
          "error",
          "Something went wrong. Please try again later."
        );

        console.error("Form submission error:", error);
      }
    } else {
      showFormStatus(
        "error",
        "Please fix the errors in the form before submitting."
      );
    }
  }

  // Mock BE for form submission
  async function submitFormToBackend(formData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.8) {
          resolve({ success: true, message: "Form submitted successfully" });
        } else {
          reject(new Error("Server error"));
        }
      }, 1500);
    });
  }

  // Form status display functions
  function showFormStatus(type, message) {
    formStatusContainer.className = "section__contact__form-status-container";
    formStatusContainer.classList.add(`status-${type}`);
    formStatusContainer.textContent = message;
    formStatusContainer.style.display = "block";

    formStatusContainer.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  function clearFormStatus() {
    formStatusContainer.style.display = "none";
    formStatusContainer.textContent = "";
    formStatusContainer.className = "section__contact__form-status-container";
  }
});
