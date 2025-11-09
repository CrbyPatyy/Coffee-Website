let cart = 0;
const cartBtn = document.querySelector('.cart-btn');
const navbar = document.getElementById('navbar');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add to cart functionality
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        cart++;
        updateCart();
        
        // Animation effect
        const btn = this;
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Create floating effect
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        showAddedToCart(productName);
    });
});

function updateCart() {
    cartBtn.textContent = `Cart (${cart})`;
    
    // Animation for cart update
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 150);
}

function showAddedToCart(productName) {
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--dark);
        color: var(--cream);
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    `;
    notification.textContent = `✓ Added ${productName} to cart`;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Intersection Observer for animations
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

// Observe elements for scroll animations
document.querySelectorAll('.product-card, .feature, .about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Coffee cup animation enhancement
const coffeeCup = document.querySelector('.coffee-cup');
if (coffeeCup) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        coffeeCup.style.transform = `rotate3d(${yPos / 20}, ${-xPos / 20}, 0, 10deg)`;
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Update copyright year
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// Performance optimization for animations
let ticking = false;
function updateAnimations() {
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', requestTick);

// Enhanced touch interactions for mobile
document.addEventListener('touchstart', function() {}, { passive: true });

// Preload critical images (placeholder for actual implementation)
function preloadImages() {
    const images = [];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Error handling for smooth user experience
window.addEventListener('error', function(e) {
    console.log('Error occurred:', e.error);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateCart, showAddedToCart };
}