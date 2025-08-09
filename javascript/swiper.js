// carousel component of images for the home page

// Wait for DOM to be loaded/error handeling
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing Swiper...");
    
    // Check if Swiper is available
    if (typeof swiper === 'undefined') {
        console.error("Swiper is not loaded!");
        return;
    }
    
    // Check if swiper container exists
    const swiperContainer = document.querySelector('.swiper');
    if (!swiperContainer) {
        console.error("Swiper container not found!");
        return;
    }
    
    console.log("Swiper container found, initializing...");
    
    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        modules: [Swiper.Navigation, Swiper.Pagination, Swiper.Autoplay],
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
    
    console.log("Swiper initialized successfully!");
});

