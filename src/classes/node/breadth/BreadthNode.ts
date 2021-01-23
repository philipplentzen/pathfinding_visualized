import {Node} from "./Node";

export class BreadthNode extends Node {
    public prevNode: Node;
    public length: number;
    public isVisited: boolean;

    constructor(row: number, column: number, prevNode: Node, length: number) {
        super(row, column);
        this.prevNode = prevNode;
        this.length = length;
        this.isVisited = false;
    }

    public toString(): string {
        return "breadth";
    }

}