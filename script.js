// ========== WAIT FOR DOM TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. TYPING EFFECT (لوکس و حرفه‌ای) ==========
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const words = [
            'طراح لوکس محصولات دیجیتال',
            'توسعه‌دهنده فول استک ارشد',
            'مشاور تحول دیجیتال برندها',
            'معمار تجربه کاربری ویژه'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typedTextElement.textContent = currentText;
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2500);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }
    
    // ========== 2. SMOOTH SCROLL FOR NAVIGATION ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // آپدیت URL بدون ریلود صفحه
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ========== 3. REVEAL ANIMATIONS ON SCROLL (با Intersection Observer) ==========
    const revealElements = document.querySelectorAll('.portfolio-card, .about-container, .contact-form, .brands-grid');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
    });
    
    // انیمیشن جداگانه برای هر کارت نمونه کار
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    cardObserver.unobserve(card);
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    });
    
    // ========== 4. FORM VALIDATION WITH LUXURY FEEDBACK ==========
    const luxuryForm = document.getElementById('luxuryForm');
    if (luxuryForm) {
        luxuryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            let firstInvalid = null;
            
            // حذف خطاهای قبلی
            this.querySelectorAll('.error-message').forEach(err => err.remove());
            inputs.forEach(input => {
                input.style.borderColor = '';
                input.classList.remove('error-shake');
            });
            
            // اعتبارسنجی
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#D4AF37';
                    input.classList.add('error-shake');
                    
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.style.cssText = 'color: #D4AF37; font-size: 0.75rem; margin-top: 5px;';
                    errorDiv.textContent = 'این فیلد الزامی است';
                    input.parentNode.insertBefore(errorDiv, input.nextSibling);
                    
                    if (!firstInvalid) firstInvalid = input;
                }
                
                // اعتبارسنجی ایمیل
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.style.borderColor = '#D4AF37';
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'error-message';
                        errorDiv.style.cssText = 'color: #D4AF37; font-size: 0.75rem; margin-top: 5px;';
                        errorDiv.textContent = 'ایمیل معتبر وارد کنید';
                        input.parentNode.insertBefore(errorDiv, input.nextSibling);
                        if (!firstInvalid) firstInvalid = input;
                    }
                }
            });
            
            if (isValid) {
                // نمایش پیام موفقیت لوکس
                const successMsg = document.createElement('div');
                successMsg.textContent = '✅ درخواست شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.';
                successMsg.style.cssText = `
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid #D4AF37;
                    color: #D4AF37;
                    padding: 15px;
                    border-radius: 15px;
                    text-align: center;
                    margin-top: 20px;
                    font-weight: 500;
                `;
                luxuryForm.appendChild(successMsg);
                luxuryForm.reset();
                
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => successMsg.remove(), 500);
                }, 4000);
            } else if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
                
                // اضافه کردن افکت شیک خطا
                setTimeout(() => {
                    firstInvalid.classList.remove('error-shake');
                }, 500);
            }
        });
        
        // حذف خطا هنگام تایپ مجدد
        luxuryForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                const nextError = this.nextElementSibling;
                if (nextError && nextError.classList && nextError.classList.contains('error-message')) {
                    nextError.remove();
                }
            });
        });
    }
    
    // ========== 5. PARALLAX EFFECT FOR HERO (اختیاری لوکس) ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    });
    
    // ========== 6. HEADER SHADOW ON SCROLL (برای حس لوکس) ==========
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                document.body.style.setProperty('--shadow-intensity', '0.15');
            } else {
                document.body.style.setProperty('--shadow-intensity', '0');
            }
        });
    }
    
    // ========== 7. HOVER 3D EFFECT FOR CARDS (حرفه‌ای) ==========
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
    
    // ========== 8. ADD CSS FOR ERROR SHAKE ==========
    const style = document.createElement('style');
    style.textContent = `
        .error-shake {
            animation: shake 0.3s ease-in-out 0s 2;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        /* اسکرول بار لوکس */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #0A0A0A;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #D4AF37;
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #F3E5AB;
        }
        
        /* افکت گلد گلاس برای فرم */
        .contact-form {
            backdrop-filter: blur(2px);
        }
        
        /* انیمیشن لوگو برندها */
        .brand-item {
            transition: all 0.3s ease;
        }
        
        /* بهبود خوانایی لینک‌ها */
        a {
            -webkit-tap-highlight-color: transparent;
        }
    `;
    document.head.appendChild(style);
    
    // ========== 9. DYNAMIC YEAR IN FOOTER ==========
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('۲۰۲۶', currentYear);
    }
    
    // ========== 10. PRELOADER SMOOTH APPEARANCE (اختیاری) ==========
    // فقط یک افکت نرم برای نمایش محتوا
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// ========== CONSOLE MESSAGE LUXURY (برای کارفرماها) ==========
console.log('%c✨ پرتفوی لوکس | طراحی شده برای برندهای برتر ✨', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
console.log('%cاین وب‌سایت با بالاترین استانداردهای UI/UX و کدنویسی تمیز توسعه یافته است.', 'color: #AAAAAA; font-size: 12px;');
// ========== LOADER SPINNER ==========
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        // حداقل 1.5 ثانیه لودر نمایش داده شود (برای تجربه لوکس)
        setTimeout(function() {
            loader.classList.add('hidden');
            
            // حذف کامل لودر از DOM بعد از انیمیشن
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

// همچنین اگر صفحه خیلی سریع لود شد، باز هم لودر حداقل زمان مشخص را نشان می‌دهد
// برای جلوگیری از پرش محتوا
document.addEventListener('DOMContentLoaded', function() {
    // اطمینان از اینکه body مخفی نباشد
    document.body.style.visibility = 'visible';
});