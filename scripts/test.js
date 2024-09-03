document.addEventListener("DOMContentLoaded", function () {
    if (typeof $.fn.ripples !== 'undefined') {
        $('.ripple-container').ripples({
            resolution: 528, // Lower resolution for fewer, more subtle ripples
            dropRadius: 0.5,   // Smaller drop radius for more subtle ripples
            perturbance: 0.3, // Gentler ripple effect
            interactive: false,
        });

        let lastRippleTime = 0;
        const rippleDelay = 10000; // Increase delay to make ripples less frequent

        $(document).on('mousemove', function (e) {
            const currentTime = new Date().getTime();
            if (currentTime - lastRippleTime > rippleDelay) {
                $('.ripple-container').ripples('drop', e.pageX, e.pageY, 2, 0.02);
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
            if (container.scrollLeft <= 0) {
                // Scroll to the last section (Section 4)
                container.scrollLeft = container.scrollWidth - container.clientWidth;
            } else if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                // Scroll to the first section (Section 1)
                container.scrollLeft = 0;
            }
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
});
