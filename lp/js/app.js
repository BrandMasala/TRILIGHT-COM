$('.m-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots:false,
  arrows:false,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  speed: 500,
  fade: true,
});
$('.f-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots:true,
  arrows:true,
  autoplay: false,
  autoplaySpeed: 3000,
  cssEase: 'linear',
});
$('.tab-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots:true,
  arrows:true,
  autoplay: false,
  autoplaySpeed: 3000,
  cssEase: 'linear',
});
(function () {
  'use strict';
  var forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated');
      }, false);
  });
})();
document.getElementById('navicon').onclick = function() {
  this.classList.toggle('open');
}


// Get popup elements
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.querySelector('.close');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Track the images
const images = Array.from(document.querySelectorAll('.popup-image'));
let currentIndex = 0;

// Show popup with the selected image
function showPopup(index) {
    currentIndex = index;
    popupImg.src = images[currentIndex].src;
    popup.style.display = 'flex';
}

// Close the popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Navigate to the previous image
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around
    popupImg.src = images[currentIndex].src;
});

// Navigate to the next image
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length; // Wrap around
    popupImg.src = images[currentIndex].src;
});

// Close popup when clicking outside the image
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// Add click event to each image in the gallery
images.forEach((img, index) => {
    img.addEventListener('click', () => showPopup(index));
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
});

$("#pills-home-tab").click(function(){
  $('.tab-slider').slick('refresh');
});
$("#pills-profile-tab").click(function(){
  $('.tab-slider').slick('refresh');
});
$("#pills-contact-tab").click(function(){
  $('.tab-slider').slick('refresh');
});