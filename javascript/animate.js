// new js file for a button animation to flip thru the 3 testimonials like a slideshow

// If anime.js is loaded via CDN, `anime` is available globally.
// Otherwise, import it properly (uncomment below and ensure bundler support):



import anime from 'animejs/lib/anime.es.js';
import {animate, utils} from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
    console.log('test');
    
    const arrows = document.querySelectorAll('.testimonial-swiper .swiper-button-next, .testimonial-swiper .swiper-button-prev');
    
    arrows.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const isNext = e.currentTarget.classList.contains('swiper-button-next');

            if (isNext) {
                nextTestimonial();      // go to next card
            } else {
                prevTestimonial();      // go to previous card
            }
        });
    });
});

function nextTestimonial() {
    // advance your card stack here
}

function prevTestimonial() {
    // go back in your card stack here
}

anime({
    targets: '.card-slide, .testimonial-swiper .swiper-button-next, .testimonial-swiper .swiper-button-prev',
    duration: 500
});


