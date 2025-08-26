// carousel component of images for the home page

// Wait for DOM to be loaded/error handeling
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing Swiper...");
    
    // Check if Swiper is available (must keep the 'Swiper' type in uppercase for the library to be called on)
    if (typeof Swiper === 'undefined') {
        console.error("Swiper is not loaded!");
        return;
    }
    
    // Check if swiper container exists
    const swiperContainer = document.querySelector('.swiper');
    if (!swiperContainer) {
        console.error("Swiper container not found!");
        return;
    }
    
    // Check if pagination element exists
    const paginationElement = document.querySelector('.swiper-pagination');
    if (!paginationElement) {
        console.error("Swiper pagination element not found!");
        return;
    }
    
    console.log("Swiper container found, initializing...");
    console.log("Pagination element found:", paginationElement);
    
    // Initialize Swiper with explicit module imports
    const swiper = new Swiper('.swiper', {
        // Enable all features we need
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        
        // Autoplay
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            dynamicBullets: false,
        },
        
        // Navigation
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
    console.log("Swiper instance:", swiper);
    console.log("Pagination enabled:", swiper.pagination);
    console.log("Navigation enabled:", swiper.navigation);
    
    // Test pagination functionality
    setTimeout(() => {
        console.log("Testing pagination...");
        console.log("Total slides:", swiper.slides.length);
        console.log("Current slide index:", swiper.activeIndex);
        
        // Test if pagination bullets are clickable
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        console.log("Pagination bullets found:", bullets.length);
        
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                console.log(`Clicked bullet ${index}`);
                swiper.slideTo(index);
            });
        });
    }, 1000);
    
    // Add event listeners to track slide changes
    swiper.on('slideChange', function () {
        console.log('Slide changed to:', swiper.activeIndex);
    });
    
    swiper.on('paginationRender', function () {
        console.log('Pagination rendered');
    });
});

// new swiper component initiated below for the testimonial cards on home page

const testimonialSwiper = new Swiper('.testimonial-swiper', {
    
    loop: true,
    autoplay: {
        delay:4000,
        disableOnInteraction: false,
    }, 

    pagination: {
        el: '.testimonial-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.testimonial-swiper .swiper-button-next',
        prevEl: '.testimonial-swiper .swiper-button-prev',
    },

    spaceBetween: 20,
    grabCursor: true,

});

