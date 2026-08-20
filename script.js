document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('i');
    const navbar = document.querySelector('.site-navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const typewriterText = document.getElementById('typewriter-text');

    const phrases = [
        'Desarrollo interfaces web responsivas con HTML, CSS, JavaScript y Bootstrap.',
        'Aplico una visi\u00f3n de sistemas para crear experiencias web claras y funcionales.',
        'Actualmente profundizo en React, componentes reutilizables y consumo de APIs.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex -= 1;
            typingSpeed = 35;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex += 1;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1600;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        window.setTimeout(typeWriter, typingSpeed);
    }

    window.setTimeout(typeWriter, 700);

    document.querySelectorAll('.nav-link, .navbar-brand').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            if (!href || !href.startsWith('#')) {
                return;
            }

            const targetElement = document.querySelector(href);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    const applyTheme = (theme) => {
        const isDark = theme === 'dark';

        body.classList.toggle('dark', isDark);
        toggleIcon.classList.toggle('fa-sun', isDark);
        toggleIcon.classList.toggle('fa-moon', !isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    applyTheme(savedTheme || (systemPrefersDark.matches ? 'dark' : 'light'));

    darkModeToggle.addEventListener('click', () => {
        applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
    });

    systemPrefersDark.addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    const projectFilters = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');
    const projectList = document.querySelector('.project-list');

    projectFilters.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            const selectedFilter = filterButton.dataset.filter;

            projectFilters.forEach((button) => {
                button.classList.toggle('active', button === filterButton);
            });

            projectItems.forEach((item) => {
                const shouldShow = selectedFilter === 'all' || item.dataset.category === selectedFilter;
                item.classList.toggle('is-hidden', !shouldShow);
            });

            if (projectList) {
                projectList.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => observer.observe(element));
});
