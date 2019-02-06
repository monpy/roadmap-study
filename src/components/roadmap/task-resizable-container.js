import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import Resizable from "re-resizable";

const ROW_HEIGHT = 47;
const COLUMN_WIDTH = 30;

const ResizableContaienr = ({
  xIndex,
  yIndex,
  period,
  onResized,
  children
}) => {
  const [_xIndex, updateXIndex] = useState(xIndex);
  const defaultXIndex = xIndex;

  useEffect(() => {});

  return (
    <Resizable
      defaultSize={{
        width: (period + 1) * COLUMN_WIDTH,
        height: ROW_HEIGHT
      }}
      grid={[COLUMN_WIDTH, 1]}
      minWidth={COLUMN_WIDTH}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${_xIndex * COLUMN_WIDTH}px, ${ROW_HEIGHT *
          yIndex}px)`
      }}
      handleStyles={{
        left: {
          width: 20,
          left: 0,
          zIndex: 1
        },
        right: {
          width: 20,
          right: 0,
          zIndex: 1
        }
      }}
      onResizeStart={(e, dir, el, d) => {
        handleResizeStart(e, dir, el, d);
      }}
      onResizeStop={(e, dir, el, d) => {
        handleResizeStop(e, dir, el);
        const newPeriod = period + d.width / COLUMN_WIDTH;
        if (newPeriod < 0) return;

        onResized(_xIndex, newPeriod);
      }}
      onResize={(e, dir, el, d) => {
        handleResize(e, dir, el, d, _xIndex, xIndex, updateXIndex);
      }}
    >
      {children}
    </Resizable>
  );
};

const handleResizeStart = (e, dir, el, d) => {};
const handleResizeStop = (e, dir, el, d) => {};

const handleResize = (e, dir, el, d, _xIndex, xIndex, updateXIndex) => {
  if (dir === "left") {
    const updated = xIndex - d.width / 30;
    if (updated != _xIndex) updateXIndex(updated);
  }
};

export default ResizableContaienr;
