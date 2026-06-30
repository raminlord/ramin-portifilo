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
                
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ========== 3. REVEAL ANIMATIONS ON SCROLL ==========
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
    
    // ========== 4. FORM VALIDATION WITH TELEGRAM INTEGRATION ==========
    const luxuryForm = document.getElementById('luxuryForm');
    if (luxuryForm) {
        luxuryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // گرفتن مقادیر
            const name = document.getElementById('userName');
            const phone = document.getElementById('userPhone');
            const subject = document.getElementById('userSubject');
            const message = document.getElementById('userMessage');
            
            // حذف خطاهای قبلی
            this.querySelectorAll('.error-message').forEach(err => err.remove());
            [name, phone, subject, message].forEach(input => {
                if (input) {
                    input.style.borderColor = '';
                    input.classList.remove('error-shake');
                }
            });
            
            let isValid = true;
            let firstInvalid = null;
            
            // اعتبارسنجی نام
            if (!name || !name.value.trim()) {
                isValid = false;
                showError(name, 'لطفاً نام و نام خانوادگی را وارد کنید');
                if (!firstInvalid) firstInvalid = name;
            }
            
            // اعتبارسنجی شماره موبایل
            if (!phone || !phone.value.trim()) {
                isValid = false;
                showError(phone, 'لطفاً شماره موبایل را وارد کنید');
                if (!firstInvalid) firstInvalid = phone;
            } else {
                // اعتبارسنجی فرمت شماره موبایل ایران
                const phoneRegex = /^(\+98|0)?9\d{9}$/;
                if (!phoneRegex.test(phone.value.trim().replace(/\s/g, ''))) {
                    isValid = false;
                    showError(phone, 'شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
                    if (!firstInvalid) firstInvalid = phone;
                }
            }
            
            // اعتبارسنجی پیام
            if (!message || !message.value.trim()) {
                isValid = false;
                showError(message, 'لطفاً پیام خود را وارد کنید');
                if (!firstInvalid) firstInvalid = message;
            }
            
            // تابع نمایش خطا
            function showError(input, errorText) {
                if (!input) return;
                input.style.borderColor = '#D4AF37';
                input.classList.add('error-shake');
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.style.cssText = 'color: #D4AF37; font-size: 0.75rem; margin-top: 5px;';
                errorDiv.textContent = errorText;
                input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
            
            if (isValid) {
                // ===== ارسال به تلگرام =====
                const BOT_TOKEN = '7698268746:AAFKMPQgC0F29Rbc9ROMRob-MHsJKetec24'; // 🔑 اینجا توکن رو بذار
                const CHAT_ID = '7569933499'; // 🔑 اینجا Chat ID رو بذار
                
                const text = `📩 **پیام جدید از سایت شما:**

👤 **نام:** ${name.value.trim()}
📱 **شماره موبایل:** ${phone.value.trim()}
📌 **موضوع:** ${subject ? subject.value.trim() || 'بدون موضوع' : 'بدون موضوع'}
💬 **پیام:** ${message.value.trim()}`;
                
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: text,
                        parse_mode: 'Markdown'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        // نمایش پیام موفقیت لوکس
                        const successMsg = document.createElement('div');
                        successMsg.textContent = '✅ پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.';
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
                            successMsg.style.transition = 'opacity 0.5s ease';
                            setTimeout(() => successMsg.remove(), 500);
                        }, 4000);
                    } else {
                        alert('❌ خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
                        console.error('Telegram error:', data);
                    }
                })
                .catch(err => {
                    alert('❌ خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
                    console.error('Network error:', err);
                });
                
            } else if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
                
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
    
    // ========== 5. PARALLAX EFFECT FOR HERO ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    });
    
    // ========== 6. HEADER SHADOW ON SCROLL ==========
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
    
    // ========== 7. HOVER 3D EFFECT FOR CARDS ==========
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
        
        .contact-form {
            backdrop-filter: blur(2px);
        }
        
        .brand-item {
            transition: all 0.3s ease;
        }
        
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
    
    // ========== 10. PRELOADER SMOOTH APPEARANCE ==========
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// ========== LOADER SPINNER ==========
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.visibility = 'visible';
});

// ========== CONSOLE MESSAGE ==========
console.log('%c✨ پرتفوی لوکس | طراحی شده برای برندهای برتر ✨', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
console.log('%cاین وب‌سایت با بالاترین استانداردهای UI/UX و کدنویسی تمیز توسعه یافته است.', 'color: #AAAAAA; font-size: 12px;');