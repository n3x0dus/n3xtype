
import { loadJson } from "../net/JsonTools.mjs";

console.debug(`TaskInfo loaded`);

/*
 * TaskInfo
 */

/**
 * An object that contains information that is used to properly execute the
 * program.
 */
export class TaskInfo {
    constructor(prompt, title) {
        console.debug(`Generating new task...`);

        // Populate instance variables
        if (prompt !== null) {
            /**
             * The prompt of the task.
             */
            this.prompt = prompt;
        } else {
            console.error('No prompt exists within the task.');
        }

        if (title !== null) {

            /**
             * The title of the task.
             */
            this.title = title;
        } else {
            console.error('Not title exists within the task.');
        }

        /**
         * The amount of lines required of the user to start.
         */
        this.linesRequiredBase = 0;

        /**
         * The amount of lines added when a mistake occurs.
         */
        this.linesAddedMistakes = 0;

        /**
         * The amount of lines added when a user idles for the limited idle time.
         */
        this.linesAddedIdle = 0;

        console.info(`"${this.title}" has been generated.`);
    }

    /**
     * Loads data from the given URL and calls the loadFromData() function with
     * the data fetched from the URL.
     * @param {URL} url The URL location of where the data is located.
     */
    static async loadFromUrl(url) {
        await loadJson(url).then(data => {
            return this.loadFromData(data);
        });
    }

    /**
     * Generates and returns a task from a data.
     * @param {*} data The data containing the task.
     */
    static loadFromData(data) {
        console.debug(data);
        let x = new TaskInfo(data.nextype.prompt, data.nextype.title);
        x.linesRequiredBase = data.nextype.lines.base;
        
        console.debug(`Task returned "${data.nextype.title}".`);
        return x;
    }
}