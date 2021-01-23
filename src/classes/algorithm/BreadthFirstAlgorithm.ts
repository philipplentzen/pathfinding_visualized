import {Algorithm} from "./Algorithm";
import {Node} from "../node/Node";
import {TargetNode} from "../node/TargetNode";
import {EmptyNode} from "../node/EmptyNode";
import {BreadthNode} from "../node/breadth/BreadthNode";
import {BreadthTargetNode} from "../node/breadth/BreadthTargetNode";
import {ShortestNode} from "../node/ShortestNode";

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

        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (currentNode !== undefined) {
                document.getElementById(currentNode.getId())?.classList.add("visited");

                if (currentNode instanceof BreadthTargetNode) {
                    grid[currentNode.getRow()][currentNode.getColumn()] = new TargetNode(currentNode.getRow(), currentNode.getColumn());
                    let prevNode = currentNode.getPrevNode();

                    while (prevNode instanceof BreadthNode) {
                        grid[prevNode.getRow()][prevNode.getColumn()] = new ShortestNode(prevNode.getRow(), prevNode.getColumn());
                        prevNode = prevNode.getPrevNode();
                    }

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
                            newNode = new BreadthNode(newRow, newColumn, currentNode);
                        }

                        if (newNode !== grid[newRow][newColumn]) {
                            grid[newRow][newColumn] = newNode;
                            document.getElementById(newRow + "-" + newColumn)?.classList.add("queued");
                            queue.push(newNode);
                        }
                    }
                });

                await new Promise(res => setTimeout(res, speed));
            }
        }

        return grid;
    }
}