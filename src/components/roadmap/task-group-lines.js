import React, { useContext, useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Store } from "../../states/project";

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  width: 100%;
  height: 0%;
  pointer-events: none;
  z-index: 10;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: ${({ top }) => {
    return `${top}px`;
  }};
  height: 1px;
  background-color: #e7e7e7;
  pointer-events: none;
`;

const Label = styled.div`
  display: inline-block;
  transform: translateY(-100%);
  padding: 4px;
  background: #e7e7e7;
  font-family: Inter-UI-Medium, Arial, Roboto, sans-serif;
  font-size: 12px;
`;

const TaskGroupLines = ({ width }) => {
  const states = useContext(Store);
  const groupsState = states.groups;
  const range = states.range;

  return (
    <Container width={width}>
      {groupsState.state.map(({ id, label, position }) => {
        return (
          <Line key={id} top={position * range.state.rowHeight}>
            <Label>{label}</Label>
          </Line>
        );
      })}
    </Container>
  );
};

export default TaskGroupLines;
