import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Store } from "../../states/project";
import Resizable from "re-resizable";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const CreaterContainer = styled(Resizable)`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px 8px;
  cursor: crosshair;
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2px dashed #c5c9d0;
  border-radius: 6px;
`;

const TaskCreater = ({ xIndex, yIndex, onCreate = () => {} }) => {
  const states = useContext(Store);
  const range = states.range;
  const [startPosition, updateStartPosition] = useState({
    xIndex: xIndex,
    yIndex: yIndex
  });
  const [period, updatePeriod] = useState(1);
  const [slideLeft, updateSlideLeft] = useState(0);
  const [creating, updateCreating] = useState(false);

  const x = creating ? startPosition.xIndex - slideLeft : xIndex;
  const y = creating ? startPosition.yIndex : yIndex;
  const cssTranslate = `translate(${x * range.state.columnWidth}px, ${y *
    range.state.rowHeight}px)`;

  const [showModal, updateShowModal] = useState(false);

  useEffect(() => {
    // console.log(startPosition);
  });

  return (
    <CreaterContainer
      style={{
        transform: cssTranslate,
        zIndex: creating ? 10 : 0
      }}
      minWidth={range.state.columnWidth}
      defaultSize={{
        width: period * range.state.columnWidth,
        height: range.state.rowHeight
      }}
      size={{
        width: period * range.state.columnWidth,
        height: range.state.rowHeight
      }}
      grid={[range.state.columnWidth, 1]}
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
      handleStyles={{
        left: {
          width: range.state.columnWidth / 2,
          left: 0,
          zIndex: 1
        },
        right: {
          width: range.state.columnWidth / 2,
          right: 0,
          zIndex: 1
        }
      }}
      onResizeStart={(e, dir, el, d) => {
        e.stopPropagation();
        updateStartPosition({ xIndex: xIndex, yIndex: yIndex });
        updateCreating(true);
        updateSlideLeft(0);
      }}
      onResize={(e, dir, el, d) => {
        const slidePeriod = d.width / range.state.columnWidth;
        updatePeriod(slidePeriod + 1);
        if (dir === "left") {
          updateSlideLeft(slidePeriod);
        }
      }}
      onResizeStop={(e, dir, el, d) => {
        e.stopPropagation();
        updatePeriod(d.width / range.state.columnWidth + 1);
        updateShowModal(true);
      }}
    >
      <Inner />
      <ModalTaskTitleInputer
        onClose={({ cancel, value }) => {
          if (!cancel && value) {
            onCreate({
              xIndex: startPosition.xIndex - slideLeft,
              period: period,
              yIndex: startPosition.yIndex,
              title: value
            });
          }
          updateCreating(false);
          updateShowModal(false);
          updatePeriod(1);
          updateSlideLeft(0);
        }}
        show={showModal}
      />
    </CreaterContainer>
  );
};

const MocalContaier = styled.div`
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  padding: 8px;
  border-radius: 12px;
  background-color: #fff;
  max-width: 800px;
  width: 80%;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ModalTaskTitleInputer = ({ show, inputEnter, onClose }) => {
  const [isShow, updateIsShow] = useState(show);

  useEffect(() => {
    updateIsShow(show);
  }, [show]);

  return (
    <Modal
      open={isShow}
      onClose={() => {
        updateIsShow(false);
        onClose({ cancel: true });
      }}
    >
      <MocalContaier>
        <ModalContent>
          <h2
            style={{
              fontFamily: "Inter-UI-Regular, Arial, Roboto, sans-serif"
            }}
          >
            Create Task
          </h2>
          <Input
            autoFocus={true}
            fullWidth={true}
            placeholder="Type task name"
            onKeyPress={e => {
              console.log(e.key);
              if (e.key === "Enter") {
                updateIsShow(false);
                onClose({
                  cancel: false,
                  value: e.target.value
                });
              }
            }}
          />
        </ModalContent>
      </MocalContaier>
    </Modal>
  );
};

export default TaskCreater;
