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