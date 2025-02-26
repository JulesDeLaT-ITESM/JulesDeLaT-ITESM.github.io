document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (mainNav.classList.contains('active')) {
                    icon.className = 'fas fa-times'; // X icon when menu is open
                } else {
                    icon.className = 'fas fa-bars'; // Bars icon when menu is closed
                }
            }
        });
        
        // Close menu when a nav item is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('nav a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100, // Adjusted for more space
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            const navigationLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (navigationLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                navigationLink.classList.add('active');
            }
        });
    });
    
    // Initialize smooth scroll behavior for all scrollable containers
    document.querySelectorAll('.publications-content').forEach(container => {
        container.addEventListener('wheel', function(e) {
            // Prevent scrolling beyond boundaries
            const atTop = this.scrollTop === 0 && e.deltaY < 0;
            const atBottom = this.scrollHeight - this.clientHeight - this.scrollTop <= 1 && e.deltaY > 0;
            
            if (atTop || atBottom) {
                // Allow the parent page to scroll when we're at the top or bottom
                e.preventDefault();
            }
        }, { passive: false });
    });
});
