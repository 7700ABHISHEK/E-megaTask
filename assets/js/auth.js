// Authentication JavaScript

// Password Toggle Functionality
function setupPasswordToggle(toggleBtnId, passwordInputId) {
    const toggleBtn = document.getElementById(toggleBtnId);
    const passwordInput = document.getElementById(passwordInputId);
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// Initialize password toggles
setupPasswordToggle('togglePassword', 'password');
setupPasswordToggle('toggleLoginPassword', 'loginPassword');

// Form Validation Functions
function validateEmail(email) {
    // Check for spaces
    if (/\s/.test(email)) {
        return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateMobile(mobile) {
    // Check for spaces or non-numeric characters
    if (/\s/.test(mobile) || /\D/.test(mobile)) {
        return false;
    }
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
}

function validatePassword(password) {
    // Check for spaces
    if (/\s/.test(password)) {
        return false;
    }
    return password.length >= 6;
}

function hasSpaces(value) {
    return /\s/.test(value);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Show Success Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${icon} text-xl"></i>
            <span class="font-medium">${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearError('nameError');
        clearError('mobileError');
        clearError('emailError');
        clearError('passwordError');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const referral = document.getElementById('referral').value.trim();
        const terms = document.getElementById('terms').checked;
        
        let isValid = true;
        
        // Validate name
        if (name.length < 2) {
            showError('nameError', 'Please enter a valid name');
            isValid = false;
        }
        
        // Validate mobile
        if (hasSpaces(mobile)) {
            showError('mobileError', 'Mobile number cannot contain spaces');
            isValid = false;
        } else if (!validateMobile(mobile)) {
            showError('mobileError', 'Please enter a valid 10-digit mobile number');
            isValid = false;
        }
        
        // Validate email
        if (hasSpaces(email)) {
            showError('emailError', 'Email cannot contain spaces');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (hasSpaces(password)) {
            showError('passwordError', 'Password cannot contain spaces');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError('passwordError', 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        // Check terms
        if (!terms) {
            showNotification('Please accept the Terms & Conditions', 'error');
            isValid = false;
        }
        
        if (isValid) {
            // Create user object
            const userData = {
                name,
                mobile,
                email,
                password,
                referral: referral || null,
                createdAt: new Date().toISOString()
            };
            
            // Store in localStorage (in real app, send to backend)
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Show success message
            showNotification('Account created successfully! Redirecting to login...');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
    
    // Real-time validation
    document.getElementById('email').addEventListener('input', function() {
        if (this.value && hasSpaces(this.value)) {
            showError('emailError', 'Email cannot contain spaces');
        } else if (this.value && !validateEmail(this.value)) {
            showError('emailError', 'Invalid email format');
        } else {
            clearError('emailError');
        }
    });
    
    document.getElementById('mobile').addEventListener('input', function() {
        if (this.value && hasSpaces(this.value)) {
            showError('mobileError', 'Mobile number cannot contain spaces');
        } else if (this.value && !validateMobile(this.value)) {
            showError('mobileError', 'Mobile number must be 10 digits');
        } else {
            clearError('mobileError');
        }
    });
    
    document.getElementById('password').addEventListener('input', function() {
        if (this.value && hasSpaces(this.value)) {
            showError('passwordError', 'Password cannot contain spaces');
        } else if (this.value && !validatePassword(this.value)) {
            showError('passwordError', 'Password must be at least 6 characters');
        } else {
            clearError('passwordError');
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearError('loginEmailError');
        clearError('loginPasswordError');
        
        // Get form values
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        let isValid = true;
        
        // Validate email
        if (hasSpaces(email)) {
            showError('loginEmailError', 'Email cannot contain spaces');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('loginEmailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('loginPasswordError', 'Please enter your password');
            isValid = false;
        } else if (hasSpaces(password)) {
            showError('loginPasswordError', 'Password cannot contain spaces');
            isValid = false;
        }
        
        if (isValid) {
            // Get stored user data
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                
                // Check credentials
                if (userData.email === email && userData.password === password) {
                    // Store login session
                    const sessionData = {
                        email: userData.email,
                        name: userData.name,
                        loggedIn: true,
                        loginTime: new Date().toISOString()
                    };
                    
                    if (rememberMe) {
                        localStorage.setItem('session', JSON.stringify(sessionData));
                    } else {
                        sessionStorage.setItem('session', JSON.stringify(sessionData));
                    }
                    
                    // Show success message
                    showNotification(`Welcome back, ${userData.name}!`);
                    
                    // Check if there's a redirect URL stored
                    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                    
                    // Redirect after 1.5 seconds
                    setTimeout(() => {
                        if (redirectUrl) {
                            sessionStorage.removeItem('redirectAfterLogin');
                            window.location.href = redirectUrl;
                        } else {
                            window.location.href = 'index.html';
                        }
                    }, 1500);
                } else {
                    showNotification('Invalid email or password', 'error');
                }
            } else {
                showNotification('No account found. Please sign up first!', 'error');
                setTimeout(() => {
                    window.location.href = 'signup.html';
                }, 2000);
            }
        }
    });
}

// Check if user is already logged in
function checkLoginStatus() {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    
    if (session) {
        const sessionData = JSON.parse(session);
        
        // If on login or signup page and already logged in, redirect to home
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            showNotification('You are already logged in!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }
}

// Run on page load
checkLoginStatus();

// Prevent spaces in specific input fields
function preventSpaces(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        // Prevent space key
        input.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.keyCode === 32) {
                e.preventDefault();
                return false;
            }
        });
        
        // Remove spaces if pasted
        input.addEventListener('paste', function(e) {
            setTimeout(() => {
                this.value = this.value.replace(/\s/g, '');
            }, 10);
        });
        
        // Remove spaces on input
        input.addEventListener('input', function() {
            const cursorPosition = this.selectionStart;
            const originalLength = this.value.length;
            this.value = this.value.replace(/\s/g, '');
            const newLength = this.value.length;
            const diff = originalLength - newLength;
            this.setSelectionRange(cursorPosition - diff, cursorPosition - diff);
        });
    }
}

// Apply space prevention to relevant fields
preventSpaces('email');
preventSpaces('mobile');
preventSpaces('password');
preventSpaces('loginEmail');
preventSpaces('loginPassword');
