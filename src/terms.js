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
});