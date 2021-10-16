import {Algorithm} from "../Algorithm";
import {StartNode} from "../../node/StartNode";
import * as _ from "lodash";
import {Node} from "../../node/Node";
import {QueuedNode} from "../../node/path/QueuedNode";
import {TargetNode} from "../../node/TargetNode";
import {EmptyNode} from "../../node/EmptyNode";
import {ShortestNode} from "../../node/ShortestNode";
import {VisitedNode} from "../../node/path/VisitedNode";
import {PathNode} from "../../node/path/PathNode";
import {PathTargetNode} from "../../node/path/PathTargetNode";
import {PathStartNode} from "../../node/path/PathStartNode";

export class DepthFirstSearch extends Algorithm {
    private static operations: [number, number][] = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    public static async run(startNode: StartNode, grid: Node[][], speed: number): Promise<[Node[][], number]> {
        const cleanGrid = _.cloneDeep(grid);
        let steps = 0;
        const stack: Node[] = [startNode];
        const toUpdate: Node[] = [];

        while (stack.length > 0) {
            const currentNode = stack.pop();

            if (currentNode !== undefined) {
                toUpdate.push(currentNode);
                if (currentNode instanceof QueuedNode) {
                    toUpdate.push(currentNode);
                    const newNode = new VisitedNode(currentNode.getRow(), currentNode.getColumn(), currentNode.getPrevNode());
                    toUpdate.push(newNode)
                    grid[currentNode.getRow()][currentNode.getColumn()] = newNode;
                } else if (currentNode instanceof PathTargetNode) {
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
                        } else if (newNode instanceof EmptyNode || newNode instanceof QueuedNode) {
                            newNode = new QueuedNode(newRow, newColumn, currentNode);
                        }

                        if (newNode !== grid[newRow][newColumn]) {
                            stack.push(newNode);
                        }
                    }
                });
            }
        }

        const newGrid = await DepthFirstSearch.draw(toUpdate, cleanGrid, speed);

        return [newGrid, steps];
    }
}