// Internationalization (i18n) configuration

export type Language = "en" | "ar";

export interface Translations {
    // Navigation
    nav: {
        about: string;
        services: string;
        contact: string;
    };
    // Hero
    hero: {
        title: string;
        sourcingPartner: string;
        subtitle: string;
        cta: string;
    };
    // About
    about: {
        title: string;
        description: string;
        taglinePrefix: string;
        taglineSuffix: string;
    };
    // Services
    services: {
        title: string;
        learnMore: string;
        inquire: string;
        requestQuote: string;
        pastExperience: string;
    };
    // Contact
    contact: {
        title: string;
        phone: string;
        email: string;
        name: string;
        yourName: string;
        yourEmail: string;
        serviceInterest: string;
        generalInquiry: string;
        message: string;
        messagePlaceholder: string;
        sendMessage: string;
        sending: string;
        successMessage: string;
        errorMessage: string;
    };
    // Footer
    footer: {
        copyright: string;
    };
    // Common
    common: {
        close: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        nav: {
            about: "About",
            services: "Services",
            contact: "Contact",
        },
        hero: {
            title: "KuganTech is your trusted",
            sourcingPartner: "sourcing partner.",
            subtitle: "We design your custom roadmap to Global sourcing and engineering solutions.",
            cta: "Explore Services",
        },
        about: {
            title: "About Us",
            description: "At KuganTech, we are more than just a manufacturing and sourcing company. We are a bridge between your vision and the future. We engineer the vision, Our team of experts collaborates with you to translate your ideas into tangible plans. We manufacture the future with cutting-edge technology and a commitment to quality, we turn those plans into innovative products that shape the future. We supply the best, We source the finest materials and employ efficient processes to deliver exceptional products that meet the highest standards.",
            taglinePrefix: "We are here to ",
            taglineSuffix: "engineer the vision, manufacture the future, and supply the best.",
        },
        services: {
            title: "Our Services",
            learnMore: "Learn More",
            inquire: "Inquire",
            requestQuote: "Request Quote",
            pastExperience: "Past Experience",
        },
        contact: {
            title: "Contact Us",
            phone: "Phone",
            email: "Email",
            name: "Name",
            yourName: "Your Name",
            yourEmail: "Your Email",
            serviceInterest: "Service Interest",
            generalInquiry: "General Inquiry",
            message: "Message",
            messagePlaceholder: "How can we help?",
            sendMessage: "Send Message",
            sending: "Sending...",
            successMessage: "Thank you! Your message has been sent successfully.",
            errorMessage: "Unable to send via server. Opening email client...",
        },
        footer: {
            copyright: "All Rights Reserved.",
        },
        common: {
            close: "Close",
        },
    },
    ar: {
        nav: {
            about: "من نحن",
            services: "خدماتنا",
            contact: "اتصل بنا",
        },
        hero: {
            title: "كوجان تك هي شريكك الموثوق",
            sourcingPartner: "في التوريد.",
            subtitle: "نصمم خارطة طريق مخصصة لحلول التوريد والهندسة العالمية.",
            cta: "استكشف خدماتنا",
        },
        about: {
            title: "من نحن",
            description: "في كوجان تك، نحن أكثر من مجرد شركة تصنيع وتوريد. نحن جسر بين رؤيتك والمستقبل. نهندس الرؤية، يتعاون فريقنا من الخبراء معك لترجمة أفكارك إلى خطط ملموسة. نصنع المستقبل بأحدث التقنيات والالتزام بالجودة، نحول هذه الخطط إلى منتجات مبتكرة تشكل المستقبل. نورد الأفضل، نستورد أجود المواد ونستخدم عمليات فعالة لتقديم منتجات استثنائية تلبي أعلى المعايير.",
            taglinePrefix: "نحن هنا ",
            taglineSuffix: "لهندسة الرؤية، وتصنيع المستقبل، وتوريد الأفضل.",
        },
        services: {
            title: "خدماتنا",
            learnMore: "اعرف المزيد",
            inquire: "استفسر",
            requestQuote: "اطلب عرض سعر",
            pastExperience: "الخبرات السابقة",
        },
        contact: {
            title: "اتصل بنا",
            phone: "الهاتف",
            email: "البريد الإلكتروني",
            name: "الاسم",
            yourName: "اسمك",
            yourEmail: "بريدك الإلكتروني",
            serviceInterest: "الخدمة المطلوبة",
            generalInquiry: "استفسار عام",
            message: "الرسالة",
            messagePlaceholder: "كيف يمكننا مساعدتك؟",
            sendMessage: "إرسال الرسالة",
            sending: "جاري الإرسال...",
            successMessage: "شكراً لك! تم إرسال رسالتك بنجاح.",
            errorMessage: "تعذر الإرسال عبر الخادم. جاري فتح عميل البريد الإلكتروني...",
        },
        footer: {
            copyright: "جميع الحقوق محفوظة.",
        },
        common: {
            close: "إغلاق",
        },
    },
};

// Service translations
export const serviceTranslations: Record<Language, Record<string, { title: string; shortDesc: string; fullDesc: string; experienceText?: string }>> = {
    en: {
        "product-design": {
            title: "Product Design",
            shortDesc: "Comprehensive design services including Detailed Engineering and Value Engineering.",
            fullDesc: "Our Product Design services cover the entire lifecycle from concept to creation. We specialize in Design and Development, Detail Engineering, and Value Engineering & Analysis to ensure your products are optimized for performance and cost.",
            experienceText: "Award-winning design for automotive components.",
        },
        "engineering-analysis": {
            title: "Engineering Analysis",
            shortDesc: "Advanced simulation and analysis tailored for complex engineering challenges.",
            fullDesc: "We utilize state-of-the-art tools for Finite Element Analysis (FEA), Computational Fluid Dynamics (CFD), Multi-Body Dynamics (MBD), and Acoustics to validate and improve designs before prototyping.",
            experienceText: "CFD analysis for high-speed rail projects.",
        },
        "product-development": {
            title: "Product Development",
            shortDesc: "From prototyping to manufacturing engineering.",
            fullDesc: "Our Product Development capabilities include Tool and Mold Design, Rapid Prototyping & Testing, and Manufacturing Engineering to streamline your production process.",
        },
        "electronics-design": {
            title: "Electronics Product Design",
            shortDesc: "Embedded systems and hardware design solutions.",
            fullDesc: "We offer specialized services in Embedded System Services, Hardware Design and Automation, and Electronics Cooling to meet the demands of modern smart devices.",
            experienceText: "IoT controller development for industrial automation.",
        },
        "automotive": {
            title: "Automotive Engineering",
            shortDesc: "Specialized solutions for the automotive industry.",
            fullDesc: "Our automotive expertise includes Aerodynamics, Under-hood & Under-body analysis, Engine Lubrication & Cooling, and Passenger Comfort & Safety Systems (Airbags, Steering Wheels).",
        },
        "heavy-equipment": {
            title: "Heavy Equipment",
            shortDesc: "Engineering for farm, construction, and material handling.",
            fullDesc: "We provide robust engineering solutions for Farm Equipments, Construction Machinery, and Material Handling Equipments designed to withstand rigorous operational environments.",
            experienceText: "Hydraulic system optimization for excavators.",
        },
    },
    ar: {
        "product-design": {
            title: "تصميم المنتجات",
            shortDesc: "خدمات تصميم شاملة تتضمن الهندسة التفصيلية وهندسة القيمة.",
            fullDesc: "تغطي خدمات تصميم المنتجات لدينا دورة الحياة الكاملة من الفكرة إلى الإنشاء. نتخصص في التصميم والتطوير، والهندسة التفصيلية، وهندسة القيمة والتحليل لضمان تحسين منتجاتك للأداء والتكلفة.",
            experienceText: "تصميم حائز على جوائز لمكونات السيارات.",
        },
        "engineering-analysis": {
            title: "التحليل الهندسي",
            shortDesc: "محاكاة وتحليل متقدم مصمم للتحديات الهندسية المعقدة.",
            fullDesc: "نستخدم أحدث الأدوات لتحليل العناصر المحدودة (FEA)، وديناميكيات الموائع الحسابية (CFD)، وديناميكيات الأجسام المتعددة (MBD)، والصوتيات للتحقق من التصاميم وتحسينها قبل النمذجة.",
            experienceText: "تحليل CFD لمشاريع القطارات فائقة السرعة.",
        },
        "product-development": {
            title: "تطوير المنتجات",
            shortDesc: "من النمذجة إلى هندسة التصنيع.",
            fullDesc: "تشمل قدراتنا في تطوير المنتجات تصميم الأدوات والقوالب، والنمذجة السريعة والاختبار، وهندسة التصنيع لتبسيط عملية الإنتاج.",
        },
        "electronics-design": {
            title: "تصميم المنتجات الإلكترونية",
            shortDesc: "حلول الأنظمة المدمجة وتصميم الأجهزة.",
            fullDesc: "نقدم خدمات متخصصة في خدمات الأنظمة المدمجة، وتصميم الأجهزة والأتمتة، وتبريد الإلكترونيات لتلبية متطلبات الأجهزة الذكية الحديثة.",
            experienceText: "تطوير وحدة تحكم IoT للأتمتة الصناعية.",
        },
        "automotive": {
            title: "هندسة السيارات",
            shortDesc: "حلول متخصصة لصناعة السيارات.",
            fullDesc: "تشمل خبرتنا في السيارات الديناميكا الهوائية، وتحليل أسفل غطاء المحرك والهيكل السفلي، وتزييت وتبريد المحرك، وأنظمة راحة وسلامة الركاب (الوسائد الهوائية، عجلات القيادة).",
        },
        "heavy-equipment": {
            title: "المعدات الثقيلة",
            shortDesc: "هندسة للمعدات الزراعية والإنشائية ومناولة المواد.",
            fullDesc: "نقدم حلول هندسية قوية للمعدات الزراعية، وآلات البناء، ومعدات مناولة المواد المصممة لتحمل بيئات التشغيل الصعبة.",
            experienceText: "تحسين النظام الهيدروليكي للحفارات.",
        },
    },
};

export function getDirection(lang: Language): "ltr" | "rtl" {
    return lang === "ar" ? "rtl" : "ltr";
}
