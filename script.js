document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('i');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // ===================================
    // === Lógica del Typewriter ===
    // ===================================
    const typewriterText = document.getElementById('typewriter-text');
    const phrases = [
        "Estudiante de Ingeniería de Sistemas Computacionales.",
        "Con visión de convertirse en el mejor PROGRAMADOR de todos. 🚀",
        "Especializado en HTML, CSS, JS y Bootstrap.",
        "Aprendiendo React y desarrollo frontend moderno."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; 
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; 
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; 
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    setTimeout(typeWriter, 2000); 

    // ===================================
    // === Lógica de Smooth Scroll ===
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            const targetId = (href === '#') ? 'home' : href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // ===================================
    // === Lógica del Dark Mode ===
    // ===================================
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const userSavedTheme = localStorage.getItem('theme');

    if (userSavedTheme) {
        applyTheme(userSavedTheme);
    } else {
        applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
    });
    
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // === NOTA: Se ha eliminado la lógica del formulario de contacto ===
    
    // =======================================
    // === Lógica del Scroll Reveal (IntersectionObserver) ===
    // =======================================
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});