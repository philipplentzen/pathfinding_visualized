import styled from "styled-components";

interface IGridCellProps {
    pixelSize: number;
}

export const GridCell = styled.div<IGridCellProps>`
  position: relative;
  display: table-cell;
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;
  
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
  }
  
  &.queued {
    background-color: seagreen;
  }
  
  &.visited {
    background-color: lightpink;
  }

  &.shortest {
    background-color: tomato;
  }

  &.start, &.target, &.wall, &.queued, &.visited, &.shortest {
    transform: scale(1);
  }
`