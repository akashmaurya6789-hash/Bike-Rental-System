// Enhanced JavaScript with premium features and smooth animations

// Global Variables and Configuration
const RideFlowApp = {
    currentBooking: {
        bike: '',
        price: 0,
        image: '',
        features: []
    },
    
    bikesPricing: {
        'Tesla E-Bike Pro': { price: 399, originalPrice: 499, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop' },
        'Mountain Beast X7': { price: 249, originalPrice: 299, image: 'https://images.unsplash.com/photo-1544191696-15693072f5e8?w=400&h=300&fit=crop' },
        'Urban Cruiser Elite': { price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop' },
        'Hybrid Power Max': { price: 299, originalPrice: 359, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop' },
        'Sport Racer Pro': { price: 499, originalPrice: 599, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop' },
        'Family Comfort Ride': { price: 179, originalPrice: 219, image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop' }
    },
    
    currentStep: 1,
    maxSteps: 3,
    theme: localStorage.getItem('theme') || 'light',
    fabOpen: false,
    chatOpen: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showPreloader();
    setupTheme();
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupModals();
    setupFormHandlers();
    setupSearchFunctionality();
    setupMapFeatures();
    setupBikeCategories();
    setupPricingToggle();
    setupFloatingButtons();
    setupChatWidget();
    setupNotificationSystem();
    setupBackToTop();
    animateStats();
    startRealTimeUpdates();
    setupKeyboardShortcuts();
    
    // Hide preloader after initialization
    setTimeout(hidePreloader, 2000);
}

// Preloader Functions
function showPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'flex';
    }
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// Theme Management
function setupTheme() {
    document.documentElement.setAttribute('data-theme', RideFlowApp.theme);
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = RideFlowApp.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    RideFlowApp.theme = RideFlowApp.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', RideFlowApp.theme);
    localStorage.setItem('theme', RideFlowApp.theme);
    
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = RideFlowApp.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    showNotification(`Switched to ${RideFlowApp.theme} theme`, 'success');
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                     // Reset hamburger icon
                     const spans = hamburger.querySelectorAll('span');
                     spans.forEach(span => {
                         span.style.transform = 'none';
                         span.style.opacity = '1';
                     });
                }
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}


// Scroll Effects and Animations
function setupScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add animation class if it has one
                const animationClass = entry.target.dataset.animation;
                if (animationClass) {
                    entry.target.classList.add(animationClass);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with AOS attributes
    document.querySelectorAll('[data-aos]').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        const delay = el.dataset.aosDelay || 0;
        el.style.transition = `opacity 0.8s ease ${delay / 1000}s, transform 0.8s ease ${delay / 1000}s`;
        observer.observe(el);
    });
}

function setupAnimations() {
    // Animate floating elements
    document.querySelectorAll('.floating-icon').forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Statistics Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            obj.innerHTML = currentValue.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toLocaleString();
            }
        };
        window.requestAnimationFrame(step);
    };

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Search Functionality
function setupSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    const pickupDateInput = document.getElementById('pickup-date');
    const pickupTimeInput = document.getElementById('pickup-time');

    // Set default date and time
    if (pickupDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        pickupDateInput.value = tomorrow.toISOString().split('T')[0];
        pickupDateInput.min = today.toISOString().split('T')[0];
    }

    if (pickupTimeInput) {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        pickupTimeInput.value = currentTime;
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performAdvancedSearch);
    }
}

async function performAdvancedSearch() {
    const pickupLocation = document.getElementById('pickup-location')?.value;
    const pickupDate = document.getElementById('pickup-date')?.value;
    const pickupTime = document.getElementById('pickup-time')?.value;
    const bikeType = document.getElementById('bike-type')?.value || 'Any';

    if (!pickupLocation || !pickupDate || !pickupTime) {
        showNotification('Please fill all search criteria', 'warning');
        return;
    }

    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Searching...</span>';
    searchBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate random results
        const availableBikes = Math.floor(Math.random() * 15) + 5;
        const nearbyStations = [
            { name: `${pickupLocation} - Hub A`, distance: '0.2 km', bikes: Math.floor(Math.random() * 8) + 3 },
            { name: `${pickupLocation} - Station B`, distance: '0.5 km', bikes: Math.floor(Math.random() * 6) + 2 },
            { name: `${pickupLocation} - Point C`, distance: '0.8 km', bikes: Math.floor(Math.random() * 10) + 1 }
        ];

        showSearchResults({
            available: true,
            count: availableBikes,
            bikeType: bikeType,
            location: pickupLocation,
            nearbyStations: nearbyStations,
            estimatedPrice: getDynamicPricing(bikeType, 1, pickupTime)
        });

        // Scroll to bikes section with highlight effect
        setTimeout(() => {
            document.getElementById('bikes')?.scrollIntoView({ behavior: 'smooth' });
            highlightAvailableBikes();
        }, 1000);

    } catch (error) {
        showNotification('Search failed. Please try again.', 'error');
    } finally {
        // Reset search button
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
    }
}

function showSearchResults(results) {
    const modal = createModal('search-results', 'Search Results');
    
    const content = `
        <div class="search-results-content">
            <div class="results-header">
                <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Found ${results.count} ${results.bikeType} bikes!</h3>
                <p>Available in ${results.location}</p>
            </div>
            
            <div class="results-grid">
                <div class="result-card">
                    <h4><i class="fas fa-bicycle"></i> Available Bikes</h4>
                    <div class="result-number">${results.count}</div>
                    <p>Ready to book now</p>
                </div>
                
                <div class="result-card">
                    <h4><i class="fas fa-rupee-sign"></i> Starting Price</h4>
                    <div class="result-number">₹${results.estimatedPrice}</div>
                    <p>Per day</p>
                </div>
                
                <div class="result-card">
                    <h4><i class="fas fa-map-marker-alt"></i> Nearby Stations</h4>
                    <div class="result-number">${results.nearbyStations.length}</div>
                    <p>Pickup locations</p>
                </div>
            </div>
            
            <div class="nearby-list">
                <h4>Nearby Pickup Locations:</h4>
                ${results.nearbyStations.map(station => `
                    <div class="nearby-item">
                        <div class="station-details">
                            <strong>${station.name}</strong>
                            <span>${station.distance} away</span>
                        </div>
                        <div class="bikes-available">
                            <span class="bike-count">${station.bikes}</span>
                            <i class="fas fa-bicycle"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="results-actions">
                <button class="btn-secondary" onclick="closeModal('search-results')">
                    <i class="fas fa-times"></i> Close
                </button>
                <button class="btn-primary" onclick="closeModal('search-results'); document.getElementById('bikes').scrollIntoView({behavior: 'smooth'});">
                    <i class="fas fa-bicycle"></i> View Available Bikes
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = content;
    showModal('search-results');
}

function highlightAvailableBikes() {
    const bikeCards = document.querySelectorAll('.bike-card');
    bikeCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.border = '2px solid var(--primary-color)';
            card.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
            card.style.transform = 'translateY(-5px)';
            
            // Reset after animation
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
                card.style.transform = '';
            }, 3000);
        }, index * 200);
    });
}

// Dynamic Pricing
function getDynamicPricing(bikeType, duration, timeSlot) {
    const basePrices = {
        'Electric Bike': 350,
        'Mountain Bike': 250,
        'City Bike': 200,
        'Hybrid Bike': 300,
        'Sports Bike': 450,
        'Any': 250
    };
    
    let basePrice = basePrices[bikeType] || 250;
    let multiplier = 1;
    
    // Peak hours pricing
    const hour = new Date().getHours();
    if ((hour >= 7 && hour <= 10) || (hour >= 17 && hour <= 20)) {
        multiplier += 0.25; // 25% surge
    }
    
    // Weekend pricing
    const isWeekend = [0, 6].includes(new Date().getDay());
    if (isWeekend) {
        multiplier += 0.15; // 15% weekend surcharge
    }
    
    // Duration discounts
    if (duration >= 7) multiplier -= 0.20; // 20% weekly discount
    else if (duration >= 3) multiplier -= 0.10; // 10% multi-day discount
    
    return Math.round(basePrice * multiplier);
}

// Map Features
function setupMapFeatures() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const markers = document.querySelectorAll('.marker');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Animate markers based on filter
            markers.forEach((marker, index) => {
                setTimeout(() => {
                    marker.style.display = 'flex';
                    marker.classList.add('pulse');
                }, index * 100);
            });
            
            showNotification(`Showing ${filter} bikes on map`, 'info');
        });
    });

    // Map control functions
    window.centerMap = function() {
        showNotification('Map centered to your location', 'info');
        markers.forEach(marker => {
            marker.classList.add('pulse');
        });
    };

    window.toggleMapView = function() {
        showNotification('Map view toggled', 'info');
    };
}

// Bike Categories
function setupBikeCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const bikeCards = document.querySelectorAll('.bike-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter and animate bike cards
            bikeCards.forEach((card, index) => {
                const shouldShow = category === 'all' || card.classList.contains(category);
                
                if (shouldShow) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal System
function setupModals() {
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
}

function createModal(id, title) {
    const existingModal = document.getElementById(id);
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${id}')">&times;</span>
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate modal appearance
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.3s ease';
        }, 10);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if(modal.parentElement) modal.remove();
        }, 300);
    }
}

// Booking System
function openBookingModal(bikeName = '') {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    if (bikeName) {
        RideFlowApp.currentBooking.bike = bikeName;
        const bikeData = RideFlowApp.bikesPricing[bikeName];
        if (bikeData) {
            RideFlowApp.currentBooking.price = bikeData.price;
            RideFlowApp.currentBooking.image = bikeData.image;
            
            // Update modal with bike info
            const selectedBikeName = document.getElementById('selectedBikeName');
            const selectedBikeImage = document.getElementById('selectedBikeImage');
            const selectedBikePrice = document.getElementById('selectedBikePrice');
            
            if (selectedBikeName) selectedBikeName.textContent = bikeName;
            if (selectedBikeImage) selectedBikeImage.src = bikeData.image;
            if (selectedBikePrice) selectedBikePrice.textContent = `₹${bikeData.price}/day`;
        }
    }

    RideFlowApp.currentStep = 1;
    updateBookingStep();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
        modalContent.style.transition = 'all 0.3s ease';
    }, 10);
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function nextStep() {
    if (RideFlowApp.currentStep < RideFlowApp.maxSteps) {
        RideFlowApp.currentStep++;
        updateBookingStep();
    }
}

function prevStep() {
    if (RideFlowApp.currentStep > 1) {
        RideFlowApp.currentStep--;
        updateBookingStep();
    }
}

function updateBookingStep() {
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index + 1 <= RideFlowApp.currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Show/hide step content
    document.querySelectorAll('.booking-step').forEach((step, index) => {
        if (index + 1 === RideFlowApp.currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update step-specific logic
    if (RideFlowApp.currentStep === 2) {
        setupPaymentMethods();
    } else if (RideFlowApp.currentStep === 3) {
        updateConfirmationDetails();
    }
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Update visual state
            paymentMethods.forEach(pm => pm.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

function updateConfirmationDetails() {
    // Update confirmation details with current booking info
    const confirmBikeName = document.getElementById('confirmBikeName');
    const confirmDailyRate = document.getElementById('confirmDailyRate');
    const confirmTotal = document.getElementById('confirmTotal');
    
    if (confirmBikeName) confirmBikeName.textContent = RideFlowApp.currentBooking.bike;
    if (confirmDailyRate) confirmDailyRate.textContent = `₹${RideFlowApp.currentBooking.price}`;
    if (confirmTotal) confirmTotal.textContent = `₹${calculateFinalPrice()}`;
}

function calculatePrice() {
    const durationSelect = document.getElementById('duration');
    const totalAmountInput = document.getElementById('totalAmount');
    const subtotalElement = document.getElementById('subtotal');
    
    if (durationSelect && RideFlowApp.currentBooking.price) {
        const duration = parseInt(durationSelect.value);
        const basePrice = RideFlowApp.currentBooking.price;
        let totalPrice = basePrice * duration;
        
        // Apply discounts
        let discountPercent = 0;
        if (duration >= 30) {
            discountPercent = 25;
        } else if (duration >= 7) {
            discountPercent = 15;
        } else if (duration >= 3) {
            discountPercent = 10;
        }
        
        const discountAmount = Math.round(totalPrice * discountPercent / 100);
        const subtotal = totalPrice - discountAmount;
        const taxes = Math.round(subtotal * 0.08); // 8% tax
        const finalTotal = subtotal + taxes;
        
        // Update UI
        if (subtotalElement) subtotalElement.textContent = `₹${subtotal}`;
        if (totalAmountInput) totalAmountInput.textContent = `₹${finalTotal}`;
        
        // Update discount display
        const discountElement = document.getElementById('discount');
        if (discountElement) {
            discountElement.textContent = discountAmount > 0 ? `-₹${discountAmount}` : '₹0';
        }
        
        // Update duration text
        const durationText = document.getElementById('durationText');
        if (durationText) {
            const durationLabels = {1: '1 day', 3: '3 days', 7: '1 week', 30: '1 month'};
            durationText.textContent = durationLabels[duration] || `${duration} days`;
        }
        
        return finalTotal;
    }
    return 0;
}

function calculateFinalPrice() {
    return calculatePrice() || RideFlowApp.currentBooking.price;
}

// Form Handlers
function setupFormHandlers() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Duration change handler
    const durationSelect = document.getElementById('duration');
    if (durationSelect) {
        durationSelect.addEventListener('change', calculatePrice);
    }

    // Pickup date/time validation
    const pickupDateTime = document.querySelector('input[name="pickupDateTime"]');
    const returnDateTime = document.querySelector('input[name="returnDateTime"]');
    
    if (pickupDateTime) {
        pickupDateTime.addEventListener('change', function() {
            if (returnDateTime) {
                const pickup = new Date(this.value);
                const duration = parseInt(document.getElementById('duration')?.value || 1);
                const returnDate = new Date(pickup);
                returnDate.setDate(returnDate.getDate() + duration);
                returnDateTime.value = returnDate.toISOString().slice(0, 16);
            }
        });
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const bookingData = {
        bike: RideFlowApp.currentBooking.bike,
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        pickupLocation: formData.get('pickupLocation'),
        duration: formData.get('duration'),
        paymentMethod: formData.get('payment'),
        totalAmount: calculateFinalPrice()
    };
    
    if (!validateBookingData(bookingData)) {
        return;
    }
    
    const submitBtn = document.querySelector('.btn-book');
    const originalText = submitBtn.innerHTML;
    
    try {
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Show success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Payment Successful!';
        submitBtn.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            closeBookingModal();
            showBookingConfirmation(bookingData);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
        
    } catch (error) {
        showNotification('Payment failed. Please try again.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function validateBookingData(data) {
    const required = ['bike', 'fullName', 'phone', 'email', 'pickupLocation', 'paymentMethod'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
        showNotification(`Please fill in: ${missing.join(', ')}`, 'warning');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'warning');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number', 'warning');
        return false;
    }
    
    return true;
}

function showBookingConfirmation(bookingData) {
    const bookingId = 'RF' + Date.now().toString().slice(-6);
    
    const modal = createModal('booking-confirmation', 'Booking Confirmed!');
    
    const content = `
        <div class="confirmation-success">
            <div class="success-animation">
                <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 4rem; margin-bottom: 1rem;"></i>
            </div>
            <h3 style="color: var(--success-color); margin-bottom: 1rem;">Booking Successful!</h3>
            <p style="color: var(--text-light); margin-bottom: 2rem;">Your ${bookingData.bike} has been reserved and payment processed.</p>
            
            <div class="booking-details-card">
                <div class="detail-row">
                    <strong>Booking ID:</strong>
                    <span style="color: var(--primary-color); font-weight: bold;">${bookingId}</span>
                </div>
                <div class="detail-row">
                    <strong>Bike Model:</strong>
                    <span>${bookingData.bike}</span>
                </div>
                <div class="detail-row">
                    <strong>Duration:</strong>
                    <span>${bookingData.duration} day(s)</span>
                </div>
                <div class="detail-row">
                    <strong>Total Amount:</strong>
                    <span style="color: var(--success-color); font-weight: bold;">₹${bookingData.totalAmount}</span>
                </div>
                <div class="detail-row">
                    <strong>Pickup Location:</strong>
                    <span>${bookingData.pickupLocation}</span>
                </div>
            </div>
            
            <div class="next-steps">
                <h4>What's Next?</h4>
                <div class="steps-list">
                    <div class="step-item">
                        <i class="fas fa-envelope"></i>
                        <span>Check your email for detailed pickup instructions</span>
                    </div>
                    <div class="step-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>Download our app for easy bike unlock</span>
                    </div>
                    <div class="step-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Arrive at pickup location 10 minutes early</span>
                    </div>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button class="btn-secondary" onclick="closeModal('booking-confirmation')">
                    <i class="fas fa-times"></i> Close
                </button>
                <button class="btn-primary" onclick="downloadBookingReceipt('${bookingId}')">
                    <i class="fas fa-download"></i> Download Receipt
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = content;
    showModal('booking-confirmation');
    
    // Auto-close after 15 seconds
    setTimeout(() => closeModal('booking-confirmation'), 15000);
    
    // Send confirmation email (simulated)
    setTimeout(() => {
        showNotification(`Confirmation email sent to ${bookingData.email}`, 'success');
    }, 2000);
}

function downloadBookingReceipt(bookingId) {
    // Simulate receipt download
    showNotification('Receipt downloaded successfully!', 'success');
    closeModal('booking-confirmation');
}

// Pricing Toggle
function setupPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const hourlyElements = document.querySelectorAll('.hourly');
            const monthlyElements = document.querySelectorAll('.monthly');
            
            hourlyElements.forEach(el => {
                el.style.display = this.checked ? 'none' : 'inline';
            });
            
            monthlyElements.forEach(el => {
                el.style.display = this.checked ? 'inline' : 'none';
            });
            
            const planType = this.checked ? 'monthly' : 'hourly';
            showNotification(`Switched to ${planType} pricing`, 'info');
        });
    }
}

function selectPlan(planType) {
    showNotification(`${planType.charAt(0).toUpperCase() + planType.slice(1)} plan selected!`, 'success');
    // Here you would typically redirect to a signup/payment page
    setTimeout(() => {
        openBookingModal();
    }, 1000);
}

// Floating Action Buttons
function setupFloatingButtons() {
    const fabMain = document.querySelector('.fab-main');
    const fabContainer = document.querySelector('.fab-container');
    
    if (fabMain) {
        fabMain.addEventListener('click', toggleFAB);
    }
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
        if (fabContainer && !fabContainer.contains(e.target) && RideFlowApp.fabOpen) {
            toggleFAB();
        }
    });
}

function toggleFAB() {
    const fabContainer = document.querySelector('.fab-container');
    RideFlowApp.fabOpen = !RideFlowApp.fabOpen;
    
    if (fabContainer) {
        fabContainer.classList.toggle('active', RideFlowApp.fabOpen);
    }
}

// Chat Widget
function setupChatWidget() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', handleChatInput);
    }
}

function openChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.style.display = 'flex';
        RideFlowApp.chatOpen = true;
        
        // Auto-greeting after opening
        setTimeout(() => {
            addChatMessage('bot', 'Hello! How can I help you with your bike rental today?');
        }, 500);
    }
    toggleFAB(); // Close FAB menu
}

function closeChat() {
    const chatWidget = document.getElementById('chatWidget');
    if (chatWidget) {
        chatWidget.style.display = 'none';
        RideFlowApp.chatOpen = false;
    }
}

function handleChatInput(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addChatMessage('bot', botResponse);
        }, 1000);
    }
}

function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${timeString}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost')) {
        return 'Our bikes start from ₹179/day for city bikes and go up to ₹499/day for premium models. Would you like to see our full pricing?';
    } else if (message.includes('book') || message.includes('rent')) {
        return 'I can help you book a bike! What type of bike are you looking for and when do you need it?';
    } else if (message.includes('location') || message.includes('where')) {
        return 'We have bikes available in 150+ cities across India. Which city are you looking for?';
    } else if (message.includes('insurance') || message.includes('safety')) {
        return 'All our rentals include comprehensive insurance and safety gear. Your safety is our priority!';
    } else if (message.includes('app') || message.includes('download')) {
        return 'You can download our app from Google Play Store or Apple App Store for easy booking and bike management!';
    } else if (message.includes('cancel') || message.includes('refund')) {
        return 'You can cancel your booking up to 2 hours before pickup for a full refund. Need help with a cancellation?';
    } else {
        return 'Thanks for your question! Our customer service team is available 24/7 to help you. Is there anything specific about bike rentals I can help you with?';
    }
}

// Emergency Functions
function openEmergency() {
    const modal = createModal('emergency-modal', 'Emergency Assistance');
    
    const content = `
        <div class="emergency-content">
            <div class="emergency-header">
                <i class="fas fa-exclamation-triangle" style="color: var(--error-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3 style="color: var(--error-color);">Emergency Assistance</h3>
                <p>Get immediate help when you need it most</p>
            </div>
            
            <div class="emergency-options">
                <button class="emergency-btn" onclick="callEmergency('112')">
                    <i class="fas fa-phone"></i>
                    <div>
                        <strong>Emergency Services</strong>
                        <span>Call 112 - Police, Fire, Medical</span>
                    </div>
                </button>
                
                <button class="emergency-btn" onclick="callEmergency('roadside')">
                    <i class="fas fa-tools"></i>
                    <div>
                        <strong>Roadside Assistance</strong>
                        <span>Bike breakdown or mechanical issues</span>
                    </div>
                </button>
                
                <button class="emergency-btn" onclick="shareLocation()">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Share Location</strong>
                        <span>Send live location to emergency contacts</span>
                    </div>
                </button>
                
                <button class="emergency-btn" onclick="reportIssue()">
                    <i class="fas fa-flag"></i>
                    <div>
                        <strong>Report Safety Issue</strong>
                        <span>Report unsafe conditions or incidents</span>
                    </div>
                </button>
            </div>
            
            <div class="emergency-contacts">
                <h4>Quick Contacts</h4>
                <div class="contact-list">
                    <div class="contact-item">
                        <i class="fas fa-headset"></i>
                        <span>24/7 Support: +91 9999-888-777</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>Emergency: emergency@rideflow.com</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = content;
    showModal('emergency-modal');
    toggleFAB(); // Close FAB menu
}

function callEmergency(type) {
    if (type === '112') {
        showNotification('Connecting to emergency services...', 'error');
        // In a real app, this would actually initiate a call
    } else if (type === 'roadside') {
        showNotification('Roadside assistance requested. ETA: 15-20 minutes', 'info');
        closeModal('emergency-modal');
    }
}

function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                showNotification('Location shared with emergency contacts', 'success');
                closeModal('emergency-modal');
            },
            function(error) {
                showNotification('Unable to get location. Please try again.', 'warning');
            }
        );
    } else {
        showNotification('Geolocation not supported by this browser', 'warning');
    }
}

function reportIssue() {
    showNotification('Safety issue report form opened', 'info');
    closeModal('emergency-modal');
    // Here you would open a detailed reporting form
}

// Notification System
function setupNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        warning: 'var(--warning-color)',
        info: 'var(--primary-color)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icons[type]}" style="color: ${colors[type]};"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        background: white;
        border: 1px solid var(--border-color);
        border-left: 4px solid ${colors[type]};
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    if (RideFlowApp.theme === 'dark') {
        notification.style.background = '#1e293b';
        notification.style.color = 'white';
    }
    
    container.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
    
    // Remove on click
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Back to Top
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Real-time Updates
function startRealTimeUpdates() {
    // Simulate real-time bike availability updates
    setInterval(() => {
        updateBikeAvailability();
    }, 30000); // Update every 30 seconds

    // Update map markers
    setInterval(() => {
        updateMapMarkers();
    }, 15000); // Update every 15 seconds
}

function updateBikeAvailability() {
    const bikeCards = document.querySelectorAll('.bike-card');
    bikeCards.forEach(card => {
        const statusElement = card.querySelector('.bike-status');
        if (statusElement && Math.random() > 0.8) { // 20% chance to update
            const isAvailable = Math.random() > 0.3;
            const count = Math.floor(Math.random() * 10) + 1;
            
            if (isAvailable) {
                statusElement.className = 'bike-status available';
                statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Available Now';
            } else {
                statusElement.className = 'bike-status limited';
                statusElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> Only ${count} Left`;
            }
        }
    });
}

function updateMapMarkers() {
    const markers = document.querySelectorAll('.marker');
    markers.forEach(marker => {
        if (Math.random() > 0.7) { // 30% chance to update
            const bikeCount = Math.floor(Math.random() * 12) + 1;
            const tooltip = marker.querySelector('.marker-tooltip');
            
            if (tooltip) {
                const locationName = tooltip.textContent.split(' - ')[0];
                tooltip.textContent = `${locationName} - ${bikeCount} bikes available`;
                
                // Update marker color based on availability
                if (bikeCount > 5) {
                    marker.className = 'marker available pulse';
                } else if (bikeCount > 2) {
                    marker.className = 'marker busy pulse';
                } else {
                    marker.className = 'marker unavailable pulse';
                }
            }
        }
    });
}

// Advanced Features
function openQuickView(bikeName) {
    const bikeData = RideFlowApp.bikesPricing[bikeName];
    if (!bikeData) return;
    
    const modal = createModal('quick-view', 'Quick View');
    
    const content = `
        <div class="quick-view-content">
            <div class="bike-preview">
                <img src="${bikeData.image}" alt="${bikeName}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 16px; margin-bottom: 20px;">
                <div class="bike-info-header">
                    <h3>${bikeName}</h3>
                    <div class="price-display">
                        <span class="current-price">₹${bikeData.price}</span>
                        <span class="original-price">₹${bikeData.originalPrice}</span>
                        <span class="period">/day</span>
                    </div>
                </div>
            </div>
            
            <div class="quick-specs">
                <h4>Key Features</h4>
                <div class="specs-grid">
                    <div class="spec-item">
                        <i class="fas fa-bolt"></i>
                        <span>Smart Lock</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>GPS Tracking</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>App Control</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-tools"></i>
                        <span>Free Maintenance</span>
                    </div>
                </div>
            </div>
            
            <div class="availability-info">
                <div class="availability-badge available">
                    <i class="fas fa-check-circle"></i>
                    <span>Available at 8 nearby locations</span>
                </div>
            </div>
            
            <div class="quick-actions">
                <button class="btn-secondary" onclick="closeModal('quick-view')">
                    <i class="fas fa-times"></i> Close
                </button>
                <button class="btn-primary" onclick="closeModal('quick-view'); openBookingModal('${bikeName}');">
                    <i class="fas fa-bicycle"></i> Book Now
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = content;
    showModal('quick-view');
}

function addToWishlist(event, bikeName) {
    // Get current wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('rideflow-wishlist') || '[]');
    
    if (!wishlist.includes(bikeName)) {
        wishlist.push(bikeName);
        localStorage.setItem('rideflow-wishlist', JSON.stringify(wishlist));
        showNotification(`${bikeName} added to wishlist!`, 'success');
        
        // Update wishlist icon
        const wishlistBtn = event.currentTarget;
        if (wishlistBtn) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            wishlistBtn.style.color = 'var(--error-color)';
        }
    } else {
        showNotification(`${bikeName} is already in your wishlist`, 'info');
    }
}

function loadMoreBikes() {
    const bikesGrid = document.querySelector('.bikes-grid');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;
    }
    
    // Simulate loading delay
    setTimeout(() => {
        // In a real app, you would fetch more bikes from an API
        showNotification('All available bikes are already shown', 'info');
        
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Bikes Loaded';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.6';
        }
    }, 2000);
}

// Demo Functions for Features
function demoQRUnlock() {
    const modal = createModal('qr-demo', 'QR Code Scanner Demo');
    
    const content = `
        <div class="qr-demo-content" style="text-align: center; padding: 20px;">
            <div class="qr-scanner-mockup">
                <div style="width: 200px; height: 200px; border: 2px dashed var(--primary-color); margin: 20px auto; display: flex; align-items: center; justify-content: center; border-radius: 16px; background: var(--card-gradient);">
                    <i class="fas fa-qrcode" style="font-size: 80px; color: var(--primary-color);"></i>
                </div>
                <div class="scan-line" style="width: 200px; height: 2px; background: var(--primary-color); margin: 0 auto; animation: pulse 1s infinite;"></div>
            </div>
            <h4>Scanning QR Code...</h4>
            <p>Point your camera at the QR code on the bike</p>
            <div class="demo-progress" style="margin: 20px 0;">
                <div class="progress-bar" style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden;">
                    <div class="progress-fill" style="height: 100%; background: var(--primary-gradient); width: 0%; animation: progressFill 3s ease-in-out;"></div>
                </div>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = content;
    showModal('qr-demo');
    
    // Auto-close after demo
    setTimeout(() => {
        closeModal('qr-demo');
        showNotification('Demo: Bike unlocked successfully!', 'success');
    }, 3500);
}

function demoGPSTracking() {
    showNotification('Opening GPS tracking demo...', 'info');
    // This would open a live tracking interface
}

function demoAIRoute() {
    showNotification('AI route optimization activated!', 'success');
}

function demoSecurityFeatures() {
    showNotification('Security system demo started', 'info');
}

function demoMobileApp() {
    showNotification('Redirecting to app download...', 'info');
}

function demoFitnessAnalytics() {
    showNotification('Opening fitness analytics dashboard...', 'info');
}

function startVirtualTour() {
    showNotification('Starting virtual tour of features...', 'info');
    // This would start an interactive tour of the website
}

// Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('pickup-location')?.focus();
            showNotification('Search shortcut activated', 'info');
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal[style*="display: block"]');
            activeModals.forEach(modal => {
                closeModal(modal.id);
            });
            
            if (RideFlowApp.chatOpen) {
                closeChat();
            }
            
            if (RideFlowApp.fabOpen) {
                toggleFAB();
            }
        }
        
        // Ctrl/Cmd + B for quick booking
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            openBookingModal();
        }
        
        // Ctrl/Cmd + T for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Utility Functions
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function generateBookingId() {
    return 'RF' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('RideFlow App Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker when available
        console.log('Service Worker ready for registration');
    });
}

// Add custom CSS animations dynamically
const customStyles = document.createElement('style');
customStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes progressFill {
        from { width: 0%; }
        to { width: 100%; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        transition: var(--transition);
        color: var(--text-light);
    }
    
    .notification-close:hover {
        background: var(--border-color);
        color: var(--text-color);
    }
    
    .search-results-content {
        text-align: center;
        padding: 20px;
    }
    
    .results-header h3 {
        font-size: 1.5rem;
        color: var(--text-color);
        margin-bottom: 8px;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        margin: 30px 0;
    }
    
    .result-card {
        background: var(--card-gradient);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
    }
    
    .result-card h4 {
        font-size: 14px;
        color: var(--text-light);
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .result-number {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 8px;
    }
    
    .result-card p {
        font-size: 12px;
        color: var(--text-light);
    }
    
    .emergency-btn {
        width: 100%;
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 12px;
        padding: 16px;
        margin: 8px 0;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 16px;
        text-align: left;
    }
    
    .emergency-btn:hover {
        border-color: var(--error-color);
        background: rgba(239, 68, 68, 0.05);
    }
    
    .emergency-btn i {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--error-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    
    .emergency-btn strong {
        color: var(--text-color);
        font-size: 16px;
    }
    
    .emergency-btn span {
        color: var(--text-light);
        font-size: 14px;
    }
`;
document.head.appendChild(customStyles);

// LOGIN CHECK FOR BOOKING


function checkLoginAndBook() {

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {

        alert("Please login first to book a bike.");

        window.location.href = "login.html";

        return;
    }

    alert("You are logged in. Booking can continue.");
}
