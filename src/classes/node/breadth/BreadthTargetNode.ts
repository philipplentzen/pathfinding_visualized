import {TargetNode} from "../TargetNode";
import {Node} from "../Node";

export class BreadthTargetNode extends TargetNode {
    private prevNode: Node;

    constructor(row: number, column: number, prevNode: Node) {
        super(row, column);
        this.prevNode = prevNode;
    }

    public getPrevNode(): Node {
        return this.prevNode;
    }

    public toString(): string {
        return "breadth shortest target";
    }

}