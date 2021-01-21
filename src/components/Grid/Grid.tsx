import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import produce from "immer";

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
  display: table-cell;
  width: ${pixelSize}px;
  height: ${pixelSize}px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  
  transition: background-color ease 300ms;

  &:hover {
    transition: none;
    background-color: #40a9ff;
  }
`

export const Grid: React.FC<IGridProps> = () => {
    const [grid, setGrid] = useState<number[][]>([[]]);
    const isDrawing = useRef(false);

    const setRef = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            console.log(rows, cols);

            const newGrid = Array.from(Array(rows), () => Array.from(Array(cols), () => 0));
            setGrid(newGrid);
        }
    }, []);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
        event.preventDefault();
        event.currentTarget.style.backgroundColor = "#002766";
        isDrawing.current = true;
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>,row: number, col: number) => {
        if (isDrawing.current) {
            event.preventDefault();
            event.currentTarget.style.backgroundColor = "#002766";
        }
    };

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
        event.preventDefault();
        isDrawing.current = false;
    };

    return (
        <GridContainer ref={setRef}>
            {grid.map((row, rowId) => (
                <GridRow key={rowId}>
                    {row.map((column, colId) => (
                        <GridCell key={rowId + "-" + colId}
                                  onMouseDown={(event) => handleMouseDown(event, rowId, colId)}
                                  onMouseOver={(event) => handleMouseOver(event, rowId, colId)}
                                  onMouseUp={(event) => handleMouseUp(event, rowId, colId)}>
                            {/* */}
                        </GridCell>
                    ))}
                </GridRow>
            ))}
        </GridContainer>
    )
}

