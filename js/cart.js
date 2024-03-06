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

    const totalPriceDisplay = document.querySelector('.fixed-block__price');
    let totalPrice = 0;


    const selectors = document.querySelectorAll('.content__films-counter');
  
    selectors.forEach((selector) => {
        const minusButton = selector.querySelector('.minus');
        const plusButton = selector.querySelector('.plus');
        const quantityDisplay = selector.querySelector('.quantity');

        let quantity = 0;
        updateDisplay();

        minusButton.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                updateDisplay();
            }
        });

        plusButton.addEventListener('click', () => {
            quantity++;
            updateDisplay();
        });

        function updateDisplay() {
            quantityDisplay.textContent = quantity;
            minusButton.classList.toggle('disabled', quantity === 0);
        }
        
    });
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