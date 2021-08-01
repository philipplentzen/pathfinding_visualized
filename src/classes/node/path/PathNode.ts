import {Node} from "../Node";

export class PathNode extends Node {
    private readonly prevNode: Node;

    constructor(row: number, column: number, prevNode: Node) {
        super(row, column);
        this.prevNode = prevNode;
    }

    public getPrevNode(): Node {
        return this.prevNode;
    }

    public toString(): string {
        return "path";
    }
}