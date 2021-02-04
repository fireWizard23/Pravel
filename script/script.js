// Landing 
let tabs = document.querySelectorAll('.tab');
let tabHead = document.querySelector('.tabs-head');
let tabBodies = document.querySelectorAll('.tab-body')
let buttons = document.querySelectorAll('.btn');

class UI {

    static hideAllClasses(_classes) {
        Array.from(_classes).forEach(_class => {
            _class.style.display = 'none';
        })


    }

    static removeClassFromClasses(_targetClasses, _class) {
        Array.from(_targetClasses).forEach(_targetClass => {
            _targetClass.classList.remove(_class);
        });
    }


    static showTabBody(_tabId) {
        let realId = _tabId.replace('tab-', '');
        let tabBody = document.querySelector(`#tab-body-${realId}`)
        tabBody.style.display = 'flex';
    }

    static addAndAppendElement(_element, _location, _class) {
        let element = document.createElement(_element);
        element.className = _class;
        _location.appendChild(element);
    }
}


// Tabs 

tabHead.addEventListener('click', e => {
    if (e.target.classList.contains('tab')) {
        UI.hideAllClasses(tabBodies);
        UI.removeClassFromClasses(tabs, 'current-tab');

        UI.showTabBody(e.target.id);
        e.target.classList.add('current-tab')


    }
});














