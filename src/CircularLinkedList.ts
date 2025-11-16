import type { ILinkedList } from "./interfaces/ILinkedList.js";
import { Nodes } from "./Nodes.js";

/**
 * Uma lista encadeada circular tem a cauda apontando
 * para a cabeça da própria lista. Na prática, isso
 * significa que o tail.next referenciará head.
 */
export class CircularLinkedList<T> implements ILinkedList<T>, Iterable<T>
{
	private head: Nodes<T> | null = null;
	private tail: Nodes<T> | null = null;
	private length = 0;

	isEmpty(): boolean {
		return this.length === 0;
	}

	size(): number {
		return this.length;
	}

	clear(): void {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	peekFirst(): T | undefined {
		return this.head?.value
	}

	peekLast(): T | undefined {
		return this.tail?.value;
	}

	add(value: T): void {
		const node = new Nodes(value);
		if(!this.head){
			this.head = this.tail = node;
		} else {
			this.tail!.next = node;
			this.tail = node;
		}
		// em ambos os casos, a head aponta
		// para a cabeça
		this.tail.next = this.head;
		this.length++;
	}

	insertAt(index: number, value : T): boolean {
		if(index < 0 || index > this.length) 
			return false;

		if(index === 0){
			const node = new Nodes(value, this.head!);
			this.head = node;
			if(!this.tail)
				this.tail = node;
			this.length++;
			// mesmo caso
			this.tail.next = this.head;
			return true;
		}

		if(index === this.length){
			this.add(value);
			return true;
		}

		let prev  = this.head!;
		for(let i=0; i<index; i++){
			prev = prev.next!;
		}

		const node = new Nodes(value, prev.next);
		prev.next = node;
		this.length++;
		return true;
	}

	remove(value: T): boolean {
		
		if(!this.head) return false;

		if(this.head.value === value){
			this.head = this.head!.next;
			this.tail!.next = this.head;
			this.length--;
			if(!this.head) this.tail=null;
			return true;
		}

		let prev = this.head;
		let curr = this.head.next;

		while(curr){
			if(curr.value === value){
				prev.next = curr.next;
				if(curr === this.tail)
				{ 
					this.tail = prev;
					this.tail!.next = this.head;
				}
				this.length--;
				return true;
			}
			prev = curr;
			curr = curr.next;
		}
		return false;
	}

	get(index: number): T | undefined {
		if(index < 0 || index >= this.length) return undefined;

		let i = 0;
		let curr = this.head;

		while(curr && i < index){
			curr = curr.next;
			i++;
		}

		return curr?.value;
	}

	[Symbol.iterator](): Iterator<T> {
		let curr = this.head;
		// faria mais sentido impedir um loop infinito
		// interrompendo o loop ao passar por todos os nós.
		// No entanto, para facilitar a visualização da
		// circularidade, deixarei o loop executar duas vezes
		// let i = 0;
		let i = this.length-1 * 2;
		return {
			next : () : IteratorResult<T> => {
				if(curr && i > 0){
					const value = curr.value;
					curr = curr.next;
					i--;
					return {value, done: false}
				}
				return {value: undefined as any, done: true}
			}
		}
	}
}
