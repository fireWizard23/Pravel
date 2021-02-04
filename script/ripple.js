document.addEventListener('click', e => {

    if (e.target.classList.contains('btn')) {
        let rippleElement = document.createElement('span');
        rippleElement.classList.remove('ripple');
        rippleElement.className = 'ripple-effect';
        e.target.appendChild(rippleElement);
        rippleElement.style.top = e.offsetY - 50 + 'px';
        rippleElement.style.left = e.offsetX - 50 + 'px';

        rippleElement.classList.add('ripple')

        setTimeout(() => {
            rippleElement.remove();
        }, 500)
    }
})