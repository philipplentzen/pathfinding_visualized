import styled from "styled-components";

interface IGridCellProps {
    pixelSize: number;
}

export const GridCell = styled.div<IGridCellProps>`
  position: relative;
  display: table-cell;
  width: ${props => props.pixelSize}px;
  height: ${props => props.pixelSize}px;

  font-size: ${props => props.pixelSize / 2}px;
  line-height: ${props => props.pixelSize - 1}px;
  text-align: center;

  box-sizing: border-box;
  border: 1px solid #dddddd;
  cursor: pointer;

  transform: scale(0);

  transition: all ease 300ms;

  &:hover {
    transform: scale(1);
    transition: none;
    background-color: var(--hover);
  }

  &.wall {
    background-color: #262626;
    transition: transform ease 300ms;
  }
  
  &.start, &.target {
    transition: none;
  }

  &.queued {
    background-color: #006d75;
    transition: transform ease 300ms;
  }

  &.visited, &.breadth {
    background-color: #87e8de;
    transition: background-color ease 300ms;
  }

  &.shortest {
    background-color: #ff4d4f;
  }

  &.start, &.target, &.wall, &.queued, &.visited, &.shortest, &.breadth {
    transform: scale(1);
  }
`