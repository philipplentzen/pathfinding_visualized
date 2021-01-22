import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {EditMode} from "../../types/EditMode";
import {EmptyNode} from "../../classes/node/EmptyNode";
import {Node} from "../../classes/node/Node";
import {WallNode} from "../../classes/node/WallNode";
import {StartNode} from "../../classes/node/StartNode";
import {DoubleRightOutlined} from "@ant-design/icons";
import {EditModeHandler} from "../../classes/EditModeHandler";
import {TargetNode} from "../../classes/node/TargetNode";

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
    background-color: lightpink;
    transition: transform ease 300ms;
    transform: scale(1);
  }
  
  &.start {
    background-color: aqua;
    transition: transform ease 300ms;
    transform: scale(1);
  }
  
  &.target {
    background-color: brown;
    transition: transform ease 300ms;
    transform: scale(1);
  }
`

export const Grid: React.FC<IGridProps> = () => {
    const [,setGridLoaded] = useState(false);
    const isDrawing = useRef(false);
    const gridRef = useRef<Node[][]>([[]]);

    const buildGrid = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            gridRef.current = Array.from(Array(rows), () => Array.from(Array(cols), () => new EmptyNode()));
            setGridLoaded(true);
        }
    }, []);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, row: number, column: number) => {
        event.preventDefault();
        switch (EditModeHandler.editMode) {
            case EditMode.WALLS:
                event.currentTarget.classList.add("wall");
                isDrawing.current = true;
                gridRef.current[row][column] = new WallNode();
                break;
            case EditMode.START:
                event.currentTarget.classList.add("start");
                gridRef.current[row][column] = new StartNode();
                break;
            case EditMode.TARGET:
                event.currentTarget.classList.add("target");
                gridRef.current[row][column] = new TargetNode();
                break;
        }
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>,row: number, column: number) => {
        event.preventDefault();
        if (isDrawing.current) {
            switch (EditModeHandler.editMode) {
                case EditMode.WALLS:
                    event.currentTarget.classList.add("wall");
                    gridRef.current[row][column] = new WallNode();
                    break;
            }
        }
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        switch (EditModeHandler.editMode) {
            case EditMode.WALLS:
                isDrawing.current = false;
                break;
        }
    };

    return (
        <>
            <GridContainer ref={buildGrid}>
                {gridRef.current.map((row, rowId) => (
                    <GridRow key={rowId}>
                        {row.map((node, columnId) => (
                            <GridCell key={rowId + "-" + columnId}
                                      onMouseDown={(event) => handleMouseDown(event, rowId, columnId)}
                                      onMouseOver={(event) => handleMouseOver(event, rowId, columnId)}
                                      onMouseUp={(event) => handleMouseUp(event)}>
                                {node instanceof StartNode && <DoubleRightOutlined />}
                            </GridCell>
                        ))}
                    </GridRow>
                ))}
            </GridContainer>
        </>
    )
}

