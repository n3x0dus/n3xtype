
import { TypeDisplay } from './TypeDisplay.mjs';
import { TaskInfo } from '../info/TaskInfo.mjs';

customElements.define('n3xtype-typedisplay', TypeDisplay);

const TS_TEST_ENV = true;

/**
 * The screen used to display typing.
 */
export class TypeScreen extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        this.display = document.createElement('n3xtype-typedisplay');
        shadowRoot.appendChild(this.display);
    }

    connectedCallback() {
        console.log('Typescreen experience added to page.');

        let info = new TaskInfo("Prompt", "Debug task");
        let display = this.display;
        let x = TaskInfo.loadFromUrl('/test/task_debug.json').then(data => {
            if (data !== null) {
                console.debug(data);
                display.loadInfo(data);
            }
        })
        .catch(err => {
            console.error(`Cannot load data: ${err}`);
        });
    }

    disconnectedCallback() {
        console.log('Typescreen experience removed from page.');
    }
}

customElements.define('n3xtype-typescreen', TypeScreen);