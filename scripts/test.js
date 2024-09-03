document.addEventListener("DOMContentLoaded", function() {
    // Initialize Ripples.js on the ripple container
    if (typeof $.fn.ripples !== 'undefined') {
        console.log("Ripples.js is loaded successfully.");

        // Apply ripples to the ripple container
        $('.ripple-container').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
            interactive: false,
        });

        // Add ripples following the mouse
        $(document).on('mousemove', function (e) {
            $('.ripple-container').ripples('drop', e.pageX, e.pageY, 20, 0.04);
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
