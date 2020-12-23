/*
My virtual keyboard for task with reduced functionality
*/

const Keyboard = {
    keyboard: null,
    keyContainer: null,
    keys: null,
    input: null,
    capsLock: false,
    shift: false,
    cursPos: 0,
    isRus: false,
    isMute: false,
    isRecord: false,
    recognition: null,
    keyLayout: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "done", 'lang',
        "space", "", "", '', ''
    ],

    start() {
        this.keyContainer = document.querySelector('.keyboard__buttons');
        this.input = document.querySelector('.use-keyboard-input');
        this.keyContainer.appendChild(this._createKeys());
        this.keys = document.querySelectorAll('.keyboard__buttons__button');
        this.keyboard = document.querySelector('.keyboard');
        this.input.addEventListener('click', () => {
            this.keyboard.classList.remove('keyboard__hidden')
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        this.keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "/"].indexOf(key) !== -1;
            keyElement.classList.add('keyboard__buttons__button');
            keyElement.addEventListener('mousedown', (e) => {
                e.target.classList.add('keyboard__buttons__button--pressed');
            });
            keyElement.addEventListener('mouseup', (e) => {
                e.target.classList.remove('keyboard__buttons__button--pressed');
            });
            keyElement.addEventListener('mouseover', (e) => {
                e.target.classList.remove('keyboard__buttons__button--pressed');
            });
            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__buttons__button__wide');
                    keyElement.innerHTML = "&larr;";
                    keyElement.dataset.backspace = true;
                    keyElement.addEventListener('click', () => {

                        const start = this.input.selectionStart;
                        const end = this.input.selectionEnd;
                        if (start > 0) {
                            this.input.setRangeText('', start - 1, end, 'end');
                            this.input.dispatchEvent(new Event('input'));
                        }
                        this.input.focus()
                    })
                    break;
                case 'enter':
                    keyElement.classList.add('keyboard__buttons__button__wide');
                    keyElement.innerHTML = '&crarr;';
                    keyElement.dataset.enter = true;
                    keyElement.addEventListener('click', () => {
                        this.input.value += '\n';
                        this.input.focus();
                    })
                    break;
                case 'done':
                    keyElement.classList.add('keyboard__buttons__button__wide');
                    keyElement.innerHTML = '&#10004;';
                    keyElement.addEventListener('click', () => {
                        this.keyboard.classList.add('keyboard__hidden');
                    })
                    break;
                case 'space':
                    keyElement.classList.add('keyboard__buttons__button__space');
                    keyElement.innerHTML = '___';
                    keyElement.dataset.space = true;
                    keyElement.addEventListener('click', () => {
                        this.input.value += ' ';
                        this.input.dispatchEvent(new Event('input'));
                        this.input.focus();
                    })
                    break;

                default:
                    keyElement.textContent = key;
                    keyElement.addEventListener('click', () => {
                        this.input.value += keyElement.innerText;
                        this.input.dispatchEvent(new Event('input'));
                        this.input.focus()
                    })
                    break;
            }
            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        })
        return fragment;
    },

}


export default Keyboard;