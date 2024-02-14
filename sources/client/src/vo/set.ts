import { isEqual as _isEqual } from 'lodash';

export class Set<T> {
	readonly #data: ReadonlyArray<T>;

	public static new<T>(data: ReadonlyArray<T> = []): Set<T> {
		return new Set(data);
	}

	private constructor(data: ReadonlyArray<T> = []) {
		this.#data = data;
	}

	public add(value: T): Set<T> {
		if (this.has(value)) {
			return this;
		}

		return Set.new([...this.#data, value]);
	}

	public delete(value: T): Set<T> {
		if (!this.has(value)) {
			return this;
		}

		return Set.new(this.#data.filter((item) => !this.isEqual(item, value)));
	}

	public has(value: T): boolean {
		return this.#data.some((current) => this.isEqual(current, value));
	}

	public map<R = T>(fn: (value: T) => R): Set<R> {
		return Set.new(this.#data.map(fn));
	}

	public toArray(): ReadonlyArray<T> {
		return Object.freeze([...this.#data]);
	}

	public forEach(fn: (value: T) => void): void {
		this.#data.forEach(fn);
	}

	public length(): number {
		return this.#data.length;
	}

	public concat(set: Set<T>): Set<T> {
		return Set.new([...this.#data, ...set.toArray()]);
	}

	public filter(fn: (value: T) => boolean): Set<T> {
		return Set.new(this.#data.filter(fn));
	}

	public find(fn: (value: T) => boolean): T | undefined {
		return this.#data.slice(0).find(fn);
	}

	public first(): T | undefined {
		return this.#data.slice(0)[0];
	}

	public last(): T | undefined {
		return this.#data.slice(-1)[0];
	}

	public copy(start: number, end: number): Set<T> {
		return Set.new(this.#data.slice(start, end));
	}

	public equals(set: Set<T>): boolean {
		if (this.length() !== set.length()) {
			return false;
		}

		if (this === set) {
			return true;
		}

		for (const value of this) {
			if (!set.has(value)) {
				return false;
			}
		}

		return true;
	}

	public *[Symbol.iterator]() {
		for (const value of this.#data) {
			yield value;
		}
	}

	private isEqual(a: unknown, b: unknown): boolean {
		return _isEqual(a, b);
	}
}
