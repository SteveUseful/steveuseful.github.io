document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionalities
    initializeRipples();
    initializeHorizontalScroll();

    const introVideo = document.getElementById('intro-video');

    // Handle video end to load the main content
    introVideo.addEventListener('ended', loadMainContent);

    function loadMainContent() {
        // Fade out the video container and redirect to the main content page
        $('.intro-video-container').fadeOut(500, function () {
            window.location.href = 'main.html';
        });
    }

    // Ripple effect functionality
    function initializeRipples() {
        if (typeof $.fn.ripples !== 'undefined') {
            $('.ripple-container').ripples({
                resolution: 256,
                dropRadius: 5,
                perturbance: 0.04,
                interactive: false,
            });

            let lastRippleTime = 0;
            const rippleDelay = 500;

            $(document).on('mousemove', function (e) {
                const currentTime = new Date().getTime();
                if (currentTime - lastRippleTime > rippleDelay) {
                    $('.ripple-container').ripples('drop', e.pageX, e.pageY, 10, 0.04);
                    lastRippleTime = currentTime;
                }
            });
        } else {
            console.error("Ripples.js is not loaded correctly.");
        }
    }

    // Horizontal scroll functionality with snapping and carousel effect
    function initializeHorizontalScroll() {
        const container = document.querySelector('.horizontal-scroll-container');
        if (!container) {
            console.warn("Horizontal scroll container not found.");
            return;
        }

        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.classList.add('active');
        });

        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
            snapToSection(container);
            setTimeout(() => handleCarouselEffect(container), 300);
        });

        container.addEventListener('touchend', () => {
            isDown = false;
            snapToSection(container);
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        window.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });

        function snapToSection(container) {
            const sections = container.querySelectorAll('.scroll-section');
            const scrollPosition = container.scrollLeft + container.clientWidth / 2;

            let closestSection = null;
            let minDistance = Infinity;

            sections.forEach(section => {
                const sectionPosition = section.offsetLeft;
                const distance = Math.abs(scrollPosition - sectionPosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });

            if (closestSection) {
                container.scrollTo({
                    left: closestSection.offsetLeft,
                    behavior: 'smooth',
                });
            }
        }

        function handleCarouselEffect(container) {
            const containerWidth = container.clientWidth;
            const totalScrollWidth = container.scrollWidth;
            const scrollPosition = container.scrollLeft;

            if (scrollPosition <= 0) {
                container.scrollTo({
                    left: totalScrollWidth - containerWidth,
                    behavior: 'smooth',
                });
            }

            if (scrollPosition + containerWidth >= totalScrollWidth) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            }
        }
    }

    
});

document.addEventListener("DOMContentLoaded", function () {
    const blogsVideo = document.getElementById("blogs-video");
    const blogCardContainer = document.getElementById("blog-card-container");

    if (blogsVideo) {
        blogsVideo.addEventListener("ended", function () {
            // Show the card container when the video ends
            blogCardContainer.classList.add("visible");
        });
    }
});

