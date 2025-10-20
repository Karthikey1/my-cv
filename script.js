document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    };
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .achievement-card, .timeline-item, .skill-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        let currentLine = 0;
        const typeLine = () => {
            if (currentLine < codeLines.length) {
                const line = codeLines[currentLine];
                const text = line.textContent;
                line.textContent = '';
                line.style.opacity = '1';
                let charIndex = 0;
                const typeChar = () => {
                    if (charIndex < text.length) {
                        line.textContent += text[charIndex];
                        charIndex++;
                        setTimeout(typeChar, 50);
                    } else {
                        currentLine++;
                        setTimeout(typeLine, 500);
                    }
                };
                typeChar();
            }
        };
        setTimeout(typeLine, 1000);
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .btn { position: relative; overflow: hidden; }
        .ripple { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.3);
        transform: scale(0); animation: ripple-animation 0.6s linear; pointer-events: none; }
        @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
    `;
    document.head.appendChild(style);

    window.addEventListener('load', () => { document.body.classList.add('loaded'); });

    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body { opacity: 0; transition: opacity 0.5s ease; }
        body.loaded { opacity: 1; }
    `;
    document.head.appendChild(loadingStyle);

    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        *:focus { outline: none !important; }
        .btn:focus, .nav-link:focus, .theme-toggle:focus { outline: none !important; }
    `;
    document.head.appendChild(focusStyle);

    let ticking = false;
    const throttledScrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => { ticking = false; });
            ticking = true;
        }
    };
    window.addEventListener('scroll', throttledScrollHandler);

    const safeQuerySelector = (selector) => {
        try { return document.querySelector(selector); }
        catch (error) {
            console.warn(`Element not found: ${selector}`);
            return null;
        }
    };

    const initComponents = () => {
        console.log('Portfolio initialized successfully');
    };
    initComponents();
});
