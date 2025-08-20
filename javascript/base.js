// const { Client } = require("pg");


// DOM manipulation file for the client side user
const nav = document.getElementById("nav");

// Use Netlify Functions URL when deployed, fallback to localhost for development
const baseUrl = window.location.hostname === 'localhost' 
  ? "http://localhost:3000" 
  : "/.netlify/functions/api";

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

// Slideshow functionality for merchandise gallery
let slideIndex = 1;
let slideInterval;

const initializeSlideshow = () => {
    // Check if we're on a page with Swiper (like home.html)
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer) {
        console.log("Swiper detected, skipping traditional slideshow initialization");
        return;
    }
    
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

// Load cart from sessionStorage on page load
const loadCartFromStorage = () => {
    const savedCart = sessionStorage.getItem('abcFitnessCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
};

// Save cart to sessionStorage
const saveCartToStorage = () => {
    sessionStorage.setItem('abcFitnessCart', JSON.stringify(cart));
};

const addToCart = (itemName, price) => {
    const existingItem = cart.find(item => item.name === itemName);
    // allows user to increment/decrement the item in the cart
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
    saveCartToStorage(); // Save to sessionStorage
    showCartNotification(itemName);
};

const removeFromCart = (itemName) => {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
    saveCartToStorage(); // Save to sessionStorage
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

// Modal functionality for viewing cart
const openCartModal = () => {
    // Create modal if it doesn't exist
    let modal = document.getElementById('cart-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Shopping Cart</h2>
                    <span class="close" onclick="closeCartModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div id="modal-cart-items"></div>
                    <div class="modal-cart-total">
                        <strong>Total: $<span id="modal-cart-total">0.00</span></strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>
                    <button class="checkout-btn" onclick="checkout()">Checkout</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add click event to close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCartModal();
            }
        });
        
        // Add escape key functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeCartModal();
            }
        });
    }
    
    // Update modal content with current cart data
    updateModalCartDisplay();
    
    // Show modal
    modal.style.display = 'block';
};

const closeCartModal = () => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
    }
};

const updateModalCartDisplay = () => {
    const cartItems = document.getElementById('modal-cart-items');
    const cartTotal = document.getElementById('modal-cart-total');
    
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
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
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
    saveCartToStorage(); // Save to sessionStorage
    updateModalCartDisplay(); // Update modal if open
};

const clearCart = () => {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        updateCartDisplay();
        saveCartToStorage(); // Save to sessionStorage
        updateModalCartDisplay(); // Update modal if open
        alert('Cart cleared successfully!');
    }
};

// Single consolidated DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
    // Navigation event listeners - using querySelector to find navigation links
    const homeLink = document.querySelector('a[href="home.html"]');
    const aboutLink = document.querySelector('a[href="about.html"]');
    const customLink = document.querySelector('a[href="custom.html"]');
    const galleryLink = document.querySelector('a[href="gallery.html"]');

    // Add click event listeners if links exist
    if (homeLink) {
        homeLink.addEventListener("click", (e) => {
            console.log("Navigating to home page");
            // Allow default navigation behavior
        });
    }

    if (aboutLink) {
        aboutLink.addEventListener("click", (e) => {
            console.log("Navigating to about page");
            // Allow default navigation behavior
        });
    }

    if (customLink) {
        customLink.addEventListener("click", (e) => {
            console.log("Navigating to custom page");
            // Allow default navigation behavior
        });
    }

    if (galleryLink) {
        galleryLink.addEventListener("click", (e) => {
            console.log("Navigating to gallery page");
            // Allow default navigation behavior
        });
    }

    // Initialize slideshow and fetch data
    initializeSlideshow();
    fetchHomeData();
    loadCartFromStorage(); // Load cart from sessionStorage on page load
});


// function for returning the user to the home page when clicking gym logo/favicon
const homeButton = document.getElementById('homeButton');
// add click listener
    homeButton.addEventListener("click", function() {
        window.location.href = "home.html";
    });
    
// assigned 2 variables so the computer can recognize the difference between the current page the user is on & the expected/desired page of the home screen
   try {
    setTimeout(() => {
        const expectedPage = 'home.html';
        const currentPage = window.location.pathname.split('/').pop();
    

   if (currentPage !== expectedPage) {
    console.error('⚠️ The homeButton is not working right now. Please use the home tab instead.');
   }
}, 300);
} catch (error){
    console.log('❌ Error while trying to redirect with homeButton', error);

}







