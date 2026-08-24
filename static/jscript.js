document.addEventListener('DOMContentLoaded', function() {
    //карточки фракталов
    const fractalRadios = document.querySelectorAll('.card-radio');
    const fractalCards = document.querySelectorAll('.card');
    const fractalCardImages = document.querySelectorAll('.card img');
    
    function updateFractalCards() {
        fractalCards.forEach(card => {
            card.style.filter = 'none';
            card.style.backdropFilter = 'none';
            card.style.opacity = '1';
        });
        
        fractalCardImages.forEach(img => {
            img.src = img.src.replace('_r.png', '_g.png');
        });
        
        const checkedRadio = document.querySelector('.card-radio:checked');
        if (checkedRadio) {
            fractalCards.forEach(card => {
                if (!card.parentElement.querySelector('input[type="radio"]:checked')) {
                    card.style.filter = 'brightness(0.6)';
                    card.style.opacity = '0.3';
                }
            });
            
            const selectedCard = checkedRadio.nextElementSibling;
            const selectedImg = selectedCard.querySelector('img');
            selectedImg.src = selectedImg.src.replace('_g.png', '_r.png');
        }
    }
    
    fractalRadios.forEach(radio => {
        radio.addEventListener('change', updateFractalCards);
    });
    
    //карточки настроений
    const moodRadios = document.querySelectorAll('.mood-radio');
    const moodCards = document.querySelectorAll('.mcard');
    const moodIcons = document.querySelectorAll('.mood-icon');
    
    function updateMoodCards() {
        moodCards.forEach(card => {
            card.style.filter = 'none';
            card.style.opacity = '1';
            card.style.color = 'var(--lime)';
        });
        
        const checkedMoodRadio = document.querySelector('.mood-radio:checked');
        if (checkedMoodRadio) {
            moodCards.forEach(card => {
                if (!card.parentElement.querySelector('input[type="radio"]:checked')) {
                    card.style.filter = 'brightness(0.6)';
                    card.style.opacity = '0.3';
                }
            });
            
            const selectedMoodCard = checkedMoodRadio.nextElementSibling;
            selectedMoodCard.style.color = 'var(--red)';
        }
    }
    
    moodRadios.forEach(radio => {
        radio.addEventListener('change', updateMoodCards);
    });
    
    //карточки эффектов
    const effectRadios = document.querySelectorAll('.effect-radio');
    const effectCards = document.querySelectorAll('.ecard');
    const effectIcons = document.querySelectorAll('.effect-icon');
    
    function updateEffectCards() {
        effectCards.forEach(card => {
            card.style.filter = 'none';
            card.style.opacity = '1';
            card.style.color = 'var(--lime)';
        });
        
        const checkedEffectRadio = document.querySelector('.effect-radio:checked');
        if (checkedEffectRadio) {
            effectCards.forEach(card => {
                if (!card.parentElement.querySelector('input[type="radio"]:checked')) {
                    card.style.filter = 'brightness(0.6)';
                    card.style.opacity = '0.3';
                }
            });
            
            const selectedEffectCard = checkedEffectRadio.nextElementSibling;
            selectedEffectCard.style.color = 'var(--red)';
        }
    }
    
    effectRadios.forEach(radio => {
        radio.addEventListener('change', updateEffectCards);
    });
    
    //валидация и отправка формы
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        //сброс ошибок
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        //проверка числовых полей
        const duration = document.getElementById('duration');
        const bpm = document.getElementById('bpm');
        let isValid = true;
        
        if (!duration.value || isNaN(duration.value)) {
            document.getElementById('duration-error').textContent = 'Пожалуйста, введите число';
            isValid = false;
        } else if (duration.value < 10 || duration.value > 300) {
            document.getElementById('duration-error').textContent = 'Длительность должна быть от 10 до 300 секунд';
            isValid = false;
        }
        
        if (!bpm.value || isNaN(bpm.value)) {
            document.getElementById('bpm-error').textContent = 'Пожалуйста, введите число';
            isValid = false;
        } else if (bpm.value < 30 || bpm.value > 240) {
            document.getElementById('bpm-error').textContent = 'BPM должен быть от 30 до 240';
            isValid = false;
        }
        
        //проверка радио кнопок
        if (!document.querySelector('input[name="fractal_type"]:checked')) {
            document.getElementById('fractal-error').textContent = 'Пожалуйста, выберите тип фрактала';
            isValid = false;
        }
        
        if (!document.querySelector('input[name="mood_type"]:checked')) {
            document.getElementById('mood-error').textContent = 'Пожалуйста, выберите настроение';
            isValid = false;
        }
        
        if (!document.querySelector('input[name="effect_type"]:checked')) {
            document.getElementById('effect-error').textContent = 'Пожалуйста, выберите эффект';
            isValid = false;
        }
        
        if (!isValid) return;
        
        const formData = {
            duration: duration.value,
            bpm: bpm.value,
            fractal_type: document.querySelector('input[name="fractal_type"]:checked').value,
            mood_type: document.querySelector('input[name="mood_type"]:checked').value,
            effect_type: document.querySelector('input[name="effect_type"]:checked').value
        };
        
        //отправка днных на сервер
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { //вывод изображения
                const imgContainer = document.getElementById('fractal-img-container');
                const fractalImg = document.getElementById('fractal-image');
                
                fractalImg.src = data.image_path;
                imgContainer.style.display = 'block';
            } else {
                alert('Ошибка генерации: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке данных');
        });
    });
    
    // апдейт карт
    updateFractalCards();
    updateMoodCards();
    updateEffectCards();
});