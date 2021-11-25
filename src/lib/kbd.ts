/* This is the keyboard mapping library. */

import { DefaultKeyboard } from "./keyboards/default";

export type KeyboardModule = {
    name: string;
    mapping: Record<string, string>;
}

let context = {
    module: DefaultKeyboard,
    swapped: false,
    hooks: [],
};

function isUpper(str: string) {
    return str === str.toUpperCase();
}

function process(str: string) {
    console.log(str);
    context.hooks.forEach(fn => {
        fn(str);
    });
}

function keyup(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    const { key } = event;
    switch (key) {
        case ' ': {
            context.swapped = false;
            break;
        };
    };
}

function keydown(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();

    // Evaluate what key is pressed
    const { key } = event;
    switch (key) {
        case ' ': {
            context.swapped = true;
        };

        default: {
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
            console.log({ swapped: context.swapped, out })
            process(out);
        };
    }
}

export function kbd_configure(module: KeyboardModule) {
    context.module = module;
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

