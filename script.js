let zoomLevels = {
  photo1: 1,
  photo2: 1
};

let position = {
  photo1: { x: 0, y: 0 },
  photo2: { x: 0, y: 0 }
};

let isDragging = false;
let dragStart = { x: 0, y: 0 };
let currentPhoto = null;

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
        position[photoId] = { x: 0, y: 0 };
        updateTransform(photoId);
      };
      reader.readAsDataURL(file);
    }
  };
}

function zoom(photoId, factor) {
  zoomLevels[photoId] *= factor;
  updateTransform(photoId);
}

function updateTransform(photoId) {
  const img = document.getElementById(photoId);
  const pos = position[photoId];
  const zoom = zoomLevels[photoId];
  img.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`;
}

// Dragging
document.querySelectorAll('.image-container').forEach(container => {
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentPhoto = container.querySelector('img').id;
    dragStart.x = e.clientX - position[currentPhoto].x;
    dragStart.y = e.clientY - position[currentPhoto].y;
    container.style.cursor = "grabbing";
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    position[currentPhoto].x = e.clientX - dragStart.x;
    position[currentPhoto].y = e.clientY - dragStart.y;
    updateTransform(currentPhoto);
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = "grab";
  });

  container.addEventListener('mouseleave', () => {
    isDragging = false;
    container.style.cursor = "grab";
  });
});
