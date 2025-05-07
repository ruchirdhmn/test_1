const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadForm = document.getElementById('uploadForm');
const predictionLabel = document.getElementById('predictionLabel');
const resultDiv = document.querySelector('.result');
const ratingSection = document.querySelector('.rating-section');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Preview the image
imageInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.setAttribute('src', e.target.result);
      imagePreview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  }
});

// Live rating value update
ratingSlider.addEventListener('input', function() {
  ratingValue.textContent = this.value;
});

// Submit and fetch classification
uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(uploadForm);

  fetch('/predict', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    predictionLabel.textContent = data.label;
    resultDiv.style.display = 'block';
    ratingSection.style.display = 'block';
  })
  .catch(err => alert("Error: " + err));
});