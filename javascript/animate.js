// new js file for a button animation to flip thru the 3 testimonials like a slideshow

// If anime.js is loaded via CDN, `anime` is available globally.
// Otherwise, import it properly (uncomment below and ensure bundler support):



import anime from 'animejs/lib/anime.es.js';

anime({
    targets: '.card-slide'
});

const arrowButtons = document.querySelectorAll('.testimonial-swiper .swiper-button-next, .testimonial-swiper .swiper-button-prev');

