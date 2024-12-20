document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");
  backToTopBtn.addEventListener("click", scrollToTopWithEasing);
  function scrollToTopWithEasing() {
    const scrollDuration = 1000;
    const startTime = performance.now();
    const startScrollTop = document.documentElement.scrollTop;
    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const scrollProgress = Math.min(currentTime / scrollDuration, 1);
      const easeInOutProgress = easeInOutQuad(scrollProgress);
      window.scrollTo(0, startScrollTop * (1 - easeInOutProgress));
      if (currentTime < scrollDuration) {
        requestAnimationFrame(scrollStep);
      }
    }
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    requestAnimationFrame(scrollStep);
  }
  window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });
  const categoryLinks = document.querySelectorAll('a[data-category]');
  categoryLinks.forEach(function (categoryLink) {
    categoryLink.addEventListener("click", function (e) {
      e.preventDefault();
      const categoryName = categoryLink.getAttribute('data-category');
      sessionStorage.setItem("selectedCategory", categoryName);
      const categoryTitle = categoryLink.querySelector(".category-name");
      categoryTitle.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      window.location.href = "src/products.html";
    });
  });
  const menuTitle = document.getElementById("menuTitle");
  const textToType = "WELCOME!";
  function typeText() {
    let index = 0;
    const interval = 300;
    const typingInterval = setInterval(() => {
      if (index <= textToType.length) {
        menuTitle.innerHTML = textToType.slice(0, index) + '<span class="cursor">|</span>';
        index++;
      } else {
        clearInterval(typingInterval);
        menuTitle.style.height = "auto";
        menuTitle.innerHTML = textToType + '<span class="cursor">|</span>';
      }
    }, interval);
  }
  window.addEventListener("load", () => {
    setTimeout(() => {
      typeText();
    }, 1000);
  });
});
$(document).ready(function () {
  $(".btn-group-menu").hover(function () {
    $(this).find(".menu-text").css("opacity", 0);
    $(this).find(".menu-icon").css("opacity", 1);
  }, function () {
    $(this).find(".menu-text").css("opacity", 1);
    $(this).find(".menu-icon").css("opacity", 0);
  });
});
const lightbulbContainer = document.getElementById('lightbulb-container');
const lightbulb = document.getElementById('lightbulb');
const lightbulbImage = document.getElementById('lightbulb-image');
const toggleButton = document.querySelector('.hide-lightbulb-button');
const body = document.body;
function setInitialState() {
  const isLightOn = localStorage.getItem('isLightOn');
  if (isLightOn === 'true') {
    lightbulbImage.src = 'img/light-off.png';
    body.classList.add('dark-background');
  } else {
    lightbulbImage.src = 'img/light-on.png';
    body.classList.remove('dark-background');
  }
}
document.addEventListener('DOMContentLoaded', setInitialState);
const audioElement = document.getElementById('light-switch-sound');
function toggleLightbulb() {
  const isLightOn = body.classList.contains('dark-background');
  audioElement.currentTime = 0;
  if (isLightOn) {
    lightbulbImage.src = 'img/light-on.png';
    body.classList.remove('dark-background');
    localStorage.setItem('isLightOn', 'false');
  } else {
    lightbulbImage.src = 'img/light-off.png';
    body.classList.add('dark-background');
    localStorage.setItem('isLightOn', 'true');
  }
  setTimeout(() => {
    audioElement.play();
  }, 0);
}
lightbulbContainer.addEventListener('mouseenter', () => {
  lightbulbContainer.classList.add('show-lightbulb');
});
lightbulbContainer.addEventListener('mouseleave', () => {
  lightbulbContainer.classList.remove('show-lightbulb');
});
lightbulb.addEventListener('click', toggleLightbulb);
toggleButton.addEventListener('click', () => {
  lightbulbContainer.classList.remove('show-lightbulb');
});