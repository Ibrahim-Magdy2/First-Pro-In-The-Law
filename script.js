const header = document.querySelector('.site-header'); const menuToggle = document.querySelector('.menu-toggle'); const mobileMenu = document.querySelector('.mobile-menu');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
menuToggle.addEventListener('click', () => { const open = mobileMenu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); mobileMenu.setAttribute('aria-hidden', !open) });
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => { mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); mobileMenu.setAttribute('aria-hidden', 'true') }));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const testimonials = [...document.querySelectorAll('.testimonial')]; let current = 0; const dots = [...document.querySelectorAll('.dot')];
function showTestimonial(index) { current = (index + testimonials.length) % testimonials.length; testimonials.forEach((el, i) => el.classList.toggle('active', i === current)); dots.forEach((el, i) => el.classList.toggle('active', i === current)) }
document.querySelector('.next').addEventListener('click', () => showTestimonial(current + 1)); document.querySelector('.prev').addEventListener('click', () => showTestimonial(current - 1)); dots.forEach((dot, i) => dot.addEventListener('click', () => showTestimonial(i)));
const galleryItems = [...document.querySelectorAll('.gallery-item')]; const lightbox = document.querySelector('.lightbox'); const lightboxImage = lightbox.querySelector('img'); let galleryIndex = 0;
function openLightbox(index) { galleryIndex = (index + galleryItems.length) % galleryItems.length; lightboxImage.src = galleryItems[galleryIndex].dataset.full; lightboxImage.alt = galleryItems[galleryIndex].querySelector('img').alt; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden' }
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '' }
galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i))); lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox); lightbox.querySelector('.lightbox-next').addEventListener('click', () => openLightbox(galleryIndex + 1)); lightbox.querySelector('.lightbox-prev').addEventListener('click', () => openLightbox(galleryIndex - 1)); lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() }); document.addEventListener('keydown', e => { if (!lightbox.classList.contains('open')) return; if (e.key === 'Escape') closeLightbox(); if (e.key === 'ArrowLeft') openLightbox(galleryIndex + 1); if (e.key === 'ArrowRight') openLightbox(galleryIndex - 1) });
document.querySelector('.consultation-form').addEventListener('submit', e => { e.preventDefault(); const button = e.currentTarget.querySelector('button'); const original = button.innerHTML; button.innerHTML = 'تم استلام طلبك التجريبي ✓'; button.disabled = true; setTimeout(() => { button.innerHTML = original; button.disabled = false; e.currentTarget.reset() }, 3000) });

const lightSwitch = document.getElementById("lightSwitch");

if (lightSwitch) {
    lightSwitch.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        lightSwitch.textContent = isLight ? "🌙" : "💡";

        lightSwitch.setAttribute(
            "aria-label",
            isLight ? "إطفاء النور" : "تشغيل النور"
        );
    });
}

/* =========================================
   SITE SEARCH
========================================= */

const searchToggle = document.getElementById("searchToggle");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const siteSearch = document.getElementById("siteSearch");
const searchResults = document.getElementById("searchResults");


/* البيانات التي سيبحث فيها الموقع */

const searchableContent = [

    // Services
    {
        title: "الاستشارات القانونية",
        category: "خدماتنا",
        keywords: "استشارة استشارات رأي قانوني قانون",
        link: "#services"
    },

    {
        title: "القضايا الجنائية",
        category: "خدماتنا",
        keywords: "جنائي جنائية قضايا محاكم دفاع",
        link: "#services"
    },

    {
        title: "القضايا المدنية",
        category: "خدماتنا",
        keywords: "مدني مدنية نزاعات قضايا",
        link: "#services"
    },

    {
        title: "القضايا التجارية",
        category: "خدماتنا",
        keywords: "تجاري تجارة شركات أعمال",
        link: "#services"
    },

    {
        title: "قانون الشركات",
        category: "خدماتنا",
        keywords: "شركات تأسيس حوكمة أعمال",
        link: "#services"
    },

    {
        title: "العقود والاتفاقيات",
        category: "خدماتنا",
        keywords: "عقود اتفاقيات صياغة مراجعة توقيع",
        link: "#services"
    },

    {
        title: "المنازعات العقارية",
        category: "خدماتنا",
        keywords: "عقار عقارات ملكية تطوير نزاع",
        link: "#services"
    },

    {
        title: "قضايا الأسرة",
        category: "خدماتنا",
        keywords: "أسرة عائلة زواج طلاق أحوال شخصية",
        link: "#services"
    },


    // Practice
    {
        title: "قانون الشركات والأعمال",
        category: "مجالات العمل",
        keywords: "شركات أعمال تجاري مؤسسة",
        link: "#practice"
    },

    {
        title: "النزاعات",
        category: "مجالات العمل",
        keywords: "نزاعات خلافات قضايا",
        link: "#practice"
    },

    {
        title: "العقارات",
        category: "مجالات العمل",
        keywords: "عقار عقارات ملكية بيع شراء",
        link: "#practice"
    },


    // Process
    {
        title: "الاستشارة الأولى",
        category: "كيف نعمل؟",
        keywords: "استشارة بداية سؤال",
        link: "#process"
    },

    {
        title: "دراسة الحالة",
        category: "كيف نعمل؟",
        keywords: "دراسة مستندات ملف حالة",
        link: "#process"
    },

    {
        title: "تحليل الخيارات",
        category: "كيف نعمل؟",
        keywords: "تحليل خيارات حلول",
        link: "#process"
    },

    {
        title: "وضع الاستراتيجية",
        category: "كيف نعمل؟",
        keywords: "استراتيجية خطة عمل",
        link: "#process"
    },


    // Team
    {
        title: "فريق المحامين",
        category: "فريقنا",
        keywords: "محامي محامين فريق خبرة",
        link: "#team"
    },


    // Insights
    {
        title: "متى تحتاج إلى استشارة قانونية؟",
        category: "المعرفة القانونية",
        keywords: "استشارة متى احتاج نصيحة رأي قانوني",
        link: "#insights"
    },

    {
        title: "أهمية مراجعة العقود قبل التوقيع",
        category: "المعرفة القانونية",
        keywords: "عقود توقيع مراجعة اتفاقية",
        link: "#insights"
    },

    {
        title: "ما الذي يجب معرفته قبل بدء أي إجراء قانوني؟",
        category: "المعرفة القانونية",
        keywords: "إجراءات قانونية بداية قضية",
        link: "#insights"
    },

    {
        title: "الفرق بين الاستشارة والتمثيل القانوني",
        category: "المعرفة القانونية",
        keywords: "تمثيل استشارة محامي",
        link: "#insights"
    },


    // FAQ
    {
        title: "كيف يمكن حجز استشارة؟",
        category: "الأسئلة الشائعة",
        keywords: "حجز موعد استشارة",
        link: "#faq"
    },

    {
        title: "ما المعلومات المطلوبة في الاستشارة الأولى؟",
        category: "الأسئلة الشائعة",
        keywords: "معلومات مستندات استشارة",
        link: "#faq"
    },

    {
        title: "هل يتم الحفاظ على سرية المعلومات؟",
        category: "الأسئلة الشائعة",
        keywords: "سرية خصوصية معلومات",
        link: "#faq"
    },

    {
        title: "هل يقدم المكتب خدمات للشركات؟",
        category: "الأسئلة الشائعة",
        keywords: "شركات خدمات مكتب",
        link: "#faq"
    },

    {
        title: "كيف يمكن التواصل مع المكتب؟",
        category: "الأسئلة الشائعة",
        keywords: "تواصل هاتف بريد",
        link: "#faq"
    }

];


/* فتح البحث */

function openSearch() {

    searchOverlay.classList.add("open");

    searchOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        siteSearch.focus();
    }, 250);
}


/* إغلاق البحث */

function closeSearch() {

    searchOverlay.classList.remove("open");

    searchOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    siteSearch.value = "";

    searchResults.innerHTML = `
        <p class="search-hint">
            ابدأ بكتابة ما تبحث عنه...
        </p>
    `;
}


/* فتح */

searchToggle.addEventListener("click", openSearch);


/* إغلاق */

searchClose.addEventListener("click", closeSearch);


/* الضغط خارج صندوق البحث */

searchOverlay.addEventListener("click", (event) => {

    if (event.target === searchOverlay) {
        closeSearch();
    }

});


/* البحث */

siteSearch.addEventListener("input", () => {

    const query = siteSearch.value
        .trim()
        .toLowerCase();

    if (!query) {

        searchResults.innerHTML = `
            <p class="search-hint">
                ابدأ بكتابة ما تبحث عنه...
            </p>
        `;

        return;
    }


    const results = searchableContent.filter(item => {

        const text = `
            ${item.title}
            ${item.category}
            ${item.keywords}
        `.toLowerCase();

        return text.includes(query);

    });


    if (!results.length) {

        searchResults.innerHTML = `
            <div class="search-no-results">

                <strong>لم نجد ما تبحث عنه</strong>

                <span>
                    جرّب كلمة أخرى مثل "عقود" أو "شركات" أو "استشارة".
                </span>

            </div>
        `;

        return;
    }


    searchResults.innerHTML = results.map(item => `

        <a
            class="search-result"
            href="${item.link}"
        >

            <div class="search-result-info">

                <span class="search-result-category">
                    ${item.category}
                </span>

                <span class="search-result-title">
                    ${item.title}
                </span>

            </div>

            <span class="search-result-arrow">
                ←
            </span>

        </a>

    `).join("");


    /* إغلاق البحث بعد اختيار نتيجة */

    searchResults
        .querySelectorAll(".search-result")
        .forEach(result => {

            result.addEventListener("click", () => {
                closeSearch();
            });

        });

});


/* ESC */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        searchOverlay.classList.contains("open")
    ) {
        closeSearch();
    }

});


/* =========================================
   AI LEGAL ASSISTANT
========================================= */

const aiButton = document.getElementById("aiAssistantButton");
const aiChat = document.getElementById("aiChat");
const aiClose = document.getElementById("aiClose");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");
const aiQuickActions = document.querySelectorAll(
    ".ai-quick-actions button"
);


/* =========================================
   OPEN / CLOSE
========================================= */

function openAI() {

    aiChat.classList.add("open");

    aiChat.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        aiInput.focus();
    }, 250);

}


function closeAI() {

    aiChat.classList.remove("open");

    aiChat.setAttribute("aria-hidden", "true");

}


aiButton.addEventListener("click", openAI);

aiClose.addEventListener("click", closeAI);


/* =========================================
   ADD MESSAGE
========================================= */

function addAIMessage(message, type = "bot") {

    const wrapper = document.createElement("div");

    wrapper.className =
        type === "user"
            ? "ai-message ai-message-user"
            : "ai-message ai-message-bot";


    if (type === "bot") {

        wrapper.innerHTML = `
            <div class="ai-message-avatar">✦</div>

            <div class="ai-message-content">
                ${message}
            </div>
        `;

    } else {

        wrapper.innerHTML = `
            <div class="ai-message-content">
                ${message}
            </div>
        `;

    }


    aiMessages.appendChild(wrapper);

    aiMessages.scrollTop = aiMessages.scrollHeight;

}


/* =========================================
   TYPING
========================================= */

function showTyping() {

    const typing = document.createElement("div");

    typing.className =
        "ai-message ai-message-bot";

    typing.id = "aiTypingMessage";

    typing.innerHTML = `
        <div class="ai-message-avatar">✦</div>

        <div class="ai-message-content">

            <div class="ai-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    `;

    aiMessages.appendChild(typing);

    aiMessages.scrollTop = aiMessages.scrollHeight;

}


function removeTyping() {

    const typing =
        document.getElementById("aiTypingMessage");

    if (typing) {
        typing.remove();
    }

}


/* =========================================
   LOCAL DEMO AI
========================================= */

function getDemoAIResponse(question) {

    const q = question.toLowerCase();


    if (
        q.includes("حجز") ||
        q.includes("موعد") ||
        q.includes("استشارة")
    ) {

        return `
            <p>
                بالتأكيد. يمكنك طلب استشارة قانونية من خلال نموذج التواصل الموجود في الموقع.
            </p>

            <p>
                إذا أردت، يمكنك الانتقال مباشرة إلى قسم
                <strong>تواصل معنا</strong>
                لإرسال طلبك.
            </p>

            <p>
                <a
                    href="#contact"
                    style="color:var(--gold2);text-decoration:underline;"
                    onclick="closeAI()"
                >
                    احجز استشارتك الآن ↗
                </a>
            </p>
        `;

    }


    if (
        q.includes("خدمات") ||
        q.includes("الخدمات")
    ) {

        return `
            <p>
                يقدم المكتب مجموعة من الخدمات القانونية، منها:
            </p>

            <p>
                • الاستشارات القانونية<br>
                • القضايا الجنائية<br>
                • القضايا المدنية<br>
                • القضايا التجارية<br>
                • قانون الشركات<br>
                • العقود والاتفاقيات<br>
                • المنازعات العقارية<br>
                • قضايا الأسرة
            </p>

            <p>
                ويمكنني مساعدتك في تحديد الخدمة الأقرب إلى موضوعك.
            </p>
        `;

    }


    if (
        q.includes("عقد") ||
        q.includes("عقود") ||
        q.includes("اتفاقية") ||
        q.includes("اتفاقيات")
    ) {

        return `
            <p>
                إذا كان استفسارك متعلقًا بعقد أو اتفاقية،
                فالمكتب يقدم خدمات صياغة ومراجعة العقود والاتفاقيات.
            </p>

            <p>
                أخبرني بشكل عام: هل تريد
                <strong>مراجعة عقد</strong>
                أم
                <strong>صياغة عقد جديد</strong>
                أم لديك مشكلة بعد توقيع العقد؟
            </p>
        `;

    }


    if (
        q.includes("شركة") ||
        q.includes("شركات") ||
        q.includes("تجاري") ||
        q.includes("أعمال")
    ) {

        return `
            <p>
                يقدم المكتب خدمات قانونية مرتبطة بالشركات والأعمال،
                بما في ذلك التأسيس والحوكمة والعقود والعمليات التجارية.
            </p>

            <p>
                إذا أخبرتني بنوع احتياجك بشكل عام،
                أستطيع توجيهك إلى القسم المناسب.
            </p>
        `;

    }


    if (
        q.includes("عقار") ||
        q.includes("عقارات") ||
        q.includes("ملكية")
    ) {

        return `
            <p>
                يقدم المكتب خدمات مرتبطة بالمنازعات العقارية
                ومسائل الملكية والتعاملات العقارية.
            </p>

            <p>
                يمكنك وصف المشكلة بشكل عام،
                وسأساعدك في تحديد نوع الخدمة الأقرب إليها.
            </p>
        `;

    }


    if (
        q.includes("جنائي") ||
        q.includes("جنائية") ||
        q.includes("قضية")
    ) {

        return `
            <p>
                يبدو أن استفسارك قد يكون مرتبطًا بمسألة نزاع أو قضية قانونية.
            </p>

            <p>
                لأن تفاصيل كل حالة تختلف،
                لا أستطيع تحديد موقف قانوني نهائي من خلال المساعد.
                لكن يمكنني مساعدتك في تحديد نوع الخدمة المناسبة
                أو توجيهك إلى حجز استشارة مع المكتب.
            </p>

            <p>
                <a
                    href="#contact"
                    style="color:var(--gold2);text-decoration:underline;"
                    onclick="closeAI()"
                >
                    طلب استشارة ↗
                </a>
            </p>
        `;

    }


    return `
        <p>
            أفهم سؤالك.
        </p>

        <p>
            أستطيع مساعدتك في التعرف على خدمات المكتب،
            تحديد نوع الخدمة الأقرب إلى استفسارك،
            أو توجيهك إلى حجز استشارة.
        </p>

        <p>
            جرّب أن تخبرني مثلًا:
            <br>
            "عندي مشكلة في عقد"
            <br>
            أو
            <br>
            "أريد حجز استشارة"
        </p>
    `;

}


/* =========================================
   SEND MESSAGE
========================================= */

async function sendAIMessage(question) {

    question = question.trim();

    if (!question) return;


    addAIMessage(
        `<p>${escapeHTML(question)}</p>`,
        "user"
    );


    aiInput.value = "";

    showTyping();


    await new Promise(resolve => {
        setTimeout(resolve, 900);
    });


    removeTyping();


    const response =
        getDemoAIResponse(question);


    addAIMessage(response, "bot");

}


/* =========================================
   FORM
========================================= */

aiForm.addEventListener("submit", event => {

    event.preventDefault();

    sendAIMessage(aiInput.value);

});


/* =========================================
   QUICK QUESTIONS
========================================= */

aiQuickActions.forEach(button => {

    button.addEventListener("click", () => {

        const question =
            button.dataset.question;

        sendAIMessage(question);

    });

});


/* =========================================
   SECURITY
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   ESC CLOSE
========================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        aiChat.classList.contains("open")
    ) {

        closeAI();

    }

});