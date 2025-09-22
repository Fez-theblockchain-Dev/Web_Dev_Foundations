/**
 * Newsletter Subscription Component
 * Reusable JavaScript component for collecting member/prospective member information
 * and adding them to a healthy lifestyle gym newsletter
 */

'use strict'

// trying to import { Form } 
import { Form } from 'bootstrap.esm.min.js';
Array.from(document.querySelectorAll('.form'))
.forEach(formNode = new Form(formData));




class NewsletterComponent {
    constructor(options = {}) {
        this.options = {
            containerId: 'newsletter-container',
            formId: 'newsletter-form',
            title: 'Subscribe to Our Newsletter',
            subtitle: 'Get the latest fitness tips, workout routines, and healthy lifestyle advice!',
            placeholder: 'Enter your email address',
            buttonText: 'Subscribe',
            successMessage: 'Thank you for subscribing to our newsletter!',
            errorMessage: 'Please enter a valid email address.',
            ...options
        };
        
        this.subscribers = this.loadSubscribers();
        this.init();
    }

    /**
     * Initialize the newsletter component
     */
    init() {
        try {
            this.createNewsletterHTML();
            this.attachEventListeners();
            this.loadSubscribers();
        } catch (error) {
            console.error('Error displaying newsletter signup', error);
        }
    }

    /**
     * Create the newsletter HTML structure
     */
    createNewsletterHTML() {
        const newsletterHTML = `
            <div class="newsletter-section">
                <div class="newsletter-content">
                    <h3 class="newsletter-title">${this.options.title}</h3>
                    <p class="newsletter-subtitle">${this.options.subtitle}</p>
                    <form id="${this.options.formId}" class="newsletter-form">
                        <div class="form-group"">
                            <input 
                                type="name" 
                                id="newsletter-name" 
                                name="name" 
                                placeholder="Your Name" 
                                required
                                class="newsletter-input"
                                id="floating password"
                            >
                        </div>
                        <div class="form-group">
                            <input 
                                type="email" 
                                id="newsletter-email" 
                                name="email" 
                                placeholder="${this.options.placeholder}" 
                                required
                                class="newsletter-input"
                            >
                        </div>
                        <div class="form-group">
                            <select id="newsletter-fitness-level" name="fitnessLevel" class="newsletter-input">
                                <option value="">Fitness Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="newsletter-checkbox-label">
                                <input type="checkbox" id="newsletter-consent" name="consent" required>
                                I agree to receive fitness tips and updates from ABC Fitness
                            </label>
                        </div>
                        <button type="submit" class="newsletter-submit-btn">
                            ${this.options.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Insert the newsletter HTML into the page
        this.insertNewsletterHTML(newsletterHTML);
    }

    /**
     * Insert newsletter HTML into the page
     */
    insertNewsletterHTML(html) {
        // Try to find existing newsletter container
        let container = document.getElementById(this.options.containerId);
        
        if (!container) {
            // Create container if it doesn't exist
            container = document.createElement('div');
            container.id = this.options.containerId;
            
            // Insert before footer if it exists, otherwise append to body
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(container, footer);
            } else {
                document.body.appendChild(container);
            }
        }
        
        container.innerHTML = html;
    }

    /**
     * Attach event listeners to the newsletter form
     */
    attachEventListeners() {
        const form = document.getElementById(this.options.formId);
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(e);
            });
        }

        // Add input validation
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                this.validateEmail(emailInput.value);
            });
        }
    }

    /**
     * Handle newsletter form submission
     */
    async handleNewsletterSubmission(event) {
        const formData = new FormData(event.target);
        const subscriberData = {
            name: formData.get('name'),
            email: formData.get('email'),
            fitnessLevel: formData.get('fitnessLevel'),
            consent: formData.get('consent') === 'on',
            subscribedAt: new Date().toISOString(),
            source: window.location.pathname
        };

        // Validate the data (error handling)
        if (!this.validateSubscriberData(subscriberData)) {
            this.showMessage('Invalid email format. Please enter a valid email address.', 'error');
            return;
        } else { 
            this.addSubscriber(subscriberData);
            this.showMessage(this.options.successMessage, 'Thank you for subscribing to our newsletter!');
            event.target.reset();
            console.log('New newsletter subscription:', subscriberData);
        }

        // Send to database via API
        try {
            const response = await fetch('/.netlify/functions/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriberData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Newsletter subscription saved to database:', result);
        } catch (error) {
            console.error('Error saving newsletter subscription:', error);
            // Still show success message to user even if database save fails
        }

        // Add subscriber to the list
        this.addSubscriber(subscriberData);

        // Show success message
        this.showMessage(this.options.successMessage, 'success');

        // Reset the form
        event.target.reset();

        // Log the subscription
        console.log('New newsletter subscription:', subscriberData);
    }

    /**
     * Validate subscriber data
     */
    validateSubscriberData(data) {
        if (!data.name || data.name.trim().length < 2) {
            this.showMessage('Please enter your name (minimum 2 characters).', 'error');
            return false;
        }

        if (!this.validateEmail(data.email)) {
            return false;
        }

        if (!data.fitnessLevel) {
            this.showMessage('Please select your fitness level.', 'error');
            return false;
        }

        if (!data.consent) {
            this.showMessage('Please agree to receive our newsletter.', 'error');
            return false;
        }

        return true;
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            this.showMessage(this.options.errorMessage, 'error');
            return false;
        }
        
        return true;
    }

    /**
     * Add subscriber to the list
     */
    addSubscriber(subscriberData) {
        this.subscribers.push(subscriberData);
        this.saveSubscribers();
        
        // Send welcome email (in a real app, this would be an API call)
        this.sendWelcomeEmail(subscriberData);
    }

    /**
     * Load subscribers from localStorage
     */
    loadSubscribers() {
        try {
            const stored = localStorage.getItem('abc-fitness-subscribers');
            return stored ? JSON.parse(Stored) : [];
        } catch (error) {
            console.error('Error loading subscribers:', error);
            return [];
        }
    }

    /**
     * Save subscribers to localStorage
     */
    saveSubscribers() {
        try {
            localStorage.setItem('abc-fitness-subscribers', JSON.stringify(this.subscribers));
        } catch (error) {
            console.error('Error saving subscribers:', error);
        }
    }

    /**
     * Send welcome email (simulated)
     */
    sendWelcomeEmail(subscriberData) {
        // In a real application, this would be an API call to your backend
        console.log('Sending welcome email to:', subscriberData.email);
        
        // Simulate email sending
        setTimeout(() => {
            console.log(`Welcome email sent to ${subscriberData.name} at ${subscriberData.email}`);
        }, 1000);
    }

    /**
     * Show message to user
     */
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `newsletter-message newsletter-message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 10px 15px;
            margin: 10px 0;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
            animation: newsletterSlideIn 0.3s ease-out;
        `;

        // Set background color based on message type
        switch (type) {
            case 'success':
                messageElement.style.backgroundColor = '#4CAF50';
                messageElement.style.color = 'white';
                break;
            case 'error':
                messageElement.style.backgroundColor = '#f44336';
                messageElement.style.color = 'white';
                break;
            default:
                messageElement.style.backgroundColor = '#2196F3';
                messageElement.style.color = 'white';
        }

        // Insert message into the form
        const form = document.getElementById(this.options.formId);
        if (form) {
            form.parentNode.insertBefore(messageElement, form);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageElement.style.animation = 'newsletterSlideOut 0.3s ease-out';
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 300);
            }, 5000);
        }
    }

    /**
     * Get subscriber statistics
     */
    getSubscriberStats() {
        const total = this.subscribers.length;
        const thisMonth = this.subscribers.filter(sub => {
            const subDate = new Date(sub.subscribedAt);
            const now = new Date();
            return subDate.getMonth() === now.getMonth() && 
                   subDate.getFullYear() === now.getFullYear();
        }).length;

        return {
            total,
            thisMonth,
            fitnessLevels: this.subscribers.reduce((acc, sub) => {
                acc[sub.fitnessLevel] = (acc[sub.fitnessLevel] || 0) + 1;
                return acc;
            }, {})
        };
    }

    /**
     * Export subscribers data
     */
    exportSubscribers() {
        const dataStr = JSON.stringify(this.subscribers, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `abc-fitness-subscribers-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
}

// Auto-initialize newsletter component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the newsletter component
        window.newsletterComponent = new NewsletterComponent({
            title: 'Stay Fit with ABC Fitness!',
            subtitle: 'Get exclusive workout tips, nutrition advice, and motivation delivered to your inbox.',
            placeholder: 'Enter your email address',
            buttonText: 'Subscribe Now',
            successMessage: 'Welcome to the ABC Fitness family! Check your email to confirm subscription.',
            errorMessage: 'Please enter a valid email address.'
        });
    } catch (error) {
        console.error('Error initializing newsletter component:', error);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsletterComponent;
}


