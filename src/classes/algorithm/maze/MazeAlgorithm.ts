import {Algorithm} from "../Algorithm";
import {Node} from "../../node/Node";
import {WallNode} from "../../node/WallNode";

export class MazeAlgorithm extends Algorithm {
    protected static generateOuterWalls(toUpdate: Node[], height: number, width: number): void {
        for (let column = 0; column < width; column++) {
            toUpdate.push(new WallNode(0, column));
            toUpdate.push(new WallNode(height - 1, width - column - 1));
        }
        for (let row = 1; row < height - 1; row++) {
            toUpdate.push(new WallNode(row, 0));
            toUpdate.push(new WallNode(height - row - 1, width - 1));
        }
    }

    protected static generateRandomOdd(min: number, max: number): number {
        let random = Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / 2) * 2 + 1;

        if (random < min) {
            random += 2;
        }
        if (random > max) {
            random -= 2;
        }

        return random;
    }

    protected static generateRandomEven(min: number, max: number): number {
        let random = Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / 2) * 2;

        if (random < min) {
            random += 2;
        }
        if (random > max) {
            random -= 2;
        }

        return random;
    }
}