document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('[data-modal-type]');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-type');
            openModal(modalId);
        })
    })

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        })
    })

    document.querySelectorAll('.close-icon').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        })
    })

    document.querySelector('.modal-container').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal(document.querySelector('.modal:not([style*="display: none"])'));
        }
    })

    const selectors = document.querySelectorAll('.content__films-counter');
    let totalPrice = 0;
    const cartItems = document.querySelector('.cart-items');

    function addToCart(imageSrc) {
        const img = document.createElement('img');
        img.onload = function() {
            // Считаем смещение на основе ширины загруженного изображения и количества уже добавленных изображений
            const totalOffset = Array.from(cartItems.querySelectorAll('img')).reduce((offset, img) => offset + img.width / 2, 0);
            img.style.left = `${totalOffset}px`; // Устанавливаем смещение для текущего изображения
            cartItems.appendChild(img); // Добавляем изображение в контейнер только после загрузки и расчета смещения
        };
        img.src = imageSrc;
        img.classList.add('cart-item-image');
    }

    function removeFromCart(imageSrc) {
        const images = Array.from(cartItems.querySelectorAll('img'));
        for (let i = images.length - 1; i >= 0; i--) {
            if (images[i].src.includes(imageSrc)) {
                cartItems.removeChild(images[i]); // Удаляем найденное изображение
                // Пересчитываем и обновляем смещение для оставшихся изображений
                updateImagesPosition();
                break; // Выходим из цикла после удаления изображения
            }
        }
    }
    
    function updateImagesPosition() {
        const images = cartItems.querySelectorAll('img');
        let totalOffset = 0; // Начальное смещение
    
        images.forEach(img => {
            img.style.left = `${totalOffset}px`; // Устанавливаем новое смещение для изображения
            totalOffset += img.width / 2; // Увеличиваем общее смещение на половину ширины текущего изображения
        });
    }
    
    selectors.forEach((selector) => {
        const minusButton = selector.querySelector('.minus');
        const plusButton = selector.querySelector('.plus');
        const quantityDisplay = selector.querySelector('.quantity');
        const price = parseInt(selector.closest('.content__films-elem').querySelector('.content__films-price').dataset.price);

        let quantity = 0;
        updateDisplay();

        const imageSrc = selector.closest('.content__films-elem').querySelector('.content__films-img img').src;

        minusButton.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                totalPrice -= price;
                updateDisplay();
                updateTotalPrice();
                removeFromCart(imageSrc);
            }
        });

        plusButton.addEventListener('click', () => {
            quantity++;
            totalPrice += price;
            updateDisplay();
            updateTotalPrice();
            addToCart(imageSrc);
        });

        function updateDisplay() {
            quantityDisplay.textContent = quantity;
            minusButton.classList.toggle('disabled-btn', quantity === 0);
        }
    });

    const addButtons = document.querySelectorAll('.content__films-add');
    
    addButtons.forEach((addButton) => {
        addButton.addEventListener('click', function() {
            const imageSrc = addButton.closest('.content__films-elem').querySelector('.content__films-img img').src;
            const isAdded = addButton.textContent.trim() === 'Odebrat';
            const price = parseInt(addButton.closest('.content__films-elem').querySelector('.red-price').dataset.price);

            if (isAdded) {
                totalPrice -= price;
                addButton.textContent = 'Přidat';
                removeFromCart(imageSrc);
            } else {
                totalPrice += price;
                addButton.textContent = 'Odebrat';
                addToCart(imageSrc);
            }
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        document.getElementById('total-price').textContent = totalPrice;
    }
})




function openModal(modalId) {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    })

    document.querySelector(modalId).style.display = 'block';
    document.querySelector('.modal-container').style.display = 'flex';

    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.querySelector('.modal-container').style.display = 'none';
        document.body.style.overflow = '';
    }
}