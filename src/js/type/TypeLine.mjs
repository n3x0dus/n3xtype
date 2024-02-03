
import { createStylesheet } from '../styler/Styler.mjs';

export class TypeLine extends HTMLElement {
    static observedAttributes = [ 'activity' ];

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        this.parent = null;

        this.prompt = '';
        this.input = '';

        this.failure = false;
        
        this.cstyle = createStylesheet('type');
        this.root.appendChild(this.cstyle);

        this.container = document.createElement('div');
        this.hint = document.createElement('p');
        this.display = document.createElement('p');

        this.container.classList.add('typedisplay', 'line');

        this.hint.classList.add('typedisplay', 'hint');
        this.display.classList.add('typedisplay', 'input');

        this.container.append(this.hint, this.display);

        this.root.appendChild(this.container);
        this.draw();

        console.debug(this.display);
    }

    connectedCallback() {
        console.debug(`New line generated at ${new Date()}.`);
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    handleInput(char) {
        if (this.getIsGood()) {
            this.input += char;
            this.display.textContent = this.input;
            console.debug(`input == ${this.input}`);
        }

        this.update();
        
    }

    draw() {
        console.debug(`hint.offsetHeight === ${this.hint.offsetHeight}`);
        this.hint.style.marginBottom = `${0 - this.hint.offsetHeight}px`;
    }

    update() {
        // If not good, set to failure.
        if (!this.getIsGood()) {
            this.failure = true;
        }

        if (this.failure) {
            this.display.classList.add('red');
        }

        if (this.getIsDone()) {
            this.container.removeChild(this.hint);
            this.parent.newLine();
        }

        this.draw();
    }

    assignHint(hint) {
        console.debug(`Hint assigned: ${hint}`);
        this.prompt = hint;
        this.hint.textContent = hint;
    }

    /**
     * Returns a boolean that defines whether the line is good.
     * @returns 
     */
    getIsGood() {
        return this.prompt.substring(0, this.input.length) === this.input;
    }

    getIsDone() {
        return this.prompt === this.input | this.failure;
    }

    getDisplay() {
        return this.parent;
    }

    setDisplay(parent) {
        this.parent = parent;
    }
}

customElements.define('n3xtype-typeline', TypeLine);
