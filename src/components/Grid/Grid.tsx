import React, {forwardRef, useCallback, useContext, useImperativeHandle, useMemo, useRef, useState} from "react";
import {EditMode} from "../../types/EditMode";
import {EmptyNode} from "../../classes/node/EmptyNode";
import {Node} from "../../classes/node/Node";
import {WallNode} from "../../classes/node/WallNode";
import {StartNode} from "../../classes/node/StartNode";
import {TargetNode} from "../../classes/node/TargetNode";
import produce from "immer";
import {DoubleRightOutlined, LoginOutlined} from "@ant-design/icons";
import {IGridRefs} from "../../types/IRefs";
import {GridTable} from "./GridTable";
import {GridRow} from "./GridRow";
import {GridCell} from "./GridCell";
import {GridContainer} from "./GridContainer";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {BreadthFirstAlgorithm} from "../../classes/algorithm/pathfinding/BreadthFirstAlgorithm";
import * as _ from "lodash";
import {PathfindingAlgorithms} from "../../types/PathfindingAlgorithms";
import {notification} from "antd";
import {RecursiveDivisionAlgorithm} from "../../classes/algorithm/maze/RecursiveDivisionAlgorithm";
import {SettingsContext} from "../Context/SettingsContext";
import {EditModeContext} from "../Context/EditModeContext";
import {AlgorithmContext} from "../Context/AlgoirthmContext";
import {MazeAlgorithms} from "../../types/MazeAlgorithms";

interface IGridProps {

}

export const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<IGridRefs>> = forwardRef((props, refs) => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [alreadyCreatedMaze, setAlreadyCreatedMaze] = useState(false);
    const {settings} = useContext(SettingsContext);
    const {setIsRunnable, setIsRunning} = useContext(AlgorithmContext);
    const {editMode, setEditMode} = useContext(EditModeContext);
    const calculatedPixelSize = useRef(settings.pixelSize);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const startNode = useRef<StartNode | undefined>(undefined);
    const targetNode = useRef<TargetNode | undefined>(undefined);
    const nodesToUpdate = useMemo<Node[]>(() => {
        return [];
    }, undefined);

    useImperativeHandle(refs, () => {
        return {
            runAlgorithm,
            clearAll,
            clearPath,
        }
    });

    const clearAll = useCallback(async () => {
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    newGrid[rowId][colId] = new EmptyNode(rowId, colId);
                });
            });
        }));
        startNode.current = undefined;
        targetNode.current = undefined;

        setIsRunnable(false);
        setAlreadyCreatedMaze(false);

        await new Promise(resolve => setTimeout(resolve, 0));
    }, [setIsRunnable, setAlreadyCreatedMaze]);

    const clearPath = useCallback(async () => {
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    const oldCell = oldGrid[rowId][colId];
                    if (oldCell instanceof WallNode) {

                    } else if (oldCell instanceof StartNode) {
                        const newNode = new StartNode(rowId, colId);
                        newGrid[rowId][colId] = newNode;
                        startNode.current = newNode;
                    } else if (oldCell instanceof TargetNode) {
                        const newNode = new TargetNode(rowId, colId);
                        newGrid[rowId][colId] = newNode;
                        targetNode.current = newNode;
                    } else {
                        newGrid[rowId][colId] = new EmptyNode(rowId, colId);
                    }
                });
            });
        }));

        setIsRunnable(startNode.current != null && targetNode.current != null);

        await new Promise(resolve => setTimeout(resolve, 0));
    }, [setIsRunnable]);

    const runAlgorithm = useCallback(async (algorithm: PathfindingAlgorithms | MazeAlgorithms) => {
        let newGrid: Node[][] = grid;
        let steps = 0;
        let error: Error | undefined = undefined;

        console.log("run", algorithm);

        setEditMode(EditMode.DRAG);
        setIsRunning(true);

        switch (algorithm) {
            case PathfindingAlgorithms.BREADTH: {
                [newGrid, steps] = await BreadthFirstAlgorithm.run(startNode.current!, _.cloneDeep(grid), settings.speed);
                setIsRunnable(false);
                break;
            }
            case MazeAlgorithms.RECURSIVE_MAZE:
                if (!alreadyCreatedMaze) {
                    newGrid = await RecursiveDivisionAlgorithm.run(_.cloneDeep(grid));
                    setAlreadyCreatedMaze(true);
                }
        }

        console.log(steps);

        setGrid(newGrid);
        setIsRunning(false);
    }, [grid, setGrid, settings.speed, setEditMode, setIsRunning, alreadyCreatedMaze, setIsRunnable, setAlreadyCreatedMaze]);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            let rows: number = Math.floor(element.clientHeight / settings.pixelSize);
            let cols: number = Math.floor(element.clientWidth / settings.pixelSize);

            if (rows % 2 === 0) {
                rows -= 1;
            }
            if (cols % 2 === 0) {
                cols -= 1;
            }

            calculatedPixelSize.current = Math.min(element.clientWidth / cols, element.clientHeight / rows);

            setGrid(Array.from(Array(rows), (value, row) => Array.from(Array(cols), (value, column) => new EmptyNode(row, column))));
        }
    }, [settings.pixelSize]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        switch (editMode) {
            case EditMode.WALLS: {
                const isPresent = event.currentTarget.classList.toggle("wall");
                nodesToUpdate.push(isPresent ? new WallNode(row, column) : new EmptyNode(row, column));
                isPressed.current = true;
                isDrawing.current = isPresent;
                break;
            }
            case EditMode.START: {
                if (startNode.current == null) {
                    const newNode = new StartNode(row, column)
                    setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                        newGrid[row][column] = newNode;
                    }));
                    startNode.current = newNode;
                } else if (startNode.current.getRow() === row && startNode.current.getColumn() === column) {
                    setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                        newGrid[row][column] = new EmptyNode(row, column);
                    }));
                    startNode.current = undefined;
                }
                break;
            }
            case EditMode.TARGET: {
                if (targetNode.current == null) {
                    const newNode = new TargetNode(row, column)
                    setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                        newGrid[row][column] = newNode;
                    }));
                    targetNode.current = newNode;
                } else if (targetNode.current.getRow() === row && targetNode.current.getColumn() === column) {
                    setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                        newGrid[row][column] = new EmptyNode(row, column);
                    }));
                    targetNode.current = undefined;
                }
                break;
            }
        }
        setIsRunnable(startNode.current != null && targetNode.current != null);
    }, [nodesToUpdate, editMode, setIsRunnable]);

    const handleMouseOver = useCallback((event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        if (isPressed.current) {
            switch (editMode) {
                case EditMode.WALLS: {
                    if (isDrawing.current) {
                        event.currentTarget.classList.add("wall");
                    } else {
                        event.currentTarget.classList.remove("wall");
                    }
                    nodesToUpdate.push(isDrawing.current ? new WallNode(row, column) : new EmptyNode(row, column));
                    break;
                }
            }
        }
    }, [nodesToUpdate, editMode]);

    const handleMouseUp = useCallback( (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        switch (editMode) {
            case EditMode.WALLS:
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    nodesToUpdate.forEach((node) => {
                        newGrid[node.getRow()][node.getColumn()] = node;
                    });
                }));
                isPressed.current = false;
                break;
        }
    }, [nodesToUpdate, editMode]);

    return (
        <GridContainer ref={buildGrid}>
            <TransformWrapper wheel={{step: 200}}
                              pan={{disabled: editMode !== EditMode.DRAG}}>
                <TransformComponent>
                    <GridTable>
                        {grid.map((nodes, rowId) => (
                            <GridRow key={rowId}>
                                {nodes.map((node) => (
                                    <GridCell key={node.getId()}
                                              pixelSize={calculatedPixelSize.current}
                                              className={node.toString()}
                                              id={node.getId()}
                                              onMouseDown={(event) => handleMouseDown(event, node.getRow(), node.getColumn())}
                                              onMouseOver={(event) => handleMouseOver(event, node.getRow(), node.getColumn())}
                                              onMouseUp={(event) => handleMouseUp(event)}>
                                        {node instanceof StartNode && <DoubleRightOutlined />}
                                        {node instanceof TargetNode && <LoginOutlined />}
                                    </GridCell>
                                ))}
                            </GridRow>
                        ))}
                    </GridTable>
                </TransformComponent>
            </TransformWrapper>
        </GridContainer>
    )
})

