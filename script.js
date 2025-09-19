// Preloader functionality
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 3 seconds
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('fade-out');
            
            // Remove preloader from DOM after fade out animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 3000);

    // Initialize theme
    initializeTheme();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    applyTheme(savedTheme);
    
    // Update toggle button
    updateThemeToggle(savedTheme, themeIcon);
    
    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add switching animation
        themeToggle.classList.add('switching');
        
        // Apply new theme after a short delay for animation
        setTimeout(() => {
            applyTheme(newTheme);
            updateThemeToggle(newTheme, themeIcon);
            localStorage.setItem('theme', newTheme);
            
            // Remove switching animation
            setTimeout(() => {
                themeToggle.classList.remove('switching');
            }, 600);
        }, 100);
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    } else {
        // Create meta theme-color if it doesn't exist
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = theme === 'dark' ? '#000000' : '#ffffff';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
}

function updateThemeToggle(theme, themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize scroll animations for horizontal sections
function initHorizontalScrollAnimations() {
    // Select all horizontal scroll sections
    const scrollSections = [
        document.querySelector('.directors-scroll'),
        document.querySelector('.tech-team .team-grid'),
        document.querySelector('.news-grid')
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation starts
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe each section
    scrollSections.forEach(section => {
        if (section) observer.observe(section);
    });
}

// Intersection Observer for tech team horizontal scroll animation
function initTechTeamAnimation() {
    const techTeamGrid = document.querySelector('.tech-team .team-grid');
    if (!techTeamGrid) return;

    const teamMembers = techTeamGrid.querySelectorAll('.team-member');
    
    // Create an observer for each team member
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation starts
                // observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px 0px 0px'
    });

    // Observe each team member
    teamMembers.forEach(member => {
        observer.observe(member);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHorizontalScrollAnimations();
    initTechTeamAnimation();
    initServicesScroll();
});

// Services section scroll functionality
function initServicesScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const servicesSection = document.querySelector('.services-scroll-wrapper');

    if (!scrollIndicator || !servicesSection) return;

    // Hide scroll indicator when user scrolls
    let isScrolling;
    servicesSection.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        scrollIndicator.style.opacity = '0';
        
        isScrolling = setTimeout(() => {
            // Only show if not at bottom
            if (servicesSection.scrollTop + servicesSection.clientHeight < servicesSection.scrollHeight - 100) {
                scrollIndicator.style.opacity = '0.8';
            }
        }, 1000);
    });

    // Scroll to next card when clicking the indicator
    scrollIndicator.addEventListener('click', () => {
        const currentScroll = servicesSection.scrollTop;
        const cardHeight = document.querySelector('.service-card')?.offsetHeight || 400;
        const nextScroll = Math.ceil((currentScroll + 100) / cardHeight) * cardHeight;
        
        servicesSection.scrollTo({
            top: nextScroll,
            behavior: 'smooth'
        });
    });

    // Hide indicator when at bottom
    const observer = new MutationObserver(() => {
        if (servicesSection.scrollTop + servicesSection.clientHeight >= servicesSection.scrollHeight - 50) {
            scrollIndicator.style.opacity = '0';
        }
    });

    observer.observe(servicesSection, { childList: true, subtree: true });
}

// Intersection Observer for other animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Exclude .team-member to prevent conflicts with horizontal scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .contact-content, .foundation-card, .news-card, .brand-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('btn-primary') && this.type === 'submit') {
            // Don't add loading state for form submit buttons
            return;
        }
        
        // Add loading state
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.style.pointerEvents = 'none';
        
        // Simulate loading (replace with actual functionality)
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll-responsive background effect
window.addEventListener('scroll', () => {
    const scrollBg = document.getElementById('scrollBg');
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollBg) {
        // Calculate scroll percentage
        const scrollPercentage = scrolled / (documentHeight - windowHeight);
        
        // Update background position based on scroll
        const xPos = 50 + (scrollPercentage * 30 - 15); // Move between 35% and 65%
        const yPos = 50 + (scrollPercentage * 40 - 20); // Move between 30% and 70%
        
        scrollBg.style.setProperty('--mouse-x', `${xPos}%`);
        scrollBg.style.setProperty('--mouse-y', `${yPos}%`);
        
        // Show background when scrolling
        if (scrolled > 100) {
            scrollBg.classList.add('active');
        } else {
            scrollBg.classList.remove('active');
        }
    }
});

// Mouse movement effect for additional interactivity
document.addEventListener('mousemove', (e) => {
    const scrollBg = document.getElementById('scrollBg');
    if (scrollBg && scrollBg.classList.contains('active')) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        // Blend scroll position with mouse position
        const currentX = parseFloat(scrollBg.style.getPropertyValue('--mouse-x') || '50');
        const currentY = parseFloat(scrollBg.style.getPropertyValue('--mouse-y') || '50');
        
        const newX = currentX * 0.7 + x * 0.3;
        const newY = currentY * 0.7 + y * 0.3;
        
        scrollBg.style.setProperty('--mouse-x', `${newX}%`);
        scrollBg.style.setProperty('--mouse-y', `${newY}%`);
    }
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.95);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(10px);
            padding: 2rem 0;
        }
        .nav-menu.active {
            left: 0;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style); // <-- This line is required!

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
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
});
// Inject mobile menu CSS if not already in your main CSS
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
@media (max-width: 900px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: rgba(0,0,0,0.95);
        width: 100vw;
        text-align: center;
        transition: left 0.3s;
        backdrop-filter: blur(10px);
        padding: 2rem 0;
        z-index: 999;
    }
    .nav-menu.active {
        left: 0;
    }
    .hamburger {
        display: flex;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        width: 32px;
        height: 32px;
        justify-content: center;
        align-items: center;
        z-index: 1001;
    }
    .hamburger span {
        display: block;
        width: 28px;
        height: 4px;
        background: var(--accent-primary, #00ff6a);
        border-radius: 2px;
        transition: all 0.3s;
    }
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-6px, 7px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-6px, -7px);
    }
}
`;
document.head.appendChild(mobileMenuStyle);

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
        });
        // Optional: close menu on link click (mobile UX)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
});