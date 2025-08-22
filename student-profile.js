// DOM Elements
const preloader = document.querySelector('.preloader');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const profileNavLinks = document.querySelectorAll('.profile-nav a');
const profileSections = document.querySelectorAll('.profile-section');
const editButtons = document.querySelectorAll('.section-edit');
const editModal = document.getElementById('edit-modal');
const closeModal = document.querySelector('.close-modal');
const cancelEditBtn = document.getElementById('cancel-edit');
const editForm = document.getElementById('edit-form');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference to localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Toggle icon
    if (nav.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Profile Navigation
profileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        profileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section id
        const targetId = link.getAttribute('href').substring(1);
        
        // Hide all sections
        profileSections.forEach(section => section.classList.remove('active'));
        
        // Show the target section
        document.getElementById(targetId).classList.add('active');
        
        // Scroll to top of section on mobile
        if (window.innerWidth < 768) {
            window.scrollTo({
                top: document.getElementById(targetId).offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Edit Modal Functions
function openEditModal() {
    editModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeEditModal() {
    editModal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
}

// Open Edit Modal
editButtons.forEach(button => {
    button.addEventListener('click', openEditModal);
});

// Close Edit Modal
closeModal.addEventListener('click', closeEditModal);
cancelEditBtn.addEventListener('click', closeEditModal);

// Close modal when clicking outside
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Edit Form Submission
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('edit-name').value;
    const dob = document.getElementById('edit-dob').value;
    const phone = document.getElementById('edit-phone').value;
    const email = document.getElementById('edit-email').value;
    const address = document.getElementById('edit-address').value;
    const bio = document.getElementById('edit-bio').value;
    const parentName = document.getElementById('edit-parent-name').value;
    const parentPhone = document.getElementById('edit-parent-phone').value;
    const parentEmail = document.getElementById('edit-parent-email').value;
    const relation = document.getElementById('edit-relation').value;
    
    // Update profile information
    document.getElementById('full-name').textContent = name;
    document.getElementById('student-name').textContent = name.split(' ')[0] + ' ' + name.split(' ')[name.split(' ').length - 1];
    document.getElementById('phone').textContent = phone;
    document.getElementById('email').textContent = email;
    document.getElementById('address').textContent = address;
    document.getElementById('bio').textContent = bio;
    document.getElementById('parent-name').textContent = parentName;
    document.getElementById('parent-phone').textContent = parentPhone;
    document.getElementById('parent-email').textContent = parentEmail;
    
    // Format date for display
    const dateObj = new Date(dob);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('dob').textContent = formattedDate;
    
    // Show success message
    showNotification('Profile updated successfully!', 'success');
    
    // Close modal
    closeEditModal();
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add active class after a small delay (for animation)
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add CSS for notifications
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 300px;
            max-width: calc(100% - 40px);
            z-index: 1000;
            transform: translateX(120%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .notification.active {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification-content i {
            margin-right: 12px;
            font-size: 20px;
        }
        
        .notification.success .notification-content i {
            color: #4caf50;
        }
        
        .notification.error .notification-content i {
            color: #f44336;
        }
        
        .notification.info .notification-content i {
            color: #2196f3;
        }
        
        .notification-content p {
            margin: 0;
            font-size: 14px;
            color: #333;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #999;
            padding: 4px;
            margin-left: 8px;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        .dark-theme .notification {
            background-color: #1a1a2e;
        }
        
        .dark-theme .notification-content p {
            color: #e9ecef;
        }
        
        .dark-theme .notification-close {
            color: #aaa;
        }
        
        .dark-theme .notification-close:hover {
            color: #fff;
        }
    `;
    document.head.appendChild(style);
}

// Add notification styles
addNotificationStyles();

// Print Student Details
document.querySelector('.btn-secondary').addEventListener('click', () => {
    window.print();
});

// Add print styles
function addPrintStyles() {
    const style = document.createElement('style');
    style.media = 'print';
    style.textContent = `
        @media print {
            .header, .footer, .theme-toggle, .profile-nav, .profile-actions, .section-edit {
                display: none !important;
            }
            
            body {
                background-color: white !important;
                color: black !important;
            }
            
            .profile-header, .profile-section {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                break-inside: avoid;
            }
            
            .profile-section {
                display: block !important;
                margin-bottom: 20px !important;
                page-break-inside: avoid;
            }
            
            .main-content {
                padding-top: 0 !important;
            }
            
            .profile-content {
                display: block !important;
            }
            
            .container {
                width: 100% !important;
                max-width: 100% !important;
                padding: 0 !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add print styles
addPrintStyles();

// Add animation to profile sections
function addSectionAnimations() {
    profileSections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Set initial styles
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(section);
    });
}

// Initialize animations
addSectionAnimations();

// Sample student data (for demonstration)
const studentData = {
    name: 'John Alexander Doe',
    indexNumber: 'EH2023001',
    year: 'Year 2',
    room: 'Room A-101',
    status: 'Active',
    dob: '15 June 2001',
    gender: 'Male',
    nationality: 'American',
    phone: '+1 234 567 8900',
    email: 'john.doe@example.com',
    address: '123 Main Street, Anytown, State, 12345',
    bloodGroup: 'O+',
    bio: 'I am a dedicated student pursuing a degree in Computer Science. I enjoy programming, playing basketball, and participating in community service activities. My goal is to become a software engineer after graduation.',
    department: 'Computer Science',
    program: 'Bachelor of Science',
    yearOfStudy: 'Second Year',
    studentId: 'CS20210123',
    admissionDate: 'September 2021',
    graduationDate: 'June 2025',
    gpa: '3.8/4.0',
    advisor: 'Dr. Sarah Johnson',
    achievements: [
        'Dean\'s List (Fall 2021, Spring 2022)',
        'Programming Competition Winner (2022)',
        'Academic Excellence Scholarship'
    ],
    hostelBlock: 'Block A',
    roomNumber: 'A-101',
    roomType: 'Double Occupancy',
    checkInDate: '1 September 2022',
    roommate: 'Michael Smith',
    mealPlan: 'Full Board (3 meals/day)',
    paymentStatus: 'Paid',
    nextPayment: '15 January 2023',
    facilities: ['Wi-Fi', 'Gym', 'Library', 'Dining', 'Recreation', 'Laundry'],
    emergencyContacts: {
        primary: {
            name: 'Robert Doe',
            relation: 'Father',
            phone: '+1 987 654 3210',
            email: 'robert.doe@example.com',
            address: '123 Main Street, Anytown, State, 12345'
        },
        secondary: {
            name: 'Mary Doe',
            relation: 'Mother',
            phone: '+1 876 543 2109',
            email: 'mary.doe@example.com',
            address: '123 Main Street, Anytown, State, 12345'
        },
        guardian: {
            name: 'James Wilson',
            relation: 'Uncle',
            phone: '+1 765 432 1098',
            email: 'james.wilson@example.com',
            address: '456 Oak Avenue, Nearby City, State, 23456'
        }
    }
};

// Function to populate student data
function populateStudentData() {
    // Basic info
    document.getElementById('student-name').textContent = studentData.name.split(' ')[0] + ' ' + studentData.name.split(' ')[studentData.name.split(' ').length - 1];
    document.getElementById('student-index').textContent = studentData.indexNumber;
    document.getElementById('student-year').textContent = studentData.year;
    document.getElementById('student-room').textContent = studentData.room;
    document.getElementById('student-status').textContent = studentData.status;
    
    // Personal info
    document.getElementById('full-name').textContent = studentData.name;
    document.getElementById('dob').textContent = studentData.dob;
    document.getElementById('gender').textContent = studentData.gender;
    document.getElementById('nationality').textContent = studentData.nationality;
    document.getElementById('phone').textContent = studentData.phone;
    document.getElementById('email').textContent = studentData.email;
    document.getElementById('address').textContent = studentData.address;
    document.getElementById('blood-group').textContent = studentData.bloodGroup;
    document.getElementById('bio').textContent = studentData.bio;
    
    // Academic info
    document.getElementById('department').textContent = studentData.department;
    document.getElementById('program').textContent = studentData.program;
    document.getElementById('year-of-study').textContent = studentData.yearOfStudy;
    document.getElementById('student-id').textContent = studentData.studentId;
    document.getElementById('admission-date').textContent = studentData.admissionDate;
    document.getElementById('graduation-date').textContent = studentData.graduationDate;
    document.getElementById('gpa').textContent = studentData.gpa;
    document.getElementById('advisor').textContent = studentData.advisor;
    
    // Achievements
    const achievementsList = document.getElementById('achievements');
    achievementsList.innerHTML = '';
    studentData.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
    
    // Hostel info
    document.getElementById('hostel-block').textContent = studentData.hostelBlock;
    document.getElementById('room-number').textContent = studentData.roomNumber;
    document.getElementById('room-type').textContent = studentData.roomType;
    document.getElementById('check-in-date').textContent = studentData.checkInDate;
    document.getElementById('roommate').textContent = studentData.roommate;
    document.getElementById('meal-plan').textContent = studentData.mealPlan;
    document.getElementById('payment-status').textContent = studentData.paymentStatus;
    document.getElementById('next-payment').textContent = studentData.nextPayment;
    
    // Emergency contacts
    document.getElementById('parent-name').textContent = studentData.emergencyContacts.primary.name;
    document.getElementById('parent-phone').textContent = studentData.emergencyContacts.primary.phone;
    document.getElementById('parent-email').textContent = studentData.emergencyContacts.primary.email;
    document.getElementById('parent-address').textContent = studentData.emergencyContacts.primary.address;
    
    document.getElementById('secondary-name').textContent = studentData.emergencyContacts.secondary.name;
    document.getElementById('secondary-phone').textContent = studentData.emergencyContacts.secondary.phone;
    document.getElementById('secondary-email').textContent = studentData.emergencyContacts.secondary.email;
    document.getElementById('secondary-address').textContent = studentData.emergencyContacts.secondary.address;
    
    document.getElementById('guardian-name').textContent = studentData.emergencyContacts.guardian.name;
    document.getElementById('guardian-phone').textContent = studentData.emergencyContacts.guardian.phone;
    document.getElementById('guardian-email').textContent = studentData.emergencyContacts.guardian.email;
    document.getElementById('guardian-address').textContent = studentData.emergencyContacts.guardian.address;
    
    // Form fields
    document.getElementById('edit-name').value = studentData.name;
    document.getElementById('edit-phone').value = studentData.phone;
    document.getElementById('edit-email').value = studentData.email;
    document.getElementById('edit-address').value = studentData.address;
    document.getElementById('edit-bio').value = studentData.bio;
    document.getElementById('edit-parent-name').value = studentData.emergencyContacts.primary.name;
    document.getElementById('edit-parent-phone').value = studentData.emergencyContacts.primary.phone;
    document.getElementById('edit-parent-email').value = studentData.emergencyContacts.primary.email;
}

// Initialize student data
populateStudentData();