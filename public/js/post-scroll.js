

function scrollToSharedPosts() {
  scrollToSection("Shared Posts");
}

function scrollBackToUserPosts() {
  scrollToSection("Your Posts");
}

function scrollToCurrentProfile() {
  scrollToSection("Your Current SFX");
}

function scrollToSection(sectionName) {
  const sections = document.querySelectorAll('.share-feed');
  
  // Loop through the sections to find the one with the matching text content
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].textContent.includes(sectionName)) {
      let sectionTop = sections[i].getBoundingClientRect().top + window.scrollY;

      // Smooth scroll to the section
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
      break; // Exit the loop once the section is found
    }
  }
}