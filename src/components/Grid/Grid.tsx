import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";

export interface IGridProps {

}

const pixelSize = 24;

const GridContainer = styled.div`
    display: table;
    border-collapse: collapse;
    margin: auto;
    width: 100%;
    height: 100%;
`

const GridRow = styled.div`
    display: table-row;
    box-sizing: border-box;
`
const GridCell = styled.div`
    display: table-cell;
    width: ${pixelSize}px;
    height: ${pixelSize}px;
    border: 1px solid #cecece;
    box-sizing: border-box;
  
    &:hover {
        background-color: #40a9ff;
    }
`

export const Grid: React.FC<IGridProps> = () => {
    const [grid, setGrid] = useState<number[][]>([[]]);

    const setRef = useCallback((element: HTMLDivElement | null) => {
        if (element !== null) {
            const rows: number = Math.floor(element.clientHeight / pixelSize);
            const cols: number = Math.floor(element.clientWidth / pixelSize);

            const newGrid = Array.from(Array(rows), () => Array.from(Array(cols), () => 0));
            setGrid(newGrid);
        }
    }, []);

    return (
        <GridContainer ref={setRef}>
            {grid.map((row, rowId) => (
                <GridRow key={rowId}>
                    {row.map((column, colId) => (
                        <GridCell key={rowId + "-" + colId}>
                            {/* */}
                        </GridCell>
                    ))}
                </GridRow>
            ))}
        </GridContainer>
    )
}

