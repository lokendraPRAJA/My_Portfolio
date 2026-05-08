// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
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

    // 5. Particles.js Environment
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 120,
              "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": "#ef4444" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": {
              "enable": true,
              "distance": 130,
              "color": "#3b82f6",
              "opacity": 0.2,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
            }
          },
          "interactivity": {
            "detect_on": "window",
            "events": {
              "onhover": { "enable": true, "mode": "grab" },
              "onclick": { "enable": true, "mode": "push" },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": { "opacity": 0.8 }
              },
              "push": { "particles_nb": 4 }
            }
          },
          "retina_detect": true
        });
    }

});
