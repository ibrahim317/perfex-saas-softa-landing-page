<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($title) ? $title : 'ProEase Hub - نظام إدارة الشركات ERP' ?></title>
    
    <!-- Meta Tags for SEO -->
    <meta name="description" content="<?= isset($meta_description) ? $meta_description : 'ProEase Hub - نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد' ?>">
    <meta name="keywords" content="<?= isset($meta_keywords) ? $meta_keywords : 'نظام ERP, إدارة الشركات, إدارة الأعمال, إدارة المبيعات, إدارة المشتريات, إدارة المخزون, إدارة الموارد البشرية, المحاسبة, تخطيط موارد المؤسسة, ProEase Hub, برنامج إدارة شامل' ?>">
    <meta name="author" content="ProEase Hub Team">
    
    <!-- Additional SEO Meta Tags -->
    <meta name="robots" content="index, follow">
    <meta name="language" content="Arabic, English">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    
    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="<?= isset($og_title) ? $og_title : 'ProEase Hub - نظام إدارة الشركات ERP' ?>">
    <meta property="og:description" content="<?= isset($og_description) ? $og_description : 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد' ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= current_url() ?>">
    <meta property="og:image" content="<?= base_url('modules/landing_pages/assets/images/logo-whitetheme.png') ?>">
    <meta property="og:site_name" content="ProEase Hub">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= isset($twitter_title) ? $twitter_title : 'ProEase Hub - نظام إدارة الشركات ERP' ?>">
    <meta name="twitter:description" content="<?= isset($twitter_description) ? $twitter_description : 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد' ?>">
    <meta name="twitter:image" content="<?= base_url('modules/landing_pages/assets/images/logo-whitetheme.png') ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?= base_url('modules/landing_pages/assets/images/favicon.png') ?>">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?= base_url('modules/landing_pages/assets/css/style.css') ?>">
    
    <!-- Arabic Font Support -->
    <style>
        [dir="rtl"] body {
            font-family: 'Cairo', 'Inter', sans-serif;
        }
        
        [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6 {
            font-family: 'Cairo', 'Inter', sans-serif;
        }
    </style>
</head>
<body class="font-sans bg-white">
    <!-- Header Section -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-6 py-6">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center">
                    <a href="<?= site_url('landing_pages/home') ?>">
                        <img id="logo-image" src="<?= base_url('modules/landing_pages/assets/images/logo-whitetheme.png') ?>" alt="ProEase Hub Logo" class="h-10 w-auto transition-all duration-300">
                    </a>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-10">
                    <a href="#why-proease" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Why ProEase?" data-ar="لماذا ProEase؟">Why ProEase?</a>
                    <a href="#modules" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Modules" data-ar="الأقسام">Modules</a>
                    <a href="#pricing" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Pricing" data-ar="الأسعار">Pricing</a>
                    <a href="#how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="How it works" data-ar="كيف يعمل">How it works</a>
                    <a href="#testimonials" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Testimonials" data-ar="آراء العملاء">Testimonials</a>
                    <a href="#faq" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="FAQ" data-ar="الأسئلة الشائعة">FAQ</a>
                </div>
                
                <!-- Language Toggle Button -->
                <div class="hidden md:flex items-center mr-6">
                    <button id="language-toggle" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                        <i class="fas fa-globe text-lg"></i>
                        <span id="current-lang">EN</span>
                        <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                </div>
                
                <!-- Theme Toggle Button -->
                <div class="hidden md:flex items-center mr-4">
                    <button id="theme-toggle" class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300" title="Toggle Theme">
                        <i id="theme-icon" class="fas fa-moon text-yellow-500 text-lg"></i>
                    </button>
                </div>
                
                <!-- CTA Buttons -->
                <div class="hidden md:flex items-center space-x-6">
                    <a href="#pricing" class="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-hover-animate" data-en="Try it Now" data-ar="جرب الآن">Try it Now</a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button class="md:hidden text-gray-700 hover:text-blue-600 transition-colors" id="mobile-menu-btn">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
            
            <!-- Mobile Menu Dropdown -->
            <div class="md:hidden hidden mt-6 pb-6 border-t border-gray-200" id="mobile-menu">
                <div class="flex flex-col space-y-5 pt-6">
                    <!-- Mobile Language Toggle -->
                    <div class="flex items-center justify-center pb-4 border-b border-gray-200">
                        <button id="mobile-language-toggle" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            <i class="fas fa-globe text-lg"></i>
                            <span id="mobile-current-lang">EN</span>
                            <i class="fas fa-chevron-down text-sm"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Theme Toggle -->
                    <div class="flex items-center justify-center pb-4 border-b border-gray-200">
                        <button id="mobile-theme-toggle" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            <i id="mobile-theme-icon" class="fas fa-moon text-yellow-500 text-lg"></i>
                            <span id="mobile-theme-text">Dark Mode</span>
                        </button>
                    </div>
                    
                    <a href="#why-proease" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Why ProEase?" data-ar="لماذا ProEase؟">Why ProEase?</a>
                    <a href="#modules" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Modules" data-ar="الأقسام">Modules</a>
                    <a href="#pricing" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Pricing" data-ar="الأسعار">Pricing</a>
                    <a href="#how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="How it works" data-ar="كيف يعمل">How it works</a>
                    <a href="#testimonials" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="Testimonials" data-ar="آراء العملاء">Testimonials</a>
                    <a href="#faq" class="text-gray-700 hover:text-blue-600 transition-colors font-medium" data-en="FAQ" data-ar="الأسئلة الشائعة">FAQ</a>
                    <a href="#pricing" class="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-hover-animate" data-en="Try it Now" data-ar="جرب الآن">Try it Now</a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <?= $content ?>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-12">
                <!-- Company Info -->
                <div>
                    <div class="flex items-center mb-6">
                        <img id="footer-logo-image" src="<?= base_url('modules/landing_pages/assets/images/logo-whitetheme.png') ?>" alt="ProEase Hub Logo" class="h-10 w-auto transition-all duration-300">
                    </div>
                    <p class="text-gray-400 mb-6 text-lg leading-relaxed" data-en="Secure, fast, and seamless business management. ProEase Hub makes business operations effortless." data-ar="إدارة أعمال آمنة وسريعة وسلسة. ProEase Hub يجعل العمليات التجارية سهلة.">
                        Secure, fast, and seamless business management. ProEase Hub makes business operations effortless.
                    </p>
                    <p class="text-gray-500 text-base" data-en="Powered by SOFTA" data-ar="مدعوم بـ SOFTA">Powered by SOFTA</p>
                </div>
                
                <!-- Navigation -->
                <div>
                    <h4 class="font-bold text-lg mb-6" data-en="Navigation" data-ar="التنقل">Navigation</h4>
                    <ul class="space-y-4">
                        <li><a href="#why-proease" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Why ProEase?" data-ar="لماذا ProEase؟">Why ProEase?</a></li>
                        <li><a href="#modules" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Modules" data-ar="الأقسام">Modules</a></li>
                        <li><a href="#pricing" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Pricing" data-ar="الأسعار">Pricing</a></li>
                        <li><a href="<?= site_url('landing_pages/privacy') ?>" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Privacy Policy" data-ar="سياسة الخصوصية">Privacy Policy</a></li>
                        <li><a href="<?= site_url('landing_pages/terms') ?>" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Terms & Conditions" data-ar="الشروط والأحكام">Terms & Conditions</a></li>
                        <li><a href="<?= site_url('landing_pages/refund') ?>" class="text-gray-400 hover:text-white transition-colors text-base" data-en="Refund Policy" data-ar="سياسة الاسترداد">Refund Policy</a></li>
                    </ul>
                </div>
                
                <!-- Socials -->
                <div>
                    <h4 class="font-bold text-lg mb-6" data-en="Socials" data-ar="التواصل الاجتماعي">Socials</h4>
                    <ul class="space-y-4">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-base">Youtube</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-base">Facebook</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors text-base">Instagram</a></li>
                    </ul>
                </div>
                
                <!-- Contact -->
                <div>
                    <h4 class="font-bold text-lg mb-6" data-en="Contact" data-ar="اتصل بنا">Contact</h4>
                    <p class="text-gray-400 mb-4 text-base leading-relaxed" data-en="Get in touch with our support team" data-ar="تواصل مع فريق الدعم لدينا">Get in touch with our support team</p>
                    <a href="#" class="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-hover-animate">
                        <i class="fab fa-whatsapp mr-3 text-xl"></i>
                        <span class="font-semibold" data-en="Contact Support" data-ar="اتصل بالدعم">Contact Support</span>
                    </a>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-16 pt-8 text-center">
                <p class="text-gray-400 text-base" data-en="&copy; 2024 ProEase Hub. All rights reserved." data-ar="&copy; 2024 ProEase Hub. جميع الحقوق محفوظة.">&copy; 2024 ProEase Hub. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        window.PROEASE_ASSETS_BASE = '<?= base_url('modules/landing_pages/assets/js/') ?>';
        window.PROEASE_API_BASE = '<?= rtrim(base_url(), '/') ?>';
        window.APP_BASE_URL_DEFAULT = '<?= rtrim(APP_BASE_URL_DEFAULT, '/') . '/'; ?>';
        window.PERFEX_SAAS_PLAN_PARAM = '<?= perfex_saas_route_id_prefix('plan'); ?>';
    </script>
    <script src="<?= base_url('modules/landing_pages/assets/js/script.js') ?>"></script>
</body>
</html>
