import { writable } from 'svelte/store';

export const progress = writable(0);
export const layout = writable('half-qwerty-left');