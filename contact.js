document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('luxuryForm');

    // 🔑 اطلاعات رباتت رو اینجا قرار بده
    const BOT_TOKEN = '';
    const CHAT_ID = '';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // گرفتن مقادیر فرم
        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('userPhone').value.trim();
        const subject = document.getElementById('userSubject').value.trim();
        const message = document.getElementById('userMessage').value.trim();

        // اعتبارسنجی ساده
        if (!name || !phone || !message) {
            alert('لطفاً نام، شماره موبایل و پیام را وارد کنید.');
            return;
        }

        // ساخت پیام برای تلگرام
        const text = `📩 پیام جدید از سایت شما:

👤 نام: ${name}
📱 شماره موبایل: ${phone}
📌 موضوع: ${subject || 'بدون موضوع'}
💬 پیام: ${message}`;

        // ارسال به تلگرام
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                alert('✅ پیام شما با موفقیت ارسال شد!');
                form.reset();
            } else {
                alert('❌ خطا در ارسال پیام. لطفاً دوباره تلاش کنید.');
                console.error('Telegram error:', data);
            }
        })
        .catch(err => {
            alert('❌ خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.');
            console.error('Network error:', err);
        });
    });
});