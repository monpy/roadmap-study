import React, { useContext, useState, useEffect } from "react";
import { Store } from "../../states/project";
import Resizable from "re-resizable";

const ResizableContaienr = ({
  xIndex,
  yIndex,
  period,
  onResized,
  children
}) => {
  const states = useContext(Store);
  const range = states.range;
  const [_xIndex, updateXIndex] = useState(0);
  useEffect(() => {
    updateXIndex(0);
  }, [xIndex]);

  return (
    <Resizable
      defaultSize={{
        width: (period + 1) * range.state.columnWidth,
        height: range.state.rowHeight
      }}
      grid={[range.state.columnWidth, 1]}
      minWidth={range.state.columnWidth}
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
        zIndex: 0,
        transform: `translate(${_xIndex * range.state.columnWidth}px, 0)`
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
        e.stopPropagation();
        handleResizeStart(e, dir, el, d);
      }}
      onResizeStop={(e, dir, el, d) => {
        e.stopPropagation();
        handleResizeStop(e, dir, el);
        const newPeriod = period + d.width / range.state.columnWidth;
        if (newPeriod < 0) return;
        onResized(xIndex + _xIndex, newPeriod);
      }}
      onResize={(e, dir, el, d) => {
        e.stopPropagation();
        handleResize(
          e,
          dir,
          el,
          d,
          _xIndex,
          updateXIndex,
          range.state.columnWidth
        );
      }}
    >
      {children}
    </Resizable>
  );
};

const handleResizeStart = (e, dir, el, d) => {};
const handleResizeStop = (e, dir, el, d) => {};

const handleResize = (e, dir, el, d, _xIndex, updateXIndex, columnWidth) => {
  if (dir === "left") {
    const updated = -d.width / columnWidth;
    if (updated != _xIndex) updateXIndex(updated);
  }
};

export default ResizableContaienr;
