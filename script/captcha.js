let buttonContainer = document.querySelector('.button-container');
let loading = document.querySelector('.loading');
let popupBox = document.querySelector('.pop-up-box');
let hasClicked = false;
let boxes = document.querySelectorAll('.box');
let formInputs = document.querySelector('.form').querySelectorAll('input')

let selected = 0;
let randomArray = [];
let answers = 0;
let isVerified = false;



class UI {
    static randomizer(_amount, _upto) {
        let output = [];
        for (let i = 0; i < _amount; i++) {
            let index = (Math.floor(Math.random() * _upto));
            if (output.indexOf(index) < 0) output.push(index);
            else i--;
        }
        return output;
    }

    static addImage(_imgUrl, _toAppend) {
        _toAppend.innerHTML = `<img src="${_imgUrl}">`;

    }

    static figureBox() {
        randomArray = this.randomizer(3, 9);
        Array.from(boxes).forEach((_box, index) => {
            // let rand = randomArray[index];
            let parsedId = parseInt(_box.id.replace('box-', ''))
            if (randomArray.indexOf(parsedId) >= 0) {
                UI.addImage('./images/tick.svg', _box);
            } else UI.addImage('./images/wrong.png', _box)
        })
        UI.clearClassFromClasses(boxes, 'selected');
        answers = 0;


    }

    static clearClassFromClasses(_classes, _toRemove) {
        Array.from(_classes).forEach(_class => _class.classList.remove(_toRemove));
    }



    static showMessage(_message, _type) {
        let message = document.createElement('div');

        message.innerText = _message;
        message.className = 'message ' + _type;
        document.querySelector('body').appendChild(message);
        message.style.opacity = 1;
        message.style.animation = 'fade-in 1.5s ease-out'
        setTimeout(() => {
            message.remove();
        }, 4000)
        answers = 0;

    }


}


buttonContainer.addEventListener('click', e => {
    if (!hasClicked) {
        buttonContainer.classList.add('clicked')
        loading.style.opacity = 1;

        // Set opacity of Loading to 0 
        setTimeout(() => {
            loading.style.opacity = 0;

        }, 1100)

        setTimeout(() => {
            buttonContainer.classList.remove('clicked');
        }, 2300)

        setTimeout(() => {
            UI.figureBox();
            popupBox.style.display = 'flex';
        }, 2500)
        hasClicked = true;
    }


})

document.addEventListener('click', e => {
    if (e.target.classList.contains('box')) {
        e.target.classList.toggle('selected')
        if (!e.target.classList.contains('selected')) selected--;
        else if (e.target.classList.contains('selected')) selected++;
    }
    // Checked if clicked on anything other than captcha 
    if (hasClicked == true && !e.target.classList.contains('captcha-box') && !e.target.classList.contains('button-container')
        && !e.target.classList.contains('pop-up-box') && !e.target.classList.contains('box') && !e.target.classList.contains('boxes')
        && !e.target.parentElement.classList.contains('captcha-box') && !e.target.parentElement.classList.contains('pop-up-box')
        && !e.target.parentElement.classList.contains('boxes-head') && !e.target.parentElement.classList.contains('captcha-buttons')) {
        hasClicked = false;
        popupBox.style.display = 'none'
        selected = 0;
        answers = 0;

    }

    else if (e.target.classList.contains('btn-retry')) {
        UI.figureBox();
        selected = 0;
    } else if (e.target.classList.contains('btn-verify')) {
        answers = 0;

        if (selected < 3) {
            UI.showMessage('Please select up to 3', 'warning')
        } else if (selected > 3) {
            UI.showMessage('Try Again', 'warning')
            UI.figureBox();
            selected = 0;
        } else {
            let selecteds = document.querySelectorAll('.selected');

            Array.from(selecteds).forEach((_selected) => {
                answers += randomArray.indexOf(parseInt(_selected.id.replace('box-', '')))
            })
            if (answers >= 3) {
                popupBox.remove();
                UI.addImage('./images/tick.svg', buttonContainer)
                buttonContainer.style.pointerEvents = 'none';
                isVerified = true;
            }
        }
    }

    // Check if valid inputs 
    if (e.target.classList.contains('btn-submit')) {
        let inputValidations = isValid();
        if (isVerified == false && inputValidations == true) {
            e.preventDefault();
            UI.showMessage('Please verify if you are not a robot', 'warning')
        } else if (isVerified && inputValidations) {
            e.preventDefault();

            Array.from(formInputs).forEach(input => {
                input.value = '';
            })
            UI.showMessage('Success', 'success')
        }


    }

})

document.addEventListener('keydown', e => {
    if (hasClicked && e.key === 'Escape') {
        console.log(hasClicked)
        popupBox.style.display = 'none'
    }
})


function isValid() {
    let isValidOutput = true;
    let formInputsArray = Array.from(formInputs).map(input => input.validity.valid);
    if (formInputsArray.indexOf(false) < 0) return isValidOutput;
    else return false;
}