/**
 * YES2HEALTH BEAUTY - Main JavaScript
 * Premium Quantum Energy Landing Page
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 800);
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION LINK
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function(element) {
        animationObserver.observe(element);
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialTrack = document.getElementById('testimonials-track');
    const testimonialPrev = document.getElementById('testimonial-prev');
    const testimonialNext = document.getElementById('testimonial-next');
    const testimonialDots = document.querySelectorAll('#testimonial-dots .slider-dot');

    if (testimonialTrack) {
        let testimonialIndex = 0;
        const testimonialCards = testimonialTrack.querySelectorAll('.testimonial-card');
        const totalTestimonials = testimonialCards.length;

        function updateTestimonialSlider() {
            testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

            // Update dots
            testimonialDots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === testimonialIndex);
            });
        }

        function nextTestimonial() {
            testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
            updateTestimonialSlider();
        }

        function prevTestimonial() {
            testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
            updateTestimonialSlider();
        }

        if (testimonialNext) {
            testimonialNext.addEventListener('click', nextTestimonial);
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', prevTestimonial);
        }

        // Dot navigation
        testimonialDots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                testimonialIndex = parseInt(this.dataset.index);
                updateTestimonialSlider();
            });
        });

        // Auto-slide testimonials
        let testimonialAutoSlide = setInterval(nextTestimonial, 5000);

        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            clearInterval(testimonialAutoSlide);
        });

        testimonialTrack.addEventListener('mouseleave', function() {
            testimonialAutoSlide = setInterval(nextTestimonial, 5000);
        });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextTestimonial();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevTestimonial();
            }
        }
    }

    // ============================================
    // BENEFITS SLIDER (Desktop Only)
    // ============================================
    const benefitsTrack = document.getElementById('benefits-track');
    const benefitPrev = document.getElementById('benefit-prev');
    const benefitNext = document.getElementById('benefit-next');
    const benefitDots = document.querySelectorAll('#benefit-dots .slider-dot');

    if (benefitsTrack) {
        let benefitIndex = 0;
        const benefitCards = benefitsTrack.querySelectorAll('.benefit-card');
        const totalBenefits = benefitCards.length;

        function isMobileView() {
            return window.innerWidth <= 768;
        }

        function updateBenefitsSlider() {
            if (!isMobileView()) {
                benefitsTrack.style.transform = `translateX(-${benefitIndex * 100}%)`;
            } else {
                benefitsTrack.style.transform = 'none';
            }

            // Update dots
            benefitDots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === benefitIndex);
            });
        }

        function nextBenefit() {
            if (!isMobileView()) {
                benefitIndex = (benefitIndex + 1) % totalBenefits;
                updateBenefitsSlider();
            }
        }

        function prevBenefit() {
            if (!isMobileView()) {
                benefitIndex = (benefitIndex - 1 + totalBenefits) % totalBenefits;
                updateBenefitsSlider();
            }
        }

        if (benefitNext) {
            benefitNext.addEventListener('click', nextBenefit);
        }

        if (benefitPrev) {
            benefitPrev.addEventListener('click', prevBenefit);
        }

        // Dot navigation
        benefitDots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                if (!isMobileView()) {
                    benefitIndex = parseInt(this.dataset.index);
                    updateBenefitsSlider();
                }
            });
        });

        // Auto-slide benefits (desktop only)
        let benefitAutoSlide = setInterval(function() {
            if (!isMobileView()) {
                nextBenefit();
            }
        }, 4000);

        // Pause on hover
        benefitsTrack.addEventListener('mouseenter', function() {
            clearInterval(benefitAutoSlide);
        });

        benefitsTrack.addEventListener('mouseleave', function() {
            benefitAutoSlide = setInterval(function() {
                if (!isMobileView()) {
                    nextBenefit();
                }
            }, 4000);
        });

        // Handle window resize
        window.addEventListener('resize', updateBenefitsSlider);
    }

    // ============================================
    // FORM SUBMISSION (Handled by Formspree)
    // ============================================
    // Form submission is now handled by Formspree Ajax library
    // The form will submit to your email automatically

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 18px 30px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #1a6b3c 0%, #0d4a29 100%)' : '#e74c3c'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            animation: slideIn 0.4s ease;
            font-weight: 500;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() {
                notification.remove();
            }, 300);
        });

        setTimeout(function() {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // ============================================
    // PARALLAX EFFECT FOR FLOATING SHAPES
    // ============================================
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach(function(shape, index) {
            const speed = (index + 1) * 15;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================
    // IMAGE GALLERY LIGHTBOX
    // ============================================
    const productImages = document.querySelectorAll('.product-image img, .spray-images img, .about-image img');

    productImages.forEach(function(img) {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                cursor: zoom-out;
                animation: fadeIn 0.3s ease;
            `;

            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 12px;
                box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
            `;

            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                color: #fff;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10002;
                transition: color 0.3s;
            `;
            closeBtn.onmouseover = function() { this.style.color = 'var(--primary-gold)'; };
            closeBtn.onmouseout = function() { this.style.color = '#fff'; };
            
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            lightbox.addEventListener('click', function() {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(function() {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }, 300);
            });

            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    lightbox.click();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });

    // Add fade animation styles
    const fadeStyles = document.createElement('style');
    fadeStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeStyles);

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.createElement('a');
    backToTop.href = '#home';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
    `;
    backToTop.style.cssText = `
        position: fixed;
        bottom: 110px;
        right: 35px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a6b3c 0%, #0d4a29 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 8px 30px rgba(26, 107, 60, 0.4);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // ============================================
    // PRODUCT CARDS STAGGER ANIMATION
    // ============================================
    const productCards = document.querySelectorAll('.product-card');

    const productObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        productObserver.observe(card);
    });

    // ============================================
    // SMOOTH REVEAL FOR BENEFITS
    // ============================================
    const benefitCards = document.querySelectorAll('.benefit-card');

    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    benefitCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.7s ease';
        benefitObserver.observe(card);
    });

    // ============================================
    // ENERGY PARTICLES ANIMATION
    // ============================================
    const particlesContainer = document.getElementById('particles-container');

    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random particle type - mostly gold for subtle effect
            const types = ['particle-gold', 'particle-gold', 'particle-white'];
            particle.classList.add(types[Math.floor(Math.random() * types.length)]);

            // Smaller size for subtle effect
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random position
            particle.style.left = Math.random() * 100 + '%';

            // Slower animation for subtlety
            const duration = Math.random() * 15 + 12;
            particle.style.animationDuration = duration + 's';

            // Random delay
            particle.style.animationDelay = Math.random() * 8 + 's';

            particlesContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(function() {
                particle.remove();
            }, (duration + 8) * 1000);
        }

        // Create fewer initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 300);
        }

        // Create particles less frequently for subtlety
        setInterval(createParticle, 800);
    }

    (function () {
        const modal    = document.getElementById('video-modal');
        const video    = document.getElementById('product-video');
        const openBtn  = document.getElementById('open-video-modal');
        const closeBtn = document.getElementById('close-video-modal');
        const backdrop = document.getElementById('video-modal-backdrop');

        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            video.play();
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            video.pause();
            video.currentTime = 0;
        }

        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    })();

    // ============================================
    // INTERACTIVE ORB EFFECT
    // ============================================
    const orbs = document.querySelectorAll('.orb');

    if (orbs.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            orbs.forEach(function(orb, index) {
                const speed = (index + 1) * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ============================================
    // PURCHASE MODAL LOGIC
    // ============================================
    const purchaseModal = document.getElementById('purchase-modal');
    const purchasePriceInput = document.getElementById('purchase-price');
    const closePurchaseModal = document.getElementById('close-purchase-modal');
    const purchaseBackdrop = document.getElementById('purchase-modal-backdrop');
    const orderBtns = document.querySelectorAll('.order-btn');
    const shopNowBtn = document.getElementById('shop-now-cta');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const calcTotalPrice = document.getElementById('calc-total-price');
    const productCheckboxes = document.querySelectorAll('.product-checkbox');
    const productQuantities = document.querySelectorAll('.product-qty');
    
    function formatNaira(amount) {
        return '\u20A6' + amount.toLocaleString('en-NG');
    }

    function updateTotalPrice() {
        let total = 0;
        
        productCheckboxes.forEach((cb, index) => {
            const qtyInput = productQuantities[index];
            if (cb.checked) {
                const price = parseInt(cb.getAttribute('data-price'), 10) || 0;
                const qty = parseInt(qtyInput.value, 10) || 1;
                total += price * qty;
            }
        });
        
        if (total > 0) {
            totalPriceDisplay.style.display = 'block';
            calcTotalPrice.textContent = formatNaira(total);
            purchasePriceInput.value = formatNaira(total);
        } else {
            totalPriceDisplay.style.display = 'none';
            purchasePriceInput.value = '';
        }
    }

    productCheckboxes.forEach((cb, index) => {
        cb.addEventListener('change', function() {
            const qtyInput = productQuantities[index];
            if (this.checked) {
                qtyInput.disabled = false;
                qtyInput.style.display = 'block';
            } else {
                qtyInput.disabled = true;
                qtyInput.style.display = 'none';
            }
            updateTotalPrice();
        });
    });

    productQuantities.forEach(qtyInput => {
        qtyInput.addEventListener('input', updateTotalPrice);
        qtyInput.addEventListener('change', updateTotalPrice);
    });

    function openPurchaseModal(productValue) {
        if (!purchaseModal) return;
        
        // Reset form messages
        const formEl = document.getElementById('purchase-form');
        const successMsgEl = document.querySelector('[data-fs-success-purchase]');
        if(formEl) {
            formEl.reset();
            formEl.style.display = 'block';
        }
        if(successMsgEl) successMsgEl.innerHTML = '';
        
        // Pre-select product if provided
        productCheckboxes.forEach((cb, index) => {
            const qtyInput = productQuantities[index];
            if (productValue) {
                cb.checked = (cb.value === productValue);
            } else {
                cb.checked = false;
            }
            
            // Trigger visual update for quantity inputs
            if (cb.checked) {
                qtyInput.disabled = false;
                qtyInput.style.display = 'block';
            } else {
                qtyInput.disabled = true;
                qtyInput.style.display = 'none';
            }
        });
        
        updateTotalPrice();
        
        purchaseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Always start with the dropdown closed
        const productGroup = document.getElementById('purchase-product-group');
        const productDropdownToggle = document.getElementById('product-dropdown-toggle');
        if (productGroup && productDropdownToggle) {
            productGroup.classList.add('collapsed');
            const icon = productDropdownToggle.querySelector('.dropdown-icon');
            productGroup.style.maxHeight = '0';
            productGroup.style.opacity = '0';
            productGroup.style.padding = '0 10px';
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }

    const productDropdownToggle = document.getElementById('product-dropdown-toggle');
    const productGroup = document.getElementById('purchase-product-group');
    if (productDropdownToggle && productGroup) {
        productDropdownToggle.addEventListener('click', function() {
            productGroup.classList.toggle('collapsed');
            const icon = productDropdownToggle.querySelector('.dropdown-icon');
            if (productGroup.classList.contains('collapsed')) {
                productGroup.style.maxHeight = '0';
                productGroup.style.opacity = '0';
                productGroup.style.padding = '0 10px';
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                productGroup.style.maxHeight = '350px';
                productGroup.style.opacity = '1';
                productGroup.style.padding = '10px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    }
    function closePurchaseModalFunc() {
        if (!purchaseModal) return;
        purchaseModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (orderBtns.length > 0) {
        orderBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const product = this.getAttribute('data-product');
                openPurchaseModal(product);
            });
        });
    }

    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPurchaseModal(null);
        });
    }

    if (closePurchaseModal) {
        closePurchaseModal.addEventListener('click', closePurchaseModalFunc);
    }
    
    if (purchaseBackdrop) {
        purchaseBackdrop.addEventListener('click', closePurchaseModalFunc);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && purchaseModal && purchaseModal.classList.contains('active')) {
            closePurchaseModalFunc();
        }
    });
    console.log('YES2HEALTH BEAUTY website initialized successfully!');
});


// ============================================
// PWA & INSTALL APP LOGIC
// ============================================
let deferredPrompt;
const installBtn = document.getElementById('install-app-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    if (installBtn) {
        installBtn.style.display = 'inline-flex';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        // Hide the app provided install promotion
        installBtn.style.display = 'none';
        if (deferredPrompt) {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }
    });
}

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    console.log('PWA was installed');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
