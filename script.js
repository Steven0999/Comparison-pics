let currentZoom = {
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
        currentZoom[photoId] = 1;
        img.style.transform = "scale(1)";
      };
      reader.readAsDataURL(file);
    }
  };
}

function zoomImage(photoId, direction) {
  if (direction === 'in') {
    currentZoom[photoId] += 0.1;
  } else if (direction === 'out') {
    currentZoom[photoId] -= 0.1;
    if (currentZoom[photoId] < 0.1) currentZoom[photoId] = 0.1; // Don't zoom out too much
  }

  const img = document.getElementById(photoId);
  img.style.transform = `scale(${currentZoom[photoId]})`;
}
