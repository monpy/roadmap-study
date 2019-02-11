import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { Provider, Store } from "../../states/project";
import moment from "moment";
import Avatar from "./avatar";
import ResizableContainer from "./task-resizable-container.js";
import DraggableContainer from "./task-draggable-container.js";
import TaskCreater from "./task-creater";

const TasksContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  overflow-x: scroll;
  top: 110px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  max-height: calc(100vh - 110px);
`;

const TasksInner = styled.div`
  position: relative;
  height: 100%;
`;

const TaskContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 47px;
  font-size: 15px;
  font-family: Inter-UI-Regular, Arial, Roboto, sans-serif;
  padding: 6px 8px;
`;

const calcIndexFromMousePosition = (x, y, columnWidth, rowHeight) => {
  const xIndex = Math.floor(x / columnWidth);
  const yIndex = Math.floor(y / rowHeight);
  return { xIndex, yIndex };
};

const Tasks = ({ dateRange }) => {
  const states = useContext(Store);
  const tasksState = states.tasks;
  const tasks = tasksState.state.concat();
  const dispatch = tasksState.dispatch;

  const [mousePoint, mousePointDispatch] = useState({ xIndex: -1, yIndex: -1 });

  const range = states.range;

  return (
    <TasksContainer>
      <TasksInner
        style={{ width: dateRange.length * range.state.columnWidth }}
        onMouseMove={e => {
          const currentMousePoint = calcIndexFromMousePosition(
            e.clientX,
            e.clientY - 110,
            range.state.columnWidth,
            range.state.rowHeight
          );
          mousePointDispatch(currentMousePoint);
        }}
      >
        <TaskCreater
          xIndex={mousePoint.xIndex}
          yIndex={mousePoint.yIndex}
          onCreate={({ xIndex, period }) => {
            console.log(xIndex, period);
            // dispatch({
            //   type: "create",
            //   value: value
            // });
          }}
        />
        {tasks.map((task, i) => {
          const { id, endAt, position, startAt, title, isFinished } = task;
          const startIndex = dateRange.findIndex(date => {
            return moment(startAt).isSame(date, "day");
          });

          return (
            <Task
              key={id}
              endAt={endAt}
              startIndex={startIndex}
              startAt={startAt}
              rowIndex={position}
              title={title}
              onResized={(newXIndex, period) => {
                dispatch({
                  type: "update",
                  id: id,
                  value: calcNextTaskStateByResize(newXIndex, period, dateRange)
                });
              }}
              onDragged={({ relativeMovedX, relativeMovedY }) => {
                dispatch({
                  type: "update",
                  id: id,
                  value: calcNextTaskStateByDrag(
                    startIndex + relativeMovedX,
                    position + relativeMovedY,
                    dateRange
                  )
                });
              }}
            />
          );
        })}
      </TasksInner>
    </TasksContainer>
  );
};

const calcNextTaskStateByDrag = (newXIndex, newPosition, dateRange, task) => {
  const x = Math.max(newXIndex, 0);
  const position = Math.max(newPosition, 0);
  return {
    startAt: dateRange[x],
    position: position
  };
};

const calcNextTaskStateByResize = (newXIndex, period, dateRange, task) => {
  return {
    startAt: dateRange[newXIndex],
    endAt: dateRange[newXIndex + period]
  };
};

const TaskInner = styled.div`
  border: 0 solid #0f55eb;
  border-radius: 8px;
  height: 100%;
  outline: 0;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.2s ease-in-out;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  box-shadow: rgb(195, 199, 204) 0px 1px 4px;
`;

const Wrap = styled.div`
  height: 100%;
  overflow: hidden;
  padding-left: 8px;
  white-space: nowrap;
  & > * {
    vertical-align: top;
  }
`;

const Title = styled.div`
  height: 100%;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  white-space: nowrap;
`;

const Task = ({
  startIndex,
  startAt,
  endAt,
  rowIndex,
  isFinished,
  asignee,
  title,
  onResized,
  onDragged
}) => {
  const diff = moment(endAt).diff(startAt, "day");
  return (
    <DraggableContainer
      onDragged={onDragged}
      xIndex={startIndex}
      yIndex={rowIndex}
      period={diff}
    >
      <ResizableContainer
        onResized={onResized}
        xIndex={startIndex}
        yIndex={rowIndex}
        period={diff}
      >
        <TaskContainer>
          <TaskInner>
            <Wrap style={{ paddingLeft: 8, overflow: "hidden" }}>
              <Avatar />
              <Title>{title}</Title>
            </Wrap>
          </TaskInner>
        </TaskContainer>
      </ResizableContainer>
    </DraggableContainer>
  );
};

export default Tasks;
