// Smooth scrolling for navigation links with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced Navbar animations
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        navbar.style.boxShadow = 'none';
    } else if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced form submission with animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitButton.classList.add('btn-success');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitButton.innerHTML = 'Send Message';
                submitButton.classList.remove('btn-success');
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Enhanced skills animation with Intersection Observer
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            
            // Animate progress bars
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
});

// Enhanced typing effect for hero section
const heroText = document.querySelector('.hero-section h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50 + Math.random() * 50);
        } else {
            // Add cursor animation after typing
            heroText.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    window.addEventListener('load', typeWriter);
}

// Enhanced project cards animation
const projectCards = document.querySelectorAll('#projects .card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Add scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.className = 'scroll-top-btn';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark/Light mode toggle
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');

function setMode(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeToggle.classList.remove('btn-outline-light');
        modeToggle.classList.add('btn-outline-dark');
        localStorage.setItem('colorMode', 'light');
    } else {
        document.body.classList.remove('light-mode');
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeToggle.classList.remove('btn-outline-dark');
        modeToggle.classList.add('btn-outline-light');
        localStorage.setItem('colorMode', 'dark');
    }
}

// On load, set mode from localStorage
const savedMode = localStorage.getItem('colorMode');
if (savedMode === 'light') setMode(true);
else setMode(false);

modeToggle.addEventListener('click', () => {
    setMode(!document.body.classList.contains('light-mode'));
});

// Prevent navbar from auto-collapsing on link click except on mobile
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.getElementById('navbarNav');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
            // Only collapse on mobile
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.hide();
        }
    });
}); 