/* ============================================
   لودر اختصاصی برای تمام صفحات سایت
   تاریخ: ۲۰۲۵
   ============================================ */

(function() {
    // تابع برای نمایش لودر
    function showLoader() {
        // بررسی وجود لودر در صفحه
        let loader = document.getElementById('global-loader');
        
        // اگر لودر وجود نداشت، آن را بساز
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.className = 'loader-wrapper';
            loader.innerHTML = `
                <div class="loader-container">
                    <div class="luxury-spinner"></div>
                    <div class="loader-text">در حال بارگزاری</div>
                    <div class="loader-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            document.body.insertBefore(loader, document.body.firstChild);
        }
        
        // نمایش لودر
        loader.classList.remove('hidden');
        loader.style.display = 'flex';
    }
    
    // تابع برای مخفی کردن لودر
    function hideLoader() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.classList.add('hidden');
            // بعد از اتمام انیمیشن، لودر را مخفی کن
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }
    
    // ذخیره زمان شروع برای اطمینان از حداقل 1 ثانیه نمایش
    const startTime = Date.now();
    
    // نمایش لودر بلافاصله
    showLoader();
    
    // وقتی صفحه کامل لود شد
    window.addEventListener('load', function() {
        const elapsed = Date.now() - startTime;
        const minDisplayTime = 1000; // حداقل 1 ثانیه
        
        if (elapsed >= minDisplayTime) {
            hideLoader();
        } else {
            setTimeout(hideLoader, minDisplayTime - elapsed);
        }
    });
    
    // برای لینک‌های داخلی (SPA-like experience)
    // وقتی کاربر روی لینک داخلی کلیک می‌کند، لودر نمایش داده شود
    document.addEventListener('click', function(e) {
        // پیدا کردن لینک
        let target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        
        if (target && target.tagName === 'A') {
            const href = target.getAttribute('href');
            
            // فقط لینک‌های داخلی (همان دامنه) و لینک‌هایی که # ندارند
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('#') && 
                !href.startsWith('javascript') &&
                !target.getAttribute('target') === '_blank') {
                
                // نمایش لودر
                showLoader();
            }
        }
    });
    
    // جلوگیری از نمایش مجدد لودر در بازگشت با دکمه back
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            hideLoader();
        }
    });
})();