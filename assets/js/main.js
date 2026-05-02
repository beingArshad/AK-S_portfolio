/**
 * Main JavaScript for Futuristic Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // PAGE LOADER
    // ========================================
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000); // 1s mock load time

    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, .glass-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '70px';
                cursorOutline.style.height = '70px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // ========================================
    // NAVBAR & HAMBURGER MENU
    // ========================================
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // TYPOGRAPHY ANIMATION (HERO)
    // ========================================
    const typingText = document.querySelector('.typing-text');
    const words = ['Full Stack Trainee', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1500);

    // ========================================
    // 3D HERO ELEMENT (THREE.JS)
    // ========================================
    const threeContainer = document.getElementById('three-js-container');
    if (threeContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeContainer.appendChild(renderer.domElement);
        
        // Create Geometry
        const geometry = new THREE.IcosahedronGeometry(2, 1);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00f0ff, 
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        camera.position.z = 5;
        
        // Responsive
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        function animateThree() {
            requestAnimationFrame(animateThree);
            sphere.rotation.x += 0.003;
            sphere.rotation.y += 0.005;
            
            // Subtle floating motion
            sphere.position.y = Math.sin(Date.now() * 0.001) * 0.2;
            
            // Update color based on theme
            const theme = document.documentElement.getAttribute('data-theme');
            let themeColor;
            switch(theme) {
                case 'purple': themeColor = 0xbd00ff; break;
                case 'green': themeColor = 0x00ff88; break;
                case 'orange': themeColor = 0xff8800; break;
                default: themeColor = 0x00f0ff;
            }
            sphere.material.color.setHex(themeColor);
            
            renderer.render(scene, camera);
        }
        
        animateThree();
    }

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                


                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });



    // ========================================
    // 3D TILT EFFECT FOR PROJECT CARDS
    // ========================================
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = ((y - centerY) / centerY) * -10; // Max tilt deg
                const tiltY = ((x - centerX) / centerX) * 10;
                
                el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                el.style.transition = 'transform 0.5s ease';
            });
            
            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });
    }

    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Mock submission delay
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
                btn.style.background = 'linear-gradient(45deg, #00ff88, #00f0ff)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // ========================================
    // PARTICLE BACKGROUND (CANVAS)
    // ========================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let numParticles = window.innerWidth < 768 ? 40 : 80;

        // Resize canvas
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-initialize particles on resize to prevent them grouping
            initParticles();
        }

        // Particle Object
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.updateColor();
            }

            updateColor() {
                const theme = document.documentElement.getAttribute('data-theme') || 'cyan';
                let color1, color2;
                
                switch(theme) {
                    case 'purple': color1 = 'rgba(189, 0, 255, 0.5)'; color2 = 'rgba(255, 0, 127, 0.5)'; break;
                    case 'green': color1 = 'rgba(0, 255, 136, 0.5)'; color2 = 'rgba(0, 240, 255, 0.5)'; break;
                    case 'orange': color1 = 'rgba(255, 136, 0, 0.5)'; color2 = 'rgba(255, 0, 127, 0.5)'; break;
                    default: color1 = 'rgba(0, 240, 255, 0.5)'; color2 = 'rgba(189, 0, 255, 0.5)';
                }
                
                this.color = Math.random() > 0.5 ? color1 : color2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            numParticles = window.innerWidth < 768 ? 40 : 80;
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        // Connect nearby particles with lines
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.1})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Mouse interaction for particles
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Add repulse effect on mouse move
        function interactWithMouse() {
            if (mouse.x != null && mouse.y != null) {
                for (let i = 0; i < particlesArray.length; i++) {
                    let dx = mouse.x - particlesArray[i].x;
                    let dy = mouse.y - particlesArray[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (100 - distance) / 100;
                        const movementX = forceDirectionX * force * 5;
                        const movementY = forceDirectionY * force * 5;
                        
                        particlesArray[i].x -= movementX;
                        particlesArray[i].y -= movementY;
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            interactWithMouse();
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', setCanvasSize);
        
        // Initial call
        setCanvasSize();
        animateParticles();

        // Global function to update particle colors on theme change
        window.updateParticleColors = function() {
            particlesArray.forEach(p => p.updateColor());
        };
    }
});
