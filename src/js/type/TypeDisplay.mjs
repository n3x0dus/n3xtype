
import { TypeLine } from './TypeLine.mjs';
import { createStylesheet } from '../styler/Styler.mjs';
import { TaskInfo } from '../info/TaskInfo.mjs';

/**
 * The display portion of a TypeScreen.
 */
export class TypeDisplay extends HTMLElement {
    static observedAttributes = [ 'active', 'hint', 'state', 'input' ];

    /**
     * Initiates the TypeDisplay.
     */
    constructor() {
        super();
        this.lines = [];
        this.prompt = 'Test';
        this.input = '';
        this.good = true;
        this.active = true;
        this.info = null;
        this.stats = null;
        
        this.listening = false;

        this.root = this.attachShadow({ mode: 'open' });

        this.cstyle = createStylesheet('type');
        this.root.appendChild(this.cstyle);

        this.lineContainer = document.createElement('section');
        this.lineContainer.classList.add('typedisplay', 'lines');

        this.root.appendChild(this.lineContainer);

        this.update();
    }

    currentLine() {
        return this.lines[this.lines.length - 1];
    }

    clearLines() {
        this.lineContainer.replaceChildren();
        this.lines = [];
    }

    newLine() {
        let x = document.createElement('n3xtype-typeline');
        x.assignHint(this.info.prompt);
        x.setDisplay(this);
        this.lines.push(x);
        this.lineContainer.appendChild(this.currentLine());
    }

    connectedCallback() {
        console.log(`Connected`);
    }

    disconnectedCallback() {

    }

    handleKeyDown(event) {
        const key = event.key;
        const char = event.key.length === 1 ? event.key : '';

        console.debug(`Key pressed ${char}`);

        if (char) {
            this.currentLine().handleInput(char);
        }

        this.update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.update();
    }

    loadInfo(info) {
        // TODO Require to run this before drawing first.
        console.debug(`Loading information from ${info}`);
        this.info = info;
        this.stats = new TaskStats(info);

        this.setPrompt(this.info.prompt);
        console.debug(`Prompt set (${this.getPrompt()})`);
    }

    update() {
        // Define the keydown bind.
        this.handler = this.handleKeyDown.bind(this);
        if (this.active && !this.listening) {
            this.listening = true;
            document.addEventListener('keydown', this.handler);
            console.debug(`Added listener.`);
        } else {
            document.removeEventListener('keydown', this.handler);
        }
        if (this.prompt.substring(0, this.input.length) === this.input) {
            this.good = true;
        } else {
            this.good = false;
            this.display.classList.add('fail');
            this.hint.classList.add('fail');
        }
    }

    getActive() {
        return this.active;
    }

    setActive(x) {
        this.active = x;
    }

    /**
     * Gets and returns the prompt text that the user must type.
     * @returns The prompt text that the user must type.
     */
    getPrompt() {
        return this.prompt;
    }

    /**
     * Sets the prompt text that the user must type.
     * @param {string} prompt The prompt text that the user must type.
     */
    setPrompt(prompt) {
        this.prompt = prompt;

        this.clearLines();
        this.newLine();
    }
}

/**
 * Includes the typing statistics.
 */
class TaskStats {
    constructor(info) {
        /**
         * The basic information about the task.
         */
        this.info = info;

        console.debug(info);

        if (info === null) {
            console.debug(`Generating default task...`);
            this.info = new TaskInfo();
            this.info.prompt = 'This is a test prompt.';
            this.info.linesRequiredBase = 5;
            this.linesAddedMistakes = 1;
            this.linesAddedIdle = 1;
        } else {
            this.info = info;
        }

        /**
         * The amount of lines that the user has finished.
         */
        this.linesDone = 0;

        /**
         * The amount of lines that is required of the user.
         */
        this.linesRequired = this.info.linesRequiredBase;
    }

    /**
     * Reports to the program that the user typed a mistake.
     */
    mistake() {
        
    }
}