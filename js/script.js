// Бургер меню - РАБОЧИЙ КОД
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const body = document.body;

// Открытие/закрытие меню
burger.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', function() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    if (menu.classList.contains('active') && 
        !menu.contains(e.target) && 
        !burger.contains(e.target)) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Закрытие меню на Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Адаптация при ресайзе
window.addEventListener('resize', function() {
    if (window.innerWidth > 1000) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Кнопка перевода
document.querySelector('.translate__but').addEventListener('click', function() {
    const translateElement = document.querySelector('.translate');
    translateElement.classList.toggle('active');
    
    // Меняем текст кнопки
    if (translateElement.classList.contains('active')) {
        this.textContent = 'Скрыть перевод';
        this.style.background = 'linear-gradient(135deg, #2a5c2e 0%, #33a339 100%)';
    } else {
        this.textContent = 'Показать перевод';
        this.style.background = 'linear-gradient(135deg, #33a339 0%, #2a8c2f 100%)';
    }
});

// Анимация слов при наведении
document.querySelectorAll('.lesson__word').forEach(word => {
    word.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    word.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закрываем меню на мобильных
            if (window.innerWidth <= 1000) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});