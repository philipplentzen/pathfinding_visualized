import {Algorithm} from "../Algorithm";
import {Node} from "../../node/Node";
import {TargetNode} from "../../node/TargetNode";
import {EmptyNode} from "../../node/EmptyNode";
import {BreadthNode} from "../../node/breadth/BreadthNode";
import {BreadthTargetNode} from "../../node/breadth/BreadthTargetNode";
import {ShortestNode} from "../../node/ShortestNode";
import {BreadthStartNode} from "../../node/breadth/BreadthStartNode";
import {BreadthQueuedNode} from "../../node/breadth/BreadthQueuedNode";

export class BreadthFirstAlgorithm extends Algorithm {
    private operations: [number, number][];

    constructor() {
        super();

        this.operations = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];
    }

    public async run(startNode: Node, grid: Node[][], speed: number): Promise<Node[][]> {
        const queue = [startNode];
        const toUpdate: Node[] = [];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode !== undefined) {
                if (currentNode instanceof BreadthQueuedNode) {
                    toUpdate.push(new BreadthNode(currentNode.getRow(), currentNode.getColumn(), currentNode.getPrevNode()));
                } else if (currentNode instanceof BreadthTargetNode) {
                    let prevNode = currentNode.getPrevNode();

                    while (prevNode instanceof BreadthNode) {
                        toUpdate.push(new ShortestNode(prevNode.getRow(), prevNode.getColumn()));
                        prevNode = prevNode.getPrevNode();
                    }

                    toUpdate.push(new BreadthStartNode(prevNode.getRow(), prevNode.getColumn()));

                    break;
                }

                this.operations.forEach(([deltaRow, deltaColumn]) => {
                    const newRow = currentNode.getRow() + deltaRow;
                    const newColumn = currentNode.getColumn() + deltaColumn;

                    if (newRow >= 0 && newRow < grid.length && newColumn >= 0 && newColumn < grid[0].length) {
                        let newNode = grid[newRow][newColumn];

                        if (newNode instanceof TargetNode) {
                            newNode = new BreadthTargetNode(newRow, newColumn, currentNode);
                        } else if (newNode instanceof EmptyNode) {
                            newNode = new BreadthQueuedNode(newRow, newColumn, currentNode);
                        }

                        if (newNode !== grid[newRow][newColumn]) {
                            grid[newRow][newColumn] = newNode;
                            toUpdate.push(newNode);
                            queue.push(newNode);
                        }
                    }
                });
            }
        }

        return await BreadthFirstAlgorithm.draw(toUpdate, grid);
    }
}