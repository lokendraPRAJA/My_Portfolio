document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursorFollower = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorFollower);
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
        gsap.to(cursorDot, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorFollower.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            mobileMenu.classList.add('scale-y-100', 'opacity-100');
            mobileBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        } else {
            mobileMenu.classList.remove('scale-y-100', 'opacity-100');
            mobileMenu.classList.add('scale-y-0', 'opacity-0');
            mobileBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 2. Navbar Scroll Effect (Optimized with requestAnimationFrame)
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 3. Typed.js Initialization
    new Typed('#typed-text', {
        strings: [
            'Frontend Development',
            'UI/UX Design',
            'Interactive Web Apps',
            'Creative Coding'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // 4. GSAP Animations
    
    // Hero Section Animation (Sped up for fast loading)
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-content > *', {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0
    })
    .from('.hero-image', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.floating-badge', {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.5)'
    }, '-=0.3');

    // Scroll Reveal Animations
    function animateFrom(elem, direction) {
        direction = direction || 1;
        let x = 0, y = direction * 100;
        
        if (elem.classList.contains("gs_reveal_fromLeft")) {
            x = -100;
            y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
            x = 100;
            y = 0;
        }
        
        elem.style.transform = `translate(${x}px, ${y}px)`;
        elem.style.opacity = "0";
        
        gsap.fromTo(elem, {
            x: x, 
            y: y, 
            autoAlpha: 0
        }, {
            duration: 0.5, 
            x: 0,
            y: 0, 
            autoAlpha: 1, 
            ease: "power2.out", 
            overwrite: "auto"
        });
    }

    function hide(elem) {
        gsap.set(elem, {autoAlpha: 0});
    }

    const revealElements = document.querySelectorAll(".gs_reveal");
    
    revealElements.forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view
        
        ScrollTrigger.create({
            trigger: elem,
            start: "top 85%",
            onEnter: function() { animateFrom(elem) }, 
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) } // optional: re-hide when scrolling out
        });
    });

    // 5. Magnetic Button Effect (Optimized rect caching)
    const magneticButtons = document.querySelectorAll('a.bg-gradient-to-r, button[type="submit"]');
    
    magneticButtons.forEach(btn => {
        let rect;
        btn.addEventListener('mouseenter', () => {
            rect = btn.getBoundingClientRect();
        });
        
        btn.addEventListener('mousemove', (e) => {
            if (!rect) rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            rect = null;
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // 6. Rose Petal Animation
    const petalContainer = document.createElement('div');
    petalContainer.className = 'petal-container';
    document.body.appendChild(petalContainer);

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // Random properties
        const size = Math.random() * 20 + 15;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 6 + 6;
        const delay = Math.random() * 10;
        
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${startX}px`;
        petal.style.top = `-40px`;
        
        petalContainer.appendChild(petal);
        
        // GSAP Animation for falling
        gsap.to(petal, {
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 300 - 150}`,
            rotation: Math.random() * 1080,
            rotationY: Math.random() * 720,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: () => {
                petal.remove();
                createPetal();
            }
        });
        
        // Subtle opacity fade in
        gsap.fromTo(petal, { opacity: 0 }, { opacity: 0.8, duration: 1, delay: delay });
    }

    // Initial petals (Reduced from 45 to 15 for better performance)
    for (let i = 0; i < 15; i++) {
        setTimeout(createPetal, Math.random() * 8000);
    }

    // 7. Funny Sticker Animation Logic - Refined
    const stickerOrbits = document.querySelectorAll('.sticker-orbit');
    
    const stickerSpeeds = [15, 25, 35, 50, 70, 95, 125]; 
    
    stickerOrbits.forEach((orbit, index) => {
        const sticker = orbit.querySelector('.planet-sticker');
        
        // Rotate the entire orbit div
        gsap.to(orbit, {
            rotation: 360,
            duration: stickerSpeeds[index],
            repeat: -1,
            ease: "none"
        });
        
        // Counter-rotate the sticker to keep it upright
        gsap.to(sticker, {
            rotation: -360,
            duration: stickerSpeeds[index],
            repeat: -1,
            ease: "none"
        });

        // Individual floating movement for each sticker
        gsap.to(sticker, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
    // 9. Secret Draggable Planets (Making them "Toys")
    if (window.Draggable) {
        Draggable.create(".planet-sticker", {
            bounds: ".solar-system-container",
            inertia: true,
            onDragStart: function() {
                gsap.to(this.target, { scale: 1.2, zIndex: 1000 });
            },
            onDragEnd: function() {
                gsap.to(this.target, { scale: 1 });
            }
        });
    }

    // 10. Terminal Shortcut (Press 'T' for Terminal)
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 't') {
            const cmd = prompt("CODX TERMINAL v1.0\nEnter Command: (theme-gold, theme-neon, reset)");
            if (cmd === 'theme-gold') {
                document.documentElement.style.setProperty('--primary', '#d4af37');
                alert("Gold Mode Activated");
            } else if (cmd === 'theme-neon') {
                document.documentElement.style.setProperty('--primary', '#ff0055');
                alert("Neon Mode Activated");
            } else if (cmd === 'reset') {
                location.reload();
            }
        }
    });
});

