import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import {EditMode} from "../../types/EditMode";
import {EmptyNode} from "../../classes/node/EmptyNode";
import {Node} from "../../classes/node/Node";
import {WallNode} from "../../classes/node/WallNode";
import {StartNode} from "../../classes/node/StartNode";
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
    transform: scale(1);
  }
  
  &.target {
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
            case EditMode.WALLS: {
                const isPresent = event.currentTarget.classList.toggle("wall");
                isDrawing.current = true;
                gridRef.current[row][column] = isPresent ? new WallNode() : new EmptyNode();
                break;
            }
            case EditMode.START: {
                if (!isStartSetRef.current || event.currentTarget.classList.contains("start")) {
                    const isPresent = event.currentTarget.classList.toggle("start");
                    event.currentTarget.innerHTML = isPresent ? "<span role=\"img\" aria-label=\"double-right\" class=\"anticon anticon-double-right\"><svg viewBox=\"64 64 896 896\" focusable=\"false\" data-icon=\"double-right\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z\"></path></svg></span>" : "";
                    gridRef.current[row][column] = isPresent ? new StartNode() : new EmptyNode();
                    isStartSetRef.current = isPresent;
                }
                break;
            }
            case EditMode.TARGET: {
                if (!isTargetSetRef.current || event.currentTarget.classList.contains("target")) {
                    const isPresent = event.currentTarget.classList.toggle("target");
                    event.currentTarget.innerHTML = isPresent ? "<span role=\"img\" aria-label=\"login\" class=\"anticon anticon-login\"><svg viewBox=\"64 64 896 896\" focusable=\"false\" data-icon=\"login\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\"><defs><style></style></defs><path d=\"M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z\"></path></svg></span>" : "";
                    gridRef.current[row][column] = isPresent ? new TargetNode() : new EmptyNode();
                }
                break;
            }
        }
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>,row: number, column: number) => {
        event.preventDefault();
        if (isDrawing.current) {
            switch (EditModeHandler.editMode) {
                case EditMode.WALLS: {
                    const isPresent = event.currentTarget.classList.toggle("wall");
                    gridRef.current[row][column] = isPresent ? new WallNode() : new EmptyNode();
                    break;
                }
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
                                {/* */}
                            </GridCell>
                        ))}
                    </GridRow>
                ))}
            </GridContainer>
        </>
    )
}

