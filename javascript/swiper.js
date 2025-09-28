// Initialize both Swiper components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing Swipers...");
    
    if (typeof Swiper === 'undefined') {
        console.error("Swiper is not loaded!");
        return;
    }
    
    // Main image swiper
    const mainSwiper = new Swiper('.swiper:not(.testimonial-swiper)', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        pagination: {
            el: '.swiper:not(.testimonial-swiper) .swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper:not(.testimonial-swiper) .swiper-button-next',
            prevEl: '.swiper:not(.testimonial-swiper) .swiper-button-prev',
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024:{ slidesPerView: 1 },
        }
    });
    
    // Testimonial swiper
//     const testimonialSwiper = new Swiper('.testimonial-swiper', {
//         slidesPerView: 1,
//         spaceBetween: 30,
//         centeredSlides: true,
//         loop: true,
//         effect: 'slide',
//         // autoplay: {
//         //     delay: 4000,
//         //     disableOnInteraction: false,
//         // },
//         pagination: {
//             el: '.testimonial-pagination',
//             clickable: true,
//             type: 'bullets',
//         },
//         navigation: {
//             nextEl: '.testimonial-swiper .swiper-button-next',
//             prevEl: '.testimonial-swiper .swiper-button-prev',
//         },
//         grabCursor: true,
//         breakpoints: {
//             640:  { slidesPerView: 1, spaceBetween: 20 },
//             768:  { slidesPerView: 1, spaceBetween: 30 },
//             1024: { slidesPerView: 1, spaceBetween: 30 },
//         }
//     });
    
    console.log("Main Swiper initialized successfully!", { mainSwiper });
});