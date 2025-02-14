new Vue({
    el: '#app',
    data: {
        name: '',
        jobTitle: '',
        jobDescription: '',
        skills: [],
        works: [],
        education: [],
        experience: [],
        hobbies: [],
        contacts: {}
    },
    created() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.name = data.name;
                this.jobTitle = data.jobTitle;
                this.jobDescription = data.jobDescription;
                this.skills = data.skills;
                this.works = data.works;
                this.education = data.education;
                this.experience = data.experience;
                this.hobbies = data.hobbies;
                this.contacts = data.contacts;
            });
    }
});

// Ek Animasyonlar ve Efektler
document.addEventListener('DOMContentLoaded', () => {
    // Scroll animasyonları için Intersection Observer
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-section');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Typing effect for header
    const headerName = document.querySelector('.header__name');
    if (headerName) {
        const text = headerName.textContent;
        headerName.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headerName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }

    // Add glitch effect to skill bars on hover
    const skillBars = document.querySelectorAll('.skill__progress-bar');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseover', () => {
            bar.style.animation = 'glitch 0.3s infinite';
        });
        bar.addEventListener('mouseout', () => {
            bar.style.animation = 'none';
        });
    });

    // Matrix Rain Effect
    createMatrixRain();
    addProfessionalEffects();
    createGlitchText();
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    initializeNavbar();
    initializeInteractiveEffects();
});

// Update the Matrix Rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('matrix-effect');
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    
    // Cyberpunk characters (no Japanese)
    const chars = '10ABCDEF!@#$%^&*()_+-=[]{}|;:,./<>?~GHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set the text style
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        
        // Draw the characters
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Random color variations between cyan and pink
            const hue = Math.random() < 0.1 ? 320 : 160; // Occasionally pink
            const alpha = Math.random() * 0.5 + 0.5;
            ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
            
            // Draw the character
            ctx.fillText(text, x, y);
            
            // Reset drop when it reaches bottom
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Run the animation
    let animationFrame;
    function animate() {
        draw();
        animationFrame = requestAnimationFrame(animate);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        // Reset drops array for new width
        const newColumns = canvas.width / fontSize;
        drops.length = Math.floor(newColumns);
        for (let i = 0; i < drops.length; i++) {
            if (drops[i] === undefined) drops[i] = 1;
        }
    });
    
    // Cleanup function
    return () => {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
    };
}

// Add professional hover effects
function addProfessionalEffects() {
    const cards = document.querySelectorAll('.project-card, .experience-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${angleX}deg)
                rotateY(${angleY}deg)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Glitch text effect
function createGlitchText() {
    const glitchTexts = document.querySelectorAll('.section__title');
    
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
        
        setInterval(() => {
            if (Math.random() < 0.1) {
                text.style.textShadow = `
                    ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 30}px rgba(0, 255, 217, 0.8),
                    ${Math.random() * -10}px ${Math.random() * 10}px ${Math.random() * 30}px rgba(255, 0, 255, 0.8)
                `;
                
                setTimeout(() => {
                    text.style.textShadow = '';
                }, 50);
            }
        }, 2000);
    });
}

function initializeNavbar() {
    const toggle = document.querySelector('.navbar__toggle');
    const nav = document.querySelector('.navbar__list');
    const navLinks = document.querySelectorAll('.navbar__link');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// Add these new interactive effects
function initializeInteractiveEffects() {
    // Parallax effect for sections
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const speed = 0.5;
            const rect = section.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const yPos = -(scrolled * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.project-card, .experience-card, .education-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Add glow effect
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
            
            card.style.background = `
                radial-gradient(
                    circle at ${glowX}% ${glowY}%,
                    rgba(0, 255, 217, 0.1) 0%,
                    rgba(15, 15, 15, 0.95) 50%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.background = 'rgba(15, 15, 15, 0.8)';
            card.style.transition = 'all 0.5s ease';
        });
    });

    // Skill bar animation on scroll
    const skills = document.querySelectorAll('.skill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill__progress');
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)';
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => skillObserver.observe(skill));

    // Cyberpunk cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'cyber-cursor';
    document.body.appendChild(cursor);

    let cursorTimeout;
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            cursor.style.display = 'none';
        }, 2000);
    });

    // Enhanced section title effects
    const titles = document.querySelectorAll('.section__title');
    titles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.style.animation = 'glitchText 0.3s infinite';
            title.style.textShadow = `
                0 0 10px var(--highlight),
                0 0 20px var(--highlight),
                0 0 40px var(--highlight)
            `;
        });
        
        title.addEventListener('mouseout', () => {
            title.style.animation = '';
            title.style.textShadow = '';
        });
    });

    // Glitch effect on images/links hover
    const interactiveElements = document.querySelectorAll('a, img');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            const glitch = createGlitchOverlay(element);
            element.parentNode.appendChild(glitch);
        });
        
        element.addEventListener('mouseout', () => {
            const glitch = element.parentNode.querySelector('.glitch-overlay');
            if (glitch) glitch.remove();
        });
    });

    // Scanline effect
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.body.appendChild(scanline);

    // Typing effect for project descriptions
    const projectDescriptions = document.querySelectorAll('.project__description');
    const descriptionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typewriterEffect(entry.target);
            }
        });
    }, { threshold: 0.5 });

    projectDescriptions.forEach(desc => descriptionObserver.observe(desc));

    // Neon flicker effect for section titles
    const sectionTitles = document.querySelectorAll('.section__title');
    sectionTitles.forEach(title => {
        setInterval(() => {
            if (Math.random() < 0.1) {
                title.style.opacity = Math.random() * 0.5 + 0.5;
                setTimeout(() => {
                    title.style.opacity = 1;
                }, 50);
            }
        }, 3000);
    });

    // Data corruption effect on scroll
    let lastScrollPosition = window.pageYOffset;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const scrollDelta = Math.abs(currentScroll - lastScrollPosition);
        
        if (scrollDelta > 50) {
            createDataCorruption();
        }
        lastScrollPosition = currentScroll;
    });

    // Enhanced header effects
    const headerContent = document.querySelector('.header-section .content');
    if (headerContent) {
        headerContent.addEventListener('mousemove', (e) => {
            const rect = headerContent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate the distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle tilt effect
            const tiltX = (y - centerY) / 50;
            const tiltY = (centerX - x) / 50;
            
            headerContent.style.transform = `
                perspective(1000px)
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                translateY(-5px)
            `;
            
            // Dynamic shadow based on mouse position
            const shadowX = (x - centerX) / 50;
            const shadowY = (y - centerY) / 50;
            headerContent.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3),
                0 0 30px rgba(0, 255, 217, 0.1)
            `;
        });
        
        headerContent.addEventListener('mouseleave', () => {
            headerContent.style.transform = 'none';
            headerContent.style.boxShadow = 'none';
            headerContent.style.transition = 'all 0.5s ease';
        });
    }
}

// Helper functions for new effects
function createGlitchOverlay(element) {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = 'glitch-overlay';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.top = rect.top + 'px';
    return overlay;
}

function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--highlight)';
    
    let i = 0;
    const type = () => {
        if (i < text.length) {
            if (Math.random() < 0.1) {
                // Simulate typing error
                const wrongChar = String.fromCharCode(Math.random() * 26 + 97);
                element.textContent += wrongChar;
                setTimeout(() => {
                    element.textContent = element.textContent.slice(0, -1) + text.charAt(i);
                    i++;
                    setTimeout(type, Math.random() * 100 + 50);
                }, 150);
            } else {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, Math.random() * 100 + 50);
            }
        } else {
            element.style.borderRight = 'none';
        }
    };
    setTimeout(type, 500);
}

function createDataCorruption() {
    const corruption = document.createElement('div');
    corruption.className = 'data-corruption';
    corruption.style.left = Math.random() * window.innerWidth + 'px';
    corruption.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(corruption);
    
    setTimeout(() => corruption.remove(), 500);
}

// Add these new styles
const additionalStyles = `
    .glitch-overlay {
        position: fixed;
        pointer-events: none;
        background: rgba(0, 255, 217, 0.1);
        mix-blend-mode: screen;
        animation: glitchAnimation 0.3s infinite;
        z-index: 9998;
    }

    .scanline {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(0, 255, 217, 0.1);
        opacity: 0.75;
        animation: scanline 6s linear infinite;
        pointer-events: none;
        z-index: 9997;
    }

    .data-corruption {
        position: fixed;
        width: 100px;
        height: 20px;
        background: var(--highlight);
        opacity: 0.5;
        mix-blend-mode: screen;
        transform: skew(-45deg);
        pointer-events: none;
        z-index: 9996;
        animation: corruptionAnim 0.5s linear;
    }

    @keyframes scanline {
        0% {
            transform: translateY(-100vh);
        }
        100% {
            transform: translateY(100vh);
        }
    }

    @keyframes glitchAnimation {
        0% {
            transform: translate(0);
            opacity: 0.5;
        }
        20% {
            transform: translate(-2px, 2px);
            opacity: 0.75;
        }
        40% {
            transform: translate(-2px, -2px);
            opacity: 0.5;
        }
        60% {
            transform: translate(2px, 2px);
            opacity: 0.75;
        }
        80% {
            transform: translate(2px, -2px);
            opacity: 0.5;
        }
        100% {
            transform: translate(0);
            opacity: 0.75;
        }
    }

    @keyframes corruptionAnim {
        0% {
            opacity: 0.5;
            transform: translateX(-100%) skew(-45deg);
        }
        100% {
            opacity: 0;
            transform: translateX(100%) skew(-45deg);
        }
    }

    /* Enhanced cursor effect */
    .cyber-cursor {
        box-shadow: 0 0 10px var(--highlight);
        animation: cursorPulse 2s infinite;
    }

    @keyframes cursorPulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
        }
    }
`;

// Update the style element
style.textContent += additionalStyles;