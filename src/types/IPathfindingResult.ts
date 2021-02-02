import {Node} from "../classes/node/Node";

export interface IPathfindingResult {
    grid: Node[][];
    steps: number;
    pathLength: number;
    runtime: number;
}