import type { KeyboardModule } from "../kbd";

export const HalfQwerty: KeyboardModule = {
    name: 'Half-Qwerty',
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