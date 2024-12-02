document.addEventListener("DOMContentLoaded", () => {
    console.log("About page loaded!");

    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            sidebarToggle.style.left = '20px';
            mainContent.style.marginLeft = '60px';
        } else {
            sidebarToggle.style.left = '240px';
            mainContent.style.marginLeft = '240px';
        }
    });

    // Smooth scrolling for sidebar links
    document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover animations to the sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#ffcc00';
            link.style.transition = 'color 0.3s ease';
        });
        link.addEventListener('mouseleave', () => {
            link.style.color = '#ffffff';
        });
    });

    // Card glow effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = "0 0 20px #6a0dad";
            card.style.transition = 'box-shadow 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.3)";
        });
    });

    // Fade-in effect for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Header background gradient animation
    const header = document.querySelector('.portfolio-header');
    let gradientAngle = 0;

    setInterval(() => {
        gradientAngle += 1;
        header.style.background = `linear-gradient(${gradientAngle}deg, #ff7eb3, #a67bff, #7c4dff)`;
    }, 50);

    // **Main content gradient animation**
    const mainContentBackground = document.querySelector('.main-content');
    let mainGradientAngle = 0;

    setInterval(() => {
        mainGradientAngle += 1;
        mainContentBackground.style.background = `linear-gradient(${mainGradientAngle}deg, #301934, #6a0dad, #3d1b5c)`;
    }, 50);

    // Scroll-to-top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.textContent = "↑";
    scrollToTopButton.style.position = 'fixed';
    scrollToTopButton.style.bottom = '20px';
    scrollToTopButton.style.right = '20px';
    scrollToTopButton.style.background = '#7c4dff';
    scrollToTopButton.style.color = '#ffffff';
    scrollToTopButton.style.border = 'none';
    scrollToTopButton.style.borderRadius = '50%';
    scrollToTopButton.style.width = '50px';
    scrollToTopButton.style.height = '50px';
    scrollToTopButton.style.cursor = 'pointer';
    scrollToTopButton.style.display = 'none';
    scrollToTopButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
