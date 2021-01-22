import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {EditMode} from "../../types/EditMode";
import {EmptyNode} from "../../classes/node/EmptyNode";
import {Node} from "../../classes/node/Node";
import {WallNode} from "../../classes/node/WallNode";
import {StartNode} from "../../classes/node/StartNode";
import {EditModeHandler} from "../../classes/EditModeHandler";
import {TargetNode} from "../../classes/node/TargetNode";
import produce from "immer";
import {DoubleRightOutlined, LoginOutlined} from "@ant-design/icons";

export interface IGridProps {

}

const pixelSize = 16;

const GridContainer = styled.div`
    display: table;
    border-collapse: collapse;
    margin: auto;
    width: 100%;
    height: calc(100% - 40px);
`

const GridRow = styled.div`
    display: table-row;
    box-sizing: border-box;
`
const GridCell = styled.div`
  position: relative;
  display: table-cell;
  width: ${pixelSize}px;
  height: ${pixelSize}px;
  
  font-size: 11px;
  line-height: 15px;
  text-align: center;
  
  box-sizing: border-box;
  border: 1px solid #dddddd;
  cursor: pointer;

  transform: scale(0);
  
  transition: all ease 300ms;

  &:hover {
    transform: scale(1);
    transition: none;
    background-color: #40a9ff;
  }
  
  &.wall {
    color: white;
    background-color: rgba(0, 0, 0, 0.85);
    transition: transform ease 300ms;
    transform: scale(1);
  }
  
  &.start, &.target  {
    transform: scale(1);
  }
`

export const Grid: React.FC<IGridProps> = () => {
    const [grid, setGrid] = useState<Node[][]>([[]]);
    const isPressed = useRef(false);
    const isDrawing = useRef(false);
    const nodesToUpdate = useMemo<[number, number, Node][]>(() => {
        return [];
    }, undefined);

    const clearGrid = useCallback(() => {
        console.log("clear");
        setGrid((oldGrid) => produce(oldGrid, (newGrid) => {
            oldGrid.forEach((row, rowId) => {
                row.forEach((node, colId) => {
                    newGrid[rowId][colId] = new EmptyNode();
                });
            });
            return newGrid;
        }));
    }, []);

    useEffect(() => {
        EditModeHandler.clearGrid = clearGrid;
    }, [clearGrid]);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            setGrid(Array.from(Array(rows), () => Array.from(Array(cols), () => new EmptyNode())));
        }
    }, []);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        switch (EditModeHandler.editMode) {
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
            switch (EditModeHandler.editMode) {
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
        switch (EditModeHandler.editMode) {
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
        <>
            <GridContainer ref={buildGrid}>
                {grid.map((nodes, rowId) => (
                    <GridRow key={rowId}>
                        {nodes.map((node, columnId) => (
                            <GridCell key={rowId + "-" + columnId}
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
            </GridContainer>
        </>
    )
}

