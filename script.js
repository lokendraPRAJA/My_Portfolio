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

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
    
    // Hero Section Animation
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
    })
    .from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.floating-badge', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.5');

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
            duration: 1.25, 
            x: 0,
            y: 0, 
            autoAlpha: 1, 
            ease: "expo", 
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

    // 5. Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('a.bg-gradient-to-r, button[type="submit"]');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
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

    // Initial petals
    for (let i = 0; i < 45; i++) {
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

