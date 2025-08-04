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

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeSubscribeForm();
    fetchHomeData();
});


