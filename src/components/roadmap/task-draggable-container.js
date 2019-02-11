import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Store } from "../../states/project";
import Draggable from "react-draggable";

const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ dragging }) => (dragging ? "1000" : "0")};
  background: ${({ dragging }) =>
    dragging ? "rgba(0, 0, 0, 0.2)" : "transparent"};
`;

const DraggableContainer = ({ xIndex, yIndex, onDragged, children }) => {
  const states = useContext(Store);
  const range = states.range;

  const [dragging, updateDragging] = useState(false);
  const [_x, updateX] = useState(0);
  const [_y, updateY] = useState(0);

  return (
    <Draggable
      position={{
        x: xIndex * range.state.columnWidth,
        y: yIndex * range.state.rowHeight
      }}
      grid={[range.state.columnWidth, range.state.rowHeight]}
      onStart={(e, data) => {
        updateX(data.x);
        updateY(data.y);
        updateDragging(true);
        handleDragStart();
      }}
      onDrag={(e, data) => {
        handleDrag(e);
      }}
      onStop={(e, data) => {
        const diffX = _x - data.x;
        const diffY = _y - data.y;
        const snappedIndex = transformSnappedIndexValue(
          diffX,
          diffY,
          range.state.columnWidth,
          range.state.rowHeight
        );
        updateDragging(false);
        onDragged(snappedIndex);
      }}
      handle=".handle"
    >
      <Handle dragging={dragging} className="handle">
        {children}
      </Handle>
    </Draggable>
  );
};

const transformSnappedIndexValue = (diffX, diffY, baseWidth, baseHeight) => {
  const states = useContext(Store);
  const range = states.range;

  return {
    relativeMovedX: Math.round(-diffX / baseWidth),
    relativeMovedY: Math.round(-diffY / baseHeight)
  };
};

const handleDragStart = () => {};

const handleDragStop = e => {};

const handleDrag = (e, data) => {
  // console.log(e);
};

export default DraggableContainer;
