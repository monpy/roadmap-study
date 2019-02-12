import React from "react";
import { getDatesFromRange, getDateFromToday } from "../../lib/date";
import styled, { css } from "styled-components";

import Tasks from "./tasks";
import Grids from "./grids";

import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

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
    overflow: auto;
    width: 100%;
    height: 100%;
  }
`;

const Table = props => {
  const today = new Date();
  const leftWindow = -30;
  const rightWindow = 60;
  const dateRange = getDatesFromRange(
    getDateFromToday(leftWindow),
    getDateFromToday(rightWindow)
  );

  return (
    <Container>
      <ScrollSync>
        <aside>
          <ScrollSyncPane>
            <Grids dateRange={dateRange} />
          </ScrollSyncPane>
          <ScrollSyncPane>
            <Tasks dateRange={dateRange} />
          </ScrollSyncPane>
        </aside>
      </ScrollSync>
    </Container>
  );
};

export default Table;
