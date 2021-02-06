import {Node} from "../node/Node";

export abstract class Algorithm {
    public static isStopped: boolean = false;

    protected static async draw(toUpdate: Node[], grid: Node[][], speed: number): Promise<Node[][]> {
        while (toUpdate.length > 0) {
            if (Algorithm.isStopped) {
                Algorithm.isStopped = false;
                return grid;
            }

            const node = toUpdate.shift();
            if (node !== undefined) {
                document.getElementById(node.getId())!.classList.add(...node.toString().split(" "));
                grid[node.getRow()][node.getColumn()] = node;

                await new Promise(resolve => setTimeout(resolve, speed * 1000));
            }
        }

        return grid;
    }
}