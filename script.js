let zoomLevels = {
  photo1: 1,
  photo2: 1
};

function uploadImage(photoId) {
  const fileInput = document.getElementById('fileInput');

  fileInput.click();

  fileInput.onchange = function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.getElementById(photoId);
        img.src = e.target.result;
        zoomLevels[photoId] = 1;
        img.style.transform = "scale(1)";
      };
      reader.readAsDataURL(file);
    }
  };
}

function zoom(photoId, factor) {
  zoomLevels[photoId] *= factor;
  const img = document.getElementById(photoId);
  img.style.transform = `scale(${zoomLevels[photoId]})`;
}
