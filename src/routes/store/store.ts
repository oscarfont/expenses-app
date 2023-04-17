import { get, writable, type Writable } from 'svelte/store';
import type { Storable } from './IStorable';

export function storable<T>(data: T): Storable<T> {
	const store: Writable<T> = writable(data);
	const { subscribe, set, update } = store;
	const isBrowser: boolean = typeof window !== 'undefined';

	if (isBrowser && localStorage.storable) {
		set(JSON.parse(localStorage.storable));
	}

	return {
		subscribe,
		set: (n: T): void => {
			if (isBrowser) {
				localStorage.storable = JSON.stringify(n);
			}
			set(n);
		},
		update: (cb: (value: T) => T): void => {
			const updatedStore: T = cb(get(store));
			if (isBrowser) {
				localStorage.storable = JSON.stringify(updatedStore);
			}
			set(updatedStore);
		}
	};
}
