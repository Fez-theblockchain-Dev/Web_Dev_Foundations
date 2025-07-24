// let this javascript file serve as the DOM manipulation file for the client side user 
const nav = document.getElementById("nav");

const baseUrl = "http://localhost:3000";
fetch(`${baseUrl}/home`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: "FullName" }) // replace "yourName" as needed
});

let controller = new AbortController();
setTimeout(() => controller.abort(), 3000);
fetch(url, { signal: controller.signal })
  .catch(err => console.warn("Request timed out"));



const home = document.getElementById("home");
const about = document.getElementById("about");
const custom = document.getElementById("custom");
const gallery = document.getElementById("gallery");

home.addEventListener("click", () => {
    window.location.href = `${baseUrl}/home`;
});

// Subscribe form alert functionality for all pages
window.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            subscribeForm.reset();
        });
    }
});


