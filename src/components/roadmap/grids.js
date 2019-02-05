import React, { useContext } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Provider, Store } from "../../states/project";

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
  const states = useContext(Store);
  const milestonesState = states.milestones;

  const milestones = milestonesState.state.concat();

  const grids = dateRange.map((date, i) => {
    const momentDate = moment(date);
    const key = momentDate.format("YYYY-MM-DD");
    const dateLabel = momentDate.date();

    let monthLabel = null;
    if (dateLabel === 1) monthLabel = momentDate.format("MMM");

    const isToday = moment().isSame(momentDate, "day");
    const isFirstDayOfWeek = momentDate.weekday() === 1;

    const milestone = milestones.find(milestone => {
      return momentDate.isSame(milestone.date, "day");
    });

    return (
      <Grid
        date={date}
        dateLabel={dateLabel}
        monthLabel={monthLabel}
        isFirstDayOfWeek={isFirstDayOfWeek}
        isToday={isToday}
        key={key}
        milestone={milestone}
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
  box-shadow: ${({ isFirstDayOfWeek }) =>
    isFirstDayOfWeek
      ? `inset 1px 0 0 rgba(0, 0, 0, 0.2)`
      : `inset 1px 0 0 rgba(0, 0, 0, 0.08)`};
  background-color: ${({ isToday }) =>
    isToday ? `rgba(0, 0, 0, 0.02)` : `transparent`};
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

const MilestoneTag = styled.div`
  background-color: #000;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.36);
  box-sizing: content-box;
  display: block;
  border-radius: 15px;
  color: #fff;
  font-family: Inter-UI-Medium, Arial, Roboto, sans-serif;
  font-size: 13px;
  height: auto;
  left: 36px;
  opacity: 1;
  padding: 3px 9px;
  position: absolute;
  text-align: center;
  transition: box-shadow 0.2s ease-in-out, top 0.3s ease-in-out;
  top: 8px;
  z-index: 3;
  touch-action: none;
  box-shadow: rgba(235, 73, 98, 0.5) 0px 1px 3px 0px;
  background-color: rgb(235, 73, 98);
  left: 0;
  &:hover {
    z-index: 1000;
  }
`;

const DateLabel = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter-UI-Medium, Arial, Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;

  cursor: pointer;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: ${({ milestone }) => (milestone ? `rgb(235, 73, 98)` : `inherit`)};
    background-color: ${({ milestone }) =>
      milestone ? `rgba(235, 73, 98, 0.2)` : `inherit`};
  }

  &:hover span {
    color: ${({ milestone }) =>
      milestone ? `rgb(255, 255, 255)` : `rgb(235, 73, 98)`};
    background-color: ${({ milestone }) =>
      milestone ? `rgba(235, 73, 98, 0.8)` : `rgba(235, 73, 98, 0.2)`};
  }

  &:hover ${MilestoneTag} {
    top: 12px;
    z-index: 1000;
  }
`;

const Grid = ({
  date,
  dateLabel,
  monthLabel,
  isToday,
  isFirstDayOfWeek,
  milestone
}) => {
  const states = useContext(Store);
  const dispatch = states.milestones.dispatch;
  return (
    <GridContainer
      isToday={isToday}
      isFirstDayOfWeek={isFirstDayOfWeek}
      onClick={() => {
        if (!milestone) {
          dispatch({
            type: "create",
            value: date
          });
        }
        // TODO: edit or delete???
      }}
    >
      <GridHeader>
        <MonthLabel>{monthLabel}</MonthLabel>
        <DateLabel milestone={milestone}>
          {milestone && <MilestoneTag>{milestone.name}</MilestoneTag>}
          <span>{dateLabel}</span>
        </DateLabel>
      </GridHeader>
    </GridContainer>
  );
};

export default Grids;
