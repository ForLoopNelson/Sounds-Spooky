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

  // Add an event listener to all edit forms
  const editForms = document.querySelectorAll('.edit-form');
  editForms.forEach(form => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const postId = form.getAttribute('data-postid');
      const editedCaption = form.querySelector('textarea[name="editedCaption"]').value;

      // Send an AJAX request to update the caption
      try {
        const response = await fetch(`/post/${postId}`, { // Change the URL to /editCaption
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, editedCaption }), // Include postId in the request body
        });

        if (response.ok) {
          // Update the displayed caption
          caption.textContent = editedCaption;

          // Hide the edit form
          form.style.display = 'none';
          caption.style.display = 'block';
        } else {
          console.error('Failed to update caption');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
});
