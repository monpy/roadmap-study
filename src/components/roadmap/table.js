import React from "react";
import { getDatesFromRange, getDateFromToday } from "../../lib/date";
import moment from "moment";
import styled, { css } from "styled-components";

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

const GridsContainer = styled.ul`
  border-bottom: 1px solid #ebebeb;
  cursor: move;
  cursor: grab;
  cursor: -webkit-grab;
  height: 100%;
  list-style: none;
  margin: 0;
  outline: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
`;

const Grids = ({ dateRange }) => {
  const grids = dateRange.map((date, i) => {
    const momentDate = moment(date);
    const key = momentDate.format("YYYY-MM-DD");
    const dateLabel = momentDate.date();

    let monthLabel = null;
    if (dateLabel === 1) monthLabel = momentDate.format("MMM");

    const isToday = moment().isSame(momentDate, "day");
    console.log(isToday);
    return (
      <Grid
        dateLabel={dateLabel}
        monthLabel={monthLabel}
        isToday={isToday}
        key={key}
      />
    );
  });
  return <GridsContainer>{grids}</GridsContainer>;
};

const GridContainer = styled.li`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 100%;
  box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.08);

  ${props =>
    props.isToday &&
    css`
      background-color: rgba(0, 0, 0, 0.02);
    `};
`;

const GridHeader = styled.div`
  position: relative;
  height: 64px;
  background-color: #fff;
`;

const MonthLabel = styled.div`
  color: #9aa1aa;
  font-family: Inter-UI-Medium, Arial, Roboto, sans-serif;
  font-size: 11px;
  line-height: 28px;
  letter-spacing: 1px;
  text-indent: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

const DateLabel = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: Inter-UI-Medium, Arial, Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
`;

const Grid = ({ dateLabel, monthLabel, isToday }) => {
  return (
    <GridContainer isToday={isToday}>
      <GridHeader>
        <MonthLabel>{monthLabel}</MonthLabel>
        <DateLabel>{dateLabel}</DateLabel>
      </GridHeader>
    </GridContainer>
  );
};

export default Table;
