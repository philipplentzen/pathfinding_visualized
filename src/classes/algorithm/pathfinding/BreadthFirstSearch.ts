import {Algorithm} from "../Algorithm";
import {Node} from "../../node/Node";
import {TargetNode} from "../../node/TargetNode";
import {EmptyNode} from "../../node/EmptyNode";
import {ShortestNode} from "../../node/ShortestNode";
import * as _ from "lodash";
import {StartNode} from "../../node/StartNode";
import {QueuedNode} from "../../node/path/QueuedNode";
import {PathTargetNode} from "../../node/path/PathTargetNode";
import {PathNode} from "../../node/path/PathNode";
import {VisitedNode} from "../../node/path/VisitedNode";
import {PathStartNode} from "../../node/path/PathStartNode";

export class BreadthFirstSearch extends Algorithm {
    private static operations: [number, number][] = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    public static async run(startNode: StartNode, grid: Node[][], speed: number): Promise<[Node[][], number]> {
        const cleanGrid = _.cloneDeep(grid);
        let steps = 0;
        const queue: Node[] = [startNode];
        const toUpdate: Node[] = [];

        while (queue.length > 0) {
            steps++;
            const currentNode = queue.shift();
            if (currentNode !== undefined) {
                if (currentNode instanceof QueuedNode) {
                    toUpdate.push(new VisitedNode(currentNode.getRow(), currentNode.getColumn(), currentNode.getPrevNode()));
                } else if (currentNode instanceof PathTargetNode) {
                    // successful = true;
                    let prevNode = currentNode.getPrevNode();

                    while (prevNode instanceof PathNode) {
                        toUpdate.push(new ShortestNode(prevNode.getRow(), prevNode.getColumn()));
                        prevNode = prevNode.getPrevNode();
                    }

                    toUpdate.push(new PathStartNode(prevNode.getRow(), prevNode.getColumn()));

                    break;
                }

                this.operations.forEach(([deltaRow, deltaColumn]) => {
                    const newRow = currentNode.getRow() + deltaRow;
                    const newColumn = currentNode.getColumn() + deltaColumn;

                    if (newRow >= 0 && newRow < grid.length && newColumn >= 0 && newColumn < grid[0].length) {
                        let newNode = grid[newRow][newColumn];

                        if (newNode instanceof TargetNode) {
                            newNode = new PathTargetNode(newRow, newColumn, currentNode);
                        } else if (newNode instanceof EmptyNode) {
                            newNode = new QueuedNode(newRow, newColumn, currentNode);
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

        const newGrid = await BreadthFirstSearch.draw(toUpdate, cleanGrid, speed);

        return [newGrid, steps];
    }
}