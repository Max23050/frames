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

    document.querySelector('.modal-container').addEventListener('click', function(event) {
        if (event.target === this) {
            closeModal(document.querySelector('.modal:not([style*="display: none"])'));
        }
    })
})




function openModal(modalId) {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    })

    document.querySelector(modalId).style.display = 'block';
    document.querySelector('.modal-container').style.display = 'flex';
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.querySelector('.modal-container').style.display = 'none';
    }
}