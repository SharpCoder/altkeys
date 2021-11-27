/* This is the keyboard mapping library. */

import { DefaultKeyboard } from "./keyboards/default";

export type KeyboardModule = {
    name: string;
    /** If true, the mapping only applies when the layer is switched */
    layered: boolean;
    mapping: Record<string, string>;
}

let context = {
    module: DefaultKeyboard,
    swapped: false,
    hooks: [],
};

function isUpper(str: string) {
    // If it's a special character, return false always
    // because those are handled with mappings.
    if ([';', '\'', ',', '.', '/', '[', ']', '\\'].includes(str.charAt(0))) {
        return false;
    }

    return str === str.toUpperCase();
}

function process(str: string) {
    context.hooks.forEach(fn => {
        fn(str);
    });
}

function keyup(event: KeyboardEvent) {
    const { altKey } = event;
    if (altKey) {
        context.swapped = false;
    }
}

function keydown(event: KeyboardEvent) {
    // Evaluate what key is pressed
    let { altKey, code, key } = event;

    if (altKey || ['Space'].includes(code)) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();    
    }

    if (altKey || context.module.layered === false) {
        context.swapped = true;
    } else {
        context.swapped = false;
    }

    // Shift is interpreted as S ????
    if (['Shift', 'ShiftLeft', 'ShiftRight'].includes(code)) {
        key = '`';
    }
    

    const upper = isUpper(key);
    const inp = key.toLowerCase();
    let out = inp;
    
    if (context.swapped && context.module.mapping[inp]) {
        out = context.module.mapping[inp];
    } else {
        out = key;
    }

    if (upper) {
        out = out.toUpperCase();
    }
    
    process(out);

}

export function kbd_configure(module: KeyboardModule) {
    context.module = module;
}

export function kbd_get_layout() {
    return context.module;  
}

export function kbd_init() {
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
}

export function kbd_addhook(fn: (input: string) => void) {
    context.hooks.push(fn);
}

export function kbd_removehook(fn: (input: string) => void) {
    context.hooks.splice(
        context.hooks.indexOf(fn),
        1
    );
}

export function kbd_destroy() {
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
}