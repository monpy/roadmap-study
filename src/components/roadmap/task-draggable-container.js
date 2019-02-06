import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import Draggable from "react-draggable";

const ROW_HEIGHT = 47;
const COLUMN_WIDTH = 30;

const Handle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ dragging }) => (dragging ? "1000" : "0")};
  background: ${({ dragging }) =>
    dragging ? "rgba(0, 0, 0, 0.2)" : "transparent"};
`;

const DraggableContainer = ({ xIndex, yIndex, onDragged, children }) => {
  const [dragging, updateDragging] = useState(false);
  const [_x, updateX] = useState(0);
  const [_y, updateY] = useState(0);

  return (
    <Draggable
      position={{
        x: xIndex * COLUMN_WIDTH,
        y: yIndex * ROW_HEIGHT
      }}
      grid={[COLUMN_WIDTH, ROW_HEIGHT]}
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
        const snappedIndex = transformSnappedIndexValue(diffX, diffY);
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

const transformSnappedIndexValue = (diffX, diffY) => {
  return {
    relativeMovedX: Math.round(-diffX / COLUMN_WIDTH),
    relativeMovedY: Math.round(-diffY / ROW_HEIGHT)
  };
};

const handleDragStart = () => {};

const handleDragStop = e => {};

const handleDrag = (e, data) => {
  // console.log(e);
};

export default DraggableContainer;
