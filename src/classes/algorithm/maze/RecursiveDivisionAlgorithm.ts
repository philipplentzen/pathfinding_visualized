import {Node} from "../../node/Node";
import {WallNode} from "../../node/WallNode";
import {MazeAlgorithm} from "./MazeAlgorithm";

export class RecursiveDivisionAlgorithm extends MazeAlgorithm {
    public static async run(grid: Node[][]): Promise<Node[][]> {
        const width = grid[0].length;
        const height = grid.length;

        const toUpdate: Node[] = [];
        RecursiveDivisionAlgorithm.generateOuterWalls(toUpdate, height, width);
        RecursiveDivisionAlgorithm.generateInnerWalls(toUpdate, 1, height - 2, 1, width - 2, "horizontal");
        return await RecursiveDivisionAlgorithm.draw(toUpdate, grid);
    }

    private static generateInnerWalls(toUpdate: Node[], minRow: number, maxRow: number, minColumn: number, maxColumn: number, direction: "horizontal" | "vertical"): void {
        if (direction === "vertical") {
            if (maxRow - minRow < 2) return;

            const column = RecursiveDivisionAlgorithm.generateRandomEven(minColumn, maxColumn);
            const opening = RecursiveDivisionAlgorithm.generateRandomOdd(minRow, maxRow);

            for (let row = minRow; row <= maxRow; row++) {
                if (row !== opening) {
                    toUpdate.push(new WallNode(row, column));
                }
            }

            RecursiveDivisionAlgorithm.generateInnerWalls(toUpdate, minRow, maxRow, minColumn, column - 1, "horizontal");
            RecursiveDivisionAlgorithm.generateInnerWalls(toUpdate, minRow, maxRow, column + 1, maxColumn, "horizontal");
        }
        if (direction === "horizontal") {
            if (maxColumn - minColumn < 2) return;

            const row = RecursiveDivisionAlgorithm.generateRandomEven(minRow, maxRow);
            const opening = RecursiveDivisionAlgorithm.generateRandomOdd(minColumn, maxColumn);

            for (let column = minColumn; column <= maxColumn; column++) {
                if (column !== opening) {
                    toUpdate.push(new WallNode(row, column));
                }
            }

            RecursiveDivisionAlgorithm.generateInnerWalls(toUpdate, minRow, row - 1, minColumn, maxColumn, "vertical");
            RecursiveDivisionAlgorithm.generateInnerWalls(toUpdate, row + 1, maxRow, minColumn, maxColumn, "vertical");
        }
    }
}