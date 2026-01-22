/* ============================================
   FOLK DANCE COMPETITION - REPUBLIC DAY SPECIAL
   Podar Blossom School, Chakan
   JavaScript Functionality
   ============================================ */

// ========== DOM Elements ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const carouselWrapper = document.querySelector('.carousel-wrapper');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Invitation Video Elements
const invitationVideo = document.getElementById('invitationVideo');
const invitationPlayPause = document.getElementById('invitationPlayPause');
const invitationVolume = document.getElementById('invitationVolume');
const invitationProgressBar = document.getElementById('invitationProgressBar');
const invitationProgressFilled = document.getElementById('invitationProgressFilled');
const invitationPlayIcon = invitationPlayPause?.querySelector('.play-icon');
const invitationPauseIcon = invitationPlayPause?.querySelector('.pause-icon');
const invitationVolumeIcon = invitationVolume?.querySelector('.volume-icon');
const invitationMuteIcon = invitationVolume?.querySelector('.mute-icon');

// Form Elements
const registrationForm = document.getElementById('registrationForm');
const categorySelect = document.getElementById('category');
const groupNameGroup = document.getElementById('groupNameGroup');
const participantsGroup = document.getElementById('participantsGroup');

// ========== State Variables ==========
let currentSlide = 0;
let carouselInterval;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let isInvitationVideoPlaying = false;
let isInvitationVideoMuted = true;

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initCarousel();
    initFormValidation();
    initScrollAnimations();
    initInvitationVideo();
});

// ========== Navbar Functionality ==========
function initNavbar() {
    if (!navbar || !hamburger || !navMenu) {
        console.log('Navbar elements not found, skipping navbar initialization');
        return;
    }
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    if (!navLinks || navLinks.length === 0) return;
    
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ========== Smooth Scroll ==========
function initSmoothScroll() {
    if (!navLinks || navLinks.length === 0) {
        console.log('Navigation links not found, skipping smooth scroll initialization');
        return;
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========== Carousel Functionality ==========
function initCarousel() {
    if (!carouselWrapper || !carouselPrev || !carouselNext || !carouselDots) {
        console.log('Carousel elements not found, skipping carousel initialization');
        return;
    }
    
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
        console.log('No carousel slides found, skipping carousel initialization');
        return;
    }

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }

    // Previous button
    carouselPrev.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetCarouselInterval();
    });

    // Next button
    carouselNext.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetCarouselInterval();
    });

    // Auto-play carousel
    startCarouselInterval();

    // Pause on hover
    const carouselContainer = carouselWrapper.parentElement;
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        startCarouselInterval();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + 50) {
            goToSlide(currentSlide - 1);
        }
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = slides.length;

    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlide) {
            dot.classList.add('active');
        }
    });

    // Update wrapper position
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function startCarouselInterval() {
    carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
}

// ========== Invitation Video ==========
function initInvitationVideo() {
    if (!invitationVideo) {
        console.log('Invitation video not found, skipping initialization');
        return;
    }

    console.log('🎬 Initializing Invitation Video...');

    // Set up video event listeners
    invitationVideo.addEventListener('loadeddata', () => {
        console.log('✅ Invitation video loaded successfully');
        updateInvitationPlayPauseButton();
        updateInvitationVolumeButton();
    });

    invitationVideo.addEventListener('error', (e) => {
        console.error('❌ Invitation video error:', e);
    });

    invitationVideo.addEventListener('canplay', () => {
        console.log('📹 Invitation video can play');
        // Try to autoplay muted video
        const playPromise = invitationVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isInvitationVideoPlaying = true;
                updateInvitationPlayPauseButton();
                console.log('✅ Invitation video started playing');
            }).catch(error => {
                console.log('❌ Invitation video autoplay blocked:', error);
                isInvitationVideoPlaying = false;
                updateInvitationPlayPauseButton();
                // Add click listener to start video
                document.addEventListener('click', startInvitationVideo, { once: true });
                document.addEventListener('touchstart', startInvitationVideo, { once: true });
            });
        }
    });

    invitationVideo.addEventListener('playing', () => {
        isInvitationVideoPlaying = true;
        updateInvitationPlayPauseButton();
        console.log('▶️ Invitation video is playing');
    });

    invitationVideo.addEventListener('pause', () => {
        isInvitationVideoPlaying = false;
        updateInvitationPlayPauseButton();
        console.log('⏸️ Invitation video paused');
    });

    invitationVideo.addEventListener('timeupdate', updateInvitationProgress);

    // Control event listeners
    invitationPlayPause?.addEventListener('click', toggleInvitationVideo);
    invitationVolume?.addEventListener('click', toggleInvitationVolume);
    invitationProgressBar?.addEventListener('click', seekInvitationVideo);

    // Try to load video if not already loaded
    if (invitationVideo.readyState === 0) {
        invitationVideo.load();
    }

    // Force autoplay after delay
    setTimeout(() => {
        if (!isInvitationVideoPlaying && invitationVideo.readyState >= 2) {
            console.log('🔄 Attempting invitation video autoplay after delay...');
            startInvitationVideo();
        }
    }, 1000);
}

function startInvitationVideo() {
    if (invitationVideo && invitationVideo.paused && invitationVideo.readyState >= 2) {
        invitationVideo.play().then(() => {
            isInvitationVideoPlaying = true;
            updateInvitationPlayPauseButton();
            console.log('Invitation video started after user interaction');
        }).catch(error => {
            console.log('Still could not play invitation video:', error);
        });
    }
}

function toggleInvitationVideo() {
    if (!invitationVideo) return;
    
    if (isInvitationVideoPlaying) {
        invitationVideo.pause();
        isInvitationVideoPlaying = false;
        console.log('Invitation video paused');
    } else {
        invitationVideo.play().then(() => {
            isInvitationVideoPlaying = true;
            console.log('Invitation video playing');
        }).catch(error => {
            console.error('Error playing invitation video:', error);
        });
    }
    updateInvitationPlayPauseButton();
}

function toggleInvitationVolume() {
    if (!invitationVideo) return;
    
    isInvitationVideoMuted = !isInvitationVideoMuted;
    invitationVideo.muted = isInvitationVideoMuted;
    updateInvitationVolumeButton();
    console.log('Invitation video muted:', isInvitationVideoMuted);
}

function updateInvitationPlayPauseButton() {
    if (invitationPlayIcon && invitationPauseIcon) {
        if (isInvitationVideoPlaying) {
            invitationPlayIcon.style.display = 'none';
            invitationPauseIcon.style.display = 'block';
        } else {
            invitationPlayIcon.style.display = 'block';
            invitationPauseIcon.style.display = 'none';
        }
    }
}

function updateInvitationVolumeButton() {
    if (invitationVolumeIcon && invitationMuteIcon) {
        if (isInvitationVideoMuted) {
            invitationVolumeIcon.style.display = 'none';
            invitationMuteIcon.style.display = 'block';
        } else {
            invitationVolumeIcon.style.display = 'block';
            invitationMuteIcon.style.display = 'none';
        }
    }
}

function updateInvitationProgress() {
    if (!invitationVideo || !invitationProgressFilled) return;
    
    const progress = (invitationVideo.currentTime / invitationVideo.duration) * 100;
    invitationProgressFilled.style.width = progress + '%';
}

function seekInvitationVideo(e) {
    if (!invitationVideo || !invitationProgressBar) return;
    
    const rect = invitationProgressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    invitationVideo.currentTime = pos * invitationVideo.duration;
}

// ========== Form Validation & Submission ==========
function initFormValidation() {
    if (!categorySelect) {
        console.log('Category select not found, skipping form validation');
        return;
    }
    
    // Show/hide group fields based on category
    categorySelect.addEventListener('change', () => {
        if (categorySelect.value === 'group') {
            if (groupNameGroup) groupNameGroup.style.display = 'block';
            if (participantsGroup) participantsGroup.style.display = 'block';
            const groupNameField = document.getElementById('groupName');
            const participantsField = document.getElementById('participants');
            if (groupNameField) groupNameField.setAttribute('required', 'required');
            if (participantsField) participantsField.setAttribute('required', 'required');
        } else {
            if (groupNameGroup) groupNameGroup.style.display = 'none';
            if (participantsGroup) participantsGroup.style.display = 'none';
            const groupNameField = document.getElementById('groupName');
            const participantsField = document.getElementById('participants');
            if (groupNameField) {
                groupNameField.removeAttribute('required');
                groupNameField.value = '';
            }
            if (participantsField) {
                participantsField.removeAttribute('required');
                participantsField.value = '';
            }
        }
    });

    // Real-time validation
    if (registrationForm) {
        const formInputs = registrationForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Form submission
        registrationForm.addEventListener('submit', handleFormSubmit);
    }
}

function validateField(field) {
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}Error`);
    let isValid = true;
    let errorMessage = '';

    // Remove previous error styling
    field.classList.remove('error');

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Specific validations
    if (field.value.trim()) {
        switch (fieldId) {
            case 'contactNumber':
                const phonePattern = /^[0-9]{10}$/;
                if (!phonePattern.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit mobile number';
                }
                break;
            
            case 'participants':
                const participants = parseInt(field.value);
                if (participants < 2) {
                    isValid = false;
                    errorMessage = 'Group must have at least 2 participants';
                }
                break;
            
            case 'studentName':
            case 'parentTeacherName':
            case 'groupName':
                const namePattern = /^[a-zA-Z\s]{2,50}$/;
                if (!namePattern.test(field.value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name (2-50 characters, letters only)';
                }
                break;
        }
    }

    // Display error
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    } else {
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    return isValid;
}

function validateForm() {
    const formInputs = registrationForm.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    formInputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    // Validate checkbox
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');
    if (!termsCheckbox.checked) {
        isFormValid = false;
        if (termsError) {
            termsError.textContent = 'You must agree to the terms and conditions';
        }
    } else {
        if (termsError) {
            termsError.textContent = '';
        }
    }

    return isFormValid;
}

function handleFormSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
        // Collect form data
        const formData = {
            studentName: document.getElementById('studentName').value.trim(),
            classDivision: document.getElementById('classDivision').value.trim(),
            category: document.getElementById('category').value,
            groupName: document.getElementById('groupName').value.trim() || null,
            folkDanceType: document.getElementById('folkDanceType').value.trim(),
            participants: document.getElementById('participants').value || null,
            contactNumber: document.getElementById('contactNumber').value.trim(),
            parentTeacherName: document.getElementById('parentTeacherName').value.trim(),
            submittedAt: new Date().toISOString()
        };

        // Save to localStorage
        saveRegistrationToLocalStorage(formData);

        // Show success toast
        showToast('Registration submitted successfully! We will contact you soon.', 'success');

        // Reset form
        registrationForm.reset();
        groupNameGroup.style.display = 'none';
        participantsGroup.style.display = 'none';

        // Remove all error states
        const errorMessages = registrationForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
        const errorInputs = registrationForm.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));

        // Scroll to top of form
        registrationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        showToast('Please fill all required fields correctly.', 'error');
        // Scroll to first error
        const firstError = registrationForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
}

function saveRegistrationToLocalStorage(data) {
    try {
        // Get existing registrations
        let registrations = JSON.parse(localStorage.getItem('folkDanceRegistrations') || '[]');
        
        // Add new registration
        registrations.push(data);
        
        // Save back to localStorage
        localStorage.setItem('folkDanceRegistrations', JSON.stringify(registrations));
        
        console.log('Registration saved successfully');
    } catch (error) {
        console.error('Error saving registration:', error);
        showToast('Error saving registration. Please try again.', 'error');
    }
}

// ========== Toast Notification ==========
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // Update toast styling based on type
    toast.className = 'toast';
    if (type === 'error') {
        toast.style.background = '#e74c3c';
    } else if (type === 'info') {
        toast.style.background = '#3498db';
    } else {
        toast.style.background = '#138808'; // Green for success
    }
    
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.detail-card, .rule-item, .award-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== Utility Functions ==========
// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', handleScroll);

// ========== Error Handling ==========
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ========== Console Welcome Message ==========
console.log('%c🎉 LOK TARANG - Folk Dance Competition 🎉', 'color: #FF9933; font-size: 20px; font-weight: bold;');
console.log('%cPodar Blossom School, Chakan', 'color: #138808; font-size: 14px;');
console.log('%cEvent Date: 26 January 2026', 'color: #000080; font-size: 12px;');

