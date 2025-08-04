// DOM manipulation file for the client side user
const nav = document.getElementById("nav");

const baseUrl = "http://localhost:3000";

// Fetch request with proper error handling
const fetchHomeData = async () => {
    try {
        const response = await fetch(`${baseUrl}/home`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "FullName" })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Home data fetched:", data);
    } catch (error) {
        console.error("Error fetching home data:", error);
    }
};

// Timeout controller for fetch requests
const createTimeoutController = (timeoutMs = 3000) => {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeoutMs);
    return controller;
};

// DOM elements
const home = document.getElementById("home");
const about = document.getElementById("about");
const custom = document.getElementById("custom");
const gallery = document.getElementById("gallery");

// Navigation event listeners
if (home) {
    home.addEventListener("click", () => {
        window.location.href = `${baseUrl}/home`;
    });
}

// Subscribe form functionality with modern ES6+ practices
const initializeSubscribeForm = () => {
    const subscribeForm = document.getElementById("subscribe-form");
    
    if (!subscribeForm) {
        console.warn("Subscribe form not found");
        return;
    }
    
    subscribeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput?.value?.trim();
        
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Display success message
        alert("Thank you for subscribing!");
        
        // Reset the form
        subscribeForm.reset();
        
        // Optional: Log the subscription
        console.log("New subscription:", email);
    });
};

// Slideshow functionality for merchandise gallery
let slideIndex = 1;
let slideInterval;

const initializeSlideshow = () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        console.log("No slideshow found on this page");
        return;
    }
    
    // Show first slide
    showSlides(slideIndex);
    
    // Start auto slideshow
    startAutoSlideshow();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Pause auto slideshow on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startAutoSlideshow();
        });
    }
};

const showSlides = (n) => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Handle slide index bounds
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate current dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
};

const changeSlide = (n) => {
    showSlides(slideIndex += n);
};

const currentSlide = (n) => {
    showSlides(slideIndex = n);
};

const startAutoSlideshow = () => {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
};

// Shopping cart functionality
let cart = [];

const addToCart = (itemName, price) => {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showCartNotification(itemName);
};

const removeFromCart = (itemName) => {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')" class="remove-btn">Remove</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = total.toFixed(2);
};

const showCartNotification = (itemName) => {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${itemName} added to cart!`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
};

const checkout = () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo site. In a real application, this would redirect to a payment processor.`);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeSubscribeForm();
    initializeSlideshow();
    fetchHomeData();
    
    // Add CSS animations for cart notifications
    if (!document.querySelector('#cart-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'cart-notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});


