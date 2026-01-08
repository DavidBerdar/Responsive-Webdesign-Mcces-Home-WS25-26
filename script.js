// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && menuBtn && !mobileNav.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

// Smooth scroll for anchor links
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

// Carousel Dots Functionality mit Bildwechsel
const dots = document.querySelectorAll('.dot');
const carouselImages = document.querySelectorAll('.carousel-image');
let currentDot = 0;
let autoPlayInterval;

// Function to change active dot and image
function changeDot(index) {
    // Remove active class from all dots and images
    dots.forEach(dot => dot.classList.remove('active'));
    carouselImages.forEach(img => img.classList.remove('active'));
    
    // Add active class to clicked dot and corresponding image
    dots[index].classList.add('active');
    if (carouselImages[index]) {
        carouselImages[index].classList.add('active');
    }
    currentDot = index;
    
    // Reset autoplay
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Function to go to next dot and image
function nextDot() {
    dots[currentDot].classList.remove('active');
    if (carouselImages[currentDot]) {
        carouselImages[currentDot].classList.remove('active');
    }
    
    currentDot = (currentDot + 1) % dots.length;
    
    dots[currentDot].classList.add('active');
    if (carouselImages[currentDot]) {
        carouselImages[currentDot].classList.add('active');
    }
}

// Start autoplay
function startAutoPlay() {
    autoPlayInterval = setInterval(nextDot, 3000);
}

// Initialize autoplay when page loads
if (dots.length > 0) {
    startAutoPlay();
}

// Pause autoplay on hover over dots
const dotsContainer = document.querySelector('.carousel-dots');
if (dotsContainer) {
    dotsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    dotsContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// Add scroll animation to products
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card, .collection-card');
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});