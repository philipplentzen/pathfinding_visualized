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

interface IGridProps {

}

export const Grid: React.ForwardRefExoticComponent<IGridProps & React.RefAttributes<IGridRefs>> = forwardRef((props, refs) => {
    const [grid, setGrid] = useState<Node[][]>([[]]);
    const [editMode, setEditMode] = useState(EditMode.DRAG);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const nodesToUpdate = useMemo<[number, number, Node][]>(() => {
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
                    newGrid[rowId][colId] = new EmptyNode();
                });
            });
            return newGrid;
        }));
    }, []);

    const changeEditMode = useCallback((editMode: EditMode) => {
        setEditMode(editMode);
    }, []);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            setGrid(Array.from(Array(rows), () => Array.from(Array(cols), () => new EmptyNode())));
        }
    }, []);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        switch (editMode) {
            case EditMode.WALLS: {
                const isPresent = event.currentTarget.classList.toggle("wall");
                nodesToUpdate.push([row, column, isPresent ? new WallNode() : new EmptyNode()]);
                isPressed.current = true;
                isDrawing.current = isPresent;
                break;
            }
            case EditMode.START: {
                const isPresent = event.currentTarget.classList.toggle("start");
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    newGrid[row][column] = isPresent ? new StartNode() : new EmptyNode();
                    return newGrid;
                }));
                break;
            }
            case EditMode.TARGET: {
                const isPresent = event.currentTarget.classList.toggle("target");
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    newGrid[row][column] = isPresent ? new TargetNode() : new EmptyNode();
                    return newGrid;
                }));
                break;
            }
        }
    }, [nodesToUpdate]);

    const handleMouseOver = useCallback((event: React.MouseEvent<HTMLDivElement>,row: number, column: number) => {
        event.preventDefault();
        if (isPressed.current) {
            switch (editMode) {
                case EditMode.WALLS: {
                    if (isDrawing.current) {
                        event.currentTarget.classList.add("wall");
                    } else {
                        event.currentTarget.classList.remove("wall");
                    }
                    nodesToUpdate.push([row, column, isDrawing.current ? new WallNode() : new EmptyNode()]);
                    break;
                }
            }
        }
    }, [nodesToUpdate]);

    const handleMouseUp = useCallback( (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        switch (editMode) {
            case EditMode.WALLS:
                setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
                    nodesToUpdate.forEach(([row, column, node]) => {
                        newGrid[row][column] = node;
                    });
                    return newGrid;
                }));
                isPressed.current = false;
                break;
        }
    }, [nodesToUpdate]);

    return (
        <GridContainer ref={buildGrid}>
            <TransformWrapper wheel={{step: 200}}
                              options={{disabled: editMode !== EditMode.DRAG}}>
                <TransformComponent>
                    <GridTable>
                        {grid.map((nodes, rowId) => (
                            <GridRow key={rowId}>
                                {nodes.map((node, columnId) => (
                                    <GridCell key={rowId + "-" + columnId}
                                              pixelSize={pixelSize}
                                              className={node.toString()}
                                              onMouseDown={(event) => handleMouseDown(event, rowId, columnId)}
                                              onMouseOver={(event) => handleMouseOver(event, rowId, columnId)}
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

