 document.addEventListener("DOMContentLoaded", function () {
        function scrollToSection(sectionName) {
          var section = document.querySelector(`.share-feed:contains('${sectionName}')`)
          var sectionTop = section.getBoundingClientRect().top + window.scrollY

          // Smooth scroll to the section
          window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
          })
        }

        var scrollToSharedPostsBtn = document.querySelector("#scrollToShared")
        var scrollBackToUserPostsBtn = document.querySelector("#scrollBack")

        scrollToSharedPostsBtn.addEventListener("click", function (event) {
          event.preventDefault()
          scrollToSection("Shared Posts")
        })

        scrollBackToUserPostsBtn.addEventListener("click", function (event) {
          event.preventDefault()
          scrollToSection("Your Posts")
        })
      });