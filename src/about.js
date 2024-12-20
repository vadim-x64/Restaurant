const restaurantCards = document.querySelectorAll('.restaurant-card');
let lastScrollPosition = 0;
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}
function handleScrollDown() {
  restaurantCards.forEach((card) => {
    if (isElementInViewport(card)) {
      card.classList.add('active');
    }
  });
}
function handleScrollUp() {
  restaurantCards.forEach((card) => {
    if (isElementInViewport(card)) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > lastScrollPosition) {
    handleScrollDown();
  } else {
    handleScrollUp();
  }
  lastScrollPosition = currentScrollPosition;
});
window.addEventListener('load', handleScrollUp);
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTopBtn");
  backToTopBtn.addEventListener("click", function () {
    scrollToTopWithEasing();
  });
  function scrollToTopWithEasing() {
    const scrollDuration = 1500;
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
  const buttons = document.querySelectorAll(".btn-group-menu");
  const icons = document.querySelectorAll(".icon");
  buttons.forEach((button, index) => {
    button.addEventListener("mouseover", () => {
      icons[index].style.display = "inline-block";
    });
    button.addEventListener("mouseout", () => {
      icons[index].style.display = "none";
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
});
const lightbulbContainer = document.getElementById('lightbulb-container');
const lightbulb = document.getElementById('lightbulb');
const lightbulbImage = document.getElementById('lightbulb-image');
const toggleButton = document.querySelector('.hide-lightbulb-button');
const body = document.body;
const audioElement = document.getElementById('light-switch-sound');
function saveThemeState(isLightOn) {
  localStorage.setItem('isLightOn', isLightOn.toString());
}
function setInitialState() {
  const isLightOn = localStorage.getItem('isLightOn');
  if (isLightOn === 'true') {
    turnOffLight();
  } else {
    turnOnLight();
  }
}
function turnOnLight() {
  lightbulbImage.src = 'https://cdn-icons-png.freepik.com/256/11103/11103648.png?uid=R77081381&ga=GA1.1.140018474.1707206813&';
  body.classList.remove('dark-background');
  saveThemeState(false);
}
function turnOffLight() {
  lightbulbImage.src = 'https://cdn-icons-png.freepik.com/256/11056/11056934.png?uid=R77081381&ga=GA1.1.140018474.1707206813&';
  body.classList.add('dark-background');
  saveThemeState(true);
}
function toggleLightbulb() {
  const isLightOn = body.classList.contains('dark-background');
  audioElement.currentTime = 0;
  if (isLightOn) {
    turnOnLight();
  } else {
    turnOffLight();
  }
  setTimeout(() => {
    audioElement.play();
  }, 0);
}
window.addEventListener('beforeunload', () => {
  saveThemeState(body.classList.contains('dark-background'));
});
setInitialState();
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
document.addEventListener('DOMContentLoaded', setInitialState);
function liftImage(element) {
  element.classList.add('lifted');
}
function resetImage(element) {
  element.classList.remove('lifted');
}