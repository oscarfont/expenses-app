import type { writable, Writable } from 'svelte/store';

export interface Storable<T> extends Writable<T> {
	set: (value: T) => void;
	update: (callback: (value: T) => T) => void;
}
