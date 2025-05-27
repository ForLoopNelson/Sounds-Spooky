document.addEventListener('DOMContentLoaded', () => {
  // Handle Edit Button Toggle
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-postid');
      const editForm = document.querySelector(`.edit-form[data-postid="${postId}"]`);
      const caption = document.querySelector(`.add-pad[data-postid="${postId}"]`);

      if (editForm) {
        const isVisible = editForm.style.display === 'block';
        editForm.style.display = isVisible ? 'none' : 'block';
        if (caption) {
          caption.style.display = isVisible ? 'block' : 'none';
        }
      }
    });
  });

  // Handle "Liked By" Button Toggle
  const likeHeaders = document.querySelectorAll('.liked-by');

  likeHeaders.forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-postid');
      const showLikes = document.querySelector(`.likes-list[data-postid="${postId}"]`);
      

      if (showLikes) {
        const isVisible = showLikes.style.display === 'block';
        showLikes.style.display = isVisible ? 'none' : 'block';
       
      }
    });
  });
});
