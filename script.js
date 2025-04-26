function uploadImage(photoId) {
  const fileInput = document.getElementById('fileInput');

  fileInput.click(); // Open file selector

  fileInput.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById(photoId).src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
}
