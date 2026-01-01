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

document.addEventListener('DOMContentLoaded', function() {
  // Элементы управления
  const checkButton = document.querySelector('.homework__button--check');
  const resetButton = document.querySelector('.homework__button--reset');
  const inputs = document.querySelectorAll('.homework__input');
  
  // Проверка ответов
  checkButton.addEventListener('click', function() {
    let correctCount = 0;
    
    inputs.forEach(input => {
      const userAnswer = normalizeArabic(input.value.trim());
      const correctAnswer = normalizeArabic(input.dataset.correct || '');
      
      // Очищаем предыдущие статусы
      input.classList.remove('correct', 'incorrect');
      
      // Проверяем и устанавливаем новый статус
      if (userAnswer === correctAnswer && userAnswer !== '') {
        input.classList.add('correct');
        correctCount++;
      } else if (userAnswer !== '') {
        input.classList.add('incorrect');
      }
    });
    
    // Показываем результат
    showResult(correctCount, inputs.length);
  });
  
  // Сброс всех полей
  resetButton.addEventListener('click', function() {
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'incorrect');
    });
    hideResult();
  });
  
  // Нормализация арабского текста (удаление диакритики)
  function normalizeArabic(text) {
    return text
      .replace(/[\u064B-\u065F]/g, '') // Удаляем огласовки
      .replace(/[إأآا]/g, 'ا')         // Нормализуем алиф
      .replace(/ة/g, 'ه')              // Та марбута в обычную ха
      .replace(/ى/g, 'ي')              // Алиф максура в йа
      .replace(/\s+/g, ' ')           // Нормализуем пробелы
      .trim();
  }
  
  // Показать результат проверки
  function showResult(correct, total) {
    // Удаляем старый результат если есть
    const oldResult = document.querySelector('.homework__result');
    if (oldResult) oldResult.remove();
    
    const percentage = Math.round((correct / total) * 100);
    let message = '';
    let resultClass = '';
    
    if (percentage === 100) {
      message = '🎉 Отлично! Все ответы правильные!';
      resultClass = 'homework__result--excellent';
    } else if (percentage >= 70) {
      message = `👍 Хорошо! Правильных ответов: ${correct} из ${total}`;
      resultClass = 'homework__result--good';
    } else if (percentage >= 40) {
      message = `📚 Есть ошибки. Правильных ответов: ${correct} из ${total}`;
      resultClass = 'homework__result--average';
    } else {
      message = `💪 Нужно повторить слова. Правильных ответов: ${correct} из ${total}`;
      resultClass = 'homework__result--poor';
    }
    
    // Создаем элемент с результатом
    const resultElement = document.createElement('div');
    resultElement.className = `homework__result ${resultClass}`;
    resultElement.innerHTML = `
      <div class="homework__result-content">
        <p class="homework__result-text">${message}</p>
        <div class="homework__result-progress">
          <div class="homework__progress-bar" style="width: ${percentage}%"></div>
        </div>
        <p class="homework__result-percentage">${percentage}%</p>
      </div>
    `;
    
    // Добавляем стили для результата
    const resultStyles = document.createElement('style');
    resultStyles.textContent = `
      .homework__result {
        margin-top: 25px;
        padding: 20px;
        border-radius: 10px;
        animation: fadeIn 0.5s ease;
      }
      
      .homework__result--excellent {
        background: #c6f6d5;
        border: 2px solid #38a169;
      }
      
      .homework__result--good {
        background: #fed7d7;
        border: 2px solid #ed8936;
      }
      
      .homework__result--average {
        background: #feebc8;
        border: 2px solid #ecc94b;
      }
      
      .homework__result--poor {
        background: #fed7d7;
        border: 2px solid #e53e3e;
      }
      
      .homework__result-content {
        text-align: center;
      }
      
      .homework__result-text {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 15px 0;
      }
      
      .homework__result-progress {
        height: 10px;
        background: #e2e8f0;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;
      }
      
      .homework__progress-bar {
        height: 100%;
        background: #4299e1;
        transition: width 0.5s ease;
      }
      
      .homework__result-percentage {
        font-size: 18px;
        font-weight: bold;
        color: #2d3748;
        margin: 0;
      }
    `;
    
    // Добавляем результат после кнопок
    const controls = document.querySelector('.homework__controls');
    controls.parentNode.insertBefore(resultElement, controls.nextSibling);
    document.head.appendChild(resultStyles);
  }
  
  // Скрыть результат
  function hideResult() {
    const result = document.querySelector('.homework__result');
    if (result) result.remove();
  }
});