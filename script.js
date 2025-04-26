const zoomLevels = {
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
        document.getElementById(photoId).src = e.target.result;
        zoomLevels[photoId] = 1; // Reset zoom when new photo loaded
        document.getElementById(photoId).style.transform = "scale(1)";
      };
      reader.readAsDataURL(file);
    }
  };
}

function zoom(photoId, factor) {
  zoomLevels[photoId] += factor;
  if (zoomLevels[photoId] < 0.1) zoomLevels[photoId] = 0.1; // minimum zoom

  const img = document.getElementById(photoId);
  img.style.transform = `scale(${zoomLevels[photoId]})`;
}
