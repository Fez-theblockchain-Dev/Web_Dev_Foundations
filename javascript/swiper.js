// Initialize both Swiper components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing Swipers...");
    
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        console.error("Swiper is not loaded!");
        return;
    }
    
    // Initialize the main image swiper
    const mainSwiper = new Swiper('.swiper:not(.testimonial-swiper)', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        
        // Autoplay
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        
        // Pagination
        pagination: {
            el: '.swiper:not(.testimonial-swiper) .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        
        // Navigation
        navigation: {
            nextEl: '.swiper:not(.testimonial-swiper) .swiper-button-next',
            prevEl: '.swiper:not(.testimonial-swiper) .swiper-button-prev',
        },
        
        // Responsive breakpoints
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        }
    });
    
    // Initialize the testimonial swiper
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        effect: 'slide',
        
        // Autoplay for testimonials
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        // Pagination
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
            type: 'bullets',
        },

        // Navigation
        navigation: {
            nextEl: '.testimonial-swiper .swiper-button-next',
            prevEl: '.testimonial-swiper .swiper-button-prev',
        },

        grabCursor: true,
        
        // Responsive breakpoints
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
        }
    });
    
    console.log("Both Swipers initialized successfully!");
    console.log("Main Swiper:", mainSwiper);
    console.log("Testimonial Swiper:", testimonialSwiper);
});

