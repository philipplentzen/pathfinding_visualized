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
import {BreadthFirstSearch} from "../../classes/algorithm/pathfinding/BreadthFirstSearch";
import * as _ from "lodash";
import {PathfindingAlgorithms} from "../../types/PathfindingAlgorithms";
import {RecursiveDivisionAlgorithm} from "../../classes/algorithm/maze/RecursiveDivisionAlgorithm";
import {SettingsContext} from "../Context/SettingsContext";
import {EditModeContext} from "../Context/EditModeContext";
import {AlgorithmContext} from "../Context/AlgoirthmContext";
import {MazeAlgorithms} from "../../types/MazeAlgorithms";
import {DepthFirstSearch} from "../../classes/algorithm/pathfinding/DepthFirstSearch";

interface IGridProps {

}

export const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<IGridRefs>> = forwardRef((props, refs) => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const {settings} = useContext(SettingsContext);
    const {setIsRunnable, setIsRunning, setHasChanges, setHasPath} = useContext(AlgorithmContext);
    const {editMode, setEditMode} = useContext(EditModeContext);
    const calculatedPixelSize = useRef(settings.pixelSize);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const startNode = useRef<StartNode | undefined>(undefined);
    const targetNode = useRef<TargetNode | undefined>(undefined);
    const nodesToUpdate = useMemo<Node[]>(() => {
        return [];
    }, []);

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
        setHasChanges(false);
        setHasPath(false);

        await new Promise(resolve => setTimeout(resolve, 0));
    }, [setIsRunnable, setHasChanges, setHasPath]);

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
        setHasPath(false);

        await new Promise(resolve => setTimeout(resolve, 0));
    }, [setIsRunnable, setHasPath]);

    const runAlgorithm = useCallback(async (algorithm: PathfindingAlgorithms | MazeAlgorithms) => {
        let newGrid: Node[][] = grid;
        let steps = 0;

        setEditMode(EditMode.DRAG);
        setIsRunning(true);

        switch (algorithm) {
            case PathfindingAlgorithms.BREADTH: {
                [newGrid, steps] = await BreadthFirstSearch.run(startNode.current!, _.cloneDeep(grid), settings.speed);
                setIsRunnable(false);
                setHasPath(true);
                break;
            }
            case PathfindingAlgorithms.DEPTH: {
                [newGrid, steps] = await DepthFirstSearch.run(startNode.current!, _.cloneDeep(grid), settings.speed);
                setIsRunnable(false);
                setHasPath(true);
                break;
            }
            case MazeAlgorithms.RECURSIVE_MAZE: {
                newGrid = await RecursiveDivisionAlgorithm.run(_.cloneDeep(grid));
                setHasChanges(true);
            }
        }

        console.log(steps)

        setGrid(newGrid);
        setIsRunning(false);
    }, [grid, setGrid, settings.speed, setEditMode, setIsRunning, setIsRunnable, setHasChanges, setHasPath]);

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

            startNode.current = undefined;
            targetNode.current = undefined;

            setIsRunnable(false);
            setHasChanges(false);
            setHasPath(false);
            setGrid(Array.from(Array(rows), (value, row) => Array.from(Array(cols), (value, column) => new EmptyNode(row, column))));
        }
    }, [settings.pixelSize, setIsRunnable, setHasChanges, setHasPath]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        switch (editMode) {
            case EditMode.WALLS: {
                const isPresent = event.currentTarget.classList.toggle("wall");
                nodesToUpdate.push(isPresent ? new WallNode(row, column) : new EmptyNode(row, column));
                isPressed.current = true;
                isDrawing.current = isPresent;
                setHasChanges(true);
                break;
            }
            case EditMode.START: {
                if (startNode.current === undefined) {
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
                setHasChanges(true);
                break;
            }
            case EditMode.TARGET: {
                if (targetNode.current === undefined) {
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
                setHasChanges(true);
                break;
            }
        }
        setIsRunnable(startNode.current != null && targetNode.current != null);
    }, [nodesToUpdate, editMode, setIsRunnable, setHasChanges]);

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

