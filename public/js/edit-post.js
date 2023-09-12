// <!-- WIP@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->



document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to all "Edit" buttons
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-postid');
       const caption = document.querySelector(`.add-pad[data-postid="${postId}"]`);
      const editForm = document.querySelector(`.edit-form[data-postid="${postId}"]`);
      userId = editForm.getAttribute('data-userid'); // Retrieve userId
      

      if (caption) {
        caption.style.display = 'none';
      }
      if (editForm) {
        editForm.style.display = 'block';
      }
    });
  });

    });
