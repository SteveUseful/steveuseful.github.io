document.addEventListener("DOMContentLoaded", function () {
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

    // Horizontal Scroll Functionality with Carousel Effect and Snap Scrolling
    const container = document.querySelector('.horizontal-scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (container) {
        // Mouse down event to start dragging
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            container.classList.add('active');
        });

        // Mouse leave event to stop dragging
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });

        // Mouse up event to stop dragging and handle snapping
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');

            // Handle snapping to the nearest section
            snapToSection(container);

            // Check for carousel effect
            setTimeout(() => {
                handleCarouselEffect(container);
            }, 300); // Delay to ensure snapping completes first
        });

        // Mouse move event to handle dragging
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scrolling speed
            container.scrollLeft = scrollLeft - walk;
        });

        // Ensure the drag state is reset if the mouse leaves the window
        window.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
    }

    // Function to snap to the nearest section
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
                behavior: 'smooth'
            });
        }
    }

    // Function to handle the carousel effect
    function handleCarouselEffect(container) {
        const containerWidth = container.clientWidth;
        const totalScrollWidth = container.scrollWidth;
        const scrollPosition = container.scrollLeft;

        // If at the start of Section 1 and scrolling left, jump to Section 4
        if (scrollPosition <= 0) {
            container.scrollTo({
                left: totalScrollWidth - containerWidth,
                behavior: 'smooth'
            });
        }

        // If at the end of Section 4 and scrolling right, jump to Section 1
        if (scrollPosition + containerWidth >= totalScrollWidth) {
            container.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }
});
