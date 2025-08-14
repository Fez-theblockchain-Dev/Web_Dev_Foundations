
// Database connection object for Neon PostgreSQL via Netlify Functions
const neonDb = {
    // Fetch user data from database
    fetchUserData: async () => {
        try {
            const response = await fetch('/.netlify/functions/api/home', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'fetchUsers' })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.users || [];
        } catch (error) {
            console.error('Error fetching user data:', error);
            return [];
        }
    },

    // Submit contact form data to database
    submitContactForm: async (contactData) => {
        try {
            const response = await fetch('/.netlify/functions/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    },

    // Add new user to database
    addUser: async (userData) => {
        try {
            const response = await fetch('/.netlify/functions/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
};

// Populate contact form with data from database
const populateContactFormData = async () => {
    try {
        const nameInput = document.querySelector('.contact-form input[name="name"]');
        const emailInput = document.querySelector('.contact-form input[name="email"]');
        const messageInput = document.querySelector('.contact-form textarea[name="message"]');

        // Fetch user data from database
        const users = await neonDb.fetchUserData();
        
        if (users.length > 0) {
            // Populate form with first user's data (for demo purposes)
            const user = users[0];
            if (nameInput) nameInput.value = user.name || '';
            if (emailInput) emailInput.value = user.email || '';
            if (messageInput) messageInput.value = user.messageInput || '';
        }
    } catch (error) {
        console.error('Error populating contact form:', error);
    }
};

// Handle contact form submission
const handleContactFormSubmission = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        submittedAt: new Date().toISOString()
    };

    try {
        const result = await neonDb.submitContactForm(contactData);
        console.log('Contact form submitted successfully:', result);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        event.target.reset();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Sorry, there was an error submitting your message. Please try again.');
    }
};





