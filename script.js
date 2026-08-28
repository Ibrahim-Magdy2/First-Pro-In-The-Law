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