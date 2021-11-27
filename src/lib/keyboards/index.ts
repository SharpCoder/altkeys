import { DefaultKeyboard } from "./default";
import { DvorakKeyboard } from "./dvorak";
import { HalfQwertyLeft, HalfQwertyRight } from "./half-qwerty";

export const Layouts = {
    'default': DefaultKeyboard,
    'half-qwerty-left': HalfQwertyLeft,
    'half-qwerty-right': HalfQwertyRight,
    'dvorak': DvorakKeyboard,
};
