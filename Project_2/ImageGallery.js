let currentImgIndex = 0;
let images = [];

function openLightbox(imgElement) {
  images = Array.from(document.querySelectorAll('.gallery img')).filter(img => img.style.display !== "none");
  currentImgIndex = images.indexOf(imgElement);
  document.getElementById('lightboxImg').src = imgElement.src;
  document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function nextImage() {
  currentImgIndex = (currentImgIndex + 1) % images.length;
  document.getElementById('lightboxImg').src = images[currentImgIndex].src;
}

function prevImage() {
  currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
  document.getElementById('lightboxImg').src = images[currentImgIndex].src;
}

function filterGallery(category) {
  const allImages = document.querySelectorAll('.gallery img');
  allImages.forEach(img => {
    if (category === 'all' || img.dataset.category === category) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
}

