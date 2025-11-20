// JavaScript for interactive features on the portfolio website

// 1. Theme Toggle (Dark/Light Mode) functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIconContainer = document.querySelector('header button');

// Function to replace the placeholder icon based on the current theme
function updateThemeIcon(isDark) {
    // In the HTML structure you provided, the button just holds a placeholder text/span.
    // We will use standard emojis for the icons since we stripped the Lucide Icons CDN.
    if (themeIconContainer) {
        themeIconContainer.innerHTML = isDark
            ? '☀️' // Sun for light mode switch
            : '🌙'; // Moon for dark mode switch
        themeIconContainer.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Function to load the saved or system-preferred theme
function loadTheme() {
    // Check for user preference in localStorage (if available) or default to system preference
    const isDark = (typeof localStorage !== 'undefined' && localStorage.theme === 'dark') || 
                   (!('theme' in (typeof localStorage !== 'undefined' ? localStorage : {})) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    updateThemeIcon(isDark);
}

// Function to toggle the theme state
function toggleTheme() {
    // Check if localStorage is available before attempting to use it
    if (typeof localStorage === 'undefined') {
        console.warn("Local storage is not supported or available. Theme preference will not be saved.");
        html.classList.toggle('dark');
    } else {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            updateThemeIcon(false);
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            updateThemeIcon(true);
        }
    }
}

// Attach event listener for theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Load the theme when the page loads
window.addEventListener('load', loadTheme);


// 2. Contact Form Handler (Simulated Submission)
const contactForm = document.getElementById('contact-form');
// Note: In the HTML structure file, the message box did not have an ID, 
// so we'll select the last div inside the contact section's main container.
const formMessage = document.querySelector('#contact > div > div:last-child');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Retrieve input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // --- Simulated Backend Interaction ---
        console.log("Form Submitted:", { name, email, message });

        // Display success message using the CSS class 'form-success'
        if (formMessage) {
            // Remove any hidden/opacity classes if they exist, and add success styling
            formMessage.classList.remove('hidden'); 
            formMessage.classList.add('form-success');
            formMessage.style.opacity = '1';
            formMessage.style.visibility = 'visible';
            formMessage.textContent = `Thank you, ${name}! Your message has been received. I'll get back to you shortly.`;
        }

        // Reset the form and hide the message after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            if (formMessage) {
                formMessage.classList.remove('form-success');
                formMessage.style.opacity = '0';
                formMessage.style.visibility = 'hidden';
            }
        }, 5000);
    });
}


// 3. Set Current Year in Footer
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}


// 4. Smooth Scrolling for Navigation
// This provides a smooth scroll effect, especially helpful if CSS scroll-behavior is not fully supported.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Check if the target is just "#" or a valid section ID
        if (targetId && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});