import type { KeyboardModule } from "../kbd";

export const HalfQwertyLeft: KeyboardModule = {
    name: 'Half-Qwerty Left',
    layered: true,
    mapping: {
        // Left hand
        'q': 'p',
        'w': 'o',
        'e': 'i',
        'r': 'u',
        't': 'y',
        'a': ';',
        's': 'l',
        'd': 'k',
        'f': 'j',
        'g': 'h',
        'z': '/',
        'x': '.',
        'c': ',',
        'v': 'm',
        'b': 'n',
    },
};

export const HalfQwertyRight: KeyboardModule = {
    name: 'Half-Qwerty Right',
    layered: true,
    mapping: {
        // Right hand
        'p': 'q',
        'o': 'w',
        'i': 'e',
        'u': 'r',
        'y': 't',
        ';': 'a',
        'l': 's',
        'k': 'd',
        'j': 'f',
        'h': 'g',
        '/': 'z',
        '.': 'x',
        ',': 'c',
        'm': 'v',
        'n': 'b',
    }
}