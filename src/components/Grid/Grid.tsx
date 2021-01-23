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
import {BreadthNode} from "../../classes/node/BreadthNode";
import {BreadthFirstAlgorithm} from "../../classes/algorithm/BreadthFirstAlgorithm";

interface IGridProps {

}

const operations = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

export const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<IGridRefs>> = forwardRef((props, refs) => {
    const [grid, setGrid] = useState<Node[][]>([[]]);
    const [editMode, setEditMode] = useState(EditMode.DRAG);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const startNode = useRef<Node>(new EmptyNode(0, 0));
    const targetNode = useRef<Node>(new EmptyNode(0, 0));
    const nodesToUpdate = useMemo<Node[]>(() => {
        return [];
    }, undefined);

    const pixelSize = 16;

    useImperativeHandle(refs, () => {
        return {
            clearGrid,
            changeEditMode,
        }
    });

    const clearGrid = useCallback(() => {
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    newGrid[rowId][colId] = new EmptyNode(rowId, colId);
                });
            });
        }));
    }, []);

    const changeEditMode = useCallback((editMode: EditMode) => {
        setEditMode(editMode);
    }, []);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            setGrid(Array.from(Array(rows), (value, row) => Array.from(Array(cols), (value, column) => new EmptyNode(row, column))));
        }
    }, []);

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
                              options={{disabled: editMode !== EditMode.DRAG}}>
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

