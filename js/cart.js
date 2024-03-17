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

    function addToCart(imageSrc, productName, price) {
        const cartItemsContainer = document.querySelector('.cart-items');
    
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.price = price;
        const totalItems = cartItemsContainer.children.length;
        cartItem.style.left = `${totalItems * 180}px`; // смещение каждого нового элемента
    
        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('cart-item-image');
    
        const details = document.createElement('div');
        details.classList.add('cart-item-details');
    
        const name = document.createElement('div');
        name.textContent = productName;
        name.classList.add('cart-item-name');
    
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('cart-item-remove');
        removeBtn.onclick = function() {
            cartItem.remove();
            // Обновляем смещение оставшихся элементов
            updateItemsPosition();
            updateTotalPrice(); // Предполагается, что у вас есть функция для обновления общей цены
        };

        const icon = document.createElement('img');
        icon.src = 'icons/krizek-cart.svg';
        icon.alt = 'remove-krizek';
        removeBtn.appendChild(icon);
    
        details.appendChild(name);
        details.appendChild(removeBtn);
        cartItem.appendChild(img);
        cartItem.appendChild(details);
        
        cartItemsContainer.appendChild(cartItem);

        updateTotalPrice();
    }
    
    function updateItemsPosition() {
        const cartItems = document.querySelectorAll('.cart-items .cart-item');
        cartItems.forEach((item, index) => {
            item.style.left = `${index * 180}px`;
        });
    }
    

    const addButtons = document.querySelectorAll('.content__films-add');
    
    addButtons.forEach((addButton) => {
        addButton.addEventListener('click', function() {
            const productElem = addButton.closest('.content__films-elem');
            const imageSrc = productElem.querySelector('.content__films-img img').src;
            const productName = productElem.querySelector('.content__films-text').textContent;

            const price = productElem.querySelector('.content__films-price').getAttribute('data-price');
            
            addToCart(imageSrc, productName, price);
        });
    });

    function updateTotalPrice() {
        let totalPrice = 0;
        const cartItems = document.querySelectorAll('.cart-items .cart-item');
        cartItems.forEach(item => {
            const price = parseInt(item.dataset.price, 10); // Получаем цену из data-price
            totalPrice += price;
        });
        document.querySelector('#total-price').textContent = `${totalPrice}`; // Обновляем текст общей стоимости
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