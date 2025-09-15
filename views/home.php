<?php
// Set page data
$data['title'] = 'ProEase Hub - نظام إدارة الشركات ERP | حلول شاملة لإدارة الأعمال والموارد';
$data['meta_description'] = 'ProEase Hub - نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد. يتضمن إدارة المبيعات، المشتريات، المخزون، الموارد البشرية، المحاسبة والمزيد.';
$data['meta_keywords'] = 'نظام ERP, إدارة الشركات, إدارة الأعمال, إدارة المبيعات, إدارة المشتريات, إدارة المخزون, إدارة الموارد البشرية, المحاسبة, تخطيط موارد المؤسسة, ProEase Hub, برنامج إدارة شامل';
$data['og_title'] = 'ProEase Hub - نظام إدارة الشركات ERP';
$data['og_description'] = 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد';
$data['twitter_title'] = 'ProEase Hub - نظام إدارة الشركات ERP';
$data['twitter_description'] = 'نظام إدارة الشركات ERP متكامل يقدم حلول شاملة لإدارة الأعمال والموارد';

// Start output buffering to capture content
ob_start();
?>

<!-- Hero Section -->
<?php $this->load->view('landing_pages/components/hero_section'); ?>

<!-- Features Section -->
<?php $this->load->view('landing_pages/components/features_section'); ?>

<!-- Modules Section -->
<?php $this->load->view('landing_pages/components/modules_section'); ?>

<!-- Business Tools Section -->
<section class="py-24 bg-white">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl font-bold text-gray-900 mb-8" data-en="All Your Business Tools, One Smart Hub" data-ar="جميع أدوات عملك، في مركز ذكي واحد">All Your Business Tools, One Smart Hub</h2>
        <p class="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed" data-en="Manage time, track performance, and streamline operations — all from one powerful, easy-to-use platform." data-ar="إدارة الوقت وتتبع الأداء وتبسيط العمليات - كل ذلك من منصة قوية وسهلة الاستخدام.">
            Manage time, track performance, and streamline operations — all from one powerful, easy-to-use platform.
        </p>
        <a href="#pricing" class="bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 inline-block btn-hover-animate" data-en="Subscribe Now" data-ar="اشترك الآن">
            Subscribe Now
        </a>
    </div>
</section>

<!-- How It Works Section -->
<section id="how-it-works" class="py-24 bg-white">
    <div class="container mx-auto px-6">
        <div class="text-center mb-20">
            <h2 class="text-5xl font-bold text-gray-900 mb-6" data-en="How It Works" data-ar="كيف يعمل">How It Works</h2>
            <p class="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-en="Get your business up and running in minutes — no tech skills needed." data-ar="احصل على عملك يعمل في دقائق - لا توجد مهارات تقنية مطلوبة.">
                Get your business up and running in minutes — no tech skills needed.
            </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-12">
            <!-- Step 1 -->
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-2xl">1</div>
                <h3 class="text-2xl font-bold text-gray-900 mb-6" data-en="Create your account" data-ar="إنشاء حسابك">Create your account</h3>
                <p class="text-lg text-gray-600 leading-relaxed" data-en="Sign up in under a minute and unlock your system" data-ar="سجل في أقل من دقيقة وافتح نظامك">Sign up in under a minute and unlock your system</p>
            </div>
            
            <!-- Step 2 -->
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-2xl">2</div>
                <h3 class="text-2xl font-bold text-gray-900 mb-6" data-en="Choose Your Plan & Features" data-ar="اختر خطتك والميزات">Choose Your Plan & Features</h3>
                <p class="text-lg text-gray-600 leading-relaxed" data-en="Pick the package that fits your business — and easily activate the tools you need" data-ar="اختر الحزمة التي تناسب عملك - وقم بتفعيل الأدوات التي تحتاجها بسهولة">Pick the package that fits your business — and easily activate the tools you need</p>
            </div>
            
            <!-- Step 3 -->
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-2xl">3</div>
                <h3 class="text-2xl font-bold text-gray-900 mb-6" data-en="Start Earning & Keep More of Your Money" data-ar="ابدأ في الربح واحتفظ بالمزيد من أموالك">Start Earning & Keep More of Your Money</h3>
                <p class="text-lg text-gray-600 leading-relaxed" data-en="Track profits, save time, and stay in control — all from one smart platform" data-ar="تتبع الأرباح ووفر الوقت وابق في السيطرة - كل ذلك من منصة ذكية واحدة">Track profits, save time, and stay in control — all from one smart platform</p>
            </div>
        </div>
        
        <div class="text-center mt-16">
            <a href="#pricing" class="bg-blue-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 inline-block btn-hover-animate" data-en="Create account now" data-ar="إنشاء حساب الآن">
                Create account now
            </a>
        </div>
    </div>
</section>

<!-- Support Section -->
<section class="py-24 bg-gray-50">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl font-bold text-gray-900 mb-8" data-en="Real Support. Right When You Need It" data-ar="دعم حقيقي. عندما تحتاجه">Real Support. Right When You Need It</h2>
        <p class="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed" data-en="No more waiting days for emails. With ProEase Hub, you get instant support directly through WhatsApp—because your time matters." data-ar="لا مزيد من انتظار أيام للرسائل الإلكترونية. مع ProEase Hub، تحصل على دعم فوري مباشرة من خلال WhatsApp - لأن وقتك مهم.">
            No more waiting days for emails. With ProEase Hub, you get instant support directly through WhatsApp—because your time matters.
        </p>
        <div class="flex items-center justify-center space-x-4">
            <div class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                <i class="fab fa-whatsapp"></i>
            </div>
            <div class="text-left">
                <p class="text-lg text-gray-700 font-medium" data-en="Get instant support via WhatsApp" data-ar="احصل على دعم فوري عبر WhatsApp">Get instant support via WhatsApp</p>
                <p class="text-gray-600" data-en="24/7 availability" data-ar="متاح 24/7">24/7 availability</p>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<?php $this->load->view('landing_pages/components/testimonials_section'); ?>

<!-- Pricing Section -->
<?php $this->load->view('landing_pages/components/pricing_section'); ?>

<!-- FAQ Section -->
<?php $this->load->view('landing_pages/components/faq_section'); ?>

<!-- CTA Section -->
<section class="py-24 relative overflow-hidden animated-cta-section">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
    
    <!-- Content Container -->
    <div class="container mx-auto px-6 text-center relative z-10">
        <!-- Main Heading -->
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight" data-en="Ready to take control of your business operations?" data-ar="هل أنت مستعد للسيطرة على عمليات عملك؟">
            Ready to take control of your business operations?
        </h2>
        
        <!-- Description -->
        <p class="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed" data-en="Join companies that rely on ProEase Hub to manage tasks, teams, and clients in one secure, powerful platform. Get started today and experience smarter business management." data-ar="انضم إلى الشركات التي تعتمد على ProEase Hub لإدارة المهام والفرق والعملاء في منصة آمنة وقوية واحدة. ابدأ اليوم واختبر إدارة أعمال أكثر ذكاءً.">
            Join companies that rely on ProEase Hub to manage tasks, teams, and clients in one secure, powerful platform. Get started today and experience smarter business management.
        </p>
        
        <!-- CTA Button -->
        <div class="relative">
            <a href="#pricing" class="group relative bg-white text-blue-600 px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 inline-block overflow-hidden" data-en="Get started now" data-ar="ابدأ الآن">
                <!-- Button Background Animation -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <!-- Button Text -->
                <span class="relative z-10 flex items-center justify-center">
                    <span data-en="Get started now" data-ar="ابدأ الآن">Get started now</span>
                    <i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform duration-300"></i>
                </span>
            </a>
            
            <!-- Button Glow Effect -->
            <div class="absolute inset-0 bg-blue-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
        </div>
        
        <!-- Trust Indicators -->
        <div class="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-200/80">
            <div class="flex items-center space-x-2">
                <i class="fas fa-shield-alt text-cyan-400"></i>
                <span class="text-sm font-medium" data-en="Enterprise Security" data-ar="أمان المؤسسات">Enterprise Security</span>
            </div>
            <div class="flex items-center space-x-2">
                <i class="fas fa-chart-line text-indigo-400"></i>
                <span class="text-sm font-medium" data-en="Real-time Analytics" data-ar="تحليلات فورية">Real-time Analytics</span>
            </div>
            <div class="flex items-center space-x-2">
                <i class="fas fa-users text-blue-400"></i>
                <span class="text-sm font-medium" data-en="Team Collaboration" data-ar="تعاون الفريق">Team Collaboration</span>
            </div>
        </div>
    </div>
</section>

<?php
// Content is now handled by the controller
?>