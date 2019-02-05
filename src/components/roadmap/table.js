import React from "react";
import { getDatesFromRange, getDateFromToday } from "../../lib/date";
import styled, { css } from "styled-components";

import Grids from "./grids";

const Container = styled.div`
  position: fixed;
  background-color: #f8f8f8;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 46px;
  width: 100%;
  height: 100%;

  & > aside {
    height: 100%;
  }
`;

const Table = props => {
  const today = new Date();
  const leftWindow = -30;
  const rightWindow = 30;
  const dateRange = getDatesFromRange(
    getDateFromToday(leftWindow),
    getDateFromToday(rightWindow)
  );

  return (
    <Container>
      <aside>
        <Grids dateRange={dateRange} />
      </aside>
    </Container>
  );
};

export default Table;
