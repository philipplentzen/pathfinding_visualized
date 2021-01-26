import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState} from "react";
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
import {ISettings} from "../../types/ISettings";
import {RecursiveDivisionAlgorithm} from "../../classes/algorithm/maze/RecursiveDivisionAlgorithm";

interface IGridProps {
    pathfindingFinished: () => void;
    mazeCreationFinished: () => void;
}

export const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<IGridRefs>> = forwardRef(({pathfindingFinished, mazeCreationFinished}, refs) => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [editMode, setEditMode] = useState(EditMode.DRAG);
    const [pixelSize, setPixelSize] = useState(32);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const startNode = useRef<Node>(new EmptyNode(0, 0));
    const targetNode = useRef<Node>(new EmptyNode(0, 0));
    const nodesToUpdate = useMemo<Node[]>(() => {
        return [];
    }, undefined);

    useImperativeHandle(refs, () => {
        return {
            runPathfinding,
            clearAll,
            clearPath,
            changeEditMode,
            changeSettings,
            createMaze,
        }
    });

    const clearAll = useCallback(() => {
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    newGrid[rowId][colId] = new EmptyNode(rowId, colId);
                });
            });
        }));
    }, []);

    const clearPath = useCallback(() => {
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    const oldCell = oldGrid[rowId][colId];
                    if (oldCell instanceof WallNode) {

                    } else if (oldCell instanceof StartNode) {
                        newGrid[rowId][colId] = new StartNode(rowId, colId);
                    } else if (oldCell instanceof TargetNode) {
                        newGrid[rowId][colId] = new TargetNode(rowId, colId);
                    } else {
                        newGrid[rowId][colId] = new EmptyNode(rowId, colId);
                    }
                });
            });
        }));
    }, []);

    const runPathfinding = useCallback( async (algorithm: PathfindingAlgorithms) => {
        if (!(startNode.current instanceof StartNode) || !(targetNode.current instanceof TargetNode)) {
            return;
        }
        let newGrid: Node[][] = [];
        switch (algorithm) {
            case PathfindingAlgorithms.BREADTH:
                newGrid = await new BreadthFirstAlgorithm().run(startNode.current, _.cloneDeep(grid), 0);
        }
        if (newGrid !== []) {
            setGrid(newGrid);
        } else {
            notification.error({
                message: "Pathfinding Failed!"
            });
        }
        pathfindingFinished();
    }, [grid, pathfindingFinished]);

    const createMaze = useCallback(async () => {
        const newGrid = await RecursiveDivisionAlgorithm.run(_.cloneDeep(grid));
        setGrid(newGrid);
        mazeCreationFinished();
    }, [grid]);

    const changeEditMode = useCallback((editMode: EditMode) => {
        setEditMode(editMode);
    }, []);

    const changeSettings = useCallback((settings: ISettings) => {
        if (settings.pixelSize !== undefined) {
            setPixelSize(settings.pixelSize);
        }
    }, []);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            let rows: number = Math.floor(element.clientHeight / pixelSize);
            let cols: number = Math.floor(element.clientWidth / pixelSize);

            if (rows % 2 === 0) {
                rows -= 1;
            }
            if (cols % 2 === 0) {
                cols -= 1;
            }

            setPixelSize(element.clientWidth / cols);

            setGrid(Array.from(Array(rows), (value, row) => Array.from(Array(cols), (value, column) => new EmptyNode(row, column))));
        }
    }, [pixelSize]);

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
                const isPresent = event.currentTarget.classList.toggle("start");
                const newNode = isPresent ? new StartNode(row, column) : new EmptyNode(row, column);
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    newGrid[row][column] = newNode;
                }));
                startNode.current = newNode;
                break;
            }
            case EditMode.TARGET: {
                const isPresent = event.currentTarget.classList.toggle("target");
                const newNode = isPresent ? new TargetNode(row, column) : new EmptyNode(row, column);
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    newGrid[row][column] = newNode;
                }));
                targetNode.current = newNode;
                break;
            }
        }
    }, [nodesToUpdate, editMode]);

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
                                              pixelSize={pixelSize}
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

