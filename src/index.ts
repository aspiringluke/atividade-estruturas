import { CircularLinkedList } from "./CircularLinkedList.js";
import { CircularDoubleLinkedList } from "./CircularDoubleLinkedList.js";
import type { ILinkedList } from "./interfaces/ILinkedList.js";
import type { IDoubleLinkedList } from "./interfaces/IDoubleLinkedList.js";

let testarLec = true;
// let testarLec = false;

function info(list: ILinkedList<any> | IDoubleLinkedList<any>, index: number = 0)
{
	console.log();
	console.log(`Está vazia? ${list.isEmpty()}`);
	console.log(`Tamanho: ${list.size()}`);
	console.log(`Primeiro: ${list.peekFirst()}`);
	console.log(`Último: ${list.peekLast()}`);
	console.log(`Valor da posição ${index}: ${list.get(index)}`)
	console.log();
}

function simpleTest(list: CircularLinkedList<any> | CircularDoubleLinkedList<any>)
{
	info(list);
	const listSize = Math.round(Math.random()*7);
	for(let i=0; i<7; i++)
	{
		list.add(Math.round(Math.random()*10));
	}
	info(list, 2);

	console.log(`Removendo: ${list.remove(8)}`);
	info(list, 2);

	console.log("Iterando 2 vezes sobre a lista. . .");
	for(const elem of list)
	{
		console.log(elem);
	}

	console.log("Limpando. . .");
	list.clear();
	info(list);
}

let list;

if(testarLec) list = new CircularLinkedList<number>();
else list = new CircularDoubleLinkedList<number>();

simpleTest(list);