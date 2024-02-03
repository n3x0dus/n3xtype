
export function createStylesheet(type) {
    var x = document.createElement('link');
    x.setAttribute('rel', 'stylesheet');

    var y;

    switch (type) {
        case 'type':
            y = 'type/Type.css';
            console.debug(`Style "${type}" created.`);
            break;
        default:
            console.error(`Style "${type}" is invalid.`)
            break;
    }

    x.setAttribute('href', '/src/css/' + y);
    return x;
}