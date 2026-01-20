// Profile Page JavaScript

// Check if user is logged in
function checkAuth() {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    
    if (!session) {
        // Not logged in, redirect to login page
        window.location.href = 'login.html';
        return null;
    }
    
    return JSON.parse(session);
}

// Load user data
function loadUserData() {
    const sessionData = checkAuth();
    if (!sessionData) return;
    
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
        // Update welcome banner
        if (document.getElementById('welcomeName')) {
            document.getElementById('welcomeName').textContent = userData.name;
        }
        
        // Update sidebar
        document.getElementById('sidebarUserName').textContent = userData.name;
        document.getElementById('sidebarUserEmail').textContent = userData.email;
        
        // Update profile overview
        if (document.getElementById('profileOverviewName')) {
            document.getElementById('profileOverviewName').textContent = userData.name;
            document.getElementById('profileOverviewEmail').textContent = userData.email;
        }
        
        // Generate member ID from email (simple hash)
        const memberId = Math.abs(userData.email.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0)) % 10000;
        document.getElementById('profileMemberId').textContent = memberId;
        
        // Set sponsor ID
        document.getElementById('profileSponsorId').textContent = userData.referral || '-';
        
        // Format joining date
        if (userData.createdAt) {
            const date = new Date(userData.createdAt);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            document.getElementById('profileJoiningDate').textContent = formattedDate;
        }
        
        // Update edit form
        document.getElementById('editName').value = userData.name;
        document.getElementById('editEmail').value = userData.email;
        document.getElementById('editMobile').value = userData.mobile;
        
        // Update personal details section
        if (document.getElementById('personalName')) {
            document.getElementById('personalName').textContent = userData.name;
            document.getElementById('personalEmail').textContent = userData.email;
            document.getElementById('personalMobile').textContent = userData.mobile;
            if (userData.createdAt) {
                const date = new Date(userData.createdAt);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
                document.getElementById('personalJoining').textContent = formattedDate;
            }
        }
        
        // Update welcome letter section
        if (document.getElementById('welcomeLetterName')) {
            document.getElementById('welcomeLetterName').textContent = userData.name;
            document.getElementById('welcomeLetterIboId').textContent = memberId;
            if (userData.createdAt) {
                const date = new Date(userData.createdAt);
                const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                document.getElementById('welcomeLetterDoj').textContent = formattedDate;
            }
        }
        
        // Update share link
        document.getElementById('shareLink').value = `https://emegatask.com?ref=${memberId}`;
        if (document.getElementById('dashboardShareLink')) {
            document.getElementById('dashboardShareLink').value = `https://emegatask.com?ref=${memberId}`;
        }
    }
}

// Copy dashboard share link
function copyDashboardLink() {
    const shareLinkInput = document.getElementById('dashboardShareLink');
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(shareLinkInput.value).then(() => {
        showNotification('Link copied to clipboard!');
    }).catch(() => {
        showNotification('Link copied to clipboard!');
    });
}

// Expandable menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuGroups = document.querySelectorAll('.sidebar-menu-group');
    
    menuGroups.forEach(group => {
        const menuItem = group.querySelector('.sidebar-menu-item');
        const submenu = group.querySelector('.sidebar-submenu');
        const toggleIcon = menuItem.querySelector('.toggle-icon');
        
        menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle submenu
            submenu.classList.toggle('hidden');
            submenu.classList.toggle('show');
            
            // Rotate icon
            toggleIcon.classList.toggle('rotated');
            
            // If submenu is being opened, show the first section
            if (submenu.classList.contains('show')) {
                const firstSubmenuItem = submenu.querySelector('.sidebar-submenu-item');
                if (firstSubmenuItem) {
                    const sectionName = firstSubmenuItem.getAttribute('data-section');
                    showSection(sectionName);
                }
            }
        });
    });
    
    loadUserData();
});

// Section Navigation
const menuItems = document.querySelectorAll('.sidebar-menu-item[data-section]');
const submenuItems = document.querySelectorAll('.sidebar-submenu-item[data-section]');
const sections = document.querySelectorAll('.section-content');

// Function to show a section
function showSection(sectionName) {
    // Hide all sections
    sections.forEach(section => section.classList.add('hidden'));
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Update active states for submenu items
    submenuItems.forEach(item => item.classList.remove('active'));
    const activeSubmenuItem = document.querySelector(`.sidebar-submenu-item[data-section="${sectionName}"]`);
    if (activeSubmenuItem) {
        activeSubmenuItem.classList.add('active');
    }
}

// Handle main menu items (non-expandable)
menuItems.forEach(item => {
    // Skip items that are part of expandable groups
    if (!item.closest('.sidebar-menu-group')) {
        item.addEventListener('click', () => {
            const sectionName = item.getAttribute('data-section');
            
            // Remove active class from all menu items
            menuItems.forEach(mi => {
                if (!mi.closest('.sidebar-menu-group')) {
                    mi.classList.remove('active');
                }
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Clear submenu active states
            submenuItems.forEach(si => si.classList.remove('active'));
            
            showSection(sectionName);
        });
    }
});

// Handle submenu items
submenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionName = item.getAttribute('data-section');
        
        // Remove active from main menu items
        menuItems.forEach(mi => {
            if (!mi.closest('.sidebar-menu-group')) {
                mi.classList.remove('active');
            }
        });
        
        showSection(sectionName);
    });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
        localStorage.removeItem('session');
        sessionStorage.removeItem('session');
        
        // Show notification
        showNotification('Logged out successfully!');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
});

// Copy share link
function copyShareLink() {
    const shareLinkInput = document.getElementById('shareLink');
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(shareLinkInput.value).then(() => {
        showNotification('Link copied to clipboard!');
    }).catch(() => {
        showNotification('Link copied to clipboard!');
    });
}

// Edit Profile Form
document.getElementById('editProfileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const mobile = document.getElementById('editMobile').value.trim();
    
    // Validate
    if (!name || !email || !mobile) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Get existing user data
    const userData = JSON.parse(localStorage.getItem('user'));
    
    // Update user data
    userData.name = name;
    userData.email = email;
    userData.mobile = mobile;
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Update session
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    if (session) {
        const sessionData = JSON.parse(session);
        sessionData.name = name;
        sessionData.email = email;
        
        if (localStorage.getItem('session')) {
            localStorage.setItem('session', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('session', JSON.stringify(sessionData));
        }
    }
    
    // Reload user data
    loadUserData();
    
    showNotification('Profile updated successfully!');
    
    // Switch back to home section
    setTimeout(() => {
        document.querySelector('.sidebar-menu-item[data-section="home"]').click();
    }, 1500);
});

// Change Password Form
document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('user'));
    
    // Validate current password
    if (currentPassword !== userData.password) {
        showNotification('Current password is incorrect', 'error');
        return;
    }
    
    // Validate new password
    if (newPassword.length < 6) {
        showNotification('New password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }
    
    // Update password
    userData.password = newPassword;
    localStorage.setItem('user', JSON.stringify(userData));
    
    showNotification('Password changed successfully!');
    
    // Clear form
    document.getElementById('changePasswordForm').reset();
    
    // Switch back to home section
    setTimeout(() => {
        document.querySelector('.sidebar-menu-item[data-section="home"]').click();
    }, 1500);
});

// Billing Form
if (document.getElementById('billingForm')) {
    document.getElementById('billingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Billing address saved successfully!');
    });
}

// Show notification function
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

// Upload profile picture function
function uploadProfilePicture() {
    const fileInput = document.getElementById('profilePictureUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file first', 'error');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }
    
    // In a real application, you would upload this to a server
    // For now, we'll just show a success message
    showNotification('Profile picture uploaded successfully!');
    fileInput.value = '';
}

// Print card function
function printCard() {
    const quantity = document.getElementById('printQuantity').value;
    
    if (quantity <= 0) {
        showNotification('Please enter a valid quantity', 'error');
        return;
    }
    
    // In a real application, this would trigger a print dialog
    // For now, we'll just show a success message
    showNotification(`Print request for ${quantity} card(s) submitted successfully!`);
    
    // Open print dialog for the welcome letter section
    window.print();
}

