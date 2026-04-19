// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCols = document.querySelectorAll('[data-category="project"].col-lg-4');
    const certCols = document.querySelectorAll('[data-category="certificate"].col-lg-4');
    const techStackCols = document.querySelectorAll('[data-category="techstack"].col-lg-3');

    // Function to filter cards with animation
    function filterCards(filterValue) {
        // Get all visible elements to animate out
        const allCols = [...projectCols, ...certCols, ...techStackCols];
        const visibleCols = allCols.filter(col => !col.classList.contains('d-none'));

        // Fade out current items
        visibleCols.forEach(col => {
            col.style.opacity = '0';
            col.style.transform = 'translateY(20px)';
            col.style.transition = 'all 0.3s ease';
        });

        // After fade out, hide all and show selected category
        setTimeout(() => {
            // Hide all
            projectCols.forEach(col => {
                col.classList.add('d-none');
                col.style.opacity = '0';
                col.style.transform = 'translateY(20px)';
            });
            certCols.forEach(col => {
                col.classList.add('d-none');
                col.style.opacity = '0';
                col.style.transform = 'translateY(20px)';
            });
            techStackCols.forEach(col => {
                col.classList.add('d-none');
                col.style.opacity = '0';
                col.style.transform = 'translateY(20px)';
            });

            // Show selected category
            setTimeout(() => {
                let targetCols;
                if (filterValue === 'project') {
                    targetCols = projectCols;
                } else if (filterValue === 'certificate') {
                    targetCols = certCols;
                } else if (filterValue === 'techstack') {
                    targetCols = techStackCols;
                }

                if (targetCols) {
                    targetCols.forEach(col => col.classList.remove('d-none'));

                    // Trigger reflow
                    targetCols[0].offsetHeight;

                    // Fade in with staggered animation
                    targetCols.forEach((col, index) => {
                        setTimeout(() => {
                            col.style.opacity = '1';
                            col.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                }
            }, 50);
        }, 300);
    }

    // Initialize filter on page load
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        // Set initial state without animation
        projectCols.forEach(col => {
            col.classList.remove('d-none');
            col.style.opacity = '1';
            col.style.transform = 'translateY(0)';
        });
        certCols.forEach(col => {
            col.classList.add('d-none');
            col.style.opacity = '0';
        });
        techStackCols.forEach(col => {
            col.classList.add('d-none');
            col.style.opacity = '0';
        });
    }

    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterCards(this.getAttribute('data-filter'));
        });
    });

    // Portfolio card click handler
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('a')) return;
            console.log('Card clicked:', this.querySelector('h4')?.textContent);
        });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // TODO: Replace with actual form submission logic
            alert(`Thank you for your message, ${formData.name}! I will get back to you soon.`);
            console.log('Form submitted:', formData);

            contactForm.reset();
        });

        // Input focus effects
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
            input.addEventListener('blur', () => {
                if (!input.value) input.parentElement.classList.remove('focused');
            });
        });
    }
});

// Scroll to top on page refresh
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});
