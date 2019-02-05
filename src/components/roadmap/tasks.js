import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Provider, Store } from "../../states/project";
import moment from "moment";
import { start } from "repl";

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
  height: 47px;
  font-size: 15px;
  font-family: Inter-UI-Regular, Arial, Roboto, sans-serif;
  padding: 6px 8px;
`;

const Tasks = ({ dateRange }) => {
  const states = useContext(Store);
  const tasksState = states.tasks;
  const tasks = tasksState.state.concat();

  return (
    <TasksContainer>
      <TasksInner style={{ width: dateRange.length * 30 }}>
        {tasks.map((task, i) => {
          const { endAt, position, startAt, title, isFinished } = task;
          const startIndex = dateRange.findIndex(date => {
            return moment(startAt).isSame(date, "day");
          });

          return (
            <Task
              key={i}
              endAt={endAt}
              startIndex={startIndex}
              startAt={startAt}
              rowIndex={position}
              title={title}
              dateRange={dateRange}
            />
          );
        })}
      </TasksInner>
    </TasksContainer>
  );
};

const ROW_HEIGHT = 47;
const COLUMN_WIDTH = 30;

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

const AvatarContaienr = styled.div`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  height: 100%;
  margin-right: 8px;
`;

const AvatarImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: aqua;
`;

const Avatar = () => {
  return (
    <AvatarContaienr>
      <AvatarImage />
    </AvatarContaienr>
  );
};

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
  title
}) => {
  const diff = moment(endAt).diff(startAt, "day");
  return (
    <TaskContainer
      style={{
        width: (diff + 1) * COLUMN_WIDTH,
        transform: `translate(${startIndex * COLUMN_WIDTH}px, ${ROW_HEIGHT *
          rowIndex}px)`
      }}
    >
      <TaskInner>
        <Wrap style={{ paddingLeft: 8, overflow: "hidden" }}>
          <Avatar />
          <Title>{title}</Title>
        </Wrap>
      </TaskInner>
    </TaskContainer>
  );
};

const calcTaskPosition = currentRange => {};

export default Tasks;
