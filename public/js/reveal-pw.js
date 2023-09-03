

// Get all elements with the class "toggle-password"
let togglePasswordElements = document.querySelectorAll(".toggle-password");

// Add a click event listener to each element
togglePasswordElements.forEach(function (element) {
  element.addEventListener("click", function () {
    // Toggle the "fa-eye" and "fa-eye-slash" classes
    if (element.classList.contains("fa-eye")) {
      element.classList.remove("fa-eye");
      element.classList.add("fa-eye-slash");
    } else {
      element.classList.remove("fa-eye-slash");
      element.classList.add("fa-eye");
    }

    // Get the input element to toggle its type
    let input = document.querySelector(element.getAttribute("toggle"));

    // Toggle the input type between "password" and "text"
    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  });
});
