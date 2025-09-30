// new js file for a button animation to flip thru the 3 testimonials like a slideshow

// If anime.js is loaded via CDN, `anime` is available globally.
// Otherwise, import it properly (uncomment below and ensure bundler support):



// If anime.js is loaded via CDN, `anime` is available globally.
// Otherwise, import it properly (uncomment below and ensure bundler support):
// import anime from 'animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Testimonial stack initialized');
    
    let currentIndex = 0;
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    // Debug: Check if elements are found
    console.log('Cards found:', cards.length);
    console.log('Prev button found:', prevBtn);
    console.log('Next button found:', nextBtn);
    console.log('Dots found:', dots.length);
    
    // Initialize first card as active
    updateCards();
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Prev button clicked');
            currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            updateCards();
            animateTransition('prev');
        });
    } else {
        console.error('Prev button not found!');
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            updateCards();
            animateTransition('next');
        });
    } else {
        console.error('Next button not found!');
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCards();
            animateTransition('dot');
        });
    });
    
    function updateCards() {
        console.log('Updating cards, currentIndex:', currentIndex);
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            
            if (index === currentIndex) {
                card.classList.add('active');
                console.log('Card', index, 'is now active');
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add('prev');
                console.log('Card', index, 'is now prev');
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add('next');
                console.log('Card', index, 'is now next');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function animateTransition(direction) {
        const activeCard = document.querySelector('.testimonial-card.active');
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: activeCard,
                scale: [1, 1, 1],
                rotateY: direction === 'next' ? [0, 5, 0] : [0, -5, 0],
                duration: 600,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }
});


