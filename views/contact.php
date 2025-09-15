<?php
// Set page data
$data['title'] = 'Contact Us - ProEase Hub';
$data['meta_description'] = 'Get in touch with ProEase Hub support team. We provide 24/7 assistance to help you with your business management needs.';
$data['meta_keywords'] = 'Contact ProEase Hub, support, help, business management, ERP support';

// Start output buffering to capture content
ob_start();
?>

<!-- Contact Hero Section -->
<section class="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200">
    <div class="container mx-auto px-6 text-center relative z-10">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight" data-en="Contact Us" data-ar="اتصل بنا">
            Contact Us
        </h1>
        <p class="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed" data-en="Get in touch with our support team. We're here to help you succeed with ProEase Hub." data-ar="تواصل مع فريق الدعم لدينا. نحن هنا لمساعدتك على النجاح مع ProEase Hub.">
            Get in touch with our support team. We're here to help you succeed with ProEase Hub.
        </p>
    </div>
</section>

<!-- Contact Methods Section -->
<section class="py-24 bg-white">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-6" data-en="Get in Touch" data-ar="تواصل معنا">Get in Touch</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-en="Choose your preferred way to contact us. We're available 24/7 to assist you." data-ar="اختر الطريقة المفضلة لديك للتواصل معنا. نحن متاحون 24/7 لمساعدتك.">
                Choose your preferred way to contact us. We're available 24/7 to assist you.
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
            <!-- WhatsApp Contact -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center">
                <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4" data-en="WhatsApp Support" data-ar="دعم واتساب">WhatsApp Support</h3>
                <p class="text-lg text-gray-600 leading-relaxed mb-6" data-en="Get instant support via WhatsApp. Our team responds within minutes." data-ar="احصل على دعم فوري عبر واتساب. فريقنا يرد في غضون دقائق.">
                    Get instant support via WhatsApp. Our team responds within minutes.
                </p>
                <a href="#" class="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block" data-en="Start Chat" data-ar="ابدأ المحادثة">
                    Start Chat
                </a>
            </div>
            
            <!-- Email Contact -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center">
                <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4" data-en="Email Support" data-ar="دعم البريد الإلكتروني">Email Support</h3>
                <p class="text-lg text-gray-600 leading-relaxed mb-6" data-en="Send us an email and we'll get back to you within 24 hours." data-ar="أرسل لنا بريداً إلكترونياً وسنرد عليك في غضون 24 ساعة.">
                    Send us an email and we'll get back to you within 24 hours.
                </p>
                <a href="mailto:support@proeasehub.com" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block" data-en="Send Email" data-ar="أرسل بريد إلكتروني">
                    Send Email
                </a>
            </div>
            
            <!-- Phone Contact -->
            <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center">
                <div class="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
                    <i class="fas fa-phone"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4" data-en="Phone Support" data-ar="دعم الهاتف">Phone Support</h3>
                <p class="text-lg text-gray-600 leading-relaxed mb-6" data-en="Call us directly for immediate assistance with your business needs." data-ar="اتصل بنا مباشرة للحصول على مساعدة فورية لاحتياجات عملك.">
                    Call us directly for immediate assistance with your business needs.
                </p>
                <a href="tel:+1234567890" class="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block" data-en="Call Now" data-ar="اتصل الآن">
                    Call Now
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Contact Form Section -->
<section class="py-24 bg-gray-50">
    <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-6" data-en="Send us a Message" data-ar="أرسل لنا رسالة">Send us a Message</h2>
                <p class="text-xl text-gray-600 leading-relaxed" data-en="Have a specific question or need custom assistance? Fill out the form below and we'll get back to you." data-ar="لديك سؤال محدد أو تحتاج مساعدة مخصصة؟ املأ النموذج أدناه وسنرد عليك.">
                    Have a specific question or need custom assistance? Fill out the form below and we'll get back to you.
                </p>
                        </div>
            
            <div class="bg-white p-8 rounded-2xl shadow-lg">
                <form class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2" data-en="Full Name" data-ar="الاسم الكامل">Full Name</label>
                            <input type="text" id="name" name="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-en="Email Address" data-ar="عنوان البريد الإلكتروني">Email Address</label>
                            <input type="email" id="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                        </div>
                    </div>
                    
                    <div>
                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2" data-en="Subject" data-ar="الموضوع">Subject</label>
                        <input type="text" id="subject" name="subject" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                    </div>
                    
                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700 mb-2" data-en="Message" data-ar="الرسالة">Message</label>
                        <textarea id="message" name="message" rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
                    </div>
                    
                    <div class="text-center">
                        <button type="submit" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-en="Send Message" data-ar="أرسل الرسالة">
                            Send Message
                        </button>
                        </div>
                    </form>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section class="py-24 bg-white">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-6" data-en="Frequently Asked Questions" data-ar="الأسئلة الشائعة">Frequently Asked Questions</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-en="Find quick answers to common questions about ProEase Hub" data-ar="اعثر على إجابات سريعة للأسئلة الشائعة حول ProEase Hub">
                Find quick answers to common questions about ProEase Hub
            </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
            <div class="space-y-6">
                <!-- FAQ Item 1 -->
                <div class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3" data-en="How quickly can I get started with ProEase Hub?" data-ar="كم من الوقت يستغرق البدء مع ProEase Hub؟">How quickly can I get started with ProEase Hub?</h3>
                    <p class="text-gray-600" data-en="You can get started immediately after signing up. Our setup process takes less than 10 minutes, and you'll have access to all features right away." data-ar="يمكنك البدء فوراً بعد التسجيل. عملية الإعداد تستغرق أقل من 10 دقائق، وستحصل على الوصول لجميع الميزات على الفور.">
                        You can get started immediately after signing up. Our setup process takes less than 10 minutes, and you'll have access to all features right away.
                    </p>
                </div>
                
                <!-- FAQ Item 2 -->
                <div class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3" data-en="Do you offer training for new users?" data-ar="هل تقدمون تدريب للمستخدمين الجدد؟">Do you offer training for new users?</h3>
                    <p class="text-gray-600" data-en="Yes! We provide comprehensive training sessions, video tutorials, and documentation to help you get the most out of ProEase Hub." data-ar="نعم! نقدم جلسات تدريب شاملة ودروس فيديو ووثائق لمساعدتك على الاستفادة القصوى من ProEase Hub.">
                        Yes! We provide comprehensive training sessions, video tutorials, and documentation to help you get the most out of ProEase Hub.
                    </p>
                </div>
                
                <!-- FAQ Item 3 -->
                <div class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3" data-en="Can I migrate my existing data to ProEase Hub?" data-ar="هل يمكنني نقل بياناتي الموجودة إلى ProEase Hub؟">Can I migrate my existing data to ProEase Hub?</h3>
                    <p class="text-gray-600" data-en="Absolutely! Our team can help you migrate data from most popular business software. We handle the entire process to ensure no data loss." data-ar="بالتأكيد! يمكن لفريقنا مساعدتك في نقل البيانات من معظم برامج الأعمال الشائعة. نحن نتعامل مع العملية بأكملها لضمان عدم فقدان البيانات.">
                        Absolutely! Our team can help you migrate data from most popular business software. We handle the entire process to ensure no data loss.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
// Content is now handled by the controller
?>