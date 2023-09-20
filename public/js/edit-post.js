

document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to all "Edit" buttons
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-postid');
      const editForm = document.querySelector(`.edit-form[data-postid="${postId}"]`);
      const caption = document.querySelector(`.add-pad[data-postid="${postId}"]`);
      userId = editForm.getAttribute('data-userid'); // Retrieve userId

      if (editForm) {
        if (editForm.style.display === 'block') {
          // If the edit form is currently open, close it
          editForm.style.display = 'none';
          if (caption) {
            caption.style.display = 'block'; // Show caption
          }
        } else {
          // If the edit form is currently closed, open it
          editForm.style.display = 'block';
          if (caption) {
            caption.style.display = 'none'; // Hide caption
          }
        }
      }
    });
  });
});
